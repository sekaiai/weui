# 文档兼容性与样式架构优化实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 修复文档站 uni-app 标签兼容性问题（image 不渲染、view 布局异常）、精简冗余样式架构（删除 theme.scss、精简 weui-adapter.scss）、为 button.md 添加 Cell/验证码/半透明三个完整使用场景示例。

**架构：** 新建 `Vue3Adapter` Vue 插件，运行时将 uni-app 标签（view/text/image）注册为全局组件并渲染为 HTML 标签（div/span/img）；删除冗余的 `theme.scss`（weui.css 已内置 CSS 变量），将 `weui-adapter.scss` 重命名为 `weui-extra.scss` 并仅保留 weui.css 不含的自定义类；为 button.md 补充三个上下文示例并更新 E2E 测试。

**技术栈：** Vue 3 + VitePress + TypeScript + SCSS + Playwright + Vitest

**规格说明：** [docs/superpowers/specs/2026-07-18-docs-compatibility-and-style-architecture-design.md](../specs/2026-07-18-docs-compatibility-and-style-architecture-design.md)

---

## 文件结构

### 新建
- `packages/components/src/vue3-adapter.ts` — Vue3Adapter 插件，运行时将 uni-app 标签映射为 HTML 标签
- `packages/components/src/styles/weui-extra.scss` — 由 weui-adapter.scss 重命名而来，仅保留 weui.css 不含的自定义类
- `tests/components/vue3-adapter.test.ts` — Vue3Adapter 单元测试

### 修改
- `packages/components/src/index.ts` — 导出 Vue3Adapter
- `docs/.vitepress/config.mts` — 从 isCustomElement 移除 view/text/image
- `docs/.vitepress/theme/index.ts` — 注册 Vue3Adapter，更新样式 import 路径，移除 theme.scss
- `examples/uni-app/src/App.vue` — 更新样式 import 路径，移除 theme.scss
- `docs/guide/getting-started.md` — 更新样式 import 路径，移除 theme.scss，新增纯 Vue 3 项目使用说明
- `docs/guide/customize-theme.md` — 重写为基于 weui.css 内置 CSS 变量的定制说明
- `docs/components/button.md` — 为 Cell/验证码/半透明三个场景添加完整上下文示例
- `tests/e2e-docs/button.spec.ts` — 更新 E2E 测试覆盖新增场景

### 删除
- `packages/components/src/styles/theme.scss` — weui.css 已内置全部 `--weui-*` 变量
- `packages/components/src/styles/weui-adapter.scss` — 重命名为 weui-extra.scss 后删除原文件

---

## 任务 1：创建 Vue3Adapter 插件并导出

**文件：**
- 创建：`packages/components/src/vue3-adapter.ts`
- 修改：`packages/components/src/index.ts`
- 创建：`tests/components/vue3-adapter.test.ts`

- [ ] **步骤 1：编写失败的单元测试**

创建 `tests/components/vue3-adapter.test.ts`：

```ts
import { describe, it, expect } from 'vitest'
import { createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Vue3Adapter } from '../../packages/components/src/vue3-adapter'

describe('Vue3Adapter', () => {
  it('将 view 标签渲染为 div', async () => {
    const app = createApp({
      render: () => h('view', { class: 'test-view' }, '内容'),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('<div class="test-view"')
    expect(html).toContain('内容')
    expect(html).not.toContain('<view')
  })

  it('将 text 标签渲染为 span', async () => {
    const app = createApp({
      render: () => h('text', { class: 'test-text' }, '文本'),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('<span class="test-text"')
    expect(html).toContain('文本')
    expect(html).not.toContain('<text')
  })

  it('将 image 标签渲染为 img', async () => {
    const app = createApp({
      render: () => h('image', { src: 'https://example.com/a.png', alt: '图' }),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('<img')
    expect(html).toContain('src="https://example.com/a.png"')
    expect(html).toContain('alt="图"')
    expect(html).not.toContain('<image')
  })

  it('透传未声明的 attrs（如 style、data-*）', async () => {
    const app = createApp({
      render: () => h('view', { style: 'color: red', 'data-id': '123' }, 'x'),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('style="color: red"')
    expect(html).toContain('data-id="123"')
  })

  it('支持插槽内容', async () => {
    const app = createApp({
      render: () => h('view', null, () => [h('text', null, '子文本')]),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('<div')
    expect(html).toContain('<span')
    expect(html).toContain('子文本')
  })
})
```

