# Toast 轻提示

轻提示组件，用于短暂展示操作反馈。支持声明式和命令式两种调用方式，提供 success / loading / warning / text 四种类型。多次命令式调用会通过内部队列排队，前一个关闭后才显示下一个。

## 基础用法

通过 `v-model:visible` 控制显示，`content` 设置提示文字，`type` 设置类型，`duration` 控制显示时长（默认 2000ms，到期自动关闭）。

<div class="demo-block">
  <weui-button type="primary" @click="show1 = true">显示 Toast</weui-button>
  <weui-toast
    v-model:visible="show1"
    content="已完成"
    type="success"
    :duration="2000"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">显示 Toast</weui-button>
  <weui-toast
    v-model:visible="show"
    content="已完成"
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

通过 `type` 设置四种类型：`success`（成功，默认）、`loading`（加载，默认不自动关闭）、`warning`（警告）、`text`（纯文本，无图标）。

<div class="demo-block">
  <weui-button type="default" @click="showLoading">loading</weui-button>
  <weui-button type="default" @click="showWarning">warning</weui-button>
  <weui-button type="default" @click="showText">text</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="default" @click="vLoading = true">loading</weui-button>
  <weui-button type="default" @click="vWarning = true">warning</weui-button>
  <weui-button type="default" @click="vText = true">text</weui-button>
  <weui-toast v-model:visible="vLoading" content="加载中" type="loading" :duration="2000" />
  <weui-toast v-model:visible="vWarning" content="警告提示" type="warning" />
  <weui-toast v-model:visible="vText" content="纯文本提示" type="text" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const vLoading = ref(false)
const vWarning = ref(false)
const vText = ref(false)
</script>
```
:::

## 不自动关闭

通过 `:duration="0"` 设置不自动关闭，需手动控制 `visible`。`loading` 类型默认即为不自动关闭。

<div class="demo-block">
  <weui-button type="primary" @click="show3 = true">常驻提示</weui-button>
  <weui-button type="default" @click="show3 = false">手动关闭</weui-button>
  <weui-toast
    v-model:visible="show3"
    content="此提示不会自动关闭"
    type="warning"
    :duration="0"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">常驻提示</weui-button>
  <weui-button type="default" @click="show = false">手动关闭</weui-button>
  <weui-toast
    v-model:visible="show"
    content="此提示不会自动关闭"
    type="warning"
    :duration="0"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
```
:::

## 无遮罩

通过 `:mask="false"` 取消透明遮罩，允许背景交互（点击穿透）。

<div class="demo-block">
  <weui-button type="primary" @click="show4 = true">无遮罩 Toast</weui-button>
  <weui-toast
    v-model:visible="show4"
    content="无遮罩提示"
    type="success"
    :mask="false"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">无遮罩 Toast</weui-button>
  <weui-toast
    v-model:visible="show"
    content="无遮罩提示"
    type="success"
    :mask="false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
```
:::

## 命令式调用

通过 `Toast.show / success / loading / warning / text / hide` 命令式调用，无需在模板中声明组件。调用前需在应用中挂载 `<weui-overlay-host />`。多次调用会通过内部队列排队，前一个关闭后才显示下一个。`Toast.show` 返回 Promise，关闭时（自动或 `hide()`）resolve。

<div class="demo-block">
  <weui-button type="primary" @click="showImpSuccess">Toast.success</weui-button>
  <weui-button type="primary" @click="showImpLoading">Toast.loading</weui-button>
  <weui-button type="primary" @click="showImpHide">Toast.hide</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="showImpSuccess">Toast.success</weui-button>
  <weui-button type="primary" @click="showImpLoading">Toast.loading</weui-button>
  <weui-button type="primary" @click="showImpHide">Toast.hide</weui-button>
</template>

<script setup lang="ts">
import { Toast } from 'weui-design-vue'

const showImpSuccess = () => Toast.success('已完成')
const showImpLoading = () => Toast.loading('加载中')
const showImpHide = () => Toast.hide()
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | boolean | false |
| content | 提示文字 | string | '' |
| type | 提示类型 | 'success' \| 'loading' \| 'warning' \| 'text' | 'success' |
| duration | 显示时长 ms，0 为不自动关闭。未传时按 type 取默认（loading=0，其他=2000） | number | — |
| mask | 是否显示透明遮罩（防止点击穿透） | boolean | true |
| ext-class | 自定义附加类名 | string | — |
| z-index | z-index（命令式调用时由 overlay-host 注入） | number | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态变化时触发 | (value: boolean) |
| close | 关闭时触发 | — |

## 命令式 API

### Toast.show(options): Promise<void>

显示 toast，关闭时（自动或 `hide()`）resolve。多次调用会排队。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示文字 | string | '' |
| type | 提示类型 | 'success' \| 'loading' \| 'warning' \| 'text' | 'success' |
| duration | 显示时长 ms，0 为不自动关闭。未传时按 type 取默认 | number | — |
| mask | 是否显示透明遮罩 | boolean | true |
| extClass | 自定义附加类名 | string | — |

### Toast.success(content, duration?): Promise<void>

成功提示快捷方法。默认 duration=2000。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示文字 | string | — |
| duration | 显示时长 ms | number | 2000 |

### Toast.loading(content, duration?): Promise<void>

加载提示快捷方法。默认 duration=0（不自动关闭），需手动 `Toast.hide()` 关闭。参数同 `success`。

### Toast.warning(content, duration?): Promise<void>

警告提示快捷方法。参数同 `success`。

### Toast.text(content, duration?): Promise<void>

纯文本提示快捷方法（无图标）。参数同 `success`。

### Toast.hide(): void

立即关闭当前正在显示的 toast，并触发队列中下一个。
