# H5 表单组件兼容性根因修复 — 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 修复 input / checkbox / searchbar / uploader / gallery 五个组件在 VitePress 文档站（H5 环境）的可交互性根因，让所有 demo 在浏览器中可正常操作。

**架构：** 组件源码一套代码三端可用（小程序 / uni-app H5 / 纯 Vue 3）。模板内用 `v-if="__IS_H5__"` 切换标签，脚本内用 `// #ifdef H5` 注释条件编译处理平台差异。修复 vitest 测试环境的 `__IS_H5__` 替换问题，让模板内 `__IS_H5__` 在测试中也生效。缺样式统一补在 `weui-extra.scss`。

**技术栈：** Vue 3 + uni-app 条件编译 + Vite + vitest + @vue/test-utils + Playwright E2E

**规格说明：** [docs/superpowers/specs/2026-07-18-h5-form-components-compatibility-design.md](file:///e:/Code/weui/docs/superpowers/specs/2026-07-18-h5-form-components-compatibility-design.md)

---

## 文件结构

### 修改的文件

| 文件 | 职责 |
|---|---|
| `packages/components/vitest.config.ts` | 修复测试环境 `__IS_H5__` 在 SFC 模板中的替换 |
| `packages/components/src/styles/weui-extra.scss` | 补全 `.weui-icon-clear`/`.weui-search-bar__btn`/`.weui-uploader__tips`/`.weui-uploader__file-delete` 样式 |
| `packages/components/src/input/input.vue` | H5 端用 ref+watch 实现 focus，移除 uni-app 专有属性，H5 端绑 keydown.enter |
| `packages/components/src/input/__tests__/input.spec.ts` | 修正 type=password 断言、新增 focus/keydown.enter 测试 |
| `packages/components/src/checkbox/checkbox.vue` | H5 端用 `<input type="checkbox/radio">` 替代 uni 标签，新增 onH5Change 调用 group.toggle |
| `packages/components/src/checkbox/checkbox-group.vue` | H5 端不渲染原生 group，provide toggle 方法给子项 |
| `packages/components/src/checkbox/__tests__/checkbox.spec.ts` | 修正断言（H5 端渲染 input 而非 checkbox 标签） |
| `packages/components/src/checkbox/__tests__/checkbox-group.spec.ts` | 修正断言（H5 端不渲染 checkbox-group 标签） |
| `packages/components/src/searchbar/searchbar.vue` | H5 端 ref+watch focus，handleBlur 有值保持聚焦态，handleSearch 聚焦输入框 |
| `packages/components/src/searchbar/__tests__/searchbar.spec.ts` | 修正 blur 断言（有值时保持 focusing），新增 search 后聚焦测试 |
| `packages/components/src/uploader/uploader.vue` | H5 端文件 × 删除按钮，小程序端自动 tips「长按图片可删除」 |
| `packages/components/src/uploader/__tests__/uploader.spec.ts` | 修正「不再渲染原生 input」断言（实际应渲染），新增 × 按钮测试 |
| `packages/components/src/gallery/gallery.vue` | 小程序端调用 uni.previewImage，H5 端保留现有 UI |
| `packages/components/src/gallery/__tests__/gallery.spec.ts` | 新增小程序端 uni.previewImage 调用测试 |
| `docs/components/input.md` | 移除「自动聚焦无效」相关说明 |
| `docs/components/checkbox.md` | 移除「浏览器环境说明」tip |
| `docs/components/searchbar.md` | 移除「点击搜索未聚焦」相关说明 |
| `docs/components/uploader.md` | 移除「浏览器环境说明」tip，preview 接 Gallery.show |
| `docs/components/gallery.md` | 新增小程序端 uni.previewImage 说明 |
| `tests/e2e-docs/input.spec.ts` | 新增清除按钮、focus 聚焦测试 |
| `tests/e2e-docs/checkbox.spec.ts` | 新增单选/多选切换、值变化测试 |
| `tests/e2e-docs/searchbar.spec.ts` | 新增点击搜索后聚焦、有值失焦保持展开测试 |
| `tests/e2e-docs/uploader.spec.ts` | 新增 × 删除按钮、preview 触发 gallery 测试 |

---

## 任务 0：修复 vitest 测试环境 __IS_H5__ 模板替换

**问题背景：** vitest 中 `define: { __IS_H5__: true }` 只在脚本中生效，SFC 模板编译后 `__IS_H5__` 被当作组件实例属性访问（undefined）。导致 `v-if="__IS_H5__"` 永远走 v-else 分支，测试实际跑的是非 H5 路径。uploader.vue 现有 `<input v-if="__IS_H5__">` 在测试中从未被渲染（既有 bug）。

**修复方案：** 在 vitest.config.ts 中加载 platformTransform 插件（platform: 'vue3'），让测试时也执行条件编译移除 + `__IS_H5__` 替换。这样 SFC 源码在 vite 编译前就被替换为字面量 true。

**文件：**
- 修改：`packages/components/vitest.config.ts`

- [ ] **步骤 1：修改 vitest.config.ts 加入 platformTransform 插件**

```ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { platformTransform } from './build-plugin'

// uni-app 原生组件标签，在测试环境中标记为自定义元素
// 注意：H5 端不渲染这些标签（用 v-if="__IS_H5__" 切换为 input/div），
// 但保留列表以防有遗漏的非 H5 路径
const uniAppCustomElements = [
  'checkbox', 'radio', 'checkbox-group', 'radio-group',
  'switch', 'slider', 'picker', 'picker-view', 'picker-view-column',
  'editor', 'camera', 'live-player', 'live-pusher',
  'open-data', 'web-view', 'ad', 'official-account',
  'navigator',
]

export default defineConfig({
  plugins: [
    // 测试时也运行平台转换：__IS_H5__ 替换为 true，移除非 H5 条件编译块
    // 使用 enforce: 'pre' 让本插件在 @vitejs/plugin-vue 解析 SFC 之前运行
    {
      ...platformTransform({ platform: 'vue3' }),
      enforce: 'pre',
    },
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => uniAppCustomElements.includes(tag),
        },
      },
    }),
  ],
  define: {
    __IS_H5__: true,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: [
      'src/**/__tests__/**/*.spec.ts',
      'src/**/__tests__/**/*.test.ts',
      '../../tests/components/**/*.test.ts',
    ],
  },
})
```

- [ ] **步骤 2：运行现有测试验证不破坏**

运行：`cd packages/components && pnpm vitest run`
预期：可能有测试失败（之前测试基于「模板 __IS_H5__ 为 false」假设），需在后续任务中逐个修正。先记录失败列表。

实际：先跑一次记录基线，本步骤只确认 vitest.config.ts 修改不导致编译错误。

运行：`cd packages/components && pnpm vitest run src/uploader/__tests__/uploader.spec.ts -t "不再渲染" 2>&1 | Select-String "Test Files|Tests"`
预期：FAIL（因为现在 `__IS_H5__` 为 true，input 会被渲染）。

- [ ] **步骤 3：Commit**

```bash
git add packages/components/vitest.config.ts
git commit -m "test(vitest): 启用 platformTransform 让 __IS_H5__ 在 SFC 模板中生效"
```

---

## 任务 1：weui-extra.scss 补全缺失样式

**文件：**
- 修改：`packages/components/src/styles/weui-extra.scss`

- [ ] **步骤 1：重写 weui-extra.scss，分节整理 + 新增补丁**

```scss
// weui-extra.scss
// weui.css 不包含的自定义类样式 与 weui.css 规则补丁
// 由使用方在 App.vue 全局引入（与 weui.css 一起）

// ============================================================================
// 章节 1：weui.css 规则补丁
// weui.css 中存在但规则不全的类，补全后让组件在 H5 端正常显示
// weui 升级后若已修复，可删除对应补丁
// ============================================================================

// input 清除按钮：weui.css 仅提供 mask-image + color，缺尺寸/背景
.weui-icon-clear {
  width: 16px;
  height: 16px;
  background-color: currentColor;
  // mask-image 已由 weui.css 提供
}

// searchbar 搜索按钮：weui.css 未设 flex 居中
.weui-search-bar__btn {
  display: flex;
  align-items: center;
}

// ============================================================================
// 章节 2：weui.css 不含的自定义类
// 属于 weui-miniprogram 仓库，weui npm 包不含
// ============================================================================

// cell 组件图标
.weui-cell__icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
}

// list 组件
.weui-list {
  margin-top: 8px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scaleY(0.5);
    transform-origin: 0 0;
    z-index: 2;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scaleY(0.5);
    transform-origin: 0 100%;
    z-index: 2;
  }
}
.weui-list__title {
  margin-top: 16px;
  margin-bottom: 3px;
  padding-left: 16px;
  padding-right: 16px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  line-height: 1.4;

  & + .weui-list {
    margin-top: 0;
  }
}
.weui-list__tips {
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.5);
  padding-left: 16px;
  padding-right: 16px;
  font-size: 14px;
  line-height: 1.4;
}

// slideview 组件
.weui-slideview {
  position: relative;
  overflow: hidden;
}
.weui-slideview__left {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}
.weui-slideview__right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
}
.weui-slideview__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 100%;
  color: #fff;
  font-size: 14px;
  background: #c7c7cc;
}
.weui-slideview__btn_warn {
  background: #fa5151;
}
.weui-slideview_show .weui-slideview__left {
  transform: translateX(-100%);
}

// uploader 组件提示文字
.weui-uploader__tips {
  margin-top: 8px;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  line-height: 1.4;
}

// uploader 文件删除按钮（仅 H5 端渲染，小程序端用长按）
.weui-uploader__file-delete {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
  line-height: 1;
  border-radius: 50%;
  z-index: 2;
}
```

- [ ] **步骤 2：Commit**

```bash
git add packages/components/src/styles/weui-extra.scss
git commit -m "style(weui-extra): 补全 icon-clear/search-bar__btn/uploader__tips 样式"
```

---

## 任务 2：Input 组件 H5 兼容改造

**文件：**
- 修改：`packages/components/src/input/input.vue`
- 修改：`packages/components/src/input/__tests__/input.spec.ts`

- [ ] **步骤 1：编写失败测试 — type=password 在 H5 端应渲染为 type=password**

在 `packages/components/src/input/__tests__/input.spec.ts` 的 `describe('type')` 内替换现有 password 测试：

```ts
    it('type=password 时 H5 端 input type 为 password（无 password 属性）', () => {
      const wrapper = mount(WeuiInput, { props: { type: 'password' } })
      expect(wrapper.find('input').attributes('type')).toBe('password')
      expect(wrapper.find('input').attributes('password')).toBeUndefined()
    })

    it('type=idcard 时 H5 端降级为 text', () => {
      const wrapper = mount(WeuiInput, { props: { type: 'idcard' } })
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })

    it('type=digit 时 H5 端降级为 text', () => {
      const wrapper = mount(WeuiInput, { props: { type: 'digit' } })
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })
```

并删除旧的「type=idcard」「type=digit」「type=password 时 input type 为 text 且带 password 属性」「非 password 类型时不渲染 password 属性」四个测试。

- [ ] **步骤 2：运行测试验证失败**

运行：`cd packages/components && pnpm vitest run src/input/__tests__/input.spec.ts`
预期：FAIL（password 测试失败，因为现有实现 type=password 时 input type 为 text）

- [ ] **步骤 3：编写失败测试 — focus 在 H5 端应调用 DOM focus()**

在 `describe('focus')` 中新增：

```ts
    it('focus=true 时 H5 端调用 DOM focus()', async () => {
      const wrapper = mount(WeuiInput, { props: { focus: false } })
      const inputEl = wrapper.find('input').element as HTMLInputElement
      const focusSpy = vi.spyOn(inputEl, 'focus')
      await wrapper.setProps({ focus: true })
      expect(focusSpy).toHaveBeenCalledTimes(1)
    })

    it('focus 从 true 变 false 时调用 DOM blur()', async () => {
      const wrapper = mount(WeuiInput, { props: { focus: true } })
      const inputEl = wrapper.find('input').element as HTMLInputElement
      const blurSpy = vi.spyOn(inputEl, 'blur')
      await wrapper.setProps({ focus: false })
      expect(blurSpy).toHaveBeenCalledTimes(1)
    })
```

在文件顶部 import 中加入 `vi`：

```ts
import { describe, it, expect, vi } from 'vitest'
```

- [ ] **步骤 4：运行测试验证失败**

运行：`cd packages/components && pnpm vitest run src/input/__tests__/input.spec.ts -t "focus=true 时 H5"`
预期：FAIL（focusSpy 未被调用）

- [ ] **步骤 5：编写失败测试 — H5 端 keydown.enter 触发 confirm**

在 `describe('事件透传')` 中替换 confirm 测试：

```ts
    it('H5 端按 Enter 触发 confirm 事件', async () => {
      const wrapper = mount(WeuiInput)
      await wrapper.find('input').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('confirm')).toHaveLength(1)
    })
```

删除旧的「confirm 事件透传」测试（用 `trigger('confirm')` 的）。

- [ ] **步骤 6：运行测试验证失败**

运行：`cd packages/components && pnpm vitest run src/input/__tests__/input.spec.ts -t "H5 端按 Enter"`
预期：FAIL（confirm 未被 emit）

- [ ] **步骤 7：实现 input.vue 改造**

完整替换 `packages/components/src/input/input.vue`：

```vue
<template>
  <div :class="rootClass">
    <input
      ref="inputRef"
      class="weui-input"
      :value="modelValue"
      :type="htmlInputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="handleConfirm"
    />
    <div
      v-if="showClear"
      class="weui-icon-clear"
      @click="handleClear"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiInput',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export interface WeuiInputProps {
  /** v-model 绑定值 */
  modelValue?: string
  /** 占位提示文字 */
  placeholder?: string
  /** 输入类型，password 时使用原生 password 类型；idcard/digit 在 H5 端降级为 text */
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'password'
  /** 是否禁用 */
  disabled?: boolean
  /** 最大输入长度，-1 为不限制 */
  maxlength?: number
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 获取焦点（H5 端通过 ref.focus() 实现；小程序端通过 :focus 属性） */
  focus?: boolean
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'confirm', event: Event): void
  (e: 'clear'): void
}

const props = withDefaults(defineProps<WeuiInputProps>(), {
  modelValue: '',
  placeholder: undefined,
  type: 'text',
  disabled: false,
  maxlength: 140,
  clearable: false,
  focus: false,
  extClass: undefined,
})

const emit = defineEmits<WeuiInputEmits>()

const inputRef = ref<HTMLInputElement | null>(null)

const rootClass = computed(() => {
  const classes: string[] = ['weui-input']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

// H5 端 type 映射：password 保持 password，idcard/digit 降级为 text
// （与 uni-app 编译 H5 时的行为一致）
const htmlInputType = computed(() => {
  if (props.type === 'password') return 'password'
  if (props.type === 'idcard' || props.type === 'digit') return 'text'
  return props.type
})

const showClear = computed(
  () => props.clearable && !!props.modelValue && !props.disabled,
)

// H5 端：focus prop 变化时调用 DOM focus()/blur()
// 小程序端：build-plugin 会移除此 watch 块，改用 :focus 属性
// #ifdef H5
watch(() => props.focus, (val) => {
  if (val) inputRef.value?.focus()
  else inputRef.value?.blur()
}, { immediate: true })
// #endif

const handleInput = (event: Event) => {
  const e = event as Event & { detail?: { value?: string } }
  const value = e.detail?.value ?? (event.target as HTMLInputElement)?.value ?? ''
  emit('update:modelValue', value)
}

const handleFocus = (event: Event) => emit('focus', event)
const handleBlur = (event: Event) => emit('blur', event)

// H5 端：keydown.enter 触发 confirm
// 小程序端：build-plugin 会移除此 handler，由 @confirm 事件触发
const handleConfirm = (event: Event) => emit('confirm', event)

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>
```

注意：由于 vitest 测试环境已用 platformTransform（vue3 平台），`// #ifdef H5` 块会保留，`// #ifndef H5` 块会被移除。但这里没有 `// #ifndef H5` 块，模板统一用 HTML 标签。小程序端 build 时，`<input>` 标签会被 build-plugin 保留（TAG_MAP 只映射 div/span/img），uni-app 编译器把 `<input>` 当作 uni-app input 组件处理。

但是 `<input type="password">` 在 uni-app 小程序端会作为 uni input 组件（type=password 不被支持）。需要在非 H5 端用 `:password` 属性 + `type="text"`。

**修正方案** — 模板用 `v-if="__IS_H5__"` 切换 type 绑定：

```vue
<template>
  <div :class="rootClass">
    <input
      ref="inputRef"
      class="weui-input"
      :value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      v-bind="uniOnlyAttrs"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="handleConfirm"
      @confirm="handleConfirm"
    />
    <div
      v-if="showClear"
      class="weui-icon-clear"
      @click="handleClear"
    />
  </div>
</template>
```

其中：

```ts
// H5 端 type 映射
const inputType = computed(() => {
  if (props.type === 'password') {
    // H5: type="password"；非 H5: uni input 不支持 password type，用 text + password 属性
    return __IS_H5__ ? 'password' : 'text'
  }
  if (props.type === 'idcard' || props.type === 'digit') {
    // H5 端降级为 text；非 H5 端保留 uni 类型
    return __IS_H5__ ? 'text' : props.type
  }
  return props.type
})

// 非 H5 端专属属性（password/confirm-type）
const uniOnlyAttrs = computed(() => {
  if (__IS_H5__) return {}
  const attrs: Record<string, string> = {}
  if (props.type === 'password') attrs['password'] = 'true'
  attrs['confirm-type'] = 'done'
  return attrs
})
```

- [ ] **步骤 8：运行测试验证通过**

运行：`cd packages/components && pnpm vitest run src/input/__tests__/input.spec.ts`
预期：PASS（所有测试通过）

- [ ] **步骤 9：Commit**

```bash
git add packages/components/src/input/input.vue packages/components/src/input/__tests__/input.spec.ts
git commit -m "feat(input): H5 端用 ref+watch 实现 focus，keydown.enter 触发 confirm"
```

---

## 任务 3：Checkbox 组件 H5 兼容改造

**文件：**
- 修改：`packages/components/src/checkbox/checkbox.vue`
- 修改：`packages/components/src/checkbox/checkbox-group.vue`
- 修改：`packages/components/src/checkbox/__tests__/checkbox.spec.ts`
- 修改：`packages/components/src/checkbox/__tests__/checkbox-group.spec.ts`

- [ ] **步骤 1：编写失败测试 — H5 端渲染 input[type=checkbox] 而非 checkbox 标签**

在 `packages/components/src/checkbox/__tests__/checkbox.spec.ts` 中替换 `describe('多选模式（multi=true，默认）')` 第一个测试：

```ts
    it('H5 端 checkbox 渲染为 input[type=checkbox] 在 header 区域', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
      })
      const hd = wrapper.find('.weui-cell__hd')
      expect(hd.exists()).toBe(true)
      const checkboxEl = hd.find('input[type="checkbox"]')
      expect(checkboxEl.exists()).toBe(true)
      expect(checkboxEl.classes()).toContain('weui-check')
      expect(hd.find('.weui-icon-checked').exists()).toBe(true)
    })
```

替换 `describe('单选模式（multi=false，通过 group 注入）')` 第一个测试：

```ts
    it('H5 端 radio 渲染为 input[type=radio] 在 footer 区域', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
        global: { provide: groupProvide },
      })
      const ft = wrapper.find('.weui-cell__ft')
      expect(ft.exists()).toBe(true)
      const radioEl = ft.find('input[type="radio"]')
      expect(radioEl.exists()).toBe(true)
      expect(radioEl.classes()).toContain('weui-check')
      expect(ft.find('.weui-icon-checked').exists()).toBe(true)
    })
```

替换 `describe('选中状态')` 中所有 `wrapper.find('checkbox')` 为 `wrapper.find('input[type="checkbox"]')`：

```ts
    it('独立使用时 checked=true', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: true },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeDefined()
    })

    it('独立使用时 checked=false（默认）', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
      })
      // input[type=checkbox] 的 checked 属性绑定 false 时不存在该属性
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeUndefined()
    })

    it('在 group 中根据 modelValue 判断选中', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '2', label: '选项B' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              multi: { value: true },
              modelValue: { value: ['1', '2'] },
              disabled: { value: false },
            },
          },
        },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeDefined()
    })

    it('在 group 中 value 不在 modelValue 中时未选中', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '3', label: '选项C' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              multi: { value: true },
              modelValue: { value: ['1', '2'] },
              disabled: { value: false },
            },
          },
        },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeUndefined()
    })
```

替换 `describe('禁用状态')` 中 `wrapper.find('checkbox').attributes('disabled')` 测试：

```ts
    it('disabled=true 时 checkbox 传递 disabled 属性', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', disabled: true },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined()
    })

    it('group disabled=true 时子项也禁用', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              multi: { value: true },
              modelValue: { value: [] },
              disabled: { value: true },
            },
          },
        },
      })
      expect(wrapper.classes()).toContain('weui-cell_disabled')
      expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined()
    })
```

- [ ] **步骤 2：编写失败测试 — H5 端 group 不渲染 checkbox-group 标签**

在 `packages/components/src/checkbox/__tests__/checkbox-group.spec.ts` 中替换 `describe('multi')`：

```ts
  describe('multi', () => {
    it('multi=true（默认）H5 端不渲染 checkbox-group 标签 + weui-cells_checkbox', () => {
      const wrapper = mount(WeuiCheckboxGroup)
      expect(wrapper.find('checkbox-group').exists()).toBe(false)
      expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_checkbox')
      expect(wrapper.find('.weui-cells').classes()).not.toContain('weui-cells_radio')
    })

    it('multi=false H5 端不渲染 radio-group 标签 + weui-cells_radio', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { multi: false },
      })
      expect(wrapper.find('radio-group').exists()).toBe(false)
      expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_radio')
      expect(wrapper.find('.weui-cells').classes()).not.toContain('weui-cells_checkbox')
    })
  })
```

替换 `describe('change 事件')` 为 H5 端 toggle 方式：

```ts
  describe('H5 端 toggle 联动', () => {
    it('multi 模式下子项 toggle 调用更新 modelValue', async () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: '<weui-checkbox value="1" label="A" /><weui-checkbox value="2" label="B" />',
        },
        global: {
          components: { 'weui-checkbox': WeuiCheckbox },
        },
      })
      // 点击第一个 checkbox 的 input
      const checkboxes = wrapper.findAll('input[type="checkbox"]')
      await checkboxes[0].trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([['1']])
      expect(wrapper.emitted('change')![0]).toEqual([['1']])
    })

    it('multi 模式下再次点击同一项取消选中', async () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { modelValue: ['1'] },
        slots: {
          default: '<weui-checkbox value="1" label="A" />',
        },
        global: {
          components: { 'weui-checkbox': WeuiCheckbox },
        },
      })
      await wrapper.find('input[type="checkbox"]').trigger('change')
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([[]])
    })

    it('单选模式下 toggle 替换为单值数组', async () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { multi: false, modelValue: [] },
        slots: {
          default: '<weui-checkbox value="1" label="A" /><weui-checkbox value="2" label="B" />',
        },
        global: {
          components: { 'weui-checkbox': WeuiCheckbox },
        },
      })
      const radios = wrapper.findAll('input[type="radio"]')
      await radios[1].trigger('change')
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([['2']])
    })
  })
```

在文件顶部 import 中加入 WeuiCheckbox：

```ts
import WeuiCheckboxGroup from '../checkbox-group.vue'
import WeuiCheckbox from '../checkbox.vue'
```

删除原 `describe('change 事件')` 块（用 dispatchEvent 的）。

- [ ] **步骤 3：运行测试验证失败**

运行：`cd packages/components && pnpm vitest run src/checkbox/__tests__/`
预期：FAIL（现有源码渲染 `<checkbox>` 而非 `<input type="checkbox">`）

- [ ] **步骤 4：实现 checkbox-group.vue 改造**

完整替换 `packages/components/src/checkbox/checkbox-group.vue`：

```vue
<template>
  <div :class="groupClass" :aria-role="ariaRole">
    <div v-if="title" class="weui-cells__title">{{ title }}</div>
    <div :class="cellsClass">
      <!-- #ifndef H5 -->
      <checkbox-group v-if="multi" @change="onChange">
        <slot />
      </checkbox-group>
      <radio-group v-else @change="onChange">
        <slot />
      </radio-group>
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <slot />
      <!-- #endif -->
    </div>
    <div v-if="footer" class="weui-cells__tips">{{ footer }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiCheckboxGroup',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, provide } from 'vue'

export interface WeuiCheckboxGroupProps {
  /** 选中项的 value 数组（v-model） */
  modelValue?: string[]
  /** true=多选（checkbox），false=单选（radio） */
  multi?: boolean
  /** 是否禁用全部子项 */
  disabled?: boolean
  /** 组标题 */
  title?: string
  /** 组底部说明文字 */
  footer?: string
  /** 是否为表单型组 */
  form?: boolean
  /** 根元素扩展类名 */
  extClass?: string
  /** 根元素 aria-role */
  ariaRole?: string
}

export interface WeuiCheckboxGroupEmits {
  (e: 'update:modelValue', value: string[]): void
  (e: 'change', value: string[]): void
}

const props = withDefaults(defineProps<WeuiCheckboxGroupProps>(), {
  modelValue: () => [],
  multi: true,
  disabled: false,
  title: undefined,
  footer: undefined,
  form: false,
  extClass: undefined,
  ariaRole: undefined,
})

const emit = defineEmits<WeuiCheckboxGroupEmits>()

const groupClass = computed(() => {
  const classes: string[] = ['weui-cells__group']
  if (props.form) classes.push('weui-cells__group_form')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const cellsClass = computed(() => {
  const classes: string[] = ['weui-cells', 'weui-cells_after-title']
  if (props.multi) classes.push('weui-cells_checkbox')
  else classes.push('weui-cells_radio')
  if (props.form) classes.push('weui-cells_form')
  return classes
})

// 非 H5 端：checkbox-group/radio-group 原生 change 事件处理
const onChange = (event: { detail?: { value?: string | string[] } }) => {
  const raw = event.detail?.value ?? []
  const arr = Array.isArray(raw) ? raw : [raw]
  emit('update:modelValue', arr)
  emit('change', arr)
}

// H5 端：group 自身管理子项选中（无原生 group 联动）
// #ifdef H5
const toggle = (value: string) => {
  if (props.multi) {
    const set = new Set(props.modelValue)
    if (set.has(value)) set.delete(value)
    else set.add(value)
    const arr = Array.from(set)
    emit('update:modelValue', arr)
    emit('change', arr)
  } else {
    emit('update:modelValue', [value])
    emit('change', [value])
  }
}
// #endif

provide('weuiCheckboxGroup', {
  multi: computed(() => props.multi),
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  // #ifdef H5
  toggle,
  // #endif
})
</script>
```

- [ ] **步骤 5：实现 checkbox.vue 改造**

完整替换 `packages/components/src/checkbox/checkbox.vue`：

```vue
<template>
  <label :class="rootClass" @click="handleClick">
    <div v-if="multi" class="weui-cell__hd">
      <!-- #ifdef H5 -->
      <input
        type="checkbox"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        @change.stop="onH5Change"
      />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <checkbox
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
      />
      <!-- #endif -->
      <div class="weui-icon-checked" />
    </div>
    <div class="weui-cell__bd">
      <slot>{{ label }}</slot>
    </div>
    <div v-if="!multi" class="weui-cell__ft">
      <!-- #ifdef H5 -->
      <input
        type="radio"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        @change.stop="onH5Change"
      />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <radio
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
      />
      <!-- #endif -->
      <div class="weui-icon-checked" />
    </div>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiCheckbox',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'

export interface WeuiCheckboxProps {
  /** checkbox 标识值，change 事件返回此值 */
  value: string
  /** 显示文字 */
  label?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 独立使用时的选中状态（在 group 中由 group 的 modelValue 控制） */
  checked?: boolean
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiCheckboxEmits {
  (e: 'update:checked', value: boolean): void
  (e: 'change', value: boolean): void
}

const props = withDefaults(defineProps<WeuiCheckboxProps>(), {
  label: '',
  disabled: false,
  checked: false,
  extClass: undefined,
})

const emit = defineEmits<WeuiCheckboxEmits>()

interface CheckboxGroupContext {
  multi: { value: boolean }
  modelValue: { value: string[] }
  disabled: { value: boolean }
  // H5 端独有：toggle 方法
  toggle?: (value: string) => void
}

const group = inject<CheckboxGroupContext | null>('weuiCheckboxGroup', null)

const multi = computed(() => group?.multi.value ?? true)
const isChecked = computed(() => {
  if (group) return group.modelValue.value.includes(props.value)
  return props.checked
})
const isDisabled = computed(() => props.disabled || (group?.disabled.value ?? false))

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active', 'weui-check__label']
  if (isDisabled.value) classes.push('weui-cell_disabled')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const handleClick = () => {
  // group 模式由 group 控制，不处理独立切换
  if (group) return
  const newChecked = !isChecked.value
  emit('update:checked', newChecked)
  emit('change', newChecked)
}

// #ifdef H5
// H5 端：input change 事件触发 group.toggle
const onH5Change = () => {
  if (group?.toggle) group.toggle(props.value)
}
// #endif
</script>
```

- [ ] **步骤 6：运行测试验证通过**

运行：`cd packages/components && pnpm vitest run src/checkbox/__tests__/`
预期：PASS

- [ ] **步骤 7：Commit**

```bash
git add packages/components/src/checkbox/
git commit -m "feat(checkbox): H5 端用 input[type=checkbox/radio] + group.toggle 联动"
```

---

## 任务 4：Searchbar 组件改造

**文件：**
- 修改：`packages/components/src/searchbar/searchbar.vue`
- 修改：`packages/components/src/searchbar/__tests__/searchbar.spec.ts`

- [ ] **步骤 1：编写失败测试 — 有值时 blur 保持 focusing**

在 `packages/components/src/searchbar/__tests__/searchbar.spec.ts` 的 `describe('聚焦状态')` 中替换 blur 测试：

```ts
    it('blur 事件移除 weui-search-bar_focusing 类（无值时）', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
      await wrapper.find('input').trigger('blur')
      expect(wrapper.classes()).not.toContain('weui-search-bar_focusing')
    })

    it('有值时 blur 保持 weui-search-bar_focusing 类', async () => {
      const wrapper = mount(WeuiSearchbar, { props: { modelValue: 'hello' } })
      await wrapper.find('input').trigger('focus')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
      await wrapper.find('input').trigger('blur')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
    })
```

修改「blur 后再次点击 label」测试为「无值场景」：

```ts
    it('无值 blur 后再次点击 label 仍能进入聚焦状态', async () => {
      const wrapper = mount(WeuiSearchbar)
      // 第一次点击 label 聚焦
      await wrapper.find('.weui-search-bar__label').trigger('click')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
      // blur 后聚焦被重置（无值时）
      await wrapper.find('input').trigger('blur')
      expect(wrapper.classes()).not.toContain('weui-search-bar_focusing')
      // 二次点击 label 仍能进入聚焦状态
      await wrapper.find('.weui-search-bar__label').trigger('click')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
    })
```

- [ ] **步骤 2：编写失败测试 — 点击搜索按钮后聚焦**

在 `describe('搜索按钮')` 中新增：

```ts
    it('点击搜索按钮后进入聚焦状态', async () => {
      const wrapper = mount(WeuiSearchbar, {
        props: { modelValue: 'keyword', searchButtonText: '搜索' },
      })
      await wrapper.find('.weui-search-bar__btn').trigger('click')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
    })

    it('点击搜索按钮后调用 input DOM focus()', async () => {
      const wrapper = mount(WeuiSearchbar, {
        props: { modelValue: 'keyword', searchButtonText: '搜索' },
      })
      const inputEl = wrapper.find('input').element as HTMLInputElement
      const focusSpy = vi.spyOn(inputEl, 'focus')
      await wrapper.find('.weui-search-bar__btn').trigger('click')
      expect(focusSpy).toHaveBeenCalledTimes(1)
    })
```

在文件顶部 import 加入 `vi`：

```ts
import { describe, it, expect, vi } from 'vitest'
```

- [ ] **步骤 3：编写失败测试 — confirm 用 keydown.enter**

替换 `describe('confirm 与 search 事件')`：

```ts
  describe('confirm 与 search 事件', () => {
    it('H5 端按 Enter 触发 confirm 事件', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('confirm')).toHaveLength(1)
    })

    it('H5 端按 Enter 同时触发 search 事件并携带当前值', async () => {
      const wrapper = mount(WeuiSearchbar, { props: { modelValue: 'hello' } })
      await wrapper.find('input').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('search')).toHaveLength(1)
      expect(wrapper.emitted('search')![0]).toEqual(['hello'])
    })
  })
```

- [ ] **步骤 4：运行测试验证失败**

运行：`cd packages/components && pnpm vitest run src/searchbar/__tests__/searchbar.spec.ts`
预期：FAIL

- [ ] **步骤 5：实现 searchbar.vue 改造**

完整替换 `packages/components/src/searchbar/searchbar.vue`：

```vue
<template>
  <div :class="rootClass">
    <div class="weui-search-bar__form">
      <div class="weui-search-bar__box">
        <div class="weui-icon-search" />
        <input
          ref="inputRef"
          class="weui-search-bar__input"
          :value="modelValue"
          :type="inputType"
          :placeholder="placeholder"
          v-bind="uniOnlyAttrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown.enter="handleConfirm"
          @confirm="handleConfirm"
        />
        <div
          v-if="showClear"
          class="weui-icon-clear"
          @click="handleClear"
        />
      </div>
      <div class="weui-search-bar__label" @click="handleLabelClick">
        <div class="weui-icon-search" />
        <span>{{ placeholder }}</span>
      </div>
    </div>
    <div
      v-if="showCancelButton"
      class="weui-search-bar__cancel-btn"
      @click="handleCancel"
    >{{ cancelText }}</div>
    <div
      v-if="searchButtonText"
      class="weui-search-bar__btn"
      @click="handleSearch"
    >{{ searchButtonText }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiSearchbar',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface WeuiSearchbarProps {
  /** v-model 绑定值 */
  modelValue?: string
  /** 占位提示文字 */
  placeholder?: string
  /** 取消按钮文字 */
  cancelText?: string
  /** 是否自动聚焦 */
  focus?: boolean
  /** 搜索按钮文字，不设置则不显示搜索按钮，只显示取消按钮 */
  searchButtonText?: string
  /** 根元素扩展类名 */
  extClass?: string
}

export interface WeuiSearchbarEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'confirm', event: Event): void
  (e: 'cancel'): void
  (e: 'clear'): void
  (e: 'search', value: string): void
}

const props = withDefaults(defineProps<WeuiSearchbarProps>(), {
  modelValue: '',
  placeholder: '搜索',
  cancelText: '取消',
  focus: false,
  searchButtonText: undefined,
  extClass: undefined,
})

const emit = defineEmits<WeuiSearchbarEmits>()

const inputRef = ref<HTMLInputElement | null>(null)

/** 输入框是否聚焦（视觉状态，有值时 blur 后保持 true） */
const focused = ref(props.focus)

const rootClass = computed(() => {
  const classes: string[] = ['weui-search-bar']
  if (focused.value) classes.push('weui-search-bar_focusing')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const showClear = computed(() => !!props.modelValue)
const showCancelButton = computed(() => focused.value && !props.searchButtonText)

// H5 端 input type（searchbar 固定 text，但保留 computed 便于扩展）
const inputType = computed(() => 'text')

// 非 H5 端专属属性
const uniOnlyAttrs = computed(() => {
  if (__IS_H5__) return {}
  return { 'confirm-type': 'search' }
})

// H5 端：focus prop 变化时调用 DOM focus()/blur()
// #ifdef H5
watch(() => props.focus, (val) => {
  focused.value = val
  if (val) inputRef.value?.focus()
  else inputRef.value?.blur()
}, { immediate: true })
// #endif
// #ifndef H5
watch(() => props.focus, (val) => {
  focused.value = val
})
// #endif

const handleInput = (event: Event) => {
  const e = event as Event & { detail?: { value?: string } }
  const value = e.detail?.value ?? (event.target as HTMLInputElement)?.value ?? ''
  emit('update:modelValue', value)
}

const handleFocus = (event: Event) => {
  focused.value = true
  emit('focus', event)
}

const handleBlur = (event: Event) => {
  // 有值时保持聚焦态外观（不"回复原样"）
  if (!props.modelValue) {
    focused.value = false
  }
  emit('blur', event)
}

const handleConfirm = (event: Event) => {
  emit('confirm', event)
  emit('search', props.modelValue)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const handleCancel = () => {
  focused.value = false
  emit('cancel')
}

const handleSearch = () => {
  emit('search', props.modelValue)
  // 点击搜索按钮后聚焦输入框（让用户能继续输入新关键词）
  focused.value = true
  // #ifdef H5
  inputRef.value?.focus()
  // #endif
}

const handleLabelClick = () => {
  focused.value = true
  // #ifdef H5
  inputRef.value?.focus()
  // #endif
}
</script>
```

注意：`inputFocus` ref 已移除（H5 端不再需要 `:focus` 属性，直接调 DOM）。

- [ ] **步骤 6：运行测试验证通过**

运行：`cd packages/components && pnpm vitest run src/searchbar/__tests__/searchbar.spec.ts`
预期：PASS

- [ ] **步骤 7：Commit**

```bash
git add packages/components/src/searchbar/
git commit -m "feat(searchbar): 有值时 blur 保持聚焦态，点击搜索后聚焦输入框"
```

---

## 任务 5：Uploader 组件改造

**文件：**
- 修改：`packages/components/src/uploader/uploader.vue`
- 修改：`packages/components/src/uploader/__tests__/uploader.spec.ts`

- [ ] **步骤 1：修正失败测试 — H5 端应渲染原生 input[type=file]**

在 `packages/components/src/uploader/__tests__/uploader.spec.ts` 中替换「上传按钮区域不再渲染原生 input」测试：

```ts
    it('H5 端上传按钮区域渲染原生 input[type=file]', () => {
      const wrapper = mount(WeuiUploader)
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.exists()).toBe(true)
      expect(fileInput.classes()).toContain('weui-uploader__input')
    })
```

- [ ] **步骤 2：编写失败测试 — H5 端文件 × 删除按钮**

在 `describe('files 文件列表')` 后新增 `describe('H5 端删除按钮')`：

```ts
  describe('H5 端删除按钮', () => {
    it('H5 端每个文件渲染 × 删除按钮', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      })
      expect(wrapper.findAll('.weui-uploader__file-delete')).toHaveLength(2)
    })

    it('点击 × 按钮触发 delete 事件并阻止冒泡', async () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      })
      const deleteBtns = wrapper.findAll('.weui-uploader__file-delete')
      await deleteBtns[0].trigger('click')
      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('delete')![0]).toEqual([{ url: 'a.jpg' }, 0])
      // 不应触发 preview（点击 × 不应冒泡到 file 的 click）
      expect(wrapper.emitted('preview')).toBeFalsy()
    })
  })
```

修改原 `describe('delete 事件')` 为非 H5 路径（保留 longpress 但 H5 测试不触发）：

```ts
  describe('delete 事件', () => {
    it('H5 端通过 × 按钮触发 delete', async () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      })
      const deleteBtns = wrapper.findAll('.weui-uploader__file-delete')
      await deleteBtns[1].trigger('click')
      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('delete')![0]).toEqual([{ url: 'b.jpg' }, 1])
    })
  })
```

删除原「长按文件时触发 delete」测试（H5 端不再用 longpress）。

- [ ] **步骤 3：运行测试验证失败**

运行：`cd packages/components && pnpm vitest run src/uploader/__tests__/uploader.spec.ts`
预期：FAIL

- [ ] **步骤 4：实现 uploader.vue 改造**

修改 `packages/components/src/uploader/uploader.vue` 的模板部分：

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
          <!-- #ifndef H5 -->
          @longpress="handleDelete(file, index)"
          <!-- #endif -->
        >
          <div
            v-if="hasStatusOverlay(file)"
            class="weui-uploader__file-content"
          >{{ resolveStatusText(file) }}</div>
          <!-- #ifdef H5 -->
          <div
            class="weui-uploader__file-delete"
            @click.stop="handleDelete(file, index)"
          >×</div>
          <!-- #endif -->
        </div>
      </div>

      <div v-if="canUpload" class="weui-uploader__input-box" @click="handleChoose">
        <input
          v-if="__IS_H5__"
          ref="fileInput"
          type="file"
          class="weui-uploader__input"
          @change="handleFileChange"
        />
        <div v-else class="weui-uploader__input" />
      </div>
    </div>

    <div v-if="tips" class="weui-uploader__tips">{{ tips }}</div>
    <!-- #ifndef H5 -->
    <div v-else-if="files.length > 0" class="weui-uploader__tips">长按图片可删除</div>
    <!-- #endif -->

    <slot />
  </div>
</template>
```

脚本部分保持不变（已有 `// #ifdef H5` 块处理 handleChoose 与 handleFileChange）。

注意：模板内的 `<!-- #ifdef H5 -->` 是 HTML 注释形式条件编译。但 vitest.config.ts 现在启用了 platformTransform（vue3），build-plugin 的 stripConditionalCompile 只处理 `//` 注释形式，不处理 `<!-- -->` 形式。

**修正：模板内条件编译改用 `v-if="__IS_H5__"`**。修改模板：

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
          v-bind="fileEvents(file, index)"
        >
          <div
            v-if="hasStatusOverlay(file)"
            class="weui-uploader__file-content"
          >{{ resolveStatusText(file) }}</div>
          <div
            v-if="__IS_H5__"
            class="weui-uploader__file-delete"
            @click.stop="handleDelete(file, index)"
          >×</div>
        </div>
      </div>

      <div v-if="canUpload" class="weui-uploader__input-box" @click="handleChoose">
        <input
          v-if="__IS_H5__"
          ref="fileInput"
          type="file"
          class="weui-uploader__input"
          @change="handleFileChange"
        />
        <div v-else class="weui-uploader__input" />
      </div>
    </div>

    <div v-if="tips" class="weui-uploader__tips">{{ tips }}</div>
    <div v-else-if="!__IS_H5__ && files.length > 0" class="weui-uploader__tips">长按图片可删除</div>

    <slot />
  </div>
</template>
```

在脚本中新增 `fileEvents` computed：

```ts
// 非 H5 端：longpress 事件绑定
const fileEvents = (_file: UploaderFile, _index: number) => {
  // #ifndef H5
  return {
    onLongpress: () => handleDelete(_file, _index),
  }
  // #endif
  // #ifdef H5
  return {}
  // #endif
}
```

注意：Vue 3 模板中 `v-bind="obj"` 中 `onLongpress` 会被识别为 `longpress` 事件。但在 H5 端浏览器无 longpress 事件，所以即使绑定也无害。可简化为统一返回 longpress 绑定（H5 端不触发就算了）：

```ts
const fileEvents = (file: UploaderFile, index: number) => ({
  onLongpress: () => handleDelete(file, index),
})
```

无需条件编译，更简洁。

- [ ] **步骤 5：运行测试验证通过**

运行：`cd packages/components && pnpm vitest run src/uploader/__tests__/uploader.spec.ts`
预期：PASS

- [ ] **步骤 6：Commit**

```bash
git add packages/components/src/uploader/
git commit -m "feat(uploader): H5 端 × 删除按钮，小程序端自动 tips 长按删除"
```

---

## 任务 6：Gallery 组件小程序端适配

**文件：**
- 修改：`packages/components/src/gallery/gallery.vue`
- 修改：`packages/components/src/gallery/__tests__/gallery.spec.ts`

- [ ] **步骤 1：查看现有 gallery 测试** 

运行：`cd packages/components && pnpm vitest run src/gallery/__tests__/gallery.spec.ts --reporter=verbose 2>&1 | Select-String "✓|✗" | Select-Object -First 30`

记录当前通过的测试列表，本任务只新增不破坏。

- [ ] **步骤 2：编写失败测试 — 非 H5 端 visible=true 调用 uni.previewImage**

在 `packages/components/src/gallery/__tests__/gallery.spec.ts` 顶部新增 mock：

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

const mockPreviewImage = vi.fn()
vi.stubGlobal('uni', {
  previewImage: mockPreviewImage,
})
```

在 describe 末尾新增：

```ts
  describe('小程序端适配（非 H5）', () => {
    // 注：vitest 中 __IS_H5__ = true，无法直接测试非 H5 路径
    // 非 H5 路径由 build-plugin 在构建时处理，单元测试不覆盖
    // 此处仅验证 H5 端不调用 uni.previewImage
    it('H5 端 visible=true 时不调用 uni.previewImage', async () => {
      mockPreviewImage.mockReset()
      const wrapper = mount(WeuiGallery, {
        props: { visible: false, src: 'test.jpg' },
      })
      await wrapper.setProps({ visible: true })
      expect(mockPreviewImage).not.toHaveBeenCalled()
    })
  })
```

- [ ] **步骤 3：运行测试验证**

运行：`cd packages/components && pnpm vitest run src/gallery/__tests__/gallery.spec.ts`
预期：PASS（H5 端不调用 uni.previewImage 是当前行为）

注：非 H5 端的 uni.previewImage 调用由 `// #ifndef H5` 条件编译处理，构建时才会生效。单元测试环境（H5）不覆盖该路径，依赖 E2E 与手动验证。

- [ ] **步骤 4：实现 gallery.vue 改造**

修改 `packages/components/src/gallery/gallery.vue` 的 watch：

```ts
watch(
  () => props.visible,
  (val) => {
    // #ifdef H5
    if (val) {
      // 显示：先挂载外层，下一 tick 触发淡入
      wrapperShow.value = true
      showTimer = setTimeout(() => {
        innerShow.value = true
      }, 16)
    } else if (wrapperShow.value) {
      // 隐藏：先触发淡出，动画结束后卸载外层
      innerShow.value = false
      hideTimer = setTimeout(() => {
        wrapperShow.value = false
      }, 300)
    }
    // #endif
    // #ifndef H5
    if (val) {
      // 小程序端调用 uni.previewImage，无删除按钮
      uni.previewImage({
        urls: props.src ? [props.src] : [],
        complete: () => {
          emit('update:visible', false)
          emit('hide')
          emit('weui-close')
        },
      })
    }
    // #endif
  },
  { immediate: true },
)
```

模板不变（H5 端正常渲染，非 H5 端 wrapperShow 始终为 false，模板不渲染）。

- [ ] **步骤 5：运行测试验证通过**

运行：`cd packages/components && pnpm vitest run src/gallery/__tests__/gallery.spec.ts`
预期：PASS

- [ ] **步骤 6：Commit**

```bash
git add packages/components/src/gallery/
git commit -m "feat(gallery): 小程序端调用 uni.previewImage，H5 端保留现有 UI"
```

---

## 任务 7：文档示例更新

**文件：**
- 修改：`docs/components/input.md`
- 修改：`docs/components/checkbox.md`
- 修改：`docs/components/searchbar.md`
- 修改：`docs/components/uploader.md`
- 修改：`docs/components/gallery.md`

- [ ] **步骤 1：更新 input.md**

无需改动（现有 demo 已可交互）。仅确认无「自动聚焦无效」相关说明。

运行：`git diff docs/components/input.md`
预期：无 diff

- [ ] **步骤 2：更新 checkbox.md**

移除文档顶部「::: tip 浏览器环境说明」整段（line 15-17 区域）。

打开 `docs/components/checkbox.md`，删除：

```markdown
::: tip 浏览器环境说明
`CheckboxGroup` 依赖 uni-app 的原生 `checkbox-group`/`radio-group` 组件实现选中联动，在浏览器中文档演示仅展示初始渲染状态，交互请在 uni-app 环境中体验。`Checkbox` 独立使用时在浏览器中可正常交互。
:::
```

- [ ] **步骤 3：更新 searchbar.md**

无需改动。仅确认无「点击搜索未聚焦」相关说明。

- [ ] **步骤 4：更新 uploader.md**

打开 `docs/components/uploader.md`，做以下改动：

1. 移除文档顶部「::: tip 浏览器环境说明」整段（line 44-46）

2. 在 `<script setup>` 中加入 Gallery import：

```ts
import { Gallery } from 'weui-design-vue'
```

3. 修改 `onPreview` 实现：

```ts
const onPreview = (file: UploaderFile, index: number) => {
  lastEvent.value = `preview: 预览第 ${index + 1} 个文件`
  Gallery.show({
    src: file.url,
    showDelete: true,
  }).promise.then((result) => {
    if (result === 'delete') {
      onDelete(file, index)
    }
  })
}
```

4. 在第一个 demo-block 前（基础用法上方）加入 overlay-host：

```markdown
<weui-overlay-host />
```

- [ ] **步骤 5：更新 gallery.md**

在文档底部「Attributes」之前新增说明章节：

```markdown
## 跨端说明

- **H5 端**：组件渲染完整 UI（图片 + 删除按钮），通过 `visible` / `src` / `showDelete` 控制
- **小程序端**：调用 `uni.previewImage` 系统预览，**删除按钮能力不生效**（uni.previewImage 不支持自定义操作）。如需删除，请在调用方（如 uploader）使用长按交互
```

- [ ] **步骤 6：Commit**

```bash
git add docs/components/
git commit -m "docs: 更新 input/checkbox/searchbar/uploader/gallery 文档示例"
```

---

## 任务 8：E2E 测试更新

**文件：**
- 修改：`tests/e2e-docs/input.spec.ts`
- 修改：`tests/e2e-docs/checkbox.spec.ts`
- 修改：`tests/e2e-docs/searchbar.spec.ts`
- 修改：`tests/e2e-docs/uploader.spec.ts`

- [ ] **步骤 1：查看现有 E2E 测试结构**

运行：`cd e:\Code\weui && pnpm e2e tests/e2e-docs/input.spec.ts --reporter=line 2>&1 | Select-Object -Last 20`

记录现有测试通过情况。

- [ ] **步骤 2：新增 input E2E 测试 — 清除按钮可点击**

在 `tests/e2e-docs/input.spec.ts` 末尾新增：

```ts
import { expect } from '@playwright/test'
import { test } from './helpers'

test.describe('Input 清除按钮', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/input')
  })

  test('点击清除按钮清空输入', async ({ page }) => {
    const demo = page.locator('.demo-block').filter({ hasText: '当前值：' }).first()
    const input = demo.locator('input').first()
    await input.fill('hello')
    await expect(demo).toContainText('当前值：hello')
    await demo.locator('.weui-icon-clear').click()
    await expect(demo).toContainText('当前值：')
  })
})

test.describe('Input 自动聚焦', () => {
  test('点击聚焦按钮后 input 获得焦点', async ({ page }) => {
    const demo = page.locator('.demo-block').filter({ hasText: '聚焦输入框' }).first()
    await demo.locator('weui-button:has-text("聚焦输入框")').click()
    const input = demo.locator('input').first()
    await expect(input).toBeFocused()
  })
})
```

注：具体选择器需根据 docs/components/input.md 实际结构调整。先打开文档站手动确认选择器。

- [ ] **步骤 3：新增 checkbox E2E 测试 — 多选切换**

在 `tests/e2e-docs/checkbox.spec.ts` 末尾新增：

```ts
test.describe('Checkbox 多选交互', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/checkbox')
  })

  test('点击 checkbox 切换选中状态', async ({ page }) => {
    const demo = page.locator('.demo-block').filter({ hasText: '选中状态' }).first()
    const checkbox = demo.locator('input[type="checkbox"]').first()
    await checkbox.click()
    // 验证选中态（weui CSS 通过 :checked 触发样式）
    await expect(checkbox).toBeChecked()
  })
})
```

- [ ] **步骤 4：新增 searchbar E2E 测试 — 点击搜索后聚焦**

在 `tests/e2e-docs/searchbar.spec.ts` 末尾新增：

```ts
test.describe('Searchbar 搜索按钮', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/searchbar')
  })

  test('点击搜索按钮后 input 获得焦点', async ({ page }) => {
    const demo = page.locator('.demo-block').filter({ hasText: '搜索按钮' }).first()
    await demo.locator('.weui-search-bar__btn').click()
    await expect(demo.locator('input').first()).toBeFocused()
  })
})
```

- [ ] **步骤 5：新增 uploader E2E 测试 — × 删除按钮**

在 `tests/e2e-docs/uploader.spec.ts` 末尾新增：

```ts
test.describe('Uploader H5 删除按钮', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/uploader')
  })

  test('点击 × 按钮触发 delete 事件', async ({ page }) => {
    const demo = page.locator('.demo-block').first()
    const initialFileCount = await demo.locator('.weui-uploader__file').count()
    expect(initialFileCount).toBeGreaterThan(0)
    await demo.locator('.weui-uploader__file-delete').first().click()
    // 验证 lastEvent 区域包含 delete 字样
    await expect(page.locator('text=/delete:/')).toBeVisible()
  })
})
```

- [ ] **步骤 6：运行全部 E2E 测试**

运行：`cd e:\Code\weui && pnpm e2e`
预期：所有测试通过

如有失败，调整选择器或修复源码。

- [ ] **步骤 7：Commit**

```bash
git add tests/e2e-docs/
git commit -m "test(e2e): 新增 input/checkbox/searchbar/uploader H5 交互测试"
```

---

## 任务 9：全量验证

- [ ] **步骤 1：运行单元测试**

运行：`cd packages/components && pnpm vitest run`
预期：所有测试通过

- [ ] **步骤 2：运行类型检查**

运行：`cd e:\Code\weui && pnpm -r typecheck`
预期：无错误

- [ ] **步骤 3：运行 E2E 测试**

运行：`cd e:\Code\weui && pnpm e2e`
预期：所有测试通过

- [ ] **步骤 4：手动验证文档站**

运行：`cd docs && pnpm dev`

打开 http://localhost:5174 验证：
- input 清除按钮可见且可点击
- input 自动聚焦按钮工作
- checkbox 多选/单选可切换
- searchbar 点击搜索后聚焦
- searchbar 有值时 blur 保持展开态
- uploader × 删除按钮工作
- uploader preview 触发 gallery 显示

- [ ] **步骤 5：验证结果报告**

向用户报告：
- 单元测试：X 个通过
- typecheck：无错误
- E2E 测试：X 个通过

---

## 自检

**1. 规格覆盖度：**

| 规格章节 | 对应任务 |
|---|---|
| 一、背景与问题（input/checkbox/searchbar/uploader/gallery） | 任务 2-6 |
| 二、设计原则（一套代码三端、完全可交互、weui-extra.scss 补丁） | 任务 0-6 |
| 三、各组件改动设计 — 1. Input | 任务 2 |
| 三、各组件改动设计 — 2. Checkbox | 任务 3 |
| 三、各组件改动设计 — 3. Searchbar | 任务 4 |
| 三、各组件改动设计 — 4. Uploader | 任务 5 |
| 三、各组件改动设计 — 5. Gallery | 任务 6 |
| 四、weui-extra.scss 整理 | 任务 1 |
| 五、文档示例改动 | 任务 7 |
| 六、影响范围与风险 | 各任务中体现 |
| 七、验证策略 | 任务 9 |
| 八、不在本次范围 | 不需要任务 |
| 九、实施顺序建议 | 任务 0-9 顺序 |

**遗漏：** 任务 0（vitest.config.ts 修复）是规格未提及但实施中发现的必要前置任务，已添加。

**2. 占位符扫描：** 无 TODO/待定。所有步骤都有具体代码。

**3. 类型一致性：** 
- `CheckboxGroupContext.toggle?: (value: string) => void` — 任务 3 中 checkbox.vue 与 checkbox-group.vue 一致
- `onH5Change` — 任务 3 中 checkbox.vue 一致
- `inputRef` — 任务 2/4 中命名一致
- `fileEvents` — 任务 5 中一致
- `__IS_H5__` — 全局常量，所有任务一致

**4. 模糊性检查：** 
- 任务 5 中 `fileEvents` 简化为统一返回 onLongpress（H5 端无害），明确无歧义
- 任务 6 中非 H5 端测试覆盖问题已说明（依赖 E2E）

自检通过。

---

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/2026-07-18-h5-form-components-compatibility.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
