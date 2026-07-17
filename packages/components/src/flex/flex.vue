<template>
  <view :class="rootClass" :style="rootStyle">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiFlex',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export type WeuiFlexDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'

export type WeuiFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

export type WeuiFlexJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'

export type WeuiFlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

export interface WeuiFlexProps {
  /** 主轴方向 */
  direction?: WeuiFlexDirection
  /** 换行方式 */
  wrap?: WeuiFlexWrap
  /** 主轴对齐方式 */
  justify?: WeuiFlexJustify
  /** 交叉轴对齐方式 */
  align?: WeuiFlexAlign
  /** 根元素扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiFlexProps>(), {
  direction: 'row',
  wrap: 'nowrap',
  justify: 'start',
  align: 'center',
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-flex']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

// WeUI 仅提供 .weui-flex { display:flex } 与 .weui-flex__item { flex:1 }
// direction/wrap/justify/align 无对应类名，统一通过内联 style 输出
const mapMainAxis = (v: WeuiFlexJustify): string => {
  switch (v) {
    case 'start':
      return 'flex-start'
    case 'end':
      return 'flex-end'
    case 'between':
      return 'space-between'
    case 'around':
      return 'space-around'
    case 'evenly':
      return 'space-evenly'
    default:
      return v
  }
}

const mapCrossAxis = (v: WeuiFlexAlign): string => {
  switch (v) {
    case 'start':
      return 'flex-start'
    case 'end':
      return 'flex-end'
    default:
      return v
  }
}

const rootStyle = computed(() => {
  const style: Record<string, string> = {
    'flex-direction': props.direction,
    'flex-wrap': props.wrap,
    'justify-content': mapMainAxis(props.justify),
    'align-items': mapCrossAxis(props.align),
  }
  return style
})
</script>
