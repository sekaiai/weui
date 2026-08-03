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
import 'weui-design-vue/dist/vue3/style.css'
import App from './App.vue'

createApp(App).use(WeuiDesignVue).mount('#app')
```

也可以按需引入组件：

```vue
<script setup lang="ts">
import { WeuiButton, WeuiCell, WeuiCellGroup } from 'weui-design-vue'
import 'weui/dist/style/weui.css'
import 'weui-design-vue/dist/vue3/style.css'
</script>

<template>
  <weui-cell-group>
    <weui-cell title="账号" footer="已绑定" link="/account" />
  </weui-cell-group>
  <weui-button type="primary">保存</weui-button>
</template>
```

## uni-app 使用方式

通过 easycom 从 `weui-design-vue/dist/uni-app/` 自动引入组件，并在 `App.vue` 中引入 `weui/dist/style/weui.css`。完整的 easycom 配置、平台差异和组件示例请查看项目文档。

## 内容

- 基础：Button、Icon、Loading、Badge、Progress、Loadmore
- 布局与展示：Cell、Grid、Flex、Panel、MediaBox、Article、Footer、Preview、Msg
- 表单：Form、Input、Textarea、Select、Checkbox、Radio、Switch、Searchbar、Uploader、Agree
- 操作反馈：Actionsheet、Dialog、HalfScreenDialog、Picker、Toast、Toptips、Gallery、Slideview
- 导航：Navbar、Tabbar、Steps

## 文档与仓库

- [项目仓库](https://github.com/sekaiai/weui)
- [完整接入文档](https://github.com/sekaiai/weui/blob/main/docs/guide/getting-started.md)

## uni-app 独立组件目录

执行 `pnpm build:uni-app-components` 后，会生成 `dist/uni-app-components/`。将该目录中的内容复制到 uni-app 项目的 `src/components/`，并开启 easycom 自动扫描，即可直接使用 `<weui-button />` 等组件，无需额外配置 `pages.json` 映射。

组件目录仍需要在 `App.vue` 中引入 `weui/dist/style/weui.css`，并确保目标工程支持 Sass 编译。该目录只包含 SFC 组件，`Dialog.show()`、`Toast.show()` 等命令式 API 仍通过 npm 包使用。

## License

[MIT](./LICENSE)
