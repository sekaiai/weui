<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Progress</text>
      <text class="page__desc">进度条组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-progress :percent="30" />
      </view>

      <!-- 不同进度 -->
      <view class="demo-section">
        <view class="demo-section__title">不同进度</view>
        <view class="demo-stack">
          <weui-progress :percent="0" />
          <weui-progress :percent="50" />
          <weui-progress :percent="100" />
        </view>
      </view>

      <!-- 隐藏辅助文本与取消操作 -->
      <view class="demo-section">
        <view class="demo-section__title">隐藏辅助文本与取消操作</view>
        <weui-progress :percent="50" :show-info="false" :show-operation="false" />
      </view>

      <!-- 自定义高度 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义高度</view>
        <view class="demo-stack">
          <weui-progress :percent="40" :stroke-width="3" />
          <weui-progress :percent="60" :stroke-width="6" />
          <weui-progress :percent="80" :stroke-width="10" />
        </view>
      </view>

      <!-- 自定义激活颜色 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义激活颜色</view>
        <view class="demo-stack">
          <weui-progress :percent="80" active-color="#10aeff" />
          <weui-progress :percent="60" active-color="#fa9d3b" />
          <weui-progress :percent="40" active-color="#fa5151" />
          <weui-progress :percent="90" active-color="#07c160" />
        </view>
      </view>

      <!-- 自定义背景色 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义背景色</view>
        <weui-progress :percent="70" background-color="#ededed" />
      </view>

      <!-- 组合使用 -->
      <view class="demo-section">
        <view class="demo-section__title">组合使用</view>
        <weui-progress
          :percent="75"
          :stroke-width="8"
          active-color="#07c160"
          background-color="#e5e5e5"
        />
      </view>

      <!-- 边界值 -->
      <view class="demo-section">
        <view class="demo-section__title">边界值（自动限制 0-100）</view>
        <view class="demo-stack">
          <weui-progress :percent="-20" />
          <weui-progress :percent="150" />
        </view>
        <text class="demo-tips">percent 超出范围时自动夹取至 0-100</text>
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
  name: 'PageProgress',
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
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-tips {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #b2b2b2;
}
</style>
