import type { UserConfig } from 'vitepress'

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
        { text: 'Badge 徽章', link: '/components/badge' },
        { text: 'Cell 列表项', link: '/components/cell' },
      ],
    },
    {
      text: '操作反馈',
      collapsible: true,
      items: [
        { text: 'Actionsheet 操作菜单', link: '/components/actionsheet' },
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
}

export default config
