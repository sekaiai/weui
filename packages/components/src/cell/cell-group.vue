<template>
  <div :class="groupClass" :role="ariaRole">
    <weui-cells-title>
      <slot name="title">{{ title }}</slot>
    </weui-cells-title>
    <weui-cells :ext-class="cellsExtClass">
      <slot />
    </weui-cells>
    <weui-cells-tips>
      <slot name="footer">{{ footer }}</slot>
    </weui-cells-tips>
  </div>
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
import { WeuiCellsTitle, WeuiCells, WeuiCellsTips } from '../cells'

export interface WeuiCellGroupProps {
  /** 组标题 */
  title?: string
  /** 组底部说明文字 */
  footer?: string
  /** 是否为表单型组（追加 weui-cells__group_form） */
  form?: boolean
  /** 是否为单选项组（内部 weui-cells 追加 weui-cells_radio） */
  radio?: boolean
  /** 是否为复选框组（内部 weui-cells 追加 weui-cells_checkbox） */
  checkbox?: boolean
  /** 根元素扩展类名 */
  extClass?: string
  /** 根元素 aria-role */
  ariaRole?: string
}

const props = withDefaults(defineProps<WeuiCellGroupProps>(), {
  title: undefined,
  footer: undefined,
  form: false,
  radio: false,
  checkbox: false,
  extClass: undefined,
  ariaRole: undefined,
})

const groupClass = computed(() => {
  const classes: string[] = ['weui-cells__group']
  if (props.form) classes.push('weui-cells__group_form')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const cellsExtClass = computed(() => {
  const classes: string[] = []
  if (props.radio) classes.push('weui-cells_radio')
  if (props.checkbox) classes.push('weui-cells_checkbox')
  if (props.form) classes.push('weui-cells_form')
  return classes.join(' ') || undefined
})
</script>
