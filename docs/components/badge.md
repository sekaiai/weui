# Badge 徽章

用于显示角标数字或红点提示，常用于列表项、头像、按钮等元素上，表示新消息、未读数或更新状态。

## 基础用法

通过 `content` 属性设置徽章内容。当 `content` 为空时，徽章会自动切换为红点模式。

```vue
<template>
  <weui-badge content="8" />
</template>
```

## 红点模式

不传 `content` 或 `content` 为空字符串时，自动显示为小红点。

```vue
<template>
  <weui-badge />
</template>
```

## 文字角标

`content` 不限于数字，也支持任意短文本（如 "New"）。

```vue
<template>
  <weui-badge content="New" />
</template>
```

## 无障碍标签

通过 `ariaLabel` 属性设置无障碍标签，读屏时会朗读完整语义。建议在内容为数字时补充单位描述（如 "8 个新通知"）。

```vue
<template>
  <weui-badge content="8" aria-label="，8个新通知" />
</template>
```

## 扩展类名

通过 `extClass` 属性追加自定义类名，用于在父容器中定位（如绝对定位到头像右上角）。

```vue
<template>
  <view class="avatar-wrap">
    <image class="avatar" src="/static/avatar.png" />
    <weui-badge content="8" ext-class="avatar-badge" />
  </view>
</template>

<style>
.avatar-wrap {
  position: relative;
  display: inline-block;
}
.avatar-badge {
  position: absolute;
  top: -0.4em;
  right: -0.4em;
}
</style>
```

## 列表项角标场景

徽章常配合列表使用，放在 `weui-cell__ft` 或 `weui-cell__bd` 中：

```vue
<template>
  <view class="weui-cell weui-cell_access">
    <view class="weui-cell__bd">单行列表</view>
    <view class="weui-cell__ft">
      <text>详细信息</text>
      <weui-badge aria-label="，有更新" />
    </view>
  </view>
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 徽章内容；为空时自动切换为红点模式 | `string` | `''` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |
| ariaLabel | 无障碍标签，输出到 `aria-label` 属性 | `string` | — |
