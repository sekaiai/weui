# Badge 徽章

用于显示角标数字或红点提示，常用于列表项、头像、按钮等元素上，表示新消息、未读数或更新状态。

## 基础用法

通过 `content` 属性设置徽章内容（任意短文本，如数字 `8`）。

<div class="demo-block">
  <weui-badge content="8" />
</div>

::: details 查看代码
```vue
<template>
  <weui-badge content="8" />
</template>
```
:::

## 红点模式

不传 `content` 或 `content` 为空字符串时，徽章会自动切换为红点模式（追加 `weui-badge_dot` 类）。

<div class="demo-block">
  <weui-badge />
</div>

::: details 查看代码
```vue
<template>
  <weui-badge />
</template>
```
:::

## 文字角标

`content` 不限于数字，也支持任意短文本（如 `New`、`hot`）。

<div class="demo-block">
  <div class="demo-row">
    <weui-badge content="New" />
    <weui-badge content="hot" />
    <weui-badge content="99+" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-badge content="New" />
  <weui-badge content="hot" />
  <weui-badge content="99+" />
</template>
```
:::

## 不同内容对比

数字、文字、红点可混用，统一通过 `content` 控制。

<div class="demo-block">
  <div class="demo-row">
    <weui-badge content="1" />
    <weui-badge content="8" />
    <weui-badge content="99+" />
    <weui-badge content="New" />
    <weui-badge />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-badge content="1" />
  <weui-badge content="8" />
  <weui-badge content="99+" />
  <weui-badge content="New" />
  <weui-badge />
</template>
```
:::

## 无障碍标签

通过 `ariaLabel` 属性设置无障碍标签，读屏时会朗读完整语义。建议在内容为数字时补充单位描述（如「8 个新通知」）。

<div class="demo-block">
  <weui-badge content="8" aria-label="8个新通知" />
</div>

::: details 查看代码
```vue
<template>
  <weui-badge content="8" aria-label="8个新通知" />
</template>
```
:::

## 扩展类名

通过 `extClass` 属性追加自定义类名，常配合父容器定位（如绝对定位到头像右上角）。

<div class="demo-block">
  <view class="badge-avatar-wrap">
    <view class="badge-avatar"></view>
    <weui-badge content="8" ext-class="badge-avatar-dot" />
  </view>
</div>

<style>
.badge-avatar-wrap {
  position: relative;
  display: inline-block;
}
.badge-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #07c160;
}
.badge-avatar-dot {
  position: absolute;
  top: -4px;
  right: -4px;
}
</style>

::: details 查看代码
```vue
<template>
  <view class="badge-avatar-wrap">
    <view class="badge-avatar"></view>
    <weui-badge content="8" ext-class="badge-avatar-dot" />
  </view>
</template>

<style>
.badge-avatar-wrap {
  position: relative;
  display: inline-block;
}
.badge-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #07c160;
}
.badge-avatar-dot {
  position: absolute;
  top: -4px;
  right: -4px;
}
</style>
```
:::

## 列表项角标场景

徽章常配合列表使用，放在 `weui-cell__ft` 中作为右侧提示。

<div class="demo-block demo-mobile">
  <view class="weui-cell weui-cell_access">
    <view class="weui-cell__bd">单行列表</view>
    <view class="weui-cell__ft">
      <text>详细信息</text>
      <weui-badge aria-label="有更新" />
    </view>
  </view>
</div>

::: details 查看代码
```vue
<template>
  <view class="weui-cell weui-cell_access">
    <view class="weui-cell__bd">单行列表</view>
    <view class="weui-cell__ft">
      <text>详细信息</text>
      <weui-badge aria-label="有更新" />
    </view>
  </view>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 徽章内容；为空时自动切换为红点模式 | `string` | `''` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |
| ariaLabel | 无障碍标签，输出到 `aria-label` 属性 | `string` | — |
