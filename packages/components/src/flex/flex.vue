<template>
  <view :class="rootClass">
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
  if (props.direction === 'column') classes.push('weui-flex__direction-column')
  if (props.direction === 'row-reverse')
    classes.push('weui-flex__direction-row-reverse')
  if (props.direction === 'column-reverse')
    classes.push('weui-flex__direction-column-reverse')
  if (props.wrap === 'wrap') classes.push('weui-flex__wrap-wrap')
  if (props.wrap === 'wrap-reverse') classes.push('weui-flex__wrap-wrap-reverse')
  if (props.justify === 'between') classes.push('weui-flex__justify-between')
  if (props.justify === 'around') classes.push('weui-flex__justify-around')
  if (props.justify === 'center') classes.push('weui-flex__justify-center')
  if (props.justify === 'end') classes.push('weui-flex__justify-end')
  if (props.align === 'start') classes.push('weui-flex__align-start')
  if (props.align === 'end') classes.push('weui-flex__align-end')
  if (props.align === 'baseline') classes.push('weui-flex__align-baseline')
  if (props.align === 'stretch') classes.push('weui-flex__align-stretch')
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
