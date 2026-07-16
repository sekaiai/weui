<template>
  <view :class="rootClass">
    <input
      class="weui-input"
      :value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :focus="focus || undefined"
      :password="isPassword || undefined"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @confirm="handleConfirm"
    />
    <view
      v-if="showClear"
      class="weui-icon-clear"
      @click="handleClear"
    />
  </view>
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
import { computed } from 'vue'

export interface WeuiInputProps {
  /** v-model 绑定值 */
  modelValue?: string
  /** 占位提示文字 */
  placeholder?: string
  /** 输入类型，password 时使用原生 password 属性 */
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'password'
  /** 是否禁用 */
  disabled?: boolean
  /** 最大输入长度，-1 为不限制 */
  maxlength?: number
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 获取焦点 */
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

const rootClass = computed(() => {
  const classes: string[] = ['weui-input']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const inputType = computed(() => (props.type === 'password' ? 'text' : props.type))
const isPassword = computed(() => props.type === 'password')

const showClear = computed(
  () => props.clearable && !!props.modelValue && !props.disabled,
)

const handleInput = (event: Event) => {
  // uni-app: event.detail.value；DOM: event.target.value
  const e = event as Event & { detail?: { value?: string } }
  const value = e.detail?.value ?? (event.target as HTMLInputElement)?.value ?? ''
  emit('update:modelValue', value)
}

const handleFocus = (event: Event) => emit('focus', event)
const handleBlur = (event: Event) => emit('blur', event)
const handleConfirm = (event: Event) => emit('confirm', event)

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>
