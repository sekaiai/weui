<template>
  <div :class="rootClass">
    <div class="weui-form__bd">
      <div v-if="hasTitle" class="weui-form__text-area">
        <slot name="title">
          <h2 v-if="title" class="weui-form__title">{{ title }}</h2>
          <div v-if="desc" class="weui-form__desc">{{ desc }}</div>
        </slot>
      </div>
      <div class="weui-form__control-area">
        <slot />
      </div>
    </div>
    <div v-if="hasFooter" class="weui-form__ft">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiForm',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiFormProps {
  title?: string
  desc?: string
  extClass?: string
}

const props = withDefaults(defineProps<WeuiFormProps>(), {
  title: undefined,
  desc: undefined,
  extClass: undefined,
})

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-form']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasTitle = computed(() => Boolean(props.title || props.desc || slots.title))
const hasFooter = computed(() => Boolean(slots.footer))
</script>
