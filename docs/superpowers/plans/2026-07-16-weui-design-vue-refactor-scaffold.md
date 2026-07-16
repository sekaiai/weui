# WeUI Design Vue 重构 - 阶段 1：脚手架实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 搭建 weui-design-vue 的 pnpm monorepo 脚手架，包含组件库基线、样式适配层、主题变量、easycom/install 注册机制、弹层全局容器与 z-index 栈，以及 VitePress 文档站与 uni-app 示例工程的空壳，为后续 33 个组件实现奠定基础。

**架构：** pnpm monorepo 三 workspace（packages/components、examples/uni-app、docs）。组件库源码发布，easycom 直接指向 `.vue` 源码。样式依赖 weui npm + 自写 weui-adapter.scss 适配层，全 px，CSS 变量主题 + 暗色模式。弹层通过全局容器 `<weui-overlay-host />` 渲染，z-index 统一栈管理。

**技术栈：** pnpm workspace、Vue 3.4+、TypeScript 5+、uni-app（HBuilderX CLI 或 vite 模板）、VitePress 1.x、vitest、weui 2.4+、SCSS

**规格依据：** [docs/superpowers/specs/2026-07-16-weui-design-vue-refactor-design.md](file:///Users/xueyang/Documents/GitHub/weui-design-vue/docs/superpowers/specs/2026-07-16-weui-design-vue-refactor-design.md)

---

## 范围说明

本计划仅覆盖**阶段 1：脚手架**。规格第 11 节的实施顺序中，本计划对应"脚手架阶段"。后续"组件实现阶段"（33 个组件按官方顺序逐个实现）将在本计划完成后，按官方文档顺序分组单独编写计划，避免单个计划过大无法在一次执行中完成。

本计划产出：可运行的空壳工程，包含一个示例组件 `weui-button`（最简实现，用于验证 easycom/install/样式/文档/示例全链路打通），但不实现 button 的完整 API。完整 button 实现留给阶段 2。

---

## 文件结构

以下文件将在本计划中创建/修改。每个文件职责单一。

### 根目录（重新初始化）

| 文件 | 职责 |
|---|---|
| `package.json` | 根包，仅放工程脚本与 devDeps（pnpm、typescript、vitest） |
| `pnpm-workspace.yaml` | workspace 配置，声明 packages/*、examples/*、docs |
| `tsconfig.base.json` | 根 TS 配置，子包继承 |
| `.gitignore` | 忽略 node_modules、dist、unpackage、.vitepress/cache 等 |
| `.npmrc` | pnpm 配置（shamefully-hoist 等，uni-app 依赖兼容） |
| `README.md` | 项目简介 |

### packages/components（组件库）

| 文件 | 职责 |
|---|---|
| `packages/components/package.json` | 组件库包元数据，name=weui-design-vue，源码发布 |
| `packages/components/tsconfig.json` | 继承根配置 |
| `packages/components/src/index.ts` | install 插件 + 命名导出总入口 |
| `packages/components/src/button/button.vue` | 示例组件（最简，验证链路） |
| `packages/components/src/button/index.ts` | button 命名导出 |
| `packages/components/src/styles/theme.scss` | CSS 变量主题 + 暗色模式 |
| `packages/components/src/styles/weui-adapter.scss` | weui 标签选择器到 uni-app 标签的重映射 |
| `packages/components/src/utils/overlay.ts` | 弹层 z-index 全局栈 + 命令式挂载管理 |
| `packages/components/src/utils/queue.ts` | toast 队列工具 |
| `packages/components/src/overlay-host/overlay-host.vue` | 全局弹层容器组件 |
| `packages/components/types/index.d.ts` | 类型声明入口 |

### examples/uni-app（uni-app 示例工程）

| 文件 | 职责 |
|---|---|
| `examples/uni-app/package.json` | 示例工程包，依赖 weui-design-vue via workspace:* |
| `examples/uni-app/pages.json` | 页面路由 + easycom 配置 |
| `examples/uni-app/manifest.json` | uni-app 应用配置（appid、微信小程序/H5） |
| `examples/uni-app/App.vue` | 根组件，引入 weui.css + weui-adapter.scss + 挂载 overlay-host |
| `examples/uni-app/main.ts` | uni-app 入口 |
| `examples/uni-app/pages/index/index.vue` | 首页，验证 weui-button 渲染 |

### docs（VitePress 文档站，全新）

| 文件 | 职责 |
|---|---|
| `docs/package.json` | 文档站包，依赖 weui-design-vue via workspace:* |
| `docs/.vitepress/config.mts` | VitePress 配置（导航、侧边栏） |
| `docs/.vitepress/theme/index.ts` | 自定义主题，引入 weui.css + weui-adapter.scss + install |
| `docs/.vitepress/theme/custom.css` | 文档站私有样式 |
| `docs/index.md` | 首页 |
| `docs/guide/introduce.md` | 介绍页 |
| `docs/guide/getting-started.md` | 快速上手 |
| `docs/guide/customize-theme.md` | 定制主题 |
| `docs/components/button.md` | button 文档页（含 H5 实时预览） |

### 测试

| 文件 | 职责 |
|---|---|
| `packages/components/src/utils/__tests__/overlay.test.ts` | overlay z-index 栈单测 |
| `packages/components/src/utils/__tests__/queue.test.ts` | toast 队列单测 |
| `packages/components/vitest.config.ts` | vitest 配置 |

---

## 任务 0：清理旧代码并重新初始化 git

**文件：**
- 删除：`packages/`（旧）、`docs/`（旧，但保留 `docs/superpowers/`）、`README.md`、`package.json`、`.gitignore`、`pnpm-workspace.yaml`（若存在）
- 保留：`.trae/`、`docs/superpowers/`

- [ ] **步骤 1：备份规格文档**

规格文档在 `docs/superpowers/specs/` 下，需要先临时移出再清理。

```bash
mkdir -p /tmp/weui-refactor-backup
cp -r docs/superpowers /tmp/weui-refactor-backup/
```

- [ ] **步骤 2：删除旧代码与 git history**

```bash
rm -rf .git
rm -rf packages docs README.md package.json .gitignore
```

- [ ] **步骤 3：恢复规格文档并重新初始化 git**

```bash
mkdir -p docs/superpowers
cp -r /tmp/weui-refactor-backup/superpowers/* docs/superpowers/
git init
```

- [ ] **步骤 4：创建初始 .gitignore**

创建 `.gitignore`：

```gitignore
node_modules/
dist/
unpackage/
.vitepress/cache/
.vitepress/dist/
*.log
.DS_Store
.idea/
.vscode/
```

- [ ] **步骤 5：创建初始 README.md**

创建 `README.md`：

```markdown
# WeUI Design Vue

基于 uni-app 的 WeUI 组件库，主目标微信小程序，兼 H5。视觉与 weui.io 完全一致。

## 状态

开发中（v0.1.0 alpha）。设计规格见 [docs/superpowers/specs/](./docs/superpowers/specs/)。
```

- [ ] **步骤 6：Commit**

```bash
git add .
git commit -m "chore: 重新初始化项目，保留重构设计规格

删除旧 packages/ 与 docs/，清理 git history。
仅保留 .trae/ 与 docs/superpowers/ 规格文档。
新版本从 v0.1.0 起步。"
```

---

## 任务 1：搭建 pnpm monorepo 根配置

**文件：**
- 创建：`package.json`、`pnpm-workspace.yaml`、`tsconfig.base.json`、`.npmrc`

- [ ] **步骤 1：创建根 package.json**

创建 `package.json`：

```json
{
  "name": "weui-design-vue-monorepo",
  "private": true,
  "version": "0.1.0",
  "description": "基于 uni-app 的 WeUI 组件库 monorepo",
  "scripts": {
    "dev:docs": "pnpm --filter docs dev",
    "build:docs": "pnpm --filter docs build",
    "dev:example:mp": "pnpm --filter weui-design-vue-example dev:mp-weixin",
    "dev:example:h5": "pnpm --filter weui-design-vue-example dev:h5",
    "test": "pnpm --filter weui-design-vue test",
    "typecheck": "pnpm -r typecheck"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vitest": "^1.6.0",
    "vue-tsc": "^2.0.0"
  },
  "engines": {
    "node": ">=18",
    "pnpm": ">=8"
  }
}
```

- [ ] **步骤 2：创建 pnpm-workspace.yaml**

创建 `pnpm-workspace.yaml`：

```yaml
packages:
  - 'packages/*'
  - 'examples/*'
  - 'docs'
```

- [ ] **步骤 3：创建 .npmrc**

uni-app 部分依赖需要 hoist 才能正确解析。

创建 `.npmrc`：

```ini
shamefully-hoist=true
strict-peer-dependencies=false
```

- [ ] **步骤 4：创建 tsconfig.base.json**

创建 `tsconfig.base.json`：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["vitest/globals"]
  }
}
```

- [ ] **步骤 5：安装根依赖并验证 workspace 解析**

```bash
pnpm install
```

预期：无报错，生成 `pnpm-lock.yaml`。

- [ ] **步骤 6：Commit**

```bash
git add package.json pnpm-workspace.yaml .npmrc tsconfig.base.json pnpm-lock.yaml
git commit -m "chore: 搭建 pnpm monorepo 根配置

- package.json: 根包脚本（docs/example/test/typecheck）
- pnpm-workspace.yaml: 声明 packages/*、examples/*、docs
- .npmrc: shamefully-hoist 兼容 uni-app 依赖
- tsconfig.base.json: 子包继承的 TS 基线配置"
```

---

## 任务 2：创建组件库包骨架与 button 示例组件

**文件：**
- 创建：`packages/components/package.json`、`packages/components/tsconfig.json`、`packages/components/src/index.ts`、`packages/components/src/button/button.vue`、`packages/components/src/button/index.ts`、`packages/components/types/index.d.ts`

- [ ] **步骤 1：创建 packages/components/package.json**

创建 `packages/components/package.json`：

```json
{
  "name": "weui-design-vue",
  "version": "0.1.0",
  "description": "基于 uni-app 的 WeUI 组件库",
  "main": "src/index.ts",
  "module": "src/index.ts",
  "types": "types/index.d.ts",
  "files": [
    "src",
    "types"
  ],
  "scripts": {
    "test": "vitest run",
    "typecheck": "vue-tsc --noEmit -p tsconfig.json"
  },
  "peerDependencies": {
    "vue": "^3.4.0"
  },
  "dependencies": {
    "weui": "^2.4.3"
  },
  "devDependencies": {
    "vue": "^3.4.0",
    "vue-tsc": "^2.0.0",
    "vitest": "^1.6.0",
    "@vue/test-utils": "^2.4.0"
  }
}
```

- [ ] **步骤 2：创建 packages/components/tsconfig.json**

创建 `packages/components/tsconfig.json`：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.vue", "types/**/*.d.ts"]
}
```

- [ ] **步骤 3：创建 button 示例组件（最简，仅验证链路）**

创建 `packages/components/src/button/button.vue`：

```vue
<template>
  <button
    :class="['weui-btn', typeClass]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'WeuiButton',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiButtonProps {
  /** 按钮类型，对齐 weui 官方 */
  type?: 'primary' | 'default' | 'warn'
  /** 是否禁用 */
  disabled?: boolean
}

