# Searchbar 搜索栏

搜索栏组件，用于输入搜索关键词。支持聚焦/失焦状态切换、清除输入、取消搜索、键盘确认搜索及自定义搜索按钮。

## 基础用法

通过 `v-model` 绑定搜索关键词，`placeholder` 设置占位提示。未聚焦时展示占位文字，聚焦后展示输入框与取消按钮。

```vue
<template>
  <weui-searchbar v-model="value" placeholder="搜索" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```

## 自动聚焦

`focus` 让搜索栏在渲染时自动获取焦点，直接进入输入状态。

```vue
<template>
  <weui-searchbar v-model="value" focus placeholder="自动聚焦" />
</template>
```

## 自定义取消按钮

`cancelText` 自定义取消按钮文字，点击取消按钮时触发 `cancel` 事件并退出聚焦状态。

```vue
<template>
  <weui-searchbar v-model="value" cancel-text="返回" @cancel="onCancel" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
const onCancel = () => {
  console.log('用户取消了搜索')
}
</script>
```

## 搜索按钮

`searchButtonText` 设置后显示搜索按钮（替代取消按钮）。点击搜索按钮触发 `search` 事件，携带当前输入值。

```vue
<template>
  <weui-searchbar
    v-model="value"
    search-button-text="搜索"
    @search="onSearch"
  />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
const onSearch = (val) => {
  console.log('搜索：', val)
}
</script>
```

## 键盘确认搜索

输入框设置了 `confirm-type="search"`，用户点击键盘上的搜索键时会触发 `confirm` 事件，并同时触发 `search` 事件携带当前值。

```vue
<template>
  <weui-searchbar v-model="value" @confirm="onConfirm" @search="onSearch" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
const onConfirm = () => {
  console.log('键盘确认')
}
const onSearch = (val) => {
  console.log('搜索：', val)
}
</script>
```

## 扩展类名

通过 `extClass` 追加自定义类名到根元素，用于定制样式。

```vue
<template>
  <weui-searchbar v-model="value" ext-class="my-searchbar" />
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | v-model 绑定值 | `string` | `''` |
| placeholder | 占位提示文字 | `string` | `'搜索'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| focus | 是否自动聚焦 | `boolean` | `false` |
| searchButtonText | 搜索按钮文字，不设置则只显示取消按钮 | `string` | — |
| extClass | 根元素扩展类名 | `string` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 输入值变化时触发 | `(value: string)` |
| focus | 输入框获得焦点时触发 | `(event)` |
| blur | 输入框失去焦点时触发 | `(event)` |
| confirm | 用户点击键盘搜索键时触发 | `(event)` |
| cancel | 点击取消按钮时触发 | — |
| clear | 点击清除按钮时触发 | — |
| search | 点击搜索按钮或键盘确认时触发 | `(value: string)` |
