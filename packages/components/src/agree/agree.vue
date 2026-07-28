<template>
  <label :class="rootClass">
    <input
      type="checkbox"
      class="weui-agree__checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="weui-agree__text">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiAgree',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiAgreeProps {
  modelValue?: boolean
  disabled?: boolean
  /** 警告状态 */
  warn?: boolean
  /** 触发官方横向抖动动画 */
  animate?: boolean
  extClass?: string
}

export interface WeuiAgreeEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

const props = withDefaults(defineProps<WeuiAgreeProps>(), {
  modelValue: false,
  disabled: false,
  warn: false,
  animate: false,
})

const emit = defineEmits<WeuiAgreeEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-agree', 'weui-wa-hotarea']
  if (props.warn) classes.push('weui-agree_warn')
  if (props.animate) classes.push('weui-agree_animate')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const handleChange = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>
