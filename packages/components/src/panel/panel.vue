<template>
  <div :class="rootClass">
    <!-- 头部：header slot 优先，否则用 title -->
    <div v-if="$slots.header || title" class="weui-panel__hd">
      <slot name="header">{{ title }}</slot>
    </div>

    <!-- 主体：默认 slot -->
    <div class="weui-panel__bd">
      <slot />
    </div>

    <!-- 底部：footer slot 优先，否则用 footerText -->
    <div v-if="footerText || $slots.footer" class="weui-panel__ft">
      <slot name="footer">
        <a
          v-if="footerText"
          :href="footerHref"
          class="weui-cell weui-cell_active weui-cell_access weui-cell_link"
          @click="emit('footer-click', $event)"
        >
          <span class="weui-cell__bd">{{ footerText }}</span>
          <span class="weui-cell__ft" />
        </a>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiPanel',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiPanelProps {
  /** 头部标题 */
  title?: string
  /** 面板类型，access 模式添加 weui-panel_access 类 */
  type?: 'default' | 'access'
  /** 底部"查看更多"文字。传入时自动渲染为标准 link cell */
  footerText?: string
  /** footer 链接地址，配合 footerText 使用 */
  footerHref?: string
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

export interface WeuiPanelEmits {
  (e: 'footer-click', event: Event): void
}

const props = withDefaults(defineProps<WeuiPanelProps>(), {
  title: undefined,
  type: 'default',
  footerText: undefined,
  footerHref: 'javascript:void(0);',
  extClass: undefined,
})

const emit = defineEmits<WeuiPanelEmits>()

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-panel']
  if (props.type === 'access') classes.push('weui-panel_access')
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
