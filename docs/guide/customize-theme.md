# 定制主题

WeUI Design Vue 通过 CSS 变量提供主题定制能力。

## 覆盖变量

在你的项目样式中覆盖 `theme.scss` 定义的变量：

```css
:root {
  --weui-BRAND: #1989fa;
  --weui-RED: #ee0a24;
}
```

## 暗色模式

暗色模式默认跟随系统，通过 `@media (prefers-color-scheme: dark)` 自动切换。

如需手动控制，覆盖暗色模式下的变量即可。

## 可用变量

完整变量列表见 [theme.scss](https://github.com/your-repo/weui-design-vue/blob/main/packages/components/src/styles/theme.scss)。