export interface WeuiButtonEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiButtonProps>(), {
  type: 'primary',
  disabled: false,
})

const emit = defineEmits<WeuiButtonEmits>()

const typeClass = computed(() => `weui-btn_${props.type}`)

const handleClick = (event: Event) => {
  if (props.disabled) return
  emit('click', event)
}
</script>
```

> 说明：`options.styleIsolation` 与 `addGlobalClass` 是 uni-app 小程序组件选项，确保 weui 全局样式可穿透组件。H5 端会被忽略。button 标签在小程序与 H5 均原生支持。

- [ ] **步骤 4：创建 button 命名导出**

创建 `packages/components/src/button/index.ts`：

```typescript
import WeuiButton from './button.vue'

WeuiButton.install = (vue: any) => {
  vue.component(WeuiButton.name!, WeuiButton)
}

export { WeuiButton }
export type { WeuiButtonProps, WeuiButtonEmits } from './button.vue'
```

> 注意：Vue SFC 中 `<script lang="ts">` 导出的 interface 在 `.vue` 文件外通过 `from './button.vue'` 引用时，vue-tsc 能正确解析。若运行时解析失败，回退到在 `index.ts` 中重新声明。

- [ ] **步骤 5：创建组件库总入口 index.ts**

创建 `packages/components/src/index.ts`：

```typescript
import type { App } from 'vue'
import { WeuiButton } from './button'

