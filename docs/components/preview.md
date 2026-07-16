# Preview 表单预览

用于展示键值对信息，常见于订单详情、支付结果、账单等场景。组件结构分为头部（标题）、主体（键值对列表）、底部（操作按钮）三部分，各部分均可通过属性或插槽自定义。

## 基础用法

通过 `title` 设置头部标题，`items` 配置键值对列表，`buttons` 配置底部操作按钮。

```vue
<template>
  <weui-preview
    title="合计：¥99.00"
    :items="items"
    :buttons="buttons"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import type { PreviewItem, PreviewButton } from 'weui-design-vue'

const items: PreviewItem[] = [
  { label: '商品', value: 'WeUI 设计指南' },
  { label: '数量', value: '1' },
  { label: '金额', value: '¥99.00' },
]

const buttons: PreviewButton[] = [
  { text: '取消', type: 'default' },
  { text: '确定', type: 'primary' },
]

const onButtonTap = (btn: PreviewButton, index: number) => {
  console.log(btn, index)
}
</script>
```

## 仅展示信息

不传 `buttons` 时只展示头部与键值对信息，无底部操作区。

```vue
<template>
  <weui-preview
    title="收款方：WeUI"
    :items="items"
  />
</template>

<script setup lang="ts">
import type { PreviewItem } from 'weui-design-vue'

const items: PreviewItem[] = [
  { label: '付款方', value: '张三' },
  { label: '交易时间', value: '2024-01-01 12:00' },
  { label: '交易单号', value: '2024010100001234' },
]
</script>
```

## 按钮类型

`buttons` 中每项的 `type` 控制按钮样式：`primary` 为链接色（强调），`default` 为常规色，未指定时使用基础链接色。

```vue
<template>
  <weui-preview
    :items="items"
    :buttons="buttons"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import type { PreviewItem, PreviewButton } from 'weui-design-vue'

const items: PreviewItem[] = [
  { label: '状态', value: '待支付' },
  { label: '金额', value: '¥199.00' },
]

const buttons: PreviewButton[] = [
  { text: '取消订单', type: 'default' },
  { text: '立即支付', type: 'primary' },
]

const onButtonTap = (btn: PreviewButton, index: number) => {
  console.log(btn, index)
}
</script>
```

## 自定义头部

通过 `header` 插槽替代 `title`，渲染自定义头部内容。

```vue
<template>
  <weui-preview :items="items">
    <template #header>
      <view class="custom-header">自定义头部</view>
    </template>
  </weui-preview>
</template>

<script setup lang="ts">
import type { PreviewItem } from 'weui-design-vue'

const items: PreviewItem[] = [
  { label: '金额', value: '¥99.00' },
]
</script>

<style>
.custom-header {
  text-align: right;
  font-size: 16px;
  font-weight: bold;
}
</style>
```

## 自定义主体

通过默认插槽替代 `items`，渲染自定义主体内容。

```vue
<template>
  <weui-preview title="订单详情">
    <view class="custom-body">
      <text>这里是自定义的主体内容，可以是任意结构。</text>
    </view>
  </weui-preview>
</template>
```

## 自定义底部

通过 `footer` 插槽替代 `buttons`，渲染自定义底部操作区。

```vue
<template>
  <weui-preview :items="items">
    <template #footer>
      <view class="custom-footer" @click="onConfirm">自定义底部按钮</view>
    </template>
  </weui-preview>
</template>

<script setup lang="ts">
const onConfirm = () => {
  console.log('confirm')
}
</script>
```

## 扩展类名

通过 `extClass` 在根元素追加自定义类名，用于定制样式。

```vue
<template>
  <weui-preview
    title="合计：¥99.00"
    :items="items"
    ext-class="my-preview"
  />
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 头部标题 | `string` | — |
| items | 键值对信息列表 | `PreviewItem[]` | `[]` |
| buttons | 底部按钮列表 | `PreviewButton[]` | `[]` |
| ext-class | 附加在根元素上的扩展类名 | `string` | — |

### PreviewItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 信息项标签 | `string` | — |
| value | 信息项值 | `string` | — |

### PreviewButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 按钮文字 | `string` | — |
| type | 按钮类型，未指定时使用基础链接色 | `'default' \| 'primary'` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| buttontap | 点击底部按钮时触发 | `(button: PreviewButton, index: number)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义主体内容（替代 items） |
| header | 自定义头部（替代 title） |
| footer | 自定义底部（替代 buttons） |
