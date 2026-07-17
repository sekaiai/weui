<template>
  <view :class="rootClass" :aria-selected="active" @click="handleClick">
    <view v-if="hasIcon" :class="iconWrapClass" :style="iconWrapStyle">
      <slot name="icon">
        <image
          v-if="displayIcon"
          :src="displayIcon"
          class="weui-tabbar__icon"
          mode="aspectFit"
        />
      </slot>
      <text
        v-if="showDot"
        class="weui-badge weui-badge_dot"
        :style="badgeStyle"
      />
      <text
        v-else-if="hasBadge"
        class="weui-badge"
        :style="badgeStyle"
      >{{ badge }}</text>
    </view>
    <view v-if="hasLabel" class="weui-tabbar__label">
      <template v-if="text">{{ text }}</template>
      <slot v-else />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiTabbarItem',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiTabbarItemProps {
  /** 图标 URL */
  icon?: string
  /** 激活图标 URL */
  activeIcon?: string
  /** 文字 */
  text?: string
  /** 是否选中 */
  active?: boolean
  /** 徽标内容 */
  badge?: string | number
  /** 是否显示红点 */
  showDot?: boolean
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiTabbarItemEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiTabbarItemProps>(), {
  icon: undefined,
  activeIcon: undefined,
  text: undefined,
  active: false,
  badge: undefined,
  showDot: false,
  extClass: undefined,
})

const emit = defineEmits<WeuiTabbarItemEmits>()
const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-tabbar__item']
  if (props.active) classes.push('weui-bar__item_on')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const displayIcon = computed(() => {
  if (props.active && props.activeIcon) return props.activeIcon
  return props.icon
})

const hasIcon = computed(() => {
  return !!props.icon || !!props.activeIcon || !!slots.icon
})

const hasLabel = computed(() => {
  return !!props.text || !!slots.default
})

const hasBadge = computed(() => {
  if (props.showDot) return false
  if (props.badge === undefined || props.badge === null) return false
  if (props.badge === '') return false
  return true
})

const iconWrapClass = computed(() => {
  return ['weui-tabbar__icon-wrap']
})

const iconWrapStyle = computed(() => {
  if (!hasBadge.value && !props.showDot) return undefined
  return {
    display: 'inline-block',
    position: 'relative' as const,
  }
})

const badgeStyle = computed(() => {
  if (props.showDot) {
    return {
      position: 'absolute' as const,
      top: '0',
      right: '-6px',
    }
  }
  return {
    position: 'absolute' as const,
    top: '-2px',
    right: '-13px',
  }
})

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>
