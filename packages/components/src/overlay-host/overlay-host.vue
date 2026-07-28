<template>
  <div class="weui-overlay-host">
    <!-- 命令式弹层在此渲染 -->
    <component
      :is="item.component"
      v-for="item in items"
      :key="item.id"
      v-bind="item.props"
      @weui-close="handleClose(item.id)"
    />
  </div>
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
import { ref, shallowRef, onMounted, onBeforeUnmount } from 'vue'
import type { Component } from 'vue'
import { overlayManager } from '../utils/overlay'
import { setOverlayHost } from '../utils/overlay-host-ref'

export interface OverlayItem {
  id: number
  component: Component
  props: Record<string, unknown>
  zIndex: number
}

const items = shallowRef<OverlayItem[]>([])
const nextId = ref(1)

/** 添加命令式弹层，返回 id 与 z-index */
const add = (component: Component, props: Record<string, unknown> = {}): { id: number; zIndex: number } => {
  const id = nextId.value++
  const zIndex = overlayManager.push()
  const item: OverlayItem = { id, component, props: { ...props, zIndex }, zIndex }
  items.value = [...items.value, item]
  return { id, zIndex }
}

/** 移除命令式弹层，并精确释放其 z-index。 */
const remove = (id: number): void => {
  const index = items.value.findIndex((i) => i.id === id)
  if (index === -1) return
  overlayManager.remove(items.value[index].zIndex)
  items.value = items.value.filter((i) => i.id !== id)
}

const handleClose = (id: number): void => {
  remove(id)
}

// 挂载时注册到全局引用，供命令式弹层 API 调用
onMounted(() => {
  setOverlayHost({ add, remove })
})

onBeforeUnmount(() => {
  setOverlayHost(null)
})

// 暴露 API 给命令式调用方
defineExpose({ add, remove })
</script>
