<template>
  <label :class="rootClass" @click="__IS_H5__ ? handleClick() : undefined">
    <div class="weui-cell__hd">
      <!-- #ifdef H5 -->
      <input
        type="checkbox"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        @click.stop
        @change.stop="onH5Change"
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
      <div
        class="weui-icon-checked"
        :class="{ 'weui-icon-checked_selected': isChecked }"
      />
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
/*
 * 选中图标由 Vue 数据驱动（isChecked → weui-icon-checked_selected），
 * 不依赖原生 input 的 :checked 伪类——避免受控 input 点击时序下
 * DOM :checked 与数据不同步导致首次点击图标不显示。
 * 样式与官方 WeUI 选中 SVG 一致（仅机制从 :checked 伪类改为类绑定）。
 */
.weui-cells_checkbox .weui-icon-checked.weui-icon-checked_selected {
  background-image: url("data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' width='24' height='24' rx='12' fill='%2307C160' style='fill:%2307C160;fill:color(display-p3 0.0275 0.7569 0.3765);fill-opacity:1;'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.2712 16.2899L6.5 12.5187L7.44281 11.5759L10.7426 14.8757L18.2851 7.33325L19.2279 8.27606L11.214 16.2899C10.9537 16.5503 10.5316 16.5503 10.2712 16.2899Z' fill='white' style='fill:white;fill-opacity:1;'/%3E%3C/svg%3E%0A");
}
/* #endif */
</style>
