<template>
  <div
    :class="rootClass"
    role="tab"
    :aria-selected="active"
    :tabindex="active ? 0 : -1"
    @click="handleClick"
    @keydown.enter="handleKeyboardClick"
    @keydown.space.prevent="handleKeyboardClick"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiNavbarItem',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiNavbarItemProps {
  /** 是否选中 */
  active?: boolean
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiNavbarItemEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiNavbarItemProps>(), {
  active: false,
  extClass: undefined,
})

const emit = defineEmits<WeuiNavbarItemEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-navbar__item']
  if (props.active) classes.push('weui-bar__item_on')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const handleClick = (event: Event) => {
  emit('click', event)
}

const handleKeyboardClick = (event: KeyboardEvent) => {
  emit('click', event)
}
</script>
