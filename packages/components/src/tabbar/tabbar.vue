<template>
  <div :class="rootClass" :style="rootStyle">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiTabbar',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiTabbarProps {
  /** 是否固定在底部 */
  fixed?: boolean
  /** 根元素扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiTabbarProps>(), {
  fixed: false,
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-tabbar']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const rootStyle = computed(() => {
  if (!props.fixed) return undefined
  return {
    position: 'fixed' as const,
    bottom: '0',
    left: '0',
    right: '0',
  }
})
</script>
