<template>
  <view
    v-if="visible"
    :class="['weui-gallery', extClass]"
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
import { computed, useSlots } from 'vue'

export interface WeuiGalleryProps {
  /** 是否显示 */
  visible?: boolean
  /** 图片地址 */
  src?: string
  /** 是否显示删除按钮 */
  showDelete?: boolean
  /** 删除按钮文字 */
  deleteText?: string
  /** 自定义附加类名 */
  extClass?: string
}

export interface WeuiGalleryEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'delete'): void
  (e: 'hide'): void
}

const props = withDefaults(defineProps<WeuiGalleryProps>(), {
  visible: false,
  src: undefined,
  showDelete: false,
  deleteText: '删除',
  extClass: undefined,
})

const emit = defineEmits<WeuiGalleryEmits>()
const slots = useSlots()

const hasOpr = computed(() => Boolean(props.showDelete || slots.default))

const close = () => {
  emit('update:visible', false)
  emit('hide')
}

const handleClick = () => {
  close()
}

const handleDelete = () => {
  emit('delete')
}
</script>
