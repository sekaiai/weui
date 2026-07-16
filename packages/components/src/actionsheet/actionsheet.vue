<template>
  <view
    v-if="visible"
    class="weui-mask"
    @click="handleMaskClick"
    @touchmove.stop.prevent
  >
    <view
      :class="['weui-actionsheet', { 'weui-actionsheet_toggle': showSheet }]"
      @click.stop
    >
      <!-- 标题 -->
      <view v-if="title" class="weui-actionsheet__title">
        <text class="weui-actionsheet__title-text">{{ title }}</text>
      </view>

      <!-- 菜单项 -->
      <view class="weui-actionsheet__menu">
        <view
          v-for="(item, index) in items"
          :key="index"
          :class="cellClass(item)"
          @click="handleSelect(item, index)"
        >
          <text>{{ item.label }}</text>
          <text v-if="item.tips" class="weui-actionsheet__cell__tips">
            {{ item.tips }}
          </text>
        </view>
      </view>

      <!-- 操作区（取消按钮） -->
      <view v-if="cancelText" class="weui-actionsheet__action">
        <view
          class="weui-actionsheet__cell"
          @click="handleCancel"
        >
          <text>{{ cancelText }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiActionsheet',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'

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
}

export interface WeuiActionsheetEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'select', item: ActionsheetItem, index: number): void
  (e: 'cancel'): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<WeuiActionsheetProps>(), {
  visible: false,
  title: undefined,
  items: () => [],
  cancelText: '取消',
  maskClosable: true,
})

const emit = defineEmits<WeuiActionsheetEmits>()

/** 控制滑出动画的内部状态 */
const showSheet = ref(false)

watch(
  () => props.visible,
  (val) => {
    if (val) {
      // 显示时下一 tick 触发滑出动画
      setTimeout(() => {
        showSheet.value = true
      }, 16)
    } else {
      showSheet.value = false
    }
  },
  { immediate: true },
)

const close = () => {
  emit('update:visible', false)
  emit('close')
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
