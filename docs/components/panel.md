# Panel 面板

用于组合内容区块，可作为列表、图文等内容的容器。面板由头部（标题）、主体、底部三部分组成，各部分均可通过属性或插槽自定义。

## 基础用法

通过 `title` 属性设置头部标题，默认插槽放置主体内容。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel title="标题">
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">标题文字</div>
          <div class="weui-cell__ft">说明文字</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">标题文字</div>
          <div class="weui-cell__ft">说明文字</div>
        </div>
      </div>
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel title="标题">
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">标题文字</div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div>
  </weui-panel>
</template>
```
:::

## 无标题面板

不传 `title` 时，头部区域（`.weui-panel__hd`）不渲染，仅显示主体。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">标题文字</div>
          <div class="weui-cell__ft">说明文字</div>
        </div>
      </div>
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">标题文字</div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div>
  </weui-panel>
</template>
```
:::

## Access 模式

通过 `type="access"` 开启访问模式，面板根元素追加 `weui-panel_access` 类，常用于可点击的图文列表场景。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel type="access" title="图文组合列表">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" src="https://weui.io/images/pic_160.png" />
        </div>
        <div class="weui-media-box__bd">
          <div class="weui-media-box__title">标题一</div>
          <div class="weui-media-box__desc">由各种物质组成的巨型球状天体</div>
        </div>
      </div>
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="图文组合列表">
    <div class="weui-media-box weui-media-box_appmsg">
      <div class="weui-media-box__hd">
        <img class="weui-media-box__thumb" src="https://weui.io/images/pic_160.png" />
      </div>
      <div class="weui-media-box__bd">
        <div class="weui-media-box__title">标题一</div>
        <div class="weui-media-box__desc">由各种物质组成的巨型球状天体</div>
      </div>
    </div>
  </weui-panel>
</template>
```
:::

## 自定义头部

通过 `header` 插槽替代 `title`，渲染完全自定义的头部内容。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel>
      <template #header>
        <div style="font-weight: bold; color: #576b95;">自定义头部</div>
      </template>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">主体内容</div>
        </div>
      </div>
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel>
    <template #header>
      <div style="font-weight: bold; color: #576b95;">自定义头部</div>
    </template>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">主体内容</div>
      </div>
    </div>
  </weui-panel>
</template>
```
:::

## 底部内容

通过 `footer` 插槽渲染面板底部内容（`.weui-panel__ft`），未提供时不渲染底部区域。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel title="标题">
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">标题文字</div>
          <div class="weui-cell__ft">说明文字</div>
        </div>
      </div>
      <template #footer>
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">查看更多</div>
          <div class="weui-cell__ft" />
        </div>
      </template>
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel title="标题">
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">标题文字</div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div>
    <template #footer>
      <div class="weui-cell weui-cell_access weui-cell_link">
        <div class="weui-cell__bd">查看更多</div>
        <div class="weui-cell__ft" />
      </div>
    </template>
  </weui-panel>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 头部标题 | `string` | — |
| type | 面板类型，access 模式追加 `weui-panel_access` 类 | `'default' \| 'access'` | `'default'` |
| ext-class | 附加在根元素上的扩展类名 | `string` | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 主体内容 |
| header | 自定义头部，替代 `title` |
| footer | 底部内容，未提供时不渲染底部区域 |
