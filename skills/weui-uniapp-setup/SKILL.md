---
name: weui-uniapp-setup
description: "为在 uni-app 项目（微信小程序 / H5）中集成 weui-uniapp-design 组件库提供完整参考：46 个组件的 Props/Events/Slots/代码示例/平台差异、WeUI 设计规范（色彩、排版、间距、圆角）、easycom 配置。当用户询问 weui-uniapp-design 组件用法、某个组件（如 cell、button、dialog、picker）的 API 细节、WeUI 样式规范，或需要 easycom 集成配置时使用。"
agent_created: true
---

# weui-uniapp-design uni-app 组件集成

## 用途

本 Skill 为在 uni-app 项目中使用 `weui-uniapp-design` 组件库提供完整指引：

1. **组件使用指南** — 46 个组件的 Props/Events/Slots/示例/平台差异
2. **WeUI + 微信设计规范** — 色彩体系、排版、间距、圆角、小程序设计规则
3. **easycom 配置** — 开箱即用的配置片段

## 入口与样式约定

- **Vue 3 / H5**：从 `weui-uniapp-design` 根入口或 `weui-uniapp-design/vue` 导入时，组件补充样式会由构建产物自动加载；官方基础样式仍需在应用入口引入 `weui/dist/style/weui.css`。
- **SSR / Node**：服务端需要避免 CSS import 时，使用 `weui-uniapp-design/ssr`。该入口与 Vue 3 根入口导出相同组件和类型，但不加载组件补充 CSS。
- **uni-app**：组件通过 `weui-uniapp-design/uni-app/*.vue` easycom 子入口加载。组件内的 `<style>` 会随 SFC 由 uni-app 编译，不要在 uni-app 页面中导入 Vue 3 根入口或 `/ssr`。
- **显式 CSS**：需要控制加载顺序、主题覆盖或 CSP 时，可显式引入 `weui-uniapp-design/index.css`；重复引入不会改变样式内容。

## 组件局部定制约定

- 所有组件都有 `ext-class`；它和原生 `class`、`style`、`aria-*`、`data-*` 一起绑定到组件的主定制锚点。回答样式问题时优先给出原生 `style` 的简洁示例。
- `wrapper-class` 仅存在于有独立结构包装层的组件：clearable Input、swipe Cell、Actionsheet、Dialog、HalfScreenDialog、Picker、Toast。它只用于外层布局；不要把 `style` 或 `ext-class` 误导到遮罩/包装层。
- 弹层类的主锚点是内容面板，遮罩/宿主层是 `wrapper-class` 的目标；Cell 的主锚点是 `.weui-cell`，Input 的主锚点是原生 input。
- 内置 `weui-*` modifier 继续通过语义 prop 使用；`ext-class` 和 `wrapper-class` 只承载业务自定义 class。

## uni-app 复合组件构建约束

- easycom 只保证业务页面或页面组件使用的顶层 `<weui-*>` 组件，不保证组件库组件内部继续自动解析子组件。
- `weui-form` 是唯一的表单结构组件，必须在组件内部保留完整的原生表单外壳；业务内容直接通过固定 slots 传入，不依赖额外的 Form 容器组件。
- Form 只提供 `default`、`title`、`desc`、`tips`、`opr`、`tips-b`、`extra` slots；Form 内部固定生成双 tips、opr、extra 结构，不提供 `control`、`title-content` 或 `footer` slot。
- `default` 始终渲染到 `.weui-form__control-area`；底部 slot 固定按 `tips → opr → tips-b → extra` 顺序渲染，并由组件内部使用 `v-if` 控制。
- WeUI 内置 modifier 必须通过语义 props 使用，例如 `weui-cells form`、`weui-cells checkbox`、`weui-cell access`、`weui-cell link`、`weui-cell-group form primary`、`weui-icon msg`；`extClass` 仅用于业务自定义 class，不要传入 `weui-*` 内置 class。
- `weui-cells` 是完整内容容器，负责标题、主体、提示和 Cells modifier；`weui-cell-group` 只是 `.weui-cells__group` 外壳，保留 `default` slot 以及 `form` / `primary` 分组样式。业务必须显式组合 `<weui-cell-group><weui-cells>...</weui-cells></weui-cell-group>`，H5 与 uni-app 结构一致。
- Form 的普通 Cells 控件区统一使用 `<weui-cell-group form><weui-cells>...</weui-cells></weui-cell-group>`；`weui-checkbox-group` / `weui-radio-group` 已经自带分组与 Cells 结构，不额外嵌套 CellGroup。
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
- 组件 API 以本指南为准；若与已安装的发布版本不一致，以发布版本为准
