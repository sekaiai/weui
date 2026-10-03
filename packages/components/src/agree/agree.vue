<template>
  <label :class="rootClass" v-bind="$attrs">
    <!-- #ifdef H5 -->
    <input
      type="checkbox"
      class="weui-agree__checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <!--
      小程序端 <checkbox> 无法用 appearance/background 变成官方圆形样式，
      官方为此提供了「零尺寸代理 + aria-checked 兄弟选择器」的兼容写法：
        .weui-agree__checkbox-check[aria-checked="true"] + .weui-agree__checkbox { ...勾选态... }
      即代理元素负责承载选中态，真实 checkbox 只负责点击与无障碍语义。
      class 顺序不可调整，否则 + 相邻兄弟选择器会失效。
    -->
    <checkbox-group @change="handleChange">
      <checkbox
        class="weui-agree__checkbox-check"
        aria-checked="{{ modelValue ? 'true' : 'false' }}"
        value="__weui_agree__"
        :checked="modelValue"
        :disabled="disabled"
      />
      <view class="weui-agree__checkbox" />
    </checkbox-group>
    <!-- #endif -->
    <span class="weui-agree__text">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiAgree',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiAgreeProps {
  modelValue?: boolean
  disabled?: boolean
  /** 警告状态 */
  warn?: boolean
  /** 触发官方横向抖动动画 */
  animate?: boolean
  extClass?: string
}

export interface WeuiAgreeEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

const props = withDefaults(defineProps<WeuiAgreeProps>(), {
  modelValue: false,
  disabled: false,
  warn: false,
  animate: false,
})

const emit = defineEmits<WeuiAgreeEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-agree', 'weui-wa-hotarea']
  if (props.warn) classes.push('weui-agree_warn')
  if (props.animate) classes.push('weui-agree_animate')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const handleChange = (event: Event & { detail?: { value?: boolean | string[]; checked?: boolean } }) => {
  const rawValue = event.detail?.value
  const checked = Array.isArray(rawValue)
    ? rawValue.includes('__weui_agree__')
    : event.detail?.checked
      ?? rawValue
    ?? (event.target as HTMLInputElement | null)?.checked
    ?? false
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>
