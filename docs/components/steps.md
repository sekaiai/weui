# Steps 步骤条

引导用户按流程完成任务的导航条，常用于表单分步、订单流程、引导页等场景。支持水平（`horizontal`）与垂直（`vertical`）两种方向。

<script setup lang="ts">
const basicSteps = [
  { title: '步骤一', desc: '描述一' },
  { title: '步骤二', desc: '描述二' },
  { title: '步骤三', desc: '描述三' },
]
const titleOnlySteps = [
  { title: '第一步' },
  { title: '第二步' },
  { title: '第三步' },
]
</script>

## 基础用法

通过 `steps` 属性传入步骤列表（`{ title, desc? }`），`current` 指定当前步骤索引。索引小于 `current` 的步骤会标记为已完成（追加 `weui-steps__item_success` 类）。

<div class="demo-block">
  <weui-steps :steps="basicSteps" :current="1" />
</div>

::: details 查看代码
```vue
<template>
  <weui-steps
    :steps="[
      { title: '步骤一', desc: '描述一' },
      { title: '步骤二', desc: '描述二' },
      { title: '步骤三', desc: '描述三' },
    ]"
    :current="1"
  />
</template>
```
:::

## 垂直方向

通过 `direction="vertical"` 切换为垂直布局，适合步骤较多或描述较长的场景。

<div class="demo-block">
  <weui-steps :steps="basicSteps" :current="1" direction="vertical" />
</div>

::: details 查看代码
```vue
<template>
  <weui-steps
    :steps="[
      { title: '步骤一', desc: '描述一' },
      { title: '步骤二', desc: '描述二' },
      { title: '步骤三', desc: '描述三' },
    ]"
    :current="1"
    direction="vertical"
  />
</template>
```
:::

## 不同进度

通过调整 `current` 控制已完成步骤的数量。以下三个示例分别展示 `current=0`（未开始）、`current=1`（进行中）、`current=2`（即将完成）。

<div class="demo-block">
  <div class="demo-row" style="flex-direction: column; align-items: stretch; gap: 16px;">
    <div>
      <p style="margin-bottom: 4px; color: #888;">current = 0</p>
      <weui-steps :steps="titleOnlySteps" :current="0" />
    </div>
    <div>
      <p style="margin-bottom: 4px; color: #888;">current = 1</p>
      <weui-steps :steps="titleOnlySteps" :current="1" />
    </div>
    <div>
      <p style="margin-bottom: 4px; color: #888;">current = 2</p>
      <weui-steps :steps="titleOnlySteps" :current="2" />
    </div>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-steps :steps="titleOnlySteps" :current="0" />
  <weui-steps :steps="titleOnlySteps" :current="1" />
  <weui-steps :steps="titleOnlySteps" :current="2" />
</template>

<script setup lang="ts">
const titleOnlySteps = [
  { title: '第一步' },
  { title: '第二步' },
  { title: '第三步' },
]
</script>
```
:::

## 带描述

`desc` 为可选字段，传入后会在标题下方渲染描述文字。不传时不渲染描述区域。

<div class="demo-block">
  <weui-steps :steps="basicSteps" :current="2" />
</div>

::: details 查看代码
```vue
<template>
  <weui-steps
    :steps="[
      { title: '步骤一', desc: '描述一' },
      { title: '步骤二', desc: '描述二' },
      { title: '步骤三', desc: '描述三' },
    ]"
    :current="2"
  />
</template>
```
:::

## 仅标题

`desc` 为可选字段，不传时仅渲染标题，适合简洁的分步提示场景。

<div class="demo-block">
  <weui-steps :steps="titleOnlySteps" :current="0" />
</div>

::: details 查看代码
```vue
<template>
  <weui-steps
    :steps="[
      { title: '第一步' },
      { title: '第二步' },
      { title: '第三步' },
    ]"
    :current="0"
  />
</template>
```
:::

## 扩展类名

通过 `extClass` 追加自定义类名到根元素，便于在父容器中定制样式。

<div class="demo-block">
  <weui-steps :steps="titleOnlySteps" :current="0" ext-class="my-steps" />
</div>

::: details 查看代码
```vue
<template>
  <weui-steps
    :steps="[
      { title: '第一步' },
      { title: '第二步' },
    ]"
    :current="0"
    ext-class="my-steps"
  />
</template>
```
:::

## 步骤状态说明

`weui-steps` 根据 `current` 与每个步骤的索引（`index`）决定状态：

- `index < current`：已完成，item 追加 `weui-steps__item_success` 类
- `index >= current`：未完成，无额外类名

::: tip
组件不区分"进行中"与"未开始"的样式类，仅通过 `weui-steps__item_success` 标记已完成步骤。如需更细致的状态展示，可在 `steps` 数据中扩展自定义字段并配合 `extClass` 实现。
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| steps | 步骤列表 | `Array<{ title: string; desc?: string }>` | — |
| current | 当前步骤索引（小于该值的步骤标记为已完成） | `number` | `0` |
| direction | 方向，可选 `horizontal` / `vertical` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## StepItem 数据结构

| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题 | `string` | — |
| desc | 步骤描述（可选） | `string` | — |
