<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Gallery</text>
      <text class="page__desc">画廊/图片预览组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-button type="default" @click="showBasic = true">预览图片</weui-button>
        <weui-gallery
          v-model:visible="showBasic"
          src="https://res.wx.qq.com/a/wx_fed/weui/res/favicon.ico"
        />
      </view>

      <!-- 显示删除按钮 -->
      <view class="demo-section">
        <view class="demo-section__title">显示删除按钮</view>
        <weui-button type="default" @click="showDelete = true">预览并删除</weui-button>
        <weui-gallery
          v-model:visible="showDelete"
          src="https://res.wx.qq.com/a/wx_fed/weui/res/favicon.ico"
          show-delete
          @delete="onDelete"
        />
      </view>

      <!-- 自定义删除文字 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义删除文字</view>
        <weui-button type="default" @click="showCustomText = true">自定义文字</weui-button>
        <weui-gallery
          v-model:visible="showCustomText"
          src="https://res.wx.qq.com/a/wx_fed/weui/res/favicon.ico"
          show-delete
          delete-text="移除"
          @delete="onDelete"
        />
      </view>

      <!-- 自定义操作区 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义操作区</view>
        <weui-button type="default" @click="showSlot = true">自定义操作</weui-button>
        <weui-gallery
          v-model:visible="showSlot"
          src="https://res.wx.qq.com/a/wx_fed/weui/res/favicon.ico"
        >
          <view class="custom-actions">
            <text class="action-item" @click="onSave">保存</text>
            <text class="action-item" @click="onShare">分享</text>
            <text class="action-item" @click="onClose">关闭</text>
          </view>
        </weui-gallery>
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

const showBasic = ref(false)
const showDelete = ref(false)
const showCustomText = ref(false)
const showSlot = ref(false)

const onDelete = () => {
  uni.showToast({ title: '已删除', icon: 'none' })
}

const onSave = () => {
  uni.showToast({ title: '已保存', icon: 'none' })
}

const onShare = () => {
  uni.showToast({ title: '已分享', icon: 'none' })
}

const onClose = () => {
  showSlot.value = false
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
.custom-actions {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.action-item {
  color: #ffffff;
  font-size: 17px;
  padding: 12px 24px;
}
</style>
