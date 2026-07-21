# Flex 弹性布局

基于 `display: flex` 的弹性布局容器，支持主轴方向、换行、主轴对齐、交叉轴对齐等配置。`weui-flex` 提供容器，`weui-flex-item` 提供 `flex: 1` 的子项。

## 基础用法

`weui-flex` 默认主轴为 `row`，子项使用 `weui-flex-item`（默认 `flex: 1`）等分宽度。

<div class="demo-block vp-raw">
  <weui-flex>
    <weui-flex-item ext-class="flex-demo-item">1</weui-flex-item>
    <weui-flex-item ext-class="flex-demo-item">2</weui-flex-item>
    <weui-flex-item ext-class="flex-demo-item">3</weui-flex-item>
  </weui-flex>
</div>

::: details 查看代码
```vue
<template>
  <weui-flex>
    <weui-flex-item>1</weui-flex-item>
    <weui-flex-item>2</weui-flex-item>
    <weui-flex-item>3</weui-flex-item>
  </weui-flex>
</template>
```
:::

## 主轴对齐

通过 `justify` 属性设置主轴对齐方式：`start`/`center`/`end`/`between`/`around`/`evenly`。此时子项使用固定宽度（非 `flex:1`）以体现间距差异。

<div class="demo-block vp-raw">
  <div class="flex-demo-stack">
    <weui-flex justify="start" ext-class="flex-demo-row">
      <div class="flex-demo-box">start</div>
      <div class="flex-demo-box">B</div>
      <div class="flex-demo-box">C</div>
    </weui-flex>
    <weui-flex justify="center" ext-class="flex-demo-row">
      <div class="flex-demo-box">center</div>
      <div class="flex-demo-box">B</div>
      <div class="flex-demo-box">C</div>
    </weui-flex>
    <weui-flex justify="end" ext-class="flex-demo-row">
      <div class="flex-demo-box">end</div>
      <div class="flex-demo-box">B</div>
      <div class="flex-demo-box">C</div>
    </weui-flex>
    <weui-flex justify="between" ext-class="flex-demo-row">
      <div class="flex-demo-box">between</div>
      <div class="flex-demo-box">B</div>
      <div class="flex-demo-box">C</div>
    </weui-flex>
    <weui-flex justify="around" ext-class="flex-demo-row">
      <div class="flex-demo-box">around</div>
      <div class="flex-demo-box">B</div>
      <div class="flex-demo-box">C</div>
    </weui-flex>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-flex justify="center">
    <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>
  </weui-flex>
</template>
```
:::

## 交叉轴对齐

通过 `align` 属性设置交叉轴对齐方式：`start`/`center`/`end`/`baseline`/`stretch`。需为容器设置高度以体现差异。

<div class="demo-block vp-raw">
  <div class="flex-demo-stack">
    <weui-flex align="start" ext-class="flex-demo-tall">
      <div class="flex-demo-box">start</div>
      <div class="flex-demo-box flex-demo-box-tall">高</div>
      <div class="flex-demo-box">C</div>
    </weui-flex>
    <weui-flex align="center" ext-class="flex-demo-tall">
      <div class="flex-demo-box">center</div>
      <div class="flex-demo-box flex-demo-box-tall">高</div>
      <div class="flex-demo-box">C</div>
    </weui-flex>
    <weui-flex align="end" ext-class="flex-demo-tall">
      <div class="flex-demo-box">end</div>
      <div class="flex-demo-box flex-demo-box-tall">高</div>
      <div class="flex-demo-box">C</div>
    </weui-flex>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-flex align="center" style="height: 80px;">
    <div class="box">A</div>
    <div class="box" style="height:60px;">高</div>
    <div class="box">C</div>
  </weui-flex>
</template>
```
:::

## 换行

通过 `wrap` 属性设置换行方式：`nowrap`（默认）/`wrap`/`wrap-reverse`。子项总宽超过容器时换行。

<div class="demo-block vp-raw">
  <weui-flex wrap="wrap" ext-class="flex-demo-wrap">
    <div class="flex-demo-box">1</div>
    <div class="flex-demo-box">2</div>
    <div class="flex-demo-box">3</div>
    <div class="flex-demo-box">4</div>
    <div class="flex-demo-box">5</div>
    <div class="flex-demo-box">6</div>
  </weui-flex>
</div>

::: details 查看代码
```vue
<template>
  <weui-flex wrap="wrap">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
    <div class="box">4</div>
    <div class="box">5</div>
    <div class="box">6</div>
  </weui-flex>
</template>
```
:::

## 垂直布局

通过 `direction` 属性设置主轴方向：`row`（默认）/`column`/`row-reverse`/`column-reverse`。

<div class="demo-block vp-raw">
  <weui-flex direction="column" ext-class="flex-demo-col">
    <div class="flex-demo-box">第一行</div>
    <div class="flex-demo-box">第二行</div>
    <div class="flex-demo-box">第三行</div>
  </weui-flex>
</div>

::: details 查看代码
```vue
<template>
  <weui-flex direction="column">
    <div class="box">第一行</div>
    <div class="box">第二行</div>
    <div class="box">第三行</div>
  </weui-flex>
</template>
```
:::

## 子项比例

通过 `weui-flex-item` 的 `flex` 属性自定义子项的 `flex` 值（不传时为 `flex:1`）。

<div class="demo-block vp-raw">
  <weui-flex>
    <weui-flex-item :flex="1" ext-class="flex-demo-item">flex 1</weui-flex-item>
    <weui-flex-item :flex="2" ext-class="flex-demo-item">flex 2</weui-flex-item>
    <weui-flex-item :flex="3" ext-class="flex-demo-item">flex 3</weui-flex-item>
  </weui-flex>
</div>

::: details 查看代码
```vue
<template>
  <weui-flex>
    <weui-flex-item :flex="1">flex 1</weui-flex-item>
    <weui-flex-item :flex="2">flex 2</weui-flex-item>
    <weui-flex-item :flex="3">flex 3</weui-flex-item>
  </weui-flex>
</template>
```
:::

## Flex Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 主轴方向 | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` |
| wrap | 换行方式 | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'nowrap'` |
| justify | 主轴对齐 | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | `'start'` |
| align | 交叉轴对齐 | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'center'` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## FlexItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| flex | 自定义 flex 值，不传时使用 weui-flex__item 的 `flex:1` | `number` | — |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## Flex Slots

| 名称 | 说明 |
| --- | --- |
| default | 子项内容，可包含 `weui-flex-item` 或任意元素 |

<style>
.flex-demo-item {
  background: #07c160;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  margin: 2px;
}
.flex-demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.flex-demo-row {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 4px;
}
.flex-demo-box {
  width: 64px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #10aeff;
  color: #fff;
  border-radius: 4px;
  font-size: 13px;
}
.flex-demo-box-tall {
  height: 60px;
  line-height: 60px;
}
.flex-demo-tall {
  height: 80px;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 4px;
}
.flex-demo-wrap {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 4px;
}
.flex-demo-col {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 4px;
}
</style>
