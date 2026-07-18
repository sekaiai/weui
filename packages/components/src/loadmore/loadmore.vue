<template>
  <div :class="rootClass">
    <div v-if="type === 'default'" class="weui-loading" />
    <span v-if="showText" class="weui-loadmore__tips">{{ text }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiLoadmore',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiLoadmoreProps {
  /** 显示模式：default 加载图标+文字，line 分割线+文字，dot 三个点 */
  type?: 'default' | 'line' | 'dot'
  /** 文字内容 */
  text?: string
  /** 是否显示文字 */
  showText?: boolean
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiLoadmoreProps>(), {
  type: 'default',
  text: '正在加载',
  showText: true,
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-loadmore']
  if (props.type === 'line') classes.push('weui-loadmore_line')
  if (props.type === 'dot') classes.push('weui-loadmore_dot')
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
