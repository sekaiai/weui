<template>
  <label :class="rootClass" v-bind="$attrs">
    <div class="weui-cell__bd"><p><slot>{{ label }}</slot></p></div>
    <div class="weui-cell__ft">
      <!-- #ifdef H5 -->
      <input
        type="radio"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        :name="group?.name?.value"
        @change="onChange"
      />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <!--
        小程序端原生 <radio> 无法用 appearance/background 变成官方圆形样式，
        官方 weui.css 约定用「weui-check 代理 + aria-checked 相邻兄弟选择器」：
          .weui-cells_radio .weui-check[aria-checked="true"] + .weui-icon-checked {...}
        因此原生 radio 需挂 weui-check 并紧邻 .weui-icon-checked 视觉元素。
      -->
      <radio-group v-if="!group" @change="onNativeChange">
        <radio
          class="weui-check"
          aria-checked="{{ isChecked ? 'true' : 'false' }}"
          :value="value"
          :checked="isChecked"
          :disabled="isDisabled"
        />
        <view class="weui-icon-checked" />
      </radio-group>
      <template v-else>
        <radio
          class="weui-check"
          aria-checked="{{ isChecked ? 'true' : 'false' }}"
          :value="value"
          :checked="isChecked"
          :disabled="isDisabled"
        />
        <view class="weui-icon-checked" />
      </template>
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <span class="weui-icon-checked"></span>
      <!-- #endif -->
    </div>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiRadio',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'

export interface WeuiRadioProps {
  value: string
  label?: string
  disabled?: boolean
  extClass?: string
}

export interface WeuiRadioEmits {
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<WeuiRadioProps>(), {
  disabled: false,
})

const emit = defineEmits<WeuiRadioEmits>()

interface RadioGroupContext {
  modelValue: { value: string }
  name: { value: string }
  disabled: { value: boolean }
  onChange?: (value: string) => void
}

const group = inject<RadioGroupContext | null>('weuiRadioGroup', null)

const isChecked = computed(() => group?.modelValue.value === props.value)
const isDisabled = computed(() => props.disabled || (group?.disabled.value ?? false))

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active', 'weui-check__label']
  if (isDisabled.value) classes.push('weui-cell_disabled')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onChange = () => {
  if (group?.onChange) {
    group.onChange(props.value)
  } else {
    emit('change', props.value)
  }
}

const onNativeChange = (event: Event & { detail?: { value?: string } }) => {
  // Native radio-group owns grouped changes. Standalone radios still emit.
  if (group) return
  const value = event.detail?.value
    ?? (event.target as HTMLInputElement | null)?.value
    ?? props.value
  emit('change', value)
}
</script>
