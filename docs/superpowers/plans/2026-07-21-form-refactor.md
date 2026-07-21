# Form 组件重构实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 基于 WeUI 官方 12 个 form 示例重构 Form 及其子组件，合并 FormPage、增强 Cell、新增 Agree 组件。

**架构：** Form 统一承载表单场景（删除 FormPage），Cell 补充 switch/vcode 内部渲染，Agree 作为独立协议勾选组件。

**技术栈：** Vue 3 + TypeScript + Vitest + Playwright

**规格文档：** `docs/superpowers/specs/2026-07-21-form-refactor-design.md`

---

### 任务 1：新增 Agree 组件（TDD）

**文件：**
- 创建：`packages/components/src/agree/agree.vue`
- 创建：`packages/components/src/agree/index.ts`
- 创建：`packages/components/src/agree/__tests__/agree.spec.ts`

- [ ] **步骤 1：编写测试**

```typescript
// packages/components/src/agree/__tests__/agree.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiAgree from '../agree.vue'

describe('WeuiAgree', () => {
  describe('基础渲染', () => {
    it('根元素为 label.weui-agree', () => {
      const wrapper = mount(WeuiAgree)
      expect(wrapper.element.tagName).toBe('LABEL')
      expect(wrapper.classes()).toContain('weui-agree')
    })

    it('包含 checkbox 和文本区域', () => {
      const wrapper = mount(WeuiAgree)
      expect(wrapper.find('.weui-agree__checkbox').exists()).toBe(true)
      expect(wrapper.find('.weui-agree__text').exists()).toBe(true)
    })

    it('默认不选中', () => {
      const wrapper = mount(WeuiAgree)
      const cb = wrapper.find('.weui-agree__checkbox')
      expect((cb.element as HTMLInputElement).checked).toBe(false)
    })
  })

  describe('modelValue', () => {
    it('modelValue=true 时 checkbox 选中', () => {
      const wrapper = mount(WeuiAgree, { props: { modelValue: true } })
      const cb = wrapper.find('.weui-agree__checkbox')
      expect((cb.element as HTMLInputElement).checked).toBe(true)
    })
  })

  describe('disabled', () => {
    it('disabled=true 时 checkbox 禁用', () => {
      const wrapper = mount(WeuiAgree, { props: { disabled: true } })
      const cb = wrapper.find('.weui-agree__checkbox')
      expect((cb.element as HTMLInputElement).disabled).toBe(true)
    })
  })

  describe('extClass', () => {
    it('extClass 追加到根元素', () => {
      const wrapper = mount(WeuiAgree, { props: { extClass: 'my-agree' } })
      expect(wrapper.classes()).toContain('my-agree')
    })
  })

  describe('default slot', () => {
    it('默认插槽内容渲染到 .weui-agree__text', () => {
      const wrapper = mount(WeuiAgree, {
        slots: { default: '同意<a href="#">相关条款</a>' },
      })
      const text = wrapper.find('.weui-agree__text')
      expect(text.html()).toContain('同意')
      expect(text.html()).toContain('相关条款')
    })
  })

  describe('事件', () => {
    it('点击 checkbox 触发 update:modelValue', async () => {
      const wrapper = mount(WeuiAgree, { props: { modelValue: false } })
      const cb = wrapper.find('.weui-agree__checkbox')
      await cb.setValue(true)
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    })

    it('点击 checkbox 触发 change', async () => {
      const wrapper = mount(WeuiAgree, { props: { modelValue: false } })
      const cb = wrapper.find('.weui-agree__checkbox')
      await cb.setValue(true)
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.emitted('change')![0]).toEqual([true])
    })
  })
})
```

- [ ] **步骤 2：运行测试确认失败**

```bash
cd packages/components && pnpm vitest run src/agree/__tests__/agree.spec.ts
```
预期：全部 FAIL

- [ ] **步骤 3：实现 Agree 组件**

```vue
<!-- packages/components/src/agree/agree.vue -->
<template>
  <label :class="rootClass">
    <input
      type="checkbox"
      class="weui-agree__checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="weui-agree__text">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiAgree',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiAgreeProps {
  modelValue?: boolean
  disabled?: boolean
  extClass?: string
}

export interface WeuiAgreeEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

const props = withDefaults(defineProps<WeuiAgreeProps>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<WeuiAgreeEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-agree', 'weui-wa-hotarea']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const handleChange = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>
```

