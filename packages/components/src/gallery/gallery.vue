<template>
  <view
    v-if="wrapperShow"
    :class="['weui-gallery', extClass, { 'weui-animate-fade-in': innerShow, 'weui-animate-fade-out': !innerShow }]"
    :style="maskStyle"
    @click="handleClick"
    @touchmove.stop.prevent
  >
    <image class="weui-gallery__img" :src="src" mode="aspectFit" />
    <view v-if="hasOpr" class="weui-gallery__opr" @click.stop>
      <slot>
        <view class="weui-gallery__del" @click="handleDelete">{{ deleteText }}</view>
      </slot>
    </view>
  </view>
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

export interface WeuiGalleryProps {
  /** 是否显示 */
  visible?: boolean
  /** 图片地址 */
  src?: string
  /** 是否显示删除按钮 */
  showDelete?: boolean
  /** 删除按钮文字 */
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

/** 控制外层节点是否挂载 */
const wrapperShow = ref(false)
/** 控制内部淡入淡出动画状态 */
const innerShow = ref(false)

/** setTimeout 引用，卸载时清理 */
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const hasOpr = computed(() => Boolean(props.showDelete || slots.default))

const maskStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex !== undefined) {
    style['z-index'] = String(props.zIndex)
  }
  return style
})

watch(
  () => props.visible,
  (val) => {
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
