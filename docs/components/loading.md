# Loading 加载

用于展示加载状态。支持行内加载图标、带文字加载、透明背景（适用于深色容器）以及页面级加载（`weui-loadmore` 样式）。

## 基础用法

默认 `type` 为 `default`，渲染一个行内加载图标（`.weui-loading`），尺寸默认 `20px`。

<div class="demo-block">
  <weui-loading />
</div>

::: details 查看代码
```vue
<template>
  <weui-loading />
</template>
```
:::

## 带文字

通过 `text` 属性添加加载文字，文字位于图标右侧。

<div class="demo-block">
  <weui-loading text="加载中" />
</div>

::: details 查看代码
```vue
<template>
  <weui-loading text="加载中" />
</template>
```
:::

## 不同尺寸

通过 `size` 属性设置加载图标尺寸（单位 px）。

<div class="demo-block">
  <div class="demo-row">
    <weui-loading :size="16" />
    <weui-loading :size="20" />
    <weui-loading :size="32" />
    <weui-loading :size="48" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-loading :size="16" />
  <weui-loading :size="20" />
  <weui-loading :size="32" />
  <weui-loading :size="48" />
</template>
```
:::

## 透明背景

通过 `transparent` 属性切换为透明背景模式（追加 `weui-loading_transparent` 类），适用于深色容器。

<div class="demo-block">
  <div class="loading-dark-bg">
    <weui-loading :transparent="true" :size="32" />
  </div>
</div>

<style>
.loading-dark-bg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: #1a1a1a;
  border-radius: 4px;
}
</style>

::: details 查看代码
```vue
<template>
  <div class="loading-dark-bg">
    <weui-loading :transparent="true" :size="32" />
  </div>
</template>

<style>
.loading-dark-bg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: #1a1a1a;
  border-radius: 4px;
}
</style>
```
:::

## 页面级加载

设置 `type` 为 `page`，渲染为 `weui-loadmore` 样式，常用于页面或列表底部的加载提示。

<div class="demo-block">
  <weui-loading type="page" text="正在加载" />
</div>

::: details 查看代码
```vue
<template>
  <weui-loading type="page" text="正在加载" />
</template>
```
:::

## 自定义文字颜色

通过 `color` 属性设置文字颜色。注意：WeUI 的 `.weui-loading` 使用内嵌 SVG 固定色，`color` 仅影响文字颜色，不影响图标颜色。

<div class="demo-block">
  <div class="demo-row">
    <weui-loading text="加载中" color="#07C160" />
    <weui-loading text="加载中" color="#10AEFF" />
    <weui-loading text="加载中" color="#FA5151" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-loading text="加载中" color="#07C160" />
  <weui-loading text="加载中" color="#10AEFF" />
  <weui-loading text="加载中" color="#FA5151" />
</template>
```
:::

## 插槽文字

除 `text` 属性外，也可通过默认插槽传入文字内容。

<div class="demo-block">
  <weui-loading>自定义加载文字</weui-loading>
</div>

::: details 查看代码
```vue
<template>
  <weui-loading>自定义加载文字</weui-loading>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 显示模式：`default` 行内加载，`page` 页面级加载（`weui-loadmore`） | `'default' \| 'page'` | `'default'` |
| size | 加载图标尺寸 px | `number` | `20` |
| color | 文字颜色（不影响图标颜色） | `string` | `'#999'` |
| text | 加载文字 | `string` | — |
| transparent | 透明背景模式 | `boolean` | `false` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 加载文字内容，与 `text` 属性二选一 |
