# 文档案例优化设计

> 日期：2026-07-17
> 主题：为 32 个组件文档补齐可交互案例，并添加 E2E 测试保障

## 背景与现状

当前 `docs/components/` 下 32 个组件文档的案例覆盖严重不均：

| 状态 | 文档 | 数量 |
|------|------|------|
| 有 demo-block 且能正常渲染（纯静态） | button | 1 |
| 有 demo-block **但坏掉**（引用未定义变量，点击报错） | actionsheet, dialog, half-screen-dialog, picker, toast, toptips | 6 |
| 完全无 demo-block，只有代码块 | 其余 25 个 | 25 |

**根因**：VitePress 将每个 md 文件当作 Vue 组件渲染，demo-block 内的 `@click="show1 = true"` 需要 `<script setup>` 定义 `show1`，但这 6 个文档的 `<script setup>` 只出现在 `::: details` 代码块内（作为展示代码），并未真正执行。另外 [custom.css](../../../docs/.vitepress/theme/custom.css) 存在 `.vp-doc .weui-btn` 等 weui 组件样式干预，违反"不干预 weui 样式"原则。

## 目标

1. **全部 32 个组件文档都有可交互案例**：弹层组件点击按钮真弹出，表单组件可输入，切换组件可切换状态
2. **案例全覆盖**：每个 Attribute、Event、Slot 至少有一个 demo 演示
3. **案例能正确显示且功能正常**：通过完整 Playwright E2E 覆盖验证
4. **清理 weui 样式干预**：删除 `.vp-doc .weui-btn` 等样式，weui 组件零样式干预

## 设计

### 1. 渲染机制：顶部 `<script setup>` + demo-block

每个 md 文件顶部统一加一个 `<script setup>` 块，定义该文档所有 demo 所需的状态、数据、方法。demo-block 内直接写模板引用这些变量。`::: details 查看代码` 块展示**完整可运行代码**（含 script setup），用户可直接复制使用。

**示例结构**：

```markdown
# Cell 列表项

<script setup>
import { ref } from 'vue'
const clickedCell = ref('')
const onClick = (label: string) => { clickedCell.value = label }
</script>

## 基础用法

<div class="demo-block">
  <weui-cell-group title="带说明的列表项">
    <weui-cell title="标题文字" value="说明文字" />
  </weui-cell-group>
</div>

::: details 查看代码
```vue
<template>
  <weui-cell-group title="带说明的列表项">
    <weui-cell title="标题文字" value="说明文字" />
  </weui-cell-group>
</template>
```
:::
```

**关键约束**：
- VitePress 编译执行顶部 `<script setup>`，但不会编译 `::: details` 内代码块（仅作文本展示）
- demo-block 内模板与 details 内代码**保持一致**，便于用户复制
- 弹层组件文档在**第一个弹层 demo 之前**挂载一次 `<weui-overlay-host />`（文档级单例，避免重复挂载）
- 类型导入放 `<script setup>` 顶部，运行时组件靠 VitePress `enhanceApp` 全局注册

### 2. 样式清理

删除 [custom.css](../../../docs/.vitepress/theme/custom.css) 中所有针对 weui 组件的样式干预，仅保留 demo 容器样式。

**清理前**：
```css
.vp-doc .weui-btn { margin-right: 8px; margin-bottom: 8px; }
.vp-doc .demo-block { padding: 16px; margin: 16px 0; border: 1px solid #eee; border-radius: 4px; }
```

**清理后**：
```css
.vp-doc .demo-block {
  padding: 16px;
  margin: 16px 0;
  border: 1px solid #eee;
  border-radius: 4px;
}
```

**布局间距处理**：多个 weui-button 横排时，用外层 `<div style="display: flex; flex-wrap: wrap; gap: 8px;">` 包裹，不污染 weui 组件本身。

### 3. 案例覆盖标准

每个组件文档按以下结构组织，**全覆盖**每个 Attribute 和 Event：

**章节顺序**：
1. 介绍（1-2 句话）
2. 基础用法（最常用场景）
3. 主要功能变体（按 Attribute 分组，每节 1 个 demo）
4. 插槽（如有，每插槽 1 个 demo）
5. 事件（如有，每事件 1 个 demo 或合并展示）
6. 命令式 API（仅弹层组件，覆盖 `show`/快速方法/Promise）
7. Attributes 表格
8. Events 表格
9. Slots 表格（如有）

**覆盖判定**：实现完成后逐个 Attribute/Event/Slot 对照 md 中的 demo，确保每个都至少有一个 demo 演示。对于多取值 Attribute（如 `type` 有 primary/default/warn），一个 demo 内并排展示所有取值，不拆成多个 demo。

**特殊处理**：
- **wx.* 开放能力相关**（button 的 `open-type`、`getphonenumber` 事件）：仅展示代码块，不要求 demo（浏览器环境无法触发）
- **uploader 的 `choose-image`**：用 mock 数据演示，不真实选图
- **searchbar 的 focus**：通过按钮触发，不依赖 DOM API

### 4. E2E 测试架构（Playwright 多 project 模式）

