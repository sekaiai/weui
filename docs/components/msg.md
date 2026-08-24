<script setup lang="ts">
import { ref } from 'vue'
import type { MsgButton } from 'weui-uniapp-design'

const successButtons: MsgButton[] = [
  { text: '推荐操作', type: 'primary' },
  { text: '辅助操作', type: 'default' },
]

const lastTapped = ref('')

const onTap = (btn: MsgButton, index: number) => {
  lastTapped.value = `点击了「${btn.text}」（index=${index}）`
}
</script>

# Msg 提示页

用于展示操作结果或重要信息的整页提示，常出现在操作流程的终点（如提交成功、支付完成、审核失败等），由图标、标题、描述与操作按钮组成。

> **uni-app 平台限制：** 默认图标不会由组件内部自动引入 `weui-icon`。需要自定义或显式显示图标时，请通过 `icon` slot 传入页面中可解析的 `<weui-icon>`；Vue 3/H5 默认图标行为不变。

## 基础用法

通过 `type` 指定图标类型（对应 `weui-icon-*`），`title`、`desc` 与 `desc-primary` 设置不同层级的文案，`buttons` 配置操作按钮。点击按钮触发 `buttontap` 事件。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-msg
      type="success"
      title="操作成功"
      desc="内容详情，可根据实际需要安排"
      :buttons="successButtons"
      @buttontap="onTap"
    />
  </div>
  <p style="margin-top: 8px; color: #576b95;">{{ lastTapped || '点击底部按钮试试' }}</p>
</div>

::: details 查看代码
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
import type { MsgButton } from 'weui-uniapp-design'

const buttons: MsgButton[] = [
  { text: '推荐操作', type: 'primary' },
  { text: '辅助操作', type: 'default' },
]

const onButtonTap = (btn: MsgButton, index: number) => {
  console.log(btn, index)
}
</script>
```
:::

## 图标类型

`type` 对应 WeUI 内置图标：`success`（成功）、`info`（信息）、`warn`（警告）、`waiting`（等待）等。可通过 `iconSize` 调整图标尺寸（默认 64px）。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-msg type="success" title="操作成功" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-msg type="success" title="操作成功" />
</template>
```
:::

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-msg type="warn" title="操作失败" desc="请稍后重试" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-msg type="warn" title="操作失败" desc="请稍后重试" />
</template>
```
:::

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-msg type="info" title="提示" desc="用于展示普通信息" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-msg type="info" title="提示" desc="用于展示普通信息" />
</template>
```
:::

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-msg type="waiting" title="等待中" desc="正在处理，请稍候" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-msg type="waiting" title="等待中" desc="正在处理，请稍候" />
</template>
```
:::

## 底部提示

通过 `tips` 属性在操作按钮下方渲染底部提示文字，对应 `.weui-msg__tips-area`。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-msg
      type="success"
      title="操作成功"
      :buttons="[{ text: '推荐操作', type: 'primary' }]"
      tips="提示详情，可根据实际需要安排，居中展现"
    />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-msg
    type="success"
    title="操作成功"
    :buttons="[{ text: '推荐操作', type: 'primary' }]"
    tips="提示详情，可根据实际需要安排，居中展现"
  />
</template>
```
:::

## 次级描述

`desc-primary` 使用官方的辅助文案样式，适合放在主描述之后补充说明。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-msg type="info" title="提示" desc="主要说明内容" desc-primary="此处是补充说明，视觉层级较低。" /></div></div>

::: details 查看代码
```vue
<weui-msg
  type="info"
  title="提示"
  desc="主要说明内容"
  desc-primary="此处是补充说明，视觉层级较低。"
/>
```
:::

## 自定义内容

使用默认插槽替换默认的图标 + 标题 + 描述区域，适用于完全自定义布局的场景。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-msg :buttons="[{ text: '返回', type: 'primary' }]">
      <div style="padding: 24px 0; text-align: center;">
        <span style="font-size: 16px; color: #353535;">完全自定义的内容</span>
      </div>
    </weui-msg>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-msg :buttons="[{ text: '返回', type: 'primary' }]">
    <div style="padding: 24px 0; text-align: center;">
      <span style="font-size: 16px; color: #353535;">完全自定义的内容</span>
    </div>
  </weui-msg>
</template>
```
:::

## 底部额外区域

使用 `footer` 插槽在操作按钮下方渲染额外内容（如版权信息、相关链接），对应 `.weui-msg__extra-area`。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-msg type="success" title="操作成功">
      <template #footer>
        <div class="weui-footer">
          <span class="weui-footer__text">Copyright © 2026</span>
        </div>
      </template>
    </weui-msg>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-msg type="success" title="操作成功">
    <template #footer>
      <div class="weui-footer">
        <span class="weui-footer__text">Copyright © 2026</span>
      </div>
    </template>
  </weui-msg>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 图标类型，对应 `weui-icon-*` 类（success/info/warn/waiting 等） | `string` | — |
| icon-size | 图标尺寸 px | `number` | `64` |
| title | 标题 | `string` | — |
| desc | 描述文字 | `string` | — |
| descPrimary | 次级描述文字 | `string` | — |
| buttons | 操作按钮列表 | `MsgButton[]` | `[]` |
| tips | 底部提示文字（操作按钮下方，`.weui-msg__tips-area`） | `string` | — |
| ext-class | 附加在根元素上的扩展类名 | `string` | — |

### MsgButton

| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 按钮文字 | `string` | — |
| type | 按钮类型，`default` 辅助操作 / `primary` 主操作 | `'default' \| 'primary'` | `'default'` |
| url | 跳转地址；提供时渲染为链接 | `string` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| buttontap | 点击操作按钮时触发 | `(button: MsgButton, index: number)` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义内容，替换默认的图标 + 标题 + 描述区域 |
| icon | 自定义图标，替换默认 `weui-icon` |
| tips | 自定义提示区域，替代 `tips` 属性 |
| footer | 底部额外区域，渲染在操作按钮下方 |
