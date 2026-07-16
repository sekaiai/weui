# Icon 图标

用于渲染 WeUI 内置图标，包括成功、警告、信息、等待、取消等常用语义图标。

## 基础用法

通过 `type` 属性指定图标类型，组件会渲染对应的 `weui-icon-{type}` 类。

```vue
<template>
  <weui-icon type="success" />
</template>
```

## 图标类型

`type` 支持以下取值：

| type | 说明 |
| --- | --- |
| success | 成功（带圆圈） |
| success-no-circle | 成功（无圆圈） |
| info | 信息 |
| info-circle | 信息（带圆圈） |
| warn | 警告 |
| waiting | 等待 |
| waiting-circle | 等待（带圆圈） |
| cancel | 取消 |
| download | 下载 |
| search | 搜索 |
| clear | 清除 |
| back | 返回 |
| delete | 删除 |

```vue
<template>
  <view class="icon-list">
    <weui-icon type="success" />
    <weui-icon type="info" />
    <weui-icon type="warn" />
    <weui-icon type="waiting" />
    <weui-icon type="cancel" />
  </view>
</template>
```

## 自定义尺寸

通过 `size` 属性设置图标尺寸（单位 px，默认 23）。组件将其映射到 `font-size`，由 WeUI 图标样式的 `em` 单位换算最终渲染尺寸。

```vue
<template>
  <weui-icon type="success" :size="32" />
</template>
```

## 自定义颜色

通过 `color` 属性设置图标颜色，支持任意合法 CSS 颜色值。不传时使用默认 `currentColor`。

```vue
<template>
  <weui-icon type="success" color="#07C160" />
  <weui-icon type="warn" color="#FA9D3B" />
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 图标类型，见上方「图标类型」表 | `string` | — |
| size | 图标尺寸 px | `number \| string` | `23` |
| color | 图标颜色 | `string` | — |
