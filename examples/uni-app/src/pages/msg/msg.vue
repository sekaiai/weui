<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Msg</text>
      <text class="page__desc">提示页组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 操作成功 -->
      <view class="demo-section">
        <view class="demo-section__title">操作成功</view>
        <weui-msg
          type="success"
          title="操作成功"
          desc="内容详情，可根据实际需要安排"
          :buttons="successButtons"
          @buttontap="onButtonTap"
        />
      </view>

      <!-- 操作失败 -->
      <view class="demo-section">
        <view class="demo-section__title">操作失败</view>
        <weui-msg
          type="warn"
          title="操作失败"
          desc="网络异常，请稍后重试"
          :buttons="failButtons"
          @buttontap="onButtonTap"
        />
      </view>

      <!-- 等待中 -->
      <view class="demo-section">
        <view class="demo-section__title">等待中</view>
        <weui-msg
          type="waiting"
          title="正在处理"
          desc="请耐心等待，结果将通过消息通知您"
          :buttons="[{ text: '返回首页', type: 'primary' }]"
          @buttontap="onButtonTap"
        />
      </view>

      <!-- 自定义图标尺寸 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义图标尺寸</view>
        <weui-msg
          type="info"
          :icon-size="93"
          title="提示"
          desc="iconSize=93 与 icon 的 msg 属性对应的官方尺寸一致"
        />
      </view>

      <!-- 自定义图标 Slot -->
      <view class="demo-section">
        <view class="demo-section__title">自定义图标 Slot</view>
        <weui-msg title="自定义图标" desc="使用 icon 插槽替换默认图标">
          <template #icon>
            <view class="custom-icon">★</view>
          </template>
        </weui-msg>
      </view>

      <!-- 仅标题描述 -->
      <view class="demo-section">
        <view class="demo-section__title">仅标题描述</view>
        <weui-msg title="纯文字提示" desc="不显示图标与按钮" />
      </view>

      <!-- 底部提示 -->
      <view class="demo-section">
        <view class="demo-section__title">底部提示</view>
        <weui-msg
          type="success"
          title="操作成功"
          :buttons="[{ text: '推荐操作', type: 'primary' }]"
          tips="提示详情，可根据实际需要安排，居中展现"
          @buttontap="onButtonTap"
        />
      </view>

      <!-- 底部额外区域 -->
      <view class="demo-section">
        <view class="demo-section__title">底部额外区域</view>
        <weui-msg
          type="success"
          title="操作成功"
          :buttons="[{ text: '完成', type: 'primary' }]"
          @buttontap="onButtonTap"
        >
          <template #footer>
            <view class="weui-footer">
              <text class="weui-footer__text">Copyright © 2026</text>
            </view>
          </template>
        </weui-msg>
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
import type { MsgButton } from 'weui-uniapp-design'

const successButtons: MsgButton[] = [
  { text: '辅助操作', type: 'default' },
  { text: '推荐操作', type: 'primary' },
]

const failButtons: MsgButton[] = [
  { text: '推荐操作', type: 'primary' },
  { text: '辅助操作', type: 'default' },
]

const onButtonTap = (btn: MsgButton, index: number) => {
  console.log('buttontap', btn, index)
  uni.showToast({ title: `点击了「${btn.text}」`, icon: 'none' })
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
  margin-bottom: 24px;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  overflow: hidden;
}
.demo-section__title {
  padding: 12px 16px;
  font-size: 14px;
  color: #888;
  background-color: #f7f7f7;
}
.custom-icon {
  font-size: 64px;
  color: #07c160;
  line-height: 1;
}
</style>
