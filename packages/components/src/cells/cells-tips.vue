<template>
  <div class="weui-cells__tips">
    <slot>{{ tips }}</slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiCellsTips',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
export interface WeuiCellsTipsProps {
  tips?: string
}

defineProps<WeuiCellsTipsProps>()
</script>
