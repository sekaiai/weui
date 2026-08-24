<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Actionsheet</text>
      <text class="page__desc">操作菜单组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-button type="default" @click="showBasic = true">弹出 Actionsheet</weui-button>
        <weui-actionsheet
          v-model:visible="showBasic"
          :items="basicItems"
          @select="onSelect"
          @cancel="onCancel"
        />
      </view>

      <!-- 带标题 -->
      <view class="demo-section">
        <view class="demo-section__title">带标题</view>
        <weui-button type="default" @click="showWithTitle = true">带标题的 Actionsheet</weui-button>
        <weui-actionsheet
          v-model:visible="showWithTitle"
          title="选择您要进行的操作"
          :items="basicItems"
          @select="onSelect"
        />
      </view>

      <!-- 警告操作 -->
      <view class="demo-section">
        <view class="demo-section__title">警告操作</view>
        <weui-button type="default" @click="showWarn = true">含警告项的 Actionsheet</weui-button>
        <weui-actionsheet
          v-model:visible="showWarn"
          :items="warnItems"
          @select="onSelect"
        />
      </view>

      <!-- 带提示文字 -->
      <view class="demo-section">
        <view class="demo-section__title">带提示文字</view>
        <weui-button type="default" @click="showTips = true">含提示文字的 Actionsheet</weui-button>
        <weui-actionsheet
          v-model:visible="showTips"
          :items="tipsItems"
          @select="onSelect"
        />
      </view>

      <!-- 禁止遮罩关闭 -->
      <view class="demo-section">
        <view class="demo-section__title">禁止遮罩关闭</view>
        <weui-button type="default" @click="showNoMaskClose = true">必须选择或取消</weui-button>
        <weui-actionsheet
          v-model:visible="showNoMaskClose"
          :items="basicItems"
          :mask-closable="false"
          @select="onSelect"
        />
      </view>

      <!-- 自定义取消文字 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义取消文字</view>
        <weui-button type="default" @click="showCustomCancel = true">自定义取消文字</weui-button>
        <weui-actionsheet
          v-model:visible="showCustomCancel"
          :items="basicItems"
          cancel-text="不了，谢谢"
          @select="onSelect"
          @cancel="onCancel"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ActionsheetItem } from 'weui-uniapp-design'

defineOptions({
  name: 'PageActionsheet',
})

const showBasic = ref(false)
const showWithTitle = ref(false)
const showWarn = ref(false)
const showTips = ref(false)
const showNoMaskClose = ref(false)
const showCustomCancel = ref(false)

const basicItems: ActionsheetItem[] = [
  { label: '示例菜单' },
  { label: '示例菜单' },
  { label: '示例菜单' },
]

const warnItems: ActionsheetItem[] = [
  { label: '示例菜单' },
  { label: '示例菜单' },
  { label: '删除', warn: true },
]

const tipsItems: ActionsheetItem[] = [
  { label: '示例菜单', tips: '提示文字' },
  { label: '示例菜单', tips: '提示文字' },
  { label: '示例菜单', tips: '提示文字' },
]

const onSelect = (item: ActionsheetItem, index: number) => {
  console.log('select', item, index)
  uni.showToast({ title: `选择了第 ${index + 1} 项`, icon: 'none' })
}

const onCancel = () => {
  console.log('cancel')
  uni.showToast({ title: '已取消', icon: 'none' })
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
.demo-section .weui-btn {
  margin-bottom: 12px;
}
</style>
