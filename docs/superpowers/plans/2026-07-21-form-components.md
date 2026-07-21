# 表单组件封装实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）逐任务实现此计划。

**目标：** 将高频复用的表单子元素封装为 9 个独立组件，Cell 回归纯 CSS 布局容器，Checkbox 拆出 radio 模式。

**架构：** FormGroup/Control/Tips/Opr/Extra 为纯容器组件，Textarea/Switch/Select/Radio 各自渲染 weui-cell 结构。

**技术栈：** Vue 3 + TypeScript + Vitest + Playwright

**规格文档：** `docs/superpowers/specs/2026-07-21-form-components-design.md`

---

## 文件清单

### 创建
| 路径 | 说明 |
|------|------|
| `packages/components/src/form-group/form-group.vue` | cells__group_form 容器 |
| `packages/components/src/form-group/index.ts` | 导出 |
| `packages/components/src/form-control/form-control.vue` | control-area 容器 |
| `packages/components/src/form-control/index.ts` | 导出 |
| `packages/components/src/form-tips/form-tips.vue` | tips-area 容器 |
| `packages/components/src/form-tips/index.ts` | 导出 |
| `packages/components/src/form-opr/form-opr.vue` | opr-area 容器 |
| `packages/components/src/form-opr/index.ts` | 导出 |
| `packages/components/src/form-extra/form-extra.vue` | extra-area 容器 |
| `packages/components/src/form-extra/index.ts` | 导出 |
| `packages/components/src/textarea/textarea.vue` | 文本域 + counter |
| `packages/components/src/textarea/index.ts` | 导出 |
| `packages/components/src/textarea/__tests__/textarea.spec.ts` | 测试 |
| `packages/components/src/switch-ctrl/switch-ctrl.vue` | 开关组件 |
| `packages/components/src/switch-ctrl/index.ts` | 导出 |
| `packages/components/src/switch-ctrl/__tests__/switch-ctrl.spec.ts` | 测试 |
| `packages/components/src/select/select.vue` | 选择框组件 |
| `packages/components/src/select/index.ts` | 导出 |
| `packages/components/src/select/__tests__/select.spec.ts` | 测试 |
| `packages/components/src/radio/radio.vue` | 单选按钮 |
| `packages/components/src/radio/radio-group.vue` | 单选框组 |
| `packages/components/src/radio/index.ts` | 导出 |
| `packages/components/src/radio/__tests__/radio.spec.ts` | 测试 |

### 修改
| 文件 | 变更 |
|------|------|
| `cell/cell.vue` | 移除 switch/select 渲染 + 相关 props/emits |
| `cell/__tests__/cell.spec.ts` | 移除 switch/select/vcode 测试 |
| `checkbox/checkbox.vue` | 移除 radio 模式（保留 checkbox 仅 multi=true） |
| `checkbox/checkbox-group.vue` | 移除 radio-group 分支（仅保留 checkbox-group） |
| `checkbox/__tests__/checkbox.spec.ts` | 移除 radio 相关测试 |
| `checkbox/__tests__/checkbox-group.spec.ts` | 移除 radio-group 相关测试 |
| `index.ts` | 新增 export 9 个组件，移除 radio 类型导出 |
| `docs/components/form.md` | 用新组件重写 demo |
| `docs/.vitepress/config.mts` | 侧边栏新增组件 |

---

### 任务 1：创建 5 个简单表单容器组件

**文件：**
- 创建：`packages/components/src/form-group/form-group.vue`
- 创建：`packages/components/src/form-group/index.ts`
- 创建：`packages/components/src/form-control/form-control.vue`
- 创建：`packages/components/src/form-control/index.ts`
- 创建：`packages/components/src/form-tips/form-tips.vue`
- 创建：`packages/components/src/form-tips/index.ts`
- 创建：`packages/components/src/form-opr/form-opr.vue`
- 创建：`packages/components/src/form-opr/index.ts`
- 创建：`packages/components/src/form-extra/form-extra.vue`
- 创建：`packages/components/src/form-extra/index.ts`

- [ ] **步骤 1：创建 FormGroup 组件**

