<template>
  <div
    :class="rootClass"
    :hover-class="hover ? 'weui-cell_active' : undefined"
    :role="ariaRole"
    @click="handleClick"
  >
    <div v-if="hasHeader" :class="['weui-cell__hd', iconClass]">
      <img v-if="icon" :src="icon" class="weui-cell__icon" mode="aspectFit" />
      <slot v-else name="icon" />
      <template v-if="title">{{ title }}</template>
      <slot v-else name="title" />
    </div>
    <div v-if="hasBody" :class="['weui-cell__bd', bodyClass]">
      <template v-if="value">{{ value }}</template>
      <slot v-else />
    </div>
    <div v-if="hasFooter" :class="footerClass">
      <template v-if="footer">{{ footer }}</template>
      <slot v-else name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiCell',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export type WeuiCellVariant =
  | 'default'
  | 'access'
  | 'link'
  | 'switch'
  | 'vcode'
  | 'warn'
  | 'select'
  | 'select-before'
  | 'select-after'
  | 'uploader'

export interface WeuiCellProps {
  /** header 标题文字 */
  title?: string
  /** body 内容文字 */
  value?: string
  /** header 图标地址 */
  icon?: string
  /** footer 文字内容 */
  footer?: string
  /** 是否为链接型 cell（追加 weui-cell_access），等价于 variant='access' */
  link?: boolean
  /** link=true 时的跳转 url；为空则仅触发 click */
  url?: string
  /** 是否启用按下态高亮 */
  hover?: boolean
  /** true=左右布局，false=上下布局（追加 weui-cell_vertical） */
  inline?: boolean
  /** 是否渲染 header 区域 */
  hasHeader?: boolean
  /** 是否渲染 body 区域 */
  hasBody?: boolean
  /** 是否渲染 footer 区域 */
  hasFooter?: boolean
  /** 视觉变体，自动追加对应 weui-cell_* 类 */
  variant?: WeuiCellVariant
  /** 根元素扩展类名 */
  extClass?: string
  /** header 扩展类名 */
  iconClass?: string
  /** body 扩展类名 */
  bodyClass?: string
  /** footer 扩展类名 */
  footerClass?: string
  /** 根元素 aria-role */
  ariaRole?: string
}

export interface WeuiCellEmits {
  (e: 'click', event: Event): void
  (e: 'navigate', res: unknown): void
  (e: 'navigate-error', err: unknown): void
}

const props = withDefaults(defineProps<WeuiCellProps>(), {
  title: '',
  value: '',
  icon: undefined,
  footer: '',
  link: false,
  url: '',
  hover: true,
  inline: true,
  hasHeader: true,
  hasBody: true,
  hasFooter: true,
  variant: 'default',
  extClass: undefined,
  iconClass: undefined,
  bodyClass: undefined,
  footerClass: undefined,
  ariaRole: undefined,
})

const emit = defineEmits<WeuiCellEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell']
  if (props.link || props.variant === 'access') classes.push('weui-cell_access')
  if (props.variant === 'link') classes.push('weui-cell_link')
  if (props.variant === 'switch') classes.push('weui-cell_switch')
  if (props.variant === 'vcode') classes.push('weui-cell_vcode')
  if (props.variant === 'warn') classes.push('weui-cell_warn')
  if (props.variant === 'select') classes.push('weui-cell_select')
  if (props.variant === 'select-before') {
    classes.push('weui-cell_select', 'weui-cell_select-before')
  }
  if (props.variant === 'select-after') {
    classes.push('weui-cell_select', 'weui-cell_select-after')
  }
  if (props.variant === 'uploader') classes.push('weui-cell_uploader')
  if (!props.inline) classes.push('weui-cell_vertical')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const footerClass = computed(() => {
  const classes: string[] = ['weui-cell__ft']
  if (props.footerClass) classes.push(props.footerClass)
  return classes
})

const handleClick = (event: Event) => {
  emit('click', event)
  if (props.link && props.url) {
    // #ifdef H5
    // Vue 3 / H5：不自动跳转，emit navigate 事件让用户处理
    emit('navigate', { url: props.url })
    // #endif
    // #ifndef H5
    // 小程序/App：用 uni.navigateTo
    uni.navigateTo({
      url: props.url,
      success: (res) => emit('navigate', res),
      fail: (err) => emit('navigate-error', err),
    })
    // #endif
  }
}
</script>

<style lang="scss">
/* WeUI 源码未定义 weui-cell__icon，cell 组件的 image 图标需要默认尺寸
   不设 margin-right：__hd 在 small-appmsg 等上下文中已有 padding-right */
.weui-cell__icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>
