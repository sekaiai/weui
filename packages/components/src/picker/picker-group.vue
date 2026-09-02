<template>
  <div
    :class="['weui-picker__group', extClass]"
    v-bind="$attrs"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchEnd"
  >
    <div class="weui-picker__mask" />
    <div class="weui-picker__indicator" />
    <div class="weui-picker__content" :style="contentStyle">
      <div
        v-for="(option, i) in options"
        :key="i"
        :class="['weui-picker__item', { 'weui-picker__item_disabled': option.disabled }]"
      >{{ option.label }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiPickerGroup',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface PickerOption {
  /** 显示文字 */
  label: string
  /** 选项值 */
  value: string | number
  /** 是否禁用 */
  disabled?: boolean
}

export interface WeuiPickerGroupProps {
  /** 选项列表 */
  options: PickerOption[]
  /** 当前选中索引 */
  index?: number
  /** 选择列容器的扩展类名。 */
  extClass?: string
}

export interface WeuiPickerGroupEmits {
  (e: 'change', index: number): void
}

const props = withDefaults(defineProps<WeuiPickerGroupProps>(), {
  options: () => [],
  index: 0,
  extClass: undefined,
})

const emit = defineEmits<WeuiPickerGroupEmits>()

/** 每项高度 px（与 WeUI CSS .weui-picker__item height 一致） */
const ITEM_HEIGHT = 56
/** indicator 距顶部 px（与 .weui-picker__indicator top 一致） */
const INDICATOR_TOP = 112

const resolveEnabledIndex = (preferredIndex: number) => {
  const maxIndex = Math.max(0, props.options.length - 1)
  const index = Math.max(0, Math.min(maxIndex, preferredIndex))
  if (!props.options[index]?.disabled) return index

  for (let distance = 1; distance <= maxIndex; distance += 1) {
    const previous = index - distance
    const next = index + distance
    if (previous >= 0 && !props.options[previous]?.disabled) return previous
    if (next <= maxIndex && !props.options[next]?.disabled) return next
  }

  return index
}

/** content 当前的 translateY 值 */
const offset = ref(INDICATOR_TOP - props.index * ITEM_HEIGHT)

/** 监听外部 index 变化，同步 offset */
watch(
  () => props.index,
  (val) => {
    offset.value = INDICATOR_TOP - val * ITEM_HEIGHT
  },
)

const contentStyle = computed(() => ({
  transform: `translate3d(0, ${offset.value}px, 0)`,
}))

/** 触摸起始 Y 坐标 */
let startY = 0
/** 触摸开始时的 offset */
let startOffset = 0
/** 是否正在触摸 */
let isTouching = false

const handleTouchStart = (e: TouchEvent) => {
  isTouching = true
  startY = e.touches[0].clientY
  startOffset = offset.value
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isTouching) return
  const delta = e.touches[0].clientY - startY
  offset.value = startOffset + delta
}

const handleTouchEnd = () => {
  if (!isTouching) return
  isTouching = false

  // 计算最近的 item 索引
  const maxIndex = Math.max(0, props.options.length - 1)
  let nearestIndex = Math.round((INDICATOR_TOP - offset.value) / ITEM_HEIGHT)
  nearestIndex = Math.max(0, Math.min(maxIndex, nearestIndex))
  nearestIndex = resolveEnabledIndex(nearestIndex)

  // 归位
  offset.value = INDICATOR_TOP - nearestIndex * ITEM_HEIGHT

  // 索引变化时触发 change
  if (nearestIndex !== props.index) {
    emit('change', nearestIndex)
  }
}
</script>
