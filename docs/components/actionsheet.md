# Actionsheet 操作菜单

从底部弹出的操作菜单，用于提供一组操作项供用户选择。支持声明式和命令式两种调用方式。

<script setup lang="ts">
import { ref } from 'vue'
import { Actionsheet, type ActionsheetItem } from 'weui-design-vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const lastSelected = ref('')

const items: ActionsheetItem[] = [
  { label: '拍照' },
  { label: '从相册选择' },
]

const warnItems: ActionsheetItem[] = [
  { label: '编辑' },
  { label: '删除', warn: true },
]

const tipsItems: ActionsheetItem[] = [
  { label: '复制', tips: '复制到剪贴板' },
  { label: '转发', tips: '转发给好友' },
]

const onSelect = (item: ActionsheetItem, index: number) => {
  lastSelected.value = `选中：${item.label}（索引 ${index}）`
}

const onImperative = async () => {
  const result = await Actionsheet.show({
    title: '命令式调用',
    items,
  })
  if (result.index >= 0) {
    lastSelected.value = `命令式选中：${result.item.label}`
  } else {
    lastSelected.value = '命令式取消'
  }
}
</script>

<weui-overlay-host />

## 基础用法

通过 `v-model:visible` 控制显示，`items` 设置菜单项，`@select` 监听选择。

<div class="demo-block">
  <weui-button type="primary" @click="show1 = true">显示 Actionsheet</weui-button>
  <p v-if="lastSelected" style="margin-top: 8px; color: #07c160;">{{ lastSelected }}</p>
  <weui-actionsheet
    v-model:visible="show1"
    :items="items"
    @select="onSelect"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示 Actionsheet</weui-button>
  <weui-actionsheet
    v-model:visible="show"
    :items="items"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ActionsheetItem } from 'weui-design-vue'

const show = ref(false)
const items: ActionsheetItem[] = [
  { label: '拍照' },
  { label: '从相册选择' },
]

const onSelect = (item: ActionsheetItem, index: number) => {
  console.log(item, index)
}
</script>
```
:::

## 带标题

通过 `title` 设置标题。

<div class="demo-block">
  <weui-button type="primary" @click="show2 = true">带标题</weui-button>
  <weui-actionsheet
    v-model:visible="show2"
    title="选择图片来源"
    :items="items"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-actionsheet
    v-model:visible="show"
    title="选择图片来源"
    :items="items"
  />
</template>
```
:::

## 警告操作

通过 `warn: true` 将菜单项设为警告样式（红色文字），常用于删除等危险操作。

<div class="demo-block">
  <weui-button type="warn" @click="show3 = true">删除操作</weui-button>
  <weui-actionsheet
    v-model:visible="show3"
    :items="warnItems"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-actionsheet
    v-model:visible="show"
    :items="warnItems"
  />
</template>

<script setup lang="ts">
import type { ActionsheetItem } from 'weui-design-vue'
const warnItems: ActionsheetItem[] = [
  { label: '编辑' },
  { label: '删除', warn: true },
]
</script>
```
:::

## 带提示文字

通过 `tips` 为菜单项添加说明文字。

<div class="demo-block">
  <weui-button type="primary" @click="show4 = true">带提示</weui-button>
  <weui-actionsheet
    v-model:visible="show4"
    :items="tipsItems"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-actionsheet
    v-model:visible="show"
    :items="tipsItems"
  />
</template>

<script setup lang="ts">
import type { ActionsheetItem } from 'weui-design-vue'
const tipsItems: ActionsheetItem[] = [
  { label: '复制', tips: '复制到剪贴板' },
  { label: '转发', tips: '转发给好友' },
]
</script>
```
:::

## 禁用遮罩点击

通过 `:mask-closable="false"` 禁止点击遮罩关闭，必须选择菜单项或取消。

<div class="demo-block">
  <weui-button type="primary" @click="show5 = true">禁用遮罩点击</weui-button>
  <weui-actionsheet
    v-model:visible="show5"
    :items="items"
    :mask-closable="false"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-actionsheet
    v-model:visible="show"
    :items="items"
    :mask-closable="false"
  />
</template>
```
:::

## 自定义取消文字

通过 `cancel-text` 自定义取消按钮文字，设为空字符串可隐藏取消按钮。

<div class="demo-block">
  <weui-button type="primary" @click="show6 = true">无取消按钮</weui-button>
  <weui-actionsheet
    v-model:visible="show6"
    :items="items"
    cancel-text=""
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-actionsheet
    v-model:visible="show"
    :items="items"
    cancel-text=""
  />
</template>
```
:::

## 命令式调用

通过 `Actionsheet.show(options)` 命令式调用，返回 Promise。点击菜单项 resolve `{ item, index }`，点击取消/遮罩 resolve `{ item: null, index: -1 }`。

<div class="demo-block">
  <weui-button type="primary" @click="onImperative">Actionsheet.show</weui-button>
  <p v-if="lastSelected" style="margin-top: 8px; color: #07c160;">{{ lastSelected }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="onImperative">Actionsheet.show</weui-button>
</template>

<script setup lang="ts">
import { Actionsheet, type ActionsheetItem } from 'weui-design-vue'

const items: ActionsheetItem[] = [
  { label: '拍照' },
  { label: '从相册选择' },
]

const onImperative = async () => {
  const result = await Actionsheet.show({ title: '命令式调用', items })
  if (result.index >= 0) {
    console.log('选中', result.item, result.index)
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
| items | 菜单项列表 | ActionsheetItem[] | [] |
| cancel-text | 取消按钮文字，为空时不显示操作区 | string | 取消 |
| mask-closable | 点击遮罩是否关闭 | boolean | true |
| ext-class | 自定义附加类名 | string | — |
| z-index | z-index（命令式调用时由 overlay-host 注入） | number | — |

### ActionsheetItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 菜单项文字 | string | — |
| tips | 提示文字（显示在 label 下方） | string | — |
| warn | 是否为警告样式（红色文字） | boolean | false |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 选择菜单项时触发 | (item: ActionsheetItem, index: number) |
| cancel | 点击取消按钮时触发 | — |
| close | 关闭时触发 | — |

## 命令式 API

### Actionsheet.show(options): `Promise<ActionsheetShowResult>`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | — |
| items | 菜单项列表 | ActionsheetItem[] | — |
| cancelText | 取消按钮文字 | string | '取消' |
| maskClosable | 点击遮罩是否关闭 | boolean | true |
| extClass | 自定义附加类名 | string | — |

返回 Promise，resolve 值：

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| item | 被点击的菜单项，取消时为 null | ActionsheetItem \| null |
| index | 被点击的菜单项索引，-1 表示取消 | number |
