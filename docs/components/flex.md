# Flex 弹性布局

用于构建灵活的弹性布局结构。`weui-flex` 作为容器，`weui-flex-item` 作为子项，配合 `direction`、`wrap`、`justify`、`align` 等属性可快速实现常见的布局需求。

## 基础用法

使用 `weui-flex` 包裹多个 `weui-flex-item`，子项默认等分容器宽度（`flex: 1`）。

```vue
<template>
  <weui-flex>
    <weui-flex-item>
      <view class="placeholder">A</view>
    </weui-flex-item>
    <weui-flex-item>
      <view class="placeholder">B</view>
    </weui-flex-item>
    <weui-flex-item>
      <view class="placeholder">C</view>
    </weui-flex-item>
  </weui-flex>
</template>
```

## 自定义 flex 比例

通过 `weui-flex-item` 的 `flex` 属性设置子项的伸缩比例。不设置时使用默认的 `flex: 1`。

```vue
<template>
  <weui-flex>
    <weui-flex-item :flex="2">
      <view class="placeholder">2</view>
    </weui-flex-item>
    <weui-flex-item :flex="1">
      <view class="placeholder">1</view>
    </weui-flex-item>
    <weui-flex-item :flex="1">
      <view class="placeholder">1</view>
    </weui-flex-item>
  </weui-flex>
</template>
```

## 主轴方向

通过 `direction` 属性设置主轴方向：`row`（默认）、`column`、`row-reverse`、`column-reverse`。

```vue
<template>
  <weui-flex direction="column">
    <weui-flex-item>
      <view class="placeholder">A</view>
    </weui-flex-item>
    <weui-flex-item>
      <view class="placeholder">B</view>
    </weui-flex-item>
  </weui-flex>
</template>
```

## 主轴对齐

通过 `justify` 属性设置主轴对齐方式：`start`（默认）、`end`、`center`、`between`、`around`、`evenly`。

```vue
<template>
  <weui-flex justify="center">
    <weui-flex-item>
      <view class="placeholder">居中</view>
    </weui-flex-item>
  </weui-flex>
</template>
```

## 交叉轴对齐

通过 `align` 属性设置交叉轴对齐方式：`center`（默认）、`start`、`end`、`baseline`、`stretch`。

```vue
<template>
  <weui-flex align="start">
    <weui-flex-item>
      <view class="placeholder">顶部对齐</view>
    </weui-flex-item>
    <weui-flex-item>
      <view class="placeholder">B</view>
    </weui-flex-item>
  </weui-flex>
</template>
```

## 换行方式

通过 `wrap` 属性设置换行方式：`nowrap`（默认）、`wrap`、`wrap-reverse`。

```vue
<template>
  <weui-flex wrap="wrap">
    <weui-flex-item v-for="i in 6" :key="i">
      <view class="placeholder">{{ i }}</view>
    </weui-flex-item>
  </weui-flex>
</template>
```

## 扩展类名

通过 `extClass` 属性追加自定义类名，用于自定义样式覆盖。

```vue
<template>
  <weui-flex ext-class="my-flex">
    <weui-flex-item ext-class="my-item">
      <view class="placeholder">自定义</view>
    </weui-flex-item>
  </weui-flex>
</template>
```

## Attributes

### Flex

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 主轴方向 | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` |
| wrap | 换行方式 | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'nowrap'` |
| justify | 主轴对齐方式 | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | `'start'` |
| align | 交叉轴对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'center'` |
| extClass | 根元素扩展类名 | `string` | — |

### FlexItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| flex | 自定义 flex 值；不设置时使用 `weui-flex__item` 的 `flex:1` | `number` | — |
| extClass | 根元素扩展类名 | `string` | — |

## Slots

### Flex

| 插槽名 | 说明 |
| --- | --- |
| default | flex 子项内容 |

### FlexItem

| 插槽名 | 说明 |
| --- | --- |
| default | 子项内容 |

## CSS 类映射

| 属性值 | 追加的 CSS 类 |
| --- | --- |
| `direction="column"` | `weui-flex__direction-column` |
| `direction="row-reverse"` | `weui-flex__direction-row-reverse` |
| `direction="column-reverse"` | `weui-flex__direction-column-reverse` |
| `wrap="wrap"` | `weui-flex__wrap-wrap` |
| `wrap="wrap-reverse"` | `weui-flex__wrap-wrap-reverse` |
| `justify="between"` | `weui-flex__justify-between` |
| `justify="around"` | `weui-flex__justify-around` |
| `justify="center"` | `weui-flex__justify-center` |
| `justify="end"` | `weui-flex__justify-end` |
| `align="start"` | `weui-flex__align-start` |
| `align="end"` | `weui-flex__align-end` |
| `align="baseline"` | `weui-flex__align-baseline` |
| `align="stretch"` | `weui-flex__align-stretch` |

> `direction="row"`、`wrap="nowrap"`、`justify="start"`、`align="center"` 为默认值，不追加额外类名。
