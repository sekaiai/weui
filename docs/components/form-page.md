# FormPage 表单页容器

用于整页表单布局，统一承载页面标题、描述、表单内容与底部操作区域，是表单页面的根容器。与 `form` 不同，`form-page` 定位为整页容器，没有 `tips` 区域。

## 基础用法

通过 `title` 设置页面标题，默认插槽放置表单内容。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-form-page title="页面标题">
      <view class="weui-cells weui-cells_form">
        <view class="weui-cell">
          <view class="weui-cell__hd"><label class="weui-label">姓名</label></view>
          <view class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入姓名" />
          </view>
        </view>
      </view>
    </weui-form-page>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form-page title="页面标题">
    <view class="weui-cells weui-cells_form">
      <view class="weui-cell">
        <view class="weui-cell__hd"><label class="weui-label">姓名</label></view>
        <view class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入姓名" />
        </view>
      </view>
    </view>
  </weui-form-page>
</template>
```
:::

## 标题与描述

通过 `title` 与 `desc` 同时设置标题与描述文字，分别渲染到 `.weui-form__title` 与 `.weui-form__desc`。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-form-page title="页面标题" desc="页面描述文字">
      <view class="weui-cells weui-cells_form">
        <view class="weui-cell">
          <view class="weui-cell__bd">表单内容</view>
        </view>
      </view>
    </weui-form-page>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form-page title="页面标题" desc="页面描述文字">
    <view class="weui-cells weui-cells_form">
      <view class="weui-cell">
        <view class="weui-cell__bd">表单内容</view>
      </view>
    </view>
  </weui-form-page>
</template>
```
:::

## 底部操作区域

通过 `footer` 插槽渲染底部操作区域，对应 `.weui-form__opr-area`，未提供时不渲染。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-form-page title="页面标题">
      <view class="weui-cells weui-cells_form">
        <view class="weui-cell">
          <view class="weui-cell__bd">表单内容</view>
        </view>
      </view>
      <template #footer>
        <view class="weui-btn-area">
          <weui-button type="primary">确定</weui-button>
        </view>
      </template>
    </weui-form-page>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form-page title="页面标题">
    <view class="weui-cells weui-cells_form">
      <view class="weui-cell">
        <view class="weui-cell__bd">表单内容</view>
      </view>
    </view>
    <template #footer>
      <view class="weui-btn-area">
        <weui-button type="primary">确定</weui-button>
      </view>
    </template>
  </weui-form-page>
</template>
```
:::

## 自定义标题区域

通过 `title` 插槽替代 `title`/`desc` 属性，渲染完全自定义的标题区域内容。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-form-page>
      <template #title>
        <view class="weui-form__title">自定义标题</view>
        <view class="weui-form__desc">通过 title 插槽自定义整段标题区域</view>
      </template>
      <view class="weui-cells weui-cells_form">
        <view class="weui-cell">
          <view class="weui-cell__bd">表单内容</view>
        </view>
      </view>
    </weui-form-page>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form-page>
    <template #title>
      <view class="weui-form__title">自定义标题</view>
      <view class="weui-form__desc">通过 title 插槽自定义整段标题区域</view>
    </template>
    <view class="weui-cells weui-cells_form">
      <view class="weui-cell">
        <view class="weui-cell__bd">表单内容</view>
      </view>
    </view>
  </weui-form-page>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 页面标题 | `string` | — |
| desc | 页面描述 | `string` | — |
| ext-class | 附加在根元素上的扩展类名 | `string` | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 表单内容 |
| title | 自定义标题区域，替代 `title`/`desc` |
| footer | 底部操作区域 |