const components = [WeuiButton]

const install = (vue: App): void => {
  components.forEach((component) => {
    if (component.install) {
      vue.use(component as any)
    }
  })
}

export default { install }

export { WeuiButton }
export type { WeuiButtonProps, WeuiButtonEmits }
```

- [ ] **步骤 6：创建类型声明入口**

创建 `packages/components/types/index.d.ts`：

```typescript
export * from '../src/button'
```

- [ ] **步骤 7：安装组件库依赖并验证类型**

```bash
pnpm install
pnpm --filter weui-design-vue typecheck
```

预期：vue-tsc 无报错。

- [ ] **步骤 8：Commit**

```bash
git add packages/components
git commit -m "feat(components): 创建组件库包骨架与 button 示例组件

- package.json: 源码发布，main 指向 src/index.ts
- button.vue: 最简实现，验证 easycom/install/样式链路
  含 styleIsolation/addGlobalClass 选项确保 weui 全局样式穿透
- index.ts: install 插件 + 命名导出
- types/index.d.ts: 类型声明入口"
```

---

## 任务 3：实现样式适配层与主题变量

**文件：**
- 创建：`packages/components/src/styles/theme.scss`、`packages/components/src/styles/weui-adapter.scss`

- [ ] **步骤 1：创建主题变量 theme.scss**

创建 `packages/components/src/styles/theme.scss`：

```scss
// WeUI 主题变量，对齐 weui 2.4 的 CSS 变量命名
// 业务可通过覆盖这些变量定制主题

:root {
  // 背景色
  --weui-BG: #ffffff;
  --weui-BG-0: #ededed;
  --weui-BG-1: #f7f7f7;
  --weui-BG-2: #ffffff;

  // 前景色（文字）
  --weui-FG: #000000;
  --weui-FG-0: rgba(0, 0, 0, 0.9);
  --weui-FG-1: rgba(0, 0, 0, 0.5);
  --weui-FG-2: rgba(0, 0, 0, 0.3);

  // 主题色
  --weui-BRAND: #07c160;
  --weui-RED: #fa5151;
  --weui-ORANGE: #fa9d3b;
  --weui-YELLOW: #ffc300;
  --weui-GREEN: #07c160;
  --weui-BLUE: #10aeff;

  // 链接
  --weui-LINK: #576b95;

  // 文本辅助
  --weui-TEXT: rgba(0, 0, 0, 0.9);
  --weui-TEXT-REVERSE: rgba(255, 255, 255, 0.9);

  // 边框
  --weui-BORDER: rgba(0, 0, 0, 0.1);

  // 间距基线
  --weui-spacing-base: 8px;

  // 字号
  --weui-font-title: 20px;
  --weui-font-body: 17px;
  --weui-font-caption: 14px;
  --weui-font-small: 12px;
}

// 暗色模式，对齐 weui 暗色方案
@media (prefers-color-scheme: dark) {
  :root {
    --weui-BG: #111111;
    --weui-BG-0: #1a1a1a;
    --weui-BG-1: #1f1f1f;
    --weui-BG-2: #262626;

    --weui-FG: #ffffff;
    --weui-FG-0: rgba(255, 255, 255, 0.85);
    --weui-FG-1: rgba(255, 255, 255, 0.55);
    --weui-FG-2: rgba(255, 255, 255, 0.35);

    --weui-TEXT: rgba(255, 255, 255, 0.85);
    --weui-TEXT-REVERSE: rgba(0, 0, 0, 0.85);

    --weui-BORDER: rgba(255, 255, 255, 0.15);
  }
}
```

- [ ] **步骤 2：创建 weui-adapter.scss 适配层**

weui 原始样式含标签选择器（`a`、`input`、`img` 等）与 DOM 假设，需重映射到 uni-app 标签。本适配层不复制 weui 全部样式，而是补充 uni-app 标签对应的 class 规则，确保组件内使用 `<view>`/`<text>`/`<image>` 时仍能命中 weui 视觉。

创建 `packages/components/src/styles/weui-adapter.scss`：

```scss
// weui-adapter.scss
// 将 weui 原始标签选择器的视觉规则，映射到 uni-app 标签
// 本文件由使用方在 App.vue 全局引入（与 weui.css 一起）

// uni-app 的 view 对应 div，补齐 weui 中 div 的盒模型默认值
view {
  box-sizing: border-box;
}

// uni-app 的 text 对应 span/a/i，继承 weui 中行内元素的默认值
text {
  box-sizing: border-box;
}

// uni-app 的 image 对应 img，补齐 weui 中 img 的默认值
image {
  box-sizing: border-box;
  vertical-align: middle;
}

// uni-app 的 button 已有默认样式，需重置以承接 weui-btn
// 注意：小程序 button 有默认 border 与 padding，需重置
button {
  &::after {
    border: none;
  }
}

