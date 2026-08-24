<template>
  <div :class="rootClass">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiCells',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiCellsProps {
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
  form: false,
  radio: false,
  checkbox: false,
  afterTitle: false,
  extClass: undefined,
})

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
