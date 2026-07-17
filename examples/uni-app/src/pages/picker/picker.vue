<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Picker</text>
      <text class="page__desc">选择器组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法（单列） -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法（单列）</view>
        <weui-button type="default" @click="showBasic = true">显示 Picker</weui-button>
        <text v-if="basicResult" class="demo-result">已选：{{ basicResult }}</text>
        <weui-picker
          v-model:visible="showBasic"
          title="请选择"
          :columns="basicColumns"
          @confirm="onBasicConfirm"
        />
      </view>

      <!-- 多列选择 -->
      <view class="demo-section">
        <view class="demo-section__title">多列选择</view>
        <weui-button type="default" @click="showMulti = true">显示多列 Picker</weui-button>
        <text v-if="multiResult" class="demo-result">已选：{{ multiResult }}</text>
        <weui-picker
          v-model:visible="showMulti"
          title="请选择日期"
          :columns="multiColumns"
          @confirm="onMultiConfirm"
        />
      </view>

      <!-- 带初始选中 -->
      <view class="demo-section">
        <view class="demo-section__title">带初始选中（index=2）</view>
        <weui-button type="default" @click="showInitial = true">显示初始选中 Picker</weui-button>
        <weui-picker
          v-model:visible="showInitial"
          title="请选择"
          :columns="initialColumns"
          @confirm="onInitialConfirm"
        />
      </view>

      <!-- 自定义按钮文字 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义按钮文字</view>
        <weui-button type="default" @click="showCustom = true">显示自定义按钮 Picker</weui-button>
        <weui-picker
          v-model:visible="showCustom"
          title="请选择"
          cancel-text="关闭"
          confirm-text="完成"
          :columns="basicColumns"
          @confirm="onBasicConfirm"
        />
      </view>

      <!-- 禁用遮罩点击 -->
      <view class="demo-section">
        <view class="demo-section__title">禁用遮罩点击（mask-closable=false）</view>
        <weui-button type="default" @click="showNoMask = true">显示 Picker</weui-button>
        <weui-picker
          v-model:visible="showNoMask"
          title="点击遮罩不关闭"
          :mask-closable="false"
          :columns="basicColumns"
          @confirm="onBasicConfirm"
        />
      </view>

      <!-- 命令式调用 -->
      <view class="demo-section">
        <view class="demo-section__title">命令式调用</view>
        <weui-button type="default" @click="runImperative">Picker.show</weui-button>
        <text v-if="imperativeResult" class="demo-result">已选：{{ imperativeResult }}</text>
      </view>
    </view>

    <!-- 命令式弹层挂载点 -->
    <weui-overlay-host />
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
import { Picker } from 'weui-design-vue'
import type { PickerColumn } from 'weui-design-vue'

const showBasic = ref(false)
const showMulti = ref(false)
const showInitial = ref(false)
const showCustom = ref(false)
const showNoMask = ref(false)

const basicResult = ref('')
const multiResult = ref('')
const imperativeResult = ref('')

const basicColumns: PickerColumn[] = [
  {
    options: [
      { label: '选项一', value: 'a' },
      { label: '选项二', value: 'b' },
      { label: '选项三', value: 'c' },
      { label: '选项四', value: 'd' },
      { label: '选项五', value: 'e' },
    ],
  },
]

const multiColumns: PickerColumn[] = [
  {
    options: [
      { label: '2024 年', value: 2024 },
      { label: '2025 年', value: 2025 },
      { label: '2026 年', value: 2026 },
    ],
  },
  {
    options: [
      { label: '1 月', value: 1 },
      { label: '2 月', value: 2 },
      { label: '3 月', value: 3 },
      { label: '4 月', value: 4 },
      { label: '5 月', value: 5 },
      { label: '6 月', value: 6 },
    ],
  },
  {
    options: [
      { label: '1 日', value: 1 },
      { label: '2 日', value: 2 },
      { label: '3 日', value: 3 },
      { label: '15 日', value: 15 },
      { label: '28 日', value: 28 },
    ],
  },
]

const initialColumns: PickerColumn[] = [
  {
    options: [
      { label: '选项一', value: 'a' },
      { label: '选项二', value: 'b' },
      { label: '选项三', value: 'c' },
      { label: '选项四', value: 'd' },
    ],
    index: 2,
  },
]

const onBasicConfirm = (indexes: number[], values: (string | number)[]) => {
  basicResult.value = `索引 ${indexes.join(',')} 值 ${values.join(',')}`
}

const onMultiConfirm = (indexes: number[], values: (string | number)[]) => {
  multiResult.value = `${values[0]}-${values[1]}-${values[2]}`
}

const onInitialConfirm = (indexes: number[], values: (string | number)[]) => {
  basicResult.value = `索引 ${indexes.join(',')} 值 ${values.join(',')}`
}

const runImperative = async () => {
  const result = await Picker.show({
    title: '命令式选择',
    columns: basicColumns,
  })
  if (result.action === 'confirm') {
    imperativeResult.value = `索引 ${result.indexes.join(',')} 值 ${result.values.join(',')}`
  } else {
    imperativeResult.value = '已取消'
  }
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
.demo-result {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #07c160;
}
</style>
