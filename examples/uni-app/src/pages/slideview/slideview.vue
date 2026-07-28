<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Slideview</text>
      <text class="page__desc">滑动视图组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-slideview
          v-model:show="showBasic"
          :buttons="basicButtons"
          @buttonclick="onButtonClick"
        >
          <weui-cell title="滑动视图内容" />
        </weui-slideview>
      </view>

      <!-- 警告按钮 -->
      <view class="demo-section">
        <view class="demo-section__title">警告按钮</view>
        <weui-slideview
          v-model:show="showWarn"
          :buttons="warnButtons"
          @buttonclick="onButtonClick"
        >
          <weui-cell title="左滑显示删除按钮" />
        </weui-slideview>
      </view>

      <!-- 禁用滑动 -->
      <view class="demo-section">
        <view class="demo-section__title">禁用滑动</view>
        <weui-slideview
          v-model:show="showDisabled"
          :buttons="basicButtons"
          disabled
        >
          <weui-cell title="禁用滑动（点击内容区域不收起）" />
        </weui-slideview>
      </view>

      <!-- 自定义类名 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义类名</view>
        <weui-slideview
          v-model:show="showExt"
          :buttons="basicButtons"
          ext-class="my-slideview"
          @buttonclick="onButtonClick"
        >
          <weui-cell title="附加自定义类名" />
        </weui-slideview>
      </view>

      <!-- 默认展开 -->
      <view class="demo-section">
        <view class="demo-section__title">默认展开</view>
        <weui-slideview
          v-model:show="showDefault"
          :buttons="basicButtons"
          @buttonclick="onButtonClick"
          @close="onClose"
        >
          <weui-cell title="展开后点击此区域收起" />
        </weui-slideview>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import type { SlideButton } from 'weui-design-vue'

const showBasic = ref(false)
const showWarn = ref(false)
const showDisabled = ref(false)
const showExt = ref(false)
const showDefault = ref(true)

const basicButtons: SlideButton[] = [
  { text: '收藏' },
  { text: '编辑' },
]

const warnButtons: SlideButton[] = [
  { text: '收藏' },
  { text: '删除', type: 'warn' },
]

const onButtonClick = (btn: SlideButton, index: number) => {
  console.log('buttonclick', btn, index)
  uni.showToast({ title: `点击了「${btn.text}」`, icon: 'none' })
}

const onClose = () => {
  console.log('已收起')
}
</script>

<style scoped>
.page {
  padding: 16px;
}
.page__hd {
  margin-bottom: 24px;
}
.page__title {
  display: block;
  font-size: 20px;
  font-weight: bold;
}
.page__desc {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #888;
}
.demo-section {
  margin-bottom: 32px;
}
.demo-section__title {
  margin-bottom: 12px;
  font-size: 14px;
  color: #888;
}
</style>
