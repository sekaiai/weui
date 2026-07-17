# Form 表单容器

用于组织表单内容区域，统一承载标题、描述、控件、提示与操作按钮，是表单内容区的根容器。常配合 `cell-group`、`input`、`checkbox` 等组件使用。

## 基础用法

通过 `title` 设置表单标题，默认插槽放置控件区域内容。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-form title="表单标题">
      <view class="weui-cells weui-cells_form">
        <view class="weui-cell">
          <view class="weui-cell__hd"><label class="weui-label">姓名</label></view>
          <view class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入姓名" />
          </view>
        </view>
      </view>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="表单标题">
    <view class="weui-cells weui-cells_form">
      <view class="weui-cell">
        <view class="weui-cell__hd"><label class="weui-label">姓名</label></view>
        <view class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入姓名" />
        </view>
      </view>
    </view>
  </weui-form>
</template>
```
:::

## 标题与描述

通过 `title` 与 `desc` 同时设置标题与描述文字，分别渲染到 `.weui-form__title` 与 `.weui-form__desc`。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-form title="表单标题" desc="表单描述文字">
      <view class="weui-cells weui-cells_form">
        <view class="weui-cell">
          <view class="weui-cell__bd">控件内容</view>
        </view>
      </view>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="表单标题" desc="表单描述文字">
    <view class="weui-cells weui-cells_form">
      <view class="weui-cell">
        <view class="weui-cell__bd">控件内容</view>
      </view>
    </view>
  </weui-form>
</template>
```
:::

## 提示文字

通过 `tips` 属性在控件区域下方渲染提示文字，对应 `.weui-form__tips-area`。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-form title="表单标题" tips="底部提示文字">
      <view class="weui-cells weui-cells_form">
        <view class="weui-cell">
          <view class="weui-cell__bd">控件内容</view>
        </view>
      </view>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="表单标题" tips="底部提示文字">
    <view class="weui-cells weui-cells_form">
      <view class="weui-cell">
        <view class="weui-cell__bd">控件内容</view>
      </view>
    </view>
  </weui-form>
</template>
```
:::

## 操作按钮区域

通过 `footer` 插槽渲染操作按钮区域，对应 `.weui-form__opr-area`，未提供时不渲染。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-form title="表单标题">
      <view class="weui-cells weui-cells_form">
        <view class="weui-cell">
          <view class="weui-cell__bd">控件内容</view>
        </view>
      </view>
      <template #footer>
        <view class="weui-btn-area">
          <weui-button type="primary">确定</weui-button>
        </view>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="表单标题">
    <view class="weui-cells weui-cells_form">
      <view class="weui-cell">
        <view class="weui-cell__bd">控件内容</view>
      </view>
    </view>
    <template #footer>
      <view class="weui-btn-area">
        <weui-button type="primary">确定</weui-button>
      </view>
    </template>
  </weui-form>
</template>
```
:::

## 自定义标题区域

通过 `title` 插槽替代 `title`/`desc` 属性，渲染完全自定义的标题区域内容。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-form>
      <template #title>
        <view class="weui-form__title">自定义标题</view>
        <view class="weui-form__desc">通过 title 插槽自定义整段标题区域</view>
      </template>
      <view class="weui-cells weui-cells_form">
        <view class="weui-cell">
          <view class="weui-cell__bd">控件内容</view>
        </view>
      </view>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form>
    <template #title>
      <view class="weui-form__title">自定义标题</view>
      <view class="weui-form__desc">通过 title 插槽自定义整段标题区域</view>
    </template>
    <view class="weui-cells weui-cells_form">
      <view class="weui-cell">
        <view class="weui-cell__bd">控件内容</view>
      </view>
    </view>
  </weui-form>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 表单标题 | `string` | — |
| desc | 表单描述 | `string` | — |
| tips | 提示文字 | `string` | — |
| ext-class | 附加在根元素上的扩展类名 | `string` | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 控件区域内容 |
| title | 自定义标题区域，替代 `title`/`desc` |
| tips | 自定义提示区域，替代 `tips` |
| footer | 操作按钮区域 |
