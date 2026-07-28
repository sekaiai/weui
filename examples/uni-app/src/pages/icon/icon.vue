<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Icon</text>
      <text class="page__desc">图标组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 所有图标类型 -->
      <view class="demo-section">
        <view class="demo-section__title">所有图标类型</view>
        <view class="icon-grid">
          <view class="icon-item" v-for="item in types" :key="item.type">
            <weui-icon :type="item.type" />
            <text class="icon-label">{{ item.label }}</text>
          </view>
        </view>
      </view>

      <!-- 自定义尺寸 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义尺寸</view>
        <view class="demo-inline">
          <weui-icon type="success" :size="16" />
          <weui-icon type="success" :size="23" />
          <weui-icon type="success" :size="32" />
          <weui-icon type="success" :size="48" />
        </view>
        <text class="demo-tips">size 依次为 16 / 23（默认）/ 32 / 48</text>
      </view>

      <!-- 自定义颜色 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义颜色</view>
        <view class="demo-inline">
          <weui-icon type="success" color="#07C160" />
          <weui-icon type="info" color="#10AEFF" />
          <weui-icon type="warn" color="#FA9D3B" />
          <weui-icon type="cancel" color="#FA5151" />
        </view>
        <text class="demo-tips">不传 color 时使用 currentColor</text>
      </view>

      <!-- 字符串 size -->
      <view class="demo-section">
        <view class="demo-section__title">字符串 size</view>
        <view class="demo-inline">
          <weui-icon type="success" size="28" />
          <weui-icon type="info" size="28" />
          <weui-icon type="warn" size="1em" />
        </view>
        <text class="demo-tips">纯数字字符串按 px 处理，带单位字符串原样使用</text>
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
defineOptions({
  name: 'PageIcon',
})

const types = [
  { type: 'success', label: 'success' },
  { type: 'success-no-circle', label: 'success-no-circle' },
  { type: 'info', label: 'info' },
  { type: 'info-circle', label: 'info-circle' },
  { type: 'warn', label: 'warn' },
  { type: 'waiting', label: 'waiting' },
  { type: 'waiting-circle', label: 'waiting-circle' },
  { type: 'cancel', label: 'cancel' },
  { type: 'download', label: 'download' },
  { type: 'search', label: 'search' },
  { type: 'clear', label: 'clear' },
  { type: 'back', label: 'back' },
  { type: 'delete', label: 'delete' },
]
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
.demo-inline {
  display: flex;
  align-items: center;
  gap: 16px;
}
.demo-tips {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #b2b2b2;
}
.icon-grid {
  display: flex;
  flex-wrap: wrap;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.33%;
  margin-bottom: 20px;
}
.icon-label {
  margin-top: 8px;
  font-size: 12px;
  color: #888;
}
</style>
