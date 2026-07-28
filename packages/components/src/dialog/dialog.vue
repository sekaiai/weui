<template>
  <div
    v-if="wrapperShow"
    class="weui-mask weui-transition"
    :class="{ 'weui-transition_show': innerShow }"
    :style="maskStyle"
    @click="handleMaskClick"
    @touchmove.stop.prevent
  >
    <div
      :class="['weui-dialog', extClass, { 'weui-dialog_btn-wrap': btnWrap }]"
      role="dialog"
      aria-modal="true"
      @click.stop
    >
      <!-- 标题区域：优先使用 title slot -->
      <div v-if="hasHeader" class="weui-dialog__hd">
        <slot name="title">
          <strong class="weui-dialog__title">{{ title }}</strong>
        </slot>
      </div>

      <!-- 内容区域 -->
      <div class="weui-dialog__bd">
        <slot>{{ content }}</slot>
      </div>

      <!-- 底部按钮区域 -->
      <div v-if="hasFooter" class="weui-dialog__ft">
        <slot name="footer">
          <a
            v-for="(btn, index) in buttons"
            :key="index"
            role="button"
            href="javascript:"
            :class="['weui-dialog__btn', btnClassName(btn, index)]"
            @click="handleButtonTap(btn, index)"
          >{{ btn.label }}</a>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiDialog',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch, useSlots, onBeforeUnmount } from 'vue'

export interface DialogButton {
  /** 按钮文字 */
  label: string
  /** 按钮类型，未指定时按位置自动分配 */
  type?: 'default' | 'primary' | 'warn'
}

export interface WeuiDialogProps {
  /** 是否显示 */
  visible?: boolean
  /** 标题 */
  title?: string
  /** 内容文字（当无 default slot 时使用） */
  content?: string
  /** 按钮列表 */
  buttons?: DialogButton[]
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 是否显示遮罩，默认 true */
  mask?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 按钮是否垂直排列，默认 false（水平排列） */
  btnWrap?: boolean
  /** 由 overlay-host 注入的 z-index */
  zIndex?: number
}

export interface WeuiDialogEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'buttontap', button: DialogButton, index: number): void
  (e: 'close'): void
  /** overlay-host 命令式调用时用于通知卸载 */
  (e: 'weui-close'): void
}

const props = withDefaults(defineProps<WeuiDialogProps>(), {
  visible: false,
  title: undefined,
  content: undefined,
  buttons: () => [],
  maskClosable: true,
  mask: true,
  extClass: undefined,
  btnWrap: false,
  zIndex: undefined,
})

const emit = defineEmits<WeuiDialogEmits>()
const slots = useSlots()

/** 控制外层节点是否挂载 */
const wrapperShow = ref(false)
/** 控制内部淡入淡出动画状态 */
const innerShow = ref(false)
/** 显示动画定时器引用，用于卸载前清理 */
let showTimer: ReturnType<typeof setTimeout> | null = null
/** 隐藏动画定时器引用，用于卸载前清理 */
let hideTimer: ReturnType<typeof setTimeout> | null = null

const hasHeader = computed(() => Boolean(props.title || slots.title))
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
      // 显示：先挂载外层，下一 tick 触发淡入
      wrapperShow.value = true
      if (showTimer) clearTimeout(showTimer)
      showTimer = setTimeout(() => {
        innerShow.value = true
      }, 16)
    } else if (wrapperShow.value) {
      // 隐藏：先触发淡出，动画结束后卸载外层
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
const btnClassName = (btn: DialogButton, index: number): string => {
  if (btn.type) {
    return btn.type === 'primary' ? 'weui-dialog__btn_primary' : btn.type === 'warn' ? 'weui-dialog__btn_warn' : 'weui-dialog__btn_default'
  }
  if (props.buttons.length === 1) {
    return 'weui-dialog__btn_primary'
  }
  return index === 0 ? 'weui-dialog__btn_default' : 'weui-dialog__btn_primary'
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

const handleButtonTap = (btn: DialogButton, index: number) => {
  emit('buttontap', btn, index)
  // 声明式：触发 update:visible(false) + close 由父组件控制
  // 命令式：触发 weui-close 由 overlay-host 卸载组件
  close()
  emit('weui-close')
}
</script>
