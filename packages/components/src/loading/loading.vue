<template>
  <div :class="rootClass" :style="rootStyle">
    <div
      class="weui-loading"
      :class="{ 'weui-loading_transparent': transparent }"
      :style="iconStyle"
    />
    <span v-if="hasText" :class="textClass" :style="textStyle">
      <slot>{{ text }}</slot>
    </span>
  </div>
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
  /**
   * 加载图标/文字颜色
   * 注意：WeUI 的 .weui-loading 使用内嵌 SVG 固定色，不响应 currentColor，
   * 因此 color 仅影响文字颜色，不影响图标颜色。如需自定义图标颜色，
   * 请使用 .weui-mask-loading（响应 currentColor）。
   */
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

const textClass = computed(() => {
  // page 模式：使用 WeUI 的 .weui-loadmore__tips（font-size:14px 由 WeUI 提供）
  // default 模式：weui-loading__text 在 WeUI 中不存在，用内联 style 保证可见
  return props.type === 'page' ? 'weui-loadmore__tips' : 'weui-loading__text'
})

const textStyle = computed(() => {
  if (props.type === 'default') {
    return { 'font-size': '14px', 'margin-left': '8px', color: props.color }
  }
  return { color: props.color }
})
</script>
