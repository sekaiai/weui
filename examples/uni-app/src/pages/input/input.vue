<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Input</text>
      <text class="page__desc">输入框组件验证页</text>
    </view>

    <view class="page__bd">
      <weui-cells title="基础用法" form>
        <weui-cell active label="文本">
          <weui-input v-model="text" placeholder="请输入文本" />
        </weui-cell>
      </weui-cells>

      <weui-cells title="输入类型" form>
        <weui-cell active label="数字">
          <weui-input v-model="number" type="number" placeholder="请输入数字" />
        </weui-cell>
        <weui-cell active label="身份证">
          <weui-input v-model="idcard" type="idcard" placeholder="请输入身份证号" />
        </weui-cell>
        <weui-cell active label="小数">
          <weui-input v-model="digit" type="digit" placeholder="请输入数字（带小数）" />
        </weui-cell>
        <weui-cell active label="密码">
          <weui-input v-model="password" type="password" placeholder="请输入密码" />
        </weui-cell>
      </weui-cells>

      <weui-cells title="最大长度（最多 5 字）" form>
        <weui-cell active>
          <weui-input v-model="limited" :maxlength="5" placeholder="最多输入 5 个字" />
        </weui-cell>
      </weui-cells>

      <weui-cells title="清除按钮" form>
        <weui-cell active label="可清除">
          <weui-input v-model="clearable" clearable placeholder="输入后点击右侧清除" />
        </weui-cell>
      </weui-cells>

      <weui-cells title="禁用状态" form>
        <weui-cell active label="禁用">
          <weui-input v-model="disabled" disabled placeholder="不可编辑" />
        </weui-cell>
      </weui-cells>

      <weui-cells title="小程序官方能力" form>
        <weui-cell label="确认键">
          <weui-input v-model="confirmValue" confirm-type="search" placeholder="点击搜索键" @confirm="onConfirm" />
        </weui-cell>
        <weui-cell label="昵称">
          <weui-input v-model="nickname" type="nickname" placeholder="昵称输入键盘" @nicknamereview="onNicknameReview" />
        </weui-cell>
        <weui-cell label="键盘布局">
          <weui-input cursor-spacing="16" confirm-hold hold-keyboard :adjust-position="false" placeholder="小程序属性透传" @keyboardheightchange="onKeyboardHeightChange" />
        </weui-cell>
      </weui-cells>

      <!-- 当前值 -->
      <view class="result-section">
        <view class="result-section__title">当前值</view>
        <text class="result-text">文本：{{ text }}</text>
        <text class="result-text">数字：{{ number }}</text>
        <text class="result-text">密码：{{ password }}</text>
        <text class="result-text">限长：{{ limited }}</text>
        <text class="result-text">可清：{{ clearable }}</text>
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
  name: 'PageInput',
})

const text = ref('')
const number = ref('')
const idcard = ref('')
const digit = ref('')
const password = ref('')
const limited = ref('')
const clearable = ref('')
const disabled = ref('不可编辑的内容')
const confirmValue = ref('')
const nickname = ref('')

const onConfirm = () => uni.showToast({ title: 'confirm 已触发', icon: 'none' })
const onNicknameReview = () => uni.showToast({ title: '昵称审核完成', icon: 'none' })
const onKeyboardHeightChange = () => uni.showToast({ title: '键盘高度变化', icon: 'none' })
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
