# Button 按钮

## 基础用法

<div class="demo-block">
  <weui-button type="primary">页面主操作</weui-button>
  <weui-button type="default">页面次要操作</weui-button>
  <weui-button type="warn">警告类操作</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary">页面主操作</weui-button>
  <weui-button type="default">页面次要操作</weui-button>
  <weui-button type="warn">警告类操作</weui-button>
</template>
```
:::

## 禁用状态

<div class="demo-block">
  <weui-button type="primary" :disabled="true">禁用</weui-button>
  <weui-button type="default" :disabled="true">禁用</weui-button>
</div>

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | string | primary / default / warn | primary |
| disabled | 是否禁用 | boolean | — | false |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击事件 | (event: Event) |
