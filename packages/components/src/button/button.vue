<template>
  <button
    :class="[rootClass, $attrs.class]"
    :disabled="disabled"
    :aria-disabled="disabled || undefined"
    :open-type="__IS_H5__ ? undefined : openType"
    @click="handleClick"
  >
    <template v-if="isStandardButton">
      <span v-if="hasContent" class="weui-btn__inner">
        <i v-if="loading" class="weui-mask-loading" aria-hidden="true" />
        <span v-if="loading" class="weui-btn__loading-text"><slot /></span>
        <slot v-else />
      </span>
      <i
        v-else-if="loading"
        class="weui-mask-loading weui-mask-loading_only"
        aria-hidden="true"
      />
    </template>
    <template v-else>
      <img v-if="icon" :src="icon" alt="" class="weui-btn_cell__icon" />
      <slot name="icon" />
      <slot />
    </template>
  </button>
</template>

<script lang="ts">
export default {
  name: 'WeuiButton',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
/// <reference path="../globals.d.ts" />
import { computed, useSlots } from 'vue'

export interface WeuiButtonProps {
  /** 视觉类型，对齐 WeUI 的 primary / default / warn。 */
  type?: 'primary' | 'default' | 'warn'
  /** 尺寸。default 为内容自适应的标准按钮。 */
  size?: 'default' | 'medium' | 'mini' | 'xmini'
  /** 显示方式：block 占满父容器，inline 行内排列。 */
  display?: 'block' | 'inline'
  /** WeUI 行按钮模式（.weui-btn_cell）。 */
  cell?: boolean
  /** 是否禁用。 */
  disabled?: boolean
  /** 是否显示 WeUI loading；不传默认插槽时显示仅图标状态。 */
  loading?: boolean
  /** 行按钮左侧图片地址。 */
  icon?: string
  /** 验证码按钮模式，用于 .weui-cell_vcode 的 footer。 */
  vcode?: boolean
  /** 半透明背景上的按钮样式。 */
  overlay?: boolean
  /** mini/xmini 按钮取消默认水平居中。 */
  marginReset?: boolean
  /** 微信小程序 button 的开放能力，例如 share、getPhoneNumber。 */
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
  marginReset: false,
  openType: undefined,
})

const emit = defineEmits<WeuiButtonEmits>()
const slots = useSlots()

const isStandardButton = computed(() => !props.cell && !props.vcode)
const hasContent = computed(() => Boolean(slots.default))

const rootClass = computed(() => {
  if (props.vcode) {
    return ['weui-vcode-btn', props.disabled ? 'weui-btn_disabled' : undefined]
  }

  if (props.cell) {
    return [
      'weui-btn_cell',
      `weui-btn_cell-${props.type}`,
      props.disabled ? 'weui-btn_disabled' : undefined,
    ]
  }

  return [
    'weui-btn',
    `weui-btn_${props.type}`,
    props.size === 'default' ? undefined : `weui-btn_${props.size}`,
    props.display === 'block' ? 'weui-btn_block' : undefined,
    props.display === 'inline' ? 'weui-btn_inline' : undefined,
    props.overlay ? 'weui-btn_overlay' : undefined,
    props.marginReset ? 'weui-btn_margin-reset' : undefined,
    props.loading ? 'weui-btn_loading' : undefined,
    props.disabled ? 'weui-btn_disabled' : undefined,
  ]
})

const handleClick = (event: Event) => {
  if (props.disabled) return
  emit('click', event)
}
</script>

<style lang="scss">
/*
 * .weui-btn__inner uses a line-clamp layout. A slot can otherwise become a
 * separate box from the loading icon, so keep the icon and text on one row
 * while allowing the text itself to shrink or truncate.
 */
.weui-btn_loading .weui-btn__inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.weui-btn__loading-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
