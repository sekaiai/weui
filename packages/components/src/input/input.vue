<template>
  <div v-if="clearable" class="weui-input__wrapper">
    <input
      ref="inputRef"
      :class="[inputClass, $attrs.class]"
      :value="modelValue"
      :type="inputType"
      :focus="__IS_H5__ ? undefined : effectiveFocus"
      :confirm-type="__IS_H5__ ? undefined : confirmType"
      :password="__IS_H5__ ? undefined : type === 'password'"
      :enterkeyhint="__IS_H5__ ? confirmType : undefined"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="handleConfirm"
      @confirm="handleConfirm"
      @keyboardheightchange="handleKeyboardHeightChange"
      @nicknamereview="handleNicknameReview"
    />
    <button
      v-if="showClear"
      type="button"
      class="weui-icon-clear"
      @click="handleClear"
    />
  </div>
  <input
    v-else
    ref="inputRef"
    :class="[inputClass, $attrs.class]"
    :value="modelValue"
    :type="inputType"
    :focus="__IS_H5__ ? undefined : effectiveFocus"
    :confirm-type="__IS_H5__ ? undefined : confirmType"
    :password="__IS_H5__ ? undefined : type === 'password'"
    :enterkeyhint="__IS_H5__ ? confirmType : undefined"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown.enter="handleConfirm"
    @confirm="handleConfirm"
    @keyboardheightchange="handleKeyboardHeightChange"
    @nicknamereview="handleNicknameReview"
  />
</template>

<script lang="ts">
export default {
  name: 'WeuiInput',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
/// <reference path="../globals.d.ts" />
import { computed, onMounted, ref, watch } from 'vue'

export interface WeuiInputProps {
  /** v-model 绑定值 */
  modelValue?: string
  /** 占位提示文字 */
  placeholder?: string
  /** 输入类型。safe-password 与 nickname 仅微信小程序支持。 */
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'password' | 'safe-password' | 'nickname'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 最大输入长度，-1 为不限制 */
  maxlength?: number
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 获取焦点（H5 端通过 ref.focus() 实现；小程序端通过 :focus 属性） */
  focus?: boolean
  /** 小程序官方 auto-focus 兼容入口，等同于 focus。 */
  autoFocus?: boolean
  /** 小程序键盘右下角按钮文案；H5 映射为 enterkeyhint。 */
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'confirm', event: Event): void
  (e: 'keyboardheightchange', event: Event): void
  (e: 'nicknamereview', event: Event): void
  (e: 'clear'): void
}

const props = withDefaults(defineProps<WeuiInputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  maxlength: 140,
  clearable: false,
  focus: false,
  autoFocus: false,
  confirmType: 'done',
})

const emit = defineEmits<WeuiInputEmits>()
const inputRef = ref<HTMLInputElement | null>(null)

const inputClass = computed(() => {
  const classes: string[] = ['weui-input']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

// H5 端 type 映射：password 保持 password，微信小程序专属键盘类型降级为 text。
// 非 H5 端：password 用 'text' + :password 属性，其他官方 type 原样传递。
const inputType = computed(() => {
  if (props.type === 'password') return __IS_H5__ ? 'password' : 'text'
  if (props.type === 'idcard' || props.type === 'digit' || props.type === 'safe-password' || props.type === 'nickname') return __IS_H5__ ? 'text' : props.type
  return props.type
})

const effectiveFocus = computed(() => props.focus || props.autoFocus)

const showClear = computed(
  () => props.clearable && !!props.modelValue && !props.disabled,
)

// H5 端：focus prop 变化时调用 DOM focus()/blur()
// 非 H5 端：:focus 属性已由 uniOnlyAttrs 绑定，无需 watch
if (__IS_H5__) {
  watch(effectiveFocus, (val) => {
    if (val) {
      // happy-dom 等测试环境下 input.focus 可能缺失，需守卫
      if (typeof inputRef.value?.focus === 'function') inputRef.value.focus()
    } else {
      inputRef.value?.blur()
    }
  })
  onMounted(() => {
    if (effectiveFocus.value && typeof inputRef.value?.focus === 'function') {
      inputRef.value.focus()
    }
  })
}

const handleInput = (event: Event) => {
  // uni-app: event.detail.value；DOM: event.target.value
  const e = event as Event & { detail?: { value?: string } }
  const value = e.detail?.value ?? (event.target as HTMLInputElement)?.value ?? ''
  emit('update:modelValue', value)
  emit('input', event)
}

const handleChange = (event: Event) => emit('change', event)
const handleFocus = (event: Event) => emit('focus', event)
const handleBlur = (event: Event) => emit('blur', event)

// H5 端：keydown.enter 触发 confirm
// 非 H5 端：@confirm 事件触发（uni-app 键盘完成键）
const handleConfirm = (event: Event) => emit('confirm', event)
const handleKeyboardHeightChange = (event: Event) => emit('keyboardheightchange', event)
const handleNicknameReview = (event: Event) => emit('nicknamereview', event)

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

.weui-input__wrapper {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
}
</style>
