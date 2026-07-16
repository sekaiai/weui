# Panel 面板

用于组合内容区块，可作为列表、图文等内容的容器。

## 基础用法

通过 `title` 属性设置头部标题，默认插槽放置主体内容。

```vue
<template>
  <weui-panel title="标题">
    <view class="weui-cells">主体内容</view>
  </weui-panel>
</template>
```

## 无标题面板

不传 `title` 时，头部区域不渲染，仅显示主体。

```vue
<template>
  <weui-panel>
    <view class="weui-cells">主体内容</view>
  </weui-panel>
</template>
```

## Access 模式

通过 `type="access"` 开启访问模式，面板会添加 `weui-panel_access` 类，常用于可点击的列表场景。

```vue
<template>
  <weui-panel type="access" title="图文组合列表">
    <view class="weui-media-box weui-media-box_appmsg">
      <view class="weui-media-box__hd">
        <image class="weui-media-box__thumb" src="logo.png" />
      </view>
      <view class="weui-media-box__bd">
        <view class="weui-media-box__title">标题一</view>
        <view class="weui-media-box__desc">由各种物质组成的巨型球状天体</view>
      </view>
    </view>
  </weui-panel>
</template>
```

## 自定义头部

通过 `header` 插槽替代 `title`，渲染完全自定义的头部内容。

```vue
<template>
  <weui-panel>
    <template #header>
      <view class="weui-panel__title">自定义头部</view>
    </template>
    <view class="weui-cells">主体内容</view>
  </weui-panel>
</template>
```

## 底部内容

通过 `footer` 插槽渲染面板底部内容，未提供时不渲染底部区域。

```vue
<template>
  <weui-panel title="标题">
    <view class="weui-cells">主体内容</view>
    <template #footer>
      <view class="weui-panel__ft">查看更多</view>
    </template>
  </weui-panel>
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 头部标题 | `string` | — |
| type | 面板类型，access 模式添加 `weui-panel_access` 类 | `'default' \| 'access'` | `'default'` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 主体内容 | — |
| header | 自定义头部，替代 title | — |
| footer | 底部内容 | — |
