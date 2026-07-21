<template>
  <div :class="rootClass">
    <slot>
      <p v-if="hasLinks" class="weui-footer__links">
        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link.url"
          class="weui-footer__link"
        >{{ link.text }}</a>
      </p>
      <p v-if="text" class="weui-footer__text">{{ text }}</p>
    </slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFooter',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface FooterLink {
  /** 链接文字 */
  text: string
  /** 链接地址，提供时渲染为 navigator */
  url?: string
}

export interface WeuiFooterProps {
  /** 底部文字 */
  text?: string
  /** 链接列表 */
  links?: FooterLink[]
  /** 是否固定在底部 */
  fixed?: boolean
}

const props = withDefaults(defineProps<WeuiFooterProps>(), {
  text: undefined,
  links: undefined,
  fixed: false,
})

const rootClass = computed(() => {
  const classes: string[] = ['weui-footer']
  if (props.fixed) classes.push('weui-footer_fixed-bottom')
  return classes
})

const hasLinks = computed(
  () => Array.isArray(props.links) && props.links.length > 0,
)
</script>
