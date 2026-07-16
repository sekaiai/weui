# List 列表

列表容器，用于组织列表内容。可通过 `title` 设置列表标题，`tips` 设置底部提示文字，默认插槽放置列表主体。

## 基础用法

通过默认插槽放置列表项，常用 `weui-cells` 包裹一组 `weui-cell`。

```vue
<template>
  <weui-list>
    <view class="weui-cells">
      <view class="weui-cell">
        <view class="weui-cell__bd">标题文字</view>
        <view class="weui-cell__ft">说明文字</view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__bd">标题文字</view>
        <view class="weui-cell__ft">说明文字</view>
      </view>
    </view>
  </weui-list>
</template>
```

## 列表标题

通过 `title` 属性设置列表标题，渲染 `.weui-list__title`。不传时不渲染标题区域。

```vue
<template>
  <weui-list title="列表标题">
    <view class="weui-cells">
      <view class="weui-cell">
        <view class="weui-cell__bd">标题文字</view>
        <view class="weui-cell__ft">说明文字</view>
      </view>
    </view>
  </weui-list>
</template>
```

## 底部提示

通过 `tips` 属性设置列表底部提示文字，渲染 `.weui-list__tips`。不传时不渲染提示区域。

```vue
<template>
  <weui-list tips="底部提示文字">
    <view class="weui-cells">
      <view class="weui-cell">
        <view class="weui-cell__bd">标题文字</view>
        <view class="weui-cell__ft">说明文字</view>
      </view>
    </view>
  </weui-list>
</template>
```

## 标题与提示组合

同时设置 `title` 与 `tips`，标题渲染在主体之前，提示渲染在主体之后。

```vue
<template>
  <weui-list title="列表标题" tips="底部提示文字">
    <view class="weui-cells">
      <view class="weui-cell">
        <view class="weui-cell__bd">标题文字</view>
        <view class="weui-cell__ft">说明文字</view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__bd">标题文字</view>
        <view class="weui-cell__ft">说明文字</view>
      </view>
    </view>
  </weui-list>
</template>
```

## 扩展类名

通过 `extClass` 属性追加自定义类名到根元素，用于自定义样式定位。

```vue
<template>
  <weui-list title="标题" ext-class="custom-list">
    <view class="weui-cells">
      <view class="weui-cell">
        <view class="weui-cell__bd">标题文字</view>
        <view class="weui-cell__ft">说明文字</view>
      </view>
    </view>
  </weui-list>
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列表标题 | `string` | — |
| tips | 列表底部提示文字 | `string` | — |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 列表内容 | — |
