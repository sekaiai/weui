# 定制主题

WeUI Design Vue 通过 CSS 变量提供主题定制能力。`weui.css` 已内置全部 `--weui-*` CSS 变量（含暗色模式），你只需在自己的项目样式中覆盖对应变量即可。

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
