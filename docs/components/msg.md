# Msg 提示页

用于展示操作结果或重要信息的整页提示，常出现在操作流程的终点（如提交成功、支付完成、审核失败等），由图标、标题、描述与操作按钮组成。

## 基础用法

通过 `type` 指定图标类型（对应 `weui-icon-*`），`title` 与 `desc` 设置文案，`buttons` 配置操作按钮。

```vue
<template>
  <weui-msg
    type="success"
    title="操作成功"
    desc="内容详情，可根据实际需要安排"
    :buttons="buttons"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
const buttons = [
  { text: '推荐操作', type: 'primary' },
  { text: '辅助操作', type: 'default' },
]

const onButtonTap = (btn, index) => {
  console.log(btn, index)
}
</script>
```

## 图标类型

`type` 对应 WeUI 内置图标：`success`（成功）、`info`（信息）、`warn`（警告）、`waiting`（等待）等。可通过 `iconSize` 调整图标尺寸（默认 64px）。

```vue
<template>
  <weui-msg type="warn" title="操作失败" desc="请稍后重试" />
</template>
```

## 自定义图标

使用 `icon` 插槽替换默认图标。

```vue
<template>
  <weui-msg title="自定义图标">
    <template #icon>
      <image class="custom-icon" src="/static/custom.png" />
    </template>
  </weui-msg>
</template>
```

## 自定义内容

使用默认插槽替换默认的图标 + 标题 + 描述区域，适用于完全自定义布局的场景。

```vue
<template>
  <weui-msg :buttons="[{ text: '返回', type: 'primary' }]">
    <view class="custom-content">
      <text>完全自定义的内容</text>
    </view>
  </weui-msg>
</template>
```

## 底部额外区域

使用 `footer` 插槽在操作按钮下方渲染额外内容（如版权信息、相关链接）。

```vue
<template>
  <weui-msg type="success" title="操作成功">
    <template #footer>
      <view class="weui-footer">
        <text class="weui-footer__text">Copyright © 2026</text>
      </view>
    </template>
  </weui-msg>
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 图标类型，对应 `weui-icon-*` 类（success/info/warn/waiting 等） | `string` | — |
| iconSize | 图标尺寸 px | `number` | `64` |
| title | 标题 | `string` | — |
| desc | 描述文字 | `string` | — |
| buttons | 操作按钮列表 | `MsgButton[]` | `[]` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

### MsgButton

| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 按钮文字 | `string` | — |
| type | 按钮类型，`default` 辅助操作 / `primary` 主操作 | `'default' \| 'primary'` | `'default'` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| buttontap | 点击操作按钮时触发 | `(button: MsgButton, index: number)` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义内容，替换默认的图标 + 标题 + 描述区域 |
| icon | 自定义图标，替换默认 `weui-icon` |
| footer | 底部额外区域，渲染在操作按钮下方 |
