<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Checkbox</text>
      <text class="page__desc">复选框组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 多选模式 -->
      <weui-checkbox-group v-model="multiValues" title="复选列表">
        <weui-checkbox value="1" label="标准选项一" />
        <weui-checkbox value="2" label="标准选项二" />
        <weui-checkbox value="3" label="标准选项三" />
      </weui-checkbox-group>

      <!-- 单选列表 -->
      <weui-radio-group v-model="radioValue" title="单选列表">
        <weui-radio value="1" label="单选选项一" />
        <weui-radio value="2" label="单选选项二" />
        <weui-radio value="3" label="单选选项三" />
      </weui-radio-group>

      <!-- 表单型分组 -->
      <weui-checkbox-group v-model="formValues" form title="表单型复选">
        <weui-checkbox value="agree" label="同意服务条款" />
        <weui-checkbox value="push" label="接收推送通知" />
      </weui-checkbox-group>

      <!-- 禁用状态 -->
      <weui-checkbox-group v-model="disabledValues" title="禁用示例">
        <weui-checkbox value="1" label="正常选项" />
        <weui-checkbox value="2" label="禁用选项" disabled />
        <weui-checkbox value="3" label="禁用选项" disabled />
      </weui-checkbox-group>

      <!-- 全部禁用 -->
      <weui-checkbox-group v-model="allDisabledValues" title="全部禁用" disabled>
        <weui-checkbox value="1" label="选项一" />
        <weui-checkbox value="2" label="选项二" />
      </weui-checkbox-group>

      <!-- 自定义内容 -->
      <weui-checkbox-group v-model="customValues" title="自定义内容">
        <weui-checkbox value="1">
          <view>标题文字</view>
          <view class="weui-cell__desc">副标题描述</view>
        </weui-checkbox>
        <weui-checkbox value="2">
          <view>标题文字</view>
          <view class="weui-cell__desc">副标题描述</view>
        </weui-checkbox>
      </weui-checkbox-group>

      <!-- 分组底部说明 -->
      <weui-checkbox-group v-model="footerValues" title="带底部说明" footer="底部说明文字">
        <weui-checkbox value="1" label="选项一" />
        <weui-checkbox value="2" label="选项二" />
      </weui-checkbox-group>

      <!-- 当前选中值 -->
      <view class="result-section">
        <view class="result-section__title">当前选中值</view>
        <text class="result-text">多选：{{ multiValues.join(', ') }}</text>
        <text class="result-text">单选：{{ radioValue }}</text>
        <text class="result-text">表单：{{ formValues.join(', ') }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'PageCheckbox',
})

const multiValues = ref<string[]>(['1'])
const radioValue = ref('1')
const formValues = ref<string[]>([])
const disabledValues = ref<string[]>(['1'])
const allDisabledValues = ref<string[]>(['1', '2'])
const customValues = ref<string[]>([])
const footerValues = ref<string[]>([])
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
