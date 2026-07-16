<template>
  <view :class="rootClass">
    <view class="weui-slideview__left" @click="handleLeftClick">
      <slot />
    </view>
    <view class="weui-slideview__right">
      <view
        v-for="(btn, index) in buttons"
        :key="index"
        :class="buttonClass(btn)"
        @click="handleButtonClick(btn, index)"
      >
        {{ btn.text }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiSlideview',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface SlideButton {
  /** 按钮文字 */
  text: string
  /** 按钮类型，warn 为警告样式 */
  type?: 'default' | 'warn'
}

export interface WeuiSlideviewProps {
  /** 操作按钮列表 */
  buttons?: SlideButton[]
  /** 是否展开右侧按钮 */
  show?: boolean
  /** 是否禁用滑动 */
  disabled?: boolean
  /** 自定义附加类名 */
  extClass?: string
}

export interface WeuiSlideviewEmits {
  (e: 'update:show', value: boolean): void
  (e: 'buttonclick', button: SlideButton, index: number): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<WeuiSlideviewProps>(), {
  buttons: () => [],
  show: false,
  disabled: false,
  extClass: undefined,
})

const emit = defineEmits<WeuiSlideviewEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-slideview']
  if (props.show) classes.push('weui-slideview_show')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const buttonClass = (btn: SlideButton) => {
  const classes: string[] = ['weui-slideview__btn']
  if (btn.type === 'warn') classes.push('weui-slideview__btn_warn')
  return classes
}

const close = () => {
  emit('update:show', false)
  emit('close')
}

const handleLeftClick = () => {
  if (props.disabled) return
  if (props.show) {
    close()
  }
}

const handleButtonClick = (btn: SlideButton, index: number) => {
  emit('buttonclick', btn, index)
  close()
}
</script>
