# Grid 宫格

Grid 宫格布局组件，用于展示功能入口。`weui-grid` 作为容器，`weui-grid-item` 作为子项，常用于首页功能导航、快捷入口等场景。

## 基础用法

使用 `weui-grid` 包裹多个 `weui-grid-item`，通过 `icon` 和 `label` 设置图标与文字。

```vue
<template>
  <weui-grid>
    <weui-grid-item icon="/static/pic_160.png" label="Grid" />
    <weui-grid-item icon="/static/pic_160.png" label="Grid" />
    <weui-grid-item icon="/static/pic_160.png" label="Grid" />
  </weui-grid>
</template>
```

## 带跳转的宫格

通过 `url` 属性设置跳转链接，点击时自动调用 `uni.navigateTo` 跳转。

```vue
<template>
  <weui-grid>
    <weui-grid-item icon="/static/pic_160.png" label="首页" url="/pages/index/index" />
    <weui-grid-item icon="/static/pic_160.png" label="详情" url="/pages/detail/detail" />
  </weui-grid>
</template>
```

不传 `url` 时仅触发 `@click` 事件，由业务侧自行处理跳转逻辑。

## 自定义图标

通过 `icon` 具名插槽自定义图标内容，替代 `icon` prop 的 image。

```vue
<template>
  <weui-grid>
    <weui-grid-item label="自定义图标">
      <template #icon>
        <view class="custom-icon">★</view>
      </template>
    </weui-grid-item>
  </weui-grid>
</template>
```

## 自定义标签

通过 `label` 具名插槽自定义标签内容，替代 `label` prop 的纯文本。

```vue
<template>
  <weui-grid>
    <weui-grid-item icon="/static/pic_160.png">
      <template #label>
        <text>自定义标签</text>
      </template>
    </weui-grid-item>
  </weui-grid>
</template>
```

## 自定义内容

通过默认插槽完全自定义子项内容，此时 `icon` 和 `label` 将被忽略。

```vue
<template>
  <weui-grid>
    <weui-grid-item>
      <view class="custom-content">
        <view class="custom-content__icon">i</view>
        <view class="custom-content__label">自定义</view>
      </view>
    </weui-grid-item>
  </weui-grid>
</template>
```

## 扩展类名

通过 `extClass` 属性追加自定义类名，用于定制样式。

```vue
<template>
  <weui-grid ext-class="my-grids">
    <weui-grid-item icon="/static/pic_160.png" label="Grid" ext-class="my-grid-item" />
  </weui-grid>
</template>
```

## Attributes

### Grid

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extClass | 根元素扩展类名 | `string` | — |

### GridItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 URL 或 base64 | `string` | — |
| label | 文字标签 | `string` | — |
| url | 跳转链接，点击时调用 `uni.navigateTo` | `string` | — |
| extClass | 根元素扩展类名 | `string` | — |

## Events

### GridItem

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击宫格子项时触发 | `(event: Event)` |

## Slots

### Grid

| 插槽名 | 说明 | 备注 |
| --- | --- | --- |
| default | 宫格子项 | — |

### GridItem

| 插槽名 | 说明 | 备注 |
| --- | --- | --- |
| default | 自定义内容 | 启用时替代 icon + label |
| icon | 自定义图标 | `icon` prop 为空时启用 |
| label | 自定义标签 | `label` prop 为空时启用 |
