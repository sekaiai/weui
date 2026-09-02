<template>
  <div
    v-if="wrapperShow"
    :class="['weui-mask', wrapperClass]"
    :style="maskStyle"
    @click="handleMaskClick"
    @touchmove.stop.prevent
  >
    <div
      :class="['weui-actionsheet', extClass, { 'weui-actionsheet_toggle': showSheet }]"
      v-bind="$attrs"
      role="dialog"
      aria-modal="true"
      @click.stop
    >
      <!-- 标题 -->
      <div v-if="title" class="weui-actionsheet__title">
        <p class="weui-actionsheet__title-text">{{ title }}</p>
      </div>

      <!-- 菜单项 -->
      <div class="weui-actionsheet__menu">
        <div
          v-for="(item, index) in items"
          :key="index"
          role="button"
          tabindex="0"
          :class="cellClass(item)"
          @click="handleSelect(item, index)"
        >{{ item.label }}<div v-if="item.tips" class="weui-actionsheet__cell__tips">{{ item.tips }}</div></div>
      </div>

      <!-- 操作区（取消按钮） -->
      <div v-if="cancelText" class="weui-actionsheet__action">
        <div
          role="button"
          tabindex="0"
          class="weui-actionsheet__cell"
          @click="handleCancel"
        >{{ cancelText }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiActionsheet',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'

export interface ActionsheetItem {
  /** 菜单项文字 */
  label: string
  /** 菜单项提示文字（显示在 label 下方） */
  tips?: string
  /** 是否为警告样式（红色文字） */
  warn?: boolean
}

export interface WeuiActionsheetProps {
  /** 是否显示 */
  visible?: boolean
  /** 标题 */
  title?: string
  /** 菜单项列表 */
  items?: ActionsheetItem[]
  /** 取消按钮文字，为空时不显示操作区 */
  cancelText?: string
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 遮罩结构包装层的扩展类名。 */
  wrapperClass?: string
  /** 由 overlay-host 注入的 z-index */
  zIndex?: number
}

export interface WeuiActionsheetEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'select', item: ActionsheetItem, index: number): void
  (e: 'cancel'): void
  (e: 'close'): void
  /** overlay-host 命令式调用时用于通知卸载 */
  (e: 'weui-close'): void
}

const props = withDefaults(defineProps<WeuiActionsheetProps>(), {
  visible: false,
  title: undefined,
  items: () => [],
  cancelText: '取消',
  maskClosable: true,
  extClass: undefined,
  wrapperClass: undefined,
  zIndex: undefined,
})

const emit = defineEmits<WeuiActionsheetEmits>()

/** 控制外层节点是否挂载 */
const wrapperShow = ref(false)
/** 控制滑入/滑出动画状态 */
const showSheet = ref(false)

/** setTimeout 引用，卸载时清理 */
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const maskStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex !== undefined) {
    style['z-index'] = String(props.zIndex)
  }
  return style
})

watch(
  () => props.visible,
  (val) => {
    if (val) {
      // 显示：先挂载外层，下一 tick 触发滑入动画
      wrapperShow.value = true
      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
      }
      showTimer = setTimeout(() => {
        showSheet.value = true
      }, 16)
    } else if (wrapperShow.value) {
      // 隐藏：先触发滑出动画，动画结束后卸载外层
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

const handleMaskClick = () => {
  if (props.maskClosable) {
    close()
  }
}

const handleSelect = (item: ActionsheetItem, index: number) => {
  emit('select', item, index)
  close()
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const cellClass = (item: ActionsheetItem) => {
  const classes: string[] = ['weui-actionsheet__cell']
  if (item.tips) classes.push('weui-actionsheet__cell_tips')
  if (item.warn) classes.push('weui-actionsheet__cell_warn')
  return classes
}
</script>
