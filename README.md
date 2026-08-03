# WeUI Design Vue

面向 Vue 3 与 uni-app 的 WeUI 组件库。组件遵循腾讯 [WeUI](https://weui.io/) 的视觉语言和结构规范，优先服务微信小程序，同时支持纯 Vue 3 H5 项目。

## 特性

- 基于 Vue 3 与 TypeScript，提供完整的组件与类型导出
- 同时提供 Vue 3 ESM 产物和 uni-app SFC 产物
- 覆盖基础展示、表单输入、列表布局、操作反馈和导航等常用场景
- 支持 H5 与小程序各自的原生能力：文件选择、页面跳转、图片预览等
- 使用 WeUI 原生 CSS 变量，便于与既有 WeUI 页面保持一致

## 安装

```bash
pnpm add weui-design-vue weui
```

要求：Node.js 18+、pnpm 8+、Vue 3.4+。

## 在 Vue 3 项目中使用

先引入 WeUI 基础样式和组件补充样式，再按需或全量注册组件。

```ts
import { createApp } from 'vue'
import WeuiDesignVue from 'weui-design-vue'
import 'weui/dist/style/weui.css'
import 'weui-design-vue/dist/vue3/style.css'
import App from './App.vue'

createApp(App).use(WeuiDesignVue).mount('#app')
```

按需引入时，只注册实际使用的组件即可：

```vue
<script setup lang="ts">
import { WeuiButton, WeuiCell, WeuiCellGroup } from 'weui-design-vue'
import 'weui/dist/style/weui.css'
import 'weui-design-vue/dist/vue3/style.css'
</script>

<template>
  <weui-cell-group>
    <weui-cell title="账号" subtitle="管理登录与安全" footer="已绑定" link="/account" />
  </weui-cell-group>
  <weui-button type="primary">保存</weui-button>
</template>
```

## 在 uni-app 项目中使用

组件库提供位于 `dist/uni-app/` 的 SFC 产物，可通过 easycom 自动引入。为组合组件增加明确映射，再使用兜底规则匹配普通组件：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^weui-cell-group$": "weui-design-vue/dist/uni-app/src/cell/cell-group.vue",
      "^weui-checkbox-group$": "weui-design-vue/dist/uni-app/src/checkbox/checkbox-group.vue",
      "^weui-radio-group$": "weui-design-vue/dist/uni-app/src/radio/radio-group.vue",
      "^weui-flex-item$": "weui-design-vue/dist/uni-app/src/flex/flex-item.vue",
      "^weui-grid-item$": "weui-design-vue/dist/uni-app/src/grid/grid-item.vue",
      "^weui-navbar-item$": "weui-design-vue/dist/uni-app/src/navbar/navbar-item.vue",
      "^weui-tabbar-item$": "weui-design-vue/dist/uni-app/src/tabbar/tabbar-item.vue",
      "^weui-(.*)": "weui-design-vue/dist/uni-app/src/$1/$1.vue"
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
  <weui-cell-group form>
    <weui-cell label="手机号">
      <weui-input v-model="phone" type="number" placeholder="请输入手机号" />
    </weui-cell>
  </weui-cell-group>
</template>
```

小程序项目也可改用 `weui-wxss`，但不要与 `weui.css` 同时引入。更多平台差异与完整配置请查看 [`docs/guide/getting-started.md`](./docs/guide/getting-started.md)。

## 组件

| 分类 | 组件 |
| --- | --- |
| 基础 | Button、Icon、Loading、Badge、Progress、Loadmore |
| 布局与展示 | Cell、Cells、Grid、Flex、Panel、MediaBox、Article、Footer、Preview、Msg |
| 表单 | Form、Input、Textarea、Select、Checkbox、Radio、Switch、Searchbar、Uploader、Agree |
| 操作反馈 | Actionsheet、Dialog、HalfScreenDialog、Picker、Toast、Toptips、Gallery、Slideview |
| 导航 | Navbar、Tabbar、Steps |

组件 API、可交互示例和平台说明位于 [`docs/components/`](./docs/components/)；启动文档站后也可在浏览器中查看。

## 命令

```bash
# 安装依赖
pnpm install

# 启动文档站
pnpm dev:docs

# 构建文档站
pnpm build:docs

# 启动 uni-app 示例
pnpm dev:example:mp
pnpm dev:example:h5

# 类型检查
pnpm typecheck

# 本地打包组件库
pnpm pack:local
```

## 本地打包使用

执行本地打包命令后，会先构建 Vue 3 ESM 产物、类型声明和 uni-app SFC 产物，再在仓库根目录生成 npm tarball：

```bash
pnpm pack:local
```

默认输出路径为：

```text
local-packages/weui-design-vue-0.2.0.tgz
```

可在本机其他项目中通过文件路径安装该包，用于发布前联调：

```bash
pnpm add /path/to/weui/local-packages/weui-design-vue-0.2.0.tgz
```

如果在当前仓库相邻目录测试，也可以使用相对路径：

```bash
pnpm add ../weui/local-packages/weui-design-vue-0.2.0.tgz
```

### uni-app 独立组件目录

如果希望组件像项目自有组件一样放在 `src/components/` 中，可以先生成独立组件目录：

```bash
pnpm build:uni-app-components
```

生成目录为：

```text
packages/components/dist/uni-app-components/
```

将该目录中的内容复制到目标 uni-app 项目的 `src/components/`：

```bash
cp -R packages/components/dist/uni-app-components/. ../your-uni-app/src/components/
```

Windows PowerShell 可以使用：

```powershell
Copy-Item packages/components/dist/uni-app-components/* ../your-uni-app/src/components/ -Recurse -Force
```

目标项目开启 easycom 自动扫描后，即可直接使用：

```vue
<template>
  <weui-cell-group title="账号信息">
    <weui-input placeholder="请输入手机号" />
  </weui-cell-group>
</template>
```

这种方式不需要为普通组件增加 `pages.json` 的自定义映射，但仍需要在 `App.vue` 中引入 `weui/dist/style/weui.css`，并确保目标工程支持 Sass 编译。独立组件目录只包含 SFC 组件；`Dialog.show()`、`Toast.show()` 等命令式 API 仍通过 npm 包使用。

## 仓库结构

```text
packages/components/  组件源码与 Vue 3、uni-app 构建产物
examples/uni-app/     uni-app 示例工程
docs/                 VitePress 文档与交互案例
```

## 开发说明

组件源代码位于 `packages/components/src/`。修改组件后，使用 `pnpm --filter weui-design-vue typecheck` 检查类型；需要同时验证文档时执行 `pnpm build:docs`。
