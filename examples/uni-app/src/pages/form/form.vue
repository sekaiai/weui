<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Form</text>
      <text class="page__desc">表单容器组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-form title="表单标题">
          <weui-cells form>
            <weui-cell label="姓名"><weui-input placeholder="请输入姓名" /></weui-cell>
            <weui-cell label="手机号"><weui-input type="number" placeholder="请输入手机号" /></weui-cell>
          </weui-cells>
        </weui-form>
      </view>

      <!-- 标题与描述 -->
      <view class="demo-section">
        <view class="demo-section__title">标题与描述</view>
        <weui-form title="表单标题" desc="表单描述文字">
          <weui-cells form><weui-cell>控件内容</weui-cell></weui-cells>
        </weui-form>
      </view>

      <!-- 提示文字 -->
      <view class="demo-section">
        <view class="demo-section__title">提示文字</view>
        <weui-form title="表单标题">
          <weui-cells form><weui-cell>控件内容</weui-cell></weui-cells>
          <template #tips>底部提示文字</template>
        </weui-form>
      </view>

      <!-- 操作按钮区域 -->
      <view class="demo-section">
        <view class="demo-section__title">操作按钮区域</view>
        <weui-form title="表单标题">
          <weui-cells form><weui-cell>控件内容</weui-cell></weui-cells>
          <template #opr>
            <view class="weui-btn-area">
              <weui-button type="primary" display="block">确定</weui-button>
              <weui-button display="block">取消</weui-button>
            </view>
          </template>
        </weui-form>
      </view>

      <!-- 自定义标题区域 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义标题区域</view>
        <weui-form>
          <template #title>自定义标题</template>
          <template #desc>通过 title 和 desc 插槽自定义内容</template>
          <weui-cells form><weui-cell>控件内容</weui-cell></weui-cells>
        </weui-form>
      </view>

      <!-- 自定义提示区域 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义提示区域</view>
        <weui-form title="表单标题">
          <weui-cells form><weui-cell>控件内容</weui-cell></weui-cells>
          <template #tips>
            通过 tips 插槽自定义提示内容
          </template>
        </weui-form>
      </view>

      <!-- 扩展类名 -->
      <view class="demo-section">
        <view class="demo-section__title">扩展类名</view>
        <weui-form title="表单标题" ext-class="custom-form">
          <weui-cells form><weui-cell>控件内容</weui-cell></weui-cells>
        </weui-form>
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
defineOptions({
  name: 'PageForm',
})
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
