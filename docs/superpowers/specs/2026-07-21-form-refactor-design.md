# Form 组件重构设计

> 基于 WeUI 官方示例 `https://github.com/Tencent/weui/tree/master/src/example/form` 对 Form 及其子组件进行重构，对齐官方 DOM 结构、API 设计。

## 一、总体设计决策

### 1.1 FormPage 合并到 Form

WeUI 官方没有 `weui-form-page` 类，所有表单（包括整页表单）都使用 `<div class="weui-form">` 作为根容器。因此：

- **删除 `WeuiFormPage` 组件**
- `WeuiForm` 统一承载普通表单和整页表单场景
- 用户需要整页表单时，自行在外部套 `<div class="weui-form-page">` 或设置整页样式

### 1.2 子组件范围

WeUI 官方表单示例涉及 12 个页面，覆盖以下子元素：

| 子元素 | 当前状态 | 重构策略 |
|--------|---------|---------|
| `weui-cell` 系列变体 | Cell 组件已有 variant prop | 补充 switch/vcode 内部渲染 |
| `input.weui-input` | Input 组件已有 | 对齐官方，验证内容 |
| `input.weui-switch[type=checkbox]` | 不存在独立组件 | Cell variant=switch 渲染 |
| `weui-agree` 协议勾选 | 不存在 | **新增 Agree 组件** |
| `textarea.weui-textarea` | 无独立组件 | 不需要组件，文档展示用法 |
| `select.weui-select` | 无独立组件 | 不需要组件，文档展示用法 |
| `weui-cells_checkbox` + `weui-cells_radio` | Checkbox + Group（含 radio mode） | 验证 DOM 对齐，微调 |
| `weui-vcode-btn` | Cell 有 vcode variant | Cell 补充 vcode 按钮 slot |
| `weui-textarea-counter` | 无 | 文档展示用法 |
| `form` + `primary` | CellGroup 的反色表单属性组合 | 生成对应 group modifier |
| `weui-cell_primary` | 无 | 不需要组件，Cell 已有变体 |

### 1.3 不需要独立组件的子元素

- **Switch**：官方就是 `<input type="checkbox" class="weui-switch">`，由 Cell variant 渲染
- **Select**：官方用原生 `<select>`，文档展示
- **Textarea**：官方用原生 `<textarea>`，文档展示
- **Textarea Counter**：`<div class="weui-textarea-counter">` 简单结构，文档展示

---

## 二、Form 组件重设计

### 2.1 模板结构

```vue
<template>
  <div :class="rootClass">
    <div class="weui-form__bd">
      <!-- 标题区域 -->
      <div v-if="hasTitle" class="weui-form__text-area">
        <h2 v-if="hasTitleContent" class="weui-form__title">
          <slot name="title">{{ title }}</slot>
        </h2>
        <div v-if="hasDesc" class="weui-form__desc">
          <slot name="desc">{{ desc }}</slot>
        </div>
      </div>

      <!-- 控件区域 -->
      <div class="weui-form__control-area">
        <slot />
      </div>
    </div>

    <!-- 底部区域：固定结构，由独立 slots 填充 -->
    <div v-if="hasFooter" class="weui-form__ft">
      <div v-if="hasTips" class="weui-form__tips-area">
        <p class="weui-form__tips"><slot name="tips" /></p>
      </div>
      <div v-if="hasOpr" class="weui-form__opr-area"><slot name="opr" /></div>
      <div v-if="hasTipsB" class="weui-form__tips-area">
        <p class="weui-form__tips"><slot name="tips-b" /></p>
      </div>
      <div v-if="hasExtra" class="weui-form__extra-area"><slot name="extra" /></div>
    </div>
  </div>
</template>
```

### 2.2 Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 表单标题 | `string` | — |
| desc | 表单描述 | `string` | — |
| extClass | 根元素扩展类名 | `string` | — |

### 2.3 Slots

| 名称 | 说明 |
|------|------|
| default | 控件区域内容（内置于 `weui-form__control-area`） |
| title | `.weui-form__title` 内容 |
| desc | `.weui-form__desc` 内容 |
| tips | 第一个 `.weui-form__tips-area` 内容 |
| opr | `.weui-form__opr-area` 内容 |
| tips-b | 第二个 `.weui-form__tips-area` 内容 |
| extra | `.weui-form__extra-area` 内容 |

