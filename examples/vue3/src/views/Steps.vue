<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Steps 步骤条</span>
      <span class="page__desc">横向 / 纵向步骤条，current 控制已完成步骤</span>
    </div>

    <div class="page__bd">
      <!-- 横向 -->
      <div class="demo-section">
        <div class="demo-section__title">横向步骤条</div>
        <weui-steps :steps="horizontalSteps" :current="current" />
        <div class="demo-inline" style="margin-top: 16px">
          <weui-button type="default" size="mini" @click="current = Math.max(0, current - 1)">上一步</weui-button>
          <weui-button type="primary" size="mini" @click="current = Math.min(horizontalSteps.length, current + 1)">下一步</weui-button>
        </div>
      </div>

      <!-- 纵向 -->
      <div class="demo-section">
        <div class="demo-section__title">纵向步骤条</div>
        <weui-steps :steps="verticalSteps" :current="2" direction="vertical" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface StepItem {
  title: string
  desc?: string
}

const horizontalSteps: StepItem[] = [
  { title: '填写资料', desc: '第一步' },
  { title: '确认信息', desc: '第二步' },
  { title: '完成', desc: '第三步' },
]

const verticalSteps: StepItem[] = [
  { title: '提交申请', desc: '2024-01-01 10:00' },
  { title: '审核中', desc: '2024-01-02 14:30' },
  { title: '已通过', desc: '2024-01-03 09:15' },
  { title: '已发货', desc: '等待物流更新' },
]

const current = ref(1)
</script>
