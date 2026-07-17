<template>
  <view :class="rootClass">
    <view
      v-for="(step, index) in steps"
      :key="index"
      :class="itemClass(index)"
    >
      <view class="weui-steps__item__inner">
        <view class="weui-steps__item__title">{{ step.title }}</view>
        <view v-if="step.desc" class="weui-steps__item__desc">{{ step.desc }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiSteps',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface StepItem {
  /** 步骤标题 */
  title: string
  /** 步骤描述 */
  desc?: string
}

export interface WeuiStepsProps {
  /** 步骤列表 */
  steps: StepItem[]
  /** 当前步骤索引 */
  current?: number
  /** 方向：horizontal 水平 / vertical 垂直 */
  direction?: 'horizontal' | 'vertical'
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiStepsProps>(), {
  current: 0,
  direction: 'horizontal',
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-steps']
  if (props.direction === 'vertical') {
    classes.push('weui-steps_vertical')
  } else {
    classes.push('weui-steps_horizonal')
  }
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const itemClass = (index: number) => {
  const classes: string[] = ['weui-steps__item']
  if (index < props.current) classes.push('weui-steps__item_success')
  return classes
}
</script>
