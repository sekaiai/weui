<template>
  <div :class="rootClass" v-bind="$attrs">
    <!-- 头部：title 或 header slot -->
    <div v-if="hasHeader" class="weui-form-preview__hd">
      <slot name="header">
        <label v-if="headerLabel" class="weui-form-preview__label">{{ headerLabel }}</label>
        <em class="weui-form-preview__value">{{ title }}</em>
      </slot>
    </div>

    <!-- 主体：items 或 default slot -->
    <div v-if="hasBody" class="weui-form-preview__bd">
      <slot>
        <div
          v-for="(item, index) in items"
          :key="index"
          class="weui-form-preview__item"
        >
          <label class="weui-form-preview__label">{{ item.label }}</label>
          <span class="weui-form-preview__value">{{ item.value }}</span>
        </div>
      </slot>
    </div>

    <!-- 底部：buttons 或 footer slot -->
    <div v-if="hasFooter" class="weui-form-preview__ft">
      <slot name="footer">
        <template v-for="(btn, index) in buttons" :key="index">
          <a
            v-if="btn.url"
            :href="btn.url"
            :class="['weui-form-preview__btn', btnClass(btn)]"
            @click="handleButtonTap(btn, index)"
          >{{ btn.text }}</a>
          <button
            v-else
            type="button"
            :class="['weui-form-preview__btn', btnClass(btn)]"
            @click="handleButtonTap(btn, index)"
          >{{ btn.text }}</button>
        </template>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiPreview',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface PreviewItem {
  /** 信息项标签 */
  label: string
  /** 信息项值 */
  value: string
}

export interface PreviewButton {
  /** 按钮文字 */
  text: string
  /** 按钮类型，未指定时使用默认链接色 */
  type?: 'default' | 'primary'
  /** 跳转地址；提供时渲染为链接 */
  url?: string
}

export interface WeuiPreviewProps {
  /** 头部标题 */
  title?: string
  /** 头部标签 */
  headerLabel?: string
  /** 键值对信息列表 */
  items?: PreviewItem[]
  /** 底部按钮列表 */
  buttons?: PreviewButton[]
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

export interface WeuiPreviewEmits {
  (e: 'buttontap', button: PreviewButton, index: number): void
}

const props = withDefaults(defineProps<WeuiPreviewProps>(), {
  title: undefined,
  headerLabel: undefined,
  items: () => [],
  buttons: () => [],
  extClass: undefined,
})

const emit = defineEmits<WeuiPreviewEmits>()
const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-form-preview']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasHeader = computed(() => Boolean(props.headerLabel || props.title || slots.header))
const hasBody = computed(() => Boolean((props.items && props.items.length > 0) || slots.default))
const hasFooter = computed(() => Boolean((props.buttons && props.buttons.length > 0) || slots.footer))

/** 按钮类名：primary → 链接色，default → 常规色，未指定 → 基础链接色 */
const btnClass = (btn: PreviewButton): string => {
  if (btn.type === 'primary') return 'weui-form-preview__btn_primary'
  if (btn.type === 'default') return 'weui-form-preview__btn_default'
  return ''
}

const handleButtonTap = (btn: PreviewButton, index: number) => {
  emit('buttontap', btn, index)
}
</script>
