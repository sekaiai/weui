<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Flex</text>
      <text class="page__desc">弹性布局组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法（等分）</view>
        <weui-flex>
          <weui-flex-item>
            <view class="placeholder">A</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder">B</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder">C</view>
          </weui-flex-item>
        </weui-flex>
        <text class="demo-tips">子项默认 flex:1，等分容器宽度</text>
      </view>

      <!-- 自定义 flex 比例 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义 flex 比例</view>
        <weui-flex>
          <weui-flex-item :flex="2">
            <view class="placeholder">2</view>
          </weui-flex-item>
          <weui-flex-item :flex="1">
            <view class="placeholder">1</view>
          </weui-flex-item>
          <weui-flex-item :flex="1">
            <view class="placeholder">1</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <!-- 主轴方向 -->
      <view class="demo-section">
        <view class="demo-section__title">主轴方向 direction="column"</view>
        <weui-flex direction="column">
          <weui-flex-item>
            <view class="placeholder">A</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder">B</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <view class="demo-section">
        <view class="demo-section__title">主轴方向 direction="row-reverse"</view>
        <weui-flex direction="row-reverse">
          <weui-flex-item>
            <view class="placeholder">A</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder">B</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder">C</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <!-- 主轴对齐 -->
      <view class="demo-section">
        <view class="demo-section__title">主轴对齐 justify="center"</view>
        <weui-flex justify="center">
          <weui-flex-item>
            <view class="placeholder placeholder-narrow">居中</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <view class="demo-section">
        <view class="demo-section__title">主轴对齐 justify="between"</view>
        <weui-flex justify="between">
          <weui-flex-item>
            <view class="placeholder placeholder-narrow">A</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder placeholder-narrow">B</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder placeholder-narrow">C</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <view class="demo-section">
        <view class="demo-section__title">主轴对齐 justify="around"</view>
        <weui-flex justify="around">
          <weui-flex-item>
            <view class="placeholder placeholder-narrow">A</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder placeholder-narrow">B</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder placeholder-narrow">C</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <!-- 交叉轴对齐 -->
      <view class="demo-section">
        <view class="demo-section__title">交叉轴对齐 align="start"</view>
        <weui-flex align="start" class="flex-tall">
          <weui-flex-item>
            <view class="placeholder">A</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder">B</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <view class="demo-section">
        <view class="demo-section__title">交叉轴对齐 align="end"</view>
        <weui-flex align="end" class="flex-tall">
          <weui-flex-item>
            <view class="placeholder">A</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder">B</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <view class="demo-section">
        <view class="demo-section__title">交叉轴对齐 align="stretch"</view>
        <weui-flex align="stretch" class="flex-tall">
          <weui-flex-item>
            <view class="placeholder placeholder-stretch">A</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder placeholder-stretch">B</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <!-- 换行 -->
      <view class="demo-section">
        <view class="demo-section__title">换行 wrap="wrap"</view>
        <weui-flex wrap="wrap">
          <weui-flex-item v-for="i in 6" :key="i" class="wrap-item">
            <view class="placeholder">{{ i }}</view>
          </weui-flex-item>
        </weui-flex>
      </view>

      <!-- 扩展类名 -->
      <view class="demo-section">
        <view class="demo-section__title">扩展类名 extClass</view>
        <weui-flex ext-class="my-flex">
          <weui-flex-item ext-class="my-item">
            <view class="placeholder">自定义</view>
          </weui-flex-item>
          <weui-flex-item>
            <view class="placeholder">默认</view>
          </weui-flex-item>
        </weui-flex>
        <text class="demo-tips">my-flex 追加底部间距，my-item 追加背景色</text>
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
  name: 'PageFlex',
})
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
.placeholder {
  padding: 12px 8px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background-color: #10aeff;
  border-radius: 4px;
}
.placeholder-narrow {
  width: 64px;
}
.placeholder-stretch {
  height: 100%;
  box-sizing: border-box;
}
.flex-tall {
  height: 80px;
  background-color: #f7f7f7;
  border-radius: 4px;
}
.wrap-item {
  width: 40%;
  margin-bottom: 8px;
}
.my-flex {
  padding-bottom: 8px;
}
.my-item .placeholder {
  background-color: #1aad19;
}
</style>