```typescript
// packages/components/src/agree/index.ts
import type { App } from 'vue'
import WeuiAgree from './agree.vue'

WeuiAgree.install = (app: App) => {
  app.component(WeuiAgree.name!, WeuiAgree)
}

export { WeuiAgree }
export type { WeuiAgreeProps, WeuiAgreeEmits } from './agree.vue'
```

- [ ] **步骤 4：运行测试确认通过**

```bash
cd packages/components && pnpm vitest run src/agree/__tests__/agree.spec.ts
```
预期：全部 PASS

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/agree/
git commit -m "feat: add Agree component"
```

---

### 任务 2：重构 Form 组件（移除 tips，footer slot 灵活化）

**文件：**
- 修改：`packages/components/src/form/form.vue`
- 修改：`packages/components/src/form/__tests__/form.spec.ts`

- [ ] **步骤 1：更新测试（先写期望）**

```typescript
// packages/components/src/form/__tests__/form.spec.ts
// 替换整个文件
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiForm from '../form.vue'

describe('WeuiForm', () => {
  describe('基础类名', () => {
    it('始终带 weui-form 类', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.classes()).toContain('weui-form')
    })

    it('根元素为 div', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiForm, { props: { extClass: 'my-form' } })
      expect(wrapper.classes()).toContain('my-form')
    })

    it('不传 extClass 时不追加额外类名', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.classes()).toEqual(['weui-form'])
    })
  })

  describe('text-area', () => {
    it('传入 title 时渲染 .weui-form__text-area 和 .weui-form__title', () => {
      const wrapper = mount(WeuiForm, { props: { title: '表单标题' } })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      const titleEl = ta.find('.weui-form__title')
      expect(titleEl.exists()).toBe(true)
      expect(titleEl.text()).toBe('表单标题')
    })

    it('传入 desc 时渲染 .weui-form__desc', () => {
      const wrapper = mount(WeuiForm, {
        props: { title: '标题', desc: '表单描述' },
      })
      const descEl = wrapper.find('.weui-form__text-area .weui-form__desc')
      expect(descEl.exists()).toBe(true)
      expect(descEl.text()).toBe('表单描述')
    })

    it('不传 title/desc 且无 title slot 时不渲染 .weui-form__text-area', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__text-area').exists()).toBe(false)
    })

    it('仅传 desc（无 title）时也渲染 .weui-form__text-area', () => {
      const wrapper = mount(WeuiForm, { props: { desc: '只有描述' } })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      expect(ta.find('.weui-form__title').exists()).toBe(false)
      expect(ta.find('.weui-form__desc').text()).toBe('只有描述')
    })

    it('title slot 替代默认标题内容', () => {
      const wrapper = mount(WeuiForm, {
        props: { title: '默认标题' },
        slots: { title: '<div class="custom-title">自定义标题</div>' },
      })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      expect(ta.find('.custom-title').exists()).toBe(true)
      expect(ta.find('.weui-form__title').exists()).toBe(false)
    })
  })

  describe('control-area', () => {
    it('始终渲染 .weui-form__control-area', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__control-area').exists()).toBe(true)
    })

    it('default slot 内容渲染到控件区域', () => {
      const wrapper = mount(WeuiForm, {
        slots: { default: '<div class="control-content">控件内容</div>' },
      })
      const ca = wrapper.find('.weui-form__control-area')
      expect(ca.find('.control-content').exists()).toBe(true)
    })
  })

  describe('footer slot', () => {
    it('提供 footer slot 时渲染 .weui-form__ft', () => {
      const wrapper = mount(WeuiForm, {
        slots: { footer: '<div class="my-footer">底部内容</div>' },
      })
      const ft = wrapper.find('.weui-form__ft')
      expect(ft.exists()).toBe(true)
      expect(ft.find('.my-footer').exists()).toBe(true)
    })

    it('不提供 footer slot 时不渲染 .weui-form__ft', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__ft').exists()).toBe(false)
    })

    it('footer slot 内用户自行组合 tips-area 和 opr-area', () => {
      const wrapper = mount(WeuiForm, {
        slots: {
          footer: `
            <div class="weui-form__tips-area"><p class="weui-form__tips">提示</p></div>
            <div class="weui-form__opr-area"><button>确定</button></div>
          `,
        },
      })
      const ft = wrapper.find('.weui-form__ft')
      expect(ft.find('.weui-form__tips-area').exists()).toBe(true)
      expect(ft.find('.weui-form__opr-area').exists()).toBe(true)
    })

    it('footer slot 内渲染 extra-area', () => {
      const wrapper = mount(WeuiForm, {
        slots: {
          footer: '<div class="weui-form__extra-area"><div class="weui-footer">Copyright</div></div>',
        },
      })
      expect(wrapper.find('.weui-form__extra-area').exists()).toBe(true)
    })
  })
})
```

- [ ] **步骤 2：运行测试确认失败**

```bash
cd packages/components && pnpm vitest run src/form/__tests__/form.spec.ts
```
预期：部分 FAIL（tips 相关测试不再匹配旧 API）

- [ ] **步骤 3：修改 Form 组件**

```vue
<!-- packages/components/src/form/form.vue -->
<template>
  <div :class="rootClass">
    <div class="weui-form__bd">
      <div v-if="hasTitle" class="weui-form__text-area">
        <slot name="title">
          <h2 v-if="title" class="weui-form__title">{{ title }}</h2>
          <div v-if="desc" class="weui-form__desc">{{ desc }}</div>
        </slot>
      </div>
      <div class="weui-form__control-area">
        <slot />
      </div>
    </div>
    <div v-if="hasFooter" class="weui-form__ft">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiForm',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiFormProps {
  title?: string
  desc?: string
  extClass?: string
}

