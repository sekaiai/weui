<template>
  <div :class="rootClass">
    <!-- 标题区域：title/desc 或 title slot -->
    <div v-if="hasTitle" class="weui-form__text-area">
      <slot name="title">
        <div v-if="title" class="weui-form__title">{{ title }}</div>
        <div v-if="desc" class="weui-form__desc">{{ desc }}</div>
      </slot>
    </div>

    <!-- 主体内容区域 -->
    <div class="weui-form__control-area">
      <slot />
    </div>

    <!-- 底部操作区域：footer slot -->
    <div v-if="hasFooter" class="weui-form__opr-area">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFormPage',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiFormPageProps {
  /** 页面标题 */
  title?: string
  /** 页面描述 */
  desc?: string
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiFormPageProps>(), {
  title: undefined,
  desc: undefined,
  extClass: undefined,
})

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-form-page']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasTitle = computed(() => Boolean(props.title || props.desc || slots.title))
const hasFooter = computed(() => Boolean(slots.footer))
</script>
