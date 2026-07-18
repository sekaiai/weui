<template>
  <view>
    <weui-overlay-host />
    <pages />
  </view>
</template>

<script setup lang="ts">
import WeuiOverlayHost from 'weui-design-vue/dist/uni-app/src/overlay-host/overlay-host.vue'

defineOptions({
  name: 'App',
})
</script>

<style>
/* 全局引入 weui 基础样式 */
@import 'weui/dist/style/weui.css';
/* 全局引入 weui 扩展样式（weui.css 不含的自定义类） */
@import 'weui-design-vue/dist/uni-app/styles/weui-extra.scss';
</style>
