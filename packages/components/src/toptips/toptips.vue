<template>
  <div
    v-if="visible"
    role="alert"
    class="weui-toptips"
    :class="['weui-toptips_warn', extClass]"
    :style="toptipsStyle"
  >
    {{ content }}
  </div>
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

export type ToptipsType = 'warn'

export interface WeuiToptipsProps {
  /** 是否显示 */
  visible?: boolean
  /** 提示文字 */
  content?: string
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
  duration: 2000,
  extClass: undefined,
  zIndex: undefined,
})

const emit = defineEmits<WeuiToptipsEmits>()

const toptipsStyle = computed(() => {
  const style: Record<string, string> = {
    // WeUI CSS 默认 .weui-toptips { display: none }，挂载时需覆盖为 block
    display: 'block',
  }
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
