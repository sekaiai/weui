# Skills（AI 辅助开发）

项目内置一个名为 `weui-uniapp-setup` 的 Skill，为 AI 编程工具提供组件库的完整集成参考：组件 API（Props / Events / Slots / 代码示例 / 平台差异）、WeUI 设计规范、样式入口与 easycom 配置片段。使用支持 Anthropic Skills 格式的 AI 工具（Claude Code、Trae、Cursor 等）时，工具会自动匹配并加载本 Skill，无需手动粘贴文档。

## 安装

所有工具均支持**项目级**安装：把 `skills/weui-uniapp-setup/` 目录复制到对应工具的项目 Skills 目录，重启工具后自动发现。

| 工具 | 项目级目录 | 安装命令 |
| --- | --- | --- |
| Claude Code | `.claude/skills/` | `mkdir -p .claude/skills && cp -R skills/weui-uniapp-setup .claude/skills/` |
| Codex | `.codex/skills/` | `mkdir -p .codex/skills && cp -R skills/weui-uniapp-setup .codex/skills/` |
| Trae | `.trae/skills/` | `mkdir -p .trae/skills && cp -R skills/weui-uniapp-setup .trae/skills/` |
| WorkBuddy | `.workbuddy/skills/` | `mkdir -p .workbuddy/skills && cp -R skills/weui-uniapp-setup .workbuddy/skills/` |
| Cursor | `.cursor/skills/` | `mkdir -p .cursor/skills && cp -R skills/weui-uniapp-setup .cursor/skills/` |

## 使用

安装后，在对话中询问组件用法、API 细节、WeUI 样式规范或 easycom 配置时，AI 工具会根据 `SKILL.md` 中的 description 自动加载本 Skill：

| 问题类型 | 加载文件 |
| --- | --- |
| 组件 API（Props / Events / Slots / 示例 / 平台差异） | `references/component-guide.md` |
| 设计规范（色彩 / 排版 / 间距 / 圆角） | `references/design-spec.md` |
| easycom 配置片段 | `assets/template-pages.json` |

回答遵循 Skill 内定义的回答规范：Props 用表格列出、提供可直接复制的代码示例、标注 H5 与小程序平台差异、弹层组件同时说明声明式与命令式用法、提醒挂载 `weui-overlay-host`。

## 当前包入口约定

- Vue 3 / H5 默认从 `weui-uniapp-design` 导入，组件补充 CSS 会自动加载；官方 `weui/dist/style/weui.css` 仍需由应用引入。
- SSR 或 Node 原生加载使用 `weui-uniapp-design/ssr`，该入口不加载 CSS。
- uni-app 使用 `weui-uniapp-design/uni-app/*.vue` 配置 easycom，命令式 API 从 `weui-uniapp-design/uni-app` 导入；不要从 Vue 3 根入口导入。

## 目录结构

```text
skills/weui-uniapp-setup/
├── SKILL.md                    # Skill 定义：名称、触发描述、回答规范
├── assets/
│   └── template-pages.json     # easycom 配置片段
└── references/
    ├── component-guide.md      # 组件 API 参考（46 个组件）
    └── design-spec.md          # WeUI 设计规范
```

## 注意事项

- 组件 API 以 Skill 内参考文档为准；若与已安装的发布版本不一致，以发布版本为准。
- 修改 `skills/` 下的文件后，已安装到 `.claude/skills/` 的副本需要重新复制才会生效。
