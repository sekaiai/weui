import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import WeuiDesignVue from 'weui-design-vue/src/index'

// 全局引入 weui 基础样式
import 'weui/dist/style/weui.css'
// 全局引入 weui 适配层
import 'weui-design-vue/src/styles/weui-adapter.scss'
// 全局引入主题变量
import 'weui-design-vue/src/styles/theme.scss'
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
