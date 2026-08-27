# 快速上手

## 安装

```bash
pnpm add weui-uniapp-design
```

WeUI Uniapp Design 提供两套独立产物，覆盖三类使用场景：

| 产物 | 适用场景 | 引入方式 |
| --- | --- | --- |
| Vue 3 产物（预打包 ESM） | 纯 Vue 3 项目（VitePress / Nuxt / SPA / H5） | npm 安装，按需 import |
| uni-app 产物（SFC 源码） | uni-app 项目（小程序 / App / uni-app H5） | easycom 自动引入 |

两套产物来自同一套源码（使用 `div`/`span`/`img` 标签），uni-app 产物在打包时已将标签转换为 `view`/`text`/`image`，并按平台保留对应的条件编译代码。

## 在纯 Vue 3 项目中使用

Vue 3 产物为预打包 ESM（类似 Element Plus / Arco），支持全量注册与按需引入。

### 1. 全量注册

```ts
import { createApp } from 'vue'
import WeuiDesignVue from 'weui-uniapp-design'
import 'weui/dist/style/weui.css'
import App from './App.vue'

const app = createApp(App)
app.use(WeuiDesignVue)
app.mount('#app')
```

### 2. 按需引入（推荐）

只需引入用到的组件，Tree-shaking 自动裁剪未使用部分：

```ts
import { WeuiButton, WeuiCell, WeuiCellGroup } from 'weui-uniapp-design'
import 'weui/dist/style/weui.css'
```

### 3. 使用组件

```vue
<template>
  <weui-button type="primary">页面主操作</weui-button>
</template>
```

> **说明：** `weui.css` 提供所有 `.weui-*` 类的基础样式与 CSS 变量；组件库默认入口会自动加载 `.weui-slideview`、`.weui-cell__icon` 等组件补充样式。

### 4. SSR 无样式入口

默认入口使用静态 CSS import。需要让 Node 直接加载组件库、或由 SSR 构建自行管理样式时，可改用无样式入口：

```ts
import { WeuiButton } from 'weui-uniapp-design/ssr'
```

客户端仍可使用默认入口，或显式引入 `weui-uniapp-design/index.css`。

## 在 uni-app 项目中使用（小程序 / App / uni-app H5）

uni-app 产物通过稳定的 `weui-uniapp-design/uni-app/*.vue` 子入口公开，easycom 只需一条规则即可自动引入，无需依赖包内 `dist` 布局。

### 1. 配置 easycom

在 `pages.json` 中配置：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^weui-(.*)": "weui-uniapp-design/uni-app/$1.vue"
    }
  }
}
```

### 2. 全局引入样式

在 `App.vue` 中：

```vue
<style lang="scss">
@import 'weui/dist/style/weui.css';
</style>
```

### 3. 使用组件

```vue
<template>
  <weui-button type="primary">页面主操作</weui-button>
</template>
```

easycom 会自动引入组件，无需手动 import。

命令式反馈 API 使用 uni-app 专用入口，不要从 Vue 产物根入口导入：

```ts
import { Dialog, Picker, Toast } from 'weui-uniapp-design/uni-app'
```

### 小程序端 weui-wxss 说明

小程序端也可通过微信小程序的 `useExtendedLib` 引入 `weui-wxss`（与 `weui.css` 类名一致，但适配 WXML 标签）。两种方式二选一即可，不要同时引入。若使用 `weui-wxss`，则无需引入 `weui.css`。组件 SFC 内联的自定义样式随 easycom 自动加载。

## 平台差异说明

组件库源码统一使用 `div`/`span`/`img` 标签，并通过条件编译和构建转换处理平台差异：

- **Vue 3 产物**：保留 `#ifdef H5` 块，移除 `#ifndef H5` 块；`__IS_H5__` 常量替换为 `true`
  - uploader 使用 `<input type="file">` 选文件
  - cell / grid-item 不自动跳转，emit `navigate` 事件由用户处理
- **uni-app 产物**：移除 `#ifdef H5` 块，保留 `#ifndef H5` 块；`__IS_H5__` 常量替换为 `false`；标签转换为 `view`/`text`/`image`
- **uni-app 组件选项**：每个生成的 Vue SFC 自动包含 `options.virtualHost = true`，无需在业务页面重复配置。
  - uploader 使用 `uni.chooseImage` / `uni.chooseFile`
  - cell / grid-item 调用 `uni.navigateTo` 自动跳转

### 复合组件与 easycom 限制

easycom 只保证业务页面使用的顶层组件，不保证组件库复合组件内部的子组件自动解析。当前平台约束如下：

- `cell-group`：H5 与 uni-app 都是只渲染 `.weui-cells__group` 的纯外壳；列表标题、主体和提示由显式嵌套的 `cells` 提供。
- `cells`：标题、列表主体和底部提示已整合在单一组件中，使用 `title`、`tips` props 或同名 slots。
- `form`：表单外壳、标题、描述、双 tips、操作区和附加区使用内联结构；通过 `default`、`title`、`desc`、`tips`、`opr`、`tips-b`、`extra` slots 填充，组件内部使用 `v-if` 控制可选区域。
- `msg`：默认 `weui-icon` 不在 uni-app 产物中内部自动引入，需要图标时通过 `icon` slot 显式传入。
- `picker`：Vue 3/H5 与 uni-app 产物均使用 WeUI 官方半屏弹窗结构，内置 `weui-picker-group` 列区域，支持单列、多列、禁用项和触摸滚动；关闭按钮使用 `close-text`（旧版 `cancel-text` 仍兼容）。

内置视觉 modifier 使用可发现的语义属性：Form 中的 Cells 列表写 `<weui-cell-group form><weui-cells>...</weui-cells></weui-cell-group>`，独立复选列表写 `<weui-cells checkbox>`，反色表单组写 `<weui-cell-group form primary>`，消息大图标写 `<weui-icon msg>`。`extClass` 只用于业务自定义 class，不要传入 `weui-*` 内置 class。

Vue 3/H5 产物保持完整组件行为。每次修改复合组件后，应重新执行 `pnpm build:uni-app` 和 `pnpm check:uni-app`。
