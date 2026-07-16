<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Loading</text>
      <text class="page__desc">加载组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <view class="demo-inline">
          <weui-loading />
          <text class="demo-label">纯图标</text>
        </view>
        <view class="demo-inline">
          <weui-loading text="加载中..." />
        </view>
      </view>

      <!-- 页面模式 -->
      <view class="demo-section">
        <view class="demo-section__title">页面模式</view>
        <weui-loading type="page" text="正在加载" />
      </view>

      <!-- 自定义尺寸 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义尺寸</view>
        <view class="demo-inline">
          <weui-loading :size="16" />
          <weui-loading :size="20" />
          <weui-loading :size="32" />
          <weui-loading :size="48" />
        </view>
        <view class="demo-inline">
          <weui-loading :size="28" text="28px 加载中" />
        </view>
      </view>

      <!-- 自定义颜色 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义颜色</view>
        <view class="demo-inline">
          <weui-loading color="#1AAD19" text="绿色" />
        </view>
        <view class="demo-inline">
          <weui-loading color="#FA5151" text="红色" />
        </view>
        <view class="demo-inline">
          <weui-loading color="#10AEFF" text="蓝色" />
        </view>
      </view>

      <!-- 透明背景 -->
      <view class="demo-section">
        <view class="demo-section__title">透明背景</view>
        <view class="demo-block-dark">
          <weui-loading transparent text="加载中..." />
        </view>
        <text class="demo-tips">transparent 模式适用于深色背景</text>
      </view>

      <!-- 自定义文字 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义文字（插槽）</view>
        <view class="demo-inline">
          <weui-loading>
            <text>自定义加载文字</text>
          </weui-loading>
        </view>
      </view>

      <!-- 页面模式组合 -->
      <view class="demo-section">
        <view class="demo-section__title">页面模式组合</view>
        <weui-loading type="page" text="正在加载" />
        <weui-loading type="page" :size="32" color="#1AAD19" text="绿色加载" />
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
  name: 'PageLoading',
})
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
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0;
}
.demo-label {
  font-size: 14px;
  color: #888;
}
.demo-tips {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #b2b2b2;
}
.demo-block-dark {
  display: inline-flex;
  align-items: center;
  padding: 16px 24px;
  background-color: #333;
  border-radius: 8px;
}
</style>
