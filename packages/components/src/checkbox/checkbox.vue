<template>
  <label :class="rootClass">
    <div class="weui-cell__hd">
      <!-- #ifdef H5 -->
      <input
        type="checkbox"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        @change="onH5Change"
      />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <checkbox-group v-if="!group" @change="onNativeChange">
        <checkbox
          :value="value"
          :checked="isChecked"
          :disabled="isDisabled"
          @click.stop
        />
      </checkbox-group>
      <checkbox
        v-else
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        @click.stop
      />
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <div class="weui-icon-checked"></div>
      <!-- #endif -->
    </div>
    <div class="weui-cell__bd">
      <slot>{{ label }}</slot>
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
  modelValue: { value: string[] }
  disabled: { value: boolean }
  // H5 端独有：toggle 方法（非 H5 端为 undefined）
  toggle?: (value: string) => void
}

const group = inject<CheckboxGroupContext | null>('weuiCheckboxGroup', null)

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

// H5 端：input change 同步数据；视觉由官方 input:checked + .weui-icon-checked 驱动
// 非 H5 端：此函数不绑定（template 用 v-else 渲染原生 checkbox），保留无害
const onH5Change = (event: Event) => {
  const checked = (event.target as HTMLInputElement | null)?.checked ?? false
  // 唯一 H5 数据源为受控 input，视觉由官方 input:checked 驱动
  if (group?.toggle) {
    group.toggle(props.value) // group 模式：toggle 依据当前 modelValue 增删
  } else {
    emit('update:checked', checked)
    emit('change', checked)
  }
}

const onNativeChange = (event: Event & { detail?: { checked?: boolean; value?: boolean | string[] } }) => {
  if (group) return
  const rawValue = event.detail?.value
  const checked = Array.isArray(rawValue)
    ? rawValue.includes(props.value)
    : event.detail?.checked
      ?? rawValue
    ?? (event.target as HTMLInputElement | null)?.checked
    ?? !isChecked.value
  emit('update:checked', checked)
  emit('change', checked)
}
</script>

<style lang="scss">
/* #ifdef H5 */
/* 选中视觉由官方 weui.css 的 input:checked + .weui-icon-checked 规则驱动，无需自定义样式 */
/* #endif */
</style>
