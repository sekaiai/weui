<template>
  <div
    v-if="wrapperShow"
    ref="wrapperRef"
    class="weui-mask weui-transition"
    :class="[{ 'weui-transition_show': innerShow }, wrapperClass]"
    :style="maskStyle"
    role="dialog"
    :aria-modal="innerShow ? 'true' : 'false'"
    :aria-hidden="innerShow ? 'false' : 'true'"
    :aria-labelledby="hasHeader ? titleId : undefined"
    :tabindex="innerShow ? 0 : -1"
    @click="handleMaskClick"
    @touchmove="handleWrapperTouchMove"
  >
    <div
      ref="dialogRef"
      :class="[
        'weui-half-screen-dialog',
        variantClass,
        extClass,
        {
          'weui-half-screen-dialog_show': innerShow,
          'weui-half-screen-dialog_btn-wrap': btnWrapActive,
        },
      ]"
      :style="dialogStyle"
      v-bind="$attrs"
      @click.stop
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <!-- 头部区域：优先使用 header slot -->
      <div v-if="hasHeader" class="weui-half-screen-dialog__hd">
        <slot name="header">
          <!-- 样式五：下拉手势条 + 导航行 -->
          <template v-if="variant === 'grab'">
            <div class="weui-half-screen-dialog__hd__grab">
              <div ref="slideIconRef" class="weui-half-screen-dialog__slide-icon" :style="slideIconStyle">
                <i class="weui-icon-arrow" :style="slideArrowStyle" />
              </div>
            </div>
            <div class="weui-half-screen-dialog__hd__nav">
              <div v-if="showClose" class="weui-half-screen-dialog__hd__side">
                <button type="button" class="weui-btn_icon weui-wa-hotarea" aria-label="关闭" @click="close">
                  关闭<i :class="closeIconClass" />
                </button>
              </div>
              <div class="weui-half-screen-dialog__hd__main">
                <slot name="title">
                  <strong :id="titleId" class="weui-half-screen-dialog__title">{{ title }}</strong>
                  <span v-if="subtitle" class="weui-half-screen-dialog__subtitle">{{ subtitle }}</span>
                </slot>
              </div>
              <div v-if="hasHeaderActions" class="weui-half-screen-dialog__hd__side">
                <slot name="action">
                  <div class="weui-half-screen-dialog__hd__action-group">
                    <template v-for="(action, index) in headerActions" :key="index">
                      <a
                        v-if="action.type === 'link'"
                        href="javascript:"
                        :class="actionClassName(action)"
                        @click="handleActionTap(action, index)"
                      >{{ action.text }}</a>
                      <button
                        v-else
                        type="button"
                        :class="actionClassName(action)"
                        @click="handleActionTap(action, index)"
                      >{{ action.text }}<i v-if="action.icon" :class="action.icon" /></button>
                    </template>
                  </div>
                </slot>
              </div>
            </div>
          </template>

          <!-- 样式一 / 二 / 三 / 四：单行三列布局 -->
          <template v-else>
            <div v-if="showClose" class="weui-half-screen-dialog__hd__side">
              <button type="button" class="weui-btn_icon weui-wa-hotarea" aria-label="关闭" @click="close">
                关闭<i :class="closeIconClass" />
              </button>
            </div>
            <div class="weui-half-screen-dialog__hd__main">
              <slot name="title">
                <div v-if="avatar" class="weui-flex" style="align-items: center; font-size: 14px;">
                  <img
                    :src="avatar"
                    alt=""
                    style="width: 24px; margin-right: 8px; border-radius: 50%; display: block;"
                  >
                  {{ nickname }}
                </div>
                <template v-else>
                  <strong :id="titleId" class="weui-half-screen-dialog__title">{{ title }}</strong>
                  <span v-if="subtitle" class="weui-half-screen-dialog__subtitle">{{ subtitle }}</span>
                </template>
              </slot>
            </div>
            <div v-if="hasHeaderActions" class="weui-half-screen-dialog__hd__side">
              <slot name="action">
                <div class="weui-half-screen-dialog__hd__action-group">
                  <template v-for="(action, index) in headerActions" :key="index">
                    <a
                      v-if="action.type === 'link'"
                      href="javascript:"
                      :class="actionClassName(action)"
                      @click="handleActionTap(action, index)"
                    >{{ action.text }}</a>
                    <button
                      v-else
                      type="button"
                      :class="actionClassName(action)"
                      @click="handleActionTap(action, index)"
                    >{{ action.text }}<i v-if="action.icon" :class="action.icon" /></button>
                  </template>
                </div>
              </slot>
            </div>
          </template>
        </slot>
      </div>

      <!-- 内容区域 -->
      <div ref="bdRef" class="weui-half-screen-dialog__bd" :class="bodyClass">
        <p v-if="desc" class="weui-half-screen-dialog__desc">{{ desc }}</p>
        <p v-if="tips" class="weui-half-screen-dialog__tips" role="option">{{ tips }}</p>
        <slot>{{ content }}</slot>
      </div>

      <!-- 底部按钮区域 -->
      <div v-if="hasFooter" class="weui-half-screen-dialog__ft" :class="footerClass">
        <slot name="footer">
          <div ref="btnAreaRef" class="weui-half-screen-dialog__btn-area">
            <!--
              底部按钮用 button 标签，而非带 href 的锚点标签：宿主页面常给锚点元素
              设置链接色（如文档站 .vp-doc a 的品牌蓝 + underline），其优先级高于
              .weui-btn 的 color，会把按钮文字染成链接色。官方 weui.css 已内置
              button.weui-btn { border-width:0; outline:0; -webkit-appearance:none }
              来适配 button 标签。命令式弹窗渲染在 overlay-host 下、不在文档
              站 .vp-raw 隔离范围内尤其明显。
            -->
            <button
              v-for="(btn, index) in buttons"
              :key="index"
              type="button"
              :class="['weui-btn', buttonClassName(btn, index)]"
              @click="handleButtonTap(btn, index)"
            >{{ btn.label }}</button>
          </div>
          <div v-if="attachmentText" class="weui-half-screen-dialog__attachment-area">
            <a href="javascript:" class="weui-link" @click="handleAttachmentTap">{{ attachmentText }}</a>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiHalfScreenDialog',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch, useSlots, onBeforeUnmount, nextTick } from 'vue'

