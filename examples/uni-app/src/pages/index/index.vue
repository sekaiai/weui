<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">WeUI Design Vue</text>
      <text class="page__desc">Button 组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-button type="primary" @click="onPrimary">页面主操作</weui-button>
        <weui-button type="default">页面次要操作</weui-button>
        <weui-button type="warn">警告类操作</weui-button>
      </view>

      <!-- 按钮尺寸 -->
      <view class="demo-section">
        <view class="demo-section__title">按钮尺寸</view>
        <weui-button type="primary" size="default">默认</weui-button>
        <weui-button type="primary" size="medium">中等</weui-button>
        <weui-button type="primary" size="mini">迷你</weui-button>
        <weui-button type="primary" size="xmini">超小</weui-button>
      </view>

      <!-- 显示模式 -->
      <view class="demo-section">
        <view class="demo-section__title">显示模式</view>
        <weui-button type="primary" display="block">块级按钮</weui-button>
        <view class="demo-inline">
          <weui-button type="default" display="inline">行内</weui-button>
          <weui-button type="default" display="inline">行内</weui-button>
        </view>
      </view>

      <!-- 禁用状态 -->
      <view class="demo-section">
        <view class="demo-section__title">禁用状态</view>
        <weui-button type="primary" :disabled="true">禁用</weui-button>
        <weui-button type="default" :disabled="true">禁用</weui-button>
      </view>

      <!-- 加载状态 -->
      <view class="demo-section">
        <view class="demo-section__title">加载状态</view>
        <weui-button type="primary" :loading="true">加载中</weui-button>
        <weui-button type="default" :loading="true">加载中</weui-button>
      </view>

      <!-- Cell 样式 -->
      <view class="demo-section">
        <view class="demo-section__title">Cell 样式按钮</view>
        <weui-button cell type="primary">Cell Primary</weui-button>
        <weui-button cell type="default">Cell Default</weui-button>
        <weui-button cell type="warn">Cell Warn</weui-button>
      </view>

      <!-- 验证码按钮 -->
      <view class="demo-section">
        <view class="demo-section__title">验证码按钮</view>
        <weui-button vcode>获取验证码</weui-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const onPrimary = (e: Event) => {
  console.log('primary click', e)
}

defineOptions({
  name: 'PageIndex',
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
.demo-section .weui-btn {
  margin-bottom: 12px;
}
.demo-inline {
  display: flex;
  gap: 16px;
}
</style>
