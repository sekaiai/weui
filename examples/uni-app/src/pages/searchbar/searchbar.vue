<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Searchbar</text>
      <text class="page__desc">搜索栏组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="section">
        <text class="section__title">基础用法</text>
        <weui-searchbar
          v-model="basic"
          placeholder="搜索"
          @search="onSearch"
          @cancel="onCancel"
        />
      </view>

      <!-- 自动聚焦 -->
      <view class="section">
        <text class="section__title">自动聚焦</text>
        <weui-searchbar v-model="autoFocus" focus placeholder="自动聚焦" />
      </view>

      <!-- 自定义取消按钮 -->
      <view class="section">
        <text class="section__title">自定义取消按钮</text>
        <weui-searchbar
          v-model="customCancel"
          cancel-text="返回"
          placeholder="点击返回取消"
        />
      </view>

      <!-- 搜索按钮 -->
      <view class="section">
        <text class="section__title">搜索按钮</text>
        <weui-searchbar
          v-model="withButton"
          search-button-text="搜索"
          placeholder="输入后点击搜索"
          @search="onSearch"
        />
      </view>

      <!-- 自定义占位文字 -->
      <view class="section">
        <text class="section__title">自定义占位文字</text>
        <weui-searchbar v-model="customPlaceholder" placeholder="请输入商品名称" />
      </view>

      <!-- 扩展类名 -->
      <view class="section">
        <text class="section__title">扩展类名</text>
        <weui-searchbar
          v-model="extClass"
          ext-class="my-searchbar"
          placeholder="自定义样式"
        />
      </view>

      <!-- 当前值 -->
      <view class="result-section">
        <view class="result-section__title">当前值</view>
        <text class="result-text">基础：{{ basic }}</text>
        <text class="result-text">聚焦：{{ autoFocus }}</text>
        <text class="result-text">搜索按钮：{{ withButton }}</text>
        <text class="result-text">搜索次数：{{ searchCount }}</text>
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

defineOptions({
  name: 'PageSearchbar',
})

const basic = ref('')
const autoFocus = ref('')
const customCancel = ref('')
const withButton = ref('')
const customPlaceholder = ref('')
const extClass = ref('')
const searchCount = ref(0)

const onSearch = (val: string) => {
  searchCount.value += 1
  uni.showToast({ title: `搜索：${val}`, icon: 'none' })
}

const onCancel = () => {
  uni.showToast({ title: '已取消', icon: 'none' })
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
.result-section {
  padding: 16px;
  margin-top: 16px;
}
.result-section__title {
  margin-bottom: 8px;
  font-size: 14px;
  color: #888;
}
.result-text {
  display: block;
  margin-top: 4px;
  font-size: 14px;
  color: #576b95;
}
</style>