/** 变体：对应官方示例的样式一 / 二 / 三 / 五 */
export type HalfScreenDialogVariant = 'default' | 'bottomFixed' | 'large' | 'grab'

/** 头部右侧操作项 */
export interface HalfScreenDialogAction {
  /** 文字（同时作为无障碍标签） */
  text?: string
  /** 图标类名，如 weui-icon-search */
  icon?: string
  /** 呈现形式：icon=图标按钮，link=文字链接，button=xmini 按钮 */
  type?: 'icon' | 'link' | 'button'
  /** type=button 时是否为主色，默认 true */
  primary?: boolean
}

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
  /** 辅助描述（对应 __desc） */
  desc?: string
  /** 辅助提示（对应 __tips） */
  tips?: string
  /** 按钮列表 */
  buttons?: HalfScreenDialogButton[]
  /** 头部右侧操作列表 */
  headerActions?: HalfScreenDialogAction[]
  /** 附加操作文字（对应 __attachment-area） */
  attachmentText?: string
  /** 头部头像图片地址，设置后主区域渲染头像+昵称 */
  avatar?: string
  /** 昵称，配合 avatar 使用 */
  nickname?: string
  /** 变体样式 */
  variant?: HalfScreenDialogVariant
  /** 是否显示头部关闭按钮，默认 true */
  showClose?: boolean
  /** 关闭按钮图标，默认按 variant 推导 */
  closeIcon?: string
  /** 是否允许下拉关闭（仅 grab 变体生效），默认 true */
  draggable?: boolean
  /** 下拉关闭阈值（px），默认 56 */
  dragThreshold?: number
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 是否显示遮罩，默认 true */
  mask?: boolean
  /** 按钮是否垂直排列；不传时按按钮高度自动判断 */
  btnWrap?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 遮罩结构包装层的扩展类名。 */
  wrapperClass?: string
  /** 由 overlay-host 注入的 z-index */
  zIndex?: number
}

export interface WeuiHalfScreenDialogEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'buttontap', button: HalfScreenDialogButton, index: number): void
  (e: 'actiontap', action: HalfScreenDialogAction, index: number): void
  (e: 'attachmenttap'): void
  (e: 'close'): void
  /** overlay-host 命令式调用时用于通知卸载 */
  (e: 'weui-close'): void
}

const props = withDefaults(defineProps<WeuiHalfScreenDialogProps>(), {
  visible: false,
  title: undefined,
  subtitle: undefined,
  content: undefined,
  desc: undefined,
  tips: undefined,
  buttons: () => [],
  headerActions: () => [],
  attachmentText: undefined,
  avatar: undefined,
  nickname: undefined,
  variant: 'default',
  showClose: true,
  closeIcon: undefined,
  draggable: true,
  dragThreshold: 56,
  maskClosable: true,
  mask: true,
  btnWrap: undefined,
  extClass: undefined,
  wrapperClass: undefined,
  zIndex: undefined,
})

