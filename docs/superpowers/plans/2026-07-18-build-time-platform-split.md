# 构建时平台拆分：Vue 3 与 uni-app 双产物实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将组件源码从 uni-app 标签（view/text/image）改为标准 HTML 标签（div/span/img），通过构建时处理输出 Vue 3 和 uni-app 两套产物，并删除 Vue3Adapter 运行时映射方案。

**架构：** 组件源码统一用 div/span/img + 条件编译注释处理 3 处不通用点（uploader/cell/grid-item）。自写 Vite 打包插件做标签转换和条件编译移除，输出 dist/vue3（预打包 ESM）和 dist/uni-app（SFC 文件）两套产物。文档站直接用源码，无需任何映射。

**技术栈：** Vue 3 + TypeScript + Vite（库模式）+ VitePress + uni-app + Playwright

---

## 文件结构

### 新建文件

- `packages/components/build-plugin.ts` — Vite 打包插件（标签转换 + 条件编译移除 + `__IS_H5__` 常量替换）
- `packages/components/scripts/copy-uniapp-sfc.ts` — uni-app 产物 SFC 文件输出脚本
- `tests/components/build-plugin.test.ts` — 打包插件单元测试

### 修改文件（源码标签替换）

- `packages/components/src/**/*.vue` — 所有组件：view→div、text→span、image→img
- `packages/components/src/icon/icon.vue` — `<i>` → `<span>`
- `packages/components/src/uploader/uploader.vue` — 添加条件编译 + `__IS_H5__` 双模板
- `packages/components/src/cell/cell.vue` — 跳转逻辑加条件编译
- `packages/components/src/grid/grid-item.vue` — 跳转逻辑加条件编译

### 修改文件（打包配置）

- `packages/components/vite.config.ts` — 库模式配置，区分 vue3/uni-app 两个 mode
- `packages/components/package.json` — exports、files、scripts
- `packages/components/tsconfig.json` — 声明文件输出配置

### 修改文件（删除 Vue3Adapter）

- 删除 `packages/components/src/vue3-adapter.ts`
- 删除 `tests/components/vue3-adapter.test.ts`
- 修改 `packages/components/src/index.ts` — 移除 Vue3Adapter 导出
- 修改 `packages/components/vitest.config.ts` — 移除对已删除测试的 include（如有）

### 修改文件（文档站）

- `docs/.vitepress/theme/index.ts` — 移除 Vue3Adapter 注册
- `docs/.vitepress/config.mts` — 从 isCustomElement 移除 view/text/image
- `docs/components/*.md` — 32 个文档 demo 标签替换 view→div 等
- `docs/guide/getting-started.md` — 更新使用说明
- `docs/guide/customize-theme.md` — 更新样式说明（如需）

### 修改文件（示例项目）

- `examples/uni-app/src/pages.json` — easycom 路径指向 dist/uni-app/src/
- `examples/uni-app/src/App.vue` — 样式 import 路径更新

---

## 任务分解

本计划共 9 个任务。任务 1-3 是源码改造（可批量脚本化），任务 4-6 是打包工程，任务 7-8 是文档与示例，任务 9 是全量验证。

---

### 任务 1：组件源码标签批量替换（view→div、text→span、image→img）

**文件：**
- 修改：`packages/components/src/**/*.vue`（除 icon.vue 的 `<i>`、uploader.vue 的特殊处理、cell.vue/grid-item.vue 的跳转逻辑——这些在任务 2、3 处理）

**说明：** 本任务是机械性批量替换。只替换 `<template>` 块内的标签，不替换 `<script>` 块内的字符串字面量（如 `'weui-cell__bd'` 等类名）。icon.vue 的 `<i>` 标签在任务 2 处理。uploader.vue/cell.vue/grid-item.vue 的平台差异部分在任务 3 处理，但本任务可先做纯标签替换（包括这三个文件的 view→div 等），任务 3 再叠加条件编译逻辑。

- [ ] **步骤 1：列出所有需要修改的 .vue 文件**

运行：
```bash
cd /Users/xueyang/Documents/GitHub/weui-design-vue
ls packages/components/src/**/*.vue
```

预期：列出约 40+ 个 .vue 文件（含子组件如 cell-group.vue、checkbox-group.vue 等）。

- [ ] **步骤 2：对每个 .vue 文件做 template 块内的标签替换**

对每个 .vue 文件，在 `<template>` 标签内部做以下替换：
- `<view` → `<div`（开标签，含属性）
- `</view>` → `</div>`（闭标签）
- `<text` → `<span`（开标签）
- `</text>` → `</span>`（闭标签）
- `<image` → `<img`（开标签）
- `</image>` → `</img>`（闭标签，但 img 通常是自闭合，注意 `<image ... />` → `<img ... />`）

**注意：**
- 不要替换 `<script>` 块内的内容
- 不要替换字符串字面量中的 view/text/image（如类名 `'weui-cell__bd'`）
- 不要替换注释中的标签
- `<scroll-view>`、`<picker-view>` 等含 view 子串的标签不要误替换（用 `<view` 精确匹配，后面跟空格、`>` 或 `/`）
- `<checkbox-group>`、`<radio-group>` 等保留不动

可使用脚本辅助（Node.js 脚本读取 .vue 文件，提取 `<template>` 块，做正则替换，写回）。建议脚本放在 `packages/components/scripts/replace-tags.ts`，一次性运行，运行后可保留脚本供未来参考或删除。

- [ ] **步骤 3：运行单元测试验证（预期会有失败）**

运行：`cd packages/components && pnpm vitest run`

预期：部分测试可能失败（因为测试中可能有 `findComponent` 或 DOM 断言用到 view/text/image 标签）。记录失败的测试文件和断言。

- [ ] **步骤 4：修复失败的单元测试**

对每个失败的测试文件，将测试中的 `view`/`text`/`image` 标签断言改为 `div`/`span`/`img`。例如：
- `wrapper.find('view')` → `wrapper.find('div')`
- `expect(wrapper.html()).toContain('<view')` → `expect(wrapper.html()).toContain('<div')`

- [ ] **步骤 5：运行单元测试验证通过**

运行：`cd packages/components && pnpm vitest run`

预期：全部通过（838+ 个测试，数量与之前一致或因 Vue3Adapter 测试已删除而减少 5 个）。