const props = withDefaults(defineProps<WeuiFormProps>(), {
  title: undefined,
  desc: undefined,
  extClass: undefined,
})

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-form']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasTitle = computed(() => Boolean(props.title || props.desc || slots.title))
const hasFooter = computed(() => Boolean(slots.footer))
</script>
```

- [ ] **步骤 4：运行测试确认通过**

```bash
cd packages/components && pnpm vitest run src/form/__tests__/form.spec.ts
```
预期：全部 PASS

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/form/form.vue packages/components/src/form/__tests__/form.spec.ts
git commit -m "refactor(form): remove tips prop, make footer slot flexible

- Remove tips prop and tips slot (users compose tips-area in footer slot)
- Footer slot renders directly inside weui-form__ft, users freely combine
  tips-area, opr-area, and extra-area
- Align with WeUI official form structure"
```

---

### 任务 3：Cell 组件增强（switch 渲染 + vcode slot）

**文件：**
- 修改：`packages/components/src/cell/cell.vue`
- 修改：`packages/components/src/cell/__tests__/cell.spec.ts`

- [ ] **步骤 1：更新 cell 测试（新增 switch/vcode 测试用例）**

```typescript
// 在 packages/components/src/cell/__tests__/cell.spec.ts 末尾追加
// 替换原有的 variant=switch 和 vcode 测试

describe('switch variant', () => {
  it('variant=switch 时在 __ft 渲染 input.weui-switch', () => {
    const wrapper = mount(WeuiCell, { props: { variant: 'switch' } })
    const sw = wrapper.find('.weui-cell__ft .weui-switch')
    expect(sw.exists()).toBe(true)
    expect(sw.attributes('type')).toBe('checkbox')
  })

  it('switchModelValue 控制 switch 选中状态', () => {
    const wrapper = mount(WeuiCell, {
      props: { variant: 'switch', switchModelValue: true },
    })
    const sw = wrapper.find('.weui-switch')
    expect((sw.element as HTMLInputElement).checked).toBe(true)
  })

  it('switchDisabled 禁用 switch', () => {
    const wrapper = mount(WeuiCell, {
      props: { variant: 'switch', switchDisabled: true },
    })
    const sw = wrapper.find('.weui-switch')
    expect((sw.element as HTMLInputElement).disabled).toBe(true)
  })

  it('switchCp=true 渲染 weui-switch-cp 兼容版', () => {
    const wrapper = mount(WeuiCell, {
      props: { variant: 'switch', switchCp: true, switchModelValue: true },
    })
    const cp = wrapper.find('.weui-switch-cp')
    expect(cp.exists()).toBe(true)
    expect(cp.find('.weui-switch-cp__input').exists()).toBe(true)
    expect(cp.find('.weui-switch-cp__box').exists()).toBe(true)
  })

  it('switch 变化时触发 update:switchModelValue', async () => {
    const wrapper = mount(WeuiCell, {
      props: { variant: 'switch', switchModelValue: false },
    })
    const sw = wrapper.find('.weui-switch')
    await sw.setValue(true)
    expect(wrapper.emitted('update:switchModelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:switchModelValue')![0]).toEqual([true])
  })
})

describe('vcode variant', () => {
  it('variant=vcode 时 bd 追加 weui-flex 类', () => {
    const wrapper = mount(WeuiCell, { props: { variant: 'vcode' } })
    const bd = wrapper.find('.weui-cell__bd')
    expect(bd.classes()).toContain('weui-flex')
  })

  it('variant=vcode 时可使用 vcode slot', () => {
    const wrapper = mount(WeuiCell, {
      props: { variant: 'vcode' },
      slots: { vcode: '<button class="vcode-btn">获取验证码</button>' },
    })
    expect(wrapper.find('.vcode-btn').exists()).toBe(true)
  })
})
```

