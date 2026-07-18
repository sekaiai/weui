<template>
  <div
    :class="rootClass"
    :hover-class="'weui-grid_active'"
    @click="handleClick"
  >
    <slot v-if="hasDefault" />
    <template v-else>
      <div v-if="icon || hasIconSlot" class="weui-grid__icon">
        <img v-if="icon" :src="icon" />
        <slot v-else name="icon" />
      </div>
      <div v-if="label || hasLabelSlot" class="weui-grid__label">
        <template v-if="label">{{ label }}</template>
        <slot v-else name="label" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiGridItem',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiGridItemProps {
  /** 图标 URL 或 base64 */
  icon?: string
  /** 文字标签 */
  label?: string
  /** 跳转链接 */
  url?: string
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiGridItemEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiGridItemProps>(), {
  icon: undefined,
  label: undefined,
  url: undefined,
  extClass: undefined,
})

const emit = defineEmits<WeuiGridItemEmits>()
const slots = useSlots()

const hasDefault = computed(() => !!slots.default)
const hasIconSlot = computed(() => !!slots.icon)
const hasLabelSlot = computed(() => !!slots.label)

const rootClass = computed(() => {
  const classes: string[] = ['weui-grid']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const handleClick = (event: Event) => {
  emit('click', event)
  if (props.url) {
    uni.navigateTo({ url: props.url })
  }
}
</script>
