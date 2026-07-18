# 构建时平台拆分：Vue 3 与 uni-app 双产物设计

## 背景与动机

weui-design-vue 是一个 WeUI Vue 3 组件库。前期实现采用了「组件源码用 uni-app 标签（view/text/image）+ Vue3Adapter 运行时映射为 HTML 标签」的方案，存在以下问题：

1. **运行时开销与全局副作用**：Vue3Adapter 使用 `transformVNodeArgs` 做全局 vnode 拦截，覆盖所有 Vue app，文档站单 app 场景虽可接受，但本质是反模式。
2. **映射不完整**：Vue3Adapter 只覆盖 view/text/image 三个标签，`<i>`、`<navigator>` 等未覆盖，icon.vue 的 `<i>` 标签在小程序中可能不识别。
3. **架构定位模糊**：组件库既不是「纯 Vue 3」也不是「uni-app 优先」，而是通过运行时映射勉强兼容两端，心智负担大。
4. **文档站与组件源码标签不一致**：组件源码用 view/text/image，文档 demo 也用 view/text/image，但运行时被映射为 div/span/img，调试时容易混淆。

经调研发现 uni-app 编译器原生支持 div/span/img 自动转换为 view/text/image，但用户期望更彻底的方案：**不走 uni-app 编译器自动转换，而是自打包两套产物**，使 Vue 3 用户拿到纯净的 Vue 3 组件库，uni-app 用户拿到标签已转换的 SFC 产物。

## 目标

1. 组件源码统一使用标准 HTML 标签（div/span/img 等），符合 Vue 3 生态习惯。
2. 通过构建时处理输出两套产物：
   - **Vue 3 产物**：预打包 ESM，通过 npm 安装，支持按需引入（tree-shaking）。
   - **uni-app 产物**：Vue SFC（标签已转换为 view/text/image），通过 easycom 引入。
3. 删除 Vue3Adapter 运行时映射方案。
4. 处理 3 处不通用点（uploader/cell/grid-item）的平台差异。
5. 文档站直接用源码（div/span/img），无需任何映射插件。

## 非目标

- 不支持原生小程序组件（.wxml/.wxss 四件套）。uni-app 产物仍是 Vue SFC，由 uni-app 编译器最终编译到小程序。
- 不维护两套源码。一套源码 + 构建时处理。
- 不做 nvue 适配。

## 整体架构

```
组件源码（div/span/img/input/button + 条件编译注释）
        │
        ├─ 打包为 Vue 3 产物 ──→ dist/vue3/
        │   - 标签不变（div/span/img）
        │   - 移除 #ifndef H5 条件编译块
        │   - 预打包为 ESM
        │   - 通过 npm 安装，支持按需引入
        │
        └─ 打包为 uni-app 产物 ─→ dist/uni-app/
            - 标签转换：div→view、span→text、img→image
            - 移除 #ifdef H5 条件编译块
            - 保留 SFC 形式（.vue 文件）
            - 通过 easycom 引入
```

### 关键设计决策

| 决策点 | 选择 | 理由 |
|--------|------|------|
| 源码标签 | div/span/img | 符合 Vue 3 生态，uni-app 编译器也支持自动转换，但我们自打包 |
| Vue 3 产物形式 | 预打包 ESM | 与 Element Plus/Arco 一致，tree-shaking 可靠，用户体验好 |
| uni-app 产物形式 | SFC（.vue 文件） | easycom 需要 .vue 文件，由 uni-app 编译器最终编译 |
| 平台差异处理 | 条件编译注释（#ifdef H5 / #ifndef H5） | uni-app 官方机制，静态移除无运行时开销 |
| 标签转换时机 | 构建时（Vite 插件 transform 钩子） | 静态转换，无运行时开销 |
| Vue3Adapter | 删除 | 不再需要运行时映射 |

## 标签处理策略

### 自动转换的标签（构建时处理，仅 uni-app 产物）

| 源码（HTML） | uni-app 产物 |
|-------------|--------------|
| `<div>` | `<view>` |
| `<span>` | `<text>` |
| `<img>` | `<image>` |

### 特殊处理

| 标签 | 位置 | 处理 | 原因 |
|------|------|------|------|
| `<i>` | icon.vue | 改为 `<span>` | `<i>` 不在 uni-app 自动转换列表，小程序可能不识别 |
| `<navigator>` | footer.vue | 保留 | 改为 `<a>` 会丢失 `:url` 等 uni-app 专属属性 |

