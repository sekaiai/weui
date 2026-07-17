<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Toast</text>
      <text class="page__desc">轻提示组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法（success）</view>
        <weui-button type="default" @click="showSuccess = true">显示 Toast</weui-button>
        <weui-toast
          v-model:visible="showSuccess"
          content="已完成"
          type="success"
          :duration="2000"
        />
      </view>

      <!-- 提示类型 -->
      <view class="demo-section">
        <view class="demo-section__title">提示类型</view>
        <weui-button type="default" @click="showLoading = true">loading</weui-button>
        <weui-button type="default" @click="showWarning = true">warning</weui-button>
        <weui-button type="default" @click="showText = true">text</weui-button>
        <weui-toast v-model:visible="showLoading" content="加载中" type="loading" :duration="2000" />
        <weui-toast v-model:visible="showWarning" content="警告提示" type="warning" />
        <weui-toast v-model:visible="showText" content="纯文本提示" type="text" />
      </view>

      <!-- 不自动关闭 -->
      <view class="demo-section">
        <view class="demo-section__title">不自动关闭（duration=0）</view>
        <weui-button type="default" @click="showPersistent = true">显示常驻 Toast</weui-button>
        <weui-button type="default" @click="showPersistent = false">手动关闭</weui-button>
        <weui-toast
          v-model:visible="showPersistent"
          content="此提示不会自动关闭"
          type="warning"
          :duration="0"
        />
      </view>

      <!-- 自定义时长 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义时长（4 秒）</view>
        <weui-button type="default" @click="showLong = true">显示 4 秒</weui-button>
        <weui-toast
          v-model:visible="showLong"
          content="此提示显示 4 秒"
          type="success"
          :duration="4000"
        />
      </view>

      <!-- 无遮罩 -->
      <view class="demo-section">
        <view class="demo-section__title">无遮罩（mask=false）</view>
        <weui-button type="default" @click="showNoMask = true">显示无遮罩 Toast</weui-button>
        <weui-toast
          v-model:visible="showNoMask"
          content="无遮罩提示"
          type="success"
          :mask="false"
        />
      </view>

      <!-- 命令式调用 -->
      <view class="demo-section">
        <view class="demo-section__title">命令式调用</view>
        <weui-button type="default" @click="runSuccess">Toast.success</weui-button>
        <weui-button type="default" @click="runLoading">Toast.loading</weui-button>
        <weui-button type="default" @click="runWarning">Toast.warning</weui-button>
        <weui-button type="default" @click="runText">Toast.text</weui-button>
        <weui-button type="default" @click="runHide">Toast.hide（关闭 loading）</weui-button>
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
import { Toast } from 'weui-design-vue'

const showSuccess = ref(false)
const showLoading = ref(false)
const showWarning = ref(false)
const showText = ref(false)
const showPersistent = ref(false)
const showLong = ref(false)
const showNoMask = ref(false)

const runSuccess = () => Toast.success('已完成')
const runLoading = () => Toast.loading('加载中')
const runWarning = () => Toast.warning('警告提示')
const runText = () => Toast.text('纯文本提示')
const runHide = () => Toast.hide()
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
