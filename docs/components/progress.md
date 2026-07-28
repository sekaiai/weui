# Progress 进度条

用于展示任务或活动的当前进度，常用于文件上传、下载、表单填写等场景。

<script setup lang="ts">
import { ref } from 'vue'

const dynamicPercent = ref(30)
const uploadPercent = ref(50)

const increase = () => {
  dynamicPercent.value = Math.min(100, dynamicPercent.value + 20)
}
const decrease = () => {
  dynamicPercent.value = Math.max(0, dynamicPercent.value - 20)
}
const cancelUpload = () => {
  uploadPercent.value = 0
}
</script>

## 基础用法

通过 `percent` 属性设置进度百分比（0-100）。默认带有 WeUI 官方的取消操作；百分比通过隐藏的 `role="alert"` 文本提供给辅助技术，而不会额外改变页面视觉。

<div class="demo-block vp-raw">
  <weui-progress :percent="50" />
</div>

::: details 查看代码
```vue
<template>
  <weui-progress :percent="50" />
</template>
```
:::

## 不同进度

通过不同的 `percent` 展示不同完成度。`percent` 会被限制在 0-100 范围内。

<div class="demo-block vp-raw">
  <div class="demo-row" style="flex-direction: column; align-items: stretch; gap: 12px;">
    <weui-progress :percent="0" />
    <weui-progress :percent="30" />
    <weui-progress :percent="60" />
    <weui-progress :percent="100" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-progress :percent="0" />
  <weui-progress :percent="30" />
  <weui-progress :percent="60" />
  <weui-progress :percent="100" />
</template>
```
:::

## 动态进度

结合按钮与响应式数据，可动态控制进度条变化。

<div class="demo-block vp-raw">
  <weui-progress :percent="dynamicPercent" />
  <div class="demo-row" style="margin-top: 12px;">
    <weui-button size="mini" @click="decrease">- 20</weui-button>
    <weui-button size="mini" type="primary" @click="increase">+ 20</weui-button>
  </div>
  <p style="margin-top: 8px; color: #07c160;">当前进度：{{ dynamicPercent }}%</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-progress :percent="dynamicPercent" />
  <weui-button size="mini" @click="decrease">- 20</weui-button>
  <weui-button size="mini" type="primary" @click="increase">+ 20</weui-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dynamicPercent = ref(30)
const increase = () => {
  dynamicPercent.value = Math.min(100, dynamicPercent.value + 20)
}
const decrease = () => {
  dynamicPercent.value = Math.max(0, dynamicPercent.value - 20)
}
</script>
```
:::

## 取消操作

通过 `cancel` 事件处理右侧取消图标。设置 `show-operation="false"` 可隐藏该操作；`show-info="false"` 则不输出辅助技术用的百分比文本。

<div class="demo-block vp-raw">
  <weui-progress :percent="uploadPercent" @cancel="cancelUpload" />
  <p style="margin-top: 8px; color: #576b95;">点击取消图标可将当前进度重置为 0%。</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-progress :percent="50" @cancel="cancelUpload" />
</template>

<script setup lang="ts">
const cancelUpload = () => {
  // 取消上传或其他进行中的任务
}
</script>
```
:::

## 自定义激活颜色

通过 `activeColor` 属性设置进度条前景色，适用于不同语义（成功、警告、危险等）。

<div class="demo-block vp-raw">
  <div class="demo-row" style="flex-direction: column; align-items: stretch; gap: 12px;">
    <weui-progress :percent="80" active-color="#10aeff" />
    <weui-progress :percent="60" active-color="#fa9d3b" />
    <weui-progress :percent="40" active-color="#fa5151" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-progress :percent="80" active-color="#10aeff" />
  <weui-progress :percent="60" active-color="#fa9d3b" />
  <weui-progress :percent="40" active-color="#fa5151" />
</template>
```
:::

## 自定义粗细

通过 `strokeWidth` 属性设置进度条高度（px），不传时使用 weui 默认高度。

<div class="demo-block vp-raw">
  <div class="demo-row" style="flex-direction: column; align-items: stretch; gap: 12px;">
    <weui-progress :percent="50" :stroke-width="3" />
    <weui-progress :percent="50" :stroke-width="6" />
    <weui-progress :percent="50" :stroke-width="12" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-progress :percent="50" :stroke-width="3" />
  <weui-progress :percent="50" :stroke-width="6" />
  <weui-progress :percent="50" :stroke-width="12" />
</template>
```
:::

## 自定义背景色

通过 `backgroundColor` 属性设置进度条背景色。

<div class="demo-block vp-raw">
  <weui-progress :percent="70" background-color="#ededed" />
</div>

::: details 查看代码
```vue
<template>
  <weui-progress :percent="70" background-color="#ededed" />
</template>
```
:::

## 组合使用

`strokeWidth`、`activeColor`、`backgroundColor` 可组合使用以匹配自定义视觉风格。

<div class="demo-block vp-raw">
  <weui-progress
    :percent="75"
    :stroke-width="8"
    active-color="#07c160"
    background-color="#e5e5e5"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-progress
    :percent="75"
    :stroke-width="8"
    active-color="#07c160"
    background-color="#e5e5e5"
  />
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 进度百分比 0-100（超出范围会被限制） | `number` | — |
| showInfo | 是否输出辅助技术用的百分比文本 | `boolean` | `true` |
| showOperation | 是否显示官方取消操作 | `boolean` | `true` |
| cancelText | 默认取消图标的辅助文字 | `string` | `'取消'` |
| strokeWidth | 进度条高度 px | `number` | — |
| activeColor | 进度条激活颜色 | `string` | — |
| backgroundColor | 进度条背景色 | `string` | — |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| cancel | 点击官方取消操作时触发 | — |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| operation | 自定义右侧操作内容 |
