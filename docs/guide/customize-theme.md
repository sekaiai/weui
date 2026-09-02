# 定制主题

WeUI Uniapp Design 通过 CSS 变量提供主题定制能力。`weui.css` 已内置全部 `--weui-*` CSS 变量（含暗色模式），你只需在自己的项目样式中覆盖对应变量即可。

## 覆盖变量

在你的项目样式中覆盖 `weui.css` 内置的变量：

```css
:root {
  --weui-BRAND: #1989fa;
  --weui-RED: #ee0a24;
}
```

## 暗色模式

暗色模式默认跟随系统，`weui.css` 通过 `@media (prefers-color-scheme: dark)` 自动切换变量值。

如需手动控制，覆盖暗色模式下的变量即可：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --weui-BG: #111111;
    --weui-FG: #ffffff;
  }
}
```

## 组件局部定制

所有 `weui-*` 组件都支持 `ext-class`，并把原生 `class`、`style`、`aria-*` 与 `data-*` 显式绑定到同一主定制锚点。`style` 因此可以直接用于组件间距等局部布局；它不会被错误地落到弹层遮罩或条件分支的外层。

```vue
<weui-button
  type="primary"
  ext-class="submit-button"
  style="margin-top: 40px"
  :loading="loading"
  @click="onSubmit"
>
  确定
</weui-button>
```

`wrapper-class` 只由存在独立结构包装层的组件提供。它用于通过外部 CSS 调整包装层布局，和控制主视觉锚点的 `ext-class` / 原生 `style` 不同：

| 组件 | `wrapper-class` 绑定位置 | `ext-class` / `style` 绑定位置 |
| --- | --- | --- |
| Input（`clearable`） | `.weui-input__wrapper` | 内部原生 input |
| Cell（`is-swipe`） | 滑动容器 | 内部 `.weui-cell` |
| Actionsheet / Dialog / HalfScreenDialog | 遮罩结构层 | 内容面板 |
| Picker | `.weui-picker-host` | Picker 内容面板 |
| Toast | Toast 结构包装层 | `.weui-toast` |

其他组件没有独立包装层时，不提供 `wrapper-class`，避免与 `ext-class` 重复。内置 WeUI modifier 仍应使用语义 prop；不要把 `weui-*` 内置 class 传给 `ext-class`。

## 可用变量

完整变量列表见 [weui.css 源码](https://github.com/Tencent/weui/blob/master/dist/style/weui.css)。常用变量包括：

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| --weui-BG | 页面背景色 | #ffffff |
| --weui-FG | 文字前景色 | #000000 |
| --weui-BRAND | 主题色（按钮、链接等） | #07c160 |
| --weui-RED | 红色（警告、错误） | #fa5151 |
| --weui-ORANGE | 橙色 | #fa9d3b |
| --weui-BLUE | 蓝色 | #10aeff |
| --weui-LINK | 链接色 | #576b95 |
