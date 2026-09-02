<template>
  <div class="weui-form" :class="rootExtraClass" v-bind="$attrs">
    <div class="weui-form__bd" :class="bdExtraClass">
      <slot v-if="hasHd" name="hd" />
      <div v-if="hasTitle" class="weui-form__text-area" :style="textAreaStyle">
        <h2 v-if="hasTitleContent" class="weui-form__title">{{ title }}</h2>
        <div v-if="hasDesc" class="weui-form__desc">
          {{ desc }}
        </div>
      </div>
      <div class="weui-form__control-area">
        <slot />
      </div>
    </div>
    <div v-if="hasFooter" class="weui-form__ft">
      <div v-if="hasTips" class="weui-form__tips-area">
        <p class="weui-form__tips">
          <slot name="tips" />
        </p>
      </div>
      <div v-if="hasOpr" class="weui-form__opr-area">
        <slot name="opr" />
      </div>
      <div v-if="hasTipsB" class="weui-form__tips-area">
        <p class="weui-form__tips">
          <slot name="tips-b" />
        </p>
      </div>
      <div v-if="hasExtra" class="weui-form__extra-area">
        <slot name="extra" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiForm',
  inheritAttrs: false,
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
  /** 标题文字区域对齐方式；未传时沿用 WeUI 默认居中 */
  textAlign?: 'left' | 'right'
  /** 底部悬浮模式（追加 weui-bottom-fixed-opr-page 及其子类） */
  bottomFixed?: boolean
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

const props = withDefaults(defineProps<WeuiFormProps>(), {
  title: undefined,
  desc: undefined,
  textAlign: undefined,
  bottomFixed: false,
  extClass: undefined,
})

const slots = useSlots()

const rootExtraClass = computed(() => {
  const classes: string[] = []
  if (props.bottomFixed) classes.push('weui-bottom-fixed-opr-page')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const bdExtraClass = computed(() => {
  const classes: string[] = []
  if (props.bottomFixed) classes.push('weui-bottom-fixed-opr-page__content')
  return classes
})

const hasHd = computed(() => Boolean(slots.hd))
const hasTitleContent = computed(() => Boolean(props.title))
const hasDesc = computed(() => Boolean(props.desc))
const hasTitle = computed(() => Boolean(hasTitleContent.value || hasDesc.value))
const textAreaStyle = computed(() => (
  props.textAlign ? { textAlign: props.textAlign } : undefined
))
const hasTips = computed(() => Boolean(slots.tips))
const hasOpr = computed(() => Boolean(slots.opr))
const hasTipsB = computed(() => Boolean(slots['tips-b']))
const hasExtra = computed(() => Boolean(slots.extra))
const hasFooter = computed(() => Boolean(hasTips.value || hasOpr.value || hasTipsB.value || hasExtra.value))
</script>

<style lang="scss">
.weui-bottom-fixed-opr-page {
  min-height: 70vh;
}
</style>