```vue
<!-- packages/components/src/form-group/form-group.vue -->
<template>
  <div :class="rootClass">
    <div v-if="hasTitle" class="weui-cells__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
    <div v-if="hasTips" class="weui-cells__tips">
      <slot name="tips">{{ tips }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFormGroup',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface WeuiFormGroupProps {
  title?: string
  tips?: string
  extClass?: string
}

const props = withDefaults(defineProps<WeuiFormGroupProps>(), {
  title: undefined,
  tips: undefined,
  extClass: undefined,
})

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-cells__group', 'weui-cells__group_form']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const hasTitle = computed(() => Boolean(props.title || slots.title))
const hasTips = computed(() => Boolean(props.tips || slots.tips))
</script>
```

```typescript
// packages/components/src/form-group/index.ts
import type { App } from 'vue'
import WeuiFormGroup from './form-group.vue'

WeuiFormGroup.install = (app: App) => {
  app.component(WeuiFormGroup.name!, WeuiFormGroup)
}

export { WeuiFormGroup }
export type { WeuiFormGroupProps } from './form-group.vue'
```

- [ ] **步骤 2：创建 FormControl 组件**

```vue
<template>
  <div :class="['weui-form__control-area', extClass].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiFormControl',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
export interface WeuiFormControlProps {
  extClass?: string
}

defineProps<WeuiFormControlProps>()
</script>
```

```typescript
export { WeuiFormControl } from './form-control.vue'
export type { WeuiFormControlProps } from './form-control.vue'
```

- [ ] **步骤 3：创建 FormTips / FormOpr / FormExtra 组件**

```vue
<!-- form-tips.vue -->
<template>
  <div :class="['weui-form__tips-area', extClass].filter(Boolean).join(' ')">
    <p class="weui-form__tips"><slot /></p>
  </div>
</template>

<!-- form-opr.vue -->
<template>
  <div :class="['weui-form__opr-area', extClass].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>

<!-- form-extra.vue -->
<template>
  <div :class="['weui-form__extra-area', extClass].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>
```

每个组件需要独立的 `.vue` + `index.ts` + 标准 options block。

- [ ] **步骤 4：验证 typecheck**

```bash
cd packages/components && pnpm typecheck
```

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/form-group/ packages/components/src/form-control/ packages/components/src/form-tips/ packages/components/src/form-opr/ packages/components/src/form-extra/
git commit -m "feat: add form container sub-components (Group/Control/Tips/Opr/Extra)"
```

---

### 任务 2：创建 Textarea 组件

**文件：**
- 创建：`packages/components/src/textarea/textarea.vue`
- 创建：`packages/components/src/textarea/index.ts`
- 创建：`packages/components/src/textarea/__tests__/textarea.spec.ts`

- [ ] **步骤 1：编写测试**

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiTextarea from '../textarea.vue'

describe('WeuiTextarea', () => {
  it('根元素为 div.weui-cell', () => {
    const wrapper = mount(WeuiTextarea)
    expect(wrapper.classes()).toContain('weui-cell')
  })

  it('渲染 textarea 和 counter', () => {
    const wrapper = mount(WeuiTextarea)
    expect(wrapper.find('textarea.weui-textarea').exists()).toBe(true)
    expect(wrapper.find('.weui-textarea-counter').exists()).toBe(true)
  })

  it('showCount=false 时隐藏 counter', () => {
    const wrapper = mount(WeuiTextarea, { props: { showCount: false } })
    expect(wrapper.find('.weui-textarea-counter').exists()).toBe(false)
  })

  it('显示计数', () => {
    const wrapper = mount(WeuiTextarea, { props: { modelValue: 'hello' } })
    expect(wrapper.find('.weui-textarea-counter span').text()).toBe('5')
  })

  it('warn=true 追加 weui-cell_warn', () => {
    const wrapper = mount(WeuiTextarea, { props: { warn: true } })
    expect(wrapper.classes()).toContain('weui-cell_warn')
  })

  it('渲染 label', () => {
    const wrapper = mount(WeuiTextarea, { props: { label: '问题描述' } })
    expect(wrapper.find('.weui-label').text()).toBe('问题描述')
  })

  it('v-model 双向绑定', async () => {
    const wrapper = mount(WeuiTextarea, { props: { modelValue: '' } })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('新内容')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['新内容'])
  })

  it('vertical prop 追加 weui-cell_vertical', () => {
    const wrapper = mount(WeuiTextarea, { props: { vertical: true } })
    expect(wrapper.classes()).toContain('weui-cell_vertical')
  })

  it('extClass 追加到根元素', () => {
    const wrapper = mount(WeuiTextarea, { props: { extClass: 'my-ta' } })
    expect(wrapper.classes()).toContain('my-ta')
  })
})
```

