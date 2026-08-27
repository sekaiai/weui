<template>
  <div
    v-if="wrapperShow"
    :class="['weui-gallery', 'weui-transition', extClass, { 'weui-transition_show': innerShow, 'weui-animate-fade-in': innerShow }]"
    :style="maskStyle"
    role="dialog"
    aria-modal="true"
    @click="handleClick"
    @touchmove.stop.prevent
  >
    <!--
      WeUI gallery uses a positioned background image rather than an <img>.
      The latter is a replaced element and collapses to zero height when the
      remote image has not loaded yet, which makes the H5 demo appear blank.
    -->
    <span
      v-if="!isMini"
      class="weui-gallery__img"
      role="img"
      alt="图片详情"
      aria-label="图片详情"
      :style="imageStyle"
    />
    <image
      v-else
      class="weui-gallery__img"
      :src="src"
      mode="aspectFit"
      aria-label="图片详情"
    />
    <div v-if="hasOpr" class="weui-gallery__opr" @click.stop>
      <slot>
        <a
          role="button"
          :aria-label="deleteText"
          href="javascript:"
          class="weui-gallery__del"
          @click="handleDelete"
        >
          <i class="weui-icon-delete weui-icon_gallery-delete" aria-hidden="true" />
        </a>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiGallery',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch, useSlots, onBeforeUnmount } from 'vue'
import { isMiniProgram } from '../utils/platform'

export interface WeuiGalleryProps {
  /** 是否显示 */
  visible?: boolean
  /** 图片地址 */
  src?: string
  /** 是否显示删除按钮 */
  showDelete?: boolean
  /** 删除图标按钮的无障碍标签 */
  deleteText?: string
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 由 overlay-host 注入的 z-index */
  zIndex?: number
}

export interface WeuiGalleryEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'delete'): void
  (e: 'hide'): void
  /** overlay-host 命令式调用时用于通知卸载 */
  (e: 'weui-close'): void
}

const props = withDefaults(defineProps<WeuiGalleryProps>(), {
  visible: false,
  src: undefined,
  showDelete: false,
  deleteText: '删除',
  maskClosable: true,
  extClass: undefined,
  zIndex: undefined,
})

const emit = defineEmits<WeuiGalleryEmits>()
const slots = useSlots()
const isMini = isMiniProgram()

const imageStyle = computed(() => ({
  backgroundImage: props.src ? `url(${JSON.stringify(props.src)})` : 'none',
}))

/** 控制外层节点是否挂载 */
const wrapperShow = ref(false)
/** 控制内部淡入淡出动画状态 */
const innerShow = ref(false)

/** setTimeout 引用，卸载时清理 */
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const hasOpr = computed(() => Boolean(props.showDelete || slots.default))

const maskStyle = computed(() => {
  const style: Record<string, string> = {
    // WeUI CSS 默认 .weui-gallery { display: none }，挂载时需覆盖为 block
    display: 'block',
  }
  if (props.zIndex !== undefined) {
    style['z-index'] = String(props.zIndex)
  }
  return style
})

watch(
  () => props.visible,
  (val) => {
    if (isMini) {
      // 小程序端：调用 uni.previewImage 系统预览，不渲染自定义 UI
      // wrapperShow 始终为 false，模板 v-if="wrapperShow" 自然不渲染
      if (val) {
        uni.previewImage({
          urls: props.src ? [props.src] : [],
          complete: () => {
            emit('update:visible', false)
            emit('hide')
            emit('weui-close')
          },
        })
      }
    } else {
      // H5 端（含 vue3 产物与 uni-app H5 产物）：渲染 UI + 淡入淡出动画
      if (val) {
        // 显示：先挂载外层，下一 tick 触发淡入
        wrapperShow.value = true
        showTimer = setTimeout(() => {
          innerShow.value = true
        }, 16)
      } else if (wrapperShow.value) {
        // 隐藏：先触发淡出，动画结束后卸载外层
        innerShow.value = false
        hideTimer = setTimeout(() => {
          wrapperShow.value = false
        }, 300)
      }
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
})

const close = () => {
  emit('update:visible', false)
  emit('hide')
  emit('weui-close')
}

const handleClick = () => {
  if (props.maskClosable) {
    close()
  }
}

const handleDelete = () => {
  emit('delete')
}
</script>

<style lang="scss">
/* WeUI 的 transition 默认仅覆盖 mask 与半屏弹窗；画廊复用同一初始隐藏状态。 */
.weui-gallery.weui-transition {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.weui-gallery.weui-transition_show {
  opacity: 1;
  visibility: visible;
}
</style>
