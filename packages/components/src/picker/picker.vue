<template>
  <div v-if="wrapperShow" class="weui-picker-host">
    <div
      class="weui-mask weui-transition"
      :class="{
        'weui-transition_show': showSheet,
        'weui-animate-fade-in': showSheet,
        'weui-animate-fade-out': isClosing,
      }"
      :style="maskStyle"
      @click="handleMaskClick"
      @touchmove.stop.prevent
    />

    <div
      class="weui-half-screen-dialog weui-picker weui-transition"
      :class="[
        extClass,
        {
          'weui-transition_show': showSheet,
          'weui-animate-slide-up': showSheet,
          'weui-animate-slide-down': isClosing,
        },
      ]"
      :style="pickerStyle"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      @click.stop
    >
      <div class="weui-half-screen-dialog__hd">
        <div v-if="showClose" class="weui-half-screen-dialog__hd__side">
          <button
            type="button"
            class="weui-btn_icon weui-wa-hotarea"
            @click="handleCancel"
          >{{ resolvedCloseText }}<i class="weui-icon-close-thin" /></button>
        </div>
        <div class="weui-half-screen-dialog__hd__main">
          <strong class="weui-half-screen-dialog__title">{{ title }}</strong>
          <span v-if="desc" class="weui-half-screen-dialog__subtitle">{{ desc }}</span>
        </div>
      </div>

      <div class="weui-half-screen-dialog__bd">
        <div class="weui-picker__bd" :style="pickerBodyStyle">
          <weui-picker-group
            v-for="(col, colIndex) in columns"
            :key="colIndex"
            :options="col.options"
            :index="currentIndexes[colIndex] ?? 0"
            @change="(idx) => handleChange(colIndex, idx)"
          />
        </div>
      </div>

      <div class="weui-half-screen-dialog__ft">
        <div class="weui-hidden_abs" aria-hidden="true" />
        <a
          href="javascript:;"
          role="button"
          class="weui-btn weui-btn_primary weui-picker__btn"
          @click.prevent="handleConfirm"
        >{{ confirmText }}</a>
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
import WeuiPickerGroup from './picker-group.vue'
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
  /** 副标题描述 */
  desc?: string
  /** 是否显示左上角关闭按钮，默认 false；写入 show-close 即启用 */
  showClose?: boolean
  /** 官方命名的关闭按钮文字，默认 "关闭" */
  closeText?: string
  /** 兼容旧版本的取消按钮文字；closeText 优先 */
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

const PICKER_HEIGHT = 280

const props = withDefaults(defineProps<WeuiPickerProps>(), {
  visible: false,
  columns: () => [],
  title: '',
  desc: undefined,
  showClose: false,
  closeText: undefined,
  cancelText: undefined,
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
/** 标记关闭阶段，避免初次挂载时触发 slide-down */
const isClosing = ref(false)

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

const pickerStyle = computed(() => {
  if (props.zIndex === undefined) return undefined
  return { zIndex: String(props.zIndex) }
})

const pickerBodyStyle = { height: `${PICKER_HEIGHT}px` }

const resolvedCloseText = computed(() => props.closeText ?? props.cancelText ?? '关闭')

watch(
  () => props.visible,
  (val) => {
    if (val) {
      isClosing.value = false
      wrapperShow.value = true
      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
      }
      if (showTimer) clearTimeout(showTimer)
      showTimer = setTimeout(() => {
        showSheet.value = true
        showTimer = null
      }, 16)
    } else if (wrapperShow.value) {
      showSheet.value = false
      isClosing.value = true
      if (showTimer) {
        clearTimeout(showTimer)
        showTimer = null
      }
      if (hideTimer) clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        wrapperShow.value = false
        isClosing.value = false
        hideTimer = null
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
