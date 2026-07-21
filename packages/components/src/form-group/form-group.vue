<template>
  <div :class="rootClass">
    <div v-if="hasTitle" class="weui-cells__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
    <div v-if="hasTips" class="weui-cells__tips">
      <slot name="tips">{{ tips }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFormGroup',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiFormGroupProps {
  title?: string
  tips?: string
  extClass?: string
}

const props = withDefaults(defineProps<WeuiFormGroupProps>(), {
  title: undefined,
  tips: undefined,
  extClass: undefined,
})

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-cells__group', 'weui-cells__group_form']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasTitle = computed(() => Boolean(props.title || slots.title))
const hasTips = computed(() => Boolean(props.tips || slots.tips))
</script>
