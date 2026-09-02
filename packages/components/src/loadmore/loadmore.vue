<template>
  <div :class="rootClass" :role="role" v-bind="$attrs">
    <span
      v-if="type === 'default'"
      class="weui-primary-loading"
      role="img"
      :aria-label="text"
    ><i class="weui-primary-loading__dot" /></span>
    <span v-if="showTips" class="weui-loadmore__tips">{{ visibleText }}</span>
    <span v-if="type === 'dot'" class="weui-hidden_abs">{{ accessibleText }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiLoadmore',
  inheritAttrs: false,
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
  /** 是否显示 default / line 模式的可见文字；dot 模式固定显示视觉圆点。 */
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

const showTips = computed(() => props.type === 'dot' || props.showText)
const visibleText = computed(() => props.type === 'dot' ? '' : props.text)
const accessibleText = computed(() => props.type === 'dot' && props.text === '正在加载' ? '已无更多数据' : props.text)
const role = computed(() => props.type === 'default' ? 'alert' : props.type === 'dot' ? 'option' : undefined)
</script>
