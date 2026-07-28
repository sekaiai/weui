# Navbar 顶部选项卡

Navbar 顶部选项卡，用于页面内 tab 切换。`weui-navbar` 作为容器，`weui-navbar-item` 作为单个选项；组件同时输出 `tablist` / `tab` 语义，支持 Enter 与 Space 键触发选项。

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
const activeMany = ref(0)

const onTab = (i: number) => {
  active.value = i
}
const onTabMany = (i: number) => {
  activeMany.value = i
}
</script>

## 基础用法

通过 `weui-navbar` 包裹多个 `weui-navbar-item`，使用 `active` 属性标记当前选中项。每个 item 点击时触发 `click` 事件，在事件处理中切换 `active` 即可完成切换。

<div class="demo-block vp-raw">
  <weui-navbar>
    <weui-navbar-item :active="active === 0" @click="onTab(0)">选项一</weui-navbar-item>
    <weui-navbar-item :active="active === 1" @click="onTab(1)">选项二</weui-navbar-item>
    <weui-navbar-item :active="active === 2" @click="onTab(2)">选项三</weui-navbar-item>
  </weui-navbar>
  <p style="margin-top: 12px; color: #07c160;">当前选中：选项 {{ active + 1 }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-navbar>
    <weui-navbar-item :active="active === 0" @click="onTab(0)">选项一</weui-navbar-item>
    <weui-navbar-item :active="active === 1" @click="onTab(1)">选项二</weui-navbar-item>
    <weui-navbar-item :active="active === 2" @click="onTab(2)">选项三</weui-navbar-item>
  </weui-navbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
const onTab = (i: number) => {
  active.value = i
}
</script>
```
:::

## 选中态

`active` 为 `true` 时，item 根元素追加 `weui-bar__item_on` 类，呈现高亮选中样式。

<div class="demo-block vp-raw">
  <weui-navbar>
    <weui-navbar-item>未选中</weui-navbar-item>
    <weui-navbar-item active>选中</weui-navbar-item>
    <weui-navbar-item>未选中</weui-navbar-item>
  </weui-navbar>
</div>

::: details 查看代码
```vue
<template>
  <weui-navbar>
    <weui-navbar-item>未选中</weui-navbar-item>
    <weui-navbar-item active>选中</weui-navbar-item>
    <weui-navbar-item>未选中</weui-navbar-item>
  </weui-navbar>
</template>
```
:::

## 多选项卡

当选项数量较多时，`weui-navbar` 会自动均分宽度。以下示例展示 5 个选项的切换。

<div class="demo-block vp-raw">
  <weui-navbar>
    <weui-navbar-item :active="activeMany === 0" @click="onTabMany(0)">首页</weui-navbar-item>
    <weui-navbar-item :active="activeMany === 1" @click="onTabMany(1)">分类</weui-navbar-item>
    <weui-navbar-item :active="activeMany === 2" @click="onTabMany(2)">排行</weui-navbar-item>
    <weui-navbar-item :active="activeMany === 3" @click="onTabMany(3)">关注</weui-navbar-item>
    <weui-navbar-item :active="activeMany === 4" @click="onTabMany(4)">我的</weui-navbar-item>
  </weui-navbar>
  <p style="margin-top: 12px; color: #07c160;">当前选中：第 {{ activeMany + 1 }} 个</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-navbar>
    <weui-navbar-item :active="activeMany === 0" @click="onTabMany(0)">首页</weui-navbar-item>
    <weui-navbar-item :active="activeMany === 1" @click="onTabMany(1)">分类</weui-navbar-item>
    <weui-navbar-item :active="activeMany === 2" @click="onTabMany(2)">排行</weui-navbar-item>
    <weui-navbar-item :active="activeMany === 3" @click="onTabMany(3)">关注</weui-navbar-item>
    <weui-navbar-item :active="activeMany === 4" @click="onTabMany(4)">我的</weui-navbar-item>
  </weui-navbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeMany = ref(0)
const onTabMany = (i: number) => {
  activeMany.value = i
}
</script>
```
:::

## 扩展类名

通过 `extClass` 为容器或选项追加自定义类名。

<div class="demo-block vp-raw">
  <weui-navbar ext-class="my-navbar">
    <weui-navbar-item ext-class="my-item">tab</weui-navbar-item>
    <weui-navbar-item active ext-class="my-item">tab</weui-navbar-item>
  </weui-navbar>
</div>

::: details 查看代码
```vue
<template>
  <weui-navbar ext-class="my-navbar">
    <weui-navbar-item ext-class="my-item">tab</weui-navbar-item>
    <weui-navbar-item active ext-class="my-item">tab</weui-navbar-item>
  </weui-navbar>
</template>
```
:::

## Attributes

### Navbar

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extClass | 根元素扩展类名 | `string` | — |

### NavbarItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 是否选中 | `boolean` | `false` |
| extClass | 根元素扩展类名 | `string` | — |

## Events

### NavbarItem

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击选项时触发 | `(event: Event)` |

## Slots

### Navbar

| 插槽名 | 说明 |
| --- | --- |
| default | navbar-item 子项 |

### NavbarItem

| 插槽名 | 说明 |
| --- | --- |
| default | 选项内容 |
