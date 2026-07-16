# Loading 加载

用于页面或区块的加载状态提示，展示旋转加载图标，支持行内模式和页面模式。

## 基础用法

默认 `type` 为 `default`，渲染行内加载图标。通过 `text` 属性添加加载文字。

```vue
<template>
  <weui-loading />
  <weui-loading text="加载中..." />
</template>
```

## 页面模式

设置 `type` 为 `page`，渲染居中的加载状态，使用 `weui-loadmore` 容器样式，适合页面级或区块级加载场景。

```vue
<template>
  <weui-loading type="page" text="正在加载" />
</template>
```

## 自定义尺寸

通过 `size` 属性设置加载图标尺寸（px），默认为 20px。

```vue
<template>
  <weui-loading :size="32" />
  <weui-loading :size="16" text="加载中..." />
</template>
```

## 自定义颜色

通过 `color` 属性设置加载图标颜色，默认为 `#999`。

```vue
<template>
  <weui-loading color="#1AAD19" text="加载中..." />
</template>
```

## 透明背景

通过 `transparent` 属性启用透明背景模式，适用于深色或带背景图的场景。

```vue
<template>
  <weui-loading transparent text="加载中..." />
</template>
```

## 自定义文字

通过默认插槽自定义加载文字内容，插槽优先于 `text` 属性。

```vue
<template>
  <weui-loading>
    <text>自定义加载文字</text>
  </weui-loading>
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 显示模式：`default` 行内加载，`page` 居中加载状态 | `'default' \| 'page'` | `'default'` |
| size | 加载图标尺寸 px | `number` | `20` |
| color | 加载图标颜色 | `string` | `'#999'` |
| text | 加载文字 | `string` | — |
| transparent | 透明背景模式 | `boolean` | `false` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义加载文字，优先于 `text` 属性 |
