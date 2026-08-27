<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Actionsheet 操作菜单</span>
      <span class="page__desc">命令式调用：Actionsheet.show()，需已挂载 &lt;WeuiOverlayHost /&gt;</span>
    </div>

    <div class="page__bd">
      <div class="demo-section">
        <div class="demo-section__title">基础用法</div>
        <weui-button type="primary" display="block" @click="openBasic">弹出操作菜单</weui-button>
      </div>

      <div class="demo-section">
        <div class="demo-section__title">带标题与警告项</div>
        <weui-button type="default" display="block" @click="openWithWarn">带标题 / 警告样式</weui-button>
      </div>

      <div class="demo-section" v-if="result">
        <div class="demo-section__title">选择结果</div>
        <div class="result-text">{{ result }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Actionsheet } from 'weui-uniapp-design'

interface ActionsheetItem {
  label: string
  tips?: string
  warn?: boolean
}

const result = ref('')

const openBasic = async () => {
  const res = await Actionsheet.show({
    items: [
      { label: '拍照' },
      { label: '从手机相册选择' },
      { label: '保存图片' },
    ],
  })
  result.value = res.item ? `选中：${res.item.label}（索引 ${res.index}）` : '已取消'
}

const openWithWarn = async () => {
  const items: ActionsheetItem[] = [
    { label: '转发给朋友' },
    { label: '分享到朋友圈' },
    { label: '删除', warn: true },
  ]
  const res = await Actionsheet.show({ title: '请选择操作', items, cancelText: '取消' })
  result.value = res.item ? `选中：${res.item.label}` : '已取消'
}
</script>

<style scoped>
.result-text {
  font-size: 14px;
  color: #576b95;
}
</style>
