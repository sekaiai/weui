# Dialog 对话框

弹窗对话框，用于提示用户确认或展示信息。支持声明式和命令式两种调用方式。

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, type DialogButton } from 'weui-design-vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const lastResult = ref('')

const twoButtons: DialogButton[] = [
  { label: '取消' },
  { label: '确定' },
]

const oneButton: DialogButton[] = [
  { label: '知道了' },
]

const threeButtons: DialogButton[] = [
  { label: '取消' },
  { label: '确定' },
  { label: '删除', type: 'warn' },
]

const onButtonTap = (btn: DialogButton, index: number) => {
  lastResult.value = `点击：${btn.label}（索引 ${index}）`
}

const onAlert = async () => {
  await Dialog.alert({ title: '提示', content: '这是一个 alert 对话框' })
  lastResult.value = 'alert 关闭'
}

const onConfirm = async () => {
  const ok = await Dialog.confirm({ title: '确认', content: '确定删除吗？' })
  lastResult.value = `confirm: ${ok ? 'confirm' : 'cancel'}`
}
</script>

<weui-overlay-host />

## 基础用法

通过 `v-model:visible` 控制显示，`title` 设置标题，`content` 设置内容，`buttons` 配置按钮，`@buttontap` 监听按钮点击。

<div class="demo-block">
  <weui-button type="primary" @click="show1 = true">显示 Dialog</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
  <weui-dialog
    v-model:visible="show1"
    title="提示"
    content="这是一个对话框"
    :buttons="twoButtons"
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示 Dialog</weui-button>
  <weui-dialog
    v-model:visible="show"
    title="提示"
    content="这是一个对话框"
    :buttons="buttons"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DialogButton } from 'weui-design-vue'

const show = ref(false)
const buttons: DialogButton[] = [
  { label: '取消' },
  { label: '确定' },
]

const onButtonTap = (btn: DialogButton, index: number) => {
  console.log(btn, index)
}
</script>
```
:::

## 单按钮

`buttons` 仅配置一项时，按钮自动设为 primary 样式。

<div class="demo-block">
  <weui-button type="primary" @click="show2 = true">单按钮 Dialog</weui-button>
  <weui-dialog
    v-model:visible="show2"
    title="提示"
    content="操作成功"
    :buttons="oneButton"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-dialog
    v-model:visible="show"
    title="提示"
    content="操作成功"
    :buttons="[{ label: '知道了' }]"
  />
</template>
```
:::

## 三按钮（含警告）

通过 `type: 'warn'` 设置警告按钮。

<div class="demo-block">
  <weui-button type="primary" @click="show3 = true">三按钮 Dialog</weui-button>
  <weui-dialog
    v-model:visible="show3"
    title="文件操作"
    content="请选择操作"
    :buttons="threeButtons"
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-dialog
    v-model:visible="show"
    title="文件操作"
    content="请选择操作"
    :buttons="threeButtons"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import type { DialogButton } from 'weui-design-vue'
const threeButtons: DialogButton[] = [
  { label: '取消' },
  { label: '确定' },
  { label: '删除', type: 'warn' },
]
</script>
```
:::

## 按钮垂直排列

通过 `btn-wrap` 让按钮垂直排列，适用于按钮文字较长时。

<div class="demo-block">
  <weui-button type="primary" @click="show4 = true">垂直按钮 Dialog</weui-button>
  <weui-dialog
    v-model:visible="show4"
    title="提示"
    content="按钮垂直排列"
    :buttons="threeButtons"
    btn-wrap
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-dialog
    v-model:visible="show"
    title="提示"
    content="按钮垂直排列"
    :buttons="buttons"
    btn-wrap
  />
</template>
```
:::

## 禁用遮罩点击

通过 `:mask-closable="false"` 禁止点击遮罩关闭。

<div class="demo-block">
  <weui-button type="primary" @click="show5 = true">禁用遮罩点击</weui-button>
  <weui-dialog
    v-model:visible="show5"
    title="提示"
    content="必须点击按钮关闭"
    :buttons="twoButtons"
    :mask-closable="false"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-dialog
    v-model:visible="show"
    title="提示"
    content="必须点击按钮关闭"
    :buttons="buttons"
    :mask-closable="false"
  />