- [ ] **步骤 2：运行测试验证失败**

运行：`cd packages/components && pnpm vitest run tests/components/vue3-adapter.test.ts`
预期：FAIL，报错 "Cannot find module '../../packages/components/src/vue3-adapter'"

- [ ] **步骤 3：创建 Vue3Adapter 实现文件**

创建 `packages/components/src/vue3-adapter.ts`：

```ts
import type { Plugin, h } from 'vue'

// uni-app 标签 → HTML 标签映射
// 仅列出在 H5/Vue 3 环境中需要映射的标签
// view/text/image 是 uni-app 最常用的三个布局/内容标签
const TAG_MAP: Record<string, string> = {
  view: 'div',
  text: 'span',
  image: 'img',
}

/**
 * Vue3Adapter 插件
 *
 * 将 uni-app 内置标签（view/text/image）注册为 Vue 全局组件，
 * 渲染为对应的标准 HTML 标签（div/span/img）。
 *
 * 仅用于纯 Vue 3 环境（如 VitePress 文档站、纯 Vue 3 项目），
 * uni-app 编译环境（小程序 / uni-app H5）无需此插件，
 * uni-app 编译器会自动处理这些标签。
 *
 * @example
 * ```ts
 * import { createApp } from 'vue'
 * import { Vue3Adapter } from 'weui-design-vue'
 * const app = createApp(App)
 * app.use(Vue3Adapter)
 * ```
 */
export const Vue3Adapter: Plugin = {
  install(app) {
    Object.entries(TAG_MAP).forEach(([tag, htmlTag]) => {
      app.component(tag, {
        name: tag,
        inheritAttrs: false,
        setup(_, { attrs, slots }) {
          return () => h(htmlTag, attrs, slots)
        },
      })
    })
  },
}
```

- [ ] **步骤 4：从主包导出 Vue3Adapter**

修改 `packages/components/src/index.ts`：

在文件顶部 import 区（约第 47 行 `import { WeuiMsg } from './msg'` 之后）添加：

```ts
// Vue 3 适配层（纯 Vue 3 环境使用，如 VitePress 文档站）
import { Vue3Adapter } from './vue3-adapter'
```

在组件导出区（约第 130 行 `WeuiMsg,` 之后，`}` 之前）添加：

```ts
  // Vue 3 适配层
  Vue3Adapter,
```

- [ ] **步骤 5：运行测试验证通过**

运行：`cd packages/components && pnpm vitest run tests/components/vue3-adapter.test.ts`
预期：PASS，5 个测试全部通过

- [ ] **步骤 6：运行类型检查**

运行：`pnpm -r typecheck`
预期：无错误

- [ ] **步骤 7：Commit**

```bash
git add packages/components/src/vue3-adapter.ts packages/components/src/index.ts tests/components/vue3-adapter.test.ts
git commit -m "feat: 新增 Vue3Adapter 插件，将 uni-app 标签映射为 HTML 标签"
```

---

## 任务 2：文档站接入 Vue3Adapter，修复标签兼容性

**文件：**
- 修改：`docs/.vitepress/config.mts`
- 修改：`docs/.vitepress/theme/index.ts`

- [ ] **步骤 1：从 isCustomElement 移除 view/text/image**

修改 `docs/.vitepress/config.mts` 第 99-112 行，将 `vue.template.compilerOptions.isCustomElement` 中的 `view`, `text`, `image` 移除：

```ts
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) =>
          [
            'checkbox', 'radio',
            'checkbox-group', 'radio-group', 'navigator',
            'swiper', 'swiper-item', 'scroll-view',
            'movable-area', 'movable-view',
            'picker-view', 'picker-view-column', 'rich-text',
          ].includes(tag),
      },
    },
  },
```

- [ ] **步骤 2：在文档站注册 Vue3Adapter**

修改 `docs/.vitepress/theme/index.ts`：

```ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import WeuiDesignVue, { Vue3Adapter } from 'weui-design-vue'

// 全局引入 weui 基础样式
import 'weui/dist/style/weui.css'
// 全局引入 weui 适配层（weui.css 不含的自定义类）
import 'weui-design-vue/src/styles/weui-extra.scss'
// 文档站私有样式
import './custom.css'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.use(WeuiDesignVue)
    // 注册 Vue3Adapter：在纯 Vue 3 环境（VitePress）中将 view/text/image
    // 映射为 div/span/img，使 uni-app 标签在浏览器中正确渲染
    ctx.app.use(Vue3Adapter)
  },
}

export default theme
```

> **注：** 此步骤同时移除了 `theme.scss` 的 import，并更新了 `weui-adapter.scss` → `weui-extra.scss`。如果任务 3 尚未完成，此处会因找不到 `weui-extra.scss` 而构建失败。请确保任务 3 在本步骤之前完成，或在本步骤中暂时保留 `weui-adapter.scss` 引用，待任务 3 完成后更新。

- [ ] **步骤 3：验证 progress 组件宽度生效**

启动文档站 dev server：

```bash
pnpm --filter docs dev
```

在浏览器中访问 `http://localhost:5174/components/progress`，确认进度条的 `.weui-progress__inner-bar` 宽度正确显示（非 0%）。同时访问 `http://localhost:5174/components/icon`，确认 `<image>` 标签正确渲染为 `<img>`（在开发者工具中检查 DOM）。

- [ ] **步骤 4：Commit**

```bash
git add docs/.vitepress/config.mts docs/.vitepress/theme/index.ts
git commit -m "fix(docs): 接入 Vue3Adapter 修复 view/text/image 标签浏览器渲染问题"
```

---

## 任务 3：精简样式架构（删除 theme.scss，重命名 weui-adapter.scss）

**文件：**
- 创建：`packages/components/src/styles/weui-extra.scss`
- 删除：`packages/components/src/styles/theme.scss`
- 删除：`packages/components/src/styles/weui-adapter.scss`
- 修改：`examples/uni-app/src/App.vue`
- 修改：`docs/guide/getting-started.md`
- 修改：`docs/guide/customize-theme.md`

- [ ] **步骤 1：创建 weui-extra.scss（精简后的样式文件）**

创建 `packages/components/src/styles/weui-extra.scss`，仅包含 weui.css 不含的自定义类（移除所有标签选择器部分）：

```scss
// weui-extra.scss
// weui.css 不包含的自定义类样式
// 这些类属于 weui-miniprogram 仓库，weui npm 包不含
// 由使用方在 App.vue 全局引入（与 weui.css 一起）

// ---------------------------------------------------------------------------
// cell 组件
// WeUI 源码中未定义 weui-cell__icon，但 cell 组件的 image 图标需要默认尺寸
// 在此补充自定义样式
// ---------------------------------------------------------------------------
.weui-cell__icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
}

// ---------------------------------------------------------------------------
// list 组件
// WeUI v2 中不存在 weui-list 系列类名（仅有 weui-cells / weui-list-tips）
// list 定位为通用列表容器，独立于 cell-group，在此补充自定义样式
// ---------------------------------------------------------------------------
.weui-list {
  margin-top: 8px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scaleY(0.5);
    transform-origin: 0 0;
    z-index: 2;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scaleY(0.5);
    transform-origin: 0 100%;
    z-index: 2;
  }
}
.weui-list__title {
  margin-top: 16px;
  margin-bottom: 3px;
  padding-left: 16px;
  padding-right: 16px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  line-height: 1.4;

  & + .weui-list {
    margin-top: 0;
  }
}
.weui-list__tips {
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.5);
  padding-left: 16px;
  padding-right: 16px;
  font-size: 14px;
  line-height: 1.4;
}

// ---------------------------------------------------------------------------
// slideview 组件
// WeUI npm 包不含 slideview 样式（属 weui-miniprogram 仓库），在此补充自定义实现
// ---------------------------------------------------------------------------
.weui-slideview {
  position: relative;
  overflow: hidden;
}
.weui-slideview__left {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}
.weui-slideview__right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
}
.weui-slideview__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 100%;
  color: #fff;
  font-size: 14px;
  background: #c7c7cc;
}
.weui-slideview__btn_warn {
  background: #fa5151;
}
.weui-slideview_show .weui-slideview__left {
  transform: translateX(-100%);
}
```

- [ ] **步骤 2：删除冗余的 theme.scss 和原 weui-adapter.scss**

```bash
rm packages/components/src/styles/theme.scss
rm packages/components/src/styles/weui-adapter.scss
```