- [ ] **步骤 2：运行测试确认失败**

```bash
cd packages/components && pnpm vitest run src/textarea/__tests__/textarea.spec.ts
```

- [ ] **步骤 3：实现 Textarea 组件**

```vue
<template>
  <div :class="rootClass">
    <div v-if="label" class="weui-cell__hd"><label class="weui-label">{{ label }}</label></div>
    <div class="weui-cell__bd">
      <textarea
        class="weui-textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :rows="rows"
        :disabled="disabled"
        @input="onInput"
      />
      <div v-if="showCount" class="weui-textarea-counter">
        <span>{{ currentLen }}</span>/{{ maxlength }}
      </div>
    </div>
    <div v-if="warn" class="weui-cell__ft"><i class="weui-icon-warn"></i></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiTextarea',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiTextareaProps {
  modelValue?: string
  placeholder?: string
  rows?: number
  maxlength?: number
  showCount?: boolean
  label?: string
  disabled?: boolean
  warn?: boolean
  vertical?: boolean
  extClass?: string
}

export interface WeuiTextareaEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<WeuiTextareaProps>(), {
  modelValue: '',
  rows: 3,
  maxlength: 200,
  showCount: true,
  disabled: false,
  warn: false,
  vertical: false,
})

const emit = defineEmits<WeuiTextareaEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active']
  if (props.warn) classes.push('weui-cell_warn')
  if (props.vertical) classes.push('weui-cell_vertical')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const currentLen = computed(() => props.modelValue?.length ?? 0)

const onInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>
```

- [ ] **步骤 4：运行测试确认通过**

```bash
cd packages/components && pnpm vitest run src/textarea/__tests__/textarea.spec.ts
```

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/textarea/
git commit -m "feat: add Textarea component with counter"
```

---

### 任务 3：创建 Switch 组件

**文件：**
- 创建：`packages/components/src/switch-ctrl/switch-ctrl.vue`
- 创建：`packages/components/src/switch-ctrl/index.ts`
- 创建：`packages/components/src/switch-ctrl/__tests__/switch-ctrl.spec.ts`

- [ ] **步骤 1：编写测试**

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiSwitch from '../switch-ctrl.vue'

describe('WeuiSwitch', () => {
  it('根元素为 label.weui-cell.weui-cell_switch', () => {
    const wrapper = mount(WeuiSwitch)
    expect(wrapper.element.tagName).toBe('LABEL')
    expect(wrapper.classes()).toContain('weui-cell')
    expect(wrapper.classes()).toContain('weui-cell_switch')
  })

  it('渲染 label 文字', () => {
    const wrapper = mount(WeuiSwitch, { props: { label: '标题文字' } })
    expect(wrapper.find('.weui-cell__bd').text()).toBe('标题文字')
  })

  it('渲染 input.weui-switch', () => {
    const wrapper = mount(WeuiSwitch)
    expect(wrapper.find('.weui-switch').exists()).toBe(true)
  })

  it('modelValue 控制选中状态', () => {
    const wrapper = mount(WeuiSwitch, { props: { modelValue: true } })
    expect((wrapper.find('.weui-switch').element as HTMLInputElement).checked).toBe(true)
  })

  it('cp=true 渲染 weui-switch-cp', () => {
    const wrapper = mount(WeuiSwitch, { props: { cp: true, modelValue: true } })
    expect(wrapper.find('.weui-switch-cp').exists()).toBe(true)
  })

  it('切换时触发 update:modelValue', async () => {
    const wrapper = mount(WeuiSwitch, { props: { modelValue: false } })
    await wrapper.find('.weui-switch').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('disabled 禁止点击', () => {
    const wrapper = mount(WeuiSwitch, { props: { disabled: true } })
    expect((wrapper.find('.weui-switch').element as HTMLInputElement).disabled).toBe(true)
  })
})
```

