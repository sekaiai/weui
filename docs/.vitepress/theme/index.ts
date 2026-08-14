import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import WeuiDesignVue from 'weui-design-vue'

// 全局引入 weui 基础样式
import 'weui/dist/style/weui.css'
// 组件内联自定义样式（weui.css 不含的类，已随 SFC 打包）
import 'weui-design-vue/style.css'
// 文档站私有样式
import './custom.css'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.use(WeuiDesignVue)
  },
}

export default theme