- [ ] **步骤 3：更新 examples/uni-app/src/App.vue 的样式 import**

修改 `examples/uni-app/src/App.vue` 的 `<style>` 块：

```vue
<style>
/* 全局引入 weui 基础样式 */
@import 'weui/dist/style/weui.css';
/* 全局引入 weui 扩展样式（weui.css 不含的自定义类） */
@import 'weui-design-vue/src/styles/weui-extra.scss';
</style>
```

- [ ] **步骤 4：更新 docs/guide/getting-started.md**

替换 `docs/guide/getting-started.md` 全文为：

````markdown
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
````

- [ ] **步骤 5：重写 docs/guide/customize-theme.md**

替换 `docs/guide/customize-theme.md` 全文为：

```markdown
# 定制主题

WeUI Design Vue 通过 CSS 变量提供主题定制能力。`weui.css` 已内置全部 `--weui-*` CSS 变量（含暗色模式），你只需在自己的项目样式中覆盖对应变量即可。

## 覆盖变量

在你的项目样式中覆盖 `weui.css` 内置的变量：

​```css
:root {
  --weui-BRAND: #1989fa;
  --weui-RED: #ee0a24;
}
​```

## 暗色模式

暗色模式默认跟随系统，`weui.css` 通过 `@media (prefers-color-scheme: dark)` 自动切换变量值。

如需手动控制，覆盖暗色模式下的变量即可：

​```css
@media (prefers-color-scheme: dark) {
  :root {
    --weui-BG: #111111;
    --weui-FG: #ffffff;
  }
}
​```

## 可用变量

完整变量列表见 [weui.css 源码](https://github.com/Tencent/weui/blob/master/dist/style/weui.css)。常用变量包括：

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| --weui-BG | 页面背景色 | #ffffff |
| --weui-FG | 文字前景色 | #000000 |
| --weui-BRAND | 主题色（按钮、链接等） | #07c160 |
| --weui-RED | 红色（警告、错误） | #fa5151 |
| --weui-ORANGE | 橙色 | #fa9d3b |
| --weui-BLUE | 蓝色 | #10aeff |
| --weui-LINK | 链接色 | #576b95 |
| --weui-BORDER | 边框色 | rgba(0,0,0,0.1) |
```

> **注：** 上述 markdown 中的代码块使用 `​```` 反引号，实际写入文件时请使用标准的三反引号代码块。下方的文件写入示例已使用正确的代码块语法。

实际写入文件的内容（使用标准三反引号）：

```markdown
# 定制主题

WeUI Design Vue 通过 CSS 变量提供主题定制能力。`weui.css` 已内置全部 `--weui-*` CSS 变量（含暗色模式），你只需在自己的项目样式中覆盖对应变量即可。

## 覆盖变量

在你的项目样式中覆盖 `weui.css` 内置的变量：

```css
:root {
  --weui-BRAND: #1989fa;
  --weui-RED: #ee0a24;
}
```

## 暗色模式

暗色模式默认跟随系统，`weui.css` 通过 `@media (prefers-color-scheme: dark)` 自动切换变量值。

如需手动控制，覆盖暗色模式下的变量即可：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --weui-BG: #111111;
    --weui-FG: #ffffff;
  }
}
```

## 可用变量

完整变量列表见 [weui.css 源码](https://github.com/Tencent/weui/blob/master/dist/style/weui.css)。常用变量包括：

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| --weui-BG | 页面背景色 | #ffffff |
| --weui-FG | 文字前景色 | #000000 |
| --weui-BRAND | 主题色（按钮、链接等） | #07c160 |
| --weui-RED | 红色（警告、错误） | #fa5151 |
| --weui-ORANGE | 橙色 | #fa9d3b |
| --weui-BLUE | 蓝色 | #10aeff |
| --weui-LINK | 链接色 | #576b95 |
| --weui-BORDER | 边框色 | rgba(0,0,0,0.1) |
```

- [ ] **步骤 6：验证构建**

运行文档站 dev server 确认无错误：

```bash
pnpm --filter docs dev
```

预期：dev server 正常启动，无 "Cannot find module" 报错。访问 `http://localhost:5174/components/button` 确认页面正常加载。

- [ ] **步骤 7：Commit**