// weui 中 a 标签的样式映射到 view.weui-link
// 业务侧用 <view class="weui-link"> 替代 <a>
```

> 说明：本适配层刻意保持最小化。weui.css 中的 class 选择器（如 `.weui-btn`、`.weui-cell`）在 uni-app 中可直接生效，无需适配；仅标签选择器需补充。随着组件实现推进，若发现具体标签映射缺失，在本文件增量补充。

- [ ] **步骤 3：Commit**

```bash
git add packages/components/src/styles
git commit -m "feat(components): 实现样式适配层与主题变量

- theme.scss: 暴露 weui CSS 变量作为主题令牌
  含背景/前景/主题色/链接/文本/边框/间距/字号
  暗色模式通过 prefers-color-scheme: dark 覆盖
- weui-adapter.scss: weui 标签选择器到 uni-app 标签的重映射
  view/text/image/button 的盒模型与默认值补充
  刻意最小化，仅处理标签选择器，class 选择器无需适配"
```

---

## 任务 4：实现弹层 overlay z-index 栈工具

**文件：**
- 创建：`packages/components/src/utils/overlay.ts`、`packages/components/src/utils/__tests__/overlay.test.ts`、`packages/components/vitest.config.ts`

- [ ] **步骤 1：创建 vitest 配置**

创建 `packages/components/vitest.config.ts`：

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/__tests__/**/*.test.ts'],
  },
})
```

- [ ] **步骤 2：编写 overlay 失败测试**

创建 `packages/components/src/utils/__tests__/overlay.test.ts`：

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { overlayManager } from '../overlay'

describe('overlayManager', () => {
  beforeEach(() => {
    overlayManager.reset()
  })

  it('每次 push 应返回递增的 z-index，起始 1000', () => {
    expect(overlayManager.push()).toBe(1000)
    expect(overlayManager.push()).toBe(1001)
    expect(overlayManager.push()).toBe(1002)
  })

  it('pop 应移除栈顶并返回剩余栈顶的 z-index', () => {
    const a = overlayManager.push()
    const b = overlayManager.push()
    expect(overlayManager.pop()).toBe(a)
    expect(overlayManager.pop()).toBe(undefined)
  })

  it('空栈 pop 返回 undefined', () => {
    expect(overlayManager.pop()).toBe(undefined)
  })

  it('reset 清空栈', () => {
    overlayManager.push()
    overlayManager.push()
    overlayManager.reset()
    expect(overlayManager.push()).toBe(1000)
  })

  it('size 返回当前栈大小', () => {
    expect(overlayManager.size()).toBe(0)
    overlayManager.push()
    overlayManager.push()
    expect(overlayManager.size()).toBe(2)
  })
})
```

- [ ] **步骤 3：运行测试验证失败**

```bash
pnpm --filter weui-design-vue test
```

预期：FAIL，报错 `Cannot find module '../overlay'`。

- [ ] **步骤 4：实现 overlay.ts**

创建 `packages/components/src/utils/overlay.ts`：

```typescript
// 弹层 z-index 全局栈
// 声明式与命令式弹层共享同一栈，避免遮挡错乱
// z-index 起始 1000，每次 push 递增

const BASE_Z_INDEX = 1000

class OverlayManager {
  private stack: number[] = []

  /** 压入栈，返回分配的 z-index */
  push(): number {
    const next = this.stack.length === 0
      ? BASE_Z_INDEX
      : this.stack[this.stack.length - 1] + 1
    this.stack.push(next)
    return next
  }

  /** 弹出栈顶，返回新的栈顶 z-index（若栈空返回 undefined） */
  pop(): number | undefined {
    this.stack.pop()
    return this.stack.length === 0
      ? undefined
      : this.stack[this.stack.length - 1]
  }

  /** 当前栈大小 */
  size(): number {
    return this.stack.length
  }

  /** 重置栈（测试用） */
  reset(): void {
    this.stack = []
  }
}

export const overlayManager = new OverlayManager()
```

- [ ] **步骤 5：运行测试验证通过**

```bash
pnpm --filter weui-design-vue test
```

预期：PASS，5 个测试用例全部通过。

- [ ] **步骤 6：Commit**

```bash
git add packages/components/vitest.config.ts packages/components/src/utils
git commit -m "feat(components): 实现弹层 overlay z-index 栈工具

- overlayManager: push/pop/size/reset
  z-index 起始 1000，每次 push 递增
  声明式与命令式弹层共享同一栈
- vitest 配置: node 环境，glob src/**/__tests__/**/*.test.ts
- 5 个单测用例覆盖全部 API"
```

---

## 任务 5：实现 toast 队列工具

**文件：**
- 创建：`packages/components/src/utils/queue.ts`、`packages/components/src/utils/__tests__/queue.test.ts`

- [ ] **步骤 1：编写 queue 失败测试**

创建 `packages/components/src/utils/__tests__/queue.test.ts`：

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ToastQueue, type ToastTask } from '../queue'

describe('ToastQueue', () => {
  let queue: ToastQueue<string>
  let executed: string[]

  beforeEach(() => {
    executed = []
    queue = new ToastQueue<string>((task) => {
      executed.push(task)
    })
  })

  it('enqueue 后立即执行第一个任务', () => {
    queue.enqueue('a')
    expect(executed).toEqual(['a'])
  })

  it('任务在栈上排队，done 后才执行下一个', () => {
    queue.enqueue('a')
    queue.enqueue('b')
    expect(executed).toEqual(['a'])
    queue.done()
    expect(executed).toEqual(['a', 'b'])
  })

  it('所有任务 done 后队列清空', () => {
    queue.enqueue('a')
    queue.enqueue('b')
    queue.done()
    queue.done()
    expect(queue.size()).toBe(0)
  })

  it('空队列 done 无副作用', () => {
    expect(() => queue.done()).not.toThrow()
    expect(queue.size()).toBe(0)
  })

  it('size 返回当前队列长度', () => {
    expect(queue.size()).toBe(0)
    queue.enqueue('a')
    expect(queue.size()).toBe(1)
    queue.enqueue('b')
    expect(queue.size()).toBe(2)
    queue.done()
    expect(queue.size()).toBe(1)
  })
})
```

