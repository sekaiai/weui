# 快速上手

## 安装

```bash
pnpm add weui-design-vue
```

## 在 uni-app 项目中使用

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
@import 'weui-design-vue/src/styles/weui-adapter.scss';
@import 'weui-design-vue/src/styles/theme.scss';
</style>
```

### 3. 使用组件

```vue
<template>
  <weui-button type="primary">页面主操作</weui-button>
</template>
```

easycom 会自动引入组件，无需手动 import。
