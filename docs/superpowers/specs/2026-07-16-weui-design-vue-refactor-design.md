# WeUI Design Vue 重构设计

- 日期：2026-07-16
- 状态：已批准 + 规格自检完成（待用户审查）
- 版本：v0.1.0（重构起步版本）

## 1. 总体定位

基于 uni-app 的 WeUI 组件库，主目标微信小程序，兼 H5；视觉与 `weui.io` 完全一致；命名 `weui-design-vue`。

- **目标平台**：微信小程序 + H5，统一使用 `uni.*` API，禁用 `wx.*`
- **不支持**：App 端、支付宝/百度等其他小程序
- **版本策略**：新版本从 `v0.1.0` 起步（alpha），组件集完整 + 文档齐全后升 `v1.0.0`
- **不复用旧代码**：旧 `packages/` 与 `docs/` 删除，`.git` 重新初始化，remote 重置为空

## 2. 仓库布局（pnpm monorepo）

```
weui-design-vue/
├─ pnpm-workspace.yaml
├─ package.json              # 根，仅放工程脚本与 devDeps
├─ tsconfig.base.json
├─ packages/
│  └─ components/            # 组件库（源码发布，无 build）
│     ├─ package.json        # name: weui-design-vue
│     ├─ src/
│     │  ├─ button/button.vue
│     │  ├─ cell/{cell.vue, cell-group.vue}
│     │  ├─ styles/          # weui 适配层 + 主题变量
│     │  │  ├─ theme.scss    # CSS 变量 + 暗色模式
│     │  │  └─ weui-adapter.scss
│     │  ├─ utils/
│     │  │  ├─ overlay.ts    # 弹层 z-index 全局栈 + 命令式挂载
│     │  │  └─ queue.ts      # toast 队列
│     │  └─ index.ts         # install + 命名导出
│     └─ types/              # .d.ts
├─ examples/
│  └─ uni-app/               # uni-app 示例工程（pages.json/manifest.json）
└─ docs/                     # VitePress 文档站
```

- 组件库与示例/文档通过 `workspace:*` 依赖引用
- 组件库以 **源码发布**（`.vue` 文件），easycom 直接指向源码，无需 build

## 3. 组件清单（对齐官方，共 33 个族）

| 分类 | 组件 |
|---|---|
| 表单 (7) | button、input、form、form-page、list、slider、uploader |
| 基础 (16) | article、badge、cell、checkbox、flex、footer、gallery、grid、icon、loading、loadmore、panel、preview、progress、steps、slideview |
| 操作反馈 (7) | actionsheet、dialog、half-screen-dialog、msg、picker、toast、toptips |
| 导航 (2) | navbar、tabbar |
| 搜索 (1) | searchbar |

> 自检修订：原 30 个族遗漏了 weui-miniprogram 官方的 `form-page`、`slideview`，以及 weui-wxss example 中的 `preview`。为真正"全量对齐官方"，已补入，总数调整为 33。

- **实现顺序**：按 weui-miniprogram 官方文档顺序逐个实现，再补齐 weui-wxss example 独有组件。官方顺序为：actionsheet → badge → cell → checkbox → dialog → form-page → form → gallery → grid → half-screen-dialog → icon → loading → msg → navbar → searchbar → slideview → tabbar → toptips → uploader；随后补齐 weui-wxss example 独有：button、input、article、flex、footer、list、panel、preview、progress、steps、loadmore、picker、toast
- cell-group（官方 cells）、checkbox-group 作为 cell/checkbox 的子组件随主组件实现，不单列
- **全部组件均为 SFC**，无纯 JS 调用式组件；弹层类（toast/actionsheet/dialog/half-screen-dialog/picker/toptips）额外提供命令式函数

## 4. 组件 API / 事件 / 插槽 规范

### 4.1 命名基线

- **属性命名**：对齐 weui-miniprogram 官方属性名（如 button 的 `type/loading/disabled/size`，input 的 `value/placeholder`）
- **v-model**：Vue 3 规范，表单类用 `defineModel`（`modelValue`/`update:modelValue`）；多列 picker 等支持 `v-model:columns`
- **事件**：kebab-case（`@confirm`、`@cancel`、`@change`、`@click`）
- **插槽**：每个组件提供 `default` + 语义化具名插槽（如 cell 的 `icon`/`title`/`value`/`footer`）；列表类组件支持 scoped slot 暴露 `{ item, index }`
- **TS**：`<script setup lang="ts">` + `defineProps<{}>` 类型声明，导出 `XxxProps`/`XxxEmits` 类型；锁定 Vue 3.4+
- **标签前缀**：`<weui-button>`、`<weui-cell>`（保持现有前缀）
- **DOM 禁用**：禁用 `ref.focus()`、`window`、`document`、`nextTick` 操作 DOM；交互改用 uni API 或数据驱动

### 4.2 easycom 配置

`pages.json` 配置 easycom 自动引入：

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

同时保留 `install` 插件用于非 easycom 场景（纯 H5 项目）。

### 4.3 弹层组件调用风格

弹层类组件（toast/actionsheet/dialog/half-screen-dialog/picker/toptips）同时支持两种调用方式：

- **声明式**：`<weui-dialog v-model:visible="x" title="..." @confirm="..." />`
- **命令式**：`const { action } = await WeuiDialog.confirm({ title, content })`

命令式实现要求：