### 同名标签（保留不动）

`input`、`button`、`label`、`checkbox`、`radio`、`textarea`、`form`、`canvas`、`video` —— 这些标签在 HTML 和 uni-app 中同名，uni-app 专属属性在 H5 会自动忽略。

### uni-app 独有标签（保留不动）

`checkbox-group`、`radio-group`、`scroll-view`、`swiper`、`picker-view` 等 —— HTML 无对应，但 Vue 3 产物中这些组件不会被使用（或通过条件编译隔离）。

## 平台差异处理

### 不通用点清单

| 组件 | 差异点 | Vue 3 产物 | uni-app 产物 |
|------|--------|-----------|--------------|
| uploader | 选文件 | `<input type="file" @change>` | `uni.chooseImage` / `uni.chooseFile` |
| cell | 跳转 | emit `navigate` 事件，不自动跳转 | `uni.navigateTo` |
| grid-item | 跳转 | emit `navigate` 事件，不自动跳转 | `uni.navigateTo` |

### 条件编译注释方案

源码中使用 uni-app 官方条件编译注释标记平台差异：

```vue
<script setup lang="ts">
const handleChoose = () => {
  // #ifdef H5
  // Vue 3 / H5：用 input[type=file]
  fileInput.value?.click()
  // #endif
  // #ifndef H5
  // 小程序/App：用 uni API
  uni.chooseImage({ count: remaining, success, fail })
  // #endif
}
</script>
```

- **Vue 3 产物打包**：移除 `#ifndef H5` 块，保留 `#ifdef H5` 块。
- **uni-app 产物打包**：移除 `#ifdef H5` 块，保留 `#ifndef H5` 块（uni-app 编译器也原生支持条件编译注释，但为了一致性，打包时也做处理）。

### cell / grid-item 跳转处理

**Vue 3 产物**：不自动跳转，改为 emit `navigate` 事件，让用户用 vue-router 或其他方式处理。

```vue
<script setup lang="ts">
const handleClick = (event) => {
  emit('click', event)
  if (props.url) {
    // #ifdef H5
    emit('navigate', { url: props.url })
    // #endif
    // #ifndef H5
    uni.navigateTo({ url: props.url })
    // #endif
  }
}
</script>
```

## 打包实现

### 产物目录结构

```
weui-design-vue/
├── src/                          # 源码（div/span/img + 条件编译）
│   ├── index.ts
│   ├── button/button.vue
│   ├── uploader/uploader.vue
│   ├── cell/cell.vue
│   ├── styles/
│   │   └── weui-extra.scss
│   └── ...
├── dist/
│   ├── vue3/                     # Vue 3 产物（npm 安装）
│   │   ├── index.mjs             # ESM 入口（预打包）
│   │   ├── index.d.ts            # 类型声明
│   │   ├── styles/
│   │   │   └── weui-extra.scss   # 样式（源码复制）
│   │   └── components/           # 按组件拆分的独立入口（可选）
│   └── uni-app/                  # uni-app 产物（easycom 引入）
│       ├── index.ts              # 导出入口（SFC 引用）
│       ├── src/                  # SFC 源码（标签已转换）
│       │   ├── button/button.vue # 标签已转换为 view/text/image
│       │   ├── uploader/uploader.vue
│       │   └── ...
│       └── styles/
│           └── weui-extra.scss
├── packages/
│   └── components/
│       ├── build-plugin.ts       # Vite 打包插件（标签转换 + 条件编译移除）
│       ├── vite.config.ts        # 库模式配置
│       └── package.json
└── package.json
```

### Vite 打包插件（packages/components/build-plugin.ts）

插件职责：

1. **标签转换**（仅 uni-app 产物）：解析 .vue 模板，将 div→view、span→text、img→image。
2. **条件编译移除**：按目标平台移除 `#ifdef H5` / `#ifndef H5` 注释块。
3. **双产物输出**：通过 Vite 库模式分别构建。

插件实现要点：

