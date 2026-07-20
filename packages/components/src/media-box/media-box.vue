<template>
  <a v-if="type === 'flex' && href" :href="href" :class="rootClass" @click="onClick">
    <div v-if="hasHd" class="weui-media-box__hd">
      <slot name="hd">
        <img v-if="thumb" class="weui-media-box__thumb" :src="thumb" />
      </slot>
    </div>
    <div class="weui-media-box__bd">
      <strong v-if="title" class="weui-media-box__title">{{ title }}</strong>
      <p v-if="desc" class="weui-media-box__desc">{{ desc }}</p>
      <slot />
    </div>
  </a>
  <div v-else-if="type === 'flex'" :class="rootClass" @click="onClick">
    <div v-if="hasHd" class="weui-media-box__hd">
      <slot name="hd">
        <img v-if="thumb" class="weui-media-box__thumb" :src="thumb" />
      </slot>
    </div>
    <div class="weui-media-box__bd">
      <strong v-if="title" class="weui-media-box__title">{{ title }}</strong>
      <p v-if="desc" class="weui-media-box__desc">{{ desc }}</p>
      <slot />
    </div>
  </div>
  <div v-else-if="type === 'text'" :class="rootClass" @click="onClick">
    <strong v-if="title" class="weui-media-box__title">{{ title }}</strong>
    <p v-if="desc" class="weui-media-box__desc">{{ desc }}</p>
    <slot />
  </div>
  <div v-else :class="rootClass">
    <div class="weui-cells">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiMediaBox',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export type WeuiMediaBoxType = 'flex' | 'text' | 'cells'

export interface WeuiMediaBoxProps {
  /** media-box 类型：flex=图文组合，text=纯文字组合，cells=小图文组合列表容器 */
  type: WeuiMediaBoxType
  /** 缩略图 URL（仅 flex 模式有效） */
  thumb?: string
  /** 标题，渲染为 <strong class="weui-media-box__title"> */
  title?: string
  /** 描述，渲染为 <p class="weui-media-box__desc"> */
  desc?: string
  /** 链接地址，传入时整个 media-box 用 <a> 包裹（仅 flex 模式有效） */
  href?: string
  /** 扩展类名 */
  extClass?: string
}

export interface WeuiMediaBoxEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiMediaBoxProps>(), {
  type: 'flex',
  thumb: undefined,
  title: undefined,
  desc: undefined,
  href: undefined,
  extClass: undefined,
})

const emit = defineEmits<WeuiMediaBoxEmits>()

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-media-box']
  // 类型 → 官方类名后缀映射
  const suffixMap: Record<WeuiMediaBoxType, string> = {
    flex: 'appmsg',
    text: 'text',
    cells: 'small-appmsg',
  }
  classes.push(`weui-media-box_${suffixMap[props.type]}`)
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasHd = computed(() => Boolean(props.thumb || slots.hd))

const onClick = (event: Event) => {
  if (!props.href) {
    emit('click', event)
  }
}
</script>

<style lang="scss">
/* 小图文组合列表（cells 模式）：cell 头部需要右间距
   weui.css 中 weui-cell__hd 默认无 padding-right，在此补充 */
.weui-media-box_small-appmsg .weui-cell__hd {
  padding-right: 16px;
}
</style>
