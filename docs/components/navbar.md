# Navbar 顶部选项卡

Navbar 顶部选项卡，用于页面内 tab 切换。`weui-navbar` 作为容器，`weui-navbar-item` 作为单个选项。

## 基础用法

通过 `weui-navbar` 包裹多个 `weui-navbar-item`，使用 `active` 属性标记当前选中项。

```vue
<template>
  <weui-navbar>
    <weui-navbar-item :active="active === 0" @click="active = 0">选项一</weui-navbar-item>
    <weui-navbar-item :active="active === 1" @click="active = 1">选项二</weui-navbar-item>
    <weui-navbar-item :active="active === 2" @click="active = 2">选项三</weui-navbar-item>
  </weui-navbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>
```

## 选中态

`active` 为 `true` 时，item 根元素追加 `weui-navbar__item_active` 类，呈现高亮选中样式。

```vue
<template>
  <weui-navbar>
    <weui-navbar-item>未选中</weui-navbar-item>
    <weui-navbar-item active>选中</weui-navbar-item>
  </weui-navbar>
</template>
```

## 点击事件

每个 `weui-navbar-item` 点击时会触发 `click` 事件，回调参数为原生 `Event` 对象，可在事件处理中切换 `active`。

```vue
<template>
  <weui-navbar>
    <weui-navbar-item :active="active === 0" @click="onTab(0)">tab1</weui-navbar-item>
    <weui-navbar-item :active="active === 1" @click="onTab(1)">tab2</weui-navbar-item>
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

## 扩展类名

通过 `extClass` 为容器或选项追加自定义类名。

```vue
<template>
  <weui-navbar ext-class="my-navbar">
    <weui-navbar-item ext-class="my-item">tab</weui-navbar-item>
  </weui-navbar>
</template>
```

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
