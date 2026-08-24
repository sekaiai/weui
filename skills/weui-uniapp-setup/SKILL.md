---
name: weui-uniapp-setup
description: "为在 uni-app 项目（微信小程序 / H5）中集成 weui-design-vue 组件库提供完整参考：46 个组件的 Props/Events/Slots/代码示例/平台差异、WeUI 设计规范（色彩、排版、间距、圆角）、easycom 配置。当用户询问 weui-design-vue 组件用法、某个组件（如 cell、button、dialog、picker）的 API 细节、WeUI 样式规范，或需要 easycom 集成配置时使用。"
agent_created: true
---

# weui-design-vue uni-app 组件集成

## 用途

本 Skill 为在 uni-app 项目中使用 `weui-design-vue` 组件库提供完整指引：

1. **组件使用指南** — 46 个组件的 Props/Events/Slots/示例/平台差异
2. **WeUI + 微信设计规范** — 色彩体系、排版、间距、圆角、小程序设计规则
3. **easycom 配置** — 开箱即用的配置片段

## uni-app 复合组件构建约束

- easycom 只保证业务页面或页面组件使用的顶层 `<weui-*>` 组件，不保证组件库组件内部继续自动解析子组件。
- 生成到 `dist/uni-app/` 的复合组件不得依赖内部 WeUI 子组件的自动引入；模板中不得残留未显式注册的 `<weui-*>` 子组件标签。
- 所有生成的 uni-app Vue SFC 都必须在 `export default.options` 中包含 `virtualHost: true`，由统一转换器注入并由 `pnpm check:uni-app` 校验。
- 内部结构应优先使用 uni-app 原生标签或完整内联结构；如果某个内部能力无法安全内联，则按组件约定保留外层框架并留空。
- `weui-form` 是唯一的表单结构组件，必须在组件内部保留完整的原生表单外壳；业务内容直接通过固定 slots 传入，不依赖额外的 Form 容器组件。
- Form 只提供 `default`、`title`、`desc`、`tips`、`opr`、`tips-b`、`extra` slots；Form 内部固定生成双 tips、opr、extra 结构，不提供 `control`、`title-content` 或 `footer` slot。
- `default` 始终渲染到 `.weui-form__control-area`；底部 slot 固定按 `tips → opr → tips-b → extra` 顺序渲染，并由组件内部使用 `v-if` 控制。
- 修改复合组件时，必须同时验证源码转换结果、生成的 uni-app SFC 和 `pnpm check:uni-app`，避免只验证 Vue 3/H5 产物。
- WeUI 内置 modifier 必须通过语义 props 使用，例如 `weui-cells form`、`weui-cells checkbox`、`weui-cell access`、`weui-cell link`、`weui-cell-group form primary`、`weui-icon msg`；`extClass` 仅用于业务自定义 class，不要传入 `weui-*` 内置 class。
- `weui-cells` 是完整内容容器，负责标题、主体、提示和 Cells modifier；`weui-cell-group` 只是 `.weui-cells__group` 外壳，保留 `default` slot 以及 `form` / `primary` 分组样式。业务必须显式组合 `<weui-cell-group><weui-cells>...</weui-cells></weui-cell-group>`，H5 与 uni-app 结构一致。
- `weui-checkbox-group` / `weui-radio-group` 保留原生选中联动职责，但视觉结构统一使用 `title`、`default`、`tips`；底部提示使用 `tips`，不再使用 `footer`。

## 组件索引（快速定位）

| 分类 | 组件 |
|------|------|
| 基础 | Button、Badge、Icon、Loading、Article、Flex / FlexItem、Footer、Progress、Loadmore |
| 布局容器 | Cell / CellGroup、Cells、Grid / GridItem、Panel、MediaBox、Preview、Agree |
| 表单输入 | Input、Textarea、Checkbox / CheckboxGroup、Radio / RadioGroup、Searchbar、Uploader、Switch、Select |
| 表单容器 | Form |
| 操作反馈 | OverlayHost、Dialog、Actionsheet、HalfScreenDialog、Toast、Toptips、Picker / PickerGroup、Gallery、Slideview |
| 导航 | Navbar / NavbarItem、Tabbar / TabbarItem、Steps |
| 展示 | Msg |

## 工作流

根据用户的问题类型，加载对应的参考文件：

| 问题类型 | 加载文件 |
|----------|---------|
| 组件 API（Props / Events / Slots / 示例 / 平台差异） | `references/component-guide.md` |
| 设计规范（色彩 / 字体 / 间距 / 圆角 / 样式自定义） | `references/design-spec.md` |
| easycom 配置片段 | `assets/template-pages.json` |

## 回答规范

- 查询组件 Props 时，用**表格**列出名称/类型/默认值/说明
- 给出可直接复制使用的**代码示例**
- 标注**平台差异**：H5 vs 小程序的特定行为
- 弹层组件同时说明声明式和命令式两种用法
- 设计问题回答时引用 WeUI CSS 变量名和具体 px 值
- 提醒必须挂载 `weui-overlay-host`（弹层依赖）
- 组件 API 以 `packages/components/src` 源码为准；本指南是静态参考，若与源码不一致，以源码为准
