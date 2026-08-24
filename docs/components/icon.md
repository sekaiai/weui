<script setup lang="ts">
import { ref } from 'vue'

const iconTypes = [
  { type: 'success', label: 'success' },
  { type: 'success-no-circle', label: 'success-no-circle' },
  { type: 'success-circle', label: 'success-circle' },
  { type: 'info', label: 'info' },
  { type: 'info-circle', label: 'info-circle' },
  { type: 'warn', label: 'warn' },
  { type: 'waiting', label: 'waiting' },
  { type: 'waiting-circle', label: 'waiting-circle' },
  { type: 'cancel', label: 'cancel' },
  { type: 'download', label: 'download' },
  { type: 'search', label: 'search' },
  { type: 'clear', label: 'clear' },
  { type: 'back', label: 'back' },
  { type: 'delete', label: 'delete' },
]

const clickType = ref('')
const onClickIcon = (t: string) => {
  clickType.value = t
}
</script>

# Icon 图标

用于渲染 WeUI 内置图标，包括成功、警告、信息、等待、取消等常用语义图标。组件会渲染对应的 `weui-icon-{type}` 类。

## 基础用法

通过 `type` 属性指定图标类型，组件渲染 `<i class="weui-icon-{type}">`。不传 `size` 时使用 WeUI 默认尺寸（约 24px）。

<div class="demo-block vp-raw">
  <weui-icon type="success" />
  <weui-icon type="info" />
  <weui-icon type="warn" />
</div>

::: details 查看代码
```vue
<template>
  <weui-icon type="success" />
  <weui-icon type="info" />
  <weui-icon type="warn" />
</template>
```
:::

## 图标类型

`type` 支持以下取值，点击图标可查看对应类型名。

<div class="demo-block vp-raw">
  <div class="icon-grid">
    <div v-for="item in iconTypes" :key="item.type" class="icon-grid__item" @click="onClickIcon(item.type)">
      <weui-icon :type="item.type" :size="28" />
      <span class="icon-grid__label">{{ item.label }}</span>
    </div>
  </div>
  <p v-if="clickType" style="margin-top:12px;color:#07c160;">已点击：{{ clickType }}</p>
</div>

::: details 查看代码
```vue
<template>
  <div class="icon-grid">
    <div v-for="item in iconTypes" :key="item.type" class="icon-grid__item" @click="onClickIcon(item.type)">
      <weui-icon :type="item.type" :size="28" />
      <span class="icon-grid__label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const iconTypes = [
  { type: 'success', label: 'success' },
  { type: 'info', label: 'info' },
  { type: 'warn', label: 'warn' },
  { type: 'waiting', label: 'waiting' },
  { type: 'cancel', label: 'cancel' },
  { type: 'download', label: 'download' },
  { type: 'search', label: 'search' },
  { type: 'clear', label: 'clear' },
  { type: 'back', label: 'back' },
  { type: 'delete', label: 'delete' },
]
const clickType = ref('')
const onClickIcon = (t: string) => {
  clickType.value = t
}
</script>
```
:::

## 自定义尺寸

通过 `size` 属性设置图标尺寸。数字和纯数字字符串按 `px` 处理；传入 `1em`、`2rem` 等带单位字符串时会原样传给 `font-size`。WeUI 图标以 `em` 单位换算最终渲染尺寸。

<div class="demo-block vp-raw">
  <div class="demo-row" style="align-items:flex-end;">
    <weui-icon type="success" :size="16" />
    <weui-icon type="success" :size="24" />
    <weui-icon type="success" :size="32" />
    <weui-icon type="success" :size="48" />
    <weui-icon type="success" size="1em" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-icon type="success" :size="16" />
  <weui-icon type="success" :size="24" />
  <weui-icon type="success" :size="32" />
  <weui-icon type="success" :size="48" />
  <weui-icon type="success" size="1em" />
</template>
```
:::

## 自定义颜色

通过 `color` 属性设置图标颜色，支持任意合法 CSS 颜色值。不传时使用各图标类型的 WeUI 默认色（如 success 为绿色、warn 为红色）。

<div class="demo-block vp-raw">
  <div class="demo-row">
    <weui-icon type="success" color="#07C160" />
    <weui-icon type="warn" color="#FA9D3B" />
    <weui-icon type="info" color="#10AEFF" />
    <weui-icon type="cancel" color="#FA5151" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-icon type="success" color="#07C160" />
  <weui-icon type="warn" color="#FA9D3B" />
  <weui-icon type="info" color="#10AEFF" />
  <weui-icon type="cancel" color="#FA5151" />
</template>
```
:::

## 消息页大图标

通过 `msg` 属性渲染消息页大尺寸图标（宽高 `6.4em`），常用于结果页（Msg）的主视觉图标。

<div class="demo-block vp-raw">
  <div class="demo-row">
    <weui-icon type="success" msg />
    <weui-icon type="info-circle" msg />
    <weui-icon type="warn" msg />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-icon type="success" msg />
  <weui-icon type="info-circle" msg />
  <weui-icon type="warn" msg />
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 图标类型，对应 `weui-icon-{type}` 类，见上方「图标类型」 | `string` | — |
| size | 图标尺寸；数字按 px 处理，带单位字符串原样映射到 `font-size` | `number \| string` | — |
| color | 图标颜色 | `string` | — |
| msg | 消息页大图标样式 | `boolean` | `false` |
| extClass | 业务自定义扩展类名 | `string` | — |

<style>
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.icon-grid__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 88px;
  padding: 12px 4px;
  border-radius: 4px;
  cursor: pointer;
}
.icon-grid__item:hover {
  background: #f5f5f5;
}
.icon-grid__label {
  margin-top: 8px;
  font-size: 12px;
  color: #888;
  text-align: center;
}
</style>
