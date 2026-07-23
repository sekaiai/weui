<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const clickResult = ref('')
const vcodeSeconds = ref(0)
let vcodeTimer: ReturnType<typeof setInterval> | undefined

const sendVcode = () => {
  if (vcodeSeconds.value) return
  vcodeSeconds.value = 59
  vcodeTimer = setInterval(() => {
    vcodeSeconds.value -= 1
    if (!vcodeSeconds.value && vcodeTimer) clearInterval(vcodeTimer)
  }, 1000)
}

onBeforeUnmount(() => vcodeTimer && clearInterval(vcodeTimer))
</script>

# Cell 列表项

Cell 由 header、body 与 footer 构成，适用于表单项、设置项和列表项。WeUI 的状态样式均使用明确 attr；`ext-class` 仅用于业务自定义样式。

## 基础用法

通过默认插槽提供正文，通过 `desc` 提供右侧说明。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cell-group title="带说明的列表项"><weui-cell desc="说明文字">标题文字</weui-cell><weui-cell desc="说明文字">标题文字</weui-cell></weui-cell-group></div></div>

::: details 查看代码
```vue
<weui-cell-group title="带说明的列表项">
  <weui-cell desc="说明文字">标题文字</weui-cell>
  <weui-cell desc="说明文字">标题文字</weui-cell>
</weui-cell-group>
```
:::

## 表单标签

`label` 渲染表单标签；验证码场景使用 `vcode`，输入框与发送按钮都放在默认插槽。点击按钮会模拟发送并从“已发送(59)”开始倒计时。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cell-group form title="表单标签"><weui-cell label="手机号"><weui-input placeholder="请输入手机号" /></weui-cell><weui-cell label="验证码" vcode wrap><weui-input ext-class="weui-cell__control weui-cell__control_flex" placeholder="请输入验证码" /><button class="weui-cell__control weui-btn weui-btn_default weui-vcode-btn" :disabled="vcodeSeconds > 0" @click="sendVcode">{{ vcodeSeconds ? `已发送(${vcodeSeconds})` : '获取验证码' }}</button></weui-cell></weui-cell-group></div></div>

::: details 查看代码
```vue
<script setup lang="ts">
import { ref } from 'vue'

const seconds = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
const send = () => {
  if (seconds.value) return
  seconds.value = 59
  timer = setInterval(() => {
    seconds.value -= 1
    if (!seconds.value && timer) clearInterval(timer)
  }, 1000)
}
</script>

<template>
  <weui-cell-group form title="表单标签">
    <weui-cell label="手机号"><weui-input placeholder="请输入手机号" /></weui-cell>
    <weui-cell label="验证码" vcode wrap>
      <weui-input ext-class="weui-cell__control weui-cell__control_flex" placeholder="请输入验证码" />
      <button class="weui-cell__control weui-btn weui-btn_default weui-vcode-btn" :disabled="seconds > 0" @click="send">{{ seconds ? `已发送(${seconds})` : '获取验证码' }}</button>
    </weui-cell>
  </weui-cell-group>
</template>
```
:::

## 图标、跳转与副标题

`subtitle` 在正文标题下渲染 `.weui-cell__desc`；`access` 用于显示官方跳转箭头。`icon` 会智能识别图标：普通字符串作为 WeUI 图标名，`/`、`./`、`../`、`http(s):` 与 `data:` 开头的字符串作为图片地址。`#icon` 插槽同样自动提供默认对齐和右侧间距。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cell-group title="带跳转的列表项"><weui-cell access icon="info" subtitle="通过图标名渲染" @click="clickResult = 'cell click 事件已触发'">cell standard</weui-cell><weui-cell access icon="https://weui.io/images/pic_160.png" subtitle="通过图片地址渲染">image icon</weui-cell><weui-cell access subtitle="插槽也有默认对齐"><template #icon><weui-icon type="success" /></template>slot icon</weui-cell><weui-cell icon="warn" access desc="说明文字" /></weui-cell-group><p>{{ clickResult || '点击列表项试试' }}</p></div></div>