```bash
git add packages/components/src/styles/weui-extra.scss packages/components/src/styles/theme.scss packages/components/src/styles/weui-adapter.scss examples/uni-app/src/App.vue docs/guide/getting-started.md docs/guide/customize-theme.md
git commit -m "refactor(styles): 删除冗余 theme.scss，精简 weui-adapter 为 weui-extra"
```

---

## 任务 4：为 button.md 添加 Cell/验证码/半透明上下文示例

**文件：**
- 修改：`docs/components/button.md`
- 修改：`tests/e2e-docs/button.spec.ts`

- [ ] **步骤 1：更新 button.md 的 Cell 样式按钮章节**

修改 `docs/components/button.md` 中 `## Cell 样式按钮` 章节（约第 148-166 行），替换为完整的 cell 配合示例：

```markdown
## Cell 样式按钮

`cell` 为 `true` 时渲染为通栏白底按钮，常用于单元格内作为操作项。配合 `weui-cell` 组件使用时，通常放在 `weui-cell__ft`（右侧操作区）或作为独立的通栏 cell。

### 配合 weui-cell 使用

<div class="demo-block">
  <weui-cell-group>
    <weui-cell label="设置" value="已开启">
      <template #ft>
        <weui-button cell type="primary" size="mini">编辑</weui-button>
      </template>
    </weui-cell>
    <weui-cell label="通知" value="已关闭">
      <template #ft>
        <weui-button cell type="default" size="mini">开启</weui-button>
      </template>
    </weui-cell>
  </weui-cell-group>
</div>

### 通栏 Cell 按钮

<div class="demo-block">
  <weui-button cell type="primary">Cell Primary</weui-button>
  <weui-button cell type="default">Cell Default</weui-button>
  <weui-button cell type="warn">Cell Warn</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <!-- 配合 weui-cell 使用 -->
  <weui-cell-group>
    <weui-cell label="设置" value="已开启">
      <template #ft>
        <weui-button cell type="primary" size="mini">编辑</weui-button>
      </template>
    </weui-cell>
    <weui-cell label="通知" value="已关闭">
      <template #ft>
        <weui-button cell type="default" size="mini">开启</weui-button>
      </template>
    </weui-cell>
  </weui-cell-group>

  <!-- 通栏 Cell 按钮 -->
  <weui-button cell type="primary">Cell Primary</weui-button>
  <weui-button cell type="default">Cell Default</weui-button>
  <weui-button cell type="warn">Cell Warn</weui-button>
</template>
```
:::
```

- [ ] **步骤 2：更新 button.md 的验证码按钮章节**

修改 `docs/components/button.md` 中 `## 验证码按钮` 章节（约第 168-182 行），替换为完整的验证码场景示例：

```markdown
## 验证码按钮

`vcode` 为 `true` 时渲染为验证码按钮，带左侧分隔线，配合输入框使用，点击后启动倒计时。

<div class="demo-block">
  <weui-cell-group>
    <weui-cell label="验证码">
      <template #bd>
        <input
          v-model="vcodeInput"
          type="text"
          placeholder="请输入验证码"
          style="width: 100%; border: none; outline: none; font-size: 17px;"
        />
      </template>
      <template #ft>
        <weui-button
          vcode
          :disabled="vcodeCounting"
          @click="onSendVcode"
        >
          {{ vcodeCounting ? `${vcodeSeconds}s 后重发` : '获取验证码' }}
        </weui-button>
      </template>
    </weui-cell>
  </weui-cell-group>
  <p v-if="vcodeMessage" style="margin-top: 8px; color: #07c160; font-size: 14px;">{{ vcodeMessage }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-cell-group>
    <weui-cell label="验证码">
      <template #bd>
        <input
          v-model="vcodeInput"
          type="text"
          placeholder="请输入验证码"
          style="width: 100%; border: none; outline: none; font-size: 17px;"
        />
      </template>
      <template #ft>
        <weui-button
          vcode
          :disabled="vcodeCounting"
          @click="onSendVcode"
        >
          {{ vcodeCounting ? `${vcodeSeconds}s 后重发` : '获取验证码' }}
        </weui-button>
      </template>
    </weui-cell>
  </weui-cell-group>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const vcodeInput = ref('')
const vcodeCounting = ref(false)
const vcodeSeconds = ref(60)
const vcodeMessage = ref('')
let timer: ReturnType<typeof setInterval> | null = null

const onSendVcode = () => {
  if (vcodeCounting.value) return
  vcodeMessage.value = '验证码已发送'
  vcodeCounting.value = true
  vcodeSeconds.value = 60
  timer = setInterval(() => {
    vcodeSeconds.value--
    if (vcodeSeconds.value <= 0) {
      vcodeCounting.value = false
      vcodeSeconds.value = 60
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }, 1000)
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
```
:::
```

- [ ] **步骤 3：更新 button.md 顶部 script setup 块，添加验证码状态**

修改 `docs/components/button.md` 顶部 `<script setup lang="ts">` 块（约第 5-12 行），扩展为：

```ts
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const clickResult = ref('')
const onClick = () => {
  clickResult.value = `点击了按钮（${new Date().toLocaleTimeString()}）`
}

