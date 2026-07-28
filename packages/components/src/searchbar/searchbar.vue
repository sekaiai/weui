<template>
  <div :class="rootClass">
    <div class="weui-search-bar__form">
      <div class="weui-search-bar__box">
        <div class="weui-icon-search" />
        <input
          ref="inputRef"
          class="weui-search-bar__input"
          :value="modelValue"
          :placeholder="placeholder"
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
      <div class="weui-search-bar__label" @click="handleLabelClick">
        <div class="weui-icon-search" />
        <span>{{ placeholder }}</span>
      </div>
    </div>
    <div
      v-if="showCancelButton"
      class="weui-search-bar__cancel-btn"
      @click="handleCancel"
    >{{ cancelText }}</div>
    <div
      v-if="searchButtonText"
      class="weui-search-bar__search-btn"
      @click="handleSearch"
    >{{ searchButtonText }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiSearchbar',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface WeuiSearchbarProps {
  /** v-model 绑定值 */
  modelValue?: string
  /** 占位提示文字 */
  placeholder?: string
  /** 取消按钮文字 */
  cancelText?: string
  /** 是否自动聚焦（H5 端通过 ref.focus() 实现；小程序端通过 :focus 属性） */
  focus?: boolean
  /** 搜索按钮文字，不设置则不显示搜索按钮，只显示取消按钮 */
  searchButtonText?: string
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiSearchbarEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'confirm', event: Event): void
  (e: 'cancel'): void
  (e: 'clear'): void
  (e: 'search', value: string): void
}

const props = withDefaults(defineProps<WeuiSearchbarProps>(), {
  modelValue: '',
  placeholder: '搜索',
  cancelText: '取消',
  focus: false,
})

const emit = defineEmits<WeuiSearchbarEmits>()

const inputRef = ref<HTMLInputElement | null>(null)

/** 输入框是否聚焦（视觉状态，有值时 blur 后保持 true） */
const focused = ref(props.focus)

const rootClass = computed(() => {
  const classes: string[] = ['weui-search-bar']
  if (focused.value) classes.push('weui-search-bar_focusing')
  if (props.searchButtonText) classes.push('weui-search-bar_outlined')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const showClear = computed(() => !!props.modelValue)
const showCancelButton = computed(() => focused.value && !props.searchButtonText)

// 非 H5 端专属属性（H5 端浏览器忽略 confirm-type / :focus）
// H5 端 focus 由 watch + ref.focus() 处理，不绑 :focus 属性
// 非 H5 端通过 :focus 属性驱动 uni input 原生聚焦
const uniOnlyAttrs = computed(() => {
  if (__IS_H5__) return {}
  return {
    'confirm-type': 'search',
    focus: props.focus || undefined,
  }
})

// H5 端：focus prop 变化时调用 DOM focus()/blur()
// 非 H5 端：仅同步 focused 视觉状态（:focus 属性由 uniOnlyAttrs 绑定，uni 原生组件处理）
watch(() => props.focus, (val) => {
  focused.value = val
  if (__IS_H5__) {
    if (val) inputRef.value?.focus()
    else inputRef.value?.blur()
  }
})

const handleInput = (event: Event) => {
  const e = event as Event & { detail?: { value?: string } }
  const value = e.detail?.value ?? (event.target as HTMLInputElement)?.value ?? ''
  emit('update:modelValue', value)
}

const handleFocus = (event: Event) => {
  focused.value = true
  emit('focus', event)
}

const handleBlur = (event: Event) => {
  // 有值时保持聚焦态外观（不"回复原样"）
  if (!props.modelValue) {
    focused.value = false
  }
  emit('blur', event)
}

// H5 端：keydown.enter 触发 confirm
// 非 H5 端：@confirm 事件触发（uni-app 键盘完成键，confirm-type="search"）
const handleConfirm = (event: Event) => {
  emit('confirm', event)
  emit('search', props.modelValue)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const handleCancel = () => {
  focused.value = false
  emit('cancel')
}

const handleSearch = () => {
  emit('search', props.modelValue)
  // 点击搜索按钮后聚焦输入框（让用户能继续输入新关键词）
  focused.value = true
  if (__IS_H5__) inputRef.value?.focus()
}

const handleLabelClick = () => {
  focused.value = true
  if (__IS_H5__) inputRef.value?.focus()
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
