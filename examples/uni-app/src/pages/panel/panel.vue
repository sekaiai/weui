<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Panel</text>
      <text class="page__desc">面板组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-panel title="标题">
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
        </weui-panel>
      </view>

      <!-- 无标题面板 -->
      <view class="demo-section">
        <view class="demo-section__title">无标题面板</view>
        <weui-panel>
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
        </weui-panel>
      </view>

      <!-- Access 模式 -->
      <view class="demo-section">
        <view class="demo-section__title">Access 模式</view>
        <weui-panel type="access" title="图文组合列表">
          <view class="weui-media-box weui-media-box_appmsg">
            <view class="weui-media-box__hd">
              <image
                class="weui-media-box__thumb"
                src="https://weui.io/images/pic_160.png"
              />
            </view>
            <view class="weui-media-box__bd">
              <view class="weui-media-box__title">标题一</view>
              <view class="weui-media-box__desc">
                由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星
              </view>
            </view>
          </view>
          <view class="weui-media-box weui-media-box_appmsg">
            <view class="weui-media-box__hd">
              <image
                class="weui-media-box__thumb"
                src="https://weui.io/images/pic_160.png"
              />
            </view>
            <view class="weui-media-box__bd">
              <view class="weui-media-box__title">标题二</view>
              <view class="weui-media-box__desc">
                由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星
              </view>
            </view>
          </view>
        </weui-panel>
      </view>

      <!-- 自定义头部 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义头部</view>
        <weui-panel>
          <template #header>
            <view class="weui-panel__title">自定义头部</view>
          </template>
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
        </weui-panel>
      </view>

      <!-- 底部内容 -->
      <view class="demo-section">
        <view class="demo-section__title">底部内容</view>
        <weui-panel title="标题">
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
          <template #footer>
            <view class="weui-panel__ft">查看更多</view>
          </template>
        </weui-panel>
      </view>

      <!-- 扩展类名 -->
      <view class="demo-section">
        <view class="demo-section__title">扩展类名</view>
        <weui-panel title="标题" ext-class="custom-panel">
          <view class="weui-cells">
            <view class="weui-cell">
              <view class="weui-cell__bd">标题文字</view>
              <view class="weui-cell__ft">说明文字</view>
            </view>
          </view>
        </weui-panel>
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
defineOptions({
  name: 'PagePanel',
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
