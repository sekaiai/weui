<template>
  <div :class="['weui-cells', extClass].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiCells',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
export interface WeuiCellsProps {
  extClass?: string
}

defineProps<WeuiCellsProps>()
</script>
