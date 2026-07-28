# Agree 协议勾选

用于表单底部的协议勾选，支持 `v-model` 双向绑定。

## 基础用法

通过默认插槽传入协议文本内容。点击复选框会触发 `change` 事件并更新 `v-model` 绑定值。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-agree>阅读并同意<a href="javascript:">《相关条款》</a></weui-agree>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-agree>阅读并同意<a href="javascript:">《相关条款》</a></weui-agree>
</template>
```
:::

## 警告与动画状态

校验未通过时使用 `warn` 显示官方红色文本；配合 `animate` 可触发 WeUI 的横向抖动提示。动画由属性变化触发，提交校验失败时可将它切换为 `true`。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-agree warn animate>请先阅读并同意<a href="/terms">《相关条款》</a></weui-agree></div></div>

::: details 查看代码
```vue
<weui-agree warn animate>请先阅读并同意<a href="/terms">《相关条款》</a></weui-agree>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 是否选中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| warn | 是否显示警告文本样式 | `boolean` | `false` |
| animate | 是否触发官方横向抖动动画 | `boolean` | `false` |
| ext-class | 根元素扩展类名 | `string` | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 协议文本内容 |