// 验证码按钮状态
const vcodeInput = ref('')
const vcodeCounting = ref(false)
const vcodeSeconds = ref(60)
const vcodeMessage = ref('')
let vcodeTimer: ReturnType<typeof setInterval> | null = null

const onSendVcode = () => {
  if (vcodeCounting.value) return
  vcodeMessage.value = '验证码已发送'
  vcodeCounting.value = true
  vcodeSeconds.value = 60
  vcodeTimer = setInterval(() => {
    vcodeSeconds.value--
    if (vcodeSeconds.value <= 0) {
      vcodeCounting.value = false
      vcodeSeconds.value = 60
      if (vcodeTimer) {
        clearInterval(vcodeTimer)
        vcodeTimer = null
      }
    }
  }, 1000)
}

onUnmounted(() => {
  if (vcodeTimer) clearInterval(vcodeTimer)
})

// 半透明按钮遮罩层
const overlayVisible = ref(false)
const onOverlayCancel = () => {
  overlayVisible.value = false
  clickResult.value = '取消了半透明按钮操作'
}
const onOverlayConfirm = () => {
  overlayVisible.value = false
  clickResult.value = '确认了半透明按钮操作'
}
</script>
```

- [ ] **步骤 4：更新 button.md 的半透明样式章节**

修改 `docs/components/button.md` 中 `## 半透明样式` 章节（约第 184-202 行），替换为完整的遮罩层配合示例：

```markdown
## 半透明样式

`overlay` 为 `true` 时使用半透明样式，常用于弹层（遮罩层）底部的操作按钮。

<div class="demo-block">
  <div class="demo-row">
    <weui-button type="primary" @click="overlayVisible = true">显示遮罩层</weui-button>
  </div>
  <p v-if="clickResult" style="margin-top: 8px; color: #07c160;">{{ clickResult }}</p>
</div>

<div
  v-if="overlayVisible"
  style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: flex-end; z-index: 1000;"
>
  <div style="background: rgba(0,0,0,0.8); padding: 12px; width: 100%; display: flex; gap: 8px;">
    <weui-button type="default" overlay @click="onOverlayCancel">取消</weui-button>
    <weui-button type="primary" overlay @click="onOverlayConfirm">确定</weui-button>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="overlayVisible = true">显示遮罩层</weui-button>

  <div
    v-if="overlayVisible"
    style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: flex-end; z-index: 1000;"
  >
    <div style="background: rgba(0,0,0,0.8); padding: 12px; width: 100%; display: flex; gap: 8px;">
      <weui-button type="default" overlay @click="onOverlayCancel">取消</weui-button>
      <weui-button type="primary" overlay @click="onOverlayConfirm">确定</weui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const overlayVisible = ref(false)
const clickResult = ref('')

const onOverlayCancel = () => {
  overlayVisible.value = false
  clickResult.value = '取消了半透明按钮操作'
}
const onOverlayConfirm = () => {
  overlayVisible.value = false
  clickResult.value = '确认了半透明按钮操作'
}
</script>
```
:::
```

- [ ] **步骤 5：更新 E2E 测试覆盖新增场景**

替换 `tests/e2e-docs/button.spec.ts` 全文：

```ts
import { test, expect, expectNoErrors } from './helpers'

