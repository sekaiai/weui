<template>
  <div :class="rootClass">
    <!-- 头部：header slot 优先，否则用 title -->
    <div v-if="$slots.header || title" class="weui-panel__hd">
      <slot name="header">{{ title }}</slot>
    </div>

    <!-- 主体 -->
    <div class="weui-panel__bd">
      <!-- 默认 slot：无外部传入时用 items 渲染 -->
      <slot>
        <!-- media 模式 -->
        <template v-if="items?.length && itemType === 'media'">
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

        <!-- cell 模式 -->
        <weui-media-box v-else-if="items?.length && itemType === 'cell'" type="small-appmsg">
          <div class="weui-cells">
            <a
              v-for="(item, i) in items"
              :key="item.id ?? i"
              class="weui-cell weui-cell_active weui-cell_access weui-cell_example"
              :href="item.href || 'javascript:void(0);'"
              @click="!item.href && emit('item-click', item, $event)"
            >
              <div v-if="item.thumb" class="weui-cell__hd">
                <img :src="item.thumb" style="width:20px;height:20px;display:block" />
              </div>
              <div class="weui-cell__bd weui-cell_primary">
                <p>{{ item.title }}</p>
              </div>
              <div class="weui-cell__ft" />
            </a>
          </div>
        </weui-media-box>
      </slot>
    </div>

    <!-- 底部：footer slot 优先，否则用 footerText -->
    <div v-if="footerText || $slots.footer" class="weui-panel__ft">
      <slot name="footer">
        <a
          v-if="footerText"
          :href="footerHref"
          class="weui-cell weui-cell_active weui-cell_access weui-cell_link"
          @click="emit('footer-click', $event)"
        >
          <span class="weui-cell__bd">{{ footerText }}</span>
          <span class="weui-cell__ft" />
        </a>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiPanel',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import WeuiMediaBox from '../media-box/media-box.vue'

export interface PanelItem {
  /** 唯一标识，用于 v-for key */
  id?: string | number
  /** 标题 */
  title: string
  /** 描述（仅 media 模式有效，cell 模式不渲染） */
  desc?: string
  /** 缩略图 URL。有 thumb 的 media 项 → appmsg；无 thumb → text；cell 模式下渲染为 20×20 小图标 */
  thumb?: string
  /** 链接地址，传入时该项可点击 */
  href?: string
  /** 来源信息列表（media 模式下渲染为 weui-media-box__info，cell 模式不渲染） */
  info?: string[]
  /** 扩展类名 */
  extClass?: string
}

export type WeuiPanelItemType = 'media' | 'cell'

export interface WeuiPanelProps {
  /** 头部标题 */
  title?: string
  /** 面板类型，access 模式添加 weui-panel_access 类 */
  type?: 'default' | 'access'
  /** 数据列表，传入时自动渲染 media-box 或 cells（根据 itemType） */
  items?: PanelItem[]
  /** 列表项渲染模式。media=松散卡片，cell=紧凑列表（有分割线） */
  itemType?: WeuiPanelItemType
  /** 底部"查看更多"文字。传入时自动渲染为标准 link cell */
  footerText?: string
  /** footer 链接地址，配合 footerText 使用 */
  footerHref?: string
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

export interface WeuiPanelEmits {
  (e: 'footer-click', event: Event): void
  (e: 'item-click', item: PanelItem, event: Event): void
}

const props = withDefaults(defineProps<WeuiPanelProps>(), {
  title: undefined,
  type: 'default',
  items: () => [],
  itemType: 'media',
  footerText: undefined,
  footerHref: 'javascript:void(0);',
  extClass: undefined,
})

const emit = defineEmits<WeuiPanelEmits>()

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-panel']
  if (props.type === 'access') classes.push('weui-panel_access')
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
