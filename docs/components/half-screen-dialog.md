# HalfScreenDialog 半屏弹窗

从底部滑出的半屏弹窗，用于展示较丰富的内容或引导操作。支持声明式和命令式两种调用方式。

## 基础用法

通过 `v-model:visible` 控制显示，`title` 设置标题，`subtitle` 设置副标题，`buttons` 配置底部按钮。

<div class="demo-block">
  <weui-button type="primary" @click="show1 = true">显示 HalfScreenDialog</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show1"
    title="提示"
    subtitle="这是一个副标题"
    content="这是一个半屏弹窗"
    :buttons="buttons1"
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示 HalfScreenDialog</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show"
    title="提示"
    subtitle="这是一个副标题"
    content="这是一个半屏弹窗"
    :buttons="buttons"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogButton } from 'weui-design-vue'

const show = ref(false)
const buttons: HalfScreenDialogButton[] = [
  { label: '取消' },
  { label: '确定' },
]

const onButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  console.log(btn, index)
}
</script>
```
:::

## 单按钮

只有一个按钮时，自动分配 primary 样式。

<div class="demo-block">
  <weui-button type="primary" @click="show2 = true">单按钮 HalfScreenDialog</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show2"
    title="提示"
    content="操作成功"
    :buttons="[{ label: '知道了' }]"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-half-screen-dialog
    v-model:visible="show"
    title="提示"
    content="操作成功"
    :buttons="[{ label: '知道了' }]"
  />
</template>
```
:::

## 警告按钮

通过 `type: 'warn'` 将按钮设为警告样式。

<div class="demo-block">
  <weui-button type="warn" @click="show3 = true">删除确认</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show3"
    title="确认删除"
    content="删除后不可恢复，是否继续？"
    :buttons="buttons3"
  />
</div>

::: details 查看代码
```vue
<script setup lang="ts">
import type { HalfScreenDialogButton } from 'weui-design-vue'

const buttons3: HalfScreenDialogButton[] = [
  { label: '取消' },
  { label: '删除', type: 'warn' },
]
</script>
```
:::

## 使用 Slot 自定义内容

通过 default slot 替代 content，通过 title slot 替代标题，通过 footer slot 替代底部按钮区。

<div class="demo-block">
  <weui-button type="primary" @click="show4 = true">自定义内容</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show4"
    :buttons="[{ label: '确定' }]"
  >
    <template #title>
      <text>自定义标题</text>
    </template>
    <view style="text-align: center; padding: 16px 0;">
      <text style="color: #fa5151; font-size: 16px;">⚠️</text>
      <text>这是一个带图标的提示内容，可以放置更丰富的内容。</text>
    </view>
  </weui-half-screen-dialog>
</div>

::: details 查看代码
```vue
<template>
  <weui-half-screen-dialog v-model:visible="show" :buttons="[{ label: '确定' }]">
    <template #title>
      <text>自定义标题</text>
    </template>
    <view style="text-align: center; padding: 16px 0;">
      <text style="color: #fa5151; font-size: 16px;">⚠️</text>
      <text>这是一个带图标的提示内容，可以放置更丰富的内容。</text>
    </view>
  </weui-half-screen-dialog>
</template>
```
:::

## 禁止遮罩关闭

通过 `:mask-closable="false"` 禁止点击遮罩关闭。

<div class="demo-block">
  <weui-button type="primary" @click="show5 = true">禁止遮罩关闭</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show5"
    title="重要提示"
    content="请仔细阅读后再操作"
    :mask-closable="false"
    :buttons="[{ label: '我已知晓' }]"
  />
</div>

## 命令式调用

通过 `HalfScreenDialog.show` 命令式调用，无需在模板中声明组件。调用前需在应用中挂载 `<weui-overlay-host />`。

<div class="demo-block">
  <weui-button type="primary" @click="showImperative">HalfScreenDialog.show</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="showImperative">HalfScreenDialog.show</weui-button>
</template>

<script setup lang="ts">
import { HalfScreenDialog } from 'weui-design-vue'

const showImperative = async () => {
  const result = await HalfScreenDialog.show({
    title: '提示',
    subtitle: '命令式调用',
    content: '是否确认提交？',
    buttons: [
      { label: '取消' },
      { label: '确定' },
    ],
  })
  console.log('点击了按钮', result.button, result.index)
}
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | boolean | false |
| title | 标题 | string | — |
| subtitle | 副标题 | string | — |
| content | 内容文字（无 default slot 时使用） | string | — |
| buttons | 按钮列表 | HalfScreenDialogButton[] | [] |
| mask-closable | 点击遮罩是否关闭 | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| ext-class | 自定义附加类名 | string | — |
| z-index | z-index（命令式调用时由 overlay-host 注入） | number | — |

### HalfScreenDialogButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 按钮文字 | string | — |
| type | 按钮类型，未指定时按位置自动分配（单按钮 primary，多按钮首个 default 其余 primary） | 'default' \| 'primary' \| 'warn' | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| buttontap | 点击按钮时触发 | (button: HalfScreenDialogButton, index: number) |
| close | 关闭时触发 | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 内容区域 |
| title | 标题区域（替换默认标题与副标题） |
| footer | 底部按钮区域（替换默认按钮渲染） |

## 命令式 API

### HalfScreenDialog.show(options) → Promise<{ button, index }>

显示半屏弹窗，点击任意按钮后关闭并 resolve。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | — |
| subtitle | 副标题 | string | — |
| content | 内容文字 | string | — |
| buttons | 按钮列表 | HalfScreenDialogButton[] | [] |
| maskClosable | 点击遮罩是否关闭 | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| extClass | 自定义附加类名 | string | — |
