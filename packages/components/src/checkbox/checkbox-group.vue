<template>
  <div :class="groupClass" :role="ariaRole">
    <div v-if="hasTitle" class="weui-cells__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="cellsClass">
      <!-- #ifdef H5 -->
      <slot />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <checkbox-group @change="onChange">
        <slot />
      </checkbox-group>
      <!-- #endif -->
    </div>
    <div v-if="hasTips" class="weui-cells__tips">
      <slot name="tips">{{ tips }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiCheckboxGroup',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'

export interface WeuiCheckboxGroupProps {
  /** 选中项的 value 数组（v-model） */
  modelValue?: string[]
  /** 是否禁用全部子项 */
  disabled?: boolean
  /** 组标题 */
  title?: string
  /** 组底部提示 */
  tips?: string
  /** 是否为表单型组 */
  form?: boolean
  /** 根元素扩展类名 */
  extClass?: string
  /** 根元素 aria-role */
  ariaRole?: string
}

export interface WeuiCheckboxGroupEmits {
  (e: 'update:modelValue', value: string[]): void
  (e: 'change', value: string[]): void
}

const props = withDefaults(defineProps<WeuiCheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
  title: undefined,
  tips: undefined,
  form: false,
})

const emit = defineEmits<WeuiCheckboxGroupEmits>()
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
  const classes: string[] = ['weui-cells', 'weui-cells_after-title', 'weui-cells_checkbox']
  if (props.form) classes.push('weui-cells_form')
  return classes
})

// 非 H5 端：checkbox-group/radio-group 原生 change 事件处理
const onChange = (event: { detail?: { value?: string | string[] } }) => {
  const raw = event.detail?.value ?? []
  const arr = Array.isArray(raw) ? raw : [raw]
  emit('update:modelValue', arr)
  emit('change', arr)
}

// H5 端：group 自身管理子项选中（无原生 group 联动）
// 非 H5 端：toggle 始终为 undefined（由原生 checkbox-group/radio-group change 事件驱动）
const toggle = (value: string) => {
  const set = new Set(props.modelValue)
  if (set.has(value)) set.delete(value)
  else set.add(value)
  const arr = Array.from(set)
  emit('update:modelValue', arr)
  emit('change', arr)
}

provide('weuiCheckboxGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  // H5 端独有：toggle 方法（非 H5 端通过原生 checkbox-group change 事件联动）
  toggle: __IS_H5__ ? toggle : undefined,
})
</script>
