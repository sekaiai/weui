<template>
  <div :class="['weui-form__extra-area', extClass].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFormExtra',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
export interface WeuiFormExtraProps {
  extClass?: string
}

defineProps<WeuiFormExtraProps>()
</script>
