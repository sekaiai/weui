<template>
  <view :class="rootClass">
    <!-- 文字区域：title/desc 或 title slot -->
    <view v-if="hasText" class="weui-form__text-area">
      <slot name="title">
        <view v-if="title" class="weui-form__title">{{ title }}</view>
        <view v-if="desc" class="weui-form__desc">{{ desc }}</view>
      </slot>
    </view>

    <!-- 控件区域 -->
    <view class="weui-form__control-area">
      <slot />
    </view>

    <!-- 提示区域：tips 或 tips slot -->
    <view v-if="hasTips" class="weui-form__tips-area">
      <slot name="tips">{{ tips }}</slot>
    </view>

    <!-- 操作按钮区域：footer slot -->
    <view v-if="hasFooter" class="weui-form__opr-area">
      <slot name="footer" />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiForm',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiFormProps {
  /** 表单标题 */
  title?: string
  /** 表单描述 */
  desc?: string
  /** 提示文字 */
  tips?: string
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiFormProps>(), {
  title: undefined,
  desc: undefined,
  tips: undefined,
  extClass: undefined,
})

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-form']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasText = computed(() => Boolean(props.title || props.desc || slots.title))
const hasTips = computed(() => Boolean(props.tips || slots.tips))
const hasFooter = computed(() => Boolean(slots.footer))
</script>
