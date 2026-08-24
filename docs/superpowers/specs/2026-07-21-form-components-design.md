# 表单组件封装设计

> 基于 WeUI 官方 15 个 form 示例，Form 负责提供完整的内联结构，
> Cell 回归纯 CSS 布局容器角色；FormTips/FormOpr/FormExtra 等组件仅作为独立容器保留，Form 本身不依赖它们。

## 一、整体架构

```
WeuiForm (容器)
├── .weui-form__bd
    ├── .weui-form__text-area (由 Form 的 title slot 控制)
    └── .weui-form__control-area (由 `default` slot 填充)
        └── 页面控件内容
└── .weui-form__ft (由 tips / opr / tips-b / extra slots 按固定结构填充)
```

Form 的外层节点和官方 class 固定在 `form.vue` 内部。为了避免 uni-app 组件内部依赖 easycom，Form 不嵌套 FormControl、FormTips、FormOpr 或 FormExtra；固定的 tips、opr、tips-b、extra 节点由对应 slot 和 `v-if` 控制。

### Cell 回归纯布局

| 当前 variant | 处理 |
|-------------|------|
| switch | **移除渲染逻辑** — 由 Switch 组件自己渲染 cell 结构 |
| select / select-before / select-after | **移除** — 由 Select 组件自己渲染 cell 结构 |
| access / link / warn / vcode / uploader | **保留 CSS 只加类名** |

---

## 二、新增组件详细设计

### 2.1 CellGroup

**用途：** Vue 3/H5 中封装表单分组；内置 modifier 使用 `form`、`primary` 等语义属性，调用方不需要记忆 WeUI class 名称。uni-app 产物只保留 group 外壳，页面中应直接使用 `<weui-cells form>`。

**模板：**
```html
<weui-cell-group form primary title="表单分组">
  <slot />
</weui-cell-group>
```

**Props：** title (`string`)、footer (`string`)、form (`boolean`)、primary (`boolean`)、extClass (`string`)

**Slots：** default（控件内容）、title（替代 title prop）、footer（替代 footer prop）

### 2.2 FormControl（独立容器）

**用途：** 包装 `weui-form__control-area`

**模板：** `<div class="weui-form__control-area"><slot /></div>`

### 2.3 FormTips（独立容器）

**用途：** 包装 `weui-form__tips-area`

**模板：** `<div class="weui-form__tips-area"><p class="weui-form__tips"><slot /></p></div>`

### 2.4 FormOpr（独立容器）

**用途：** 包装 `weui-form__opr-area`

**模板：** `<div class="weui-form__opr-area"><slot /></div>`

### 2.5 FormExtra（独立容器）

**用途：** 包装 `weui-form__extra-area`

**模板：** `<div class="weui-form__extra-area"><slot /></div>`

### 2.6 Textarea

**用途：** 渲染 `weui-cell > __bd > textarea + counter`

**模板：**
```html
<div class="weui-cell weui-cell_active" :class="{'weui-cell_warn': warn}">
  <div v-if="label" class="weui-cell__hd"><label class="weui-label">{{ label }}</label></div>
  <div class="weui-cell__bd">
    <textarea class="weui-textarea" v-model="modelValue" :placeholder="placeholder"
      :maxlength="maxlength" :rows="rows" :disabled="disabled" @input="onInput" />
    <div v-if="showCount" class="weui-textarea-counter"><span>{{ currentLen }}</span>/{{ maxlength }}</div>
  </div>
  <div v-if="warn" class="weui-cell__ft"><i class="weui-icon-warn"></i></div>
</div>
```

**Props：** modelValue (`string`, ''), placeholder (`string`), rows (`number`, 3), maxlength (`number`, 200), showCount (`boolean`, true), label (`string`), disabled (`boolean`, false), warn (`boolean`, false), extClass (`string`)

**Emits：** update:modelValue, change

**变体：**
- 普通模式：`weui-cell_active`
- 上下结构：追加 `weui-cell_vertical`（新增 `vertical` prop）

### 2.7 Switch

**用途：** 渲染 `weui-cell weui-cell_switch > __bd(title) + __ft(checkbox)`

**模板：**
```html
<label class="weui-cell weui-cell_active weui-cell_switch">
  <div class="weui-cell__bd">{{ label }}</div>
  <div class="weui-cell__ft">
    <span v-if="cp" class="weui-switch-cp">
      <input class="weui-switch-cp__input" type="checkbox" :checked="modelValue"
        :disabled="disabled" @change="onChange" />
      <div class="weui-switch-cp__box"></div>
    </span>
    <input v-else class="weui-switch" type="checkbox"
      :checked="modelValue" :disabled="disabled" @change="onChange" />
  </div>
</label>
```

**Props：** modelValue (`boolean`, false), label (`string`), disabled (`boolean`, false), cp (`boolean`, false), extClass (`string`)

**Emits：** update:modelValue, change

**移除 Cell variant=switch：** 删除 `cell.vue` 中 switch 的渲染逻辑和 `switchModelValue/switchDisabled/switchCp` props，但保留 `weui-cell_switch` 类名追加。