- [ ] **步骤 2：运行测试验证失败**

```bash
pnpm --filter weui-design-vue test
```

预期：FAIL，报错 `Cannot find module '../queue'`。

- [ ] **步骤 3：实现 queue.ts**

创建 `packages/components/src/utils/queue.ts`：

```typescript
// Toast 队列：多次调用自动排队，避免叠加
// 泛型 T 为任务负载（如 toast 的配置对象）

export type ToastTask<T> = T

export class ToastQueue<T> {
  private tasks: ToastTask<T>[] = []
  private executor: (task: ToastTask<T>) => void

  constructor(executor: (task: ToastTask<T>) => void) {
    this.executor = executor
  }

  /** 入队。若队列为空，立即执行；否则排队等待 */
  enqueue(task: ToastTask<T>): void {
    this.tasks.push(task)
    if (this.tasks.length === 1) {
      this.executor(task)
    }
  }

  /** 标记当前任务完成，执行下一个 */
  done(): void {
    this.tasks.shift()
    if (this.tasks.length > 0) {
      this.executor(this.tasks[0])
    }
  }

  /** 当前队列长度 */
  size(): number {
    return this.tasks.length
  }
}
```

- [ ] **步骤 4：运行测试验证通过**

```bash
pnpm --filter weui-design-vue test
```

预期：PASS，10 个测试用例（overlay 5 + queue 5）全部通过。

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/utils/queue.ts packages/components/src/utils/__tests__/queue.test.ts
git commit -m "feat(components): 实现 toast 队列工具

- ToastQueue<T>: enqueue/done/size
  入队后若队列空则立即执行，否则排队
  done 移除当前任务并执行下一个
  泛型 T 适配不同任务负载
- 5 个单测用例覆盖排队、清空、空队列边界"
```

---

## 任务 6：实现 overlay-host 全局弹层容器组件

**文件：**
- 创建：`packages/components/src/overlay-host/overlay-host.vue`、`packages/components/src/overlay-host/index.ts`
- 修改：`packages/components/src/index.ts`（导出 overlay-host）

- [ ] **步骤 1：创建 overlay-host 组件**

此组件作为命令式弹层的挂载点。声明式弹层（`<weui-dialog>` 等）各自渲染在自己的位置，但通过 `overlayManager` 共享 z-index。命令式弹层通过 `overlayHostApi` 渲染到此容器。

创建 `packages/components/src/overlay-host/overlay-host.vue`：

```vue
<template>
  <view class="weui-overlay-host">
    <!-- 命令式弹层在此渲染 -->
    <component
      :is="item.component"
      v-for="item in items"
      :key="item.id"
      v-bind="item.props"
      @weui-close="handleClose(item.id)"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: 'WeuiOverlayHost',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, shallowRef, onUnmounted } from 'vue'
import { overlayManager } from '../utils/overlay'

interface OverlayItem {
  id: number
  component: any
  props: Record<string, any>
}

const items = shallowRef<OverlayItem[]>([])
const nextId = ref(1)

/** 添加命令式弹层，返回 id 与 z-index */
const add = (component: any, props: Record<string, any> = {}): { id: number; zIndex: number } => {
  const id = nextId.value++
  const zIndex = overlayManager.push()
  const item: OverlayItem = { id, component, props: { ...props, zIndex } }
  items.value = [...items.value, item]
  return { id, zIndex }
}

/** 移除命令式弹层 */
const remove = (id: number): void => {
  const item = items.value.find((i) => i.id === id)
  if (item) {
    overlayManager.pop()
    items.value = items.value.filter((i) => i.id !== id)
  }
}

const handleClose = (id: number): void => {
  remove(id)
}

onUnmounted(() => {
  overlayManager.reset()
})

// 暴露 API 给命令式调用方
defineExpose({ add, remove })
</script>
```

- [ ] **步骤 2：创建 overlay-host 导出**

创建 `packages/components/src/overlay-host/index.ts`：

```typescript
import WeuiOverlayHost from './overlay-host.vue'

WeuiOverlayHost.install = (vue: any) => {
  vue.component(WeuiOverlayHost.name!, WeuiOverlayHost)
}

export { WeuiOverlayHost }
```

- [ ] **步骤 3：在 index.ts 导出 overlay-host**

修改 `packages/components/src/index.ts`，在 `import { WeuiButton } from './button'` 后添加 overlay-host 导入，并在 components 数组与 export 中补充：

```typescript
import type { App } from 'vue'
import { WeuiButton } from './button'
import { WeuiOverlayHost } from './overlay-host'

const components = [WeuiButton, WeuiOverlayHost]

const install = (vue: App): void => {
  components.forEach((component) => {
    if (component.install) {
      vue.use(component as any)
    }
  })
}

export default { install }

export { WeuiButton, WeuiOverlayHost }
export type { WeuiButtonProps, WeuiButtonEmits }
```

- [ ] **步骤 4：类型检查**

```bash
pnpm --filter weui-design-vue typecheck
```

预期：无报错。

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/overlay-host packages/components/src/index.ts
git commit -m "feat(components): 实现 overlay-host 全局弹层容器

- overlay-host.vue: 命令式弹层的挂载点
  add(component, props) 添加弹层，返回 id 与 z-index
  remove(id) 移除弹层
  通过 overlayManager 共享 z-index 栈
  @weui-close 事件触发移除
- index.ts: 导出 WeuiOverlayHost
- 声明式弹层各自渲染，命令式弹层统一渲染到 overlay-host"
```

---

## 任务 7：搭建 uni-app 示例工程

**文件：**
- 创建：`examples/uni-app/package.json`、`examples/uni-app/manifest.json`、`examples/uni-app/pages.json`、`examples/uni-app/App.vue`、`examples/uni-app/main.ts`、`examples/uni-app/pages/index/index.vue`

- [ ] **步骤 1：创建 examples/uni-app/package.json**

