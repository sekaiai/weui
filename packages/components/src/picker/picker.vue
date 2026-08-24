<template>
  <div
    v-if="wrapperShow"
    class="weui-mask"
    :style="maskStyle"
    @click="handleMaskClick"
    @touchmove.stop.prevent
  >
    <div
      class="weui-picker"
      :class="extClass"
      :style="pickerStyle"
      @click.stop
    >
      <!-- 头部：取消 / 标题 / 确定 -->
      <div class="weui-picker__hd">
        <div
          class="weui-picker__action weui-picker__action_cancel"
          @click="handleCancel"
        >{{ cancelText }}</div>
        <div v-if="title" class="weui-picker__title">{{ title }}</div>
        <div
          class="weui-picker__action weui-picker__action_confirm"
          @click="handleConfirm"
        >{{ confirmText }}</div>
      </div>

      <!-- 主体：多列 -->
      <div class="weui-picker__bd">
        <!-- #ifdef H5 -->
        <weui-picker-group
          v-for="(col, colIndex) in columns"
          :key="colIndex"
          :options="col.options"
          :index="currentIndexes[colIndex] ?? 0"
          @change="(idx) => handleChange(colIndex, idx)"
        />
        <!-- #endif -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiPicker',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
// #ifdef H5
import WeuiPickerGroup from './picker-group.vue'
// #endif
import type { PickerOption } from './picker-group.vue'

export interface PickerColumn {
  /** 列选项 */
  options: PickerOption[]
  /** 初始选中索引 */
  index?: number
}

export interface WeuiPickerProps {
  /** 是否显示 */
  visible?: boolean
  /** 多列配置 */
  columns?: PickerColumn[]
  /** 标题 */
  title?: string
  /** 取消按钮文字，默认 "取消" */
  cancelText?: string
  /** 确定按钮文字，默认 "确定" */
  confirmText?: string
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 由 overlay-host 注入的 z-index */
  zIndex?: number
}

export interface WeuiPickerEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'change', indexes: number[], values: (string | number)[]): void
  (e: 'confirm', indexes: number[], values: (string | number)[]): void
  (e: 'cancel'): void
  (e: 'close'): void
  /** overlay-host 命令式调用时用于通知卸载 */
  (e: 'weui-close'): void
}

const props = withDefaults(defineProps<WeuiPickerProps>(), {
  visible: false,
  columns: () => [],
  cancelText: '取消',
  confirmText: '确定',
  maskClosable: true,
})

const emit = defineEmits<WeuiPickerEmits>()

const resolveEnabledIndex = (column: PickerColumn, preferredIndex = 0) => {
  const maxIndex = Math.max(0, column.options.length - 1)
  const index = Math.max(0, Math.min(maxIndex, preferredIndex))
  if (!column.options[index]?.disabled) return index

  for (let distance = 1; distance <= maxIndex; distance += 1) {
    const previous = index - distance
    const next = index + distance
    if (previous >= 0 && !column.options[previous]?.disabled) return previous
    if (next <= maxIndex && !column.options[next]?.disabled) return next
  }

  return index
}

const getInitialIndexes = (columns: PickerColumn[]) =>
  columns.map((column) => resolveEnabledIndex(column, column.index ?? 0))

/** 控制外层节点是否挂载 */
const wrapperShow = ref(false)
/** 控制滑入/滑出动画状态 */
const showSheet = ref(false)

/** 每列当前选中索引（内部状态） */
const currentIndexes = ref<number[]>(
  getInitialIndexes(props.columns),
)

// columns 变化时重置 currentIndexes
watch(
  () => props.columns,
  (cols) => {
    currentIndexes.value = getInitialIndexes(cols)
  },
)

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const maskStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex !== undefined) {
    style['z-index'] = String(props.zIndex)
  }
  return style
})

const pickerStyle = computed(() => ({
  transform: showSheet.value ? 'translate(0, 0)' : 'translate(0, 100%)',
}))

watch(
  () => props.visible,
  (val) => {
    if (val) {
      wrapperShow.value = true
      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
      }
      showTimer = setTimeout(() => {
        showSheet.value = true
      }, 16)
    } else if (wrapperShow.value) {
      showSheet.value = false
      if (showTimer) {
        clearTimeout(showTimer)
        showTimer = null
      }
      hideTimer = setTimeout(() => {
        wrapperShow.value = false
      }, 300)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
})

const close = () => {
  emit('update:visible', false)
  emit('close')
  emit('weui-close')
}

const getValues = (): (string | number)[] => {
  return props.columns.map((col, i) => {
    const idx = currentIndexes.value[i] ?? 0
    return col.options[idx]?.value ?? ''
  })
}

const handleChange = (colIndex: number, idx: number) => {
  currentIndexes.value[colIndex] = idx
  emit('change', [...currentIndexes.value], getValues())
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const handleConfirm = () => {
  emit('confirm', [...currentIndexes.value], getValues())
  close()
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    close()
  }
}
</script>