### 2.4 变更摘要

**删除：**
- `tips` prop → 改为 `tips` / `tips-b` slots 填充固定的两个 `weui-form__tips-area`
- 自由 `footer` slot → 改为 `tips`、`opr`、`tips-b`、`extra` 固定区域 slots
- FormPage 整个组件

**保留：**
- `title` prop, `desc` prop, `extClass` prop
- `title`、`desc`、`tips`、`opr`、`tips-b`、`extra` slots（填充固定结构）

**设计理由：** Form 固定输出官方完整结构，slot 只负责填充各节点内容；两个 tips 区域对应官方示例中的前后提示，组件内部通过 `v-if` 控制是否渲染。

---

## 三、Cell 组件增强

### 3.1 variant='switch' 渲染

当 `variant='switch'` 时，在 `weui-cell__ft` 渲染 `<input type="checkbox" class="weui-switch">`。

**新增 Props：**
- `switchModelValue?: boolean` — 开关 v-model 值
- `switchDisabled?: boolean` — 开关是否禁用
- `switchCp?: boolean` — 是否使用 `weui-switch-cp` 兼容版本

**Emits：**
- `update:switchModelValue` — 开关状态变化

**渲染结构：**
```html
<div class="weui-cell__ft">
  <!-- 标准版 -->
  <input v-if="!switchCp"
    type="checkbox"
    class="weui-switch"
    :checked="switchModelValue"
    :disabled="switchDisabled"
    @change="onSwitchChange"
  />
  <!-- 兼容版 (weui-switch-cp) -->
  <span v-else class="weui-switch-cp">
    <input class="weui-switch-cp__input" type="checkbox"
      :checked="switchModelValue" :disabled="switchDisabled" @change="onSwitchChange" />
    <div class="weui-switch-cp__box"></div>
  </span>
</div>
```

### 3.2 variant='vcode' 增强

当前只追加 `weui-cell_vcode` 类。需要在 `bd` 区域提供 vcode 按钮 slot。

**新增 Slot：**
- `vcode` — 验证码按钮区域，渲染在 `weui-cell__bd` 末尾

**渲染结构：**
```html
<div class="weui-cell__bd weui-flex">
  <slot />  <!-- input 等控件 -->
  <slot name="vcode" />  <!-- 验证码按钮 -->
</div>
```

### 3.3 variant='select' / 'select-before' / 'select-after'

当前只追加 CSS 类，渲染正确。无需改动。

---

## 四、Agree 组件（新增）

### 4.1 模板结构

```vue
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
```

### 4.2 Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | v-model 绑定值 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| extClass | 根元素扩展类名 | `string` | — |

### 4.3 Emits

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 选中状态变化 | `boolean` |
| change | 选中状态变化 | `boolean` |

### 4.4 CSS（内联到 SFC）

weui.css 中 `weui-agree` 相关样式由 weui.css 提供，无需额外样式。

---

## 五、Input 组件对齐

### 5.1 当前实现 vs 官方

Input 组件当前渲染为独立的 `<div class="weui-input">` 包裹 `<input>`，这与 WeUI 官方在 cell 中使用的方式不同。WeUI 中 input 嵌套在 `weui-cell__bd` 内，且需要 `weui-cell__control` 类。

**当前不变更 Input 本身。** Input 在独立场景（非 cell 内）使用 `weui-input` 包裹是合理的。在 cell 内使用 input 时，由用户自行组合，文档展示用法。

---

## 六、Checkbox / CheckboxGroup 对齐

### 6.1 当前状态

Checkbox 组件已通过 `multi` prop 同时支持 checkbox（多选）和 radio（单选）两种形态：
- `multi=true` → checkbox 在 `__hd`，追加 `weui-cells_checkbox`
- `multi=false` → radio 在 `__ft`，追加 `weui-cells_radio`

### 6.2 DOM 对齐官方

对比官方 `form_checkbox.html`：

**官方结构：**
```html
<label class="weui-cell weui-cell_active weui-check__label" for="s11">
  <div class="weui-cell__hd">
    <input type="checkbox" class="weui-check" id="s11" />
    <i class="weui-icon-checked"></i>
  </div>
  <div class="weui-cell__bd"><p>standard is dealt for u.</p></div>
</label>
```