::: details 查看代码
```vue
<weui-cell-group title="带跳转的列表项">
  <weui-cell access icon="info" subtitle="通过图标名渲染">
    cell standard
  </weui-cell>
  <weui-cell access icon="https://weui.io/images/pic_160.png" subtitle="通过图片地址渲染">
    image icon
  </weui-cell>
  <weui-cell access subtitle="插槽也有默认对齐">
    <template #icon><weui-icon type="success" /></template>
    slot icon
  </weui-cell>
  <weui-cell access desc="说明文字">cell standard</weui-cell>
</weui-cell-group>
```
:::

## 内置状态

`warn`、`readonly`、`disabled`、`primary` 与 `select` 分别映射官方状态 class，无需传递状态型扩展类。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cell-group form title="状态"><weui-cell warn desc="说明文字">警告项</weui-cell><weui-cell readonly label="EMail"><weui-input model-value="1234567" readonly /></weui-cell><weui-cell disabled label="微信号"><weui-input model-value="WeUI" disabled /></weui-cell><weui-textarea primary label="地址" placeholder="请输入地址" /><weui-cell select active>选择框</weui-cell></weui-cell-group></div></div>

::: details 查看代码
```vue
<weui-cell-group form title="状态">
  <weui-cell warn desc="说明文字">警告项</weui-cell>
  <weui-cell readonly label="EMail"><weui-input model-value="1234567" readonly /></weui-cell>
  <weui-cell disabled label="微信号"><weui-input model-value="WeUI" disabled /></weui-cell>
  <weui-textarea primary label="地址" placeholder="请输入地址" />
  <weui-cell select active>选择框</weui-cell>
</weui-cell-group>
```
:::

## 内置滑动删除

`is-swipe` 使用官方滑动结构。向左滑动显示操作按钮，点击按钮触发 `swipe-click`。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cell-group title="滑动删除"><weui-cell is-swipe desc="向左滑动试试" @swipe-click="clickResult = 'swipe-click 已触发'">可滑动的列表项</weui-cell><weui-cell is-swipe swipe-text="归档" swipe-type="default" desc="自定义按钮">可滑动的列表项</weui-cell></weui-cell-group></div></div>

::: details 查看代码
```vue
<weui-cell-group title="滑动删除">
  <weui-cell is-swipe desc="向左滑动试试" @swipe-click="removeItem">可滑动的列表项</weui-cell>
  <weui-cell is-swipe swipe-text="归档" swipe-type="default" desc="自定义按钮">可滑动的列表项</weui-cell>
</weui-cell-group>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title / label | header 标题或表单标签 | `string` | — |
| subtitle | 默认插槽标题下的副标题 | `string` | — |
| value / desc / footer | footer 说明文字 | `string` | — |
| access | 跳转样式与导航能力 | `boolean` | `false` |
| link | `access` 的兼容别名 | `boolean` | `false` |
| vcode / warn / uploader | 验证码、警告、上传状态 | `boolean` | `false` |
| readonly / disabled | 输入只读或禁用状态 | `boolean` | `false` |
| primary / wrap | 顶部对齐或可折行 | `boolean` | `false` |
| select / select-before / select-after | 选择框状态 | `boolean` | `false` |
| active | 静态按下态样式 | `boolean` | `false` |
| is-swipe | 官方结构的滑动操作项 | `boolean` | `false` |
| swipe-text / swipe-type | 操作按钮文案与类型 | `string` / `'default' \| 'warn'` | `'删除'` / `'warn'` |
| ext-class | 自定义扩展类 | `string` | — |

## Events

| 事件 | 说明 |
| --- | --- |
| click | 点击 cell |
| navigate / navigate-error | 有 `access` 与 `url` 时的导航结果 |
| swipe-click | 点击内置 swipe 操作按钮 |
