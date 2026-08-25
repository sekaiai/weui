# WeUI Uniapp Design

面向 Vue 3 与 uni-app 的 WeUI 组件库。组件遵循腾讯 [WeUI](https://weui.io/) 的视觉语言和结构规范，优先服务微信小程序，同时支持纯 Vue 3 H5 项目。

## 特性

- 基于 Vue 3 与 TypeScript，提供完整的组件与类型导出
- 同时提供 Vue 3 ESM 产物和 uni-app SFC 产物
- 覆盖基础展示、表单输入、列表布局、操作反馈和导航等常用场景
- 支持 H5 与小程序各自的原生能力：文件选择、页面跳转、图片预览等
- 使用 WeUI 原生 CSS 变量，便于与既有 WeUI 页面保持一致

## 安装

```bash
pnpm add weui-uniapp-design weui
```

要求：Node.js 18+、pnpm 8+、Vue 3.4+。

## 在 Vue 3 项目中使用

先引入 WeUI 基础样式和组件补充样式，再全量或按需注册组件。

### 全量注册

```ts
import { createApp } from 'vue'
import WeuiDesignVue from 'weui-uniapp-design'
import 'weui/dist/style/weui.css'
import 'weui-uniapp-design/dist/vue3/style.css'
import App from './App.vue'

createApp(App).use(WeuiDesignVue).mount('#app')
```

### 按需引入

```vue
<script setup lang="ts">
import { WeuiButton, WeuiCell, WeuiCells } from 'weui-uniapp-design'
import 'weui/dist/style/weui.css'
import 'weui-uniapp-design/dist/vue3/style.css'
</script>

<template>
  <weui-cells>
    <weui-cell title="账号" subtitle="管理登录与安全" footer="已绑定" link="/account" />
  </weui-cells>
  <weui-button type="primary">保存</weui-button>
</template>
```

## 在 uni-app 项目中使用

组件库提供位于 `dist/uni-app/` 的扁平 SFC 产物，所有组件均在根目录下，easycom 只需一条规则：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^weui-(.*)": "weui-uniapp-design/dist/uni-app/$1.vue"
    }
  }
}
```

在 `App.vue` 全局引入 WeUI 样式：

```vue
<style lang="scss">
@import 'weui/dist/style/weui.css';
</style>
```

随后可直接使用组件：

```vue
<template>
  <weui-cells title="表单">
    <weui-cell label="姓名">
      <weui-input placeholder="请输入姓名" />
    </weui-cell>
    <weui-cell label="联系电话">
      <weui-input type="number" placeholder="请输入联系电话" />
    </weui-cell>
  </weui-cells>
  <weui-button type="primary" display="block">提交</weui-button>
</template>
```

> 内置视觉 modifier 使用语义属性表达，例如 `<weui-cells form>`、`<weui-cells checkbox>`、`<weui-cell access>`、`<weui-cell link>`；`extClass` 仅用于业务自定义 class。

如果是微信小程序，也可以不安装 `weui` 包，改用微信扩展库引入官方 WeUI 基础样式，在 `app.json` 中配置：

```json
{
  "useExtendedLib": {
    "weui": true
  }
}
```

扩展库提供的基础样式类名与 `weui.css` 一致，两种方式二选一，不要同时引入。

## 复制组件到 uni-app 项目

不想通过 npm 安装时，可构建后复制产物到目标项目：

```bash
pnpm build:uni-app
```

将 `packages/components/dist/uni-app/` 中的内容复制到目标项目的 `src/components/weui/`，并将 easycom 改为指向本地路径：

```json
{
  "easycom": {
    "custom": {
      "^weui-(.*)": "@/components/weui/$1.vue"
    }
  }
}
```

## 组件

| 分类 | 组件 |
| --- | --- |
| 基础 | Button、Icon、Loading、Badge、Progress、Loadmore |
| 布局与展示 | Cell、Cells、Grid、Flex、Panel、MediaBox、Article、Footer、Preview、Msg |
| 表单 | Form、Input、Textarea、Select、Checkbox、Radio、Switch、Searchbar、Uploader、Agree |
| 操作反馈 | Actionsheet、Dialog、HalfScreenDialog、Picker、Toast、Toptips、Gallery、Slideview |
| 导航 | Navbar、Tabbar、Steps |

## 文档站

组件 API、可交互示例、复合组件限制与平台差异说明，请查看文档站：

<https://sekaiai.github.io/weui/>

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动文档站
pnpm dev:docs

# 构建文档站
pnpm build:docs

# 启动 uni-app 示例（小程序 / H5）
pnpm dev:example:mp
pnpm dev:example:h5

# 类型检查
pnpm typecheck

# 构建全部产物（Vue 3 ESM + 类型声明 + uni-app 扁平 SFC）
pnpm build
```

## 仓库结构

```text
packages/components/  组件源码与 Vue 3、uni-app 构建产物
examples/uni-app/     uni-app 示例工程
docs/                 VitePress 文档与交互案例
```

## AI 辅助开发 Skills

项目内置 `weui-uniapp-setup` Skill，为支持 Agent Skills 格式的 AI 编程工具提供组件 API、WeUI 设计规范与 easycom 配置参考。项目级安装：将 `skills/weui-uniapp-setup/` 复制到对应工具的 Skills 目录。

| 工具 | 项目级目录 |
| --- | --- |
| Claude Code | `.claude/skills/` |
| Codex | `.codex/skills/` |
| Trae | `.trae/skills/` |
| WorkBuddy | `.workbuddy/skills/` |
| Cursor | `.cursor/skills/` |

安装与使用详情见 [Skills 指南](./docs/guide/skills.md) 或文档站：[https://sekaiai.github.io/weui/guide/skills.html](https://sekaiai.github.io/weui/guide/skills.html)

## 开发说明

组件源代码位于 `packages/components/src/`。修改组件后，使用 `pnpm --filter weui-uniapp-design typecheck` 检查类型；需要同时验证文档时执行 `pnpm build:docs`。
