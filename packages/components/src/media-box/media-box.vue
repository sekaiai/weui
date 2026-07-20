<template>
  <a v-if="type === 'appmsg' && href" :href="href" :class="rootClass" @click="onClick">
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
  <div v-else :class="rootClass" @click="onClick">
    <template v-if="type === 'appmsg'">
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
    </template>

    <template v-else-if="type === 'text'">
      <strong v-if="title" class="weui-media-box__title">{{ title }}</strong>
      <p v-if="desc" class="weui-media-box__desc">{{ desc }}</p>
      <slot />
    </template>

    <template v-else>
      <slot />
    </template>
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

export type WeuiMediaBoxType = 'appmsg' | 'text' | 'small-appmsg'

export interface WeuiMediaBoxProps {
  /** media-box 类型，对应官方类名后缀 */
  type: WeuiMediaBoxType
  /** 缩略图 URL（仅 appmsg 模式有效） */
  thumb?: string
  /** 标题，渲染为 <strong class="weui-media-box__title"> */
  title?: string
  /** 描述，渲染为 <p class="weui-media-box__desc"> */
  desc?: string
  /** 链接地址，传入时整个 media-box 用 <a> 包裹（仅 appmsg 模式有效） */
  href?: string
  /** 扩展类名 */
  extClass?: string
}

export interface WeuiMediaBoxEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiMediaBoxProps>(), {
  type: 'appmsg',
  thumb: undefined,
  title: undefined,
  desc: undefined,
  href: undefined,
  extClass: undefined,
})

const emit = defineEmits<WeuiMediaBoxEmits>()

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-media-box', `weui-media-box_${props.type}`]
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
