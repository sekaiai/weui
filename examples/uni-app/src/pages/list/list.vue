<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">List</text>
      <text class="page__desc">列表组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-list>
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
        </weui-list>
      </view>

      <!-- 列表标题 -->
      <view class="demo-section">
        <view class="demo-section__title">列表标题</view>
        <weui-list title="列表标题">
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
        </weui-list>
      </view>

      <!-- 底部提示 -->
      <view class="demo-section">
        <view class="demo-section__title">底部提示</view>
        <weui-list tips="底部提示文字">
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
        </weui-list>
      </view>

      <!-- 标题与提示组合 -->
      <view class="demo-section">
        <view class="demo-section__title">标题与提示组合</view>
        <weui-list title="列表标题" tips="底部提示文字">
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
        </weui-list>
      </view>

      <!-- 带链接的列表 -->
      <view class="demo-section">
        <view class="demo-section__title">带链接的列表</view>
        <weui-list title="带链接的列表标题">
          <view class="weui-cells">
            <view class="weui-cell weui-cell_access">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">查看详情</view>
            </view>
            <view class="weui-cell weui-cell_access">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">查看详情</view>
            </view>
          </view>
        </weui-list>
      </view>

      <!-- 扩展类名 -->
      <view class="demo-section">
        <view class="demo-section__title">扩展类名</view>
        <weui-list title="标题" ext-class="custom-list">
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
        </weui-list>
        <text class="demo-tips">通过 extClass 追加自定义类名</text>
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
  name: 'PageList',
})
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 96px;
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
.demo-tips {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #b2b2b2;
}
</style>
