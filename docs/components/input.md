# Input 输入框

> [微信小程序 input 官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/input.html)

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
const readonlyValue = ref('只读的内容')
const focusValue = ref('')
const focusTriggered = ref(false)
const confirmValue = ref('')
const confirmResult = ref('')
const nicknameValue = ref('')
const miniEvent = ref('')
</script>

## 基础用法

通过 `v-model` 绑定输入值，`placeholder` 设置占位提示。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-cell><weui-input v-model="text" placeholder="请输入文本" /></weui-cell>
  </div>
  <p style="margin-top: 8px; color: #576b95;">当前值：{{ text }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-cell><weui-input v-model="text" placeholder="请输入文本" /></weui-cell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
</script>
```
:::

## 输入类型

`type` 支持 `text`、`number`、`idcard`、`digit`、`password`。微信小程序还支持 `safe-password` 与 `nickname`；H5 会安全降级为普通文本输入。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-cell label="数字"><weui-input v-model="numberValue" type="number" placeholder="请输入数字" /></weui-cell>
    <weui-cell label="身份证"><weui-input v-model="idcard" type="idcard" placeholder="请输入身份证号" /></weui-cell>
    <weui-cell label="小数"><weui-input v-model="digit" type="digit" placeholder="请输入数字（带小数）" /></weui-cell>
    <weui-cell label="密码"><weui-input v-model="password" type="password" placeholder="请输入密码" /></weui-cell>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-cell label="数字"><weui-input v-model="numberValue" type="number" placeholder="请输入数字" /></weui-cell>
  <weui-cell label="身份证"><weui-input v-model="idcard" type="idcard" placeholder="请输入身份证号" /></weui-cell>
  <weui-cell label="小数"><weui-input v-model="digit" type="digit" placeholder="请输入数字（带小数）" /></weui-cell>
  <weui-cell label="密码"><weui-input v-model="password" type="password" placeholder="请输入密码" /></weui-cell>
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

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-cell label="可清除"><weui-input v-model="clearableValue" clearable placeholder="输入后点击右侧清除" /></weui-cell>
  </div>
  <p style="margin-top: 8px; color: #576b95;">当前值：{{ clearableValue }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-cell label="可清除"><weui-input v-model="value" clearable placeholder="输入后点击右侧清除" /></weui-cell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 最大长度

`maxlength` 控制最大输入长度，默认 `140`；传 `-1` 表示不限制。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-cell><weui-input v-model="limited" :maxlength="5" placeholder="最多输入 5 个字" /></weui-cell>
  </div>
  <p style="margin-top: 8px; color: #576b95;">当前值：{{ limited }}（{{ limited.length }}/5）</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-cell><weui-input v-model="value" :maxlength="5" placeholder="最多输入 5 个字" /></weui-cell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 只读与禁用状态

`readonly` 保留内容选择能力但禁止编辑，并保持默认文字颜色；`disabled` 禁用输入框，同时隐藏清除按钮并置灰。两种状态都应同步传给 Cell 和 Input。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-cell readonly label="只读"><weui-input v-model="readonlyValue" readonly /></weui-cell>
    <weui-cell disabled label="禁用"><weui-input v-model="disabledValue" disabled placeholder="不可编辑" /></weui-cell>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-cell readonly label="只读"><weui-input v-model="readonlyValue" readonly /></weui-cell>
  <weui-cell disabled label="禁用"><weui-input v-model="disabledValue" disabled placeholder="不可编辑" /></weui-cell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const readonlyValue = ref('只读的内容')
const disabledValue = ref('不可编辑的内容')
</script>
```
:::

## 自动聚焦

`focus` 让输入框自动获取焦点；`auto-focus` 是微信小程序官方兼容入口，等同于 `focus`。以下示例通过按钮切换 `focus` 状态触发聚焦。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-cell><weui-input v-model="focusValue" :focus="focusTriggered" placeholder="点击下方按钮聚焦" @focus="focusTriggered = true" @blur="focusTriggered = false" /></weui-cell>
  </div>
  <weui-button type="primary" size="mini" @click="focusTriggered = true">聚焦输入框</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <weui-cell><weui-input v-model="value" :focus="focused" placeholder="自动聚焦" @blur="focused = false" /></weui-cell>
  <weui-button type="primary" size="mini" @click="focused = true">聚焦输入框</weui-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const focused = ref(false)
</script>
```
:::

## 微信小程序官方能力

除高频 prop 外，未声明的小程序官方属性会原样挂载到内部原生 input。请使用官方 kebab-case 名称；这些属性在 H5 不模拟，但不会阻碍跨端渲染。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-cell label="确认键"><weui-input v-model="confirmValue" confirm-type="search" placeholder="回车触发 confirm" @confirm="confirmResult = 'confirm 已触发'" /></weui-cell>
    <weui-cell label="昵称"><weui-input v-model="nicknameValue" type="nickname" placeholder="小程序昵称输入键盘" @nicknamereview="miniEvent = '昵称审核完成'" /></weui-cell>
    <weui-cell label="键盘属性"><weui-input cursor-spacing="16" confirm-hold hold-keyboard :adjust-position="false" placeholder="小程序专属属性透传" @keyboardheightchange="miniEvent = '键盘高度已变化'" /></weui-cell>
  </div>
  <p style="margin-top: 8px; color: #576b95;">{{ confirmResult || miniEvent || '在小程序中可验证键盘与昵称事件' }}</p>
</div>

::: details 查看代码
```vue
<weui-cell label="确认键">
  <weui-input
    v-model="keyword"
    confirm-type="search"
    @confirm="onConfirm"
  />
</weui-cell>

<weui-cell label="昵称">
  <weui-input
    v-model="nickname"
    type="nickname"
    @nicknamereview="onNicknameReview"
  />
</weui-cell>

<weui-cell label="键盘属性">
  <weui-input
    cursor-spacing="16"
    confirm-hold
    hold-keyboard
    :adjust-position="false"
    @keyboardheightchange="onKeyboardHeightChange"
  />
</weui-cell>

<!-- safe-password 仅在支持的微信小程序 WebView 基础库中有效 -->
<weui-cell label="安全密码">
  <weui-input
    type="safe-password"
    safe-password-cert-path="/assets/public.pem"
    :safe-password-length="6"
    :safe-password-time-stamp="timestamp"
    safe-password-nonce="nonce"
    safe-password-salt="salt"
    safe-password-custom-hash="sha256(password)"
  />
</weui-cell>
```
:::

`safe-password-*` 仅适用于微信小程序的安全键盘，需按官方安全密码指引提供有效参数；鸿蒙 OS 不支持这些参数。`placeholder-style`、`placeholder-class`、`cursor`、`cursor-color`、`selection-start`、`selection-end`、`always-embed` 也可按同样方式直接传入。

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
| type | 输入类型；`safe-password`、`nickname` 仅小程序支持 | `'text' \| 'number' \| 'idcard' \| 'digit' \| 'password' \| 'safe-password' \| 'nickname'` | `'text'` |
| readonly | 是否只读 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| maxlength | 最大输入长度，`-1` 为不限制 | `number` | `140` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| focus | 获取焦点 | `boolean` | `false` |
| autoFocus | 小程序 `auto-focus` 兼容入口，等同于 focus | `boolean` | `false` |
| confirmType | 小程序确认键文案；H5 映射为 `enterkeyhint` | `'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'done'` |
| extClass | 根元素扩展类名 | `string` | — |

## 小程序原生 Attr 透传

以下未声明的官方属性使用 kebab-case 直接传入，组件会原样挂载到原生 input；H5 不模拟其小程序行为。

| 属性 | 说明 |
| --- | --- |
| placeholder-style / placeholder-class | 占位符样式与类名（`placeholder-class` 仅 WebView） |
| cursor-spacing / confirm-hold | 键盘与光标距离、确认后保持键盘 |
| cursor / cursor-color / selection-start / selection-end | 光标与选区控制 |
| adjust-position / hold-keyboard / always-embed | 键盘布局与原生组件层级 |
| safe-password-cert-path 等 `safe-password-*` | 安全密码键盘参数，仅支持的微信小程序 WebView 有效 |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 输入值变化时触发 | `(value: string)` |
| input / change | 原生输入与变更事件 | `(event)` |
| focus | 输入框获得焦点时触发 | `(event)` |
| blur | 输入框失去焦点时触发 | `(event)` |
| confirm | 点击完成键时触发 | `(event)` |
| keyboardheightchange | 小程序键盘高度变化 | `(event)` |
| nicknamereview | 小程序昵称审核完成 | `(event)` |
| clear | 点击清除按钮时触发 | — |
