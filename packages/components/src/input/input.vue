<template>
  <div :class="rootClass">
    <input
      ref="inputRef"
      class="weui-input"
      :value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      v-bind="uniOnlyAttrs"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="handleConfirm"
      @confirm="handleConfirm"
    />
    <div
      v-if="showClear"
      class="weui-icon-clear"
      @click="handleClear"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiInput',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
/// <reference path="../globals.d.ts" />
import { computed, ref, watch } from 'vue'

export interface WeuiInputProps {
  /** v-model 绑定值 */
  modelValue?: string
  /** 占位提示文字 */
  placeholder?: string
  /** 输入类型。password 在 H5 端用原生 password 类型；idcard/digit 在 H5 端降级为 text */
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'password'
  /** 是否禁用 */
  disabled?: boolean
  /** 最大输入长度，-1 为不限制 */
  maxlength?: number
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 获取焦点（H5 端通过 ref.focus() 实现；小程序端通过 :focus 属性） */
  focus?: boolean
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'confirm', event: Event): void
  (e: 'clear'): void
}

const props = withDefaults(defineProps<WeuiInputProps>(), {
  modelValue: '',
  placeholder: undefined,
  type: 'text',
  disabled: false,
  maxlength: 140,
  clearable: false,
  focus: false,
  extClass: undefined,
})

const emit = defineEmits<WeuiInputEmits>()

const inputRef = ref<HTMLInputElement | null>(null)

const rootClass = computed(() => {
  const classes: string[] = ['weui-input']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

// H5 端 type 映射：password 保持 password，idcard/digit 降级为 text
// 非 H5 端：password 用 'text' + :password 属性（uni input 不支持 password type），idcard/digit 保留 uni 类型
const inputType = computed(() => {
  if (props.type === 'password') return __IS_H5__ ? 'password' : 'text'
  if (props.type === 'idcard' || props.type === 'digit') return __IS_H5__ ? 'text' : props.type
  return props.type
})

// 非 H5 端专属属性（H5 端浏览器忽略 :focus/:password/confirm-type）
// H5 端 focus 由 watch + ref.focus() 处理，不绑 :focus 属性
const uniOnlyAttrs = computed(() => {
  if (__IS_H5__) return {}
  const attrs: Record<string, any> = {
    focus: props.focus || undefined,
    'confirm-type': 'done',
  }
  if (props.type === 'password') attrs['password'] = true
  return attrs
})

const showClear = computed(
  () => props.clearable && !!props.modelValue && !props.disabled,
)

// H5 端：focus prop 变化时调用 DOM focus()/blur()
// 非 H5 端：:focus 属性已由 uniOnlyAttrs 绑定，无需 watch
if (__IS_H5__) {
  watch(() => props.focus, (val) => {
    if (val) inputRef.value?.focus()
    else inputRef.value?.blur()
  }, { immediate: true })
}

const handleInput = (event: Event) => {
  // uni-app: event.detail.value；DOM: event.target.value
  const e = event as Event & { detail?: { value?: string } }
  const value = e.detail?.value ?? (event.target as HTMLInputElement)?.value ?? ''
  emit('update:modelValue', value)
}

const handleFocus = (event: Event) => emit('focus', event)
const handleBlur = (event: Event) => emit('blur', event)

// H5 端：keydown.enter 触发 confirm
// 非 H5 端：@confirm 事件触发（uni-app 键盘完成键）
const handleConfirm = (event: Event) => emit('confirm', event)

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style lang="scss">
/* weui.css 仅提供 mask-image + color，缺尺寸/背景 */
.weui-icon-clear {
  width: 16px;
  height: 16px;
  background-color: currentColor;
}
</style>
