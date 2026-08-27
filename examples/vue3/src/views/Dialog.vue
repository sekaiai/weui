<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Dialog 对话框</span>
      <span class="page__desc">命令式调用：Dialog.alert / confirm / show()</span>
    </div>

    <div class="page__bd">
      <div class="demo-section">
        <div class="demo-section__title">Alert 提示</div>
        <weui-button type="default" display="block" @click="openAlert">Alert</weui-button>
      </div>

      <div class="demo-section">
        <div class="demo-section__title">Confirm 确认</div>
        <weui-button type="default" display="block" @click="openConfirm">Confirm</weui-button>
      </div>

      <div class="demo-section">
        <div class="demo-section__title">自定义按钮（show）</div>
        <weui-button type="default" display="block" @click="openCustom">自定义按钮</weui-button>
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
import { Dialog } from 'weui-uniapp-design'

const result = ref('')

const openAlert = async () => {
  await Dialog.alert({ title: '提示', content: '这是一个提示对话框。' })
  result.value = 'Alert 已关闭'
}

const openConfirm = async () => {
  const ok = await Dialog.confirm({ title: '确认删除', content: '删除后无法恢复，确定要删除吗？' })
  result.value = ok ? '用户点击了确定' : '用户点击了取消或遮罩'
}

const openCustom = async () => {
  const res = await Dialog.show({
    title: '自定义',
    content: '带自定义按钮的对话框。',
    buttons: [
      { label: '取消' },
      { label: '次要' },
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