**Playwright 配置改造**：

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    console: 'preserve',
  },
  projects: [
    {
      name: 'examples-chromium',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5173' },
    },
    {
      name: 'docs-chromium',
      testDir: './tests/e2e-docs',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5174' },
    },
  ],
  webServer: [
    {
      command: 'pnpm --filter weui-design-vue-example dev:h5',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      stdout: 'ignore',
      stderr: 'pipe',
    },
    {
      command: 'pnpm --filter docs dev',
      url: 'http://localhost:5174',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      stdout: 'ignore',
      stderr: 'pipe',
    },
  ],
})
```

**docs dev 端口固定**：修改 `docs/package.json` 的 dev 脚本为 `vitepress dev --port 5174`，避免端口冲突。

**E2E 测试文件组织**：

```
tests/
├── e2e/                    # 现有 examples 测试（251 个）
│   ├── helpers.ts
│   ├── button.spec.ts
│   └── ...
└── e2e-docs/               # 新增 docs 测试
    ├── helpers.ts          # docs 专用 helper
    └── *.spec.ts           # 每组件一个文件
```

**docs E2E 测试覆盖标准**（每组件）：
1. 页面正常加载，无 console 错误，无 JS 错误
2. 所有 `<div class="demo-block">` 渲染成功（无空 demo）
3. 关键交互验证（按组件类型）：
   - 弹层组件：点击触发按钮 → 弹层出现 → 关闭
   - 表单组件：输入 → 验证值变化
   - 切换组件：点击 → 验证状态变化
   - 静态展示组件：验证关键 class 和文本
4. 每个命令式 API 至少 1 个交互验证

**docs helpers.ts 提供**：
- `gotoDocsPage(path)` — 访问 `/components/xxx`，等待 H1 渲染
- `consoleErrors` / `pageErrors` 收集器
- `expectNoErrors` 断言

### 5. VitePress 配置增强

在 [docs/.vitepress/config.mts](../../../docs/.vitepress/config.mts) 中添加 `vite` 字段，配置 `optimizeDeps.exclude` 排除 workspace 包，避免命令式 API 在 docs 站失效（与 examples 站的 [optimizeDeps 修复](../../../examples/uni-app/vite.config.ts) 同理）：

```typescript
const config: UserConfig = {
  // ... 现有配置
  vite: {
    optimizeDeps: {
      exclude: ['weui-design-vue'],
    },
  },
}
```

## 实施顺序

按依赖关系分 4 个阶段，每阶段完成后跑 `pnpm e2e --project=docs-chromium` 验证当前批次：

### 阶段 1 — 基础设施（1 次提交）
1. 清理 custom.css 中的 weui 样式干预
2. docs/.vitepress/config.mts 添加 vite.optimizeDeps 配置
3. docs/package.json dev 脚本固定端口 5174
4. 改造 playwright.config.ts（多 project + 双 webServer）
5. 创建 tests/e2e-docs/helpers.ts
6. 验证现有 251 个 examples E2E 不受影响（`pnpm e2e --project=examples-chromium`）

### 阶段 2 — 交互型组件文档（优先，风险最高）
覆盖：actionsheet, dialog, half-screen-dialog, picker, toast, toptips, gallery, slideview（8 个）

这 8 个现有 demo-block 是坏的（actionsheet/dialog/half-screen-dialog/picker/toast/toptips）或交互复杂（gallery/slideview），优先修复。每个文档完成后立即写对应 E2E。

### 阶段 3 — 表单 + 交互组件文档
覆盖：button, input, checkbox, searchbar, uploader, navbar, tabbar, steps, progress, loadmore（10 个）

这些组件交互复杂，demo 较多。

### 阶段 4 — 静态展示组件文档
覆盖：badge, icon, loading, article, flex, footer, grid, panel, list, form, form-page, preview, msg, cell（14 个）

主要是展示，demo 简单。

**每阶段结束**：运行 `pnpm e2e`（全量）+ `pnpm -r typecheck` + `pnpm vitest run`，符合 [auto-verify.md](../../../.trae/rules/auto-verify.md) 要求。

## 风险与规避

| 风险 | 规避措施 |
|------|----------|
| VitePress `<script setup>` 中 import weui-design-vue 类型失败 | 类型导入放 `<script setup>` 顶部，与 examples 一致；运行时组件靠 VitePress enhanceApp 全局注册 |
| 弹层命令式 API 在 docs 站失效（optimizeDeps 问题） | docs/.vitepress/config.mts 配置 `vite.optimizeDeps.exclude: ['weui-design-vue']`，与 examples 站同理 |
| docs E2E 数量过多导致运行慢 | `fullyParallel: false` + `workers: 1` 已避免资源竞争；docs 测试复用 page 上下文 |
| WeUI 组件在桌面浏览器布局异常（如 cell 高度） | docs demo-block 加足够 padding，必要时用 flex 容器约束宽度模拟移动端 |
| 现有 7 个文档的 demo-block 重写后行为变化 | 阶段 2 优先重写这 7 个，E2E 立即验证；button 的 9 个 demo-block 需特别验证（其原本可正常渲染） |

## 验收标准

1. 32 个组件文档每个都有至少 1 个可交互 demo-block
2. 每个 Attribute/Event/Slot 在文档中都有对应 demo
3. `pnpm e2e` 全量通过（examples 251 + docs 新增）
4. `pnpm -r typecheck` 无错误
5. `pnpm vitest run` 无错误
6. custom.css 中无 `.vp-doc .weui-*` 选择器
