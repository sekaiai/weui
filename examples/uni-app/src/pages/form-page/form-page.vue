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
        <weui-form title="页面标题">
          <view class="weui-cells weui-cells_form">
            <view class="weui-cell">
              <view class="weui-cell__hd">
                <label class="weui-label">姓名</label>
              </view>
              <view class="weui-cell__bd">
                <input class="weui-input" placeholder="请输入姓名" />
              </view>
            </view>
            <view class="weui-cell">
              <view class="weui-cell__hd">
                <label class="weui-label">手机号</label>
              </view>
              <view class="weui-cell__bd">
                <input class="weui-input" placeholder="请输入手机号" />
              </view>
            </view>
          </view>
        </weui-form>
      </view>

      <!-- 标题与描述 -->
      <view class="demo-section">
        <view class="demo-section__title">标题与描述</view>
        <weui-form title="页面标题" desc="页面描述文字">
          <view class="weui-cells weui-cells_form">
            <view class="weui-cell">
              <view class="weui-cell__bd">表单内容</view>
            </view>
          </view>
        </weui-form>
      </view>

      <!-- 底部操作区域 -->
      <view class="demo-section">
        <view class="demo-section__title">底部操作区域</view>
        <weui-form title="页面标题">
          <view class="weui-cells weui-cells_form">
            <view class="weui-cell">
              <view class="weui-cell__bd">表单内容</view>
            </view>
          </view>
          <template #footer>
            <view class="weui-btn-area">
              <button class="weui-btn weui-btn_primary">确定</button>
              <button class="weui-btn weui-btn_default">取消</button>
            </view>
          </template>
        </weui-form>
      </view>

      <!-- 自定义标题区域 -->
      <view class="demo-section">
        <view class="demo-section__title">自定义标题区域</view>
        <weui-form>
          <template #title>
            <view class="weui-form__title">自定义标题</view>
            <view class="weui-form__desc">通过 title 插槽自定义整段标题区域</view>
          </template>
          <view class="weui-cells weui-cells_form">
            <view class="weui-cell">
              <view class="weui-cell__bd">表单内容</view>
            </view>
          </view>
        </weui-form>
      </view>

      <!-- 扩展类名 -->
      <view class="demo-section">
        <view class="demo-section__title">扩展类名</view>
        <weui-form title="页面标题" ext-class="custom-page">
          <view class="weui-cells weui-cells_form">
            <view class="weui-cell">
              <view class="weui-cell__bd">表单内容</view>
            </view>
          </view>
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
  name: 'PageFormPage',
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