需要替换原 variant 测试中的 switch 和 vcode 测试（第 120-128 行），移除旧测试，保留其他 variant 测试。

- [ ] **步骤 2：运行测试确认失败**

```bash
cd packages/components && pnpm vitest run src/cell/__tests__/cell.spec.ts
```
预期：switch/vcode 相关新测试 FAIL

- [ ] **步骤 3：修改 Cell 组件**

```vue
<!-- 修改 packages/components/src/cell/cell.vue template 中的 bd 和 ft 区域 -->

<!-- bd 区域：vcode variant 时使用 weui-flex 布局 -->
<div v-if="hasBody" :class="bdClass">
  <template v-if="value">{{ value }}</template>
  <slot v-else />
  <slot v-if="variant === 'vcode'" name="vcode" />
</div>

<!-- ft 区域：switch variant 时渲染 switch input -->
<div v-if="hasFooter" :class="footerClass">
  <template v-if="variant === 'switch'">
    <span v-if="switchCp" class="weui-switch-cp">
      <input
        class="weui-switch-cp__input"
        type="checkbox"
        :checked="switchModelValue"
        :disabled="switchDisabled"
        @change="onSwitchChange"
      />
      <div class="weui-switch-cp__box"></div>
    </span>
    <input
      v-else
      type="checkbox"
      class="weui-switch"
      :checked="switchModelValue"
      :disabled="switchDisabled"
      @change="onSwitchChange"
    />
  </template>
  <template v-else-if="footer">{{ footer }}</template>
  <slot v-else name="footer" />
</div>
```

在 script 中添加 props 和 emits：

```typescript
// 新增到 WeuiCellProps interface
switchModelValue?: boolean
switchDisabled?: boolean
switchCp?: boolean

// 新增到 withDefaults
switchModelValue: false,
switchDisabled: false,
switchCp: false,

// 新增到 emit 类型
export interface WeuiCellEmits {
  // ...existing
  (e: 'update:switchModelValue', value: boolean): void
}

// 新增方法
const onSwitchChange = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:switchModelValue', checked)
}
```

修改 bdClass computed（vcode 时追加 weui-flex）：

```typescript
const bdClass = computed(() => {
  const classes: string[] = ['weui-cell__bd']
  if (props.variant === 'vcode') classes.push('weui-flex')
  if (props.bodyClass) classes.push(props.bodyClass)
  return classes
})
```

- [ ] **步骤 4：运行测试确认通过**

```bash
cd packages/components && pnpm vitest run src/cell/__tests__/cell.spec.ts
```
预期：全部 PASS

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/cell/cell.vue packages/components/src/cell/__tests__/cell.spec.ts
git commit -m "feat(cell): render switch input for switch variant, add vcode slot

- variant=switch: render input.weui-switch in __ft with v-model support
- switchCp prop for weui-switch-cp compatibility variant
- variant=vcode: add vcode slot in __bd, auto-apply weui-flex class"
```

---

### 任务 4：更新导出（移除 FormPage，新增 Agree）

**文件：**
- 修改：`packages/components/src/index.ts`

- [ ] **步骤 1：修改 index.ts**

移除 FormPage 相关行，新增 Agree：

```typescript
// 删除行 21: import { WeuiFormPage } from './form-page'
// 删除行 67: import type { WeuiFormPageProps } from './form-page'
// 删除行 99 + 123: WeuiFormPage from components arrays
// 删除行 153: WeuiFormPageProps from type exports

// 新增（在布局容器 import 区域）：
import { WeuiAgree } from './agree'

// 新增到 components 数组
WeuiAgree,

// 新增到 export { ... }
WeuiAgree,

// 新增到 type export
WeuiAgreeProps, WeuiAgreeEmits,