const emit = defineEmits<WeuiHalfScreenDialogEmits>()
const slots = useSlots()

/** 控制外层节点是否挂载 */
const wrapperShow = ref(false)
/** 控制内部淡入淡出与滑入滑出动画状态 */
const innerShow = ref(false)
/** 显示动画定时器引用，用于卸载前清理 */
let showTimer: ReturnType<typeof setTimeout> | null = null
/** 隐藏动画定时器引用，用于卸载前清理 */
let hideTimer: ReturnType<typeof setTimeout> | null = null

const wrapperRef = ref<HTMLElement | null>(null)
const dialogRef = ref<HTMLElement | null>(null)
const bdRef = ref<HTMLElement | null>(null)
const btnAreaRef = ref<HTMLElement | null>(null)

/** 标题元素 id，供 aria-labelledby 关联 */
const titleId = `weui-hsd-title-${Math.random().toString(36).slice(2, 9)}`

/** 下拉手势状态 */
const dragStartY = ref(0)
const dragOffset = ref(0)
const dragging = ref(false)

/** 自动判断按钮是否需要垂直排列 */
const autoBtnWrap = ref(false)
/** 按钮区尺寸观察器，用于字号变化时重新判断 */
let btnObserver: ResizeObserver | null = null

let lastFocused: HTMLElement | null = null

const isGrab = computed(() => props.variant === 'grab')

const hasHeader = computed(() =>
  Boolean(
    props.title ||
      props.subtitle ||
      props.avatar ||
      props.showClose ||
      props.headerActions.length > 0 ||
      slots.title ||
      slots.action ||
      slots.header,
  ),
)

const hasHeaderActions = computed(() => props.headerActions.length > 0 || Boolean(slots.action))

const hasFooter = computed(() => Boolean(props.buttons.length > 0 || props.attachmentText || slots.footer))

const btnWrapActive = computed(() => props.btnWrap ?? autoBtnWrap.value)

const variantClass = computed(() => {
  switch (props.variant) {
    case 'bottomFixed':
      return 'weui-bottom-fixed-opr-page'
    case 'large':
      return 'weui-half-screen-dialog_large'
    case 'grab':
      return 'weui-half-screen-dialog_grab'
    default:
      return ''
  }
})

const bodyClass = computed(() => (props.variant === 'bottomFixed' ? 'weui-bottom-fixed-opr-page__content' : ''))

const footerClass = computed(() =>
  props.variant === 'bottomFixed' ? 'weui-bottom-fixed-opr-page__tool' : '',
)

/** 关闭图标：bottomFixed / grab 使用向下箭头，其余使用细线关闭图标 */
const closeIconClass = computed(() => {
  if (props.closeIcon) return props.closeIcon
  return props.variant === 'bottomFixed' || props.variant === 'grab'
    ? 'weui-icon-slide-down'
    : 'weui-icon-close-thin'
})

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

/** 下拉进度 0~1 */
const dragPercent = computed(() => {
  if (props.dragThreshold <= 0) return 0
  return Math.min(Math.max(dragOffset.value / props.dragThreshold, 0), 1)
})

/** 拖动把手随进度变高、变圆 */
const slideIconStyle = computed(() => {
  if (!dragging.value) return {}
  return {
    height: `${4 + (16 - 4) * dragPercent.value}px`,
    borderRadius: `${2 + (12 - 2) * dragPercent.value}px`,
  }
})

/** 进度过半后显示向下箭头 */
const slideArrowStyle = computed(() => {
  if (!dragging.value) return {}
  const p = dragPercent.value
  return { opacity: p >= 0.5 ? String((p - 0.5) / 0.5) : '0' }
})

const dialogStyle = computed(() => {
  if (dragOffset.value > 0) {
    return { transform: `translate3d(0, ${dragOffset.value}px, 0)` }
  }
  return {}
})

/** 按钮类名分配：未指定 type 时，单按钮→primary，多按钮→首个 default 其余 primary */
const buttonClassName = (btn: HalfScreenDialogButton, index: number): string => {
  if (btn.type) return `weui-btn_${btn.type}`
  if (props.buttons.length === 1) return 'weui-btn_primary'
  return index === 0 ? 'weui-btn_default' : 'weui-btn_primary'
}

