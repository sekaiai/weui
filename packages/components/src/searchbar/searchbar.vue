<template>
  <div :class="rootClass">
    <a
      v-if="showBackButton"
      href="#"
      role="button"
      class="weui-search-bar__back-btn"
      aria-label="返回"
      @click.prevent="handleBack"
    ><i class="weui-icon-back-arrow-thin" /></a>
    <form
      v-if="isHomepage"
      class="weui-search-bar__form"
      role="search"
      @submit.prevent
    >
      <div class="weui-search-bar__box">
        <div class="weui-search-bar__input weui-search-bar__input_text">{{ homepageText || placeholder }}</div>
        <a
          v-if="showCamera"
          href="#"
          role="button"
          class="weui-icon-camera weui-wa-hotarea"
          aria-label="拍照"
          @click.prevent="handleCamera"
        />
      </div>
    </form>
    <form
      v-else
      class="weui-search-bar__form"
      role="search"
      @submit.prevent="handleConfirm"
    >
      <div class="weui-search-bar__box">
        <i class="weui-icon-search" />
        <span v-if="words" class="weui-search-bar__words">{{ words }}</span>
        <input
          ref="inputRef"
          type="search"
          class="weui-search-bar__input"
          :value="modelValue"
          :placeholder="placeholder"
          v-bind="uniOnlyAttrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
        />
        <a
          v-if="showClear"
          href="#"
          role="button"
          class="weui-icon-clear"
          aria-label="清除"
          @click.prevent="handleClear"
        />
      </div>
      <label v-if="!isOutlined" class="weui-search-bar__label" @click="handleLabelClick">
        <i class="weui-icon-search" />
        <span class="weui-search-bar__label__text">{{ placeholder }}</span>
      </label>
    </form>
    <div
      v-if="showCancelButton"
      class="weui-search-bar__cancel-btn"
      @click="handleCancel"
    >{{ cancelText }}</div>
    <div
      v-if="showSearchButton"
      class="weui-search-bar__search-btn weui-btn weui-btn_primary"
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
  /** 官方视觉模式：filled、filled-grey、outlined、homepage */
  mode?: 'filled' | 'filled-grey' | 'outlined' | 'homepage'
  /** 搜索词前缀，适用于 filled / filled-grey 模式 */
  words?: string
  /** 是否显示返回按钮 */
  showBackButton?: boolean
  /** 首页搜索栏展示文字，仅 mode 为 homepage 时使用 */
  homepageText?: string
  /** 首页搜索栏是否显示拍照入口，仅 mode 为 homepage 时使用 */
  showCamera?: boolean
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
  (e: 'back'): void
  (e: 'camera'): void
}

const props = withDefaults(defineProps<WeuiSearchbarProps>(), {
  modelValue: '',
  placeholder: '搜索',
  cancelText: '取消',
  focus: false,
  mode: 'filled',
  words: '',
  showBackButton: false,
  homepageText: '',
  showCamera: true,
})

const emit = defineEmits<WeuiSearchbarEmits>()

const inputRef = ref<HTMLInputElement | null>(null)

/** 输入框是否聚焦（视觉状态，有值时 blur 后保持 true） */
const focused = ref(props.focus)
const isHomepage = computed(() => props.mode === 'homepage')
const isOutlined = computed(() => props.mode === 'outlined' || !!props.searchButtonText)

const rootClass = computed(() => {
  const classes: string[] = ['weui-search-bar']
  if (focused.value) classes.push('weui-search-bar_focusing')
  if (isOutlined.value) classes.push('weui-search-bar_outlined')
  else if (props.mode === 'filled-grey') classes.push('weui-search-bar_filled-grey')
  else if (isHomepage.value) classes.push('weui-search-bar_homepage')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const showClear = computed(() => !!props.modelValue)
const showCancelButton = computed(() => !isHomepage.value && (isOutlined.value || focused.value))
const showSearchButton = computed(() => !isHomepage.value && isOutlined.value && !!props.searchButtonText)

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

// H5 端：form submit 触发 confirm
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

const handleBack = () => emit('back')

const handleCamera = () => emit('camera')

const handleLabelClick = () => {
  focused.value = true
  if (__IS_H5__) inputRef.value?.focus()
}
</script>

<style lang="scss">
/* weui.css 仅提供 mask-image + color，缺尺寸/背景 */
.weui-icon-clear {
  border: 0;
  padding: 0;
  color: inherit;
  text-decoration: none;
}

</style>
