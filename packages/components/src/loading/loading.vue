<template>
  <view :class="rootClass" :style="rootStyle">
    <view
      class="weui-loading"
      :class="{ 'weui-loading_transparent': transparent }"
      :style="iconStyle"
    />
    <text v-if="hasText" class="weui-loading__text">
      <slot>{{ text }}</slot>
    </text>
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiLoading',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiLoadingProps {
  /** 显示模式：default 行内加载图标，page 居中加载状态 */
  type?: 'default' | 'page'
  /** 加载图标尺寸 px */
  size?: number
  /** 加载图标颜色 */
  color?: string
  /** 加载文字 */
  text?: string
  /** 透明背景模式 */
  transparent?: boolean
}

const props = withDefaults(defineProps<WeuiLoadingProps>(), {
  type: 'default',
  size: 20,
  color: '#999',
  text: undefined,
  transparent: false,
})

const slots = useSlots()

const hasText = computed(() => props.text !== undefined || !!slots.default)

const rootClass = computed(() => {
  if (props.type === 'page') {
    return ['weui-loadmore']
  }
  return []
})

const rootStyle = computed(() => {
  if (props.type === 'page') {
    return {}
  }
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  }
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    color: props.color,
  }
  return style
})
</script>
