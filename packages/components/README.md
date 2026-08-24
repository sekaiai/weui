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
import { WeuiButton, WeuiCell, WeuiCells } from 'weui-design-vue'
import 'weui/dist/style/weui.css'
import 'weui-design-vue/style.css'
</script>

<template>
  <weui-cells>
    <weui-cell title="账号" footer="已绑定" link="/account" />
  </weui-cells>
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

> **uni-app 复合组件限制：** easycom 只保证页面中使用的顶层组件，不保证组件内部继续自动解析子组件。`cell-group` 在 uni-app 产物中只保留 group 外壳；`form` 内联完整结构，使用 `default`、`title`、`desc`、`tips`、`opr`、`tips-b`、`extra` slots，不提供自由 `footer` slot，也不依赖 Form 子组件。

内置 modifier 使用语义属性，例如 `<weui-cells form>`、`<weui-cells checkbox>`、`<weui-cell access>`、`<weui-cell link>`、`<weui-cell-group form primary>` 和 `<weui-icon msg>`；`extClass` 仅用于业务自定义 class。

`weui-cells` 是完整的列表容器组件，支持 `title`、`tips` props，以及 `title`、`default`、`tips` slots。

`weui-cell-group` 只负责 `.weui-cells__group` 外壳和分组级 `form` / `primary` 样式；需要列表内容时显式组合 `<weui-cell-group><weui-cells>...</weui-cells></weui-cell-group>`，H5 与 uni-app 结构一致。

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
