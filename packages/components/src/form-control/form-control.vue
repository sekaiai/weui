<template>
  <div :class="['weui-form__control-area', extClass].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFormControl',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
export interface WeuiFormControlProps {
  extClass?: string
}

defineProps<WeuiFormControlProps>()
</script>
