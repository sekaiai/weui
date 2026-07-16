<template>
  <view :class="rootClass">
    <view class="weui-search-bar__form">
      <view class="weui-search-bar__box">
        <view class="weui-icon-search" />
        <input
          class="weui-search-bar__input"
          :value="modelValue"
          :focus="inputFocus || undefined"
          :placeholder="placeholder"
          confirm-type="search"
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
      <view class="weui-search-bar__label" @click="handleLabelClick">
        <view class="weui-icon-search" />
        <text>{{ placeholder }}</text>
      </view>
    </view>
    <view
      v-if="showCancelButton"
      class="weui-search-bar__cancel-btn"
      @click="handleCancel"
    >{{ cancelText }}</view>
    <view
      v-if="searchButtonText"
      class="weui-search-bar__btn"
      @click="handleSearch"
    >{{ searchButtonText }}</view>
  </view>
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
import { ref, computed } from 'vue'

export interface WeuiSearchbarProps {
  /** v-model 绑定值 */
  modelValue?: string
  /** 占位提示文字 */
  placeholder?: string
  /** 取消按钮文字 */
  cancelText?: string
  /** 是否自动聚焦 */
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
  searchButtonText: undefined,
  extClass: undefined,
})

const emit = defineEmits<WeuiSearchbarEmits>()

/** 输入框是否聚焦 */
const focused = ref(props.focus)
/** 控制原生 input 的 focus 属性 */
const inputFocus = ref(props.focus)

const rootClass = computed(() => {
  const classes: string[] = ['weui-search-bar']
  if (focused.value) classes.push('weui-search-bar_focusing')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const showClear = computed(() => !!props.modelValue)

const showCancelButton = computed(() => focused.value && !props.searchButtonText)

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
  focused.value = false
  emit('blur', event)
}

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
  inputFocus.value = false
  emit('cancel')
}

const handleSearch = () => {
  emit('search', props.modelValue)
}

const handleLabelClick = () => {
  focused.value = true
  inputFocus.value = true
}
</script>
