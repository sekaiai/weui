<template>
  <label :class="rootClass" @click="handleClick">
    <view v-if="multi" class="weui-cell__hd">
      <checkbox class="weui-check" :value="value" :checked="isChecked" :disabled="isDisabled" />
      <view class="weui-icon-checked" />
    </view>
    <view class="weui-cell__bd">
      <slot>{{ label }}</slot>
    </view>
    <view v-if="!multi" class="weui-cell__ft">
      <radio class="weui-check" :value="value" :checked="isChecked" :disabled="isDisabled" />
      <view class="weui-icon-checked" />
    </view>
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
  extClass: undefined,
})

const emit = defineEmits<WeuiCheckboxEmits>()

interface CheckboxGroupContext {
  multi: { value: boolean }
  modelValue: { value: string[] }
  disabled: { value: boolean }
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
</script>