```ts
import type { Plugin } from 'vite'

interface PlatformTransformOptions {
  platform: 'vue3' | 'uni-app'
}

// 标签映射表
const TAG_MAP: Record<string, string> = {
  div: 'view',
  span: 'text',
  img: 'image',
}

// 条件编译注释正则
const IFDEF_RE = /\/\/\s*#ifdef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g
const IFNDEF_RE = /\/\/\s*#ifndef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g

export function platformTransform(options: PlatformTransformOptions): Plugin {
  return {
    name: 'weui-platform-transform',
    transform(code, id) {
      if (!id.endsWith('.vue') && !id.endsWith('.ts')) return null

      let result = code

      // 1. 条件编译处理
      if (options.platform === 'vue3') {
        // Vue 3 产物：保留 #ifdef H5 块，移除 #ifndef H5 块
        result = result.replace(IFNDEF_RE, (_, platform, content) => {
          return platform === 'H5' ? '' : content
        })
        result = result.replace(IFDEF_RE, (_, platform, content) => {
          return platform === 'H5' ? content.replace(/^\/\/\s*/, '') : ''
        })
        // 移除条件编译注释标记
        result = result.replace(/\/\/\s*#ifdef\s+\S+\s*\n/g, '')
        result = result.replace(/\/\/\s*#ifndef\s+\S+\s*\n/g, '')
        result = result.replace(/\/\/\s*#endif/g, '')
      } else {
        // uni-app 产物：移除 #ifdef H5 块，保留 #ifndef H5 块
        result = result.replace(IFDEF_RE, (_, platform, content) => {
          return platform === 'H5' ? '' : content
        })
        result = result.replace(IFNDEF_RE, (_, platform, content) => {
          return platform === 'H5' ? content.replace(/^\/\/\s*/, '') : ''
        })
        result = result.replace(/\/\/\s*#ifdef\s+\S+\s*\n/g, '')
        result = result.replace(/\/\/\s*#ifndef\s+\S+\s*\n/g, '')
        result = result.replace(/\/\/\s*#endif/g, '')

        // 2. 标签转换（仅 uni-app 产物）
        // 在 <template> 块内做标签替换
        result = transformTemplateTags(result)
      }

      return result
    },
  }
}

function transformTemplateTags(source: string): string {
  // 提取 <template> 块，做标签替换，再拼回
  return source.replace(
    /(<template>)([\s\S]*?)(<\/template>)/g,
    (_, open, content, close) => {
      let transformed = content
      for (const [html, uni] of Object.entries(TAG_MAP)) {
        // 开标签
        transformed = transformed.replace(
          new RegExp(`<${html}(\\s|>|/)`, 'g'),
          `<${uni}$1`
        )
        // 闭标签
        transformed = transformed.replace(
          new RegExp(`</${html}>`, 'g'),
          `</${uni}>`
        )
      }
      return open + transformed + close
    }
  )
}
```

### Vite 库模式配置（packages/components/vite.config.ts）

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { platformTransform } from './build-plugin'