test.describe('Button 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('button')
    await expect(page.locator('h1')).toContainText('Button')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(9)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击 primary 按钮显示结果', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    await expect(firstDemo.locator('p')).toContainText('点击了按钮')
  })

  test('不同类型按钮均可点击', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const firstDemo = page.locator('.demo-block').first()
    const buttons = firstDemo.locator('.weui-btn')
    await buttons.nth(1).click()
    await expect(firstDemo.locator('p')).toContainText('点击了按钮')
  })

  test('禁用按钮不触发 click', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const disabledDemo = page.locator('.demo-block').nth(3)
    const disabledBtn = disabledDemo.locator('.weui-btn').first()
    await expect(disabledBtn).toBeDisabled()
    await disabledBtn.click({ force: true }).catch(() => {})
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('p')).toHaveCount(0)
  })

  test('加载状态按钮渲染 loading 图标', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const loadingDemo = page.locator('.demo-block').nth(4)
    await expect(loadingDemo.locator('.weui-primary-loading')).toHaveCount(2)
  })

  test('Cell 样式按钮：配合 weui-cell 渲染正确结构', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    // Cell 章节（包含配合 weui-cell 的示例）
    const heading = page.locator('h2', { hasText: 'Cell 样式按钮' })
    const cellSection = heading.locator('xpath=following::div[@class="demo-block"][1]')
    // 验证 weui-cell 结构存在
    await expect(cellSection.locator('.weui-cell')).toHaveCount(2)
    // 验证 cell 按钮存在
    await expect(cellSection.locator('.weui-btn_cell')).toHaveCount(2)
  })

  test('Cell 样式按钮：通栏按钮渲染正确类名', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    // 通栏 Cell 按钮是 Cell 章节的第二个 demo-block
    const heading = page.locator('h2', { hasText: 'Cell 样式按钮' })
    const allDemos = heading.locator('xpath=following::div[@class="demo-block"]')
    const通栏Demo = allDemos.nth(1)
    await expect(通栏Demo.locator('.weui-btn_cell')).toHaveCount(3)
    await expect(通栏Demo.locator('.weui-btn_cell-primary')).toHaveCount(1)
    await expect(通栏Demo.locator('.weui-btn_cell-warn')).toHaveCount(1)
  })

  test('验证码按钮：点击后启动倒计时', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const heading = page.locator('h2', { hasText: '验证码按钮' })
    const vcodeDemo = heading.locator('xpath=following::div[@class="demo-block"][1]')
    const vcodeBtn = vcodeDemo.locator('.weui-vcode-btn')
    await expect(vcodeBtn).toHaveCount(1)
    // 初始文本
    await expect(vcodeBtn).toContainText('获取验证码')
    // 点击启动倒计时
    await vcodeBtn.click()
    // 验证倒计时启动（按钮变为禁用，显示倒计时文本）
    await expect(vcodeBtn).toBeDisabled()
    await expect(vcodeBtn).toContainText('后重发')
    // 验证发送提示出现
    await expect(vcodeDemo.locator('p')).toContainText('验证码已发送')
  })

  test('半透明样式：点击显示遮罩层', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const heading = page.locator('h2', { hasText: '半透明样式' })
    const overlayDemo = heading.locator('xpath=following::div[@class="demo-block"][1]')
    const triggerBtn = overlayDemo.locator('.weui-btn').first()
    // 初始遮罩层不存在
    await expect(page.locator('div').filter({ hasText: '取消' }).filter({ has: page.locator('.weui-btn_overlay') })).toHaveCount(0)
    // 点击触发遮罩层
    await triggerBtn.click()
    // 验证遮罩层出现，包含两个半透明按钮
    const overlayBtns = page.locator('.weui-btn_overlay')
    await expect(overlayBtns).toHaveCount(2)
    await expect(page.locator('.weui-btn_overlay').filter({ hasText: '取消' })).toBeVisible()
    await expect(page.locator('.weui-btn_overlay').filter({ hasText: '确定' })).toBeVisible()
  })

  test('半透明样式：点击取消隐藏遮罩层', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const heading = page.locator('h2', { hasText: '半透明样式' })
    const overlayDemo = heading.locator('xpath=following::div[@class="demo-block"][1]')
    const triggerBtn = overlayDemo.locator('.weui-btn').first()
    await triggerBtn.click()
    // 点击取消
    await page.locator('.weui-btn_overlay').filter({ hasText: '取消' }).click()
    // 验证遮罩层消失
    await expect(page.locator('.weui-btn_overlay')).toHaveCount(0)
    // 验证结果显示
    await expect(overlayDemo.locator('p')).toContainText('取消了半透明按钮操作')
  })
})
```

- [ ] **步骤 6：运行 E2E 测试验证通过**

运行：

```bash
pnpm e2e docs-chromium -- --grep "Button 文档"
```

预期：所有 Button 文档测试通过

> **注：** 如果 `--grep` 参数不被支持，可运行完整 E2E：`pnpm e2e`

- [ ] **步骤 7：Commit**

```bash
git add docs/components/button.md tests/e2e-docs/button.spec.ts
git commit -m "docs(button): 为 Cell/验证码/半透明按钮添加完整上下文示例"
```

---

## 任务 5：全量验证

**文件：** 无（仅运行验证命令）

- [ ] **步骤 1：运行单元测试**

```bash
cd packages/components && pnpm vitest run
```

预期：所有单元测试通过（含新增的 vue3-adapter 测试），通过数 ≥ 833 + 5 = 838

- [ ] **步骤 2：运行类型检查**

```bash
pnpm -r typecheck
```

预期：无 TypeScript 错误

- [ ] **步骤 3：运行 E2E 测试**

```bash
pnpm e2e
```

预期：所有 E2E 测试通过（examples + docs，含新增的 button 上下文场景测试）

- [ ] **步骤 4：手动验证文档站渲染**

启动文档站 dev server：

```bash
pnpm --filter docs dev
```

在浏览器中验证：

1. 访问 `http://localhost:5174/components/progress`，确认进度条宽度正确显示（设置 percent=50 时，`.weui-progress__inner-bar` 宽度为 50%）
2. 访问 `http://localhost:5174/components/icon`，打开开发者工具，确认 `<image>` 标签已渲染为 `<img>`（不再是未知的 `<image>` 元素）
3. 访问 `http://localhost:5174/components/button`，确认：
   - Cell 样式按钮章节显示配合 weui-cell 的完整示例
   - 验证码按钮章节显示配合输入框的完整示例，点击后倒计时启动
   - 半透明样式章节点击后显示遮罩层，包含取消/确定两个半透明按钮
