<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">WeUI Design Vue</text>
      <text class="page__desc">脚手架验证页</text>
    </view>
    <view class="page__bd">
      <weui-button type="primary" @click="onPrimary">页面主操作</weui-button>
      <weui-button type="default">页面次要操作</weui-button>
      <weui-button type="warn">警告类操作</weui-button>
      <weui-button :disabled="true">禁用按钮</weui-button>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'PageIndex',
}
</script>

<script setup lang="ts">
const onPrimary = (e: Event) => {
  console.log('primary click', e)
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
.page__bd button {
  margin-bottom: 12px;
}
</style>
