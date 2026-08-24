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
pnpm add weui-uniapp-design weui
```

要求：Node.js 18+、pnpm 8+、Vue 3.4+。

## 在 Vue 3 项目中使用

先引入 WeUI 基础样式和组件补充样式，再按需或全量注册组件。

```ts
import { createApp } from 'vue'
import WeuiDesignVue from 'weui-uniapp-design'
import 'weui/dist/style/weui.css'
import 'weui-uniapp-design/dist/vue3/style.css'
import App from './App.vue'

createApp(App).use(WeuiDesignVue).mount('#app')
```

按需引入时，只注册实际使用的组件即可：

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

组件库提供位于 `dist/uni-app/` 的扁平 SFC 产物，所有组件（包括复合组件如 `cell-group`、`checkbox-group`）均在根目录下，easycom 只需一条规则：

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
  <weui-form title="表单结构" desc="展示表单页面的信息结构样式。">
    <template #default>
      <weui-cell-group form>
        <weui-cells>
          <weui-cell label="姓名">
            <weui-input placeholder="请输入姓名" />
          </weui-cell>
          <weui-cell label="联系电话">
            <weui-input type="number" placeholder="请输入联系电话" />
          </weui-cell>
        </weui-cells>
      </weui-cell-group>
    </template>
    <template #tips>提交前提示</template>
    <template #opr>
      <weui-button type="primary" display="block">提交</weui-button>
    </template>
    <template #tips-b>提交后提示</template>
    <template #extra>
      <div class="weui-footer">底部信息</div>
    </template>
  </weui-form>
</template>
```

> **uni-app 复合组件限制：** easycom 只保证页面中使用的顶层组件。`cell-group` 在 uni-app 产物中只保留 group 外壳，内部 title、cells、tips 和 slot 不渲染；`form` 使用内联原生结构，固定提供 `default`、`title`、`desc`、`tips`、`opr`、`tips-b`、`extra` slots，不依赖 Form 子组件。`msg` 的默认图标和 `picker` 的列区域也有对应平台限制，详见接入文档。

WeUI 内置 modifier 使用语义属性表达，例如 `<weui-cells form>`、`<weui-cells checkbox>`、`<weui-cell access>`、`<weui-cell link>`、`<weui-cell-group form primary>` 和 `<weui-icon msg>`；`extClass` 仅用于业务自定义 class，不要传入 `weui-*` 内置 class。

`weui-cells` 已整合标题、列表主体和底部提示结构，使用 `title`、`tips` props 或同名 slots 配置。

`weui-cell-group` 只负责 `.weui-cells__group` 外壳和分组级 `form` / `primary` 样式；需要列表内容时显式组合 `<weui-cell-group><weui-cells>...</weui-cells></weui-cell-group>`，H5 与 uni-app 结构一致。

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

# 构建全部产物（Vue 3 ESM + 类型声明 + uni-app 扁平 SFC）
pnpm build
```

## 本地打包使用

构建后使用 npm pack 生成 tarball 用于发布前联调：

```bash
pnpm build
cd packages/components && npm pack
```

可在本机其他项目中通过文件路径安装：

```bash
pnpm add /path/to/packages/components/weui-uniapp-design-0.2.0.tgz
```

### uni-app 复制组件到项目

如果不想通过 npm 安装，可以直接复制组件文件到项目中：

```bash
pnpm build:uni-app
```

生成目录为：

```text
packages/components/dist/uni-app/
```

将该目录中的内容复制到目标 uni-app 项目的 `src/components/weui/`：

```bash
cp -R packages/components/dist/uni-app/. ../your-uni-app/src/components/weui/
```

Windows PowerShell 可以使用：

```powershell
Copy-Item packages/components/dist/uni-app/* ../your-uni-app/src/components/weui/ -Recurse -Force
```

目标项目配置 easycom 指向本地路径：

```json
{
  "easycom": {
    "custom": {
      "^weui-(.*)": "@/components/weui/$1.vue"
    }
  }
}
```

## 仓库结构

```text
packages/components/  组件源码与 Vue 3、uni-app 构建产物
examples/uni-app/     uni-app 示例工程
docs/                 VitePress 文档与交互案例
```

## 开发说明

组件源代码位于 `packages/components/src/`。修改组件后，使用 `pnpm --filter weui-uniapp-design typecheck` 检查类型；需要同时验证文档时执行 `pnpm build:docs`。