创建 `examples/uni-app/package.json`：

```json
{
  "name": "weui-design-vue-example",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev:mp-weixin": "uni -p mp-weixin",
    "dev:h5": "uni",
    "build:mp-weixin": "uni build -p mp-weixin",
    "build:h5": "uni build"
  },
  "dependencies": {
    "weui-design-vue": "workspace:*",
    "weui": "^2.4.3",
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@dcloudio/uni-mp-weixin": "3.0.0-4030620241128001",
    "@dcloudio/uni-h5": "3.0.0-4030620241128001",
    "@dcloudio/uni-components": "3.0.0-4030620241128001",
    "@dcloudio/vite-plugin-uni": "3.0.0-4030620241128001",
    "@dcloudio/types": "^3.4.8",
    "vite": "^5.2.0"
  }
}
```

> 注意：`@dcloudio/*` 版本号需对齐 uni-app 官方当前发布版本。若 `pnpm install` 报版本不存在，执行 `pnpm view @dcloudio/vite-plugin-uni versions --json` 查询最新版本并替换。

- [ ] **步骤 2：创建 manifest.json**

创建 `examples/uni-app/manifest.json`：

```json
{
  "name": "weui-design-vue-example",
  "appid": "",
  "description": "WeUI Design Vue 示例工程",
  "versionName": "0.1.0",
  "versionCode": "100",
  "vueVersion": "3",
  "mp-weixin": {
    "appid": "",
    "setting": {
      "urlCheck": false,
      "es6": true,
      "postcss": true,
      "minified": true
    },
    "usingComponents": true
  },
  "h5": {
    "router": {
      "mode": "hash"
    }
  }
}
```

- [ ] **步骤 3：创建 pages.json（含 easycom 配置）**

创建 `examples/uni-app/pages.json`：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^weui-(.*)": "weui-design-vue/src/$1/$1.vue"
    }
  },
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "WeUI Design Vue"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "WeUI Design Vue",
    "navigationBarBackgroundColor": "#f7f7f7",
    "backgroundColor": "#f7f7f7"
  }
}
```

- [ ] **步骤 4：创建 main.ts**

创建 `examples/uni-app/main.ts`：

```typescript
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
```

- [ ] **步骤 5：创建 App.vue（引入 weui 样式 + 挂载 overlay-host）**

创建 `examples/uni-app/App.vue`：

```vue
<template>
  <view>
    <weui-overlay-host />
    <pages />
  </view>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>

<script setup lang="ts">
import WeuiOverlayHost from 'weui-design-vue/src/overlay-host/overlay-host.vue'
</script>

<style>
/* 全局引入 weui 基础样式 */
@import 'weui/dist/style/weui.css';
/* 全局引入 weui 适配层 */
@import 'weui-design-vue/src/styles/weui-adapter.scss';
/* 全局引入主题变量 */
@import 'weui-design-vue/src/styles/theme.scss';
</style>
```

> 说明：`<pages />` 是 uni-app 的页面占位组件。`weui-overlay-host` 通过 easycom 自动引入，但此处为明确依赖，显式 import。样式三段式引入对应规格第 5.1 节。

- [ ] **步骤 6：创建首页 index.vue（验证 button 渲染）**

创建 `examples/uni-app/pages/index/index.vue`：

```vue
<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">WeUI Design Vue</text>
      <text class="page__desc">脚手架验证页</text>
    </view>
    <view class="page__bd">
      <weui-button type="primary" @click="onPrimary">页面主操作</weui-button>
      <weui-button type="default">页面次要操作</weui-button>
      <weui-button type="warn">警告类操作</weui-button>
      <weui-button :disabled="true">禁用按钮</weui-button>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'PageIndex',
}
</script>

<script setup lang="ts">
const onPrimary = (e: Event) => {
  console.log('primary click', e)
}
</script>

<style scoped>
.page {
  padding: 16px;
}
.page__hd {
  margin-bottom: 24px;
}
.page__title {
  display: block;
  font-size: 20px;
  font-weight: bold;
}
.page__desc {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #888;
}
.page__bd button {
  margin-bottom: 12px;
}
</style>
```

- [ ] **步骤 7：安装示例工程依赖**

```bash
pnpm install
```

预期：workspace 依赖 `weui-design-vue` 正确链接到 `packages/components`。

- [ ] **步骤 8：创建 vite.config.ts（uni-app 必需）**

创建 `examples/uni-app/vite.config.ts`：

```typescript
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
})
```

- [ ] **步骤 9：Commit**

```bash
git add examples/uni-app
git commit -m "feat(example): 搭建 uni-app 示例工程

