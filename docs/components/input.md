# Input 输入框

封装原生 `input` 标签，提供文本输入、数字输入、密码输入等能力，支持清除按钮与 `v-model` 双向绑定。

## 基础用法

通过 `v-model` 绑定输入值，`placeholder` 设置占位提示。

```vue
<template>
  <weui-input v-model="text" placeholder="请输入文本" />
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
</script>
```

## 输入类型

`type` 支持 `text`、`number`、`idcard`、`digit`、`password`。`password` 会使用原生 `password` 属性进行遮掩。

```vue
<template>
  <weui-input v-model="value" type="number" placeholder="请输入数字" />
  <weui-input v-model="pwd" type="password" placeholder="请输入密码" />
</template>
```

## 最大长度

`maxlength` 控制最大输入长度，默认 `140`；传 `-1` 表示不限制。

```vue
<template>
  <weui-input v-model="value" :maxlength="20" placeholder="最多20字" />
  <weui-input v-model="long" :maxlength="-1" placeholder="不限长度" />
</template>
```

## 清除按钮

`clearable` 开启后，输入框有值时右侧显示清除按钮，点击触发 `clear` 事件并清空内容。

```vue
<template>
  <weui-input v-model="value" clearable placeholder="输入后可清除" />
</template>
```

## 禁用状态

`disabled` 禁用输入框，同时隐藏清除按钮。

```vue
<template>
  <weui-input v-model="value" disabled placeholder="不可编辑" />
</template>
```

## 自动聚焦

`focus` 让输入框在渲染时自动获取焦点。

```vue
<template>
  <weui-input v-model="value" focus placeholder="自动聚焦" />
</template>
```

## 扩展类名

通过 `extClass` 追加自定义类名到根元素，用于定制样式。

```vue
<template>
  <weui-input v-model="value" ext-class="my-input" placeholder="自定义样式" />
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | v-model 绑定值 | `string` | `''` |
| placeholder | 占位提示文字 | `string` | — |
| type | 输入类型，`password` 时使用原生 password 属性 | `'text' \| 'number' \| 'idcard' \| 'digit' \| 'password'` | `'text'` |
| disabled | 是否禁用 | `boolean` | `false` |
| maxlength | 最大输入长度，`-1` 为不限制 | `number` | `140` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| focus | 获取焦点 | `boolean` | `false` |
| extClass | 根元素扩展类名 | `string` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 输入值变化时触发 | `(value: string)` |
| focus | 输入框获得焦点时触发 | `(event)` |
| blur | 输入框失去焦点时触发 | `(event)` |
| confirm | 点击完成键时触发 | `(event)` |
| clear | 点击清除按钮时触发 | — |
