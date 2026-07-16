# Dialog 对话框

弹窗对话框，用于提示用户确认或展示信息。支持声明式和命令式两种调用方式。

## 基础用法

通过 `v-model:visible` 控制显示，`title` 设置标题，`content` 设置内容，`buttons` 配置按钮。

<div class="demo-block">
  <weui-button type="primary" @click="show1 = true">显示 Dialog</weui-button>
  <weui-dialog
    v-model:visible="show1"
    title="提示"
    content="这是一个对话框"
    :buttons="buttons1"
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示 Dialog</weui-button>
  <weui-dialog
    v-model:visible="show"
    title="提示"
    content="这是一个对话框"
    :buttons="buttons"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DialogButton } from 'weui-design-vue'

const show = ref(false)
const buttons: DialogButton[] = [
  { label: '取消' },
  { label: '确定' },
]

const onButtonTap = (btn: DialogButton, index: number) => {
  console.log(btn, index)
}
</script>
```
:::

## 单按钮

只有一个按钮时，自动分配 primary 样式。

<div class="demo-block">
  <weui-button type="primary" @click="show2 = true">单按钮 Dialog</weui-button>
  <weui-dialog
    v-model:visible="show2"
    title="提示"
    content="操作成功"
    :buttons="[{ label: '知道了' }]"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-dialog
    v-model:visible="show"
    title="提示"
    content="操作成功"
    :buttons="[{ label: '知道了' }]"
  />
</template>
```
:::

## 警告按钮

通过 `type: 'warn'` 将按钮设为警告样式（红色文字）。

<div class="demo-block">
  <weui-button type="warn" @click="show3 = true">删除确认</weui-button>
  <weui-dialog
    v-model:visible="show3"
    title="确认删除"
    content="删除后不可恢复，是否继续？"
    :buttons="buttons3"
  />
</div>

::: details 查看代码
```vue
<script setup lang="ts">
import type { DialogButton } from 'weui-design-vue'

const buttons3: DialogButton[] = [
  { label: '取消' },
  { label: '删除', type: 'warn' },
]
</script>
```
:::

## 垂直按钮

通过 `btn-wrap` 让按钮垂直排列。

<div class="demo-block">
  <weui-button type="primary" @click="show4 = true">垂直按钮</weui-button>
  <weui-dialog
    v-model:visible="show4"
    title="选择操作"
    content="请选择以下操作之一"
    btn-wrap
    :buttons="buttons4"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-dialog
    v-model:visible="show"
    title="选择操作"
    content="请选择以下操作之一"
    btn-wrap
    :buttons="buttons"
  />
</template>

<script setup lang="ts">
import type { DialogButton } from 'weui-design-vue'

const buttons: DialogButton[] = [
  { label: '收藏' },
  { label: '分享' },
  { label: '取消', type: 'default' },
]
</script>
```
:::

## 使用 Slot 自定义内容

通过 default slot 替代 content，通过 title slot 替代 title。

<div class="demo-block">
  <weui-button type="primary" @click="show5 = true">自定义内容</weui-button>
  <weui-dialog
    v-model:visible="show5"
    :buttons="[{ label: '确定' }]"
  >
    <template #title>
      <text>自定义标题</text>
    </template>
    <view style="text-align: center; padding: 8px 0;">
      <text style="color: #fa5151; font-size: 16px;">⚠️</text>
      <text>这是一个带图标的提示内容</text>
    </view>
  </weui-dialog>
</div>

::: details 查看代码
```vue
<template>
  <weui-dialog v-model:visible="show" :buttons="[{ label: '确定' }]">
    <template #title>
      <text>自定义标题</text>
    </template>
    <view style="text-align: center; padding: 8px 0;">
      <text style="color: #fa5151; font-size: 16px;">⚠️</text>
      <text>这是一个带图标的提示内容</text>
    </view>
  </weui-dialog>
</template>
```
:::

## 禁止遮罩关闭

通过 `mask-closable="false"` 禁止点击遮罩关闭。

<div class="demo-block">
  <weui-button type="primary" @click="show6 = true">禁止遮罩关闭</weui-button>
  <weui-dialog
    v-model:visible="show6"
    title="重要提示"
    content="请仔细阅读后再操作"
    :mask-closable="false"
    :buttons="[{ label: '我已知晓' }]"
  />
</div>

## 命令式调用

通过 `Dialog.show`、`Dialog.alert`、`Dialog.confirm` 命令式调用，无需在模板中声明组件。调用前需在应用中挂载 `<weui-overlay-host />`。

<div class="demo-block">
  <weui-button type="primary" @click="showAlert">Dialog.alert</weui-button>
  <weui-button type="primary" @click="showConfirm">Dialog.confirm</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="showAlert">Dialog.alert</weui-button>
  <weui-button type="primary" @click="showConfirm">Dialog.confirm</weui-button>
</template>

<script setup lang="ts">
import { Dialog } from 'weui-design-vue'

const showAlert = async () => {
  await Dialog.alert({
    title: '提示',
    content: '操作已完成',
  })
  console.log('alert 关闭')
}

const showConfirm = async () => {
  const ok = await Dialog.confirm({
    title: '确认',
    content: '是否提交申请？',
  })
  if (ok) {
    console.log('用户点击确认')
  } else {
    console.log('用户点击取消')
  }
}
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | boolean | false |
| title | 标题 | string | — |
| content | 内容文字（无 default slot 时使用） | string | — |
| buttons | 按钮列表 | DialogButton[] | [] |
| mask-closable | 点击遮罩是否关闭 | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| ext-class | 自定义附加类名 | string | — |
| btn-wrap | 按钮是否垂直排列 | boolean | false |
| z-index | z-index（命令式调用时由 overlay-host 注入） | number | — |

### DialogButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 按钮文字 | string | — |
| type | 按钮类型，未指定时按位置自动分配（单按钮 primary，多按钮首个 default 其余 primary） | 'default' \| 'primary' \| 'warn' | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| buttontap | 点击按钮时触发 | (button: DialogButton, index: number) |
| close | 关闭时触发 | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 内容区域 |
| title | 标题区域 |
| footer | 底部按钮区域（替换默认按钮渲染） |

## 命令式 API

### Dialog.show(options) → Promise<{ button, index }>

显示自定义按钮的对话框。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | — |
| content | 内容文字 | string | — |
| buttons | 按钮列表 | DialogButton[] | [] |
| maskClosable | 点击遮罩是否关闭 | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| extClass | 自定义附加类名 | string | — |
| btnWrap | 按钮是否垂直排列 | boolean | false |

### Dialog.alert(options) → Promise<void>

显示只有一个确认按钮的提示框。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | — |
| content | 内容文字 | string | — |
| confirmText | 确认按钮文字 | string | 确定 |
| maskClosable | 点击遮罩是否关闭 | boolean | true |

### Dialog.confirm(options) → Promise<boolean>

显示确认/取消对话框。点击确认 resolve(true)，点击取消 resolve(false)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | — |
| content | 内容文字 | string | — |
| confirmText | 确认按钮文字 | string | 确定 |
| cancelText | 取消按钮文字 | string | 取消 |
| maskClosable | 点击遮罩是否关闭 | boolean | false |
