<template>
  <view :class="rootClass">
    <!-- 头部：title 或 header slot -->
    <view v-if="hasHeader" class="weui-panel__hd">
      <slot name="header">{{ title }}</slot>
    </view>

    <!-- 主体 -->
    <view class="weui-panel__bd">
      <slot />
    </view>

    <!-- 底部：footer slot -->
    <view v-if="hasFooter" class="weui-panel__ft">
      <slot name="footer" />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiPanel',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiPanelProps {
  /** 头部标题 */
  title?: string
  /** 面板类型，access 模式添加 weui-panel_access 类 */
  type?: 'default' | 'access'
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiPanelProps>(), {
  title: undefined,
  type: 'default',
  extClass: undefined,
})

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-panel']
  if (props.type === 'access') classes.push('weui-panel_access')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasHeader = computed(() => Boolean(props.title || slots.header))
const hasFooter = computed(() => Boolean(slots.footer))
</script>
