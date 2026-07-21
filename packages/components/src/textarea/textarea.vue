<template>
  <div :class="rootClass">
    <div v-if="label" class="weui-cell__hd"><label class="weui-label">{{ label }}</label></div>
    <div class="weui-cell__bd">
      <textarea
        class="weui-textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :rows="rows"
        :disabled="disabled"
        @input="onInput"
      />
      <div v-if="showCount" class="weui-textarea-counter">
        <span>{{ currentLen }}</span>/{{ maxlength }}
      </div>
    </div>
    <div v-if="warn" class="weui-cell__ft"><i class="weui-icon-warn"></i></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiTextarea',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiTextareaProps {
  modelValue?: string
  placeholder?: string
  rows?: number
  maxlength?: number
  showCount?: boolean
  label?: string
  disabled?: boolean
  warn?: boolean
  vertical?: boolean
  extClass?: string
}

export interface WeuiTextareaEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<WeuiTextareaProps>(), {
  modelValue: '',
  rows: 3,
  maxlength: 200,
  showCount: true,
  disabled: false,
  warn: false,
  vertical: false,
})

const emit = defineEmits<WeuiTextareaEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active']
  if (props.warn) classes.push('weui-cell_warn')
  if (props.vertical) classes.push('weui-cell_vertical')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const currentLen = computed(() => props.modelValue?.length ?? 0)

const onInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>
