<template>
  <weui-media-box
    v-for="(item, i) in items"
    :key="item.id ?? i"
    :type="item.thumb ? 'appmsg' : 'text'"
    :thumb="item.thumb"
    :title="item.title"
    :desc="item.desc"
    :href="item.href"
    :ext-class="item.extClass"
    @click="emit('item-click', item, $event)"
  >
    <ul v-if="item.info?.length" class="weui-media-box__info">
      <li
        v-for="(meta, mi) in item.info"
        :key="mi"
        class="weui-media-box__info__meta"
        :class="{ 'weui-media-box__info__meta_extra': mi === item.info!.length - 1 }"
      >{{ meta }}</li>
    </ul>
  </weui-media-box>
</template>

<script lang="ts">
export default {
  name: 'WeuiMediaList',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import WeuiMediaBox from '../media-box/media-box.vue'

export interface MediaListItem {
  /** 唯一标识，用于 v-for key */
  id?: string | number
  /** 标题 */
  title: string
  /** 描述 */
  desc?: string
  /** 缩略图 URL。有 thumb → appmsg；无 thumb → text */
  thumb?: string
  /** 链接地址，传入时该项可点击（仅 appmsg 模式有效） */
  href?: string
  /** 来源信息列表（渲染为 weui-media-box__info） */
  info?: string[]
  /** 扩展类名 */
  extClass?: string
}

export interface WeuiMediaListProps {
  /** 数据列表 */
  items: MediaListItem[]
}

export interface WeuiMediaListEmits {
  (e: 'item-click', item: MediaListItem, event: Event): void
}

defineProps<WeuiMediaListProps>()
const emit = defineEmits<WeuiMediaListEmits>()
</script>