- [ ] **步骤 2：运行测试确认失败**

```bash
cd packages/components && pnpm vitest run src/switch-ctrl/__tests__/switch-ctrl.spec.ts
```

- [ ] **步骤 3：实现 Switch 组件**

```vue
<template>
  <label :class="rootClass">
    <div class="weui-cell__bd">{{ label }}</div>
    <div class="weui-cell__ft">
      <span v-if="cp" class="weui-switch-cp">
        <input
          class="weui-switch-cp__input"
          type="checkbox"
          :checked="modelValue"
          :disabled="disabled"
          @change="onChange"
        />
        <div class="weui-switch-cp__box"></div>
      </span>
      <input
        v-else
        class="weui-switch"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="onChange"
      />
    </div>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiSwitch',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiSwitchProps {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  cp?: boolean
  extClass?: string
}

export interface WeuiSwitchEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

const props = withDefaults(defineProps<WeuiSwitchProps>(), {
  modelValue: false,
  label: '',
  disabled: false,
  cp: false,
})

const emit = defineEmits<WeuiSwitchEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active', 'weui-cell_switch']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onChange = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>
```

- [ ] **步骤 4：运行测试确认通过**

```bash
cd packages/components && pnpm vitest run src/switch-ctrl/__tests__/switch-ctrl.spec.ts
```

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/switch-ctrl/
git commit -m "feat: add Switch component"
```

---

### 任务 4：创建 Select 组件

**文件：**
- 创建：`packages/components/src/select/select.vue`
- 创建：`packages/components/src/select/index.ts`
- 创建：`packages/components/src/select/__tests__/select.spec.ts`

- [ ] **步骤 1：编写测试**

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiSelect from '../select.vue'

describe('WeuiSelect', () => {
  it('根元素为 div.weui-cell.weui-cell_select', () => {
    const wrapper = mount(WeuiSelect)
    expect(wrapper.classes()).toContain('weui-cell')
    expect(wrapper.classes()).toContain('weui-cell_select')
  })

  it('渲染 select.weui-select', () => {
    const wrapper = mount(WeuiSelect)
    expect(wrapper.find('select.weui-select').exists()).toBe(true)
  })

  it('渲染 options', () => {
    const wrapper = mount(WeuiSelect, {
      slots: { default: '<option value="1">选项一</option><option value="2">选项二</option>' },
    })
    expect(wrapper.findAll('option')).toHaveLength(2)
  })

  it('before=true 追加 weui-cell_select-before', () => {
    const wrapper = mount(WeuiSelect, { props: { before: true } })
    expect(wrapper.classes()).toContain('weui-cell_select-before')
  })

  it('after=true 追加 weui-cell_select-after', () => {
    const wrapper = mount(WeuiSelect, { props: { after: true } })
    expect(wrapper.classes()).toContain('weui-cell_select-after')
  })

  it('label 渲染', () => {
    const wrapper = mount(WeuiSelect, { props: { label: '国家' } })
    expect(wrapper.find('.weui-label').text()).toBe('国家')
  })

  it('modelValue 选中对应 option', () => {
    const wrapper = mount(WeuiSelect, {
      props: { modelValue: '2' },
      slots: { default: '<option value="1">1</option><option value="2">2</option>' },
    })
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('2')
  })

  it('选择触发 update:modelValue', async () => {
    const wrapper = mount(WeuiSelect, {
      props: { modelValue: '1' },
      slots: { default: '<option value="1">1</option><option value="2">2</option>' },
    })
    await wrapper.find('select').setValue('2')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2'])
  })

  it('extClass 追加', () => {
    const wrapper = mount(WeuiSelect, { props: { extClass: 'my-select' } })
    expect(wrapper.classes()).toContain('my-select')
  })
})
```

- [ ] **步骤 2：运行测试确认失败**

```bash
cd packages/components && pnpm vitest run src/select/__tests__/select.spec.ts
```

