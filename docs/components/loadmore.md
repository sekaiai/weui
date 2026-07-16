# Loadmore 加载更多

用于列表底部展示加载状态，支持加载中、分割线、点点三种样式，常见于列表上拉加载和"暂无更多数据"提示。

## 基础用法

默认 `type` 为 `default`，渲染加载图标和文字，文字默认为"正在加载"。

```vue
<template>
  <weui-loadmore />
  <weui-loadmore text="加载中..." />
</template>
```

## 分割线样式

设置 `type` 为 `line`，渲染分割线和文字，常用于"暂无数据"分隔场景。

```vue
<template>
  <weui-loadmore type="line" text="暂无数据" />
</template>
```

## 点点样式

设置 `type` 为 `dot`，渲染点点样式，常用于列表底部"已无更多数据"的视觉提示。

```vue
<template>
  <weui-loadmore type="dot" />
</template>
```

## 自定义文字

通过 `text` 属性自定义文字内容，适用于不同业务场景的加载提示。

```vue
<template>
  <weui-loadmore text="正在加载更多" />
  <weui-loadmore type="line" text="没有更多了" />
</template>
```

## 隐藏文字

通过 `showText` 属性控制是否显示文字，设为 `false` 时仅保留加载图标或点点视觉。

```vue
<template>
  <weui-loadmore :show-text="false" />
  <weui-loadmore type="dot" :show-text="false" />
</template>
```

## 扩展类名

通过 `extClass` 属性追加自定义类名，用于在父容器中定制样式（如调整间距）。

```vue
<template>
  <weui-loadmore ext-class="my-loadmore" />
</template>

<style>
.my-loadmore {
  margin-top: 40px;
}
</style>
```

## 列表加载场景

加载更多组件常配合列表使用，放在列表底部作为加载或结束提示：

```vue
<template>
  <view class="weui-cells">
    <view class="weui-cell" v-for="item in list" :key="item.id">
      <view class="weui-cell__bd">{{ item.text }}</view>
    </view>
  </view>
  <weui-loadmore v-if="loading" text="正在加载" />
  <weui-loadmore v-else-if="finished" type="line" text="暂无更多数据" />
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 显示模式：`default` 加载图标+文字，`line` 分割线+文字，`dot` 点点样式 | `'default' \| 'line' \| 'dot'` | `'default'` |
| text | 文字内容 | `string` | `'正在加载'` |
| showText | 是否显示文字 | `boolean` | `true` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |
