# Loadmore 加载更多

用于列表底部展示加载状态，支持加载中、分割线、点点三种样式，常见于列表上拉加载和"暂无更多数据"提示。

## 基础用法

默认 `type` 为 `default`，渲染官方 `.weui-primary-loading` 及文字，文字默认为"正在加载"。

<div class="demo-block vp-raw">
  <weui-loadmore />
</div>

::: details 查看代码
```vue
<template>
  <weui-loadmore />
</template>
```
:::

## 分割线样式

设置 `type` 为 `line`，渲染分割线和文字，常用于"暂无数据"分隔场景。

<div class="demo-block vp-raw">
  <weui-loadmore type="line" text="暂无数据" />
</div>

::: details 查看代码
```vue
<template>
  <weui-loadmore type="line" text="暂无数据" />
</template>
```
:::

## 点点样式

设置 `type` 为 `dot`，渲染官方点点样式，常用于列表底部"已无更多数据"的视觉提示。该模式将状态文字保留给辅助技术，不在视觉上显示文字。

<div class="demo-block vp-raw">
  <weui-loadmore type="dot" />
</div>

::: details 查看代码
```vue
<template>
  <weui-loadmore type="dot" />
</template>
```
:::

## 自定义文字

通过 `text` 属性自定义文字内容，适用于不同业务场景的加载提示。

<div class="demo-block vp-raw">
  <weui-loadmore text="正在加载更多" />
  <weui-loadmore type="line" text="没有更多了" />
</div>

::: details 查看代码
```vue
<template>
  <weui-loadmore text="正在加载更多" />
  <weui-loadmore type="line" text="没有更多了" />
</template>
```
:::

## 隐藏文字

通过 `showText` 属性控制 default / line 模式的可见文字；dot 模式始终保留视觉圆点，并隐藏状态文字。

<div class="demo-block vp-raw">
  <weui-loadmore :show-text="false" />
  <weui-loadmore type="dot" :show-text="false" />
</div>

::: details 查看代码
```vue
<template>
  <weui-loadmore :show-text="false" />
  <weui-loadmore type="dot" :show-text="false" />
</template>
```
:::

## 三种样式对比

<div class="demo-block vp-raw">
  <weui-loadmore text="加载中" />
  <weui-loadmore type="line" text="暂无数据" />
  <weui-loadmore type="dot" text="已无更多" />
</div>

::: details 查看代码
```vue
<template>
  <weui-loadmore text="加载中" />
  <weui-loadmore type="line" text="暂无数据" />
  <weui-loadmore type="dot" text="已无更多" />
</template>
```
:::

## 扩展类名

通过 `extClass` 属性追加自定义类名，用于在父容器中定制样式（如调整间距）。

<div class="demo-block vp-raw">
  <weui-loadmore ext-class="my-loadmore" />
</div>

::: details 查看代码
```vue
<template>
  <weui-loadmore ext-class="my-loadmore" />
</template>
```
:::

## 列表加载场景

加载更多组件常配合列表使用，放在列表底部作为加载或结束提示：

::: details 查看代码
```vue
<template>
  <div class="weui-cells">
    <div class="weui-cell" v-for="item in list" :key="item.id">
      <div class="weui-cell__bd">{{ item.text }}</div>
    </div>
  </div>
  <weui-loadmore v-if="loading" text="正在加载" />
  <weui-loadmore v-else-if="finished" type="line" text="暂无更多数据" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
const finished = ref(true)
const list = ref([{ id: 1, text: '列表项一' }, { id: 2, text: '列表项二' }])
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 显示模式：`default` 加载图标+文字，`line` 分割线+文字，`dot` 点点样式 | `'default' \| 'line' \| 'dot'` | `'default'` |
| text | 文字内容 | `string` | `'正在加载'` |
| showText | 是否显示 default / line 模式的可见文字 | `boolean` | `true` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |
