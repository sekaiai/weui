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

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 是否选中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| ext-class | 根元素扩展类名 | `string` | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 协议文本内容 |
