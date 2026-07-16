<template>
  <view class="weui-overlay-host">
    <!-- 命令式弹层在此渲染 -->
    <component
      :is="item.component"
      v-for="item in items"
      :key="item.id"
      v-bind="item.props"
      @weui-close="handleClose(item.id)"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiOverlayHost',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, shallowRef, onUnmounted } from 'vue'
import { overlayManager } from '../utils/overlay'

interface OverlayItem {
  id: number
  component: any
  props: Record<string, any>
}

const items = shallowRef<OverlayItem[]>([])
const nextId = ref(1)

/** 添加命令式弹层，返回 id 与 z-index */
const add = (component: any, props: Record<string, any> = {}): { id: number; zIndex: number } => {
  const id = nextId.value++
  const zIndex = overlayManager.push()
  const item: OverlayItem = { id, component, props: { ...props, zIndex } }
  items.value = [...items.value, item]
  return { id, zIndex }
}

/** 移除命令式弹层 */
const remove = (id: number): void => {
  const item = items.value.find((i) => i.id === id)
  if (item) {
    overlayManager.pop()
    items.value = items.value.filter((i) => i.id !== id)
  }
}

const handleClose = (id: number): void => {
  remove(id)
}

onUnmounted(() => {
  overlayManager.reset()
})

// 暴露 API 给命令式调用方
defineExpose({ add, remove })
</script>
