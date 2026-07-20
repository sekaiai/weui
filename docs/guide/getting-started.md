# 快速上手

## 安装

```bash
pnpm add weui-design-vue
```

WeUI Design Vue 提供两套独立产物，覆盖三类使用场景：

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
import WeuiDesignVue from 'weui-design-vue'
import 'weui/dist/style/weui.css'
import 'weui-design-vue/dist/vue3/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(WeuiDesignVue)
app.mount('#app')
```

### 2. 按需引入（推荐）

只需引入用到的组件，Tree-shaking 自动裁剪未使用部分：

```ts
import { WeuiButton, WeuiCell, WeuiCellGroup } from 'weui-design-vue'
import 'weui/dist/style/weui.css'
import 'weui-design-vue/dist/vue3/style.css'
```

### 3. 使用组件

```vue
<template>
  <weui-button type="primary">页面主操作</weui-button>
</template>
```

> **说明：** `weui.css` 提供所有 `.weui-*` 类的基础样式与 CSS 变量；`style.css` 提供 `weui.css` 不含的自定义类（如 `.weui-list`、`.weui-slideview`、`.weui-cell__icon`），这些样式已随各组件 SFC 内联并打包。

## 在 uni-app 项目中使用（小程序 / App / uni-app H5）

uni-app 产物为 SFC 源码形式（位于 `weui-design-vue/dist/uni-app/`），通过 easycom 自动引入，无需手动 import。

### 1. 配置 easycom

在 `pages.json` 中配置：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^weui-cell-group$": "weui-design-vue/dist/uni-app/src/cell/cell-group.vue",
      "^weui-checkbox-group$": "weui-design-vue/dist/uni-app/src/checkbox/checkbox-group.vue",
      "^weui-flex-item$": "weui-design-vue/dist/uni-app/src/flex/flex-item.vue",
      "^weui-grid-item$": "weui-design-vue/dist/uni-app/src/grid/grid-item.vue",
      "^weui-navbar-item$": "weui-design-vue/dist/uni-app/src/navbar/navbar-item.vue",
      "^weui-tabbar-item$": "weui-design-vue/dist/uni-app/src/tabbar/tabbar-item.vue",
      "^weui-picker-group$": "weui-design-vue/dist/uni-app/src/picker/picker-group.vue",
      "^weui-(.*)": "weui-design-vue/dist/uni-app/src/$1/$1.vue"
    }
  }
}
```

> **前置条件：** 使用前需先运行 `pnpm build:uni-app`（或在 monorepo 中通过 workspace 链接）生成 `dist/uni-app/` 产物。

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

### 小程序端 weui-wxss 说明

小程序端也可通过微信小程序的 `useExtendedLib` 引入 `weui-wxss`（与 `weui.css` 类名一致，但适配 WXML 标签）。两种方式二选一即可，不要同时引入。若使用 `weui-wxss`，则无需引入 `weui.css`。组件 SFC 内联的自定义样式随 easycom 自动加载。

## 平台差异说明

组件库源码统一使用 `div`/`span`/`img` 标签，并在 3 处不通用点（uploader 选文件、cell 跳转、grid-item 跳转）通过条件编译注释处理：

- **Vue 3 产物**：保留 `#ifdef H5` 块，移除 `#ifndef H5` 块；`__IS_H5__` 常量替换为 `true`
  - uploader 使用 `<input type="file">` 选文件
  - cell / grid-item 不自动跳转，emit `navigate` 事件由用户处理
- **uni-app 产物**：移除 `#ifdef H5` 块，保留 `#ifndef H5` 块；`__IS_H5__` 常量替换为 `false`；标签转换为 `view`/`text`/`image`
  - uploader 使用 `uni.chooseImage` / `uni.chooseFile`
  - cell / grid-item 调用 `uni.navigateTo` 自动跳转
