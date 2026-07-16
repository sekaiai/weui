<template>
  <button
    :class="rootClass"
    :disabled="disabled"
    :open-type="!vcode && !cell ? openType : undefined"
    @click="handleClick"
  >
    <view
      v-if="loading && !vcode"
      class="weui-primary-loading weui-primary-loading_transparent"
    >
      <view class="weui-primary-loading__dot" />
    </view>
    <image v-if="icon" :src="icon" class="weui-btn_cell__icon" />
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'WeuiButton',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiButtonProps {
  /** 按钮类型，对齐 weui 官方 */
  type?: 'primary' | 'default' | 'warn'
  /** 按钮尺寸 */
  size?: 'default' | 'medium' | 'mini' | 'xmini'
  /** 显示模式：不指定时居中块级，block 填满父容器，inline 行内 */
  display?: 'block' | 'inline'
  /** 是否为 cell 样式按钮（通栏白底，用于单元格中） */
  cell?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中，显示旋转加载图标 */
  loading?: boolean
  /** 图标地址（cell 或标准模式下显示在文字左侧） */
  icon?: string
  /** 是否为验证码按钮（用于表单 cell 中，带左侧分隔线） */
  vcode?: boolean
  /** 半透明样式，用于弹层底部操作按钮 */
  overlay?: boolean
  /** 微信小程序开放能力，如 share / getPhoneNumber / contact 等 */
  openType?: string
}

export interface WeuiButtonEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiButtonProps>(), {
  type: 'default',
  size: 'default',
  display: undefined,
  cell: false,
  disabled: false,
  loading: false,
  icon: undefined,
  vcode: false,
  overlay: false,
  openType: undefined,
})

const emit = defineEmits<WeuiButtonEmits>()

/** 根元素类名 */
const rootClass = computed(() => {
  // 验证码按钮
  if (props.vcode) {
    return ['weui-vcode-btn']
  }

  // cell 样式按钮
  if (props.cell) {
    const classes: string[] = ['weui-btn_cell', `weui-btn_cell-${props.type}`]
    if (props.disabled) classes.push('weui-btn_disabled')
    if (props.loading) classes.push('weui-btn_loading')
    return classes
  }

  // 标准按钮
  const classes: string[] = ['weui-btn', `weui-btn_${props.type}`]

  if (props.overlay) classes.push('weui-btn_overlay')
  if (props.size === 'medium') {
    classes.push('weui-btn_medium')
  } else if (props.size === 'mini') {
    classes.push('weui-btn_mini')
  } else if (props.size === 'xmini') {
    classes.push('weui-btn_xmini')
  }
  if (props.display === 'block') {
    classes.push('weui-btn_block')
  } else if (props.display === 'inline') {
    classes.push('weui-btn_inline')
  }
  if (props.loading) classes.push('weui-btn_loading')
  if (props.disabled) classes.push('weui-btn_disabled')

  return classes
})

const handleClick = (event: Event) => {
  if (props.disabled) return
  emit('click', event)
}
</script>
