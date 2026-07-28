<script setup lang="ts">
import { ref } from 'vue'

const gridList = [
  { icon: 'success', label: '成功' },
  { icon: 'info', label: '信息' },
  { icon: 'warn', label: '警告' },
  { icon: 'waiting', label: '等待' },
  { icon: 'cancel', label: '取消' },
  { icon: 'download', label: '下载' },
  { icon: 'search', label: '搜索' },
  { icon: 'clear', label: '清除' },
  { icon: 'delete', label: '删除' },
]

const plainList = ['宫格一', '宫格二', '宫格三', '宫格四', '宫格五', '宫格六']

const clickCount = ref(0)
const lastLabel = ref('')
const onGridClick = (label: string) => {
  clickCount.value++
  lastLabel.value = label
}
</script>

# Grid 宫格

用于按等分网格展示一组功能入口，常见于九宫格菜单。`weui-grid` 提供宫格容器，`weui-grid-item` 提供单个宫格（默认三列一行）。

## 基础用法

`weui-grid` 作为宫格容器，内部使用 `weui-grid-item`。通过 `#icon` 插槽传入图标，`label` 属性传入文字。

<div class="demo-block demo-mobile vp-raw">
  <weui-grid>
    <weui-grid-item v-for="item in gridList" :key="item.label" :label="item.label" @click="onGridClick(item.label)">
      <template #icon><weui-icon :type="item.icon" /></template>
    </weui-grid-item>
  </weui-grid>
</div>

::: details 查看代码
```vue
<template>
  <weui-grid>
    <weui-grid-item v-for="item in gridList" :key="item.label" :label="item.label">
      <template #icon><weui-icon :type="item.icon" /></template>
    </weui-grid-item>
  </weui-grid>
</template>

<script setup lang="ts">
const gridList = [
  { icon: 'success', label: '成功' },
  { icon: 'info', label: '信息' },
  { icon: 'warn', label: '警告' },
  { icon: 'waiting', label: '等待' },
  { icon: 'cancel', label: '取消' },
  { icon: 'download', label: '下载' },
  { icon: 'search', label: '搜索' },
  { icon: 'clear', label: '清除' },
  { icon: 'delete', label: '删除' },
]
</script>
```
:::

## 无图标

仅传 `label` 时，宫格只渲染文字，不渲染图标区域。

<div class="demo-block demo-mobile vp-raw">
  <weui-grid>
    <weui-grid-item v-for="(label, i) in plainList" :key="i" :label="label" />
  </weui-grid>
</div>

::: details 查看代码
```vue
<template>
  <weui-grid>
    <weui-grid-item label="宫格一" />
    <weui-grid-item label="宫格二" />
    <weui-grid-item label="宫格三" />
    <weui-grid-item label="宫格四" />
    <weui-grid-item label="宫格五" />
    <weui-grid-item label="宫格六" />
  </weui-grid>
</template>
```
:::

## 自定义内容

通过默认插槽传入自定义内容，覆盖 `icon` 与 `label`。

<div class="demo-block demo-mobile vp-raw">
  <weui-grid>
    <weui-grid-item>
      <div style="text-align:center;padding:16px 0;">
        <span style="font-size:24px;color:#07c160;">A</span>
      </div>
    </weui-grid-item>
    <weui-grid-item>
      <div style="text-align:center;padding:16px 0;">
        <span style="font-size:24px;color:#10aeff;">B</span>
      </div>
    </weui-grid-item>
    <weui-grid-item>
      <div style="text-align:center;padding:16px 0;">
        <span style="font-size:24px;color:#fa5151;">C</span>
      </div>
    </weui-grid-item>
  </weui-grid>
</div>

::: details 查看代码
```vue
<template>
  <weui-grid>
    <weui-grid-item>
      <div style="text-align:center;padding:16px 0;">
        <span style="font-size:24px;color:#07c160;">A</span>
      </div>
    </weui-grid-item>
    <weui-grid-item>
      <div style="text-align:center;padding:16px 0;">
        <span style="font-size:24px;color:#10aeff;">B</span>
      </div>
    </weui-grid-item>
    <weui-grid-item>
      <div style="text-align:center;padding:16px 0;">
        <span style="font-size:24px;color:#fa5151;">C</span>
      </div>
    </weui-grid-item>
  </weui-grid>
</template>
```
:::

## 点击事件

`weui-grid-item` 触发 `click` 事件，常用于跳转页面或执行操作。点击下方宫格查看事件响应。

<div class="demo-block demo-mobile vp-raw">
  <weui-grid>
    <weui-grid-item v-for="item in gridList" :key="item.label" :label="item.label" @click="onGridClick(item.label)">
      <template #icon><weui-icon :type="item.icon" /></template>
    </weui-grid-item>
  </weui-grid>
  <p v-if="clickCount > 0" style="margin-top:12px;color:#07c160;">
    已点击 {{ clickCount }} 次，最近一次：{{ lastLabel }}
  </p>
</div>

::: details 查看代码
```vue
<template>
  <weui-grid>
    <weui-grid-item v-for="item in gridList" :key="item.label" :label="item.label" @click="onGridClick(item.label)">
      <template #icon><weui-icon :type="item.icon" /></template>
    </weui-grid-item>
  </weui-grid>
  <p v-if="clickCount > 0">已点击 {{ clickCount }} 次，最近一次：{{ lastLabel }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const clickCount = ref(0)
const lastLabel = ref('')
const onGridClick = (label: string) => {
  clickCount.value++
  lastLabel.value = label
}
const gridList = [
  { icon: 'success', label: '成功' },
  { icon: 'info', label: '信息' },
  { icon: 'warn', label: '警告' },
]
</script>
```
:::

## Grid Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## GridItem Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 URL 或 base64 | `string` | — |
| label | 文字标签 | `string` | — |
| url | 跳转链接；H5 渲染真实 `href`，小程序端调用 `uni.navigateTo` | `string` | — |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## GridItem Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击宫格时触发 | `event: Event` |
| navigate | `url` 非空时点击触发；H5 同时保留原生链接跳转，小程序端调用 `uni.navigateTo` | `(payload: { url: string })` |

## GridItem Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义宫格全部内容，传入后覆盖 `icon` 与 `label` |
| icon | 自定义图标内容（如 `weui-icon`） |
| label | 自定义文字内容 |
