# WeUI Design Vue

适用于 Vue 3 与 uni-app 的 WeUI 组件库，优先支持微信小程序，并提供纯 Vue 3 H5 产物。

## 安装

```bash
pnpm add weui-design-vue weui
```

## Vue 3 使用方式

```ts
import { createApp } from 'vue'
import WeuiDesignVue from 'weui-design-vue'
import 'weui/dist/style/weui.css'
import 'weui-design-vue/style.css'
import App from './App.vue'

createApp(App).use(WeuiDesignVue).mount('#app')
```

也可以按需引入组件：

```vue
<script setup lang="ts">
import { WeuiButton, WeuiCell, WeuiCellGroup } from 'weui-design-vue'
import 'weui/dist/style/weui.css'
import 'weui-design-vue/style.css'
</script>

<template>
  <weui-cell-group>
    <weui-cell title="账号" footer="已绑定" link="/account" />
  </weui-cell-group>
  <weui-button type="primary">保存</weui-button>
</template>
```

## uni-app 使用方式

easycom 只需一条规则即可自动引入所有组件：

```json
{
  "easycom": {
    "custom": {
      "^weui-(.*)": "weui-design-vue/dist/uni-app/$1.vue"
    }
  }
}
```

在 `App.vue` 中引入 `weui/dist/style/weui.css`。

## 复制组件到项目

执行 `pnpm build:uni-app` 后，将 `dist/uni-app/` 中的内容复制到 uni-app 项目的 `src/components/weui/`，easycom 配置改为指向本地路径 `"^weui-(.*)": "@/components/weui/$1.vue"` 即可。内部依赖（`_internal/`）与 cells 聚合导出（`cells.ts`）会一并复制，组件内的相对引用已自动改写为扁平路径。

## 内容

- 基础：Button、Icon、Loading、Badge、Progress、Loadmore
- 布局与展示：Cell、Grid、Flex、Panel、MediaBox、Article、Footer、Preview、Msg
- 表单：Form、Input、Textarea、Select、Checkbox、Radio、Switch、Searchbar、Uploader、Agree
- 操作反馈：Actionsheet、Dialog、HalfScreenDialog、Picker、Toast、Toptips、Gallery、Slideview
- 导航：Navbar、Tabbar、Steps

## 文档与仓库

- [项目仓库](https://github.com/sekaiai/weui)
- [完整接入文档](https://github.com/sekaiai/weui/blob/main/docs/guide/getting-started.md)

## License

[MIT](./LICENSE)
