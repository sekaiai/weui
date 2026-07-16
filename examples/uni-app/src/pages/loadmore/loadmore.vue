<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Loadmore</text>
      <text class="page__desc">加载更多组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-loadmore />
        <weui-loadmore text="加载中..." />
      </view>

      <!-- 分割线样式 -->
      <view class="demo-section">
        <view class="demo-section__title">分割线样式（type=line）</view>
        <weui-loadmore type="line" text="暂无数据" />
        <weui-loadmore type="line" text="没有更多了" />
      </view>

      <!-- 点点样式 -->
      <view class="demo-section">
        <view class="demo-section__title">点点样式（type=dot）</view>
        <weui-loadmore type="dot" />
      </view>

      <!-- 自定义文字 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义文字</view>
        <weui-loadmore text="正在加载更多" />
        <weui-loadmore type="line" text="我也是有底线的" />
      </view>

      <!-- 隐藏文字 -->
      <view class="demo-section">
        <view class="demo-section__title">隐藏文字</view>
        <weui-loadmore :show-text="false" />
        <weui-loadmore type="dot" :show-text="false" />
        <text class="demo-tips">showText 为 false 时仅保留视觉元素</text>
      </view>

      <!-- 扩展类名 -->
      <view class="demo-section">
        <view class="demo-section__title">扩展类名</view>
        <weui-loadmore ext-class="my-loadmore" text="自定义间距" />
        <text class="demo-tips">通过 extClass 调整外边距</text>
      </view>

      <!-- 列表加载场景 -->
      <view class="demo-section">
        <view class="demo-section__title">列表加载场景</view>
        <view class="weui-cells__group weui-cells__group_form">
          <view class="weui-cell" v-for="item in list" :key="item.id">
            <view class="weui-cell__bd">{{ item.text }}</view>
          </view>
        </view>
        <weui-loadmore v-if="loading" text="正在加载" />
        <weui-loadmore v-else type="line" text="暂无更多数据" />
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
  name: 'PageLoadmore',
})

const list = [
  { id: 1, text: '列表项 1' },
  { id: 2, text: '列表项 2' },
  { id: 3, text: '列表项 3' },
  { id: 4, text: '列表项 4' },
  { id: 5, text: '列表项 5' },
]

const loading = false
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
.demo-tips {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #b2b2b2;
}
.my-loadmore {
  margin-top: 40px;
}
</style>
