<template>
  <div :class="groupClass" :role="ariaRole" v-bind="$attrs">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiCellGroup',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiCellGroupProps {
  /** 是否为表单型组（追加 weui-cells__group_form） */
  form?: boolean
  /** 是否使用反色表单样式（需与 form 一起使用） */
  primary?: boolean
  /** 根元素扩展类名 */
  extClass?: string
  /** 根元素 aria-role */
  ariaRole?: string
}

const props = withDefaults(defineProps<WeuiCellGroupProps>(), {
  form: false,
  primary: false,
  extClass: undefined,
  ariaRole: undefined,
})

const groupClass = computed(() => {
  const classes: string[] = ['weui-cells__group']
  if (props.form) classes.push('weui-cells__group_form')
  if (props.form && props.primary) classes.push('weui-cells__group_form-primary')
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
