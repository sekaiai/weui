<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">HalfScreenDialog 半屏弹窗</span>
      <span class="page__desc">命令式调用与 cells 列表内容示例</span>
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

      <div class="demo-section">
        <div class="demo-section__title">在半屏弹窗中使用 Cells</div>
        <weui-button type="default" display="block" @click="cellsDialogVisible = true">选择收货地址</weui-button>
      </div>

      <div class="demo-section" v-if="result">
        <div class="demo-section__title">结果</div>
        <div class="result-text">{{ result }}</div>
      </div>
    </div>

    <weui-half-screen-dialog
      v-model:visible="cellsDialogVisible"
      title="选择收货地址"
      subtitle="从地址列表中选择一个"
      :buttons="[{ label: '管理地址', type: 'default' }]"
      @buttontap="result = '点击了管理地址'"
    >
      <weui-cells title="我的地址" tips="选择地址后可继续确认订单">
        <weui-cell
          v-for="address in addresses"
          :key="address.name"
          :title="address.name"
          :desc="address.detail"
          :value="selectedAddress === address.name ? '已选择' : ''"
          access
          @click="selectAddress(address.name)"
        />
      </weui-cells>
    </weui-half-screen-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HalfScreenDialog } from 'weui-uniapp-design'

const result = ref('')
const cellsDialogVisible = ref(false)
const selectedAddress = ref('')

const addresses = [
  { name: '张三', detail: '北京市朝阳区建国路 88 号' },
  { name: '李女士', detail: '上海市浦东新区世纪大道 100 号' },
  { name: '王先生', detail: '杭州市西湖区文三路 50 号' },
]

const selectAddress = (name: string) => {
  selectedAddress.value = name
  result.value = `已选择收货地址：${name}`
  cellsDialogVisible.value = false
}

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
