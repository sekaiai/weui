<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Picker 选择器</span>
      <span class="page__desc">命令式调用：Picker.show({ columns })</span>
    </div>

    <div class="page__bd">
      <div class="demo-section">
        <div class="demo-section__title">单列选择</div>
        <weui-button type="default" display="block" @click="openSingle">选择城市</weui-button>
      </div>

      <div class="demo-section">
        <div class="demo-section__title">多列联动</div>
        <weui-button type="default" display="block" @click="openMulti">日期选择</weui-button>
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
import { Picker } from 'weui-uniapp-design'

interface PickerOption {
  label: string
  value: string | number
  disabled?: boolean
}
interface PickerColumn {
  options: PickerOption[]
  index?: number
}

const result = ref('')

const openSingle = async () => {
  const columns: PickerColumn[] = [
    {
      options: [
        { label: '北京', value: 'bj' },
        { label: '上海', value: 'sh' },
        { label: '广州', value: 'gz' },
        { label: '深圳', value: 'sz' },
      ],
      index: 0,
    },
  ]
  const res = await Picker.show({ title: '选择城市', columns })
  if (res.action === 'confirm') {
    result.value = `选中：${res.values.join('')}（索引 ${res.indexes[0]}）`
  } else {
    result.value = '已取消'
  }
}

const openMulti = async () => {
  const years = Array.from({ length: 5 }, (_, i) => ({ label: `${2024 + i} 年`, value: 2024 + i }))
  const months = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1} 月`, value: i + 1 }))
  const columns: PickerColumn[] = [
    { options: years, index: 0 },
    { options: months, index: 0 },
  ]
  const res = await Picker.show({ title: '选择日期', columns })
  if (res.action === 'confirm') {
    result.value = `选中：${res.values.join(' ')}`
  } else {
    result.value = '已取消'
  }
}
</script>

<style scoped>
.result-text {
  font-size: 14px;
  color: #576b95;
}
</style>
