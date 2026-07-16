<template>
  <view
    v-if="visible"
    class="weui-toptips"
    :class="[typeClass, extClass]"
    :style="toptipsStyle"
  >
    {{ content }}
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiToptips',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'

export type ToptipsType = 'info' | 'success' | 'warn' | 'error'

export interface WeuiToptipsProps {
  /** 是否显示 */
  visible?: boolean
  /** 提示文字 */
  content?: string
  /** 提示类型 */
  type?: ToptipsType
  /** 显示时长 ms，0 为不自动关闭 */
  duration?: number
  /** 自定义附加类名 */
  extClass?: string
  /** 由 overlay-host 注入的 z-index */
  zIndex?: number
}

export interface WeuiToptipsEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
  /** overlay-host 命令式调用时用于通知卸载 */
  (e: 'weui-close'): void
}

const props = withDefaults(defineProps<WeuiToptipsProps>(), {
  visible: false,
  content: '',
  type: 'info',
  duration: 2000,
  extClass: undefined,
  zIndex: undefined,
})

const emit = defineEmits<WeuiToptipsEmits>()

const typeClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'weui-toptips_success'
    case 'warn':
      return 'weui-toptips_warn'
    case 'error':
      return 'weui-toptips_error'
    default:
      return 'weui-toptips_info'
  }
})

const toptipsStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex !== undefined) {
    style['z-index'] = String(props.zIndex)
  }
  return style
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
    if (val && props.duration > 0) {
      clearTimer()
      timer = setTimeout(() => {
        close()
      }, props.duration)
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
