<template>
  <div :class="['weui-form__tips-area', extClass].filter(Boolean).join(' ')">
    <p class="weui-form__tips"><slot /></p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFormTips',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
export interface WeuiFormTipsProps {
  extClass?: string
}

defineProps<WeuiFormTipsProps>()
</script>
