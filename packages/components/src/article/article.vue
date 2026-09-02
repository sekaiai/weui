<template>
  <article :class="rootClass" v-bind="$attrs">
    <slot />
  </article>
</template>

<script lang="ts">
export default {
  name: 'WeuiArticle',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiArticleProps {
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiArticleProps>(), {
  extClass: undefined,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-article']
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