export default defineConfig(({ mode }) => {
  const isUniApp = mode === 'uni-app'

  return {
    plugins: [
      vue(),
      platformTransform({ platform: isUniApp ? 'uni-app' : 'vue3' }),
    ],
    build: {
      outDir: `dist/${mode === 'uni-app' ? 'uni-app' : 'vue3'}`,
      lib: isUniApp
        ? undefined  // uni-app 产物保留 SFC，不做 JS 打包
        : {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: 'index.mjs',
          },
      rollupOptions: {
        external: ['vue'],
      },
    },
  }
})
```

**uni-app 产物处理**：由于 easycom 需要 .vue 文件，uni-app 产物不做 JS 打包，而是通过插件 transform 后直接输出 .vue 文件到 dist/uni-app/。这部分可能需要自定义 Vite 插件的 `generateBundle` 钩子，或在构建脚本中用文件系统操作完成。

### package.json 配置

```json
{
  "name": "weui-design-vue",
  "version": "0.2.0",
  "main": "dist/vue3/index.mjs",
  "module": "dist/vue3/index.mjs",
  "types": "dist/vue3/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/vue3/index.mjs",
      "types": "./dist/vue3/index.d.ts"
    },
    "./uni-app": {
      "default": "./dist/uni-app/index.ts"
    },
    "./styles/*": "./dist/vue3/styles/*",
    "./uni-app/styles/*": "./dist/uni-app/styles/*"
  },
  "files": ["dist"],
  "scripts": {
    "build": "pnpm build:vue3 && pnpm build:uni-app",
    "build:vue3": "vite build --mode vue3",
    "build:uni-app": "vite build --mode uni-app",
    "test": "vitest run",
    "typecheck": "vue-tsc --noEmit -p tsconfig.json"
  },
  "peerDependencies": {
    "vue": "^3.4.0"
  },
  "dependencies": {
    "weui": "^2.4.3"
  }
}
```

## 文档站改造

### 当前状态

- 组件源码：view/text/image
- 文档 demo：view/text/image
- 文档站运行时：Vue3Adapter 映射 view→div 等
- config.mts isCustomElement：含 view/text/image

### 改造后

- 组件源码：div/span/img（与文档站一致）
- 文档 demo：div/span/img（与组件源码一致）
- 文档站运行时：**无需任何映射**
- config.mts isCustomElement：**移除 view/text/image**（保留其他 uni-app 独有标签如 checkbox-group/radio-group/swiper 等，这些在文档站不会用到但保留无害）

### 改造步骤

1. 删除 `packages/components/src/vue3-adapter.ts`
2. 从 `packages/components/src/index.ts` 移除 Vue3Adapter 导出
3. 删除 `tests/components/vue3-adapter.test.ts`
4. `docs/.vitepress/theme/index.ts` 移除 `import { Vue3Adapter }` 和 `app.use(Vue3Adapter)`
5. `docs/.vitepress/config.mts` 从 isCustomElement 移除 view/text/image
6. 所有 32 个文档 demo 中的 view/text/image 替换为 div/span/img

## 产物引用方式

### Vue 3 用户（npm 安装）

```bash
pnpm add weui-design-vue
```

```ts
// main.ts
import { createApp } from 'vue'
import WeuiDesignVue from 'weui-design-vue'
import 'weui/dist/style/weui.css'
import 'weui-design-vue/styles/weui-extra.scss'
import App from './App.vue'

const app = createApp(App)
app.use(WeuiDesignVue)
app.mount('#app')
```

**按需引入（tree-shaking 自动生效）：**

```ts
import { WeuiButton, WeuiCell } from 'weui-design-vue'
app.component('WeuiButton', WeuiButton)
```

**无需 Vue3Adapter，无平台适配代码。**

### uni-app 用户（easycom 引入）

`pages.json`:

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^weui-(.*)": "weui-design-vue/dist/uni-app/src/$1/$1.vue"
    }
  }
}
```

`App.vue`:

```vue
<style lang="scss">
@import 'weui/dist/style/weui.css';
@import 'weui-design-vue/dist/uni-app/src/styles/weui-extra.scss';
</style>
```

## 实施步骤概览

| 步骤 | 内容 | 影响范围 |
|------|------|---------|
| 1 | 组件源码标签替换：view→div、text→span、image→img | 所有 .vue 组件 |
| 2 | icon.vue 的 `<i>` → `<span>` | 1 文件 |
| 3 | 添加条件编译注释处理 3 处不通用点（uploader/cell/grid-item），uploader 模板用 `__IS_H5__` 常量 + v-if | 3 文件 |
| 4 | 创建 Vite 打包插件（标签转换 + 条件编译移除 + `__IS_H5__` 常量替换） | packages/components |
| 5 | 配置 Vite 库模式打包，输出 dist/vue3 和 dist/uni-app | packages/components |
| 6 | 配置类型声明生成（vue-tsc --declaration），输出 dist/vue3/index.d.ts | packages/components |
| 7 | 更新 package.json（exports、files、scripts） | packages/components |
| 8 | 删除 Vue3Adapter 及其测试 | packages/components + tests |
| 9 | 文档站移除 Vue3Adapter 注册 + isCustomElement 调整 | docs/.vitepress |
| 10 | 文档 demo 标签替换 view→div 等 | 32 个 .md 文件 |
| 11 | 更新文档（getting-started/customize-theme） | docs/guide |
| 12 | 更新 examples/uni-app 的 easycom 路径指向 dist/uni-app | examples/uni-app |
| 13 | 重新审视 demo-row 使用，移除非必要的 | 32 个 .md 文件 |
| 14 | 全量验证（单元测试 + typecheck + E2E） | 全项目 |

## 现有实现的处理

当前分支 `docs-compat-optimize` 已有 6 个 commit（Vue3Adapter 方案）。采用**基于当前分支继续**的策略：

