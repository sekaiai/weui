<template>
  <div :class="['weui-form__opr-area', extClass].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFormOpr',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
export interface WeuiFormOprProps {
  extClass?: string
}

defineProps<WeuiFormOprProps>()
</script>
