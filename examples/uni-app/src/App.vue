<template>
  <view>
    <weui-overlay-host />
    <pages />
  </view>
</template>

<script setup lang="ts">
import WeuiOverlayHost from 'weui-uniapp-design/uni-app/overlay-host.vue'

defineOptions({
  name: 'App',
})
</script>

<style>
/* 全局引入 weui 基础样式 */
@import 'weui/dist/style/weui.css';
</style>
