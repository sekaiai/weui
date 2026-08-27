<template>
  <label :class="rootClass">
    <div class="weui-cell__bd"><p><slot>{{ label }}</slot></p></div>
    <div class="weui-cell__ft">
      <!-- #ifdef H5 -->
      <input
        type="radio"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        :name="group?.name?.value"
        @change="onChange"
      />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <radio-group v-if="!group" @change="onNativeChange">
        <radio
          :value="value"
          :checked="isChecked"
          :disabled="isDisabled"
        />
      </radio-group>
      <radio
        v-else
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
      />
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <span class="weui-icon-checked"></span>
      <!-- #endif -->
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

export interface WeuiRadioEmits {
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<WeuiRadioProps>(), {
  disabled: false,
})

const emit = defineEmits<WeuiRadioEmits>()

interface RadioGroupContext {
  modelValue: { value: string }
  name: { value: string }
  disabled: { value: boolean }
  onChange?: (value: string) => void
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
  if (group?.onChange) {
    group.onChange(props.value)
  } else {
    emit('change', props.value)
  }
}

const onNativeChange = (event: Event & { detail?: { value?: string } }) => {
  // Native radio-group owns grouped changes. Standalone radios still emit.
  if (group) return
  const value = event.detail?.value
    ?? (event.target as HTMLInputElement | null)?.value
    ?? props.value
  emit('change', value)
}
</script>
