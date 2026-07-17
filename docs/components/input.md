# Input 输入框

封装原生 `input` 标签，提供文本输入、数字输入、密码输入等能力，支持清除按钮与 `v-model` 双向绑定。

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const numberValue = ref('')
const idcard = ref('')
const digit = ref('')
const password = ref('')
const limited = ref('')
const clearableValue = ref('')
const disabledValue = ref('不可编辑的内容')
const focusValue = ref('')
const focusTriggered = ref(false)
</script>

## 基础用法

通过 `v-model` 绑定输入值，`placeholder` 设置占位提示。

<div class="demo-block">
  <div class="demo-mobile">
    <div class="weui-cell weui-cell_active">
      <div class="weui-cell__bd">
        <weui-input v-model="text" placeholder="请输入文本" />
      </div>
    </div>
  </div>
  <p style="margin-top: 8px; color: #576b95;">当前值：{{ text }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-input v-model="text" placeholder="请输入文本" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
</script>
```
:::

## 输入类型

`type` 支持 `text`、`number`、`idcard`、`digit`、`password`。`password` 会使用原生 `password` 属性进行遮掩。

<div class="demo-block">
  <div class="demo-mobile">
    <div class="weui-cell weui-cell_active">
      <div class="weui-cell__hd"><label class="weui-label">数字</label></div>
      <div class="weui-cell__bd">
        <weui-input v-model="numberValue" type="number" placeholder="请输入数字" />
      </div>
    </div>
    <div class="weui-cell weui-cell_active">
      <div class="weui-cell__hd"><label class="weui-label">身份证</label></div>
      <div class="weui-cell__bd">
        <weui-input v-model="idcard" type="idcard" placeholder="请输入身份证号" />
      </div>
    </div>
    <div class="weui-cell weui-cell_active">
      <div class="weui-cell__hd"><label class="weui-label">小数</label></div>
      <div class="weui-cell__bd">
        <weui-input v-model="digit" type="digit" placeholder="请输入数字（带小数）" />
      </div>
    </div>
    <div class="weui-cell weui-cell_active">
      <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
      <div class="weui-cell__bd">
        <weui-input v-model="password" type="password" placeholder="请输入密码" />
      </div>
    </div>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-input v-model="numberValue" type="number" placeholder="请输入数字" />
  <weui-input v-model="idcard" type="idcard" placeholder="请输入身份证号" />
  <weui-input v-model="digit" type="digit" placeholder="请输入数字（带小数）" />
  <weui-input v-model="password" type="password" placeholder="请输入密码" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const numberValue = ref('')
const idcard = ref('')
const digit = ref('')
const password = ref('')
</script>
```
:::

## 清除按钮

`clearable` 开启后，输入框有值时右侧显示清除按钮，点击触发 `clear` 事件并清空内容。

<div class="demo-block">
  <div class="demo-mobile">
    <div class="weui-cell weui-cell_active">
      <div class="weui-cell__hd"><label class="weui-label">可清除</label></div>
      <div class="weui-cell__bd">
        <weui-input v-model="clearableValue" clearable placeholder="输入后点击右侧清除" />
      </div>
    </div>
  </div>
  <p style="margin-top: 8px; color: #576b95;">当前值：{{ clearableValue }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-input v-model="value" clearable placeholder="输入后点击右侧清除" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 最大长度

`maxlength` 控制最大输入长度，默认 `140`；传 `-1` 表示不限制。

<div class="demo-block">
  <div class="demo-mobile">
    <div class="weui-cell weui-cell_active">
      <div class="weui-cell__bd">
        <weui-input v-model="limited" :maxlength="5" placeholder="最多输入 5 个字" />
      </div>
    </div>
  </div>
  <p style="margin-top: 8px; color: #576b95;">当前值：{{ limited }}（{{ limited.length }}/5）</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-input v-model="value" :maxlength="5" placeholder="最多输入 5 个字" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 禁用状态

`disabled` 禁用输入框，同时隐藏清除按钮。

<div class="demo-block">
  <div class="demo-mobile">
    <div class="weui-cell weui-cell_active">
      <div class="weui-cell__hd"><label class="weui-label">禁用</label></div>
      <div class="weui-cell__bd">
        <weui-input v-model="disabledValue" disabled placeholder="不可编辑" />
      </div>
    </div>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-input v-model="value" disabled placeholder="不可编辑" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('不可编辑的内容')
</script>
```
:::

## 自动聚焦

`focus` 让输入框自动获取焦点。以下示例通过按钮切换 `focus` 状态触发聚焦。

<div class="demo-block">
  <div class="demo-mobile">
    <div class="weui-cell weui-cell_active">
      <div class="weui-cell__bd">
        <weui-input
          v-model="focusValue"
          :focus="focusTriggered"
          placeholder="点击下方按钮聚焦"
          @focus="focusTriggered = true"
          @blur="focusTriggered = false"
        />
      </div>
    </div>
  </div>
  <weui-button type="primary" size="mini" @click="focusTriggered = true">聚焦输入框</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <weui-input v-model="value" :focus="focused" placeholder="自动聚焦" @blur="focused = false" />
  <weui-button type="primary" size="mini" @click="focused = true">聚焦输入框</weui-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const focused = ref(false)
</script>
```
:::

## 扩展类名

通过 `ext-class` 追加自定义类名到根元素，用于定制样式。

```vue
<template>
  <weui-input v-model="value" ext-class="my-input" placeholder="自定义样式" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
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
