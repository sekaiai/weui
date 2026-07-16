<template>
  <i :class="rootClass" :style="rootStyle" />
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
  /** 图标尺寸 px */
  size?: number | string
  /** 图标颜色 */
  color?: string
}

const props = withDefaults(defineProps<WeuiIconProps>(), {
  type: undefined,
  size: 23,
  color: undefined,
})

const rootClass = computed(() => `weui-icon-${props.type}`)

const rootStyle = computed(() => {
  const style: Record<string, string> = {
    'font-size': `${props.size}px`,
  }
  if (props.color) style['color'] = props.color
  return style
})
</script>
