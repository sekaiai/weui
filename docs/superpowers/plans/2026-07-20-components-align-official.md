# 31 个组件对齐官方示例 - 实现计划

## 背景

Panel 和 MediaBox 已完成对齐（commits 3d8c68e..925482c）。剩余 31 个组件需要按同样标准处理。

## 参考资源

- WeUI 官方示例源码：https://github.com/Tencent/weui/tree/master/src/example
- weui-design-vue 参考实现：https://github.com/llkui/weui-design-vue/tree/master/packages
- 保持我们自己的设计风格和理念（数据驱动、slot fallback、SFC 内联样式、div/span/img 源码标签）

## 全局约束（所有组件必须遵守）

### 源码标签
- 组件源码统一用 `<div>`/`<span>`/`<img>` + 官方语义标签（`<strong>`/`<p>`/`<ul>`/`<li>`/`<a>`）
- build-plugin 在构建 uni-app 产物时自动转换为 view/text/image/navigator
- 不要用 `<component :is>`（build-plugin 基于源码字符串替换）

### API 设计风格
- TypeScript + `<script setup lang="ts">`
- 组件标签用 weui- 前缀
- 数据驱动 + 自动推断优先，减少显式 type 传参
- slot 作为 fallback 内容，不用 v-else 控制
- prop 命名：kebab-case（模板中）/ camelCase（TS 中）
- 平台差异通过条件编译注释（#ifdef H5 / #ifndef H5）分离

### 样式
- 自定义样式写在组件 SFC 的 `<style lang="scss">` 块
- 不使用集中式 weui-extra.scss（已删除）
- 优先使用 weui.css 提供的 .weui-* 类，不重复定义

### 精简原则
- 移除未使用的 props / 变量 / dead code
- 合并重复的模板分支
- 不添加未被要求的功能（YAGNI）

## 每个组件的处理步骤

### Step 1 — 对齐官方结构
参考 weui.io 官方示例的 DOM 结构与类名，确认需要哪些 weui-* 类。

### Step 2 — 精简组件代码
- 移除未使用的 useSlots / slots 变量
- 移除从未被外部传入的 props
- 移除 dead code
- 合并重复模板分支

### Step 3 — 统一 API 设计
- 数据驱动 + 自动推断
- slot 作为 fallback
- prop 命名规范

### Step 4 — 样式内联（如需要）
- 自定义类迁移到 SFC `<style lang="scss">`
- 不新增集中式样式文件

### Step 5 — 更新文档与示例
- `docs/components/<comp>.md`：对齐官方示例的 demo
- `examples/uni-app/src/pages/<comp>/<comp>.vue`：同步 demo
- 更新 Attributes / Events / Slots 表格

### Step 6 — 浏览器实测（仅文档）
- 用 browser_use 子智能体访问 VitePress 文档页
- 截图验证渲染效果
- 验证基本交互

### Step 7 — 最终全量验证（所有组件完成后）
```bash
cd packages/components && pnpm vitest run
pnpm -r typecheck
cd packages/components && pnpm build:uni-app
lsof -ti:5173 5174 | xargs kill -9 2>/dev/null
pnpm e2e
```

## 分批方案（每批 6-8 个组件）

### 批次 1 — 基础展示组件（8 个）
- button, icon, badge, loading, progress, loadmore, footer, article

### 批次 2 — 容器与列表组件（7 个）
- cell, list, flex, form, form-page, msg, preview

### 批次 3 — 导航组件（4 个）
- navbar, tabbar, grid, steps

### 批次 4 — 弹层与反馈组件（7 个）
- actionsheet, dialog, half-screen-dialog, gallery, toast, toptips, slideview

### 批次 5 — 表单输入组件（5 个）
- input, searchbar, uploader, picker, checkbox

## 进度记录

进度账本：`.superpowers/sdd/progress.md`
