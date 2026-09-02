<template>
  <div :class="rootClass" :style="rootStyle" v-bind="$attrs">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFlexItem',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiFlexItemProps {
  /** 根元素扩展类名 */
  extClass?: string
  /** 自定义 flex 值；不设置时使用 weui-flex__item 的 flex:1 */
  flex?: number
}

const props = withDefaults(defineProps<WeuiFlexItemProps>(), {
  extClass: undefined,
  flex: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-flex__item']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const rootStyle = computed(() => {
  if (props.flex === undefined) return undefined
  return { flex: props.flex }
})
</script>
