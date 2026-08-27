<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">HalfScreenDialog 半屏弹窗</span>
      <span class="page__desc">命令式调用：HalfScreenDialog.show()</span>
    </div>

    <div class="page__bd">
      <div class="demo-section">
        <div class="demo-section__title">基础用法</div>
        <weui-button type="primary" display="block" @click="openBasic">弹出半屏弹窗</weui-button>
      </div>

      <div class="demo-section">
        <div class="demo-section__title">带副标题与多按钮</div>
        <weui-button type="default" display="block" @click="openRich">副标题 / 多按钮</weui-button>
      </div>

      <div class="demo-section" v-if="result">
        <div class="demo-section__title">结果</div>
        <div class="result-text">{{ result }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HalfScreenDialog } from 'weui-uniapp-design'

const result = ref('')

const openBasic = async () => {
  const res = await HalfScreenDialog.show({
    title: '标题',
    content: '这是半屏弹窗的内容区域，可用于展示更多操作或详情。点击遮罩或按钮可关闭。',
  })
  result.value = res.button ? `点击了「${res.button.label}」` : '遮罩关闭'
}

const openRich = async () => {
  const res = await HalfScreenDialog.show({
    title: '选择联系人',
    subtitle: '从以下列表中挑选',
    content: '半屏弹窗适合承载中等长度的内容，方便在页面内完成选择而无需跳转。',
    buttons: [
      { label: '取消', type: 'default' },
      { label: '确定', type: 'primary' },
    ],
  })
  result.value = res.button ? `点击了「${res.button.label}」（索引 ${res.index}）` : '遮罩关闭'
}
</script>

<style scoped>
.result-text {
  font-size: 14px;
  color: #576b95;
}
</style>
