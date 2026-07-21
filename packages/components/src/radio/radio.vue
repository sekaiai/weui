<template>
  <label :class="rootClass">
    <div class="weui-cell__bd"><p><slot>{{ label }}</slot></p></div>
    <div class="weui-cell__ft">
      <input
        type="radio"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        :name="group?.name?.value"
        @change="onChange"
      />
      <span class="weui-icon-checked"></span>
    </div>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiRadio',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'

export interface WeuiRadioProps {
  value: string
  label?: string
  disabled?: boolean
  extClass?: string
}

const props = withDefaults(defineProps<WeuiRadioProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

interface RadioGroupContext {
  modelValue: { value: string }
  name: { value: string }
  disabled: { value: boolean }
}

const group = inject<RadioGroupContext | null>('weuiRadioGroup', null)

const isChecked = computed(() => group?.modelValue.value === props.value)
const isDisabled = computed(() => props.disabled || (group?.disabled.value ?? false))

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active', 'weui-check__label']
  if (isDisabled.value) classes.push('weui-cell_disabled')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onChange = () => {
  emit('change', props.value)
}
</script>
