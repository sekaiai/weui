# Gallery 画廊

全屏图片预览组件，用于展示图片并提供删除等操作入口。

## 基础用法

通过 `v-model:visible` 控制显示，`src` 设置图片地址。点击画廊区域关闭。

```vue
<template>
  <weui-button type="primary" @click="show = true">预览图片</weui-button>
  <weui-gallery v-model:visible="show" src="https://example.com/photo.jpg" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
```

## 显示删除按钮

通过 `show-delete` 显示删除按钮，`delete-text` 自定义按钮文字。点击删除按钮触发 `delete` 事件，不会自动关闭画廊，由父组件控制。

```vue
<template>
  <weui-button type="primary" @click="show = true">预览并删除</weui-button>
  <weui-gallery
    v-model:visible="show"
    src="https://example.com/photo.jpg"
    show-delete
    delete-text="删除"
    @delete="onDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)

const onDelete = () => {
  console.log('删除当前图片')
}
</script>
```

## 自定义操作区

通过 default slot 替代默认删除按钮，实现自定义操作区域。

```vue
<template>
  <weui-button type="primary" @click="show = true">自定义操作</weui-button>
  <weui-gallery v-model:visible="show" src="https://example.com/photo.jpg">
    <view class="custom-actions">
      <text class="action-item" @click="onSave">保存</text>
      <text class="action-item" @click="onShare">分享</text>
    </view>
  </weui-gallery>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)

const onSave = () => {
  console.log('保存图片')
}

const onShare = () => {
  console.log('分享图片')
}
</script>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | `boolean` | `false` |
| src | 图片地址 | `string` | — |
| show-delete | 是否显示删除按钮 | `boolean` | `false` |
| delete-text | 删除按钮文字 | `string` | `删除` |
| ext-class | 自定义附加类名 | `string` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态变化时触发 | `(value: boolean)` |
| delete | 点击删除按钮时触发 | — |
| hide | 画廊关闭时触发 | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义操作区，替代默认删除按钮 |
