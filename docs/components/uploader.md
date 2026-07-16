# Uploader 上传

图片/文件上传组件，用于展示已上传文件列表并提供选择入口。

## 基础用法

通过 `files` 传入文件列表，`count` 设置最大上传数。当文件数未达上限时显示上传按钮，点击上传按钮的选择操作由业务方通过 `select` 事件处理。

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
  { url: 'https://example.com/pic1.png' },
  { url: 'https://example.com/pic2.png' },
])

const onSelect = (event: Event) => {
  // 调用 uni.chooseImage 等业务逻辑
}

const onPreview = (file: UploaderFile, index: number) => {
  uni.previewImage({ urls: files.value.map(f => f.url), current: file.url })
}
</script>
```

## 上传状态

通过 `UploaderFile` 的 `status` 字段设置文件状态，`loading` 和 `error` 状态会显示遮罩层与状态文字。`statusText` 可自定义状态文字。

```vue
<template>
  <weui-uploader
    title="带状态的上传"
    :files="files"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploaderFile } from 'weui-design-vue'

const files = ref<UploaderFile[]>([
  { url: 'https://example.com/pic1.png', status: 'success' },
  { url: 'https://example.com/pic2.png', status: 'loading', statusText: '50%' },
  { url: 'https://example.com/pic3.png', status: 'error' },
])
</script>
```

## 隐藏头部

设置 `show-header` 为 `false` 可隐藏标题与计数区域。

```vue
<template>
  <weui-uploader :show-header="false" :files="files" />
</template>
```

## 提示文字

通过 `tips` 属性在底部显示提示信息。

```vue
<template>
  <weui-uploader title="图片上传" tips="最多上传9张图片" :files="files" />
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| files | 文件列表 | `UploaderFile[]` | `[]` |
| title | 标题 | `string` | — |
| tips | 提示文字 | `string` | — |
| count | 最大上传数 | `number` | `9` |
| max-size | 单文件最大字节数 | `number` | — |
| show-header | 是否显示头部 | `boolean` | `true` |
| ext-class | 附加在根元素上的扩展类名 | `string` | — |

### UploaderFile

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 文件 URL（图片地址） | `string` | — |
| status | 状态 | `'loading' \| 'error' \| 'success'` | — |
| statusText | 状态文字 | `string` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 选择文件时触发 | `(event: Event)` |
| preview | 点击文件预览时触发 | `(file: UploaderFile, index: number)` |
| delete | 长按文件删除时触发 | `(file: UploaderFile, index: number)` |
| exceed | 选择文件数超出最大数量时触发 | `(count: number)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容，追加在上传组件底部 |
