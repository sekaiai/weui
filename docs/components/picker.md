# Picker 选择器

底部滑入式选择器组件，支持单列和多列选择。支持声明式和命令式两种调用方式。滚动列采用触摸交互，松手后自动归位到最近一项。

> **uni-app 平台限制：** 产物保留遮罩、头部和外层 picker 结构，但不在组件内部自动引入 `weui-picker-group`，因此列区域为空。Vue 3/H5 保持完整列渲染行为。

<script setup lang="ts">
import { ref } from 'vue'
import { Picker, type PickerColumn } from 'weui-uniapp-design'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const lastResult = ref('')

const singleColumn: PickerColumn[] = [
  {
    options: [
      { label: '选项一', value: 'a' },
      { label: '选项二', value: 'b' },
      { label: '选项三', value: 'c' },
    ],
  },
]

const dateColumns: PickerColumn[] = [
  {
    options: [
      { label: '2024 年', value: 2024 },
      { label: '2025 年', value: 2025 },
      { label: '2026 年', value: 2026 },
    ],
  },
  {
    options: [
      { label: '1 月', value: 1 },
      { label: '2 月', value: 2 },
      { label: '3 月', value: 3 },
    ],
  },
  {
    options: [
      { label: '1 日', value: 1 },
      { label: '15 日', value: 15 },
      { label: '28 日', value: 28 },
    ],
    index: 1,
  },
]

const initialColumn: PickerColumn[] = [
  {
    options: [
      { label: '选项一', value: 'a' },
      { label: '选项二', value: 'b' },
      { label: '选项三', value: 'c' },
      { label: '选项四', value: 'd' },
    ],
    index: 2,
  },
]

const disabledColumn: PickerColumn[] = [
  {
    options: [
      { label: '可选一', value: 'a' },
      { label: '禁用项', value: 'b', disabled: true },
      { label: '可选三', value: 'c' },
    ],
  },
]

const onConfirm = (indexes: number[], values: (string | number)[]) => {
  lastResult.value = `选中索引：[${indexes.join(', ')}]，值：[${values.join(', ')}]`
}

const onImperative = async () => {
  const result = await Picker.show({ title: '命令式选择', columns: singleColumn })
  if (result.action === 'confirm') {
    lastResult.value = `命令式确认：[${result.values.join(', ')}]`
  } else {
    lastResult.value = '命令式取消'
  }
}
</script>

<weui-overlay-host />

## 基础用法

通过 `v-model:visible` 控制显示，`columns` 设置列配置，`title` 设置标题。点击确定触发 `confirm` 事件，回调参数为 `(indexes, values)`。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show1 = true">显示 Picker</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
  <weui-picker
    v-model:visible="show1"
    title="请选择"
    :columns="singleColumn"
    @confirm="onConfirm"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示 Picker</weui-button>
  <weui-picker
    v-model:visible="show"
    title="请选择"
    :columns="columns"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PickerColumn } from 'weui-uniapp-design'

const show = ref(false)
const columns: PickerColumn[] = [
  {
    options: [
      { label: '选项一', value: 'a' },
      { label: '选项二', value: 'b' },
      { label: '选项三', value: 'c' },
    ],
  },
]

const onConfirm = (indexes: number[], values: (string | number)[]) => {
  console.log('选中', indexes, values)
}
</script>
```
:::

## 多列选择

通过 `columns` 传入多列配置，每列独立的 `options` 与可选的初始 `index`。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show2 = true">显示多列 Picker</weui-button>
  <weui-picker
    v-model:visible="show2"
    title="请选择日期"
    :columns="dateColumns"
    @confirm="onConfirm"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示多列 Picker</weui-button>
  <weui-picker
    v-model:visible="show"
    title="请选择日期"
    :columns="columns"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PickerColumn } from 'weui-uniapp-design'

const show = ref(false)
const columns: PickerColumn[] = [
  {
    options: [
      { label: '2024 年', value: 2024 },
      { label: '2025 年', value: 2025 },
      { label: '2026 年', value: 2026 },
    ],
  },
  {
    options: [
      { label: '1 月', value: 1 },
      { label: '2 月', value: 2 },
      { label: '3 月', value: 3 },
    ],
  },
  {
    options: [
      { label: '1 日', value: 1 },
      { label: '15 日', value: 15 },
      { label: '28 日', value: 28 },
    ],
    index: 1,
  },
]
</script>
```
:::

## 带初始选中

通过 `PickerColumn.index` 设置每列的初始选中索引。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show3 = true">显示初始选中 Picker</weui-button>
  <weui-picker
    v-model:visible="show3"
    title="请选择"
    :columns="initialColumn"
    @confirm="onConfirm"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示初始选中 Picker</weui-button>
  <weui-picker
    v-model:visible="show"
    title="请选择"
    :columns="columns"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PickerColumn } from 'weui-uniapp-design'

