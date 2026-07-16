<template>
  <view :class="rootClass">
    <slot>
      <view v-if="hasIcon" class="weui-msg__icon-area">
        <slot name="icon">
          <weui-icon :type="type" :size="iconSize" />
        </slot>
      </view>
      <view v-if="hasText" class="weui-msg__text-area">
        <view v-if="title" class="weui-msg__title">{{ title }}</view>
        <view v-if="desc" class="weui-msg__desc">{{ desc }}</view>
      </view>
    </slot>
    <view v-if="hasOpr" class="weui-msg__opr-area">
      <view class="weui-btn-area">
        <view
          v-for="(btn, index) in buttons"
          :key="index"
          :class="buttonClass(btn)"
          @click="handleButtonTap(btn, index)"
        >{{ btn.text }}</view>
      </view>
    </view>
    <view v-if="$slots.footer" class="weui-msg__extra-area">
      <slot name="footer" />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiMsg',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import WeuiIcon from '../icon/icon.vue'

export interface MsgButton {
  /** 按钮文字 */
  text: string
  /** 按钮类型，default 辅助操作 / primary 主操作 */
  type?: 'default' | 'primary'
}

export interface WeuiMsgProps {
  /** 图标类型，对应 weui-icon-* 类（success/info/warn/waiting 等） */
  type?: string
  /** 图标尺寸 px */
  iconSize?: number
  /** 标题 */
  title?: string
  /** 描述文字 */
  desc?: string
  /** 操作按钮列表 */
  buttons?: MsgButton[]
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

export interface WeuiMsgEmits {
  (e: 'buttontap', button: MsgButton, index: number): void
}

const props = withDefaults(defineProps<WeuiMsgProps>(), {
  type: undefined,
  iconSize: 64,
  title: undefined,
  desc: undefined,
  buttons: () => [],
  extClass: undefined,
})

const emit = defineEmits<WeuiMsgEmits>()
const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-msg']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasIcon = computed(() => Boolean(props.type || slots.icon))
const hasText = computed(() => Boolean(props.title || props.desc))
const hasOpr = computed(() => Boolean(props.buttons && props.buttons.length > 0))

const buttonClass = (btn: MsgButton) => {
  return ['weui-btn', `weui-btn_${btn.type || 'default'}`]
}

const handleButtonTap = (btn: MsgButton, index: number) => {
  emit('buttontap', btn, index)
}
</script>