**当前实现：** 使用 `<div class="weui-icon-checked">` 而非 `<i>`，核心结构已对齐。不需要调整。

### 6.3 CheckboxGroup 对齐

当前 `form` prop 控制表单容器语义，`primary` 与 `form` 组合表示反色表单组；组件内部负责生成官方 modifier。业务页面使用 `<weui-cells form>` 或 `<weui-cell-group form primary>`，不通过 `extClass` 传入内置 class。

---

## 七、文档重写

### 7.1 form.md 重构

文档将展示以下 5 个 demo：

1. **基础表单结构** — 对应 `form_page.html`：title + desc + cells + tips + button + extra-area（footer 链接）
2. **输入框状态** — 对应 `form_input_status.html`：warn cell / readonly / disabled
3. **验证码表单** — 对应 `form_vcode.html`：vcode cell + Agree 组件
4. **复选框表单** — 对应 `form_checkbox.html`：CheckboxGroup + Agree（tips 中）
5. **底部悬浮表单** — 对应 `form_bottom_fixed.html`：weui-bottom-fixed-opr-page + Agree

Form 固定使用 `default`、`title`、`desc`、`tips`、`opr`、`tips-b`、`extra` slots；控件区必须使用 `default`，两个 tips 区域按固定顺序渲染。表单示例中的 cells 使用 `<weui-cells form>`，反色分组使用 `<weui-cell-group form primary>`。

### 7.2 为原生元素补充的文档

以下在使用文档（form.md 或对应组件文档）中以 demo 形式展示用法：
- 原生 `<select>` + `weui-cell_select` 变体
- 模拟选择框（`div.weui-select` + picker）
- 原生 `<textarea>` + `weui-textarea-counter`
- `weui-cell_switch` + `<input class="weui-switch">`
- `weui-cell_vertical` 上下布局
- `weui-cells__group_form-primary` 反色表单

---

## 八、需要改动的文件清单

### 删除
| 文件 | 原因 |
|------|------|
| `packages/components/src/form-page/form-page.vue` | 合并到 Form |
| `packages/components/src/form-page/index.ts` | 同上 |
| `packages/components/src/form-page/__tests__/form-page.spec.ts` | 同上 |

### 修改
| 文件 | 变更内容 |
|------|---------|
| `packages/components/src/form/form.vue` | 内联完整 Form 结构，使用固定区域 slots |
| `packages/components/src/form/__tests__/form.spec.ts` | 验证 default/title/desc/tips/opr/tips-b/extra slots |
| `packages/components/src/cell/cell.vue` | variant=switch 渲染 input.switch + v-model；variant=vcode 补充 vcode slot |
| `packages/components/src/cell/__tests__/cell.spec.ts` | 新增 switch/vcode 变体测试 |
| `packages/components/src/index.ts` | 移除 FormPage 导出，新增 Agree 导出 |
| `packages/components/package.json` | 移除 form-page 导出路径 |

### 新增
| 文件 | 内容 |
|------|------|
| `packages/components/src/agree/agree.vue` | Agree 组件 |
| `packages/components/src/agree/index.ts` | 导出 |
| `packages/components/src/agree/__tests__/agree.spec.ts` | 单元测试 |

### 文档
| 文件 | 变更内容 |
|------|---------|
| `docs/components/form.md` | 重写：5 个 demo（基础/输入状态/验证码/复选框/底部悬浮） |
| `docs/components/agree.md` | 新增 Agree 文档 |

### E2E 测试
| 文件 | 变更内容 |
|------|---------|
| `tests/e2e-docs/form.spec.ts` | 更新选择器，新增 demo 测试 |
| `tests/e2e-docs/agree.spec.ts` | 新增 Agree E2E |
| `tests/e2e/cell.spec.ts` | 新增 switch/vcode 测试 |

---

## 九、FormPage 迁移指南

对于已使用 `WeuiFormPage` 的代码（如 uni-app examples），迁移方式：

```vue
<!-- 迁移前 -->
<weui-form-page title="标题" desc="描述">
  <slot />
  <template #opr>...</template>
</weui-form-page>

<!-- 迁移后 -->
<weui-form title="标题" desc="描述">
  <slot />
  <template #opr>...</template>
</weui-form>
```

API 使用固定的 `default/title/desc/tips/opr/tips-b/extra` slots；不再使用自由 `footer` slot。