const show = ref(false)
const columns: PickerColumn[] = [
  {
    options: [
      { label: '选项一', value: 'a' },
      { label: '选项二', value: 'b' },
      { label: '选项三', value: 'c' },
      { label: '选项四', value: 'd' },
    ],
    index: 2,
  },
]
</script>
```
:::

## 禁用选项

通过 `PickerOption.disabled` 标记选项为禁用，渲染时添加 `weui-picker__item_disabled` 样式。滚动停在禁用项时，Picker 会自动归位到最近的可选项；初始 `index` 指向禁用项时同样会自动避开。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show4 = true">显示含禁用项 Picker</weui-button>
  <weui-picker
    v-model:visible="show4"
    title="请选择"
    :columns="disabledColumn"
    @confirm="onConfirm"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示含禁用项 Picker</weui-button>
  <weui-picker
    v-model:visible="show"
    title="请选择"
    :columns="columns"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PickerColumn } from 'weui-uniapp-design'

const show = ref(false)
const columns: PickerColumn[] = [
  {
    options: [
      { label: '可选一', value: 'a' },
      { label: '禁用项', value: 'b', disabled: true },
      { label: '可选三', value: 'c' },
    ],
  },
]
</script>
```
:::

## 自定义按钮文字

通过 `cancel-text` 和 `confirm-text` 自定义取消/确定按钮文字。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show5 = true">显示自定义按钮 Picker</weui-button>
  <weui-picker
    v-model:visible="show5"
    title="请选择"
    cancel-text="关闭"
    confirm-text="完成"
    :columns="singleColumn"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示自定义按钮 Picker</weui-button>
  <weui-picker
    v-model:visible="show"
    title="请选择"
    cancel-text="关闭"
    confirm-text="完成"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PickerColumn } from 'weui-uniapp-design'

const show = ref(false)
const columns: PickerColumn[] = [
  {
    options: [
      { label: '选项一', value: 'a' },
      { label: '选项二', value: 'b' },
    ],
  },
]
</script>
```
:::

## 禁用遮罩点击

通过 `:mask-closable="false"` 禁用点击遮罩关闭，用户必须点击取消或确定。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show6 = true">显示 Picker</weui-button>
  <weui-picker
    v-model:visible="show6"
    title="点击遮罩不关闭"
    :mask-closable="false"
    :columns="singleColumn"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示 Picker</weui-button>
  <weui-picker
    v-model:visible="show"
    title="点击遮罩不关闭"
    :mask-closable="false"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PickerColumn } from 'weui-uniapp-design'

const show = ref(false)
const columns: PickerColumn[] = [{ options: [{ label: '选项一', value: 'a' }] }]
</script>
```
:::

## 命令式调用

通过 `Picker.show(options)` 命令式调用，无需在模板中声明组件。返回 Promise，确定时 resolve `{ action: 'confirm', indexes, values }`，取消/遮罩点击时 resolve `{ action: 'cancel', indexes: [], values: [] }`。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="onImperative">Picker.show</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="showImp">Picker.show</weui-button>
</template>

<script setup lang="ts">
import { Picker, type PickerColumn } from 'weui-uniapp-design'

const columns: PickerColumn[] = [
  {
    options: [
      { label: '选项一', value: 'a' },
      { label: '选项二', value: 'b' },
    ],
  },
]

const showImp = async () => {
  const result = await Picker.show({ title: '命令式选择', columns })
  if (result.action === 'confirm') {
    console.log('选中', result.indexes, result.values)
  }
}
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | boolean | false |
| columns | 多列配置 | PickerColumn[] | [] |
| title | 标题 | string | — |
| cancel-text | 取消按钮文字 | string | '取消' |
| confirm-text | 确定按钮文字 | string | '确定' |
| mask-closable | 点击遮罩是否关闭 | boolean | true |
| ext-class | 自定义附加类名 | string | — |
| z-index | z-index（命令式调用时由 overlay-host 注入） | number | — |

### PickerColumn

| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 列选项 | PickerOption[] | — |
| index | 初始选中索引 | number | 0 |

### PickerOption

| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 显示文字 | string | — |
| value | 选项值 | string \| number | — |
| disabled | 是否禁用；不会成为当前选中项 | boolean | false |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态变化时触发 | (value: boolean) |
| change | 列滚动归位后触发（每列独立） | (indexes: number[], values: (string\|number)[]) |
| confirm | 点击确定时触发 | (indexes: number[], values: (string\|number)[]) |
| cancel | 点击取消时触发 | — |
| close | 关闭时触发 | — |

## 命令式 API

### Picker.show(options): `Promise<PickerShowResult>`

显示选择器。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | — |
| columns | 多列配置 | PickerColumn[] | — |
| cancelText | 取消按钮文字 | string | '取消' |
| confirmText | 确定按钮文字 | string | '确定' |
| maskClosable | 点击遮罩是否关闭 | boolean | true |
| extClass | 自定义附加类名 | string | — |

返回 Promise，resolve 值结构：

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| action | 触发动作 | 'confirm' \| 'cancel' |
| indexes | 各列选中索引（cancel 时为空数组） | number[] |
| values | 各列选中值（cancel 时为空数组） | (string\|number)[] |
