<template>
  <div :class="rootClass">
    <div
      class="weui-slideview__left"
      @click="handleLeftClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <slot />
    </div>
    <div class="weui-slideview__right">
      <div
        v-for="(btn, index) in buttons"
        :key="index"
        :class="buttonClass(btn)"
        @click="handleButtonClick(btn, index)"
      >
        {{ btn.text }}
      </div>
    </div>
  </div>
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
import { computed, ref, watch } from 'vue'

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

// 内部状态，与 props.show 双向同步，用于手势驱动的即时切换
const innerShow = ref(props.show)
watch(
  () => props.show,
  (val) => {
    innerShow.value = val
  },
)

const rootClass = computed(() => {
  const classes: string[] = ['weui-slideview']
  if (innerShow.value) classes.push('weui-slideview_show')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const buttonClass = (btn: SlideButton) => {
  const classes: string[] = ['weui-slideview__btn']
  if (btn.type === 'warn') classes.push('weui-slideview__btn_warn')
  return classes
}

const close = () => {
  innerShow.value = false
  emit('update:show', false)
  emit('close')
}

const open = () => {
  innerShow.value = true
  emit('update:show', true)
}

const handleLeftClick = () => {
  if (props.disabled) return
  if (innerShow.value) {
    close()
  }
}

const handleButtonClick = (btn: SlideButton, index: number) => {
  emit('buttonclick', btn, index)
  close()
}

// 手势识别：左滑展开、右滑收起
const startX = ref(0)
const currentX = ref(0)
const isMoving = ref(false)

const handleTouchStart = (e: TouchEvent) => {
  if (props.disabled) return
  startX.value = e.touches[0].clientX
  isMoving.value = true
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isMoving.value || props.disabled) return
  currentX.value = e.touches[0].clientX
  const diff = startX.value - currentX.value
  // 左滑 diff > 0
  if (diff > 30 && !innerShow.value) {
    open()
  } else if (diff < -30 && innerShow.value) {
    close()
  }
}

const handleTouchEnd = () => {
  isMoving.value = false
}
</script>

<style lang="scss">
/* WeUI npm 包不含 slideview 样式（属 weui-miniprogram 仓库），在此补充自定义实现 */
.weui-slideview {
  position: relative;
  overflow: hidden;
}
.weui-slideview__left {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}
.weui-slideview__right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
}
.weui-slideview__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 100%;
  color: #fff;
  font-size: 14px;
  background: #c7c7cc;
}
.weui-slideview__btn_warn {
  background: #fa5151;
}
.weui-slideview_show .weui-slideview__left {
  transform: translateX(-100%);
}
</style>
