# Gallery 画廊

全屏图片预览组件，用于展示图片并提供删除等操作入口。支持声明式和命令式两种调用方式，命令式调用通过 `Gallery.show` 返回 `Promise<'delete' | 'hide'>`，便于在异步流程中获知用户操作。

H5 图片区域遵循官方 WeUI 的 `.weui-gallery__img` 背景图结构，并使用 `contain` 保持图片比例；小程序端则调用 `uni.previewImage` 系统预览。

<script setup lang="ts">
import { ref } from 'vue'
import { Gallery } from 'weui-uniapp-design'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const lastResult = ref('')

const imgSrc = 'https://picsum.photos/seed/weui-gallery/600/400'

const onDelete = () => {
  lastResult.value = '点击了删除按钮'
  // 删除事件不会自动关闭画廊，由父组件控制
  show2.value = false
}

const onDeleteMaskDemo = () => {
  // 禁用遮罩点击的 demo，仅通过删除按钮关闭
  show4.value = false
}

const onSave = () => {
  lastResult.value = '点击了保存按钮'
  show3.value = false
}

const onShare = () => {
  lastResult.value = '点击了分享按钮'
  show3.value = false
}

const onImperative = async () => {
  const { promise, close } = Gallery.show({
    src: imgSrc,
    showDelete: true,
    deleteText: '删除',
  })
  const action = await promise
  lastResult.value = `命令式返回：${action}`
  // 点击删除按钮时 promise resolve('delete')，但 gallery 不会自动关闭，需手动调用 close()
  // 点击遮罩时 promise resolve('hide') 并自动关闭
  if (action === 'delete') {
    close()
  }
}
</script>

<weui-overlay-host />

## 基础用法

通过 `v-model:visible` 控制显示，`src` 设置图片地址。默认 `mask-closable` 为 `true`，点击画廊遮罩区域即关闭。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show1 = true">预览图片</weui-button>
  <weui-gallery v-model:visible="show1" :src="imgSrc" />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">预览图片</weui-button>
  <weui-gallery v-model:visible="show" :src="imgSrc" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const imgSrc = 'https://picsum.photos/seed/weui-gallery/600/400'
</script>
```
:::

## 显示删除按钮

通过 `show-delete` 显示底部官方删除图标，`delete-text` 自定义图标按钮的无障碍标签。点击删除按钮触发 `delete` 事件，**不会自动关闭画廊**，需在回调中手动将 `visible` 置为 `false`。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show2 = true">预览并删除</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
  <weui-gallery
    v-model:visible="show2"
    :src="imgSrc"
    show-delete
    delete-text="删除"
    @delete="onDelete"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">预览并删除</weui-button>
  <weui-gallery
    v-model:visible="show"
    :src="imgSrc"
    show-delete
    delete-text="删除"
    @delete="onDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const imgSrc = 'https://picsum.photos/seed/weui-gallery/600/400'

const onDelete = () => {
  console.log('删除当前图片')
  show.value = false
}
</script>
```
:::

## 自定义操作区

通过 default slot 替代默认删除按钮，实现保存、分享等自定义操作。slot 内容会渲染在 `.weui-gallery__opr` 容器内，点击事件需在 slot 内部绑定并自行关闭画廊。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show3 = true">自定义操作</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
  <weui-gallery v-model:visible="show3" :src="imgSrc">
    <div class="weui-gallery__del" @click="onSave">保存</div>
    <div class="weui-gallery__del" @click="onShare">分享</div>
  </weui-gallery>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">自定义操作</weui-button>
  <weui-gallery v-model:visible="show" :src="imgSrc">
    <div class="weui-gallery__del" @click="onSave">保存</div>
    <div class="weui-gallery__del" @click="onShare">分享</div>
  </weui-gallery>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const imgSrc = 'https://picsum.photos/seed/weui-gallery/600/400'

const onSave = () => {
  console.log('保存图片')
  show.value = false
}

