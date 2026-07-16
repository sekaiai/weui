<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Grid</text>
      <text class="page__desc">宫格组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-grid>
          <weui-grid-item icon="/static/pic_160.png" label="Grid" />
          <weui-grid-item icon="/static/pic_160.png" label="Grid" />
          <weui-grid-item icon="/static/pic_160.png" label="Grid" />
        </weui-grid>
      </view>

      <!-- 带跳转 -->
      <view class="demo-section">
        <view class="demo-section__title">带跳转</view>
        <weui-grid>
          <weui-grid-item icon="/static/pic_160.png" label="首页" url="/pages/index/index" />
          <weui-grid-item icon="/static/pic_160.png" label="Cell" url="/pages/cell/cell" />
          <weui-grid-item icon="/static/pic_160.png" label="Badge" url="/pages/badge/badge" />
        </weui-grid>
      </view>

      <!-- 仅触发 click -->
      <view class="demo-section">
        <view class="demo-section__title">仅触发 click 事件</view>
        <weui-grid>
          <weui-grid-item icon="/static/pic_160.png" label="点击" @click="onGridClick" />
          <weui-grid-item icon="/static/pic_160.png" label="点击" @click="onGridClick" />
        </weui-grid>
      </view>

      <!-- 自定义图标 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义图标</view>
        <weui-grid>
          <weui-grid-item label="收藏">
            <template #icon>
              <view class="custom-icon">★</view>
            </template>
          </weui-grid-item>
          <weui-grid-item label="点赞">
            <template #icon>
              <view class="custom-icon">♥</view>
            </template>
          </weui-grid-item>
          <weui-grid-item label="分享">
            <template #icon>
              <view class="custom-icon">↗</view>
            </template>
          </weui-grid-item>
        </weui-grid>
      </view>

      <!-- 自定义标签 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义标签</view>
        <weui-grid>
          <weui-grid-item icon="/static/pic_160.png">
            <template #label>
              <text class="custom-label">自定义</text>
            </template>
          </weui-grid-item>
          <weui-grid-item icon="/static/pic_160.png">
            <template #label>
              <text class="custom-label">自定义</text>
            </template>
          </weui-grid-item>
        </weui-grid>
      </view>

      <!-- 自定义内容 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义内容</view>
        <weui-grid>
          <weui-grid-item>
            <view class="custom-content">
              <view class="custom-content__num">8</view>
              <view class="custom-content__label">待办</view>
            </view>
          </weui-grid-item>
          <weui-grid-item>
            <view class="custom-content">
              <view class="custom-content__num">12</view>
              <view class="custom-content__label">消息</view>
            </view>
          </weui-grid-item>
          <weui-grid-item>
            <view class="custom-content">
              <view class="custom-content__num">3</view>
              <view class="custom-content__label">通知</view>
            </view>
          </weui-grid-item>
        </weui-grid>
      </view>

      <!-- 扩展类名 -->
      <view class="demo-section">
        <view class="demo-section__title">扩展类名</view>
        <weui-grid ext-class="my-grids">
          <weui-grid-item
            icon="/static/pic_160.png"
            label="Grid"
            ext-class="my-grid-item"
          />
          <weui-grid-item
            icon="/static/pic_160.png"
            label="Grid"
            ext-class="my-grid-item"
          />
        </weui-grid>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'PageGrid',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
const onGridClick = () => {
  uni.showToast({ title: 'grid clicked', icon: 'none' })
}
</script>

<style scoped>
.page {
  padding: 0;
}
.page__hd {
  padding: 16px;
  margin-bottom: 8px;
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
.page__bd {
  padding-bottom: 32px;
}
.demo-section {
  margin-bottom: 24px;
}
.demo-section__title {
  padding: 0 16px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #888;
}
.custom-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: #07c160;
  color: #fff;
  font-size: 16px;
}
.custom-label {
  color: #07c160;
  font-weight: bold;
}
.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
}
.custom-content__num {
  font-size: 24px;
  font-weight: bold;
  color: #07c160;
}
.custom-content__label {
  margin-top: 4px;
  font-size: 14px;
  color: #888;
}
</style>
