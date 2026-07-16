<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Steps</text>
      <text class="page__desc">步骤条组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-section__title">基础用法</view>
        <weui-steps
          :steps="[
            { title: '步骤一', desc: '描述一' },
            { title: '步骤二', desc: '描述二' },
            { title: '步骤三', desc: '描述三' },
          ]"
          :current="1"
        />
      </view>

      <!-- 步骤状态 -->
      <view class="demo-section">
        <view class="demo-section__title">步骤状态</view>
        <weui-steps
          :steps="[
            { title: '已完成', desc: '已结束' },
            { title: '进行中', desc: '当前步骤' },
            { title: '未开始', desc: '待处理' },
          ]"
          :current="1"
        />
        <text class="demo-tips">index 小于 current 为已完成，等于为进行中，大于为未开始</text>
      </view>

      <!-- 不同 current -->
      <view class="demo-section">
        <view class="demo-section__title">不同 current</view>
        <view class="demo-stack">
          <weui-steps
            :steps="[
              { title: '第一步' },
              { title: '第二步' },
              { title: '第三步' },
            ]"
            :current="0"
          />
          <weui-steps
            :steps="[
              { title: '第一步' },
              { title: '第二步' },
              { title: '第三步' },
            ]"
            :current="1"
          />
          <weui-steps
            :steps="[
              { title: '第一步' },
              { title: '第二步' },
              { title: '第三步' },
            ]"
            :current="2"
          />
        </view>
      </view>

      <!-- 垂直方向 -->
      <view class="demo-section">
        <view class="demo-section__title">垂直方向</view>
        <weui-steps
          :steps="[
            { title: '步骤一', desc: '描述一' },
            { title: '步骤二', desc: '描述二' },
            { title: '步骤三', desc: '描述三' },
          ]"
          :current="1"
          direction="vertical"
        />
      </view>

      <!-- 仅标题 -->
      <view class="demo-section">
        <view class="demo-section__title">仅标题（不传 desc）</view>
        <weui-steps
          :steps="[
            { title: '第一步' },
            { title: '第二步' },
            { title: '第三步' },
          ]"
          :current="0"
        />
      </view>

      <!-- 扩展类名 -->
      <view class="demo-section">
        <view class="demo-section__title">扩展类名</view>
        <weui-steps
          :steps="[
            { title: '步骤一' },
            { title: '步骤二' },
          ]"
          :current="0"
          ext-class="my-steps"
        />
        <text class="demo-tips">通过 extClass 追加自定义类名</text>
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
  name: 'PageSteps',
})
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
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.demo-tips {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #b2b2b2;
}
</style>