- 在 `App.vue` 根挂载全局容器 `<weui-overlay-host />`（H5 与小程序根节点各一处），命令式调用通过该容器渲染弹层（不使用 `createApp` 动态挂载，因小程序端不可靠）
- 统一在 `packages/components/src/utils/overlay.ts` 维护 z-index 栈，命令式与声明式共享同一栈以避免遮挡错乱
- toast 命令式内部维护队列（`utils/queue.ts`），多次调用自动排队，避免叠加
- 弹层自建需处理：遮罩 `view` fixed 定位、z-index 全局栈、`@touchmove.stop.prevent` 防穿透、CSS transition 动画

## 5. 样式与主题方案

### 5.1 CSS 来源（方案 A）

依赖 `weui` npm 包 + 适配层，**全用 px（不转 rpx）**。

> **取舍说明**：小程序中 px 为物理像素，不会随屏幕宽度自适应；视觉在窄屏会偏大、宽屏偏小。本项目接受此取舍，以与 weui 官方视觉完全一致为优先。

适配层实现：

- 由使用方（uni-app 示例工程、业务项目）在其 `App.vue` 全局引入 `weui/dist/style/weui.css`，获取 class-based 样式；VitePress 文档站在 `.vitepress/theme/index.ts` 引入
- 组件库自带 `weui-adapter.scss`，把 weui 中的标签选择器（`a/input/img` 等）与 DOM 假设重映射到 uni-app 标签（`view/text/image`）+ class，由使用方在 `App.vue` 一并引入
- 组件内 `<style scoped>` 仅放组件私有样式，不重复引入 weui 基础样式

### 5.2 主题与暗色模式

- 暴露 weui CSS 变量（`--weui-BG-*`、`--weui-FG-*` 等）作为主题令牌
- `theme.scss` 集中定义，支持业务覆盖
- **暗色模式**：`@media (prefers-color-scheme: dark)`（小程序与 H5 均支持）

## 6. 兼容性边界与条件编译

- 目标：微信小程序 + H5，统一 `uni.*` API，**禁用 `wx.*`**
- **条件编译**：仅 H5 可用的 DOM 能力（如 `<input>` 自动聚焦行为差异）用 `#ifdef H5` 降级
- **标签映射**：`div→view`、`span→text`、`img→image`、`a→view(@click)`、`i→text`、`input→input`、`form→form`、`label→view`
- **样式隔离**：小程序组件 `styleIsolation: 'apply-shared'` + `addGlobalClass: true`，确保 weui 全局样式可穿透
- **不依赖** `uni.show*` 原生弹层 API（弹层全部自建，保证双端视觉一致）

## 7. 文档站与示例工程

### 7.1 VitePress 文档站（`docs/`）

- API 文档 + 组件 **H5 实时预览**（组件支持 H5，可直接在 VitePress 中渲染）
- 每组件一页：用法 / 属性表 / 事件表 / 插槽表 / 代码块
- 全局引入 weui 样式 + weui-design-vue install
- 顶部导航：指导 / 组件 / 资源；侧边栏按表单/基础/操作反馈/导航/搜索分类

### 7.2 uni-app 示例工程（`examples/uni-app/`）

- 每组件一个 demo 页，`pages.json` 按官方分类组织
- easycom 指向 `packages/components/src`，可在微信开发者工具直接运行验证小程序端
- 同时可跑 H5（`uni-app dev:h5`）交叉验证双端

## 8. 构建与发布策略（方案 A：源码发布）

- 组件库 `package.json` 的 `main`/`module` 指向 `src/index.ts`，`types` 指向 `types/index.d.ts`，**不 build**
- easycom 与 VitePress 均直接消费 `.vue` 源码
- 发布：先 `workspace` 内消费；v1.0.0 时发 npm

## 9. 测试策略

- **vitest 单测**：仅测纯 JS 逻辑（class 计算、工具函数、props 默认值）；组件渲染测试暂不做（uni-app 组件在 jsdom 下不可靠）
- **示例工程**：作为视觉/交互回归基准，每次改组件手动跑 demo 页验证
- **类型检查**：`vue-tsc` 在 CI 跑全量类型检查
- **不引入** e2e

## 10. 旧代码处理与版本

- 删除 `packages/`、`docs/` 旧内容
- `rm -rf .git && git init`，重新初始化干净 git history
- **remote 重置为空**（不挂回原 remote）
- 新版本从 `v0.1.0` 起步（alpha），组件集完整 + 文档齐全后升 `v1.0.0`
- 旧 v3.0.0 不保留 tag、不保留分支

## 11. 实施顺序（高层）

1. **脚手架阶段**：monorepo 脚手架 + 样式适配层 + 主题变量 + install/easycom 基线 + 弹层全局容器与 z-index 栈
2. **组件实现阶段**：按官方文档顺序逐组件实现（每个含 `.vue` + types + 文档页 + 示例页 + 单测）
3. **集成验证阶段**：示例工程全量跑通微信小程序 + H5 双端
4. **发版阶段**：v1.0.0 发版

## 12. 参考资源

- weui-miniprogram 组件库：https://github.com/wechat-miniprogram/weui-miniprogram
- weui-miniprogram 文档：https://wechat-miniprogram.github.io/weui/docs/
- weui-wxss 样式库：https://github.com/Tencent/weui-wxss/
- weui-wxss 示例：https://github.com/Tencent/weui-wxss/tree/master/dist/example
- WeUI 在线预览：https://weui.io/
