<template>
  <!-- cells 模式：小图文组合列表容器 -->
  <div v-if="type === 'cells'" :class="rootClass" v-bind="$attrs">
    <div class="weui-cells">
      <slot />
    </div>
  </div>
  <!-- appmsg 模式（有 thumb 或 hd slot） + href：用 <a> 包裹 -->
  <a v-else-if="hasHd && href" :href="href" :class="rootClass" v-bind="$attrs" @click="onClick">
    <div class="weui-media-box__hd">
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
  <!-- appmsg 模式（有 thumb 或 hd slot）无 href -->
  <div v-else-if="hasHd" :class="rootClass" v-bind="$attrs" @click="onClick">
    <div class="weui-media-box__hd">
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
  <!-- text 模式（无 thumb 且无 hd slot） -->
  <div v-else :class="rootClass" v-bind="$attrs" @click="onClick">
    <strong v-if="title" class="weui-media-box__title">{{ title }}</strong>
    <p v-if="desc" class="weui-media-box__desc">{{ desc }}</p>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiMediaBox',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export type WeuiMediaBoxType = 'text' | 'cells'

export interface WeuiMediaBoxProps {
  /** media-box 类型：text=纯文字或图文组合（根据 thumb 自动判断），cells=小图文组合列表容器 */
  type?: WeuiMediaBoxType
  /** 缩略图 URL。传入时自动渲染为 appmsg 图文模式，否则为 text 纯文字模式 */
  thumb?: string
  /** 标题，渲染为 <strong class="weui-media-box__title"> */
  title?: string
  /** 描述，渲染为 <p class="weui-media-box__desc"> */
  desc?: string
  /** 链接地址，传入时整个 media-box 用 <a> 包裹（仅非 cells 模式有效） */
  href?: string
  /** 扩展类名 */
  extClass?: string
}

export interface WeuiMediaBoxEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiMediaBoxProps>(), {
  type: 'text',
  thumb: undefined,
  title: undefined,
  desc: undefined,
  href: undefined,
  extClass: undefined,
})

const emit = defineEmits<WeuiMediaBoxEmits>()

const slots = useSlots()

const hasHd = computed(() => Boolean(props.thumb || slots.hd))

const rootClass = computed(() => {
  const classes: string[] = ['weui-media-box']
  if (props.type === 'cells') {
    classes.push('weui-media-box_small-appmsg')
  } else if (hasHd.value) {
    classes.push('weui-media-box_appmsg')
  } else {
    classes.push('weui-media-box_text')
  }
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onClick = (event: Event) => {
  if (!props.href) {
    emit('click', event)
  }
}
</script>

<style lang="scss">
/* 官方小图文组合列表：缩略图固定 46px，并由 header 提供与正文的间距。 */
.weui-media-box_small-appmsg .weui-cell_example .weui-cell__hd {
  padding-right: 16px;
}
.weui-media-box_small-appmsg .weui-cell_example .weui-cell__hd img {
  display: block;
  width: 46px;
  height: 46px;
  object-fit: cover;
}
</style>
