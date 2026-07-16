<template>
  <button
    :class="['weui-btn', typeClass]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'WeuiButton',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiButtonProps {
  /** 按钮类型，对齐 weui 官方 */
  type?: 'primary' | 'default' | 'warn'
  /** 是否禁用 */
  disabled?: boolean
}

export interface WeuiButtonEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiButtonProps>(), {
  type: 'primary',
  disabled: false,
})

const emit = defineEmits<WeuiButtonEmits>()

const typeClass = computed(() => `weui-btn_${props.type}`)

const handleClick = (event: Event) => {
  if (props.disabled) return
  emit('click', event)
}
</script>
