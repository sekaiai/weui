<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Navbar</text>
      <text class="page__desc">顶部选项卡组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="section">
        <text class="section__title">基础用法</text>
        <weui-navbar>
          <weui-navbar-item
            :active="basicActive === 0"
            @click="basicActive = 0"
          >选项一</weui-navbar-item>
          <weui-navbar-item
            :active="basicActive === 1"
            @click="basicActive = 1"
          >选项二</weui-navbar-item>
          <weui-navbar-item
            :active="basicActive === 2"
            @click="basicActive = 2"
          >选项三</weui-navbar-item>
        </weui-navbar>
        <view class="section__panel">当前选中：选项{{ basicActive + 1 }}</view>
      </view>

      <!-- 默认选中第二项 -->
      <view class="section">
        <text class="section__title">默认选中第二项</text>
        <weui-navbar>
          <weui-navbar-item>tab1</weui-navbar-item>
          <weui-navbar-item active>tab2</weui-navbar-item>
          <weui-navbar-item>tab3</weui-navbar-item>
        </weui-navbar>
      </view>

      <!-- 两个选项 -->
      <view class="section">
        <text class="section__title">两个选项</text>
        <weui-navbar>
          <weui-navbar-item
            :active="twoActive === 0"
            @click="twoActive = 0"
          >推荐</weui-navbar-item>
          <weui-navbar-item
            :active="twoActive === 1"
            @click="twoActive = 1"
          >热门</weui-navbar-item>
        </weui-navbar>
        <view class="section__panel">{{ twoActive === 0 ? '推荐内容' : '热门内容' }}</view>
      </view>

      <!-- 扩展类名 -->
      <view class="section">
        <text class="section__title">扩展类名</text>
        <weui-navbar ext-class="my-navbar">
          <weui-navbar-item
            :active="extActive === 0"
            ext-class="my-item"
            @click="extActive = 0"
          >自定义A</weui-navbar-item>
          <weui-navbar-item
            :active="extActive === 1"
            ext-class="my-item"
            @click="extActive = 1"
          >自定义B</weui-navbar-item>
        </weui-navbar>
      </view>

      <!-- 点击事件回调 -->
      <view class="section">
        <text class="section__title">点击事件</text>
        <weui-navbar>
          <weui-navbar-item
            :active="evtActive === 0"
            @click="onTab(0)"
          >tab1</weui-navbar-item>
          <weui-navbar-item
            :active="evtActive === 1"
            @click="onTab(1)"
          >tab2</weui-navbar-item>
          <weui-navbar-item
            :active="evtActive === 2"
            @click="onTab(2)"
          >tab3</weui-navbar-item>
        </weui-navbar>
        <view class="section__panel">点击次数：{{ clickCount }}</view>
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
import { ref } from 'vue'

const basicActive = ref(0)
const twoActive = ref(0)
const extActive = ref(0)
const evtActive = ref(0)
const clickCount = ref(0)

const onTab = (i: number) => {
  evtActive.value = i
  clickCount.value += 1
  uni.showToast({ title: `tab${i + 1}`, icon: 'none' })
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
.section {
  margin-bottom: 24px;
}
.section__title {
  display: block;
  padding: 0 16px 8px;
  font-size: 14px;
  color: #888;
}
.section__panel {
  padding: 16px;
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
