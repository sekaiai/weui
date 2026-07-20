<template>
  <div :class="rootClass">
    <!-- 标题 -->
    <div v-if="title" class="weui-list__title">{{ title }}</div>

    <!-- 主体 -->
    <slot />

    <!-- 底部提示 -->
    <div v-if="tips" class="weui-list__tips">{{ tips }}</div>
  </div>
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

<style lang="scss">
/* WeUI v2 中不存在 weui-list 系列类名（仅有 weui-cells / weui-list-tips）
   list 定位为通用列表容器，独立于 cell-group，在此补充自定义样式 */
.weui-list {
  margin-top: 8px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scaleY(0.5);
    transform-origin: 0 0;
    z-index: 2;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scaleY(0.5);
    transform-origin: 0 100%;
    z-index: 2;
  }
}
.weui-list__title {
  margin-top: 16px;
  margin-bottom: 3px;
  padding-left: 16px;
  padding-right: 16px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  line-height: 1.4;

  & + .weui-list {
    margin-top: 0;
  }
}
.weui-list__tips {
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.5);
  padding-left: 16px;
  padding-right: 16px;
  font-size: 14px;
  line-height: 1.4;
}
</style>
