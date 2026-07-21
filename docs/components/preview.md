<script setup lang="ts">
import { ref } from 'vue'
import type { PreviewItem, PreviewButton } from 'weui-design-vue'

const basicItems: PreviewItem[] = [
  { label: '商品', value: 'WeUI 设计指南' },
  { label: '数量', value: '1' },
  { label: '金额', value: '¥99.00' },
]

const basicButtons: PreviewButton[] = [
  { text: '取消', type: 'default' },
  { text: '确定', type: 'primary' },
]

const infoItems: PreviewItem[] = [
  { label: '付款方', value: '张三' },
  { label: '交易时间', value: '2024-01-01 12:00' },
  { label: '交易单号', value: '2024010100001234' },
]

const typeItems: PreviewItem[] = [
  { label: '状态', value: '待支付' },
  { label: '金额', value: '¥199.00' },
]

const typeButtons: PreviewButton[] = [
  { text: '取消订单', type: 'default' },
  { text: '立即支付', type: 'primary' },
]

const lastTapped = ref('')

const onTap = (btn: PreviewButton, index: number) => {
  lastTapped.value = `点击了「${btn.text}」（index=${index}）`
}
</script>

# Preview 表单预览

用于展示键值对信息，常见于订单详情、支付结果、账单等场景。组件结构分为头部（标题）、主体（键值对列表）、底部（操作按钮）三部分，各部分均可通过属性或插槽自定义。

## 基础用法

通过 `title` 设置头部标题，`items` 配置键值对列表，`buttons` 配置底部操作按钮。点击按钮触发 `buttontap` 事件。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-preview
      title="合计：¥99.00"
      :items="basicItems"
      :buttons="basicButtons"
      @buttontap="onTap"
    />
  </div>
  <p style="margin-top: 8px; color: #576b95;">{{ lastTapped || '点击底部按钮试试' }}</p>
</div>

::: details 查看代码
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
:::

## 仅展示信息

不传 `buttons` 时只展示头部与键值对信息，无底部操作区。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-preview
      title="收款方：WeUI"
      :items="infoItems"
    />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-preview title="收款方：WeUI" :items="items" />
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
:::

## 按钮类型

`buttons` 中每项的 `type` 控制按钮样式：`primary` 为链接色（强调，`.weui-form-preview__btn_primary`），`default` 为常规色（`.weui-form-preview__btn_default`），未指定时使用基础链接色。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-preview
      :items="typeItems"
      :buttons="typeButtons"
      @buttontap="onTap"
    />
  </div>
  <p style="margin-top: 8px; color: #576b95;">{{ lastTapped || '点击底部按钮试试' }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-preview :items="items" :buttons="buttons" @buttontap="onButtonTap" />
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
:::

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
