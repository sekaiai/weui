# 文档兼容性与样式架构优化设计

> **日期：** 2026-07-18
> **主题：** 修复文档站标签兼容性、精简样式架构、提升案例实用性
> **状态：** 设计阶段

---

## 一、背景与问题

阶段一已完成 32 个组件文档的交互式案例补全（498 个 E2E 测试通过、833 个单元测试通过）。但在实际使用中暴露出三类问题：

### 问题 1：文档站标签兼容性

VitePress 通过 `vue.compilerOptions.isCustomElement` 把 uni-app 内置标签（`view`/`image`/`text` 等）标记为自定义元素，浏览器将其渲染为未知的内联元素，导致：

- **`<image>` 标签不渲染**：浏览器不识别此标签，图片完全不显示。
- **`<view>` 标签布局异常**：作为内联元素，`width`/`height`/`flex` 等属性失效。典型表现是 `weui-progress__inner-bar` 的 `width` 不生效（进度条永远是 0%）。
- **`<text>` 标签行为异常**：行内布局与预期不符。

### 问题 2：案例实用性不足

部分案例只展示组件本身，缺乏使用上下文，用户看不懂在何处使用。典型问题：

- Button 的 **Cell 样式按钮**：单独展示一个按钮，用户不知道应配合 `weui-cell` 在列表项内使用。
- Button 的 **验证码按钮**：单独展示，用户不知道应配合输入框 + 倒计时逻辑使用。
- Button 的 **半透明样式**：单独展示，用户不知道这是用于弹层底部的按钮样式。

### 问题 3：样式架构冗余与不一致疑虑

当前样式架构存在三处疑虑：

1. **`theme.scss` 是否必须**：经核实，`weui/dist/style/weui.css` 已内置 395 处 `--weui-*` CSS 变量（含暗色模式），`theme.scss` 完全冗余。
2. **`weui-adapter.scss` 标签映射是否必须**：经核实，`weui.css` 几乎没有标签选择器（仅 `a` 与 `input,textarea`），不需要将 `view`/`text`/`image` 标签映射到 `div`/`span`/`img` 的样式规则。
3. **`weui` vs `weui-wxss` 的统一性**：H5 端使用 `weui`（npm 包），小程序端通过 `useExtendedLib` 引入 `weui-wxss`，两者类名完全一致，但 CSS 选择器适配不同平台标签。需明确说明两端引入方式。

---

## 二、架构方向

### 定位转变

从"基于 uni-app 的 WeUI 组件库"转变为 **"支持 uni-app 的 WeUI Vue 3 组件库"**。

| 层 | 现状 | 新方案 |
|---|---|---|
| 组件库 | 使用 uni-app 标签（view/image/text） | **不变**（保证小程序兼容） |
| 文档站 | VitePress + isCustomElement（标签不渲染） | VitePress + **运行时标签映射插件** |
| 纯 Vue 3 项目 | 无法使用 | 可通过映射插件使用 |

**核心原则：** 组件库一套代码同时服务三个场景：

1. **小程序**：uni-app 编译器处理标签
2. **uni-app H5**：uni-app 编译器处理标签
3. **纯 Vue 3 项目**（如 VitePress 文档站）：通过 `Vue3Adapter` 插件将 uni-app 标签映射为 HTML 标签

---

## 三、方案详述

### 方案 1：运行时标签映射插件（解决问题 1）

#### 设计

新建 `packages/components/src/vue3-adapter.ts`，将 uni-app 内置标签注册为 Vue 全局组件，渲染为对应 HTML 标签。

```ts
import type { Plugin, h } from 'vue'

// uni-app 标签 → HTML 标签映射
const TAG_MAP: Record<string, string> = {
  view: 'div',
  text: 'span',
  image: 'img',
}

// 将 uni-app 内置标签注册为全局组件，渲染为对应 HTML 标签
// 仅用于纯 Vue 3 环境（如 VitePress 文档站），uni-app 环境无需此插件
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

#### 配置变更

**`docs/.vitepress/config.mts`**：从 `isCustomElement` 列表中移除 `view`/`text`/`image`（保留 `checkbox`/`radio`/`swiper`/`scroll-view` 等暂未映射的标签）。

**`docs/.vitepress/theme/index.ts`**：在 `enhanceApp` 中注册 `Vue3Adapter`：

```ts
import { Vue3Adapter } from 'weui-design-vue'

