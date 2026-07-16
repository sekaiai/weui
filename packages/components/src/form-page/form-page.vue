<template>
  <view :class="rootClass">
    <!-- 标题区域：title/desc 或 title slot -->
    <view v-if="hasTitle" class="weui-form__text-area">
      <slot name="title">
        <view v-if="title" class="weui-form__title">{{ title }}</view>
        <view v-if="desc" class="weui-form__desc">{{ desc }}</view>
      </slot>
    </view>

    <!-- 主体内容区域 -->
    <view class="weui-form__control-area">
      <slot />
    </view>

    <!-- 底部操作区域：footer slot -->
    <view v-if="hasFooter" class="weui-form__opr-area">
      <slot name="footer" />
    </view>
  </view>
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
