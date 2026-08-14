---
name: weui-uniapp-setup
description: "为在 uni-app 项目（微信小程序 / H5）中集成 weui-design-vue 组件库提供完整参考：52 个组件的 Props/Events/Slots/代码示例/平台差异、WeUI 设计规范（色彩、排版、间距、圆角）、easycom 配置。当用户询问 weui-design-vue 组件用法、某个组件（如 cell、button、dialog、picker）的 API 细节、WeUI 样式规范，或需要 easycom 集成配置时使用。"
agent_created: true
---

# weui-design-vue uni-app 组件集成

## 用途

本 Skill 为在 uni-app 项目中使用 `weui-design-vue` 组件库提供完整指引：

1. **组件使用指南** — 52 个组件（42 个主组件 + 10 个子组件）的 Props/Events/Slots/示例/平台差异
2. **WeUI + 微信设计规范** — 色彩体系、排版、间距、圆角、小程序设计规则
3. **easycom 配置** — 开箱即用的配置片段

## 组件索引（快速定位）

| 分类 | 组件 |
|------|------|
| 基础 | Button、Badge、Icon、Loading、Article、Flex / FlexItem、Footer、Progress、Loadmore |
| 布局容器 | Cell / CellGroup、Cells / CellsTitle / CellsTips、Grid / GridItem、Panel、MediaBox、Form、Preview、Agree |
| 表单输入 | Input、Textarea、Checkbox / CheckboxGroup、Radio / RadioGroup、Searchbar、Uploader、Switch、Select |
| 表单容器 | FormControl、FormTips、FormOpr、FormExtra |
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