</template>
```
:::

## 无遮罩背景

通过 `:mask="false"` 使遮罩透明（仍拦截点击）。

<div class="demo-block">
  <weui-button type="primary" @click="show6 = true">无遮罩背景</weui-button>
  <weui-dialog
    v-model:visible="show6"
    title="提示"
    content="遮罩透明"
    :buttons="twoButtons"
    :mask="false"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-dialog
    v-model:visible="show"
    title="提示"
    content="遮罩透明"
    :buttons="buttons"
    :mask="false"
  />
</template>
```
:::

## 命令式：Dialog.alert

`Dialog.alert(options)` 显示只有一个"确定"按钮的对话框，点击确定后 Promise resolve。

<div class="demo-block">
  <weui-button type="primary" @click="onAlert">Dialog.alert</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="onAlert">Dialog.alert</weui-button>
</template>

<script setup lang="ts">
import { Dialog } from 'weui-design-vue'

const onAlert = async () => {
  await Dialog.alert({ title: '提示', content: '这是一个 alert 对话框' })
}
</script>
```
:::

## 命令式：Dialog.confirm

`Dialog.confirm(options)` 显示有"取消"和"确定"按钮的对话框，返回 `Promise<boolean>`，点击确定 resolve `true`，点击取消 resolve `false`。

<div class="demo-block">
  <weui-button type="primary" @click="onConfirm">Dialog.confirm</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="onConfirm">Dialog.confirm</weui-button>
</template>

<script setup lang="ts">
import { Dialog } from 'weui-design-vue'

const onConfirm = async () => {
  const ok = await Dialog.confirm({ title: '确认', content: '确定删除吗？' })
  console.log(ok)
}
</script>
```
:::

## 自定义插槽

通过 `title` 和 `default` 插槽自定义标题和内容。

<div class="demo-block">
  <weui-button type="primary" @click="show7 = true">查看插槽 Dialog</weui-button>
  <weui-dialog v-model:visible="show7" :buttons="twoButtons">
    <template #title>自定义标题</template>
    <template #default>
      <p style="margin: 0;">这是自定义内容，可以包含 <strong>HTML</strong>。</p>
    </template>
  </weui-dialog>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">查看插槽 Dialog</weui-button>
  <weui-dialog v-model:visible="show" :buttons="buttons">
    <template #title>自定义标题</template>
    <template #default>
      <p>这是自定义内容</p>
    </template>
  </weui-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | boolean | false |
| title | 标题 | string | — |
| content | 内容文字（无 default slot 时使用） | string | — |
| buttons | 按钮列表 | DialogButton[] | [] |
| mask-closable | 点击遮罩是否关闭 | boolean | true |
| mask | 是否显示遮罩背景 | boolean | true |
| btn-wrap | 按钮是否垂直排列 | boolean | false |
| ext-class | 自定义附加类名 | string | — |
| z-index | z-index（命令式调用时由 overlay-host 注入） | number | — |

### DialogButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 按钮文字 | string | — |
| type | 按钮类型，未指定时按位置自动分配 | 'default' \| 'primary' \| 'warn' | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态变化时触发 | (value: boolean) |
| buttontap | 点击按钮时触发 | (button: DialogButton, index: number) |
| close | 关闭时触发 | — |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| title | 自定义标题 |
| default | 自定义内容 |
| footer | 自定义底部按钮区 |

## 命令式 API

### Dialog.show(options): `Promise<DialogShowResult>`

显示对话框。`buttons` 中的按钮点击后 resolve。

### Dialog.alert(options): `Promise<void>`

显示 alert 对话框（单按钮"确定"），点击确定后 resolve。

### Dialog.confirm(options): `Promise<boolean>`

显示 confirm 对话框（双按钮），点击确定 resolve `true`，点击取消 resolve `false`。