### 2.8 Select

**用途：** 渲染 `weui-cell weui-cell_select` 三种布局

**模板：**
```html
<div class="weui-cell weui-cell_active" :class="selectClass">
  <div v-if="label" class="weui-cell__hd"><span class="weui-label">{{ label }}</span></div>
  <div class="weui-cell__bd">
    <select class="weui-select" :value="modelValue" :disabled="disabled" @change="onChange">
      <slot />
    </select>
  </div>
</div>
```

**Props：** modelValue (`string`), placeholder (`string`), disabled (`boolean`, false), before (`boolean`, false), after (`boolean`, false), extClass (`string`)

**Emits：** update:modelValue, change

**三种布局控制：**
- `before=true` → `weui-cell_select weui-cell_select-before` + hd 区域显示 label 作为选择框
- `after=true` → `weui-cell_select weui-cell_select-after` + hd 显示 label 文字
- 默认 → `weui-cell_select` + hd 不显示

**移除 Cell variant=select：** 删除 `cell.vue` 中 select/select-before/select-after 的类名追加。

### 2.9 Radio / RadioGroup

**用途：** 独立单选框组件，从 Checkbox 中拆出。

**Radio 模板：**
```html
<label class="weui-cell weui-cell_active weui-check__label" :class="{'weui-cell_disabled': disabled}">
  <div class="weui-cell__bd"><slot>{{ label }}</slot></div>
  <div class="weui-cell__ft">
    <input type="radio" class="weui-check" :value="value" :checked="isChecked"
      :disabled="disabled" :name="name" @change="onChange" />
    <span class="weui-icon-checked"></span>
  </div>
</label>
```

**RadioGroup 模板：**
```html
<div class="weui-cells__group" :class="{'weui-cells__group_form': form}">
  <div v-if="title" class="weui-cells__title">{{ title }}</div>
  <div class="weui-cells weui-cells_radio">
    <slot />
  </div>
  <div v-if="footer" class="weui-cells__tips">{{ footer }}</div>
</div>
```

**Radio Props：** modelValue (`string`), value (`string`), label (`string`), disabled (`boolean`, false), extClass (`string`)

**RadioGroup Props：** modelValue (`string`), title (`string`), footer (`string`), disabled (`boolean`, false), form (`boolean`, false), extClass (`string`)

**Emits：** update:modelValue, change

---

## 三、Cell 变更

**删除的 props：** `switchModelValue`, `switchDisabled`, `switchCp`

**删除的 emit：** `update:switchModelValue`

**删除的 variant：** Cell 不再追加 `weui-cell_select` / `weui-cell_select-before` / `weui-cell_select-after` / `weui-cell_switch` 类

**删除的 CSS / slot：** `bdClass` 回退为内联，移除 vcode slot（由用户直接在 Cell 的 bd slot 中组合）

**保持的 variant：** access / link / warn / vcode / uploader（只加类名）

---

## 四、文档

### form.md 整理

现有 10 个 demo 保持不变，但内部改用新组件。

### 新增组件文档

每个组件一个 `.md` 文件，包含：
- 基础用法 demo
- props/events/slots 表格

---

## 五、文件清单

### 新增
| 组件目录 | 文件 |
|---------|------|
| `form-group/` | `form-group.vue`, `index.ts`, `__tests__/` |
| `form-control/` | `form-control.vue`, `index.ts` |
| `form-tips/` | `form-tips.vue`, `index.ts` |
| `form-opr/` | `form-opr.vue`, `index.ts` |
| `form-extra/` | `form-extra.vue`, `index.ts` |
| `textarea/` | `textarea.vue`, `index.ts`, `__tests__/` |
| `switch-ctrl/` | `switch-ctrl.vue`, `index.ts`, `__tests__/` |
| `select/` | `select.vue`, `index.ts`, `__tests__/` |
| `radio/` | `radio.vue`, `radio-group.vue`, `index.ts`, `__tests__/` |

### 修改
| 文件 | 变更 |
|------|------|
| `cell/cell.vue` | 移除 switch/select 渲染，回退纯 CSS |
| `cell/cell-group.vue` | 不变 |
| `cell/__tests__/cell.spec.ts` | 移除 switch/select 测试 |
| `checkbox/checkbox.vue` | 不再处理 radio 模式（只保留 checkbox） |
| `checkbox/checkbox-group.vue` | 同上 |
| `form/form.vue` | 不变 |
| `form/__tests__/form.spec.ts` | 不变 |
| `index.ts` | 新增导出所有新增组件 |
| `docs/components/form.md` | 用新组件重写 demo |
| `docs/.vitepress/config.mts` | 侧边栏新增组件 |

### 删除
| 文件 | 理由 |
|------|------|
| `checkbox/checkbox.spec.ts` 中 radio 相关测试 | radio 已独立 |
| `checkbox/checkbox-group.spec.ts` 中 radio 相关测试 | radio-group 已独立 |
