<template>
  <label :class="rootClass" @click="handleClick">
    <div v-if="multi" class="weui-cell__hd">
      <input
        v-if="__IS_H5__"
        type="checkbox"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        @click.stop
        @change.stop="onH5Change"
      />
      <checkbox
        v-else
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
      />
      <div class="weui-icon-checked" />
    </div>
    <div class="weui-cell__bd">
      <slot>{{ label }}</slot>
    </div>
    <div v-if="!multi" class="weui-cell__ft">
      <input
        v-if="__IS_H5__"
        type="radio"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        @click.stop
        @change.stop="onH5Change"
      />
      <radio
        v-else
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
      />
      <div class="weui-icon-checked" />
    </div>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiCheckbox',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'

export interface WeuiCheckboxProps {
  /** checkbox 标识值，change 事件返回此值 */
  value: string
  /** 显示文字 */
  label?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 独立使用时的选中状态（在 group 中由 group 的 modelValue 控制） */
  checked?: boolean
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiCheckboxEmits {
  (e: 'update:checked', value: boolean): void
  (e: 'change', value: boolean): void
}

const props = withDefaults(defineProps<WeuiCheckboxProps>(), {
  label: '',
  disabled: false,
  checked: false,
})

const emit = defineEmits<WeuiCheckboxEmits>()

interface CheckboxGroupContext {
  multi: { value: boolean }
  modelValue: { value: string[] }
  disabled: { value: boolean }
  // H5 端独有：toggle 方法（非 H5 端为 undefined）
  toggle?: (value: string) => void
}

const group = inject<CheckboxGroupContext | null>('weuiCheckboxGroup', null)

const multi = computed(() => group?.multi.value ?? true)
const isChecked = computed(() => {
  if (group) return group.modelValue.value.includes(props.value)
  return props.checked
})
const isDisabled = computed(() => props.disabled || (group?.disabled.value ?? false))

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active', 'weui-check__label']
  if (isDisabled.value) classes.push('weui-cell_disabled')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const handleClick = () => {
  // group 模式由 group 控制，不处理独立切换
  if (group) return
  const newChecked = !isChecked.value
  emit('update:checked', newChecked)
  emit('change', newChecked)
}

// H5 端：input change 事件触发 group.toggle 联动
// 非 H5 端：此函数不绑定（template 用 v-else 渲染 checkbox/radio 无 @change），保留无害
const onH5Change = () => {
  if (group?.toggle) group.toggle(props.value)
}
</script>
