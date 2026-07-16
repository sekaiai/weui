# Actionsheet 操作菜单

从底部弹出的操作菜单，用于提供一组操作项供用户选择。

## 基础用法

通过 `v-model:visible` 控制显示，`items` 设置菜单项。

<div class="demo-block">
  <weui-button type="primary" @click="show1 = true">显示 Actionsheet</weui-button>
  <weui-actionsheet
    v-model:visible="show1"
    :items="items1"
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
    :items="items1"
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
    :items="items3"
  />
</div>

::: details 查看代码
```vue
<script setup lang="ts">
const items: ActionsheetItem[] = [
  { label: '设为置顶' },
  { label: '删除', warn: true },
]
</script>
```
:::

## 带提示文字

通过 `tips` 为菜单项添加提示说明。

<div class="demo-block">
  <weui-button type="primary" @click="show4 = true">带提示</weui-button>
  <weui-actionsheet
    v-model:visible="show4"
    title="确认操作"
    :items="items4"
  />
</div>

::: details 查看代码
```vue
<script setup lang="ts">
const items: ActionsheetItem[] = [
  { label: '清空', tips: '清空后不可恢复', warn: true },
]
</script>
```
:::

## 禁止遮罩关闭

通过 `mask-closable="false"` 禁止点击遮罩关闭。

<div class="demo-block">
  <weui-button type="primary" @click="show5 = true">禁止遮罩关闭</weui-button>
  <weui-actionsheet
    v-model:visible="show5"
    :items="items1"
    :mask-closable="false"
  />
</div>

## 自定义取消文字

通过 `cancel-text` 自定义取消按钮文字，设为空字符串可隐藏取消按钮。

<div class="demo-block">
  <weui-button type="primary" @click="show6 = true">无取消按钮</weui-button>
  <weui-actionsheet
    v-model:visible="show6"
    :items="items1"
    cancel-text=""
  />
</div>

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | boolean | false |
| title | 标题 | string | — |
| items | 菜单项列表 | ActionsheetItem[] | [] |
| cancel-text | 取消按钮文字，为空时不显示操作区 | string | 取消 |
| mask-closable | 点击遮罩是否关闭 | boolean | true |

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
