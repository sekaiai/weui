<template>
  <view :class="groupClass" :role="ariaRole">
    <view v-if="title" class="weui-cells__title">{{ title }}</view>
    <slot v-else name="title" />
    <view :class="cellsClass">
      <slot />
    </view>
    <view v-if="footer" class="weui-cells__tips">{{ footer }}</view>
    <slot v-else name="footer" />
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiCellGroup',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export type WeuiCellGroupVariant = 'default' | 'form' | 'radio' | 'checkbox'

export interface WeuiCellGroupProps {
  /** 组标题 */
  title?: string
  /** 组底部说明文字 */
  footer?: string
  /** 是否为表单型组（追加 weui-cells__group_form） */
  form?: boolean
  /** 视觉变体 */
  variant?: WeuiCellGroupVariant
  /** 根元素扩展类名 */
  extClass?: string
  /** 根元素 aria-role */
  ariaRole?: string
}

const props = withDefaults(defineProps<WeuiCellGroupProps>(), {
  title: undefined,
  footer: undefined,
  form: false,
  variant: 'default',
  extClass: undefined,
  ariaRole: undefined,
})

const groupClass = computed(() => {
  const classes: string[] = ['weui-cells__group']
  if (props.form || props.variant === 'form') classes.push('weui-cells__group_form')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const cellsClass = computed(() => {
  const classes: string[] = ['weui-cells']
  if (props.variant === 'radio') classes.push('weui-cells_radio')
  if (props.variant === 'checkbox') classes.push('weui-cells_checkbox')
  if (props.variant === 'form' || props.form) classes.push('weui-cells_form')
  return classes
})
</script>
