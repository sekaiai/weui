<template>
  <div v-if="visible" role="alert">
    <div
      v-if="mask"
      class="weui-mask_transparent"
      :style="maskStyle"
      @touchmove.stop.prevent
    />
    <div class="weui-toast__wrp">
      <div :class="toastClass">
        <i
          v-if="type === 'success'"
          class="weui-icon_toast weui-icon-success-no-circle"
        />
        <i
          v-else-if="type === 'warning'"
          class="weui-icon_toast weui-icon-warn"
        />
        <span
          v-else-if="type === 'loading'"
          class="weui-icon_toast weui-primary-loading"
        ><span class="weui-primary-loading__dot" /></span>
        <p class="weui-toast__content">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiToast',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'

export type ToastType = 'success' | 'loading' | 'warning' | 'text'

export interface WeuiToastProps {
  /** 是否显示 */
  visible?: boolean
  /** 提示文字 */
  content?: string
  /** 提示类型，默认 success */
  type?: ToastType
  /** 显示时长 ms，0 为不自动关闭。loading 类型默认 0，其他默认 2000 */
  duration?: number
  /** 是否显示透明遮罩（防止点击穿透），默认 true */
  mask?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 由 overlay-host 注入的 z-index */
  zIndex?: number
}

export interface WeuiToastEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
  /** overlay-host 命令式调用时用于通知卸载 */
  (e: 'weui-close'): void
}

const props = withDefaults(defineProps<WeuiToastProps>(), {
  visible: false,
  content: '',
  type: 'success',
  duration: undefined,
  mask: true,
  extClass: undefined,
  zIndex: undefined,
})

const emit = defineEmits<WeuiToastEmits>()

const toastClass = computed(() => {
  const classes: string[] = ['weui-toast']
  if (props.type === 'text') {
    classes.push('weui-toast_text')
    if (props.content.length > 14) classes.push('weui-toast_text-more')
  }
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const maskStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex !== undefined) {
    style['z-index'] = String(props.zIndex)
  }
  return style
})

/** 实际生效的 duration：未传时按 type 取默认值 */
const effectiveDuration = computed(() => {
  if (props.duration !== undefined) return props.duration
  // loading 默认不自动关闭，其他默认 2000
  return props.type === 'loading' ? 0 : 2000
})

let timer: ReturnType<typeof setTimeout> | null = null

const clearTimer = () => {
  if (timer !== null) {
    clearTimeout(timer)
    timer = null
  }
}

const close = () => {
  clearTimer()
  emit('update:visible', false)
  emit('close')
  emit('weui-close')
}

watch(
  () => props.visible,
  (val) => {
    if (val && effectiveDuration.value > 0) {
      clearTimer()
      timer = setTimeout(() => {
        close()
      }, effectiveDuration.value)
    } else if (!val) {
      clearTimer()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  clearTimer()
})
</script>