const actionClassName = (action: HalfScreenDialogAction): unknown[] => {
  const base = 'weui-half-screen-dialog__hd__action'
  if (action.type === 'link') return [base, 'weui-link', 'weui-wa-hotarea']
  if (action.type === 'button') {
    return [base, 'weui-btn', action.primary === false ? 'weui-btn_default' : 'weui-btn_primary', 'weui-btn_xmini']
  }
  return [base, 'weui-btn_icon', 'weui-wa-hotarea']
}

/** 依据按钮实际高度判断是否需要垂直排列（字号放大时按钮换行） */
const measureBtnWrap = () => {
  const area = btnAreaRef.value
  if (!area) return
  const btn = area.querySelector('.weui-btn') as HTMLElement | null
  autoBtnWrap.value = Boolean(btn && btn.offsetHeight > 48)
}

const ensureBtnObserver = () => {
  const area = btnAreaRef.value
  if (!area || typeof ResizeObserver === 'undefined') return
  if (btnObserver) {
    btnObserver.disconnect()
  } else {
    btnObserver = new ResizeObserver(() => measureBtnWrap())
  }
  btnObserver.observe(area)
}

const focusWrapper = () => {
  const el = wrapperRef.value
  if (el && typeof el.focus === 'function') el.focus()
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

/** 内容区可滚动，其余区域阻止页面跟随滚动 */
const handleWrapperTouchMove = (e: TouchEvent) => {
  const target = e.target as Node | null
  if (target && bdRef.value && bdRef.value.contains(target)) return
  if (typeof e.preventDefault === 'function') e.preventDefault()
}

const handleButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  emit('buttontap', btn, index)
  // 声明式：触发 update:visible(false) + close 由父组件控制
  // 命令式：触发 weui-close 由 overlay-host 卸载组件
  close()
  emit('weui-close')
}

const handleActionTap = (action: HalfScreenDialogAction, index: number) => {
  emit('actiontap', action, index)
}

const handleAttachmentTap = () => {
  emit('attachmenttap')
}

/** 内容区可滚动时不启动下拉手势，避免与滚动冲突 */
const isScrollableBody = (target: EventTarget | null): boolean => {
  const bd = bdRef.value
  if (!target || !bd) return false
  if (!(target as Node).nodeType) return false
  if (!bd.contains(target as Node)) return false
  return bd.scrollHeight > bd.clientHeight
}

const onTouchStart = (e: TouchEvent) => {
  if (!isGrab.value || !props.draggable) return
  if (isScrollableBody(e.target)) return
  const touch = e.changedTouches[0]
  if (!touch) return
  dragStartY.value = touch.clientY
  dragOffset.value = 0
  dragging.value = true
}

const onTouchMove = (e: TouchEvent) => {
  if (!dragging.value) return
  const touch = e.changedTouches[0]
  if (!touch) return
  const move = touch.clientY - dragStartY.value
  dragOffset.value = move > 0 ? move : 0
}

const onTouchEnd = () => {
  if (!dragging.value) return
  dragging.value = false
  if (dragOffset.value >= props.dragThreshold) {
    // 下滑超过阈值：滑出并关闭
    dragOffset.value = 0
    close()
    emit('weui-close')
    return
  }
  // 未达阈值：回弹
  dragOffset.value = 0
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      if (typeof document !== 'undefined') {
        lastFocused = document.activeElement as HTMLElement | null
      }
      // 显示：先挂载外层，下一 tick 触发滑入
      wrapperShow.value = true
      dragOffset.value = 0
      dragging.value = false
      if (showTimer) clearTimeout(showTimer)
      showTimer = setTimeout(() => {
        innerShow.value = true
        focusWrapper()
        nextTick(() => {
          measureBtnWrap()
          ensureBtnObserver()
        })
      }, 16)
    } else if (wrapperShow.value) {
      // 隐藏：先触发滑出，动画结束后卸载外层
      innerShow.value = false
      if (hideTimer) clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        wrapperShow.value = false
        if (typeof document !== 'undefined' && lastFocused?.focus) lastFocused.focus()
        lastFocused = null
      }, 300)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)
  if (btnObserver) {
    btnObserver.disconnect()
    btnObserver = null
  }
})

defineExpose({ measureBtnWrap })
</script>

<style lang="scss">
/* 官方示例把下滑动画定义在 example.less 中，未随 weui.css 发布，
   因此这里补齐等效规则：默认translateY(100%) 隐藏在视口外，
   加上 _show 后滑入。 */
.weui-half-screen-dialog {
  transition: transform 0.3s;
  transform: translateY(100%);
}

.weui-half-screen-dialog.weui-half-screen-dialog_show {
  transform: translateY(0);
}
</style>
