<template>
  <view :class="groupClass" :aria-role="ariaRole">
    <view v-if="title" class="weui-cells__title">{{ title }}</view>
    <view :class="cellsClass">
      <checkbox-group v-if="multi" @change="onChange">
        <slot />
      </checkbox-group>
      <radio-group v-else @change="onChange">
        <slot />
      </radio-group>
    </view>
    <view v-if="footer" class="weui-cells__tips">{{ footer }}</view>
  </view>
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
  title: undefined,
  footer: undefined,
  form: false,
  extClass: undefined,
  ariaRole: undefined,
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

const onChange = (event: { detail?: { value?: string | string[] } }) => {
  const raw = event.detail?.value ?? []
  const arr = Array.isArray(raw) ? raw : [raw]
  emit('update:modelValue', arr)
  emit('change', arr)
}

provide('weuiCheckboxGroup', {
  multi: computed(() => props.multi),
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
})
</script>
