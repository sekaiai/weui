<template>
  <div v-if="hasTitle" class="weui-cells__title">
    <slot name="title">{{ title }}</slot>
  </div>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
  <div v-if="hasTips" class="weui-cells__tips">
    <slot name="tips">{{ tips }}</slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiCells',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiCellsProps {
  /** 列表标题；可由 title slot 自定义 */
  title?: string
  /** 底部提示；可由 tips slot 自定义 */
  tips?: string
  /** 表单型 cells，追加 weui-cells_form */
  form?: boolean
  /** 单选项型 cells，追加 weui-cells_radio */
  radio?: boolean
  /** 复选框型 cells，追加 weui-cells_checkbox */
  checkbox?: boolean
  /** 标题之后的 cells，追加 weui-cells_after-title */
  afterTitle?: boolean
  /** 业务自定义扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiCellsProps>(), {
  title: undefined,
  tips: undefined,
  form: false,
  radio: false,
  checkbox: false,
  afterTitle: false,
  extClass: undefined,
})

const slots = useSlots()

const hasTitle = computed(() => Boolean(props.title || slots.title))
const hasTips = computed(() => Boolean(props.tips || slots.tips))

const rootClass = computed(() => {
  const classes: string[] = ['weui-cells']
  if (props.form) classes.push('weui-cells_form')
  if (props.radio) classes.push('weui-cells_radio')
  if (props.checkbox) classes.push('weui-cells_checkbox')
  if (props.afterTitle) classes.push('weui-cells_after-title')
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
