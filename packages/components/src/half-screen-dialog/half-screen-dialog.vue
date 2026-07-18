<template>
  <div
    v-if="wrapperShow"
    class="weui-mask"
    :class="{ 'weui-animate-fade-in': innerShow, 'weui-animate-fade-out': !innerShow }"
    :style="maskStyle"
    @click="handleMaskClick"
    @touchmove.stop.prevent
  >
    <div
      :class="['weui-half-screen-dialog', { 'weui-animate-slide-up': innerShow, 'weui-animate-slide-down': !innerShow }, extClass]"
      @click.stop
    >
      <!-- 头部区域：优先使用 title slot -->
      <div v-if="hasHeader" class="weui-half-screen-dialog__hd">
        <slot name="title">
          <span v-if="title" class="weui-half-screen-dialog__title">{{ title }}</span>
          <span v-if="subtitle" class="weui-half-screen-dialog__subtitle">{{ subtitle }}</span>
        </slot>
      </div>

      <!-- 内容区域 -->
      <div class="weui-half-screen-dialog__bd">
        <slot>{{ content }}</slot>
      </div>

      <!-- 底部按钮区域 -->
      <div v-if="hasFooter" class="weui-half-screen-dialog__ft">
        <slot name="footer">
          <div
            v-for="(btn, index) in buttons"
            :key="index"
            :class="['weui-half-screen-dialog__btn', btnClassName(btn, index)]"
            @click="handleButtonTap(btn, index)"
          >
            {{ btn.label }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiHalfScreenDialog',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch, useSlots, onBeforeUnmount } from 'vue'

export interface HalfScreenDialogButton {
  /** 按钮文字 */
  label: string
  /** 按钮类型，未指定时按位置自动分配 */
  type?: 'default' | 'primary' | 'warn'
}

export interface WeuiHalfScreenDialogProps {
  /** 是否显示 */
  visible?: boolean
  /** 标题 */
  title?: string
  /** 副标题 */
  subtitle?: string
  /** 内容文字（当无 default slot 时使用） */
  content?: string
  /** 按钮列表 */
  buttons?: HalfScreenDialogButton[]
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 是否显示遮罩，默认 true */
  mask?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 由 overlay-host 注入的 z-index */
  zIndex?: number
}

export interface WeuiHalfScreenDialogEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'buttontap', button: HalfScreenDialogButton, index: number): void
  (e: 'close'): void
  /** overlay-host 命令式调用时用于通知卸载 */
  (e: 'weui-close'): void
}

const props = withDefaults(defineProps<WeuiHalfScreenDialogProps>(), {
  visible: false,
  title: undefined,
  subtitle: undefined,
  content: undefined,
  buttons: () => [],
  maskClosable: true,
  mask: true,
  extClass: undefined,
  zIndex: undefined,
})

const emit = defineEmits<WeuiHalfScreenDialogEmits>()
const slots = useSlots()

/** 控制外层节点是否挂载 */
const wrapperShow = ref(false)
/** 控制内部滑入滑出动画状态 */
const innerShow = ref(false)
/** 显示动画定时器引用，用于卸载前清理 */
let showTimer: ReturnType<typeof setTimeout> | null = null
/** 隐藏动画定时器引用，用于卸载前清理 */
let hideTimer: ReturnType<typeof setTimeout> | null = null

const hasHeader = computed(() => Boolean(props.title || props.subtitle || slots.title))
const hasFooter = computed(() => Boolean(props.buttons.length > 0 || slots.footer))

const maskStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex !== undefined) {
    style['z-index'] = String(props.zIndex)
  }
  if (!props.mask) {
    style['background'] = 'transparent'
  }
  return style
})

watch(
  () => props.visible,
  (val) => {
    if (val) {
      // 显示：先挂载外层，下一 tick 触发滑入
      wrapperShow.value = true
      if (showTimer) clearTimeout(showTimer)
      showTimer = setTimeout(() => {
        innerShow.value = true
      }, 16)
    } else if (wrapperShow.value) {
      // 隐藏：先触发滑出，动画结束后卸载外层
      innerShow.value = false
      if (hideTimer) clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        wrapperShow.value = false
      }, 300)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)
})

/** 按钮类名分配：未指定 type 时，单按钮→primary，多按钮→首个 default 其余 primary */
const btnClassName = (btn: HalfScreenDialogButton, index: number): string => {
  if (btn.type) {
    return btn.type === 'primary'
      ? 'weui-half-screen-dialog__btn_primary'
      : btn.type === 'warn'
        ? 'weui-half-screen-dialog__btn_warn'
        : 'weui-half-screen-dialog__btn_default'
  }
  if (props.buttons.length === 1) {
    return 'weui-half-screen-dialog__btn_primary'
  }
  return index === 0 ? 'weui-half-screen-dialog__btn_default' : 'weui-half-screen-dialog__btn_primary'
}

const close = () => {
  emit('update:visible', false)
  emit('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    close()
    emit('weui-close')
  }
}

const handleButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  emit('buttontap', btn, index)
  // 声明式：触发 update:visible(false) + close 由父组件控制
  // 命令式：触发 weui-close 由 overlay-host 卸载组件
  close()
  emit('weui-close')
}
</script>