- package.json: 依赖 weui-design-vue via workspace:*
  含 @dcloudio/* uni-app 微信小程序与 H5 运行时
- manifest.json: 微信小程序与 H5 配置
- pages.json: easycom 配置 ^weui-(.*) -> weui-design-vue/src/$1/$1.vue
  首页路由 pages/index/index
- App.vue: 全局引入 weui.css + weui-adapter.scss + theme.scss
  挂载 weui-overlay-host 全局弹层容器
- pages/index/index.vue: 验证 weui-button 渲染
- vite.config.ts: @dcloudio/vite-plugin-uni"
```

---

## 任务 8：搭建 VitePress 文档站

**文件：**
- 创建：`docs/package.json`、`docs/.vitepress/config.mts`、`docs/.vitepress/theme/index.ts`、`docs/.vitepress/theme/custom.css`、`docs/index.md`、`docs/guide/introduce.md`、`docs/guide/getting-started.md`、`docs/guide/customize-theme.md`、`docs/components/button.md`

- [ ] **步骤 1：创建 docs/package.json**

创建 `docs/package.json`：

```json
{
  "name": "docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "serve": "vitepress serve",
    "typecheck": "vue-tsc --noEmit"
  },
  "dependencies": {
    "weui-design-vue": "workspace:*",
    "weui": "^2.4.3",
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "vitepress": "^1.0.0",
    "vue-tsc": "^2.0.0"
  }
}
```

- [ ] **步骤 2：创建 VitePress 配置 config.mts**

创建 `docs/.vitepress/config.mts`：

```typescript
import type { UserConfig } from 'vitepress'

const nav = [
  { text: '指导', link: '/guide/introduce', activeMatch: 'guide' },
  { text: '组件', link: '/components/button', activeMatch: 'components' },
]

const sidebar = {
  '/guide/': [
    {
      text: '指导',
      collapsible: true,
      items: [
        { text: '介绍', link: '/guide/introduce' },
        { text: '快速上手', link: '/guide/getting-started' },
        { text: '定制主题', link: '/guide/customize-theme' },
      ],
    },
  ],
  '/components/': [
    {
      text: '基础组件',
      collapsible: true,
      items: [
        { text: 'Button 按钮', link: '/components/button' },
      ],
    },
  ],
}

const config: UserConfig = {
  title: 'WeUI Design Vue',
  description: '基于 uni-app 的 WeUI 组件库',
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    nav,
    sidebar,
    smoothScroll: true,
  },
}

export default config
```

- [ ] **步骤 3：创建主题入口 theme/index.ts（引入 weui 样式 + install 组件库）**

创建 `docs/.vitepress/theme/index.ts`：

```typescript
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import WeuiDesignVue from 'weui-design-vue/src/index'

// 全局引入 weui 基础样式
import 'weui/dist/style/weui.css'
// 全局引入 weui 适配层
import 'weui-design-vue/src/styles/weui-adapter.scss'
// 全局引入主题变量
import 'weui-design-vue/src/styles/theme.scss'
// 文档站私有样式
import './custom.css'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.use(WeuiDesignVue)
  },
}

export default theme
```

- [ ] **步骤 4：创建 custom.css**

创建 `docs/.vitepress/theme/custom.css`：

```css
/* 文档站私有样式 */
.vp-doc .weui-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}

/* demo 容器 */
.vp-doc .demo-block {
  padding: 16px;
  margin: 16px 0;
  border: 1px solid #eee;
  border-radius: 4px;
}
```

- [ ] **步骤 5：创建首页 index.md**

创建 `docs/index.md`：

```markdown
---
layout: home

hero:
  name: WeUI Design Vue
  text: 基于 uni-app 的 WeUI 组件库
  tagline: 主目标微信小程序，兼 H5，视觉与 weui.io 完全一致
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/getting-started
    - theme: alt
      text: 组件
      link: /components/button
---
```

- [ ] **步骤 6：创建 guide/introduce.md**

创建 `docs/guide/introduce.md`：

```markdown
# 介绍

WeUI Design Vue 是一套基于 uni-app 的 WeUI 组件库，主目标微信小程序，兼 H5。

## 特性

