<template>
  <div :class="rootClass">
    <div class="weui-progress__bar" :style="barStyle">
      <div
        class="weui-progress__inner-bar"
        :style="innerBarStyle"
      ></div>
    </div>
    <span
      v-if="showInfo"
      class="weui-progress__info"
      :style="infoStyle"
    >{{ displayPercent }}%</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiProgress',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiProgressProps {
  /** 进度百分比 0-100 */
  percent: number
  /** 是否显示右侧百分比文字 */
  showInfo?: boolean
  /** 进度条高度 px */
  strokeWidth?: number
  /** 进度条激活颜色 */
  activeColor?: string
  /** 进度条背景色 */
  backgroundColor?: string
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiProgressProps>(), {
  showInfo: true,
  strokeWidth: undefined,
  activeColor: undefined,
  backgroundColor: undefined,
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-progress']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const barStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.strokeWidth != null) style.height = `${props.strokeWidth}px`
  if (props.backgroundColor) style['background-color'] = props.backgroundColor
  return style
})

const innerBarStyle = computed(() => {
  const style: Record<string, string> = {}
  const pct = Math.max(0, Math.min(100, props.percent))
  style.width = `${pct}%`
  if (props.activeColor) style['background-color'] = props.activeColor
  return style
})

const displayPercent = computed(() => Math.round(props.percent))

const infoStyle = computed(() => ({
  'font-size': '14px',
  'margin-left': '15px',
}))
</script>
