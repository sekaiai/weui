# Toptips 顶部提示

顶部提示组件，用于短暂展示操作反馈。支持声明式和命令式两种调用方式，提供 info / success / warn / error 四种类型。

<script setup lang="ts">
import { ref } from 'vue'
import { Toptips } from 'weui-design-vue'

const show1 = ref(false)
const showInfo = ref(false)
const showSuccess = ref(false)
const showWarn = ref(false)
const showError = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const lastResult = ref('')

const onImpInfo = () => {
  Toptips.info('信息提示')
  lastResult.value = 'Toptips.info 已调用'
}

const onImpSuccess = () => {
  Toptips.success('操作成功')
  lastResult.value = 'Toptips.success 已调用'
}

const onImpWarn = () => {
  Toptips.warn('请注意警告')
  lastResult.value = 'Toptips.warn 已调用'
}

const onImpError = () => {
  Toptips.error('操作失败')
  lastResult.value = 'Toptips.error 已调用'
}
</script>

<weui-overlay-host />

## 基础用法

通过 `v-model:visible` 控制显示，`content` 设置提示文字，`type` 设置类型，`duration` 控制显示时长（默认 2000ms，到期自动关闭）。

<div class="demo-block">
  <weui-button type="primary" @click="show1 = true">显示 Toptips</weui-button>
  <weui-toptips
    v-model:visible="show1"
    content="操作成功"
    type="success"
    :duration="2000"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示 Toptips</weui-button>
  <weui-toptips
    v-model:visible="show"
    content="操作成功"
    type="success"
    :duration="2000"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
```
:::

## 提示类型

通过 `type` 设置四种类型：`info`（信息）、`success`（成功）、`warn`（警告）、`error`（错误）。

<div class="demo-block">
  <weui-button type="default" @click="showInfo = true">info</weui-button>
  <weui-button type="default" @click="showSuccess = true">success</weui-button>
  <weui-button type="default" @click="showWarn = true">warn</weui-button>
  <weui-button type="default" @click="showError = true">error</weui-button>
  <weui-toptips v-model:visible="showInfo" content="信息提示" type="info" />
  <weui-toptips v-model:visible="showSuccess" content="操作成功" type="success" />
  <weui-toptips v-model:visible="showWarn" content="请注意警告" type="warn" />
  <weui-toptips v-model:visible="showError" content="操作失败" type="error" />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="default" @click="vInfo = true">info</weui-button>
  <weui-button type="default" @click="vSuccess = true">success</weui-button>
  <weui-button type="default" @click="vWarn = true">warn</weui-button>
  <weui-button type="default" @click="vError = true">error</weui-button>
  <weui-toptips v-model:visible="vInfo" content="信息提示" type="info" />
  <weui-toptips v-model:visible="vSuccess" content="操作成功" type="success" />
  <weui-toptips v-model:visible="vWarn" content="请注意警告" type="warn" />
  <weui-toptips v-model:visible="vError" content="操作失败" type="error" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const vInfo = ref(false)
const vSuccess = ref(false)
const vWarn = ref(false)
const vError = ref(false)
</script>
```
:::

## 不自动关闭

通过 `:duration="0"` 设置不自动关闭，需手动控制 `visible`。

<div class="demo-block">
  <weui-button type="primary" @click="show3 = true">常驻提示</weui-button>
  <weui-button type="default" @click="show3 = false">手动关闭</weui-button>
  <weui-toptips
    v-model:visible="show3"
    content="此提示不会自动关闭"
    type="warn"
    :duration="0"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">常驻提示</weui-button>
  <weui-button type="default" @click="show = false">手动关闭</weui-button>
  <weui-toptips
    v-model:visible="show"
    content="此提示不会自动关闭"
    type="warn"
    :duration="0"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
```
:::

## 自定义时长

通过 `:duration="4000"` 自定义显示时长（毫秒）。

<div class="demo-block">
  <weui-button type="primary" @click="show4 = true">显示 4 秒 Toptips</weui-button>
  <weui-toptips
    v-model:visible="show4"
    content="此提示显示 4 秒后自动关闭"
    type="success"
    :duration="4000"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示 4 秒 Toptips</weui-button>
  <weui-toptips
    v-model:visible="show"
    content="此提示显示 4 秒后自动关闭"
    type="success"
    :duration="4000"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
```
:::

## 命令式：info / success

通过 `Toptips.info / success` 命令式调用，无需在模板中声明组件。调用前需在应用中挂载 `<weui-overlay-host />`。命令式调用会在 `duration` 后自动通过 overlay-host 卸载。

<div class="demo-block">
  <weui-button type="primary" @click="onImpInfo">Toptips.info</weui-button>
  <weui-button type="primary" @click="onImpSuccess">Toptips.success</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="showImpInfo">Toptips.info</weui-button>
  <weui-button type="primary" @click="showImpSuccess">Toptips.success</weui-button>
</template>

<script setup lang="ts">
import { Toptips } from 'weui-design-vue'

const showImpInfo = () => Toptips.info('信息提示')
const showImpSuccess = () => Toptips.success('操作成功')
</script>
```
:::

## 命令式：warn / error

通过 `Toptips.warn / error` 命令式调用警告与错误提示。

<div class="demo-block">
  <weui-button type="primary" @click="onImpWarn">Toptips.warn</weui-button>
  <weui-button type="primary" @click="onImpError">Toptips.error</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="showImpWarn">Toptips.warn</weui-button>
  <weui-button type="primary" @click="showImpError">Toptips.error</weui-button>
</template>

<script setup lang="ts">
import { Toptips } from 'weui-design-vue'

const showImpWarn = () => Toptips.warn('请注意警告')
const showImpError = () => Toptips.error('操作失败')
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | boolean | false |
| content | 提示文字 | string | '' |
| type | 提示类型 | 'info' \| 'success' \| 'warn' \| 'error' | 'info' |
| duration | 显示时长 ms，0 为不自动关闭 | number | 2000 |
| ext-class | 自定义附加类名 | string | — |
| z-index | z-index（命令式调用时由 overlay-host 注入） | number | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态变化时触发 | (value: boolean) |
| close | 关闭时触发 | — |

## 命令式 API

### Toptips.show(options): void

显示提示，`duration` 后自动关闭。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示文字 | string | '' |
| type | 提示类型 | 'info' \| 'success' \| 'warn' \| 'error' | 'info' |
| duration | 显示时长 ms，0 为不自动关闭 | number | 2000 |
| extClass | 自定义附加类名 | string | — |

### Toptips.info(content, duration?): void

信息提示快捷方法。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示文字 | string | — |
| duration | 显示时长 ms | number | 2000 |

### Toptips.success(content, duration?): void

成功提示快捷方法。参数同 `info`。

### Toptips.warn(content, duration?): void

警告提示快捷方法。参数同 `info`。

### Toptips.error(content, duration?): void

错误提示快捷方法。参数同 `info`。
