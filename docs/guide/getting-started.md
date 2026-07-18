# 快速上手

## 安装

```bash
pnpm add weui-design-vue
```

WeUI Design Vue 支持三种使用场景：**uni-app（小程序/H5）** 和 **纯 Vue 3 项目**。组件库一套代码同时服务三端，各端的样式与标签处理方式不同。

## 在 uni-app 项目中使用（小程序 / H5）

uni-app 编译器会自动处理 `view`/`text`/`image` 等内置标签，无需额外适配。

### 1. 配置 easycom

在 `pages.json` 中配置：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^weui-(.*)": "weui-design-vue/src/$1/$1.vue"
    }
  }
}
```

### 2. 全局引入样式

在 `App.vue` 中：

```vue
<style lang="scss">
@import 'weui/dist/style/weui.css';
@import 'weui-design-vue/src/styles/weui-extra.scss';
</style>
```

> **说明：** `weui.css` 提供所有 `.weui-*` 类的基础样式与 CSS 变量；`weui-extra.scss` 提供 `weui.css` 不含的自定义类（如 `.weui-list`、`.weui-slideview`、`.weui-cell__icon`）。`theme.scss` 已删除，因 `weui.css` 已内置全部 `--weui-*` CSS 变量（含暗色模式）。

### 3. 使用组件

```vue
<template>
  <weui-button type="primary">页面主操作</weui-button>
</template>
```

easycom 会自动引入组件，无需手动 import。

### 小程序端 weui-wxss 说明

小程序端也可通过微信小程序的 `useExtendedLib` 引入 `weui-wxss`（与 `weui.css` 类名一致，但适配 WXML 标签）。两种方式二选一即可，不要同时引入。若使用 `weui-wxss`，则无需引入 `weui.css`，但 `weui-extra.scss` 中的自定义类仍需引入。

## 在纯 Vue 3 项目中使用（如 VitePress、Nuxt、SPA）

纯 Vue 3 环境下浏览器不识别 `view`/`text`/`image` 标签，需通过 `Vue3Adapter` 插件将其映射为 `div`/`span`/`img`。

### 1. 引入样式

```ts
import 'weui/dist/style/weui.css'
import 'weui-design-vue/src/styles/weui-extra.scss'
```

### 2. 注册插件与组件库

```ts
import { createApp } from 'vue'
import WeuiDesignVue, { Vue3Adapter } from 'weui-design-vue'
import App from './App.vue'

const app = createApp(App)
app.use(WeuiDesignVue)
app.use(Vue3Adapter)
app.mount('#app')
```

### 3. 使用组件

```vue
<template>
  <weui-button type="primary">页面主操作</weui-button>
</template>
```

> **说明：** `Vue3Adapter` 仅在纯 Vue 3 环境使用。uni-app 环境下 uni-app 编译器会自动处理标签，无需注册此插件。