enhanceApp(ctx) {
  DefaultTheme.enhanceApp(ctx)
  ctx.app.use(WeuiDesignVue)
  ctx.app.use(Vue3Adapter)
}
```

**`packages/components/src/index.ts`**：导出 `Vue3Adapter`，供纯 Vue 3 用户使用。

#### 验证

- 文档站 `<image>` 标签正确渲染为 `<img>`
- 文档站 progress 组件宽度正确生效
- 文档站所有原有 E2E 测试仍通过

---

### 方案 2：精简样式架构（解决问题 3）

#### 决策表

| 文件 | 决策 | 原因 |
|---|---|---|
| `theme.scss` | **删除** | `weui.css` 已包含全部 `--weui-*` CSS 变量（395 处），完全冗余 |
| `weui-adapter.scss` 标签映射部分（view/text/image/button） | **删除** | `weui.css` 无标签选择器；运行时映射后 view→div 自带默认行为 |
| `weui-adapter.scss` 自定义类部分（.weui-list/.weui-slideview/.weui-cell__icon） | **保留** | `weui.css` 不含这些类（属于 weui-miniprogram 仓库），必须保留 |

#### 实施

1. **删除** `packages/components/src/styles/theme.scss`
2. **重命名** `weui-adapter.scss` 为 `weui-extra.scss`，仅保留自定义类样式（移除 view/text/image/button 标签选择器部分）
3. **修改** `docs/.vitepress/theme/index.ts`：
   - 移除 `import 'weui-design-vue/src/styles/theme.scss'`
   - 将 `import 'weui-design-vue/src/styles/weui-adapter.scss'` 改为 `import 'weui-design-vue/src/styles/weui-extra.scss'`
4. **全局搜索** 项目内其他对 `theme.scss` 与 `weui-adapter.scss` 的引用，同步更新（例如 `examples/uni-app/src/App.vue`、组件源码内的 import）

#### weui vs weui-wxss 统一性说明

- **`weui`（npm 包）**：H5 版本，类名与 `weui-wxss` 一致，CSS 选择器适配 HTML 标签
- **`weui-wxss`（GitHub）**：小程序版本，类名一致，CSS 选择器适配 WXML 标签
- **类名一致性**：两者类名完全一致（都是 `.weui-btn`/`.weui-cell` 等），所以组件库一套类名可同时服务两端
- **组件库不绑定 CSS**：组件库只提供 Vue 组件（带 weui 类名），由使用方按平台引入对应 CSS

#### 文档说明（"快速上手"页面）

清晰说明各端的 CSS 引入方式：

- **纯 Vue 3 / H5 项目**：
  ```ts
  import 'weui/dist/style/weui.css'
  import 'weui-design-vue/src/styles/weui-extra.scss'
  import { Vue3Adapter } from 'weui-design-vue'
  app.use(Vue3Adapter)
  ```
- **uni-app H5**：由 uni-app 编译器处理标签，引入 `weui.css` + `weui-extra.scss` 即可，无需 `Vue3Adapter`
- **小程序**：通过 `useExtendedLib` 引入 `weui-wxss`（或手动引入），无需 `weui.css` 与 `weui-extra.scss`（小程序端自定义类需另行处理，但当前 `.weui-list`/`.weui-slideview` 等类已在组件内部使用，需确认小程序端如何引入这些自定义类）

> **注：** `.weui-list`/`.weui-slideview`/`.weui-cell__icon` 等自定义类在小程序端的引入方式需要在实现阶段进一步验证。如果 weui-wxss 不含这些类，可能需要在组件源码内联这些样式，或在文档中提供单独的小程序端 SCSS 引入路径。此为已知待验证项，不阻塞主体方案。

---

### 方案 3：提升案例实用性（解决问题 2）

#### 原则

- **只在必要时添加上下文**：仅在用户反馈"看不懂在何处使用"的组件上添加完整使用场景
- **不滥用**：大多数组件单独展示即可理解，无需额外上下文
- **优先 button 组件**：当前最突出的案例不足问题

#### Button 组件案例优化

为 button.md 添加三个完整使用场景示例：

**1. Cell 样式按钮（配合 cell 组件）**

展示在 `weui-cell` 内作为操作按钮的完整示例：cell 容器 + cell__hd（图标）+ cell__bd（标题）+ cell__ft（按钮）。

**2. 验证码按钮（配合输入框 + 倒计时）**

展示完整的验证码发送场景：输入框 + 验证码按钮，点击后启动 60 秒倒计时，倒计时结束恢复可点击状态。包含完整的 `<script setup>` 倒计时逻辑。

**3. 半透明样式（配合遮罩层）**

展示半透明按钮在弹层底部的使用场景：遮罩层 + 底部按钮组（取消/确定），按钮使用 `weui-btn_overlay` 样式。

#### 其他组件

本次只优化 button 组件。其他组件如后续发现类似"看不懂在何处使用"的问题，再单独处理。

#### E2E 测试更新

button 的 E2E 测试需更新以覆盖新增的三个场景：
- 验证码按钮倒计时功能
- Cell 内按钮点击
- 半透明按钮点击

---

## 四、影响范围

| 改动 | 影响范围 | 风险 |
|---|---|---|
| 运行时标签映射插件 | 文档站 image/progress 等渲染问题全部修复 | 低（仅文档站） |
| 删除 theme.scss | 无功能影响（weui.css 已有变量） | 低 |
| 精简 weui-adapter.scss | 无功能影响（标签映射多余） | 低 |
| button 上下文示例 | 文档更易懂 | 低（需更新 E2E） |

---

## 五、验证策略

1. **单元测试**：`cd packages/components && pnpm vitest run` — 全部通过
2. **类型检查**：`pnpm -r typecheck` — 无错误
3. **E2E 测试**：`pnpm e2e` — 全部通过（包括新增的 button 场景测试）
4. **手动验证**：
   - 文档站 progress 组件宽度正确显示
   - 文档站所有 `<image>` 标签正确渲染为 `<img>`
   - button 三个新案例可交互且符合预期

---

## 六、不在本次范围

- 其他组件文档的案例实用性优化（仅在用户反馈后再处理）
- 小程序端自定义类样式的引入方式（标记为待验证项，不阻塞主体方案）
- 组件库内部架构重构
- 新增组件或功能

---

## 七、实施顺序建议

1. 运行时标签映射插件（解决问题 1）
2. 精简样式架构（解决问题 3）
3. button 上下文示例（解决问题 2）
4. 全量验证（单元测试 + 类型检查 + E2E）