- [ ] **步骤 3：实现 Select 组件**

```vue
<template>
  <div :class="rootClass">
    <div v-if="label" class="weui-cell__hd">
      <span class="weui-label">{{ label }}</span>
    </div>
    <div class="weui-cell__bd">
      <select class="weui-select" :value="modelValue" :disabled="disabled" @change="onChange">
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <slot />
      </select>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiSelect',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiSelectProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  before?: boolean
  after?: boolean
  label?: string
  extClass?: string
}

export interface WeuiSelectEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<WeuiSelectProps>(), {
  modelValue: '',
  disabled: false,
  before: false,
  after: false,
})

const emit = defineEmits<WeuiSelectEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active', 'weui-cell_select']
  if (props.before) classes.push('weui-cell_select-before')
  if (props.after) classes.push('weui-cell_select-after')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>
```

- [ ] **步骤 4：运行测试确认通过**

```bash
cd packages/components && pnpm vitest run src/select/__tests__/select.spec.ts
```

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/select/
git commit -m "feat: add Select component"
```

---

### 任务 5：创建 Radio / RadioGroup 组件

**文件：**
- 创建：`packages/components/src/radio/radio.vue`
- 创建：`packages/components/src/radio/radio-group.vue`
- 创建：`packages/components/src/radio/index.ts`
- 创建：`packages/components/src/radio/__tests__/radio.spec.ts`

- [ ] **步骤 1：编写测试**

```typescript
// radio/__tests__/radio.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiRadio from '../radio.vue'
import WeuiRadioGroup from '../radio-group.vue'

describe('WeuiRadio', () => {
  it('根元素为 label.weui-check__label', () => {
    const wrapper = mount(WeuiRadio)
    expect(wrapper.element.tagName).toBe('LABEL')
    expect(wrapper.classes()).toContain('weui-check__label')
  })

  it('渲染 radio input', () => {
    const wrapper = mount(WeuiRadio)
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
  })

  it('渲染 label text', () => {
    const wrapper = mount(WeuiRadio, { props: { label: '选项一' } })
    expect(wrapper.find('.weui-cell__bd p').text()).toBe('选项一')
  })
})

describe('WeuiRadioGroup', () => {
  it('渲染 weui-cells_radio', () => {
    const wrapper = mount(WeuiRadioGroup)
    expect(wrapper.find('.weui-cells_radio').exists()).toBe(true)
  })

  it('渲染 title', () => {
    const wrapper = mount(WeuiRadioGroup, { props: { title: '单选标题' } })
    expect(wrapper.find('.weui-cells__title').text()).toBe('单选标题')
  })
})
```

- [ ] **步骤 2：运行测试确认失败**

```bash
cd packages/components && pnpm vitest run src/radio/__tests__/radio.spec.ts
```

- [ ] **步骤 3：实现 Radio 和 RadioGroup 组件**

**radio.vue：**
```vue
<template>
  <label :class="rootClass">
    <div class="weui-cell__bd"><slot>{{ label }}</slot></div>
    <div class="weui-cell__ft">
      <input
        type="radio"
        class="weui-check"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        :name="name"
        @change="onChange"
      />
      <span class="weui-icon-checked"></span>
    </div>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiRadio',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'

interface RadioGroupContext {
  modelValue: { value: string }
  name: { value: string }
  disabled: { value: boolean }
}

export interface WeuiRadioProps {
  value: string
  label?: string
  disabled?: boolean
  extClass?: string
}

const props = withDefaults(defineProps<WeuiRadioProps>(), {
  disabled: false,
})

const group = inject<RadioGroupContext | null>('weuiRadioGroup', null)

const name = computed(() => group?.name.value ?? undefined)
const isChecked = computed(() => group?.modelValue.value === props.value ?? false)
const isDisabled = computed(() => props.disabled || (group?.disabled.value ?? false))

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active', 'weui-check__label']
  if (isDisabled.value) classes.push('weui-cell_disabled')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onChange = () => {
  // RadioGroup 提供上下文，自动处理选中
}
</script>
```

**radio-group.vue：**
```vue
<template>
  <div :class="groupClass">
    <div v-if="title" class="weui-cells__title">{{ title }}</div>
    <div :class="cellsClass">
      <slot />
    </div>
    <div v-if="footer" class="weui-cells__tips">{{ footer }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiRadioGroup',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, provide } from 'vue'

export interface WeuiRadioGroupProps {
  modelValue?: string
  name?: string
  disabled?: boolean
  title?: string
  footer?: string
  form?: boolean
  extClass?: string
}

export interface WeuiRadioGroupEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<WeuiRadioGroupProps>(), {
  modelValue: '',
  name: '',
  disabled: false,
  form: false,
})

