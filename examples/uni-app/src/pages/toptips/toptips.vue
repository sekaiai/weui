<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Toptips</text>
      <text class="page__desc">顶部提示组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-button type="default" @click="showBasic = true">显示 Toptips</weui-button>
        <weui-toptips
          v-model:visible="showBasic"
          content="请注意提示内容"
          :duration="2000"
        />
      </view>

      <!-- 不自动关闭 -->
      <view class="demo-section">
        <view class="demo-section__title">不自动关闭</view>
        <weui-button type="default" @click="showPersistent = true">常驻提示</weui-button>
        <weui-button type="default" @click="showPersistent = false">手动关闭</weui-button>
        <weui-toptips
          v-model:visible="showPersistent"
          content="此提示不会自动关闭"
          :duration="0"
        />
      </view>

      <!-- 自定义时长 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义时长（4秒）</view>
        <weui-button type="default" @click="showLong = true">显示 4 秒</weui-button>
        <weui-toptips
          v-model:visible="showLong"
          content="此提示显示 4 秒"
          :duration="4000"
        />
      </view>

      <!-- 命令式调用 -->
      <view class="demo-section">
        <view class="demo-section__title">命令式调用</view>
        <weui-button type="default" @click="runWarn">Toptips.warn</weui-button>
      </view>
    </view>

    <!-- 命令式弹层挂载点 -->
    <weui-overlay-host />
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
import { Toptips } from 'weui-design-vue'

const showBasic = ref(false)
const showPersistent = ref(false)
const showLong = ref(false)

const runWarn = () => Toptips.warn('请注意警告')
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
</style>