- [ ] **步骤 6：Commit**

```bash
git add packages/components/src/ packages/components/scripts/replace-tags.ts tests/components/ packages/components/src/**/__tests__/
git commit -m "refactor(components): 源码标签 view/text/image 批量替换为 div/span/img"
```

---

### 任务 2：icon.vue 的 `<i>` 标签改为 `<span>`

**文件：**
- 修改：`packages/components/src/icon/icon.vue`
- 修改：`packages/components/src/icon/__tests__/icon.spec.ts`（如有 `<i>` 断言）

- [ ] **步骤 1：读取 icon.vue 当前内容**

读取 `/Users/xueyang/Documents/GitHub/weui-design-vue/packages/components/src/icon/icon.vue`，确认 `<i>` 标签位置。

- [ ] **步骤 2：将 `<i>` 替换为 `<span>`**

在 icon.vue 的 `<template>` 块中：
- `<i :class="rootClass" :style="rootStyle" />` → `<span :class="rootClass" :style="rootStyle" />`

CSS 类名和样式不变（`.weui-icon` 等类选择器对标签名不敏感）。

- [ ] **步骤 3：检查并修复测试**

读取 `packages/components/src/icon/__tests__/icon.spec.ts`，如有 `find('i')` 或 `toContain('<i')` 断言，改为 `find('span')` 或 `toContain('<span')`。

- [ ] **步骤 4：运行测试验证**

运行：`cd packages/components && pnpm vitest run src/icon/__tests__/icon.spec.ts`

预期：通过。

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/icon/icon.vue packages/components/src/icon/__tests__/icon.spec.ts
git commit -m "refactor(icon): <i> 标签改为 <span> 以兼容小程序"
```

---

### 任务 3：3 处不通用点的条件编译处理

**文件：**
- 修改：`packages/components/src/uploader/uploader.vue`
- 修改：`packages/components/src/cell/cell.vue`
- 修改：`packages/components/src/grid/grid-item.vue`
- 修改：对应的测试文件（如需）

- [ ] **步骤 1：处理 uploader.vue 的选文件差异**

读取 `packages/components/src/uploader/uploader.vue`。

在 `<template>` 中，将原本的 `<view class="weui-uploader__input" />`（任务 1 已改为 `<div>`）替换为双模板 + `__IS_H5__` 常量：

```vue
<template>
  <div :class="rootClass">
    <div v-if="showHeader" class="weui-uploader__hd">
      <div v-if="title" class="weui-uploader__title">{{ title }}</div>
      <div class="weui-uploader__info">{{ infoText }}</div>
    </div>

    <div class="weui-uploader__bd">
      <div class="weui-uploader__files">
        <div
          v-for="(file, index) in files"
          :key="file.url"
          :class="fileClass(file)"
          :style="fileStyle(file)"
          @click="handlePreview(file, index)"
          @longpress="handleDelete(file, index)"
        >
          <div
            v-if="hasStatusOverlay(file)"
            class="weui-uploader__file-content"
          >{{ resolveStatusText(file) }}</div>
        </div>
      </div>

      <div v-if="canUpload" class="weui-uploader__input-box" @click="handleChoose">
        <!-- H5：input[type=file]，由 fileInput ref 触发 -->
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

    <div v-if="tips" class="weui-uploader__tips">{{ tips }}</div>

    <slot />
  </div>
</template>
```

在 `<script setup>` 中，添加 `fileInput` ref 和 `handleFileChange` 方法，并给 `handleChoose` 加条件编译：

```ts
<script setup lang="ts">
import { computed, ref } from 'vue'

// 平台常量，由打包插件在 transform 时替换为字面量 true/false
declare const __IS_H5__: boolean

export interface UploaderFile {
  url: string
  status?: 'loading' | 'error' | 'success'
  statusText?: string
}

export interface WeuiUploaderProps {
  files?: UploaderFile[]
  title?: string
  tips?: string
  count?: number
  maxSize?: number
  showHeader?: boolean
  extClass?: string
  accept?: 'image' | 'file'
}

export interface WeuiUploaderSelectEvent {
  tempFilePaths: string[]
  tempFiles?: Array<{ path: string; size: number }>
}

export interface WeuiUploaderEmits {
  (e: 'select', event: WeuiUploaderSelectEvent): void
  (e: 'select-fail', err: { errMsg: string }): void
  (e: 'preview', file: UploaderFile, index: number): void
  (e: 'delete', file: UploaderFile, index: number): void
  (e: 'exceed', count: number): void
}

const props = withDefaults(defineProps<WeuiUploaderProps>(), {
  files: () => [],
  title: undefined,
  tips: undefined,
  count: 9,
  maxSize: undefined,
  showHeader: true,
  extClass: undefined,
  accept: 'image',
})

const emit = defineEmits<WeuiUploaderEmits>()

const fileInput = ref<HTMLInputElement | null>(null)