const emit = defineEmits<WeuiRadioGroupEmits>()

const groupClass = computed(() => {
  const classes: string[] = ['weui-cells__group']
  if (props.form) classes.push('weui-cells__group_form')
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const cellsClass = computed(() => {
  const classes: string[] = ['weui-cells', 'weui-cells_radio']
  if (props.form) classes.push('weui-cells_form')
  return classes
})

provide('weuiRadioGroup', {
  modelValue: computed(() => props.modelValue),
  name: computed(() => props.name),
  disabled: computed(() => props.disabled),
})

const onChange = (event: { detail?: { value?: string } }) => {
  const value = event.detail?.value ?? ''
  emit('update:modelValue', value)
  emit('change', value)
}
</script>
```

- [ ] **步骤 4：运行测试确认通过**

```bash
cd packages/components && pnpm vitest run src/radio/__tests__/radio.spec.ts
```

- [ ] **步骤 5：Commit**

```bash
git add packages/components/src/radio/
git commit -m "feat: add Radio and RadioGroup components"
```

---

### 任务 6：清理 Cell — 移除 switch/select 渲染

**文件：**
- 修改：`packages/components/src/cell/cell.vue`
- 修改：`packages/components/src/cell/__tests__/cell.spec.ts`

- [ ] **步骤 1：修改 Cell 组件**

在 `cell.vue` 中：
- 删除 `WeuiCellVariant` 中的 `'switch' | 'select' | 'select-before' | 'select-after'`
- 删除 3 个 switch props（`switchModelValue`, `switchDisabled`, `switchCp`）
- 删除 emit `update:switchModelValue`
- 删除 `withDefaults` 中的 switch 默认值
- 删除 template 中 `variant === 'switch'` 分支
- 删除 `vcode` slot（`bdClass` 回退为内联）
- 删除 `rootClass` 中的 switch/select/select-before/select-after 类追加
- 删除 `bdClass` computed
- 删除 `onSwitchChange` 方法

保持的 variant：`default | access | link | vcode | warn | uploader`

- [ ] **步骤 2：修改 Cell 测试**

删除：
- `describe('switch variant', ...)` 整个 block
- `describe('vcode variant', ...)` 整个 block
- 单个 variant 测试：switch/select/select-before/select-after

- [ ] **步骤 3：运行测试确认通过**

```bash
cd packages/components && pnpm vitest run src/cell/__tests__/cell.spec.ts
```

- [ ] **步骤 4：Commit**

```bash
git add packages/components/src/cell/cell.vue packages/components/src/cell/__tests__/cell.spec.ts
git commit -m "refactor(cell): remove switch/select variant rendering, revert to pure CSS"
```

---

### 任务 7：清理 Checkbox — 移除 radio 模式

**文件：**
- 修改：`packages/components/src/checkbox/checkbox.vue`
- 修改：`packages/components/src/checkbox/checkbox-group.vue`
- 修改：`packages/components/src/checkbox/__tests__/checkbox.spec.ts`
- 修改：`packages/components/src/checkbox/__tests__/checkbox-group.spec.ts`

- [ ] **步骤 1：修改 Checkbox 组件**

在 `checkbox.vue` 中：
- 删除 `multi` computed（固定为 true）
- 删除 template 中的 `v-if="multi"` / `v-else` radio 分支
- 保留 `weui-cell__hd` 中的 checkbox 渲染
- 删除 `weui-cell__ft` 中的 radio 渲染
- 删除 `multi` 相关代码

在 `checkbox-group.vue` 中：
- 删除 `multi` prop（固定为 true）
- 删除 `cellsClass` 中的 `weui-cells_radio`
- 删除 `multi` 判断的 radio-group 分支
- 删除 `toggle` 中的 radio 分支

- [ ] **步骤 2：更新测试**

删除 radio 相关的测试用例（`multi=false` 测试）。

- [ ] **步骤 3：运行测试确认通过**

```bash
cd packages/components && pnpm vitest run src/checkbox/__tests__/
```

- [ ] **步骤 4：Commit**

```bash
git add packages/components/src/checkbox/
git commit -m "refactor(checkbox): remove radio mode, now only supports checkbox"
```

---

### 任务 8：更新导出

**文件：**
- 修改：`packages/components/src/index.ts`

- [ ] **步骤 1：修改 index.ts**

新增 import：
```typescript
import { WeuiFormGroup } from './form-group'
import { WeuiFormControl } from './form-control'
import { WeuiFormTips } from './form-tips'
import { WeuiFormOpr } from './form-opr'
import { WeuiFormExtra } from './form-extra'
import { WeuiTextarea } from './textarea'
import { WeuiSwitch } from './switch-ctrl'
import { WeuiSelect } from './select'
import { WeuiRadio, WeuiRadioGroup } from './radio'
```

新增到 components 数组和 export 块。

新增类型导出：
```typescript
import type { WeuiFormGroupProps } from './form-group'
import type { WeuiFormControlProps } from './form-control'
import type { WeuiFormTipsProps } from './form-tips'
import type { WeuiFormOprProps } from './form-opr'
import type { WeuiFormExtraProps } from './form-extra'
import type { WeuiTextareaProps, WeuiTextareaEmits } from './textarea'
import type { WeuiSwitchProps, WeuiSwitchEmits } from './switch-ctrl'
import type { WeuiSelectProps, WeuiSelectEmits } from './select'
import type { WeuiRadioProps, WeuiRadioGroupProps, WeuiRadioGroupEmits } from './radio'
```

- [ ] **步骤 2：验证**

```bash
cd packages/components && pnpm typecheck
```

- [ ] **步骤 3：Commit**

```bash
git add packages/components/src/index.ts
git commit -m "feat: export all new form components"
```

---

### 任务 9：更新文档

**文件：**
- 修改：`docs/components/form.md`
- 修改：`docs/.vitepress/config.mts`

- [ ] **步骤 1：更新 form.md**

用新组件重写所有 demo。例如：

```md
<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="表单结构" desc="展示表单页面的信息结构样式">
      <weui-form-control>
        <weui-form-group title="表单组标题">
          <weui-cell-group>
            <label class="weui-cell weui-cell_active">
              <div class="weui-cell__hd"><span class="weui-label">微信号</span></div>
              <div class="weui-cell__bd"><input class="weui-input" placeholder="填写本人微信号"/></div>
            </label>
          </weui-cell-group>
        </weui-form-group>
      </weui-form-control>
      <template #footer>
        <weui-form-tips>表单页提示</weui-form-tips>
        <weui-form-opr>
          <a role="button" class="weui-btn weui-btn_primary">确定</a>
        </weui-form-opr>
        <weui-form-extra>
          <div class="weui-footer"><p class="weui-footer__links"><a class="weui-footer__link">底部链接文本</a></p></div>
        </weui-form-extra>
      </template>
    </weui-form>
  </div>
</div>
```

对所有 10 个 demo 做类似替换。

- [ ] **步骤 2：更新侧边栏**

在 `docs/.vitepress/config.mts` 的表单组件分组中新增：
- FormGroup
- FormControl / FormTips / FormOpr / FormExtra（可放在同一行或单独的页面）

- [ ] **步骤 3：Commit**

```bash
git add docs/
git commit -m "docs: update form docs with new components"
```

---

### 任务 10：全量验证

- [ ] **步骤 1：单元测试**

```bash
cd packages/components && pnpm vitest run
```

- [ ] **步骤 2：typecheck**

```bash
pnpm -r typecheck
```

- [ ] **步骤 3：构建**

```bash
cd packages/components && pnpm build
```

- [ ] **步骤 4：Commit**

```bash
git add -A
git commit -m "chore: final validation after form components encapsulation"
```
