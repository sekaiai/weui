<template>
  <div :class="groupClass">
    <div v-if="hasTitle" class="weui-cells__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="cellsClass">
      <!-- #ifdef H5 -->
      <slot />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <radio-group @change="onNativeChange">
        <slot />
      </radio-group>
      <!-- #endif -->
    </div>
    <div v-if="hasTips" class="weui-cells__tips">
      <slot name="tips">{{ tips }}</slot>
    </div>
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
import { computed, provide, useSlots } from 'vue'
import { useStableId } from '../utils/use-stable-id'

export interface WeuiRadioGroupProps {
  modelValue?: string
  name?: string
  disabled?: boolean
  title?: string
  tips?: string
  form?: boolean
  extClass?: string
}

export interface WeuiRadioGroupEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<WeuiRadioGroupProps>(), {
  modelValue: '',
  name: '',
  disabled: false,
  title: undefined,
  tips: undefined,
  form: false,
})

const emit = defineEmits<WeuiRadioGroupEmits>()

const generatedName = useStableId('weui-radio-group-')
const radioName = computed(() => props.name || generatedName)
const slots = useSlots()

const hasTitle = computed(() => Boolean(props.title || slots.title))
const hasTips = computed(() => Boolean(props.tips || slots.tips))

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

const onChange = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const onNativeChange = (event: Event & { detail?: { value?: string } }) => {
  onChange(event.detail?.value ?? '')
}

provide('weuiRadioGroup', {
  modelValue: computed(() => props.modelValue),
  name: radioName,
  disabled: computed(() => props.disabled),
  onChange,
})
</script>