const rootClass = computed(() => {
  const classes: string[] = ['weui-uploader']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const infoText = computed(() => `${props.files.length}/${props.count}`)

const canUpload = computed(() => props.files.length < props.count)

const fileClass = (file: UploaderFile) => {
  const classes: string[] = ['weui-uploader__file']
  if (file.status && file.status !== 'success') {
    classes.push('weui-uploader__file_status')
  }
  return classes
}

const fileStyle = (file: UploaderFile) => ({
  backgroundImage: `url("${file.url}")`,
})

const hasStatusOverlay = (file: UploaderFile) => {
  return file.status === 'loading' || file.status === 'error'
}

const resolveStatusText = (file: UploaderFile) => {
  if (file.statusText) return file.statusText
  if (file.status === 'loading') return '上传中'
  if (file.status === 'error') return '上传失败'
  return ''
}

const handleChoose = () => {
  const remaining = props.count - props.files.length
  if (remaining <= 0) {
    emit('exceed', props.count)
    return
  }
  // #ifdef H5
  // Vue 3 / H5：触发 input[type=file] 点击
  fileInput.value?.click()
  // #endif
  // #ifndef H5
  // 小程序/App：用 uni API
  const success = (res: { tempFilePaths: string[]; tempFiles?: Array<{ path: string; size: number }> }) => {
    if (props.files.length + res.tempFilePaths.length > props.count) {
      emit('exceed', props.count)
      return
    }
    emit('select', { tempFilePaths: res.tempFilePaths, tempFiles: res.tempFiles })
  }
  const fail = (err: { errMsg: string }) => {
    emit('select-fail', err)
  }
  if (props.accept === 'image') {
    uni.chooseImage({ count: remaining, success, fail })
  } else {
    uni.chooseFile({ count: remaining, success, fail })
  }
  // #endif
}

// H5 专用：input[type=file] change 事件处理
// #ifdef H5
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return

  const remaining = props.count - props.files.length
  if (files.length > remaining) {
    emit('exceed', props.count)
    target.value = ''
    return
  }

  const tempFilePaths: string[] = []
  const tempFiles: Array<{ path: string; size: number }> = []
  for (let i = 0; i < files.length; i++) {
    tempFilePaths.push(URL.createObjectURL(files[i]))
    tempFiles.push({ path: tempFilePaths[i], size: files[i].size })
  }
  emit('select', { tempFilePaths, tempFiles })
  target.value = ''
}
// #endif

const handlePreview = (file: UploaderFile, index: number) => {
  emit('preview', file, index)
}

const handleDelete = (file: UploaderFile, index: number) => {
  emit('delete', file, index)
}
</script>
```

- [ ] **步骤 2：处理 cell.vue 的跳转差异**

读取 `packages/components/src/cell/cell.vue`，找到 `uni.navigateTo` 调用处（约第 144 行）。

将：
```ts
if (props.link && props.url) {
  uni.navigateTo({
    url: props.url,
    success: (res) => emit('navigate', res),
    ...
  })
}
```

替换为带条件编译的版本：
```ts
if (props.link && props.url) {
  // #ifdef H5
  // Vue 3 / H5：不自动跳转，emit navigate 事件让用户处理
  emit('navigate', { url: props.url })
  // #endif
  // #ifndef H5
  // 小程序/App：用 uni.navigateTo
  uni.navigateTo({
    url: props.url,
    success: (res) => emit('navigate', res),
    fail: (err) => emit('navigate-error', err),
  })
  // #endif
}
```

**注意：** 确认 cell.vue 的 emits 声明中是否已有 `navigate` 事件。如果没有，需要添加。检查现有 emits 声明并按需补充。

- [ ] **步骤 3：处理 grid-item.vue 的跳转差异**

读取 `packages/components/src/grid/grid-item.vue`，找到 `uni.navigateTo` 调用处（约第 72 行）。

将：
```ts
if (props.url) {
  uni.navigateTo({ url: props.url })
}
```

替换为带条件编译的版本：
```ts
if (props.url) {
  // #ifdef H5
  // Vue 3 / H5：不自动跳转，emit navigate 事件让用户处理
  emit('navigate', { url: props.url })
  // #endif
  // #ifndef H5
  // 小程序/App：用 uni.navigateTo
  uni.navigateTo({ url: props.url })
  // #endif
}
```

**注意：** 确认 grid-item.vue 的 emits 声明中是否已有 `navigate` 事件。如果没有，需要添加。

- [ ] **步骤 4：更新测试（处理 __IS_H5__ 常量）**

由于 `__IS_H5__` 在测试环境中未定义，需要在 vitest 配置中定义全局常量，或在测试中 mock。

修改 `packages/components/vitest.config.ts`，在 `define` 中添加：
```ts
define: {
  __IS_H5__: true,  // 测试环境按 H5 处理
}
```

运行：`cd packages/components && pnpm vitest run`

预期：测试通过。如果 uploader 测试因模板变化（新增 input[type=file]）失败，需要更新测试断言。

- [ ] **步骤 5：运行类型检查**

由于 `__IS_H5__` 是全局常量，需要在 tsconfig.json 中声明类型。

修改 `packages/components/tsconfig.json`，在 `compilerOptions.types` 或单独的 `globals.d.ts` 中添加：
```ts
declare const __IS_H5__: boolean
```

建议创建 `packages/components/src/globals.d.ts`：
```ts
// 平台常量，由打包插件在 transform 时替换为字面量 true/false
// - Vue 3 产物：替换为 true
// - uni-app 产物：替换为 false
declare const __IS_H5__: boolean
```

运行：`pnpm -r typecheck`

预期：无错误。

- [ ] **步骤 6：Commit**

```bash
git add packages/components/src/uploader/uploader.vue packages/components/src/cell/cell.vue packages/components/src/grid/grid-item.vue packages/components/src/globals.d.ts packages/components/vitest.config.ts packages/components/src/**/__tests__/
git commit -m "feat(components): uploader/cell/grid-item 添加条件编译处理平台差异"
```

---

### 任务 4：创建 Vite 打包插件（build-plugin.ts）

**文件：**
- 创建：`packages/components/build-plugin.ts`
- 创建：`tests/components/build-plugin.test.ts`

- [ ] **步骤 1：编写失败的单元测试**

创建 `tests/components/build-plugin.test.ts`：

```ts
import { describe, it, expect } from 'vitest'
import { platformTransform, stripConditionalCompile, transformTemplateTags } from '../../packages/components/build-plugin'

describe('stripConditionalCompile', () => {
  const sample = `
const x = () => {
  // #ifdef H5
  doH5Thing()
  // #endif
  // #ifndef H5
  doUniAppThing()
  // #endif
}
`

  it('Vue 3 平台：保留 #ifdef H5 块，移除 #ifndef H5 块', () => {
    const result = stripConditionalCompile(sample, 'vue3')
    expect(result).toContain('doH5Thing()')
    expect(result).not.toContain('doUniAppThing()')
    expect(result).not.toContain('#ifdef')
    expect(result).not.toContain('#ifndef')
    expect(result).not.toContain('#endif')
  })

  it('uni-app 平台：移除 #ifdef H5 块，保留 #ifndef H5 块', () => {
    const result = stripConditionalCompile(sample, 'uni-app')
    expect(result).not.toContain('doH5Thing()')
    expect(result).toContain('doUniAppThing()')
    expect(result).not.toContain('#ifdef')
    expect(result).not.toContain('#ifndef')
    expect(result).not.toContain('#endif')
  })

  it('无条件编译注释时原样返回', () => {
    const plain = 'const x = 1\nconst y = 2\n'
    expect(stripConditionalCompile(plain, 'vue3')).toBe(plain)
    expect(stripConditionalCompile(plain, 'uni-app')).toBe(plain)
  })

  it('处理多个条件编译块', () => {
    const multi = `
// #ifdef H5
a()
// #endif
const mid = 1
// #ifndef H5
b()
// #endif
`
    const vue3Result = stripConditionalCompile(multi, 'vue3')
    expect(vue3Result).toContain('a()')
    expect(vue3Result).not.toContain('b()')
    expect(vue3Result).toContain('const mid = 1')

    const uniResult = stripConditionalCompile(multi, 'uni-app')
    expect(uniResult).not.toContain('a()')
    expect(uniResult).toContain('b()')
    expect(uniResult).toContain('const mid = 1')
  })
})

describe('transformTemplateTags', () => {
  it('将 div 转为 view', () => {
    const src = '<template><div class="x">内容</div></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<view class="x">')
    expect(result).toContain('</view>')
    expect(result).not.toContain('<div')
  })

  it('将 span 转为 text', () => {
    const src = '<template><span>文本</span></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<text>')
    expect(result).toContain('</text>')
    expect(result).not.toContain('<span')
  })

  it('将 img 转为 image', () => {
    const src = '<template><img src="a.png" /></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<image src="a.png"')
    expect(result).not.toContain('<img')
  })

  it('不替换 script 块内的内容', () => {
    const src = '<template><div></div></template><script>const x = "div"</script>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<view></view>')
    expect(result).toContain('const x = "div"')  // script 内字符串不变
  })

  it('不误替换含 view 子串的标签（如 scroll-view）', () => {
    const src = '<template><scroll-view><div></div></scroll-view></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<scroll-view>')
    expect(result).toContain('<view></view>')
  })

  it('处理自闭合标签', () => {
    const src = '<template><img src="a.png" /></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<image src="a.png" />')
  })

  it('不替换类名等字符串', () => {
    const src = '<template><div class="weui-cell__bd">x</div></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<view class="weui-cell__bd">')
    expect(result).toContain('weui-cell__bd')  // 类名不变
  })
})

