# Progress 进度条

用于展示任务或活动的当前进度，常用于文件上传、下载、表单填写等场景。

## 基础用法

通过 `percent` 属性设置进度百分比（0-100），右侧默认显示百分比文字。

```vue
<template>
  <weui-progress :percent="30" />
</template>
```

## 隐藏百分比文字

通过 `showInfo` 属性控制是否显示右侧百分比文字，默认为 `true`。

```vue
<template>
  <weui-progress :percent="50" :show-info="false" />
</template>
```

## 自定义高度

通过 `strokeWidth` 属性设置进度条高度（px），不传时使用 weui 默认高度。

```vue
<template>
  <weui-progress :percent="60" :stroke-width="6" />
</template>
```

## 自定义激活颜色

通过 `activeColor` 属性设置进度条前景色，适用于不同语义（成功、警告、危险等）。

```vue
<template>
  <weui-progress :percent="80" active-color="#10aeff" />
  <weui-progress :percent="60" active-color="#fa9d3b" />
  <weui-progress :percent="40" active-color="#fa5151" />
</template>
```

## 自定义背景色

通过 `backgroundColor` 属性设置进度条背景色。

```vue
<template>
  <weui-progress :percent="70" background-color="#ededed" />
</template>
```

## 组合使用

`strokeWidth`、`activeColor`、`backgroundColor` 可组合使用以匹配自定义视觉风格。

```vue
<template>
  <weui-progress
    :percent="75"
    :stroke-width="8"
    active-color="#07c160"
    background-color="#e5e5e5"
  />
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 进度百分比 0-100 | `number` | — |
| showInfo | 是否显示右侧百分比文字 | `boolean` | `true` |
| strokeWidth | 进度条高度 px | `number` | — |
| activeColor | 进度条激活颜色 | `string` | — |
| backgroundColor | 进度条背景色 | `string` | — |
| extClass | 附加在根元素上的扩展类名 | `string` | — |