- 视觉与 [weui.io](https://weui.io/) 完全一致
- 基于 uni-app，一套代码同时运行在微信小程序与 H5
- 组件 API 对齐 [weui-miniprogram](https://wechat-miniprogram.github.io/weui/docs/) 官方
- Vue 3 + TypeScript，类型完整
- 支持 CSS 变量主题定制与暗色模式
- easycom 自动引入，开箱即用

## 版本

当前 v0.1.0 alpha，组件正在逐步实现中。
```

- [ ] **步骤 7：创建 guide/getting-started.md**

创建 `docs/guide/getting-started.md`：

```markdown
# 快速上手

## 安装

\`\`\`bash
pnpm add weui-design-vue
\`\`\`

## 在 uni-app 项目中使用

### 1. 配置 easycom

在 \`pages.json\` 中配置：

\`\`\`json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^weui-(.*)": "weui-design-vue/src/$1/$1.vue"
    }
  }
}
\`\`\`

### 2. 全局引入样式

在 \`App.vue\` 中：

\`\`\`vue
<style>
@import 'weui/dist/style/weui.css';
@import 'weui-design-vue/src/styles/weui-adapter.scss';
@import 'weui-design-vue/src/styles/theme.scss';
</style>
\`\`\`

### 3. 使用组件

\`\`\`vue
<template>
  <weui-button type="primary">页面主操作</weui-button>
</template>
\`\`\`

easycom 会自动引入组件，无需手动 import。
```

- [ ] **步骤 8：创建 guide/customize-theme.md**

创建 `docs/guide/customize-theme.md`：

```markdown
# 定制主题

WeUI Design Vue 通过 CSS 变量提供主题定制能力。

## 覆盖变量

在你的项目样式中覆盖 \`theme.scss\` 定义的变量：

\`\`\`css
:root {
  --weui-BRAND: #1989fa;
  --weui-RED: #ee0a24;
}
\`\`\`

## 暗色模式

暗色模式默认跟随系统，通过 \`@media (prefers-color-scheme: dark)\` 自动切换。

如需手动控制，覆盖暗色模式下的变量即可。

## 可用变量

完整变量列表见 [theme.scss](https://github.com/your-repo/weui-design-vue/blob/main/packages/components/src/styles/theme.scss)。
```

- [ ] **步骤 9：创建 components/button.md（含 H5 实时预览）**

创建 `docs/components/button.md`：

```markdown
# Button 按钮

## 基础用法

<div class="demo-block">
  <weui-button type="primary">页面主操作</weui-button>
  <weui-button type="default">页面次要操作</weui-button>
  <weui-button type="warn">警告类操作</weui-button>
</div>

::: details 查看代码
\`\`\`vue
<template>
  <weui-button type="primary">页面主操作</weui-button>
  <weui-button type="default">页面次要操作</weui-button>
  <weui-button type="warn">警告类操作</weui-button>
</template>
\`\`\`
:::

## 禁用状态

<div class="demo-block">
  <weui-button type="primary" :disabled="true">禁用</weui-button>
  <weui-button type="default" :disabled="true">禁用</weui-button>
</div>

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | string | primary / default / warn | primary |
| disabled | 是否禁用 | boolean | — | false |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击事件 | (event: Event) |
```

- [ ] **步骤 10：安装文档站依赖并验证启动**

```bash
pnpm install
pnpm dev:docs
```

预期：VitePress 启动，首页可访问，button 文档页能渲染 weui-button 组件（H5 模式）。

- [ ] **步骤 11：Commit**

```bash
git add docs
git commit -m "feat(docs): 搭建 VitePress 文档站

- config.mts: 导航（指导/组件）+ 侧边栏
- theme/index.ts: 引入 weui 样式 + install 组件库
- index.md: 首页 hero
- guide/: 介绍、快速上手、定制主题三页
- components/button.md: button 文档页含 H5 实时预览
  基础用法 + 禁用状态 + Attributes/Events 表"
```

---

## 任务 9：全链路验证

**目标：** 验证 easycom、install、样式、文档、单测全链路打通。

- [ ] **步骤 1：运行单测**

```bash
pnpm test
```

预期：overlay 5 + queue 5，共 10 个测试用例全部 PASS。

- [ ] **步骤 2：运行类型检查**

```bash
pnpm typecheck
```

预期：vue-tsc 全量类型检查无报错。

- [ ] **步骤 3：验证文档站**

```bash
pnpm dev:docs
```

在浏览器打开 VitePress，访问 `/components/button`，确认：
- weui-button 组件正确渲染（primary/default/warn 三种类型）
- weui 样式生效（按钮颜色、圆角、字号与 weui.io 一致）
- 禁用状态生效

- [ ] **步骤 4：验证 uni-app 示例工程 H5**

```bash
pnpm dev:example:h5
```

在浏览器打开，确认：
- 首页渲染 4 个 weui-button
- 样式与文档站一致
- 点击事件触发 console.log

- [ ] **步骤 5：验证 uni-app 示例工程微信小程序**

```bash
pnpm dev:example:mp
```

用微信开发者工具打开 `examples/uni-app/dist/dev/mp-weixin`，确认：
- 首页渲染 4 个 weui-button
- weui 样式穿透到组件（styleIsolation 生效）
- 点击事件触发

- [ ] **步骤 6：Commit 验证记录**

若验证中发现问题，修复后 commit。若全部通过，无需额外 commit。

---

## 任务 10：收尾与版本标记

- [ ] **步骤 1：更新 README.md**

更新 `README.md`，补充开发指南：

```markdown
# WeUI Design Vue

基于 uni-app 的 WeUI 组件库，主目标微信小程序，兼 H5。视觉与 [weui.io](https://weui.io/) 完全一致。

## 状态

v0.1.0 alpha，组件正在逐步实现中。设计规格见 [docs/superpowers/specs/](./docs/superpowers/specs/)。

## 开发

```bash
# 安装依赖
pnpm install

# 文档站
pnpm dev:docs

# 示例工程（微信小程序）
pnpm dev:example:mp

# 示例工程（H5）
pnpm dev:example:h5

# 单测
pnpm test

# 类型检查
pnpm typecheck
```

## 结构

- `packages/components/` - 组件库源码
- `examples/uni-app/` - uni-app 示例工程
- `docs/` - VitePress 文档站
```

- [ ] **步骤 2：打 v0.1.0-alpha.1 tag**

```bash
git add README.md
git commit -m "docs: 更新 README 补充开发指南"
git tag v0.1.0-alpha.1
```

- [ ] **步骤 3：验证 git log 干净**

```bash
git log --oneline
```

预期：从"重新初始化项目"开始，约 10 个 commit，每个对应一个任务。

---

## 自检

### 1. 规格覆盖度

规格第 11 节实施顺序中"脚手架阶段"包含：monorepo 脚手架、样式适配层、主题变量、install/easycom 基线、弹层全局容器与 z-index 栈。

- ✅ monorepo 脚手架 → 任务 1
- ✅ 样式适配层 → 任务 3
- ✅ 主题变量 → 任务 3
- ✅ install/easycom 基线 → 任务 2（install）+ 任务 7（easycom）
- ✅ 弹层全局容器与 z-index 栈 → 任务 4（栈）+ 任务 5（队列）+ 任务 6（容器）

规格其他章节：
- ✅ 第 1 节总体定位 → 任务 0（重新初始化）+ 任务 10（版本）
- ✅ 第 2 节仓库布局 → 任务 1-8
- ✅ 第 3 节组件清单 → 本计划仅实现 button 验证链路，完整清单留给阶段 2（已在范围说明中声明）
- ✅ 第 4 节 API 规范 → 任务 2（button 遵循命名基线 + styleIsolation）+ 任务 7（easycom 配置）
- ✅ 第 5 节样式 → 任务 3
- ✅ 第 6 节兼容性 → 任务 2（标签映射）+ 任务 7（uni-app 工程）+ 任务 8（H5 文档站）
- ✅ 第 7 节文档与示例 → 任务 7 + 任务 8
- ✅ 第 8 节构建发布 → 任务 2（源码发布 package.json）
- ✅ 第 9 节测试 → 任务 4-5（vitest 单测）+ 任务 9（示例工程回归）
- ✅ 第 10 节旧代码处理 → 任务 0

### 2. 占位符扫描

- 无"TODO/待定/后续实现"
- 所有代码步骤含完整代码块
- 无"类似任务 N"引用

### 3. 类型一致性

- `WeuiButtonProps` / `WeuiButtonEmits` 在 button.vue 定义，在 index.ts、components/index.ts、types/index.d.ts 一致导出
- `overlayManager` 的 `push()/pop()/size()/reset()` 在 overlay.ts 与 overlay-host.vue 调用一致
- `ToastQueue<T>` 的 `enqueue()/done()/size()` 在 queue.ts 定义与测试调用一致
- `WeuiOverlayHost` 在 overlay-host/index.ts 与 components/index.ts 导出命名一致

---

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/2026-07-16-weui-design-vue-refactor-scaffold.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
