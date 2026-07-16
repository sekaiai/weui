<template>
  <view :class="rootClass">
    <!-- 标题 -->
    <view v-if="title" class="weui-list__title">{{ title }}</view>

    <!-- 主体 -->
    <slot />

    <!-- 底部提示 -->
    <view v-if="tips" class="weui-list__tips">{{ tips }}</view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiList',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiListProps {
  /** 列表标题 */
  title?: string
  /** 列表底部提示文字 */
  tips?: string
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiListProps>(), {
  title: undefined,
  tips: undefined,
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-list']
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