4. 访问 `http://localhost:5174/guide/getting-started`，确认三种使用场景说明清晰
5. 访问 `http://localhost:5174/guide/customize-theme`，确认基于 weui.css 变量的定制说明正确

- [ ] **步骤 5：验证报告**

完成所有验证后，向用户报告：

- 单元测试：X 个通过
- typecheck：无错误
- E2E 测试：X 个通过（含新增 button 上下文场景测试）
- 手动验证：progress 宽度生效、image 渲染为 img、button 三个上下文示例可交互

---

## 自检结果

**1. 规格覆盖度：**

| 规格需求 | 对应任务 |
|---|---|
| 问题 1：文档站标签兼容性 | 任务 1（Vue3Adapter 插件）+ 任务 2（文档站接入） |
| 问题 2：案例实用性 | 任务 4（button 三个上下文示例） |
| 问题 3：样式架构 | 任务 3（删除 theme.scss、精简 weui-adapter） |
| 架构转变：支持 uni-app | 任务 1（导出 Vue3Adapter）+ 任务 3（getting-started 文档说明三种场景） |
| 验证策略 | 任务 5（全量验证） |

**2. 占位符扫描：** 无 TODO/待定/类似任务 N 等占位符。所有代码步骤均包含完整代码。

**3. 类型一致性：**
- `Vue3Adapter` 在任务 1 定义、任务 2 使用，名称一致
- `vcodeCounting`/`vcodeSeconds`/`vcodeMessage`/`vcodeTimer` 在 button.md 的 script setup 与 E2E 测试中一致
- `overlayVisible`/`onOverlayCancel`/`onOverlayConfirm` 在 button.md 内部一致
- `weui-extra.scss` 在任务 3 创建、任务 2 引用（已注解顺序依赖），名称一致

**4. 顺序依赖说明：** 任务 2 的步骤 2 引用了 `weui-extra.scss`，该文件在任务 3 步骤 1 创建。执行顺序应按任务编号 1→2→3→4→5，或调整任务 2 步骤 2 暂时保留 `weui-adapter.scss` 引用，待任务 3 完成后更新。建议按编号顺序执行。

自检通过。
