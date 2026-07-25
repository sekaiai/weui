<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Cell</text>
      <text class="page__desc">列表项组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <weui-cell-group title="带说明的列表项">
        <weui-cell title="标题文字" footer="说明文字" />
        <weui-cell title="标题文字" footer="说明文字" />
      </weui-cell-group>

      <!-- 带图标 -->
      <weui-cell-group title="带图标的列表项">
        <weui-cell icon="/static/pic_160.png" title="标题文字" footer="说明文字" />
        <weui-cell icon="/static/pic_160.png" title="标题文字" footer="说明文字" />
      </weui-cell-group>

      <!-- 链接型 -->
      <weui-cell-group title="带跳转的列表项">
        <weui-cell title="cell standard" link="/pages/index/index" />
        <weui-cell title="cell standard" link="/pages/index/index" />
        <weui-cell title="cell standard" link @click="onCellClick" />
      </weui-cell-group>

      <!-- 带副标题 -->
      <weui-cell-group title="带副标题的列表项">
        <weui-cell link title="标题文字" subtitle="副标题" />
        <weui-cell link title="标题文字" subtitle="副标题" />
      </weui-cell-group>

      <!-- 上下布局 + 表单型 -->
      <weui-cell-group form title="表单型分组（上下布局）">
        <weui-cell :inline="false" label="留言">
          <textarea class="weui-textarea" placeholder="请输入留言" />
        </weui-cell>
        <weui-cell :inline="false" label="备注">
          <input class="weui-input" placeholder="请输入备注" />
        </weui-cell>
      </weui-cell-group>

      <!-- 分组底部说明 -->
      <weui-cell-group title="带底部说明的列表" footer="底部说明文字">
        <weui-cell title="标题文字" footer="说明文字" />
        <weui-cell title="标题文字" footer="说明文字" />
      </weui-cell-group>

      <!-- 变体示例 -->
      <weui-cell-group title="视觉变体">
        <weui-cell warn title="警告项">
          <template #footer>
            <text style="color: #e64340;">请输入正确的卡号</text>
          </template>
        </weui-cell>
        <weui-switch label="通知开关" :model-value="true" />
        <weui-cell vcode label="验证码">
          <input class="weui-input" placeholder="请输入验证码" />
          <weui-button vcode>获取验证码</weui-button>
        </weui-cell>
        <weui-cell access title="添加更多" />
      </weui-cell-group>

      <!-- 自定义插槽 -->
      <weui-cell-group title="自定义插槽">
        <weui-cell>
          <template #icon>
            <view class="custom-icon">i</view>
          </template>
          <template #title>自定义标题</template>
          <template #default>自定义内容</template>
          <template #footer>自定义说明</template>
        </weui-cell>
      </weui-cell-group>

      <!-- hasHeader/hasBody/hasFooter 控制 -->
      <weui-cell-group title="区域控制">
        <weui-cell :has-header="false" value="无 header" />
        <weui-cell :has-body="false" title="无 body" footer="说明" />
        <weui-cell :has-footer="false" title="无 footer" value="内容" />
      </weui-cell-group>
    </view>
  </view>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PageCell',
})

const onCellClick = () => {
  uni.showToast({ title: 'cell clicked', icon: 'none' })
}
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
.custom-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 4px;
  background-color: #07c160;
  color: #fff;
  font-size: 12px;
  font-style: italic;
}
</style>