describe('platformTransform', () => {
  it('Vue 3 平台：不做标签转换，移除 #ifndef H5 块', () => {
    const plugin = platformTransform({ platform: 'vue3' })
    expect(plugin.name).toBe('weui-platform-transform')
    expect(plugin.transform).toBeDefined()

    const code = '<template><div class="x"></div></template>\n<script setup>const f = () => {\n// #ifdef H5\nh5()\n// #endif\n// #ifndef H5\nuni()\n// #endif\n}</script>'
    const result = plugin.transform!(code, 'test.vue')
    expect(result).not.toBeNull()
    const transformed = typeof result === 'string' ? result : result?.code
    expect(transformed).toContain('<div class="x">')  // 标签不变
    expect(transformed).toContain('h5()')
    expect(transformed).not.toContain('uni()')
  })

  it('uni-app 平台：做标签转换，移除 #ifdef H5 块', () => {
    const plugin = platformTransform({ platform: 'uni-app' })
    const code = '<template><div class="x"></div></template>\n<script setup>const f = () => {\n// #ifdef H5\nh5()\n// #endif\n// #ifndef H5\nuni()\n// #endif\n}</script>'
    const result = plugin.transform!(code, 'test.vue')
    expect(result).not.toBeNull()
    const transformed = typeof result === 'string' ? result : result?.code
    expect(transformed).toContain('<view class="x">')  // 标签已转换
    expect(transformed).not.toContain('h5()')
    expect(transformed).toContain('uni()')
  })

  it('替换 __IS_H5__ 常量（Vue 3 为 true，uni-app 为 false）', () => {
    const vue3Plugin = platformTransform({ platform: 'vue3' })
    const uniPlugin = platformTransform({ platform: 'uni-app' })
    const code = '<template><div v-if="__IS_H5__">h5</div><div v-else>uni</div></template>'

    const vue3Result = vue3Plugin.transform!(code, 'test.vue')
    const vue3Transformed = typeof vue3Result === 'string' ? vue3Result : vue3Result?.code
    expect(vue3Transformed).toContain('v-if="true"')

    const uniResult = uniPlugin.transform!(code, 'test.vue')
    const uniTransformed = typeof uniResult === 'string' ? uniResult : uniResult?.code
    expect(uniTransformed).toContain('v-if="false"')
  })

  it('非 .vue/.ts 文件不处理', () => {
    const plugin = platformTransform({ platform: 'vue3' })
    const result = plugin.transform!('some content', 'test.css')
    expect(result).toBeNull()
  })
})
```

- [ ] **步骤 2：运行测试验证失败**

运行：`cd packages/components && pnpm vitest run tests/components/build-plugin.test.ts`

预期：FAIL，报错 "Cannot find module '../../packages/components/build-plugin'"。

- [ ] **步骤 3：创建 build-plugin.ts 实现**

创建 `packages/components/build-plugin.ts`：

```ts
import type { Plugin } from 'vite'

interface PlatformTransformOptions {
  platform: 'vue3' | 'uni-app'
}

// 标签映射表（HTML → uni-app）
const TAG_MAP: Record<string, string> = {
  div: 'view',
  span: 'text',
  img: 'image',
}

// 条件编译注释正则（JS 注释语境，仅在 <script> 中使用）
const IFDEF_RE = /\/\/\s*#ifdef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g
const IFNDEF_RE = /\/\/\s*#ifndef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g

/**
 * 移除条件编译注释块，按目标平台保留对应代码
 *
 * - vue3 平台：保留 #ifdef H5 块，移除 #ifndef H5 块
 * - uni-app 平台：移除 #ifdef H5 块，保留 #ifndef H5 块
 */
