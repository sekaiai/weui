<template>
  <div v-if="isSwipe" :class="swipeClass">
    <div
      class="weui-cell__bd"
      :style="swipeContentStyle"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onTouchMove"
    >
      <a
        :class="cellClass"
        data-manual-navigation
        :href="navigationTarget || undefined"
        :hover-class="hover ? 'weui-cell_active' : undefined"
        :role="ariaRole"
        @click="handleClick"
      >
        <div v-if="hasHeader && hasHeaderContent" :class="['weui-cell__hd', iconClass]">
          <div v-if="hasIcon" class="weui-cell__icon">
            <img v-if="isImageIcon" class="weui-cell__icon-image" :src="icon" alt="" />
            <span v-else-if="icon" :class="weuiIconClass" aria-hidden="true" />
            <slot v-else name="icon" />
          </div>
          <label v-if="label" class="weui-label">{{ label }}</label>
        </div>
        <div v-if="hasBody" :class="bodyClassName">
          <slot v-if="slots.title" name="title" />
          <span v-else-if="title">{{ title }}</span>
          <div v-if="slots.subtitle" class="weui-cell__desc"><slot name="subtitle" /></div>
          <div v-else-if="subtitle" class="weui-cell__desc">{{ subtitle }}</div>
          <slot />
        </div>
        <div v-if="hasFooter && (hasFooterContent || isAccess)" :class="footerClass">
          <slot v-if="slots.footer" name="footer" />
          <template v-else>{{ footer || value || desc }}</template>
        </div>
      </a>
    </div>
    <div class="weui-cell__ft"><a role="button" href="javascript:" :class="swipeButtonClass" @click.prevent="onSwipeClick">{{ swipeText }}</a></div>
  </div>
  <a
    v-else
    :class="cellClass"
    data-manual-navigation
    :href="navigationTarget || undefined"
    :hover-class="hover ? 'weui-cell_active' : undefined"
    :role="ariaRole"
    @click="handleClick"
  >
    <div v-if="hasHeader && hasHeaderContent" :class="['weui-cell__hd', iconClass]">
      <div v-if="hasIcon" class="weui-cell__icon">
        <img v-if="isImageIcon" class="weui-cell__icon-image" :src="icon" alt="" />
        <span v-else-if="icon" :class="weuiIconClass" aria-hidden="true" />
        <slot v-else name="icon" />
      </div>
      <label v-if="label" class="weui-label">{{ label }}</label>
    </div>
    <div v-if="hasBody" :class="bodyClassName">
      <slot v-if="slots.title" name="title" />
      <span v-else-if="title">{{ title }}</span>
      <div v-if="slots.subtitle" class="weui-cell__desc"><slot name="subtitle" /></div>
      <div v-else-if="subtitle" class="weui-cell__desc">{{ subtitle }}</div>
      <slot />
    </div>
    <div v-if="hasFooter && (hasFooterContent || isAccess)" :class="footerClass">
      <slot v-if="slots.footer" name="footer" />
      <template v-else>{{ footer || value || desc }}</template>
    </div>
  </a>
</template>

<script lang="ts">
export default { name: 'WeuiCell', options: { styleIsolation: 'apply-shared', addGlobalClass: true } }
</script>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

export interface WeuiCellProps {
  title?: string
  label?: string
  /** Rendered below title and above the default body slot in .weui-cell__bd. */
  subtitle?: string
  value?: string
  desc?: string
  /** WeUI icon name, or an image URL/path/data URI. */
  icon?: string
  footer?: string
  /** Access style alias. A string is used as the navigation target. */
  access?: boolean | string
  /** Primary access style. A string is used as the navigation target. */
  link?: boolean | string
  url?: string
  vcode?: boolean
  warn?: boolean
  uploader?: boolean
  readonly?: boolean
  disabled?: boolean
  primary?: boolean
  wrap?: boolean
  select?: boolean
  selectBefore?: boolean
  selectAfter?: boolean
  active?: boolean
  hover?: boolean
  inline?: boolean
  hasHeader?: boolean
  hasBody?: boolean
  hasFooter?: boolean
  extClass?: string
  iconClass?: string
  bodyClass?: string
  footerClass?: string
  ariaRole?: string
  isSwipe?: boolean
  swipeText?: string
  swipeType?: 'default' | 'warn'
}

export interface WeuiCellEmits {
  (e: 'click', event: Event): void
  (e: 'navigate', res: unknown): void
  (e: 'navigate-error', err: unknown): void
  (e: 'swipe-click'): void
}

