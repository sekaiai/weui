<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">HalfScreenDialog</text>
      <text class="page__desc">半屏弹窗组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-button type="default" @click="showBasic = true">弹出 HalfScreenDialog</weui-button>
        <weui-half-screen-dialog
          v-model:visible="showBasic"
          title="提示"
          subtitle="这是一个副标题"
          content="这是一个半屏弹窗"
          :buttons="basicButtons"
          @buttontap="onButtonTap"
        />
      </view>

      <!-- 单按钮 -->
      <view class="demo-section">
        <view class="demo-section__title">单按钮</view>
        <weui-button type="default" @click="showSingle = true">单按钮 HalfScreenDialog</weui-button>
        <weui-half-screen-dialog
          v-model:visible="showSingle"
          title="提示"
          content="操作成功"
          :buttons="[{ label: '知道了' }]"
        />
      </view>

      <!-- 警告按钮 -->
      <view class="demo-section">
        <view class="demo-section__title">警告按钮</view>
        <weui-button type="default" @click="showWarn = true">删除确认</weui-button>
        <weui-half-screen-dialog
          v-model:visible="showWarn"
          title="确认删除"
          content="删除后不可恢复，是否继续？"
          :buttons="warnButtons"
          @buttontap="onWarnButtonTap"
        />
      </view>

      <!-- 自定义内容 Slot -->
      <view class="demo-section">
        <view class="demo-section__title">自定义内容 Slot</view>
        <weui-button type="default" @click="showSlot = true">自定义内容</weui-button>
        <weui-half-screen-dialog
          v-model:visible="showSlot"
          :buttons="[{ label: '确定' }]"
        >
          <template #title>
            <text>自定义标题</text>
          </template>
          <view class="custom-content">
            <text class="custom-icon">⚠️</text>
            <text class="custom-text">这是一个带图标的提示内容，可以放置更丰富的内容。</text>
          </view>
        </weui-half-screen-dialog>
      </view>

      <!-- 禁止遮罩关闭 -->
      <view class="demo-section">
        <view class="demo-section__title">禁止遮罩关闭</view>
        <weui-button type="default" @click="showNoMask = true">禁止遮罩关闭</weui-button>
        <weui-half-screen-dialog
          v-model:visible="showNoMask"
          title="重要提示"
          content="请仔细阅读后再操作"
          :mask-closable="false"
          :buttons="[{ label: '我已知晓' }]"
        />
      </view>

      <!-- 命令式调用 -->
      <view class="demo-section">
        <view class="demo-section__title">命令式调用</view>
        <weui-button type="default" @click="showImperative">HalfScreenDialog.show</weui-button>
      </view>
    </view>

    <!-- 命令式弹层挂载点 -->
    <weui-overlay-host />
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
import { HalfScreenDialog } from 'weui-design-vue'
import type { HalfScreenDialogButton } from 'weui-design-vue'

const showBasic = ref(false)
const showSingle = ref(false)
const showWarn = ref(false)
const showSlot = ref(false)
const showNoMask = ref(false)

const basicButtons: HalfScreenDialogButton[] = [
  { label: '取消' },
  { label: '确定' },
]

const warnButtons: HalfScreenDialogButton[] = [
  { label: '取消' },
  { label: '删除', type: 'warn' },
]

const onButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  console.log('buttontap', btn, index)
  uni.showToast({ title: `点击了「${btn.label}」`, icon: 'none' })
}

const onWarnButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  if (index === 1) {
    uni.showToast({ title: '已删除', icon: 'none' })
  }
}

const showImperative = async () => {
  const result = await HalfScreenDialog.show({
    title: '提示',
    subtitle: '命令式调用',
    content: '是否确认提交？',
    buttons: [
      { label: '取消' },
      { label: '确定' },
    ],
  })
  uni.showToast({ title: `点击了「${result.button.label}」`, icon: 'none' })
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
.demo-section .weui-btn {
  margin-bottom: 12px;
}
.custom-content {
  text-align: center;
  padding: 16px 0;
}
.custom-icon {
  color: #fa5151;
  font-size: 16px;
  margin-right: 4px;
}
.custom-text {
  font-size: 14px;
}
</style>