export function stripConditionalCompile(code: string, platform: 'vue3' | 'uni-app'): string {
  let result = code

  if (platform === 'vue3') {
    // 移除 #ifndef H5 块
    result = result.replace(IFNDEF_RE, (_, platformName, _content) => {
      return platformName === 'H5' ? '' : _
    })
    // 保留 #ifdef H5 块（移除注释标记，保留内容）
    result = result.replace(IFDEF_RE, (_, platformName, content) => {
      if (platformName === 'H5') {
        // 移除每行前面的 // 注释（如果整块都被注释）
        return content.replace(/^(\s*)\/\/\s/gm, '$1')
      }
      return ''
    })
  } else {
    // uni-app：移除 #ifdef H5 块
    result = result.replace(IFDEF_RE, (_, platformName, _content) => {
      return platformName === 'H5' ? '' : _
    })
    // 保留 #ifndef H5 块
    result = result.replace(IFNDEF_RE, (_, platformName, content) => {
      if (platformName === 'H5') {
        return content.replace(/^(\s*)\/\/\s/gm, '$1')
      }
      return ''
    })
  }

  // 清理残留的条件编译注释标记（如果正则没匹配到完整块）
  result = result.replace(/\/\/\s*#ifdef\s+\S+\s*\n/g, '')
  result = result.replace(/\/\/\s*#ifndef\s+\S+\s*\n/g, '')
  result = result.replace(/\/\/\s*#endif[^\n]*\n?/g, '')

  return result
}

/**
 * 转换 <template> 块内的标签：div→view、span→text、img→image
 * 不替换 <script> 块内的内容
 */
export function transformTemplateTags(source: string): string {
  return source.replace(
    /(<template[^>]*>)([\s\S]*?)(<\/template>)/g,
    (_, open, content, close) => {
      let transformed = content
      for (const [html, uni] of Object.entries(TAG_MAP)) {
        // 开标签：<div 后面跟空格、> 或 /
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

/**
 * 替换 __IS_H5__ 常量为字面量
 * - vue3 平台：替换为 true
 * - uni-app 平台：替换为 false
 */
function replacePlatformConstant(source: string, platform: 'vue3' | 'uni-app'): string {
  const value = platform === 'vue3' ? 'true' : 'false'
  // 替换 __IS_H5__（但不替换 __IS_H5__XX 等更长标识符）
  return source.replace(/\b__IS_H5__\b/g, value)
}

/**
 * Vite 打包插件：平台转换
 *
 * 职责：
 * 1. 条件编译移除：按目标平台移除 #ifdef H5 / #ifndef H5 注释块
 * 2. __IS_H5__ 常量替换：替换为字面量 true/false
 * 3. 标签转换（仅 uni-app 产物）：div→view、span→text、img→image
 */
export function platformTransform(options: PlatformTransformOptions): Plugin {
  return {
    name: 'weui-platform-transform',
    transform(code, id) {
      if (!id.endsWith('.vue') && !id.endsWith('.ts')) return null

      let result = code

      // 1. 条件编译移除
      result = stripConditionalCompile(result, options.platform)

      // 2. __IS_H5__ 常量替换
      result = replacePlatformConstant(result, options.platform)

      // 3. 标签转换（仅 uni-app 产物）
      if (options.platform === 'uni-app') {
        result = transformTemplateTags(result)
      }

      return result
    },
  }
}
```

- [ ] **步骤 4：运行测试验证通过**

运行：`cd packages/components && pnpm vitest run tests/components/build-plugin.test.ts`

预期：全部通过。如有失败，修复实现或测试。

- [ ] **步骤 5：运行全量单元测试**

运行：`cd packages/components && pnpm vitest run`

预期：全部通过（含新增的 build-plugin 测试）。

- [ ] **步骤 6：Commit**

```bash
git add packages/components/build-plugin.ts tests/components/build-plugin.test.ts
git commit -m "feat(build): 新增 Vite 打包插件 platformTransform"
```

---

### 任务 5：配置 Vite 库模式打包 + 类型声明生成

**文件：**
- 修改：`packages/components/vite.config.ts`
- 创建：`packages/components/scripts/copy-uniapp-sfc.ts`
- 修改：`packages/components/package.json`
- 修改：`packages/components/tsconfig.json`

- [ ] **步骤 1：创建 uni-app 产物 SFC 复制脚本**

由于 Vite 库模式默认输出 JS，而 uni-app 产物需要保留 .vue 文件，用独立脚本处理。

创建 `packages/components/scripts/copy-uniapp-sfc.ts`：

```ts
/**
 * 将 src/ 下的 .vue 和 .ts 文件经 platformTransform 处理后复制到 dist/uni-app/src/
 * 保留 SFC 形式，供 uni-app easycom 引入
 */
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { join, relative, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripConditionalCompile, transformTemplateTags, replacePlatformConstant } from '../build-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, '..', 'src')
const outDir = join(__dirname, '..', '..', '..', 'dist', 'uni-app', 'src')

async function copyAndTransform(srcPath: string, outPath: string): Promise<void> {
  const ext = extname(srcPath)
  if (ext !== '.vue' && ext !== '.ts' && ext !== '.scss') {
    return
  }

  const content = await readFile(srcPath, 'utf-8')
  let transformed = content

  if (ext === '.vue' || ext === '.ts') {
    // 1. 条件编译移除（uni-app 平台：移除 #ifdef H5 块）
    transformed = stripConditionalCompile(transformed, 'uni-app')
    // 2. __IS_H5__ 常量替换为 false
    transformed = replacePlatformConstant(transformed, 'uni-app')
  }

  if (ext === '.vue') {
    // 3. 标签转换
    transformed = transformTemplateTags(transformed)
  }

  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, transformed, 'utf-8')
}

async function walkDir(srcPath: string, outPath: string): Promise<void> {
  const entries = await readdir(srcPath, { withFileTypes: true })
  for (const entry of entries) {
    const srcEntry = join(srcPath, entry.name)
    const outEntry = join(outPath, entry.name)
    if (entry.isDirectory()) {
      await walkDir(srcEntry, outEntry)
    } else {
      await copyAndTransform(srcEntry, outEntry)
    }
  }
}

async function main(): Promise<void> {
  console.log(`Copying SFC files from ${srcDir} to ${outDir}...`)
  await walkDir(srcDir, outDir)

  // 复制 styles 目录到 dist/uni-app/styles/
  const stylesSrc = join(__dirname, '..', 'src', 'styles')
  const stylesOut = join(__dirname, '..', '..', '..', 'dist', 'uni-app', 'styles')
  try {
    await walkDir(stylesSrc, stylesOut)
  } catch {
    // styles 目录可能不存在，忽略
  }

  // 复制 index.ts 到 dist/uni-app/index.ts
  const indexSrc = join(__dirname, '..', 'src', 'index.ts')
  const indexOut = join(__dirname, '..', '..', '..', 'dist', 'uni-app', 'index.ts')
  await copyAndTransform(indexSrc, indexOut)

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **步骤 2：更新 vite.config.ts 配置库模式**

修改 `packages/components/vite.config.ts`。保留现有的 vitest 配置（如果有），新增 build 配置。

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { platformTransform } from './build-plugin'

export default defineConfig(({ mode, command }) => {
  const isUniApp = mode === 'uni-app'
  const isBuild = command === 'build'

  return {
    plugins: [
      vue(),
      // 仅在 build 时启用平台转换插件（test 时不启用，测试用 __IS_H5__ 全局变量）
      ...(isBuild ? [platformTransform({ platform: isUniApp ? 'uni-app' : 'vue3' })] : []),
    ],
    build: isBuild ? {
      outDir: `../../dist/${isUniApp ? 'uni-app' : 'vue3'}`,
      lib: isUniApp
        ? undefined  // uni-app 产物用独立脚本输出 SFC，vite build 不做实际打包
        : {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: 'index.mjs',
          },
      rollupOptions: {
        external: ['vue'],
      },
      // uni-app 模式下 vite build 实际不产出有用文件，真正工作由 copy-uniapp-sfc.ts 完成
      emptyOutDir: !isUniApp,
    } : undefined,
  }
})
```

**注意：** vitest 配置如果之前在 vite.config.ts 中，需要保留。检查现有 vite.config.ts 的 test 字段，合并到上面的配置中。如果 vitest 配置在独立的 vitest.config.ts 中，则 vite.config.ts 不需要 test 字段。

- [ ] **步骤 3：更新 package.json**

修改 `packages/components/package.json`：

```json
{
  "name": "weui-design-vue",
  "version": "0.2.0",
  "description": "支持 uni-app 的 WeUI Vue 3 组件库",
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
    "build:vue3": "vite build --mode vue3 && pnpm build:types && pnpm build:copy-styles",
    "build:uni-app": "tsx scripts/copy-uniapp-sfc.ts",
    "build:types": "vue-tsc --declaration --emitDeclarationOnly --outDir dist/vue3/types",
    "build:copy-styles": "node -e \"require('fs').cpSync('src/styles', 'dist/vue3/styles', {recursive: true})\"",
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
    "@vue/test-utils": "^2.4.0",
    "happy-dom": "^14.0.0",
    "@vitejs/plugin-vue": "^5.0.0",
    "tsx": "^4.0.0"
  }
}
```

**注意：**
- `main`/`module` 指向 `dist/vue3/index.mjs`（Vue 3 产物）
- 新增 `exports` 字段，区分 `.`（Vue 3）和 `./uni-app`（uni-app）
- 新增 `build` 系列 scripts
- 新增 `tsx` devDependency（用于运行 copy-uniapp-sfc.ts）

- [ ] **步骤 4：更新 tsconfig.json 支持声明生成**

修改 `packages/components/tsconfig.json`，确保 `declaration` 和 `outDir` 配置正确：

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
    "declaration": true,
    "declarationMap": false,
    "outDir": "dist/vue3/types",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.vue", "src/**/*.d.ts"],
  "exclude": ["node_modules", "dist", "tests", "**/__tests__/**"]
}
```

**注意：** `exclude` 中要排除 `**/__tests__/**` 避免测试文件被编译进声明。

- [ ] **步骤 5：安装 tsx 依赖**

运行：
```bash
cd /Users/xueyang/Documents/GitHub/weui-design-vue
pnpm --filter weui-design-vue add -D tsx
```

- [ ] **步骤 6：测试构建**

运行 Vue 3 产物构建：
```bash
cd packages/components
pnpm build:vue3
```

预期：
- `dist/vue3/index.mjs` 生成
- `dist/vue3/index.d.ts` 生成（可能需要调整 build:types 命令）
- `dist/vue3/styles/weui-extra.scss` 生成

运行 uni-app 产物构建：
```bash
pnpm build:uni-app
```

预期：
- `dist/uni-app/src/` 下生成所有 .vue 文件（标签已转换为 view/text/image）
- `dist/uni-app/index.ts` 生成
- `dist/uni-app/styles/weui-extra.scss` 生成

- [ ] **步骤 7：验证产物纯净度**

检查 Vue 3 产物：
```bash
grep -rn "uni\." dist/vue3/ || echo "OK: 无 uni.* 调用"
grep -rn "<view\|<text\|<image" dist/vue3/ || echo "OK: 无 view/text/image 标签"
grep -rn "#ifdef\|#ifndef" dist/vue3/ || echo "OK: 无条件编译注释"
```

检查 uni-app 产物：
```bash
grep -rn "<div\|<span\|<img" dist/uni-app/ || echo "OK: 无 div/span/img 标签"
grep -rn "#ifdef H5" dist/uni-app/ || echo "OK: 无 #ifdef H5 块"
```

- [ ] **步骤 8：运行单元测试和 typecheck**

```bash
cd packages/components && pnpm vitest run
pnpm -r typecheck
```

预期：全部通过。

- [ ] **步骤 9：Commit**

```bash
git add packages/components/vite.config.ts packages/components/scripts/copy-uniapp-sfc.ts packages/components/package.json packages/components/tsconfig.json
git commit -m "feat(build): 配置 Vite 库模式打包，输出 Vue 3 和 uni-app 双产物"
```

---

### 任务 6：删除 Vue3Adapter 及其测试，移除文档站注册

**文件：**
- 删除：`packages/components/src/vue3-adapter.ts`
- 删除：`tests/components/vue3-adapter.test.ts`
- 修改：`packages/components/src/index.ts` — 移除 Vue3Adapter 导出
- 修改：`docs/.vitepress/theme/index.ts` — 移除 Vue3Adapter 注册
- 修改：`docs/.vitepress/config.mts` — 从 isCustomElement 移除 view/text/image

- [ ] **步骤 1：删除 Vue3Adapter 相关文件**

```bash
cd /Users/xueyang/Documents/GitHub/weui-design-vue
rm packages/components/src/vue3-adapter.ts
rm tests/components/vue3-adapter.test.ts
```

- [ ] **步骤 2：从 index.ts 移除 Vue3Adapter 导出**

修改 `packages/components/src/index.ts`：
- 移除 `import { Vue3Adapter } from './vue3-adapter'`
- 从 `export { ... }` 块中移除 `Vue3Adapter,`

- [ ] **步骤 3：从文档站移除 Vue3Adapter 注册**

修改 `docs/.vitepress/theme/index.ts`：
- 将 `import WeuiDesignVue, { Vue3Adapter } from 'weui-design-vue'` 改回 `import WeuiDesignVue from 'weui-design-vue'`
- 移除 `ctx.app.use(Vue3Adapter)` 行
- 移除相关注释

- [ ] **步骤 4：从 isCustomElement 移除 view/text/image**

修改 `docs/.vitepress/config.mts`，将 isCustomElement 的标签列表从：
```ts
[
  'checkbox', 'radio',
  'checkbox-group', 'radio-group', 'navigator',
  'swiper', 'swiper-item', 'scroll-view',
  'movable-area', 'movable-view',
  'picker-view', 'picker-view-column', 'rich-text',
]
```

确认 view/text/image 已不在列表中（任务 1 之后文档 demo 应已改为 div/span/img，但 config.mts 可能还保留旧配置）。

**注意：** 此时文档站的 demo 还是 view/text/image（任务 7 才改），所以本步骤先**保留** view/text/image 在 isCustomElement 中，等任务 7 改完文档 demo 后再移除。或者在本任务中一起做（取决于任务顺序）。

**调整：** 将本步骤移到任务 7 之后执行，或在本任务中先不移除 isCustomElement 中的 view/text/image。建议在本任务中只做删除 Vue3Adapter，isCustomElement 的调整放到任务 7。

- [ ] **步骤 5：运行单元测试和 typecheck**

```bash
cd packages/components && pnpm vitest run
pnpm -r typecheck
```

预期：全部通过（Vue3Adapter 的 5 个测试已删除，总数应减少 5 个）。

- [ ] **步骤 6：Commit**

```bash
git add packages/components/src/vue3-adapter.ts packages/components/src/index.ts tests/components/vue3-adapter.test.ts docs/.vitepress/theme/index.ts
git commit -m "refactor: 删除 Vue3Adapter 运行时映射方案"
```

---

### 任务 7：文档 demo 标签替换 + isCustomElement 调整

**文件：**
- 修改：`docs/components/*.md`（32 个文件）
- 修改：`docs/.vitepress/config.mts` — 从 isCustomElement 移除 view/text/image

- [ ] **步骤 1：批量替换文档 demo 中的标签**

对 `docs/components/` 下所有 .md 文件，将 demo 代码块中的标签替换：
- `<view` → `<div`（开标签）
- `</view>` → `</div>`（闭标签）
- `<text` → `<span`
- `</text>` → `</span>`
- `<image` → `<img`
- `</image>` → `</img>`（或自闭合 `<image ... />` → `<img ... />`）

**注意：**
- 只替换代码块（``` 和 ::: details 块内）的标签，不替换 prose 文字
- `<scroll-view>` 等含 view 子串的不要误替换
- button.md 中任务 4 新增的示例也需检查（应为 div/span，但如果当时用了 view 需替换）

可复用任务 1 的脚本（`packages/components/scripts/replace-tags.ts`），调整输入输出路径。

- [ ] **步骤 2：从 isCustomElement 移除 view/text/image**

修改 `docs/.vitepress/config.mts`，确认 isCustomElement 列表不含 `'view'`、`'text'`、`'image'`。

- [ ] **步骤 3：启动文档站 dev server 验证**

```bash
cd /Users/xueyang/Documents/GitHub/weui-design-vue
pnpm --filter docs dev
```

预期：dev server 正常启动，无 "Cannot find module" 报错，无 Vue 编译错误。

抽查几个页面：
- http://localhost:5174/components/progress — 确认 progress 宽度生效（div 有 display:block）
- http://localhost:5174/components/icon — 确认图标显示（span 渲染）
- http://localhost:5174/components/button — 确认按钮正常

用 StopCommand 停止 dev server。

- [ ] **步骤 4：Commit**

```bash
git add docs/components/ docs/.vitepress/config.mts
git commit -m "docs: 文档 demo 标签替换为 div/span/img，移除 isCustomElement 中的 view/text/image"
```

---

### 任务 8：重新审视 demo-row 使用 + 更新 guide 文档 + 更新 examples/uni-app

**文件：**
- 修改：`docs/components/*.md`（移除非必要的 demo-row）
- 修改：`docs/guide/getting-started.md`
- 修改：`docs/guide/customize-theme.md`（如需）
- 修改：`examples/uni-app/src/pages.json`
- 修改：`examples/uni-app/src/App.vue`

- [ ] **步骤 1：审视并移除非必要的 demo-row**

读取 `docs/.vitepress/theme/custom.css` 确认 demo-row 的定义（flex 布局）。

对 `docs/components/` 下所有 .md 文件，检查每个 `<div class="demo-row">` 的使用：
- 如果 demo-row 内只有一个组件，移除 demo-row 包裹
- 如果 demo-row 内的组件本身是通栏的（如 cell 模式按钮、cell 组件等），移除 demo-row
- 仅当确实需要横向排列多个非通栏组件时保留 demo-row（如多个 mini 按钮并排）

**判断标准：** 移除 demo-row 后，组件的默认表现是否更直观？如果是，移除。

- [ ] **步骤 2：更新 getting-started.md**

读取 `docs/guide/getting-started.md`，按规格中的"产物引用方式"章节更新内容：

- Vue 3 用户（npm 安装）：`import WeuiDesignVue from 'weui-design-vue'` + `import 'weui-design-vue/styles/weui-extra.scss'`
- uni-app 用户（easycom 引入）：easycom 配置指向 `weui-design-vue/dist/uni-app/src/$1/$1.vue`
- 移除关于 Vue3Adapter 的所有说明

- [ ] **步骤 3：更新 customize-theme.md**

读取 `docs/guide/customize-theme.md`，确认内容基于 weui.css 内置变量（任务 3 的之前工作应已完成，此处只需复核）。

- [ ] **步骤 4：更新 examples/uni-app/src/pages.json**

修改 `examples/uni-app/src/pages.json` 的 easycom.custom，将路径从源码指向产物：

```json
"easycom": {
  "autoscan": true,
  "custom": {
    "^weui-cell-group$": "weui-design-vue/dist/uni-app/src/cell/cell-group.vue",
    "^weui-checkbox-group$": "weui-design-vue/dist/uni-app/src/checkbox/checkbox-group.vue",
    "^weui-flex-item$": "weui-design-vue/dist/uni-app/src/flex/flex-item.vue",
    "^weui-grid-item$": "weui-design-vue/dist/uni-app/src/grid/grid-item.vue",
    "^weui-navbar-item$": "weui-design-vue/dist/uni-app/src/navbar/navbar-item.vue",
    "^weui-tabbar-item$": "weui-design-vue/dist/uni-app/src/tabbar/tabbar-item.vue",
    "^weui-picker-group$": "weui-design-vue/dist/uni-app/src/picker/picker-group.vue",
    "^weui-(.*)": "weui-design-vue/dist/uni-app/src/$1/$1.vue"
  }
}
```

**注意：** 在实际使用前需要先运行 `pnpm build:uni-app` 生成产物。examples/uni-app 的 dev 脚本可能需要先依赖构建。

- [ ] **步骤 5：更新 examples/uni-app/src/App.vue**

修改 `examples/uni-app/src/App.vue` 的样式 import 路径：

```vue
<style>
@import 'weui/dist/style/weui.css';
@import 'weui-design-vue/dist/uni-app/styles/weui-extra.scss';
</style>
```

- [ ] **步骤 6：Commit**

```bash
git add docs/components/ docs/guide/ examples/uni-app/src/pages.json examples/uni-app/src/App.vue
git commit -m "docs(examples): 优化 demo-row 使用，更新 guide 和 examples 指向产物路径"
```

---

### 任务 9：全量验证

**文件：** 无（仅运行验证命令）

- [ ] **步骤 1：运行单元测试**

```bash
cd /Users/xueyang/Documents/GitHub/weui-design-vue
cd packages/components && pnpm vitest run
```

预期：全部通过（数量应与改造后一致，Vue3Adapter 的 5 个测试已删除，build-plugin 新增若干测试）。

- [ ] **步骤 2：运行类型检查**

```bash
pnpm -r typecheck
```

预期：无错误。

- [ ] **步骤 3：运行构建**

```bash
cd packages/components
pnpm build
```

预期：
- `dist/vue3/index.mjs` 生成
- `dist/vue3/index.d.ts` 生成
- `dist/vue3/styles/weui-extra.scss` 生成
- `dist/uni-app/src/**/*.vue` 生成（标签已转换）
- `dist/uni-app/index.ts` 生成
- `dist/uni-app/styles/weui-extra.scss` 生成

- [ ] **步骤 4：验证产物纯净度**

```bash
# Vue 3 产物
grep -rn "uni\." dist/vue3/ && echo "FAIL: 有 uni.* 调用" || echo "OK: 无 uni.* 调用"
grep -rn "<view\|<text\|<image" dist/vue3/ && echo "FAIL: 有 view/text/image 标签" || echo "OK: 无 view/text/image 标签"
grep -rn "#ifdef\|#ifndef" dist/vue3/ && echo "FAIL: 有条件编译注释" || echo "OK: 无条件编译注释"

# uni-app 产物
grep -rn "<div\|<span\|<img" dist/uni-app/ && echo "FAIL: 有 div/span/img 标签" || echo "OK: 无 div/span/img 标签"
grep -rn "#ifdef H5" dist/uni-app/ && echo "FAIL: 有 #ifdef H5 块" || echo "OK: 无 #ifdef H5 块"
```

- [ ] **步骤 5：运行 E2E 测试**

```bash
cd /Users/xueyang/Documents/GitHub/weui-design-vue
pnpm e2e
```

预期：全部通过（examples-chromium + docs-chromium）。

- [ ] **步骤 6：手动验证文档站关键页面**

启动文档站 dev server，在浏览器中验证：
- progress 页面：进度条宽度生效（div 有 display:block）
- icon 页面：图标正常显示（span 渲染）
- button 页面：Cell/验证码/半透明三个示例正常工作
- uploader 页面：H5 环境下点击能触发文件选择对话框

- [ ] **步骤 7：验证报告**

向用户报告：
- 单元测试：X 个通过
- typecheck：无错误
- 构建：dist/vue3 和 dist/uni-app 均生成
- 产物纯净度：Vue 3 无 uni.*/view/text/image，uni-app 无 div/span/img/#ifdef H5
- E2E 测试：X 个通过
- 手动验证：progress 宽度、icon 显示、button 三场景、uploader 文件选择均正常

---

## 自检

### 1. 规格覆盖度

| 规格章节 | 对应任务 |
|---------|---------|
| 整体架构（源码用 div/span/img） | 任务 1、2 |
| 标签处理策略（自动转换 + 特殊处理） | 任务 1（批量替换）、任务 2（icon 的 `<i>`）、任务 4（打包插件转换） |
| 平台差异处理（3 处不通用点） | 任务 3 |
| 打包实现（Vite 插件 + 库模式） | 任务 4（插件）、任务 5（配置） |
| 文档站改造（删除 Vue3Adapter + 标签替换） | 任务 6（删除 Vue3Adapter）、任务 7（文档标签替换） |
| 产物引用方式 | 任务 8（更新 guide 文档） |
| demo-row 最小化 | 任务 8 |
| 现有实现处理（基于当前分支继续） | 全程 |
| 成功标准 | 任务 9（全量验证） |

无遗漏。

### 2. 占位符扫描

- 无"待定"、"TODO"、"后续实现"
- 所有代码步骤都有完整代码块
- 无"类似任务 N"的引用

### 3. 类型一致性

- `__IS_H5__` 在任务 3（globals.d.ts）、任务 4（build-plugin.ts 的 replacePlatformConstant）、任务 5（vitest.config.ts 的 define）中一致使用
- `platformTransform` 在任务 4（定义）、任务 5（vite.config.ts 引用）中一致
- `stripConditionalCompile`、`transformTemplateTags` 在任务 4（定义）、任务 5（copy-uniapp-sfc.ts 引用）中一致
- `Vue3Adapter` 在任务 6 中彻底删除，后续无引用

一致性良好。
