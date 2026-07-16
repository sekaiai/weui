# Cell 列表项

Cell 是 WeUI 中最基础的布局组件，用于构建列表项、表单项、设置项等。Cell-group 作为容器，提供标题、说明文字和分组样式。

## 基础用法

使用 `weui-cell-group` 包裹 `weui-cell`，通过 `title` 和 `value` 设置左右内容。

```vue
<template>
  <weui-cell-group title="带说明的列表项">
    <weui-cell title="标题文字" value="说明文字" />
    <weui-cell title="标题文字" value="说明文字" />
  </weui-cell-group>
</template>
```

## 带图标的列表

通过 `icon` 属性设置 header 图标地址。

```vue
<template>
  <weui-cell-group title="带图标的列表项">
    <weui-cell icon="/static/icon.png" title="标题文字" value="说明文字" />
  </weui-cell-group>
</template>
```

也可以使用 `icon` 具名插槽自定义图标内容。

## 链接型列表

通过 `link` 属性启用链接样式（显示箭头），配合 `url` 属性实现点击跳转。

```vue
<template>
  <weui-cell-group title="带跳转的列表项">
    <weui-cell title="cell standard" link url="/pages/detail/detail" />
    <weui-cell title="cell standard" link url="/pages/detail/detail" />
  </weui-cell-group>
</template>
```

`link` 为 `true` 但 `url` 为空时，仅触发 `@click` 事件，不跳转。

## 带副标题的列表

通过默认插槽在 body 区域放置更丰富的内容。

```vue
<template>
  <weui-cell-group title="带副标题的列表项">
    <weui-cell link>
      <template #default>
        <view>标题文字</view>
        <view class="weui-cell__desc">副标题</view>
      </template>
    </weui-cell>
  </weui-cell-group>
</template>
```

## 上下布局

通过 `inline` 属性设置为 `false`，header 和 body 将上下排列（追加 `weui-cell_label-block` 类），适用于表单标签独占一行的场景。

```vue
<template>
  <weui-cell-group form title="表单">
    <weui-cell :inline="false" title="留言">
      <input class="weui-input" placeholder="请输入留言" />
    </weui-cell>
  </weui-cell-group>
</template>
```

## 表单型分组

通过 `form` 属性启用表单型分组样式（圆角卡片外观）。

```vue
<template>
  <weui-cell-group form title="表单分组">
    <weui-cell title="姓名" value="张三" />
    <weui-cell title="手机号" value="13800138000" />
  </weui-cell-group>
</template>
```

## 分组底部说明

通过 `footer` 属性在分组底部显示说明文字。

```vue
<template>
  <weui-cell-group title="列表" footer="底部说明文字">
    <weui-cell title="标题文字" />
  </weui-cell-group>
</template>
```

## 视觉变体

通过 `variant` 属性设置 cell 的视觉变体，自动追加对应的 CSS 类。

```vue
<template>
  <weui-cell-group title="变体示例">
    <weui-cell variant="warn" title="警告项" />
    <weui-cell variant="switch" title="开关项">
      <template #footer><switch checked /></template>
    </weui-cell>
    <weui-cell variant="vcode" title="验证码">
      <template #footer><weui-button vcode>获取验证码</weui-button></template>
    </weui-cell>
  </weui-cell-group>
</template>
```

可用变体：`access`、`link`、`switch`、`vcode`、`warn`、`select`、`select-before`、`select-after`、`uploader`。

## 自定义插槽

Cell 提供四个具名插槽，分别对应 header 和 footer 区域。

```vue
<template>
  <weui-cell>
    <template #icon><image src="/static/icon.png" /></template>
    <template #title>自定义标题</template>
    <template #default>自定义内容</template>
    <template #footer>自定义说明</template>
  </weui-cell>
</template>
```

## Attributes

### Cell

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | header 标题文字 | `string` | `''` |
| value | body 内容文字 | `string` | `''` |
| icon | header 图标地址 | `string` | — |
| footer | footer 文字内容 | `string` | `''` |
| link | 是否为链接型（等价于 `variant='access'`） | `boolean` | `false` |
| url | `link=true` 时的跳转 url | `string` | `''` |
| hover | 是否启用按下态高亮 | `boolean` | `true` |
| inline | `true`=左右布局，`false`=上下布局 | `boolean` | `true` |
| hasHeader | 是否渲染 header 区域 | `boolean` | `true` |
| hasBody | 是否渲染 body 区域 | `boolean` | `true` |
| hasFooter | 是否渲染 footer 区域 | `boolean` | `true` |
| variant | 视觉变体 | `CellVariant` | `'default'` |
| extClass | 根元素扩展类名 | `string` | — |
| iconClass | header 扩展类名 | `string` | — |
| bodyClass | body 扩展类名 | `string` | — |
| footerClass | footer 扩展类名 | `string` | — |
| ariaRole | 根元素 aria-role | `string` | — |

### CellGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 组标题 | `string` | — |
| footer | 组底部说明文字 | `string` | — |
| form | 是否为表单型组 | `boolean` | `false` |
| variant | 视觉变体 | `CellGroupVariant` | `'default'` |
| extClass | 根元素扩展类名 | `string` | — |
| ariaRole | 根元素 aria-role | `string` | — |

## Events

### Cell

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击 cell 时触发 | `(event: Event)` |
| navigate | `link=true` 且 `url` 非空，跳转成功时触发 | `(res: unknown)` |
| navigate-error | 跳转失败时触发 | `(err: unknown)` |

## Slots

### Cell

| 插槽名 | 说明 | 备注 |
| --- | --- | --- |
| icon | header 图标 | `icon` prop 为空时启用 |
| title | header 标题 | `title` prop 为空时启用 |
| default | body 内容 | `value` prop 为空时启用 |
| footer | footer 内容 | `footer` prop 为空时启用 |

### CellGroup

| 插槽名 | 说明 | 备注 |
| --- | --- | --- |
| title | 组标题 | `title` prop 为空时启用 |
| default | cell 子项 | — |
| footer | 底部说明 | `footer` prop 为空时启用 |
