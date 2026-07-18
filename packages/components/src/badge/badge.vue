<template>
  <span
    :class="rootClass"
    :aria-label="ariaLabel"
  >{{ content }}</span>
</template>

<script lang="ts">
export default {
  name: 'WeuiBadge',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiBadgeProps {
  /** 徽章内容；为空时自动切换为红点模式 */
  content?: string
  /** 附加在根元素上的扩展类名 */
  extClass?: string
  /** 无障碍标签，输出到 aria-label */
  ariaLabel?: string
}

const props = withDefaults(defineProps<WeuiBadgeProps>(), {
  content: '',
  extClass: undefined,
  ariaLabel: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-badge']
  if (!props.content) classes.push('weui-badge_dot')
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
