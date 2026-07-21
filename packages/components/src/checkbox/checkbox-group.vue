<template>
  <div :class="groupClass" :role="ariaRole">
    <div v-if="title" class="weui-cells__title">{{ title }}</div>
    <div :class="cellsClass">
      <template v-if="__IS_H5__">
        <slot />
      </template>
      <template v-else>
        <checkbox-group v-if="multi" @change="onChange">
          <slot />
        </checkbox-group>
        <radio-group v-else @change="onChange">
          <slot />
        </radio-group>
      </template>
    </div>
    <div v-if="footer" class="weui-cells__tips">{{ footer }}</div>
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
import { computed, provide } from 'vue'

export interface WeuiCheckboxGroupProps {
  /** 选中项的 value 数组（v-model） */
  modelValue?: string[]
  /** true=多选（checkbox），false=单选（radio） */
  multi?: boolean
  /** 是否禁用全部子项 */
  disabled?: boolean
  /** 组标题 */
  title?: string
  /** 组底部说明文字 */
  footer?: string
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
  multi: true,
  disabled: false,
  form: false,
})

const emit = defineEmits<WeuiCheckboxGroupEmits>()

const groupClass = computed(() => {
  const classes: string[] = ['weui-cells__group']
  if (props.form) classes.push('weui-cells__group_form')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const cellsClass = computed(() => {
  const classes: string[] = ['weui-cells', 'weui-cells_after-title']
  if (props.multi) classes.push('weui-cells_checkbox')
  else classes.push('weui-cells_radio')
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
  if (props.multi) {
    const set = new Set(props.modelValue)
    if (set.has(value)) set.delete(value)
    else set.add(value)
    const arr = Array.from(set)
    emit('update:modelValue', arr)
    emit('change', arr)
  } else {
    emit('update:modelValue', [value])
    emit('change', [value])
  }
}

provide('weuiCheckboxGroup', {
  multi: computed(() => props.multi),
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  // H5 端独有：toggle 方法（非 H5 端通过原生 checkbox-group/radio-group change 事件联动）
  toggle: __IS_H5__ ? toggle : undefined,
})
</script>