const onShare = () => {
  console.log('分享图片')
  show.value = false
}
</script>
```
:::

## 禁用遮罩点击

通过 `:mask-closable="false"` 禁用点击遮罩区域关闭，此时仅能通过删除按钮或父组件控制 `visible` 关闭。本示例同时开启 `show-delete` 以提供关闭入口。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show4 = true">禁用遮罩点击</weui-button>
  <weui-gallery
    v-model:visible="show4"
    :src="imgSrc"
    show-delete
    delete-text="关闭"
    :mask-closable="false"
    @delete="onDeleteMaskDemo"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">禁用遮罩点击</weui-button>
  <weui-gallery
    v-model:visible="show"
    :src="imgSrc"
    show-delete
    delete-text="关闭"
    :mask-closable="false"
    @delete="onDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const imgSrc = 'https://picsum.photos/seed/weui-gallery/600/400'

const onDelete = () => {
  show.value = false
}
</script>
```
:::

## 命令式调用

通过 `Gallery.show(options)` 命令式调用，无需在模板中声明组件。调用前需在应用中挂载 `<weui-overlay-host />`。返回 `{ close, promise }`：

- 点击删除按钮 → `promise` resolve 为 `'delete'`，**gallery 不会自动关闭**，需手动调用 `close()`
- 点击遮罩（`maskClosable` 默认 `true`）→ `promise` resolve 为 `'hide'` 并自动关闭

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="onImperative">Gallery.show 命令式调用</weui-button>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-overlay-host />
  <weui-button type="primary" @click="onImperative">Gallery.show 命令式调用</weui-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Gallery } from 'weui-uniapp-design'

const lastResult = ref('')
const imgSrc = 'https://picsum.photos/seed/weui-gallery/600/400'

const onImperative = async () => {
  const { promise, close } = Gallery.show({
    src: imgSrc,
    showDelete: true,
    deleteText: '删除',
  })
  const action = await promise
  lastResult.value = `命令式返回：${action}`
  if (action === 'delete') {
    close()
  }
}
</script>
```
:::

## 跨端说明

- **H5 端**：组件渲染完整 UI（图片 + 删除按钮），通过 `visible` / `src` / `showDelete` 控制，支持淡入淡出动画与命令式 `Gallery.show` 调用
- **小程序端**：调用 `uni.previewImage` 系统预览，**`showDelete` / `deleteText` / 默认 slot 能力不生效**（uni.previewImage 不支持自定义操作）。如需删除，请在调用方（如 uploader）使用长按交互

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | boolean | false |
| src | 图片地址 | string | — |
| show-delete | 是否显示删除按钮 | boolean | false |
| delete-text | 删除图标按钮的无障碍标签 | string | 删除 |
| mask-closable | 点击遮罩是否关闭 | boolean | true |
| ext-class | 自定义附加类名 | string | — |
| z-index | z-index（命令式调用时由 overlay-host 注入） | number | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态变化时触发 | (value: boolean) |
| delete | 点击删除按钮时触发 | — |
| hide | 画廊关闭时触发 | — |
| weui-close | overlay-host 命令式调用时通知卸载（一般无需监听） | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义操作区，替代默认删除按钮。仅在 `showDelete` 为 `true` 或提供了 default slot 时渲染 |

## 命令式 API

### Gallery.show(options)

显示画廊。调用前需确保应用中已挂载 `<weui-overlay-host />`。返回 `{ close, promise }`，其中 `promise` 类型为 `Promise<'delete' | 'hide'>`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | string | — |
| showDelete | 是否显示删除按钮 | boolean | false |
| deleteText | 删除图标按钮的无障碍标签 | string | 删除 |
| maskClosable | 点击遮罩是否关闭 | boolean | true |
| extClass | 自定义附加类名 | string | — |

返回值：

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| close | 手动关闭画廊（卸载组件） | () => void |
| promise | 用户操作结果：`'delete'` 表示点击了删除按钮，`'hide'` 表示点击了遮罩 | `Promise<'delete' \| 'hide'>` |
