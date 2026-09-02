<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiGrid',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiGridProps {
  /** 根元素扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiGridProps>(), {
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-grids']
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
