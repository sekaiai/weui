<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Msg 结果页</span>
      <span class="page__desc">页面级结果反馈，支持图标、标题、描述与操作按钮</span>
    </div>

    <div class="page__bd">
      <div class="demo-section">
        <div class="demo-section__title">成功</div>
        <weui-msg
          type="success"
          title="操作成功"
          desc="内容详情描述，可根据实际需要安排。"
          :buttons="successButtons"
          tips="底部提示文字，可放补充说明。"
          @buttontap="onTap"
        />
      </div>

      <div class="demo-section">
        <div class="demo-section__title">等待 / 提示</div>
        <weui-msg
          type="waiting"
          title="等待处理"
          desc="请耐心等待，结果会通过消息通知您。"
          :buttons="waitingButtons"
          @buttontap="onTap"
        />
      </div>

      <div class="demo-section">
        <div class="demo-section__title">无图标自定义</div>
        <weui-msg title="自定义内容">
          <template #icon>
            <div class="custom-icon">🎉</div>
          </template>
          <p class="custom-desc">通过 icon 插槽自定义图标区域。</p>
        </weui-msg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MsgButton {
  text: string
  type?: 'default' | 'primary'
  url?: string
}

const successButtons: MsgButton[] = [
  { text: '辅助操作', type: 'default' },
  { text: '主操作', type: 'primary' },
]

const waitingButtons: MsgButton[] = [{ text: '查看详情', type: 'primary' }]

const onTap = (btn: MsgButton, index: number) => console.log('[Msg]', btn.text, index)
</script>

<style scoped>
.custom-icon {
  font-size: 48px;
  text-align: center;
}
.custom-desc {
  text-align: center;
  color: #888;
  font-size: 14px;
}
</style>
