import type { UserConfig } from 'vitepress'

/**
 * 自定义 PostCSS 插件：给所有包含 .vp-doc 的选择器追加 :not(:where(.vp-raw, .vp-raw *)) 前缀
 *
 * 为什么不用 VitePress 官方的 postcssIsolateStyles？
 * 该插件内部用 includeFiles: [/base\.css/] 限制只处理 base.css，但 .vp-doc 选择器实际在
 * vp-doc.css 文件里，includeFiles 匹配不到，导致插件完全不生效。
 *
 * 本插件不依赖 includeFiles，直接按选择器内容判断，处理任意来源的 .vp-doc 样式，
 * 配合 demo-block 上的 vp-raw 类，阻断 .vp-doc 默认文档样式（a/p/ul/li/strong 等）污染 demo。
 */
const isolateVpDocStyles = {
  postcssPlugin: 'isolate-vp-doc',
  Rule(rule: { selector: string; selectors: string[] }) {
    // 只处理包含 .vp-doc 的选择器
    if (!rule.selector.includes('.vp-doc')) return
    rule.selectors = rule.selectors.map((selector) => {
      if (!selector.includes('.vp-doc')) return selector
      // 已有前缀的不重复加
      if (selector.includes(':not(:where(.vp-raw')) return selector
      // 拆分末尾伪类，把前缀插在伪类之前
      // 例如 .vp-doc strong:hover -> .vp-doc strong:not(:where(.vp-raw, .vp-raw *)):hover
      const match = selector.match(/^(.*?)(:[\w-]+(?:\(.*?\))?)?$/)
      if (!match) return selector + ':not(:where(.vp-raw, .vp-raw *))'
      const [, main, pseudo = ''] = match
      return `${main}:not(:where(.vp-raw, .vp-raw *))${pseudo}`
    })
  },
}

const nav = [
  { text: '指导', link: '/guide/introduce', activeMatch: '^/guide/' },
  { text: '组件', link: '/components/button', activeMatch: '^/components/' },
]

const sidebar = {
  '/guide/': [
    {
      text: '指导',
      collapsible: true,
      items: [
        { text: '介绍', link: '/guide/introduce' },
        { text: '快速上手', link: '/guide/getting-started' },
        { text: '定制主题', link: '/guide/customize-theme' },
      ],
    },
  ],
  '/components/': [
    {
      text: '基础组件',
      collapsible: true,
      items: [
        { text: 'Button 按钮', link: '/components/button' },
        { text: 'Icon 图标', link: '/components/icon' },
        { text: 'Loading 加载', link: '/components/loading' },
        { text: 'Badge 徽章', link: '/components/badge' },
        { text: 'Progress 进度条', link: '/components/progress' },
      ],
    },
    {
      text: '布局容器',
      collapsible: true,
      items: [
        { text: 'Cell 列表项', link: '/components/cell' },
        { text: 'Grid 宫格', link: '/components/grid' },
        { text: 'Flex 弹性布局', link: '/components/flex' },
        { text: 'Panel 面板', link: '/components/panel' },
        { text: 'List 列表', link: '/components/list' },
        { text: 'Article 文章', link: '/components/article' },
        { text: 'Footer 页脚', link: '/components/footer' },
      ],
    },
    {
      text: '表单组件',
      collapsible: true,
      items: [
        { text: 'Input 输入框', link: '/components/input' },
        { text: 'Checkbox 复选框', link: '/components/checkbox' },
        { text: 'Searchbar 搜索栏', link: '/components/searchbar' },
        { text: 'Uploader 上传', link: '/components/uploader' },
        { text: 'Form 表单', link: '/components/form' },
        { text: 'FormPage 表单页', link: '/components/form-page' },
        { text: 'Preview 预览', link: '/components/preview' },
      ],
    },
    {
      text: '操作反馈',
      collapsible: true,
      items: [
        { text: 'Actionsheet 操作菜单', link: '/components/actionsheet' },
        { text: 'Dialog 对话框', link: '/components/dialog' },
        { text: 'HalfScreenDialog 半屏弹窗', link: '/components/half-screen-dialog' },
        { text: 'Toptips 顶部提示', link: '/components/toptips' },
        { text: 'Toast 轻提示', link: '/components/toast' },
        { text: 'Picker 选择器', link: '/components/picker' },
        { text: 'Gallery 画廊', link: '/components/gallery' },
        { text: 'Slideview 滑动视图', link: '/components/slideview' },
        { text: 'Loadmore 加载更多', link: '/components/loadmore' },
        { text: 'Msg 提示页', link: '/components/msg' },
      ],
    },
    {
      text: '导航',
      collapsible: true,
      items: [
        { text: 'Navbar 选项卡', link: '/components/navbar' },
        { text: 'Tabbar 底部导航', link: '/components/tabbar' },
        { text: 'Steps 步骤条', link: '/components/steps' },
      ],
    },
  ],
}

const config: UserConfig = {
  title: 'WeUI Design Vue',
  description: '基于 uni-app 的 WeUI 组件库',
  lang: 'zh-CN',
  lastUpdated: true,
  srcExclude: ['superpowers/**'],
  themeConfig: {
    nav,
    sidebar,
    smoothScroll: true,
  },
  // @vitejs/plugin-vue 选项（顶层）：用于把 uni-app 内置标签编译为自定义元素，
  // 避免在浏览器环境（VitePress 文档站）中被 Vue 解析为组件
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) =>
          [
            'checkbox', 'radio',
            'checkbox-group', 'radio-group', 'navigator',
            'swiper', 'swiper-item', 'scroll-view',
            'movable-area', 'movable-view',
            'picker-view', 'picker-view-column', 'rich-text',
          ].includes(tag),
      },
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['weui-design-vue'],
    },
    // 启用样式隔离：给 .vp-doc 选择器追加 :not(:where(.vp-raw, .vp-raw *)) 前缀
    // 配合 demo-block 上的 vp-raw 类，阻断文档默认样式污染 demo
    // 注意：PostCSS 插件必须放在 vite.css.postcss.plugins 下，不是顶层 vite.postcss
    css: {
      postcss: {
        plugins: [isolateVpDocStyles],
      },
    },
  },
}

export default config
