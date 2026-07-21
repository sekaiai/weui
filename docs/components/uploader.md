# Uploader 上传

图片/文件上传组件，用于展示已上传文件列表并提供选择入口。支持文件状态展示、数量限制、预览与删除。

<script setup lang="ts">
import { ref } from 'vue'
import { Gallery } from 'weui-design-vue'
import type { UploaderFile } from 'weui-design-vue'

const basicFiles = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
  { url: 'https://weui.io/images/pic_160.png' },
])

const statusFiles = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png', status: 'success' },
  { url: 'https://weui.io/images/pic_160.png', status: 'loading', statusText: '50%' },
  { url: 'https://weui.io/images/pic_160.png', status: 'error' },
])

const headerFiles = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
])

const tipsFiles = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
  { url: 'https://weui.io/images/pic_160.png' },
])

const lastEvent = ref('（暂无事件）')
const onSelect = (event: { tempFilePaths: string[]; tempFiles?: Array<{ path: string; size: number }> }) => {
  lastEvent.value = `select: 选择了 ${event.tempFilePaths.length} 个文件`
}
const onPreview = (file: UploaderFile, index: number) => {
  lastEvent.value = `preview: 预览第 ${index + 1} 个文件`
  Gallery.show({
    src: file.url,
    showDelete: true,
  }).promise.then((result) => {
    if (result === 'delete') {
      onDelete(file, index)
    }
  })
}
const onDelete = (file: UploaderFile, index: number) => {
  lastEvent.value = `delete: 删除第 ${index + 1} 个文件`
}
const onExceed = (count: number) => {
  lastEvent.value = `exceed: 超出最大数量 ${count}`
}
</script>

<weui-overlay-host />

## 基础用法

通过 `files` 传入文件列表，`count` 设置最大上传数。当文件数未达上限时显示上传按钮，点击上传按钮触发 `select` 事件由业务方处理选图。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-uploader
      title="图片上传"
      :files="basicFiles"
      :count="9"
      @select="onSelect"
      @preview="onPreview"
    />
  </div>
  <p style="margin-top: 8px; color: #576b95;">{{ lastEvent }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-uploader
    title="图片上传"
    :files="files"
    :count="9"
    @select="onSelect"
    @preview="onPreview"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploaderFile } from 'weui-design-vue'

const files = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
  { url: 'https://weui.io/images/pic_160.png' },
])

const onSelect = (event: { tempFilePaths: string[] }) => {
  // 调用 uni.chooseImage 后将返回结果追加到 files
}
const onPreview = (file: UploaderFile, index: number) => {
  uni.previewImage({ urls: files.value.map(f => f.url), current: file.url })
}
</script>
```
:::

## 上传状态

通过 `UploaderFile` 的 `status` 字段设置文件状态，`loading` 和 `error` 状态会显示遮罩层与状态文字。`statusText` 可自定义状态文字。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-uploader title="带状态的上传" :files="statusFiles" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-uploader title="带状态的上传" :files="files" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploaderFile } from 'weui-design-vue'

const files = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png', status: 'success' },
  { url: 'https://weui.io/images/pic_160.png', status: 'loading', statusText: '50%' },
  { url: 'https://weui.io/images/pic_160.png', status: 'error' },
])
</script>
```
:::

## 数量限制

`count` 限制最大上传数。当文件数达到上限时，上传按钮自动隐藏；超出时触发 `exceed` 事件。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-uploader
      title="最多2张"
      :files="basicFiles"
      :count="2"
      @exceed="onExceed"
    />
  </div>
  <p style="margin-top: 8px; color: #888;">文件数已达上限，上传按钮已隐藏</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-uploader title="最多2张" :files="files" :count="2" @exceed="onExceed" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploaderFile } from 'weui-design-vue'

const files = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
  { url: 'https://weui.io/images/pic_160.png' },
])
const onExceed = (count: number) => {
  console.log('超出最大数量', count)
}
</script>
```
:::

## 隐藏头部

设置 `show-header` 为 `false` 可隐藏标题与计数区域。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-uploader :show-header="false" :files="headerFiles" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-uploader :show-header="false" :files="files" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploaderFile } from 'weui-design-vue'

const files = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
])
</script>
```
:::

## 提示文字

通过 `tips` 属性在底部显示提示信息。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-uploader title="图片上传" tips="最多上传9张图片" :files="tipsFiles" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-uploader title="图片上传" tips="最多上传9张图片" :files="files" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploaderFile } from 'weui-design-vue'

const files = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
  { url: 'https://weui.io/images/pic_160.png' },
])
</script>
```
:::

## 文件预览与删除

点击文件触发 `preview` 事件。H5 端文件右上角显示 × 删除按钮，点击触发 `delete` 事件；小程序端长按文件触发 `delete` 事件。以下示例展示事件回调。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-uploader
      title="预览/删除"
      :files="basicFiles"
      @preview="onPreview"
      @delete="onDelete"
    />
  </div>
  <p style="margin-top: 8px; color: #576b95;">{{ lastEvent }}（H5 端点击 × / 小程序端长按可触发删除）</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-uploader
    title="预览/删除"
    :files="files"
    @preview="onPreview"
    @delete="onDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploaderFile } from 'weui-design-vue'

const files = ref<UploaderFile[]>([
  { url: 'https://weui.io/images/pic_160.png' },
  { url: 'https://weui.io/images/pic_160.png' },
])
const onPreview = (file: UploaderFile, index: number) => {
  uni.previewImage({ urls: files.value.map(f => f.url), current: file.url })
}
const onDelete = (file: UploaderFile, index: number) => {
  files.value.splice(index, 1)
}
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| files | 文件列表 | `UploaderFile[]` | `[]` |
| title | 标题 | `string` | — |
| tips | 提示文字 | `string` | — |
| count | 最大上传数 | `number` | `9` |
| showHeader | 是否显示头部 | `boolean` | `true` |
| accept | 接受的文件类型 | `'image' \| 'file'` | `'image'` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

### UploaderFile

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 文件 URL（图片地址） | `string` | — |
| status | 状态 | `'loading' \| 'error' \| 'success'` | — |
| statusText | 状态文字 | `string` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 选择文件时触发 | `(event: WeuiUploaderSelectEvent)` |
| select-fail | 选择文件失败时触发 | `(err: { errMsg: string })` |
| preview | 点击文件预览时触发 | `(file: UploaderFile, index: number)` |
| delete | H5 端点击 × 按钮 / 小程序端长按文件时触发 | `(file: UploaderFile, index: number)` |
| exceed | 选择文件数超出最大数量时触发 | `(count: number)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容，追加在上传组件底部 |
