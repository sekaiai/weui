<template>
  <div :class="rootClass">
    <!-- 文字区域：title/desc 或 title slot -->
    <div v-if="hasText" class="weui-form__text-area">
      <slot name="title">
        <div v-if="title" class="weui-form__title">{{ title }}</div>
        <div v-if="desc" class="weui-form__desc">{{ desc }}</div>
      </slot>
    </div>

    <!-- 控件区域 -->
    <div class="weui-form__control-area">
      <slot />
    </div>

    <!-- 提示区域：tips 或 tips slot -->
    <div v-if="hasTips" class="weui-form__tips-area">
      <slot name="tips">{{ tips }}</slot>
    </div>

    <!-- 操作按钮区域：footer slot -->
    <div v-if="hasFooter" class="weui-form__opr-area">
      <slot name="footer" />
    </div>
  </div>
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
