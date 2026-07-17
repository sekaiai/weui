# HalfScreenDialog 半屏弹窗

从底部滑出的半屏弹窗，用于展示较丰富的内容或引导操作。支持声明式和命令式两种调用方式。

<script setup lang="ts">
import { ref } from 'vue'
import { HalfScreenDialog, type HalfScreenDialogButton } from 'weui-design-vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const lastResult = ref('')

const twoButtons: HalfScreenDialogButton[] = [
  { label: '取消' },
  { label: '确定' },
]

const oneButton: HalfScreenDialogButton[] = [
  { label: '知道了' },
]

const threeButtons: HalfScreenDialogButton[] = [
  { label: '取消' },
  { label: '确定' },
  { label: '删除', type: 'warn' },
]

const onButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  lastResult.value = `点击：${btn.label}（索引 ${index}）`
}

const onImperative = async () => {
  const result = await HalfScreenDialog.show({
    title: '提示',
    subtitle: '命令式调用',
    content: '是否确认提交？',
    buttons: [
      { label: '取消' },
      { label: '确定' },
    ],
  })
  if (result.index >= 0) {
    lastResult.value = `命令式点击：${result.button?.label}`
  } else {
    lastResult.value = '命令式：遮罩关闭'
  }
}
</script>

<weui-overlay-host />

## 基础用法

通过 `v-model:visible` 控制显示，`title` 设置标题，`subtitle` 设置副标题，`content` 设置内容，`buttons` 配置底部按钮。

<div class="demo-block">
  <weui-button type="primary" @click="show1 = true">显示 HalfScreenDialog</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
  <weui-half-screen-dialog
    v-model:visible="show1"
    title="提示"
    subtitle="这是一个副标题"
    content="这是一个半屏弹窗"
    :buttons="twoButtons"
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

`buttons` 仅配置一项时，按钮自动设为 primary 样式。

<div class="demo-block">
  <weui-button type="primary" @click="show2 = true">单按钮 HalfScreenDialog</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show2"
    title="提示"
    content="操作成功"
    :buttons="oneButton"
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

## 三按钮（含警告）

通过 `type: 'warn'` 设置警告按钮。未指定 type 时，多按钮首个为 default，其余为 primary。

<div class="demo-block">
  <weui-button type="primary" @click="show3 = true">三按钮 HalfScreenDialog</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show3"
    title="文件操作"
    content="请选择操作"
    :buttons="threeButtons"
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-half-screen-dialog
    v-model:visible="show"
    title="文件操作"
    content="请选择操作"
    :buttons="threeButtons"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import type { HalfScreenDialogButton } from 'weui-design-vue'
const threeButtons: HalfScreenDialogButton[] = [
  { label: '取消' },
  { label: '确定' },
  { label: '删除', type: 'warn' },
]
</script>
```
:::

## 禁用遮罩点击

通过 `:mask-closable="false"` 禁止点击遮罩关闭，必须点击按钮。

<div class="demo-block">
  <weui-button type="primary" @click="show4 = true">禁用遮罩点击</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show4"
    title="重要提示"
    content="请仔细阅读后再操作"
    :mask-closable="false"
    :buttons="oneButton"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-half-screen-dialog
    v-model:visible="show"
    title="重要提示"
    content="请仔细阅读后再操作"
    :mask-closable="false"
    :buttons="[{ label: '我已知晓' }]"
  />
</template>
```
:::

## 无遮罩背景

通过 `:mask="false"` 使遮罩透明（仍拦截点击）。

<div class="demo-block">
  <weui-button type="primary" @click="show5 = true">无遮罩背景</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show5"
    title="提示"
    content="遮罩透明"
    :mask="false"
    :buttons="twoButtons"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-half-screen-dialog
    v-model:visible="show"
    title="提示"
    content="遮罩透明"
    :mask="false"
    :buttons="buttons"
  />
</template>
```
:::

## 自定义插槽

通过 `title`、`default`、`footer` 插槽自定义标题、内容和底部按钮区。

<div class="demo-block">
  <weui-button type="primary" @click="show6 = true">自定义内容</weui-button>
  <weui-half-screen-dialog v-model:visible="show6">
    <template #title>
      <text>自定义标题</text>
    </template>
    <view style="text-align: center; padding: 16px 0;">
      <text style="color: #fa5151; font-size: 16px;">⚠️</text>
      <text>这是一个带图标的提示内容，可以放置更丰富的内容。</text>
    </view>
    <template #footer>
      <view class="weui-half-screen-dialog__btn weui-half-screen-dialog__btn_primary" @click="show6 = false">知道了</view>
    </template>
  </weui-half-screen-dialog>
</div>

::: details 查看代码
```vue
<template>
  <weui-half-screen-dialog v-model:visible="show">
    <template #title>
      <text>自定义标题</text>
    </template>
    <view style="text-align: center; padding: 16px 0;">
      <text style="color: #fa5151; font-size: 16px;">⚠️</text>
      <text>这是一个带图标的提示内容，可以放置更丰富的内容。</text>
    </view>
    <template #footer>
      <view class="weui-half-screen-dialog__btn weui-half-screen-dialog__btn_primary" @click="show = false">知道了</view>
    </template>
  </weui-half-screen-dialog>
</template>
```
:::

## 命令式调用

通过 `HalfScreenDialog.show(options)` 命令式调用，无需在模板中声明组件。返回 `Promise<{ button, index }>`，点击按钮 resolve `{ button, index }`，点击遮罩关闭 resolve `{ button: undefined, index: -1 }`。

<div class="demo-block">
  <weui-button type="primary" @click="onImperative">HalfScreenDialog.show</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
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
| mask | 是否显示遮罩背景 | boolean | true |
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
| update:visible | 显示状态变化时触发 | (value: boolean) |
| buttontap | 点击按钮时触发 | (button: HalfScreenDialogButton, index: number) |
| close | 关闭时触发 | — |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| title | 标题区域（替换默认标题与副标题） |
| default | 内容区域 |
| footer | 底部按钮区域（替换默认按钮渲染） |

## 命令式 API

### HalfScreenDialog.show(options): `Promise<HalfScreenDialogShowResult>`

显示半屏弹窗，点击任意按钮后关闭并 resolve；点击遮罩关闭时 resolve `{ button: undefined, index: -1 }`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | — |
| subtitle | 副标题 | string | — |
| content | 内容文字 | string | — |
| buttons | 按钮列表 | HalfScreenDialogButton[] | [] |
| maskClosable | 点击遮罩是否关闭 | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| extClass | 自定义附加类名 | string | — |

返回 Promise，resolve 值结构：

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| button | 被点击的按钮；遮罩关闭时为 undefined | HalfScreenDialogButton \| undefined |
| index | 被点击的按钮索引；遮罩关闭时为 -1 | number |
