<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Preview</text>
      <text class="page__desc">表单预览组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-preview
          title="合计：¥99.00"
          :items="basicItems"
          :buttons="basicButtons"
          @buttontap="onButtonTap"
        />
      </view>

      <!-- 仅展示信息 -->
      <view class="demo-section">
        <view class="demo-section__title">仅展示信息</view>
        <weui-preview
          title="收款方：WeUI"
          :items="infoItems"
        />
      </view>

      <!-- 按钮类型 -->
      <view class="demo-section">
        <view class="demo-section__title">按钮类型</view>
        <weui-preview
          :items="payItems"
          :buttons="payButtons"
          @buttontap="onButtonTap"
        />
      </view>

      <!-- 自定义头部 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义头部</view>
        <weui-preview :items="basicItems">
          <template #header>
            <view class="custom-header">自定义头部内容</view>
          </template>
        </weui-preview>
      </view>

      <!-- 自定义主体 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义主体</view>
        <weui-preview title="订单详情">
          <view class="custom-body">
            <text class="custom-body__text">这里是自定义的主体内容，可以是任意结构。</text>
          </view>
        </weui-preview>
      </view>

      <!-- 自定义底部 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义底部</view>
        <weui-preview :items="basicItems">
          <template #footer>
            <view class="custom-footer" @click="onConfirm">自定义底部按钮</view>
          </template>
        </weui-preview>
      </view>

      <!-- 扩展类名 -->
      <view class="demo-section">
        <view class="demo-section__title">扩展类名</view>
        <weui-preview
          title="合计：¥99.00"
          :items="basicItems"
          ext-class="my-preview"
        />
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
import type { PreviewItem, PreviewButton } from 'weui-uniapp-design'

const basicItems: PreviewItem[] = [
  { label: '商品', value: 'WeUI 设计指南' },
  { label: '数量', value: '1' },
  { label: '金额', value: '¥99.00' },
]

const basicButtons: PreviewButton[] = [
  { text: '取消', type: 'default' },
  { text: '确定', type: 'primary' },
]

const infoItems: PreviewItem[] = [
  { label: '付款方', value: '张三' },
  { label: '交易时间', value: '2024-01-01 12:00' },
  { label: '交易单号', value: '2024010100001234' },
]

const payItems: PreviewItem[] = [
  { label: '状态', value: '待支付' },
  { label: '金额', value: '¥199.00' },
]

const payButtons: PreviewButton[] = [
  { text: '取消订单', type: 'default' },
  { text: '立即支付', type: 'primary' },
]

const onButtonTap = (btn: PreviewButton, index: number) => {
  uni.showToast({ title: `点击了「${btn.text}」`, icon: 'none' })
}

const onConfirm = () => {
  uni.showToast({ title: '已确认', icon: 'none' })
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
.demo-section {
  margin-bottom: 32px;
}
.demo-section__title {
  margin-bottom: 12px;
  font-size: 14px;
  color: #888;
}
.custom-header {
  text-align: right;
  font-size: 16px;
  font-weight: bold;
}
.custom-body {
  text-align: center;
  padding: 8px 0;
}
.custom-body__text {
  font-size: 14px;
  color: #888;
}
.custom-footer {
  flex: 1;
  text-align: center;
  color: #576b95;
  line-height: 50px;
}
</style>
