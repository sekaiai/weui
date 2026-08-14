<script setup lang="ts">
const links = [
  { text: '首页' },
  { text: '关于' },
  { text: '联系' },
]
const linksWithUrl = [
  { text: 'WeUI', url: 'https://weui.io' },
  { text: 'Vue', url: 'https://vuejs.org' },
]
</script>

# Footer 页脚

用于页面底部展示版权信息、链接或自定义内容。

## 基础用法

通过 `text` 属性设置底部文字。

<div class="demo-block vp-raw">
  <weui-footer text="Copyright © 2026 weui.design" />
</div>

::: details 查看代码
```vue
<template>
  <weui-footer text="Copyright © 2026 weui.design" />
</template>
```
:::

## 带链接

通过 `links` 属性设置链接列表（`FooterLink[]`）。未提供 `url` 的链接渲染为纯文本。

<div class="demo-block vp-raw">
  <weui-footer :links="links" text="Copyright © 2026 weui.design" />
</div>

::: details 查看代码
```vue
<template>
  <weui-footer :links="links" text="Copyright © 2026 weui.design" />
</template>

<script setup lang="ts">
const links = [
  { text: '首页' },
  { text: '关于' },
  { text: '联系' },
]
</script>
```
:::

## 链接带 URL

当 `FooterLink` 提供 `url` 时，链接渲染为 `<a>` 标签（H5 中可点击跳转；uni-app 构建时由 build-plugin 自动转换为 `<navigator url="...">`）。

<div class="demo-block vp-raw">
  <weui-footer :links="linksWithUrl" text="Copyright © 2026 weui.design" />
</div>

::: details 查看代码
```vue
<template>
  <weui-footer :links="linksWithUrl" text="Copyright © 2026 weui.design" />
</template>

<script setup lang="ts">
const linksWithUrl = [
  { text: 'WeUI', url: 'https://weui.io' },
  { text: 'Vue', url: 'https://vuejs.org' },
]
</script>
```
:::

## 仅链接

不传 `text` 时仅展示链接。

<div class="demo-block vp-raw">
  <weui-footer :links="links" />
</div>

::: details 查看代码
```vue
<template>
  <weui-footer :links="links" />
</template>
```
:::

## 固定底部

通过 `fixed` 属性将页脚固定在视口底部（追加 `weui-footer_fixed-bottom` 类）。

<div class="demo-block vp-raw">
  <weui-footer fixed text="固定在底部的页脚" />
</div>

::: details 查看代码
```vue
<template>
  <weui-footer fixed text="固定在底部的页脚" />
</template>
```
:::

## 自定义内容

通过默认插槽传入自定义内容，覆盖 `text` 与 `links` 属性。

<div class="demo-block vp-raw">
  <weui-footer>
    <div class="weui-footer__text">这是通过插槽传入的自定义内容</div>
  </weui-footer>
</div>

::: details 查看代码
```vue
<template>
  <weui-footer>
    <div class="weui-footer__text">这是通过插槽传入的自定义内容</div>
  </weui-footer>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 底部文字 | `string` | — |
| links | 链接列表 | `FooterLink[]` | — |
| fixed | 是否固定在底部 | `boolean` | `false` |

## FooterLink

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 链接文字 | `string` | — |
| url | 链接地址，提供时渲染为 `<a>`（uni-app 构建时自动转换为 `<navigator url="...">`） | `string` | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义页脚内容，传入后覆盖 `text` 与 `links` |
