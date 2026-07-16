<template>
  <view :class="rootClass">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiNavbar',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiNavbarProps {
  /** 根元素扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiNavbarProps>(), {
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-navbar']
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
