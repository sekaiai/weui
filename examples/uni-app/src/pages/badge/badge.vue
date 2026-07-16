<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Badge</text>
      <text class="page__desc">徽章组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 数字角标 -->
      <view class="demo-section">
        <view class="demo-section__title">数字角标</view>
        <view class="demo-inline">
          <weui-badge content="1" />
          <weui-badge content="8" />
          <weui-badge content="88" />
          <weui-badge content="888" />
        </view>
      </view>

      <!-- 红点模式 -->
      <view class="demo-section">
        <view class="demo-section__title">红点模式</view>
        <view class="demo-inline">
          <weui-badge />
          <text class="demo-label">（content 为空自动转红点）</text>
        </view>
      </view>

      <!-- 文字角标 -->
      <view class="demo-section">
        <view class="demo-section__title">文字角标</view>
        <view class="demo-inline">
          <weui-badge content="New" />
          <weui-badge content="Hot" />
          <weui-badge content="VIP" />
        </view>
      </view>

      <!-- 无障碍标签 -->
      <view class="demo-section">
        <view class="demo-section__title">无障碍标签</view>
        <view class="demo-inline">
          <weui-badge content="8" aria-label="，8个新通知" />
          <weui-badge aria-label="，有更新" />
        </view>
        <text class="demo-tips">读屏时会朗读完整语义，如"8，8个新通知"</text>
      </view>

      <!-- 头像角标场景 -->
      <view class="demo-section">
        <view class="demo-section__title">头像角标场景</view>
        <view class="avatar-wrap">
          <view class="avatar"></view>
          <weui-badge content="8" ext-class="avatar-badge" />
        </view>
        <text class="demo-tips">通过 extClass 绝对定位到右上角</text>
      </view>

      <!-- 列表项角标场景 -->
      <view class="demo-section">
        <view class="demo-section__title">列表项角标场景</view>
        <view class="weui-cell weui-cell_access">
          <view class="weui-cell__bd">单行列表</view>
          <view class="weui-cell__ft weui-cell__ft_in-style">
            <text>详细信息</text>
            <weui-badge aria-label="，有更新" />
          </view>
        </view>
        <view class="weui-cell weui-cell_access">
          <view class="weui-cell__bd">
            <text>单行列表</text>
            <weui-badge content="8" aria-label="，8个新通知" />
          </view>
          <view class="weui-cell__ft"></view>
        </view>
        <view class="weui-cell weui-cell_access">
          <view class="weui-cell__bd">
            <text>单行列表</text>
            <weui-badge content="New" />
          </view>
          <view class="weui-cell__ft"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PageBadge',
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
.avatar-wrap {
  position: relative;
  display: inline-block;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background-color: #e5e5e5;
}
.avatar-badge {
  position: absolute;
  top: -0.4em;
  right: -0.4em;
}
</style>
