<template>
  <span :class="rootClass" :style="rootStyle" />
</template>

<script lang="ts">
export default {
  name: 'WeuiIcon',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiIconProps {
  /** 图标类型，对应 weui 内置图标 */
  type: string
  /** 图标尺寸；数字和纯数字字符串按 px 处理，带单位的字符串原样使用 */
  size?: number | string
  /** 图标颜色 */
  color?: string
  /** 附加在根元素上的扩展类名，例如 weui-icon_msg */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiIconProps>(), {
  type: undefined,
  size: undefined,
  color: undefined,
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = [`weui-icon-${props.type}`]
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.size != null) {
    style['font-size'] = typeof props.size === 'number' || /^-?\d*\.?\d+$/.test(props.size)
      ? `${props.size}px`
      : props.size
  }
  if (props.color) style['color'] = props.color
  return style
})
</script>
