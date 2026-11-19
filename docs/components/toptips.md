# Toptips 顶部提示

用于短暂展示需要用户注意的提示信息。组件默认使用 WeUI 官方的 `warn` 样式，并扩展提供 `info`、`success`、`error` 三种提示类型。

<script setup lang="ts">
import { ref } from 'vue'
import { Toptips } from 'weui-uniapp-design'

const showBasic = ref(false)
const showPersistent = ref(false)
const showLong = ref(false)
const showType = ref(false)
const type = ref<'info' | 'success' | 'warn' | 'error'>('info')
const lastResult = ref('')

const onWarn = () => {
  Toptips.warn('请注意警告内容')
  lastResult.value = 'Toptips.warn 已调用'
}
</script>

<weui-overlay-host />

## 基础用法

通过 `v-model:visible` 控制显示，`content` 设置文字，`duration` 控制展示时长。默认展示 2000ms。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="showBasic = true">显示顶部提示</weui-button>
  <weui-toptips v-model:visible="showBasic" content="请注意提示内容" />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示顶部提示</weui-button>
  <weui-toptips v-model:visible="show" content="请注意提示内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>
```
:::

## 提示类型

通过 `type` 设置提示类型，默认为 `warn`。`warn` 为 WeUI 官方样式，`info`、`success`、`error` 是组件提供的扩展类型。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="type = 'info'; showType = true">普通信息</weui-button>
  <weui-button type="primary" @click="type = 'success'; showType = true">操作成功</weui-button>
  <weui-button type="primary" @click="type = 'warn'; showType = true">警告提示</weui-button>
  <weui-button type="primary" @click="type = 'error'; showType = true">操作失败</weui-button>
  <weui-toptips v-model:visible="showType" :type="type" content="这是一条顶部提示" />
</div>

::: details 查看代码
```vue
<template>
  <weui-button @click="show('info')">普通信息</weui-button>
  <weui-button @click="show('success')">操作成功</weui-button>
  <weui-button @click="show('warn')">警告提示</weui-button>
  <weui-button @click="show('error')">操作失败</weui-button>
  <weui-toptips v-model:visible="visible" :type="type" content="这是一条顶部提示" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const type = ref<'info' | 'success' | 'warn' | 'error'>('info')

const show = (nextType: typeof type.value) => {
  type.value = nextType
  visible.value = true
}
</script>
```
:::

## 不自动关闭

设置 `duration="0"` 后提示会持续显示，可由父组件手动关闭。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="showPersistent = true">显示常驻提示</weui-button>
  <weui-button type="default" @click="showPersistent = false">手动关闭</weui-button>
  <weui-toptips v-model:visible="showPersistent" content="此提示不会自动关闭" :duration="0" />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示常驻提示</weui-button>
  <weui-button type="default" @click="show = false">手动关闭</weui-button>
  <weui-toptips v-model:visible="show" content="此提示不会自动关闭" :duration="0" />
</template>
```
:::

## 自定义时长

`duration` 单位为毫秒。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="showLong = true">显示 4 秒</weui-button>
  <weui-toptips v-model:visible="showLong" content="此提示显示 4 秒" :duration="4000" />
</div>

::: details 查看代码
```vue
<weui-toptips v-model:visible="show" content="此提示显示 4 秒" :duration="4000" />
```
:::

## 命令式调用

命令式调用前在应用中挂载一次 `<weui-overlay-host />`。调用后组件会在 `duration` 到期时自动卸载。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="Toptips.info('普通信息')">info</weui-button>
  <weui-button type="primary" @click="Toptips.success('操作成功')">success</weui-button>
  <weui-button type="primary" @click="onWarn">warn</weui-button>
  <weui-button type="primary" @click="Toptips.error('操作失败')">error</weui-button>
  <weui-button type="default" @click="Toptips.show({ content: '自定义类型提示', type: 'success', duration: 4000 })">show(options)</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button @click="Toptips.info('普通信息')">info</weui-button>
  <weui-button @click="Toptips.success('操作成功')">success</weui-button>
  <weui-button @click="Toptips.warn('警告提示')">warn</weui-button>
  <weui-button @click="Toptips.error('操作失败')">error</weui-button>
  <weui-button @click="Toptips.show({ content: '自定义类型提示', type: 'success' })">show(options)</weui-button>
</template>

<script setup lang="ts">
import { Toptips } from 'weui-uniapp-design'
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | `boolean` | `false` |
| content | 提示文字 | `string` | `''` |
| type | 提示类型：`info`、`success`、`warn`、`error` | `'info' \| 'success' \| 'warn' \| 'error'` | `'warn'` |
| duration | 显示时长，`0` 为不自动关闭 | `number` | `2000` |
| ext-class | 自定义附加类名 | `string` | — |
| z-index | 命令式调用时由 overlay-host 注入 | `number` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态变化时触发 | `(value: boolean)` |
| close | 关闭时触发 | — |

## 命令式 API

### Toptips.show(options): void

显示顶部提示。`type` 默认为 `warn`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示文字 | `string` | `''` |
| type | 提示类型：`info`、`success`、`warn`、`error` | `'info' \| 'success' \| 'warn' \| 'error'` | `'warn'` |
| duration | 显示时长，`0` 为不自动关闭 | `number` | `2000` |
| extClass | 自定义附加类名 | `string` | — |

### Toptips.warn(content, duration?): void

警告提示快捷方法。

### Toptips.info(content, duration?): void

普通信息提示快捷方法。

### Toptips.success(content, duration?): void

成功提示快捷方法。

### Toptips.error(content, duration?): void

错误提示快捷方法。
