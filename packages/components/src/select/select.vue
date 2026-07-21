<template>
  <div :class="rootClass">
    <div v-if="label" class="weui-cell__hd">
      <span class="weui-label">{{ label }}</span>
    </div>
    <div class="weui-cell__bd">
      <select class="weui-select" :value="modelValue" :disabled="disabled" @change="onChange">
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <slot />
      </select>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiSelect',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiSelectProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  before?: boolean
  after?: boolean
  label?: string
  extClass?: string
}

export interface WeuiSelectEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<WeuiSelectProps>(), {
  modelValue: '',
  disabled: false,
  before: false,
  after: false,
})

const emit = defineEmits<WeuiSelectEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active', 'weui-cell_select']
  if (props.before) classes.push('weui-cell_select-before')
  if (props.after) classes.push('weui-cell_select-after')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>
