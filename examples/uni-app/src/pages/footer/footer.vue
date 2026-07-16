<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Footer</text>
      <text class="page__desc">页脚组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 仅文字 -->
      <view class="demo-section">
        <view class="demo-section__title">仅文字</view>
        <weui-footer text="Copyright © 2026 weui.io" />
      </view>

      <!-- 单链接 + 文字 -->
      <view class="demo-section">
        <view class="demo-section__title">单链接 + 文字</view>
        <weui-footer
          :links="[{ text: '底部链接' }]"
          text="Copyright © 2026 weui.io"
        />
      </view>

      <!-- 多链接 + 文字 -->
      <view class="demo-section">
        <view class="demo-section__title">多链接 + 文字</view>
        <weui-footer
          :links="[
            { text: '底部链接' },
            { text: '底部链接' },
          ]"
          text="Copyright © 2026 weui.io"
        />
      </view>

      <!-- 带跳转地址的链接 -->
      <view class="demo-section">
        <view class="demo-section__title">带跳转地址的链接</view>
        <weui-footer
          :links="[{ text: 'WeUI 首页', url: '/pages/index/index' }]"
          text="Copyright © 2026 weui.io"
        />
      </view>

      <!-- 自定义内容 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义内容</view>
        <weui-footer>
          <view class="weui-footer__links">
            <text class="weui-footer__link">自定义链接</text>
          </view>
          <view class="weui-footer__text">自定义底部内容</view>
        </weui-footer>
      </view>
    </view>

    <!-- 固定在底部 -->
    <weui-footer
      fixed
      :links="[{ text: 'WeUI 首页', url: '/pages/index/index' }]"
      text="Copyright © 2026 weui.io"
    />
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
  name: 'PageFooter',
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
</style>