const props = withDefaults(defineProps<WeuiCellProps>(), {
  title: '', label: undefined, subtitle: undefined, value: '', desc: undefined, icon: undefined, footer: '',
  access: false, link: false, url: '', vcode: false, warn: false, uploader: false, readonly: false,
  disabled: false, primary: false, wrap: false, select: false, selectBefore: false, selectAfter: false,
  active: false, hover: true, inline: true, hasHeader: true, hasBody: true, hasFooter: true,
  extClass: undefined, iconClass: undefined, bodyClass: undefined, footerClass: undefined, ariaRole: undefined,
  isSwipe: false, swipeText: '删除', swipeType: 'warn',
})

const emit = defineEmits<WeuiCellEmits>()
const slots = useSlots()
const swipeOpen = ref(false)
const touchStartX = ref(0)
const getNavigationTarget = (value: boolean | string | undefined) => typeof value === 'string' && value.length > 0 ? value : ''
const navigationTarget = computed(() => {
  const linkTarget = getNavigationTarget(props.link)
  if (linkTarget) return linkTarget
  const accessTarget = getNavigationTarget(props.access)
  if (accessTarget) return accessTarget
  return props.link || props.access ? props.url : ''
})
const isAccess = computed(() => Boolean(props.access || props.link))
const hasHeaderContent = computed(() => hasIcon.value || Boolean(props.label))
const hasFooterContent = computed(() => Boolean(props.footer || props.value || props.desc || slots.footer))
const hasIcon = computed(() => Boolean(props.icon || slots.icon))
const isImageIcon = computed(() => /^(?:\/|\.\/|\.\.\/|https?:|data:)/.test(props.icon ?? ''))
const weuiIconClass = computed(() => `weui-icon-${props.icon}`)

const cellClass = computed(() => {
  const classes = ['weui-cell']
  if (isAccess.value) classes.push('weui-cell_access')
  if (props.vcode) classes.push('weui-cell_vcode')
  if (props.warn) classes.push('weui-cell_warn')
  if (props.uploader) classes.push('weui-cell_uploader')
  if (props.readonly) classes.push('weui-cell_readonly')
  if (props.disabled) classes.push('weui-cell_disabled')
  if (props.primary) classes.push('weui-cell_primary')
  if (props.wrap) classes.push('weui-cell_wrap')
  if (props.select) classes.push('weui-cell_select')
  if (props.selectBefore) classes.push('weui-cell_select-before')
  if (props.selectAfter) classes.push('weui-cell_select-after')
  if (props.active) classes.push('weui-cell_active')
  if (!props.inline) classes.push('weui-cell_vertical')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const swipeClass = computed(() => ['weui-cell', 'weui-cell_swiped'])
const swipeContentStyle = computed(() => ({ transform: swipeOpen.value ? 'translateX(-68px)' : undefined, transition: 'transform .3s ease' }))
const swipeButtonClass = computed(() => ['weui-swiped-btn', `weui-swiped-btn_${props.swipeType}`])
const footerClass = computed(() => ['weui-cell__ft', props.footerClass].filter(Boolean))
const bodyClassName = computed(() => ['weui-cell__bd', props.vcode ? 'weui-flex' : undefined, props.bodyClass].filter(Boolean))

const onTouchStart = (event: TouchEvent) => { touchStartX.value = event.touches[0]?.clientX ?? 0 }
const onTouchMove = (event: TouchEvent) => {
  const currentX = event.touches[0]?.clientX ?? touchStartX.value
  const distance = touchStartX.value - currentX
  if (distance > 30) swipeOpen.value = true
  if (distance < -30) swipeOpen.value = false
}
const onSwipeClick = () => { emit('swipe-click'); swipeOpen.value = false }
const handleClick = (event: Event) => {
  if (swipeOpen.value) { event.preventDefault(); swipeOpen.value = false; return }
  emit('click', event)
  if (!navigationTarget.value) return
  // #ifdef H5
  emit('navigate', { url: navigationTarget.value })
  // #endif
  // #ifndef H5
  uni.navigateTo({
    url: navigationTarget.value,
    fail: (error) => emit('navigate-error', error),
    success: (result) => emit('navigate', result),
  })
  // #endif
}
</script>

<style lang="scss">
.weui-cell__icon {
  display: inline-flex;
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  vertical-align: middle;
  font-size: 8.333333px;
}

.weui-cell__icon-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 只读内容不可编辑，但仍保持表单正文的默认颜色；禁用状态继续使用 WeUI 的置灰样式。 */
.weui-cell_readonly .weui-input {
  color: inherit;
}
</style>
