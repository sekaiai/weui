<template>
  <div class="weui-cells__title">
    <slot>{{ title }}</slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiCellsTitle',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
export interface WeuiCellsTitleProps {
  title?: string
}

defineProps<WeuiCellsTitleProps>()
</script>
