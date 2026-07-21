<template>
  <div :class="groupClass">
    <div v-if="title" class="weui-cells__title">{{ title }}</div>
    <div :class="cellsClass">
      <slot />
    </div>
    <div v-if="footer" class="weui-cells__tips">{{ footer }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiRadioGroup',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, provide } from 'vue'

export interface WeuiRadioGroupProps {
  modelValue?: string
  name?: string
  disabled?: boolean
  title?: string
  footer?: string
  form?: boolean
  extClass?: string
}

const props = withDefaults(defineProps<WeuiRadioGroupProps>(), {
  modelValue: '',
  name: '',
  disabled: false,
  form: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const groupClass = computed(() => {
  const classes: string[] = ['weui-cells__group']
  if (props.form) classes.push('weui-cells__group_form')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const cellsClass = computed(() => {
  const classes: string[] = ['weui-cells', 'weui-cells_radio']
  if (props.form) classes.push('weui-cells_form')
  return classes
})

provide('weuiRadioGroup', {
  modelValue: computed(() => props.modelValue),
  name: computed(() => props.name),
  disabled: computed(() => props.disabled),
})
</script>