| 现有 commit | 新方案处理 |
|------------|----------|
| `feat: Vue3Adapter 插件` | **回退/删除**（新方案不需要） |
| `refactor: 精简样式架构（weui-extra）` | **保留**（样式架构改造仍然有效） |
| `fix: 移除 --weui-BORDER` | **保留** |
| `fix: 接入 Vue3Adapter` | **回退**（新方案不需要） |
| `docs(button): Cell/验证码/半透明示例` | **保留示例内容，但 demo 标签需改为 div/span** |
| `docs: 设计文档与计划` | 保留为历史归档 |

理由：
- Vue3Adapter 的尝试有价值（证明了运行时映射的局限性，促成了打包时转换的决策）
- git 历史能反映真实的决策过程
- 样式架构改造和 button 示例仍然有效，保留可减少重复工作

## 潜在风险与限制

### 风险 1：Vite 打包插件的标签转换正则可能不完善

**问题**：用正则替换 .vue 模板中的标签可能遇到边界情况（如 `v-html` 内容中的 div、注释中的 div、动态组件等）。

**缓解**：优先用正则实现，配合 E2E 测试覆盖所有组件。如果正则方案不够稳健，再考虑用 Vue compiler 解析 AST 做转换。

### 风险 2：uni-app 产物的 SFC 文件输出

**问题**：Vite 库模式默认输出 JS，不保留 .vue 文件。需要自定义 `generateBundle` 钩子或构建脚本将转换后的 .vue 文件复制到 dist/uni-app/。

**缓解**：在 build-plugin.ts 中实现 `generateBundle` 钩子，遍历 src/ 下的 .vue 文件，经 transform 后写入 dist/uni-app/。

### 风险 3：条件编译注释在 Vue 模板中的处理

**问题**：条件编译注释 `// #ifdef H5` 在 `<template>` 块内是 HTML 注释语境（应为 `<!-- #ifdef H5 -->`），在 `<script>` 块内是 JS 注释语境。正则处理需要区分。

**缓解**：条件编译注释统一在 `<script setup>` 中使用（JS 注释 `// #ifdef H5`）。对于 uploader 的模板差异（`<input type="file">` vs 无），采用**双模板 + v-if 平台常量**方案：
- 定义编译期常量 `__IS_H5__`（Vue 3 产物为 true，uni-app 产物为 false）
- 模板中用 `v-if="__IS_H5__"` 和 `v-else` 切换
- 打包插件在 transform 时将该常量替换为字面量 `true`/`false`，Vue 编译器会做条件编译优化（dead code elimination）

uploader 模板示例：
```vue
<template>
  <div :class="rootClass">
    <!-- 其他结构... -->
    <div v-if="canUpload" class="weui-uploader__input-box" @click="handleChoose">
      <!-- H5：input[type=file] -->
      <input
        v-if="__IS_H5__"
        ref="fileInput"
        type="file"
        class="weui-uploader__input"
        @change="handleFileChange"
      />
      <!-- 非 H5：空 div，点击触发 uni API -->
      <div v-else class="weui-uploader__input" />
    </div>
  </div>
</template>
```

### 风险 4：Vue 3 产物预打包后的样式处理

**问题**：weui-extra.scss 需要随产物发布，但预打包 JS 不含样式。

**缓解**：在 dist/vue3/styles/ 下复制 weui-extra.scss，package.json 的 exports 中配置 `./styles/*` 路径。

### 限制：不支持原生小程序组件

uni-app 产物仍是 Vue SFC，用户必须通过 uni-app 项目使用。不支持直接在微信开发者工具中用原生小程序项目引入。

## 成功标准

1. **源码统一**：所有组件源码使用 div/span/img，无 view/text/image。
2. **双产物**：`pnpm build` 生成 dist/vue3/（ESM）和 dist/uni-app/（SFC）两套产物。
3. **Vue 3 产物纯净**：dist/vue3/ 中无任何 uni.* API 调用、无 view/text/image 标签。
4. **uni-app 产物纯净**：dist/uni-app/ 中无 div/span/img 标签、无 #ifdef H5 条件编译块。
5. **文档站无映射**：文档站不使用 Vue3Adapter，直接渲染 div/span/img。
6. **验证通过**：单元测试、typecheck、E2E 测试全部通过。
7. **demo-row 最小化**：仅在必要时使用 demo-row，减少外部样式干预。
