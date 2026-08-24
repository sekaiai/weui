<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Uploader</text>
      <text class="page__desc">上传组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-uploader
          title="图片上传"
          :files="basicFiles"
          :count="9"
          @select="onBasicSelect"
          @preview="onPreview"
          @delete="(file, index) => onDelete('basic', file, index)"
        />
      </view>

      <!-- 上传状态 -->
      <view class="demo-section">
        <view class="demo-section__title">上传状态</view>
        <weui-uploader title="带状态的上传" :files="statusFiles" />
      </view>

      <!-- 隐藏头部 -->
      <view class="demo-section">
        <view class="demo-section__title">隐藏头部</view>
        <weui-uploader :show-header="false" :files="basicFiles" />
      </view>

      <!-- 提示文字 -->
      <view class="demo-section">
        <view class="demo-section__title">提示文字</view>
        <weui-uploader
          title="图片上传"
          tips="最多上传9张图片，单张不超过2MB"
          :files="basicFiles"
        />
      </view>

      <!-- 限制数量 -->
      <view class="demo-section">
        <view class="demo-section__title">限制数量（最多2张）</view>
        <weui-uploader
          title="最多2张"
          :files="limitFiles"
          :count="2"
          @select="onLimitSelect"
          @exceed="onExceed"
          @delete="(file, index) => onDelete('limit', file, index)"
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
import { ref } from 'vue'
import type { UploaderFile } from 'weui-uniapp-design'

const basicFiles = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
  { url: 'https://weui.io/images/pic_160.png' },
])

const statusFiles = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png', status: 'success' },
  { url: 'https://weui.io/images/pic_160.png', status: 'loading', statusText: '50%' },
  { url: 'https://weui.io/images/pic_160.png', status: 'error' },
])

const limitFiles = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
])

const onBasicSelect = () => {
  uni.chooseImage({
    count: 9 - basicFiles.value.length,
    success: (res) => {
      const newFiles = res.tempFilePaths.map((path) => ({ url: path }))
      basicFiles.value = [...basicFiles.value, ...newFiles]
    },
  })
}

const onLimitSelect = () => {
  uni.chooseImage({
    count: 2 - limitFiles.value.length,
    success: (res) => {
      const newFiles = res.tempFilePaths.map((path) => ({ url: path }))
      limitFiles.value = [...limitFiles.value, ...newFiles]
    },
  })
}

const onPreview = (file: UploaderFile) => {
  uni.previewImage({
    urls: basicFiles.value.map((f) => f.url),
    current: file.url,
  })
}

const onDelete = (type: 'basic' | 'limit', _file: UploaderFile, index: number) => {
  uni.showModal({
    title: '提示',
    content: '确定删除该图片？',
    success: (res) => {
      if (res.confirm) {
        if (type === 'basic') {
          basicFiles.value.splice(index, 1)
        } else {
          limitFiles.value.splice(index, 1)
        }
        uni.showToast({ title: '已删除', icon: 'none' })
      }
    },
  })
}

const onExceed = (count: number) => {
  uni.showToast({ title: `最多上传${count}张`, icon: 'none' })
}
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