// 新增 type import（在表单输入区域）：
import type { WeuiAgreeProps, WeuiAgreeEmits } from './agree'
```

- [ ] **步骤 2：运行 typecheck 确认无错误**

```bash
cd packages/components && pnpm typecheck
```

- [ ] **步骤 3：Commit**

```bash
git add packages/components/src/index.ts
git commit -m "refactor: remove FormPage exports, add Agree exports"
```

---

### 任务 5：删除 FormPage 源文件和相关引用

**文件：**
- 删除：`packages/components/src/form-page/form-page.vue`
- 删除：`packages/components/src/form-page/index.ts`
- 删除：`packages/components/src/form-page/__tests__/form-page.spec.ts`
- 删除：`docs/components/form-page.md`
- 删除：`tests/e2e-docs/form-page.spec.ts`
- 删除：`tests/e2e/form-page.spec.ts`
- 修改：`docs/.vitepress/config.mts`
- 修改：`examples/uni-app/src/pages.json`

- [ ] **步骤 1：删除 FormPage 源文件**

```bash
rm packages/components/src/form-page/form-page.vue
rm packages/components/src/form-page/index.ts
rm packages/components/src/form-page/__tests__/form-page.spec.ts
rm docs/components/form-page.md
rm tests/e2e-docs/form-page.spec.ts
rm tests/e2e/form-page.spec.ts
```

- [ ] **步骤 2：更新 VitePress 侧边栏配置**

修改 `docs/.vitepress/config.mts`：
- 删除侧边栏中 `{ text: 'FormPage 表单页', link: '/components/form-page' }`
- 添加 `{ text: 'Agree 协议勾选', link: '/components/agree' }` 到表单组件分组

- [ ] **步骤 3：更新 uni-app pages.json**

修改 `examples/uni-app/src/pages.json`：
- 删除 form-page 页面配置（第 178-183 行）
- 将 form-page 页面文件内容更新为使用 WeuiForm 的示例

```bash
# 修改 form-page 目录为 form（保留 uni-app 示例页面，但使用 weui-form）
cd examples/uni-app/src/pages/form-page
# 将 weui-form-page 标签替换为 weui-form
```

- [ ] **步骤 4：运行 vitest + typecheck 确认**

```bash
cd packages/components && pnpm vitest run && pnpm typecheck
```

- [ ] **步骤 5：Commit**

```bash
git add -A
git commit -m "refactor: delete FormPage component, update references

- Delete form-page source, tests, and docs
- Update VitePress sidebar to remove FormPage, add Agree
- Update uni-app pages.json to remove form-page route"
```

---

### 任务 6：重写 form 文档

**文件：**
- 修改：`docs/components/form.md`

- [ ] **步骤 1：重写 form.md**

基于设计文档 7.1 节，编写 5 个 demo 的 form 文档：
1. 基础表单结构（title + desc + cells + tips + button + extra-area）
2. 输入框状态（warn / readonly / disabled cell）
3. 验证码表单（vcode cell + Agree）
4. 复选框表单（CheckboxGroup + Agree in tips）
5. 底部悬浮（weui-bottom-fixed-opr-page + Agree）

每个 demo 展示完整的 `weui-form` 结构，footer slot 中组合 tips-area / opr-area / extra-area。

- [ ] **步骤 2：创建 agree 文档**

创建 `docs/components/agree.md`，包含基础用法 demo。

- [ ] **步骤 3：Commit**

```bash
git add docs/components/form.md docs/components/agree.md
git commit -m "docs: rewrite form docs, add agree docs"
```

---

### 任务 7：E2E 测试

**文件：**
- 修改：`tests/e2e-docs/form.spec.ts`（如果有）
- 创建：`tests/e2e-docs/agree.spec.ts`
- 修改：`tests/e2e/cell.spec.ts`（新增 switch/vcode 测试）

- [ ] **步骤 1：更新 form E2E 测试**

如果存在，更新 form E2E 测试的选择器和断言以匹配新的 demo 结构。

- [ ] **步骤 2：新增 agree E2E 测试**

验证 Agree 组件在文档页正常渲染、可点击切换。

- [ ] **步骤 3：新增 cell switch/vcode E2E 测试**

- [ ] **步骤 4：运行全量 E2E 确认**

```bash
pnpm e2e
```

- [ ] **步骤 5：Commit**

```bash
git add tests/
git commit -m "test: update form e2e, add agree and cell switch/vcode e2e tests"
```

---

### 任务 8：全量验证

- [ ] **步骤 1：运行单元测试**

```bash
cd packages/components && pnpm vitest run
```
预期：全部通过（约 890+ 测试）

- [ ] **步骤 2：运行 typecheck**

```bash
pnpm -r typecheck
```
预期：无错误

- [ ] **步骤 3：运行构建**

```bash
cd packages/components && pnpm build
```
预期：Vue 3 和 uni-app 产物构建成功

- [ ] **步骤 4：运行 E2E 测试**

```bash
pnpm e2e
```
预期：全部通过（约 524 测试）

- [ ] **步骤 5：Commit**

```bash
git add -A
git commit -m "chore: final validation - all tests pass after form refactor"
```
