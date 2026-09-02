<template>
  <div :class="rootClass" v-bind="$attrs">
    <div class="weui-progress__bar" :style="barStyle">
      <div
        class="weui-progress__inner-bar"
        :style="innerBarStyle"
      ></div>
    </div>
    <a
      v-if="showOperation"
      href="javascript:"
      role="button"
      class="weui-wa-hotarea weui-progress__opr"
      @click.prevent="emit('cancel')"
    >
      <slot name="operation"><i role="img" :aria-label="cancelText" class="weui-icon-cancel" /></slot>
    </a>
    <span v-if="showInfo" role="alert" class="weui-hidden_abs weui-progress__info">{{ displayPercent }}%</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiProgress',
  inheritAttrs: false,
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
  /** 是否显示官方取消操作 */
  showOperation?: boolean
  /** 默认取消图标的辅助文字 */
  cancelText?: string
  /** 进度条高度 px */
  strokeWidth?: number
  /** 进度条激活颜色 */
  activeColor?: string
  /** 进度条背景色 */
  backgroundColor?: string
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

export interface WeuiProgressEmits {
  /** 点击取消操作时触发 */
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<WeuiProgressProps>(), {
  showInfo: true,
  showOperation: true,
  cancelText: '取消',
  strokeWidth: undefined,
  activeColor: undefined,
  backgroundColor: undefined,
  extClass: undefined,
})

const emit = defineEmits<WeuiProgressEmits>()

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
</script>
