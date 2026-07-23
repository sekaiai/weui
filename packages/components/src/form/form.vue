<template>
  <div :class="rootClass">
    <div :class="bdClass">
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
  /** 底部悬浮模式（追加 weui-bottom-fixed-opr-page 及其子类） */
  bottomFixed?: boolean
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiFormProps>(), {
  title: undefined,
  desc: undefined,
  bottomFixed: false,
  extClass: undefined,
})

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-form']
  if (props.bottomFixed) classes.push('weui-bottom-fixed-opr-page')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const bdClass = computed(() => {
  const classes: string[] = ['weui-form__bd']
  if (props.bottomFixed) classes.push('weui-bottom-fixed-opr-page__content')
  return classes
})

const hasTitle = computed(() => Boolean(props.title || props.desc || slots.title))
const hasFooter = computed(() => Boolean(slots.footer))
</script>

<style lang="scss">
.weui-bottom-fixed-opr-page {
  min-height: 70vh;
}
</style>
