<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Toast / Toptips</span>
      <span class="page__desc">命令式调用：Toast.* 与 Toptips.*</span>
    </div>

    <div class="page__bd">
      <div class="demo-section">
        <div class="demo-section__title">Toast 类型</div>
        <div class="demo-inline">
          <weui-button type="default" size="mini" @click="toast.success('操作成功')">Success</weui-button>
          <weui-button type="default" size="mini" @click="toast.text('纯文本提示')">Text</weui-button>
          <weui-button type="default" size="mini" @click="toast.warning('警告提示')">Warning</weui-button>
        </div>
        <div class="demo-inline" style="margin-top: 12px">
          <weui-button type="default" size="mini" @click="showLoading">Loading（手动关闭）</weui-button>
        </div>
      </div>

      <div class="demo-section">
        <div class="demo-section__title">Toptips 顶部提示</div>
        <div class="demo-inline">
          <weui-button type="default" size="mini" @click="toptips.warn('这是一条警告提示')">Warn</weui-button>
          <weui-button type="default" size="mini" @click="toptips.info('这是一条信息提示')">Info</weui-button>
          <weui-button type="default" size="mini" @click="toptips.success('这是一条成功提示')">Success</weui-button>
          <weui-button type="default" size="mini" @click="toptips.error('这是一条错误提示')">Error</weui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toast, Toptips } from 'weui-uniapp-design'

const toast = Toast
const toptips = Toptips

const showLoading = async () => {
  await Toast.loading('加载中…')
  // duration 为 0，需手动关闭
  setTimeout(() => Toast.hide(), 2000)
}
</script>
