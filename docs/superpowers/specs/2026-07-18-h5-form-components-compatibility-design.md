# H5 表单组件兼容性根因修复设计

> **日期：** 2026-07-18
> **主题：** 修复 input / checkbox / searchbar / uploader / gallery 在 VitePress 文档站（纯 Vue 3 环境）的可交互性根因
> **状态：** 设计阶段

---

## 一、背景与问题

阶段二完成了文档站标签兼容性与样式架构优化（删除 Vue3Adapter、源码层面 `view → div` 等标签替换）。但在实际使用中，5 个表单/反馈组件仍存在 H5 端可交互性根因问题，根因集中在三类：

| 根因类别 | 涉及组件 |
|---|---|
| **uni-app 专有标签/属性/事件在 HTML 上无效** | input（`:focus`/`:password`/`confirm-type`/`@confirm`）、searchbar（同 input）、checkbox（`<checkbox>`/`<checkbox-group>`/`<radio>`/`<radio-group>`）、uploader（`@longpress`） |
| **缺样式** | input 清除按钮（`.weui-icon-clear` 在 weui.css 只有 mask + color，缺尺寸/背景）、uploader（`.weui-uploader__tips` 完全缺失）、searchbar（`.weui-search-bar__btn` 缺垂直居中） |
| **组件行为与文档示例不完整** | searchbar（点击搜索未聚焦、失焦"回复原样"）、uploader（preview 事件未接入 gallery、无 H5 端删除入口）、gallery（小程序端无适配） |

### 用户反馈清单（来自本轮 brainstorming）

**input**
1. 文档中 input 「清除按钮」显示不对
2. 自动聚焦好像无效

**checkbox**
1. 选中后样式没变
2. 多选模式选中值未改变
3. 单选模式选中值也未改变
4. 自定义内容和分组底部说明 缺少示例（**移至子项目 4 处理**）

**searchbar**
1. 点击搜索后未聚焦，需要二次点击
2. 为什么取消聚焦（点击外部）后会回复原样
3. 搜索按钮 没有垂直居中

**uploader**
1. 点击已上传图片，预览没生效
2. 已上传或失败的没有清除按钮
3. `weui-uploader__tips` 没有样式

---

## 二、设计原则

### 1. 一套代码三端可用

组件源码通过条件编译（`// #ifdef H5` / `// #ifndef H5`）同时服务：

- 小程序：uni-app 编译器处理标签/属性/事件
- uni-app H5：uni-app 编译器处理
- 纯 Vue 3（VitePress 文档站）：条件编译分支保留 H5 端逻辑

**不重新引入 Vue3Adapter**（阶段二已删除），所有兼容在组件源码内完成。

### 2. 完全可交互

所有文档站 demo 在浏览器中能正常操作（点击 checkbox 能选中、长按 uploader 文件能删除等）。

### 3. 缺样式统一在 weui-extra.scss 补

组件不绑 CSS，缺样式规则统一在 `packages/components/src/styles/weui-extra.scss` 补全，分节标注「weui.css 规则补丁」vs「weui.css 不含的自定义类」。

---

## 三、各组件改动设计

### 1. Input 输入框

#### 问题与修复对应表

| 问题 | 根因 | 修复 |
|---|---|---|
| 清除按钮显示不对 | `.weui-icon-clear` 在 weui.css 只有 mask + color，缺尺寸/背景 | weui-extra.scss 补全 width/height/background-color |
| 自动聚焦无效 | `:focus` 是 uni-app 属性，HTML input 无此属性 | H5 端用 `inputRef.value?.focus()` + `watch(() => props.focus)` |
| confirm 事件不触发 | `<input>` 无 confirm 事件 | H5 端绑 `@keydown.enter`，复用 `handleConfirm` |
| `:password` 属性 | uni-app 专有 | H5 端改用 `type="password"`，移除 `:password` 属性绑定 |
| `confirm-type` 属性 | uni-app 专有 | H5 端不渲染此属性 |

#### input.vue 关键改动

模板层面条件编译：

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
      <!-- #ifdef H5 -->
      @keydown.enter="handleConfirm"
      <!-- #endif -->
      <!-- #ifndef H5 -->
      :focus="focus || undefined"
      :password="isPassword || undefined"
      confirm-type="done"
      @confirm="handleConfirm"
      <!-- #endif -->
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div v-if="showClear" class="weui-icon-clear" @click="handleClear" />
  </div>
</template>
```

脚本层面：

```ts
import { computed, ref, watch } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)

// H5 端 type 映射：idcard/digit 降级为 text（与 uni-app 编译 H5 行为一致）
const htmlInputType = computed(() =>
  props.type === 'password' ? 'password' : props.type === 'idcard' || props.type === 'digit' ? 'text' : props.type
)

// #ifdef H5
watch(() => props.focus, (val) => {
  if (val) inputRef.value?.focus()
  else inputRef.value?.blur()
}, { immediate: true })
// #endif
```

#### API 不变

- `focus` 保持单向 prop（不反向 emit `update:focus`）
- 文档示例已采用 `@focus="focusTriggered = true"` / `@blur="focusTriggered = false"` 模式，H5 端补 ref.focus() 后即可工作

---

### 2. Checkbox 复选框

#### 问题与修复对应表

| 问题 | 修复 |
|---|---|
| 选中样式不变 | H5 端用 `<input type="checkbox">` 替代 `<checkbox>`，原生选中态触发 CSS `:checked` |
| 多选/单选值未变 | H5 端 group 不用原生 `<checkbox-group>/<radio-group>`，由 group 通过 provide/inject 收集子项 |

#### checkbox.vue 改动

H5 端用 `<input type="checkbox/radio">`，非 H5 保留 `<checkbox>/<radio>`：

```vue
<template>
  <label :class="rootClass" @click="handleClick">
    <div v-if="multi" class="weui-cell__hd">
      <!-- #ifdef H5 -->
      <input type="checkbox" class="weui-check" :value="value" :checked="isChecked" :disabled="isDisabled" @change.stop="onH5Change" />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <checkbox class="weui-check" :value="value" :checked="isChecked" :disabled="isDisabled" />
      <!-- #endif -->
      <div class="weui-icon-checked" />
    </div>
    <div class="weui-cell__bd"><slot>{{ label }}</slot></div>
    <div v-if="!multi" class="weui-cell__ft">
      <!-- #ifdef H5 -->
      <input type="radio" class="weui-check" :value="value" :checked="isChecked" :disabled="isDisabled" @change.stop="onH5Change" />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <radio class="weui-check" :value="value" :checked="isChecked" :disabled="isDisabled" />
      <!-- #endif -->
      <div class="weui-icon-checked" />
    </div>
  </label>
</template>
```

#### checkbox-group.vue 改动

H5 端不用原生 group，由 group 自身管理子项选中：

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
```

#### H5 端子项收集方案

group 通过 provide 暴露 `toggle(value)` 方法；checkbox 在 `onH5Change` 中调用 `group?.toggle(props.value)`；group 内部根据 multi 模式更新 modelValue 并 emit。

```ts
// checkbox-group.vue (H5 端逻辑)
const toggle = (value: string) => {
  if (props.multi) {
    const set = new Set(props.modelValue)
    if (set.has(value)) set.delete(value)
    else set.add(value)
    const arr = Array.from(set)
    emit('update:modelValue', arr)
    emit('change', arr)
  } else {
    // 单选：替换为单值数组
    emit('update:modelValue', [value])
    emit('change', [value])
  }
}

provide('weuiCheckboxGroup', {
  multi: computed(() => props.multi),
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  toggle, // #ifdef H5
})
```

```ts
// checkbox.vue (H5 端逻辑)
const group = inject<CheckboxGroupContext | null>('weuiCheckboxGroup', null)

// #ifdef H5
const onH5Change = () => {
  if (group?.toggle) group.toggle(props.value)
}
// #endif
```

---

### 3. Searchbar 搜索栏

#### 问题与修复对应表

| 问题 | 修复 |
|---|---|
| 点击搜索按钮后未聚焦 | `handleSearch` 中 `focused.value = true; inputFocus.value = true`，H5 端额外 `inputRef.focus()` |
| 取消聚焦后回复原样 | `handleBlur` 中若 `modelValue` 有值，保持 `focused=true`（有值保持展开态） |
| 搜索按钮没垂直居中 | weui-extra.scss 给 `.weui-search-bar__btn` 加 `display:flex; align-items:center` |
| input `:focus` 属性无效 | 同 input 组件，H5 端用 ref + watch |
| `@confirm` 不触发 | H5 端 `@keydown.enter` 触发 confirm + search |

#### searchbar.vue 关键改动

```ts
const handleBlur = (event: Event) => {
  // 有值时保持聚焦态外观（不"回复原样"）
  if (!props.modelValue) {
    focused.value = false
    inputFocus.value = false
  }
  emit('blur', event)
}

const handleSearch = () => {
  emit('search', props.modelValue)
  // 点击搜索按钮后聚焦输入框（让用户能继续输入新关键词）
  focused.value = true
  inputFocus.value = true
  // #ifdef H5
  inputRef.value?.focus()
  // #endif
}

const handleLabelClick = () => {
  focused.value = true
  inputFocus.value = true
  // #ifdef H5
  inputRef.value?.focus()
  // #endif
}
```

#### 模板条件编译

与 input 一致：H5 端移除 `:focus`/`:password`/`confirm-type`/`@confirm`，加 `@keydown.enter`。

---

### 4. Uploader 上传

#### 问题与修复对应表

| 问题 | 修复 |
|---|---|
| 预览没生效 | 文档示例实现 preview 事件 → 调用 `Gallery.show({ src, showDelete: true })` |
| 没有清除按钮 | H5 端每个文件右上角加 × 按钮，点击触发 delete；小程序端保留 `@longpress` |
| `weui-uploader__tips` 无样式 | weui-extra.scss 补全此类 |
| 小程序端长按删除提示 | uploader.vue 在小程序端自动渲染 tips「长按图片可删除」（与用户自定义 tips 拼接） |

#### uploader.vue 关键改动

```vue
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
  <div v-if="hasStatusOverlay(file)" class="weui-uploader__file-content">
    {{ resolveStatusText(file) }}
  </div>
  <!-- #ifdef H5 -->
  <div class="weui-uploader__file-delete" @click.stop="handleDelete(file, index)">×</div>
  <!-- #endif -->
</div>

<!-- #ifndef H5 -->
<div v-if="files.length > 0 && !tips" class="weui-uploader__tips">长按图片可删除</div>
<!-- #endif -->
```

#### uploader.md 文档示例补全 preview 接 gallery

```ts
import { Gallery } from 'weui-design-vue'

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

并移除文档顶部的「浏览器环境说明」tip（因为现在可交互了）。

---

### 5. Gallery 画廊

#### 问题

- H5 端有完整 UI 但小程序端无适配
- uploader 文档示例未调 `Gallery.show`

#### gallery.vue 改动 — 组件内部条件编译

```vue
<template>
  <!-- #ifdef H5 -->
  <div
    v-if="wrapperShow"
    :class="['weui-gallery', extClass, ...]"
    @click="handleClick"
    @touchmove.stop.prevent
  >
    <img class="weui-gallery__img" :src="src" mode="aspectFit" />
    <div v-if="hasOpr" class="weui-gallery__opr" @click.stop>
      <slot>
        <div class="weui-gallery__del" @click="handleDelete">{{ deleteText }}</div>
      </slot>
    </div>
  </div>
  <!-- #endif -->
</template>

<script setup lang="ts">
watch(
  () => props.visible,
  (val) => {
    // #ifdef H5
    if (val) {
      wrapperShow.value = true
      showTimer = setTimeout(() => { innerShow.value = true }, 16)
    } else if (wrapperShow.value) {
      innerShow.value = false
      hideTimer = setTimeout(() => { wrapperShow.value = false }, 300)
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
        }
      })
    }
    // #endif
  },
  { immediate: true },
)
</script>
```

#### gallery.ts 命令式 API

保持不变。H5 端走 overlay-host 渲染（已工作）；小程序端通过 vue 组件的 watch 触发 `uni.previewImage`，删除按钮能力丢失（promise 只 resolve 'hide'，不会 resolve 'delete'）。

#### 文档说明

gallery.md 新增说明：「小程序端使用 `uni.previewImage`，删除按钮仅在 H5 端生效」。

---

## 四、weui-extra.scss 整理

将现有文件重新分节：

```scss
// ============================================================================
// 章节 1：weui.css 规则补丁
// weui.css 中存在但规则不全的类，补全后让组件在 H5 端正常显示
// weui 升级后若已修复，可删除对应补丁
// ============================================================================

.weui-icon-clear {
  width: 16px;
  height: 16px;
  background-color: currentColor;
  // mask-image 已由 weui.css 提供
}

.weui-search-bar__btn {
  display: flex;
  align-items: center;
}

// ============================================================================
// 章节 2：weui.css 不含的自定义类
// 属于 weui-miniprogram 仓库，weui npm 包不含
// ============================================================================

.weui-cell__icon { /* 已有 */ }
.weui-list { /* 已有 */ }
.weui-list__title { /* 已有 */ }
.weui-list__tips { /* 已有 */ }
.weui-slideview { /* 已有 */ }
.weui-uploader__tips { /* 新增 */ }
.weui-uploader__file-delete { /* 新增：H5 端删除按钮 */ }
```

### 新增样式细节

```scss
.weui-uploader__tips {
  margin-top: 8px;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  line-height: 1.4;
}

.weui-uploader__file-delete {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
  line-height: 1;
}
```

---

## 五、文档示例改动

| 文档 | 改动 |
|---|---|
| input.md | 移除「自动聚焦无效」相关说明（已修复）；保留现有 demo |
| checkbox.md | 移除「浏览器环境说明」tip；确认所有 demo 可交互（基础用法/默认选中/独立 checkbox 已工作；group 联动 H5 端通过 group.toggle 实现） |
| searchbar.md | 移除「点击搜索未聚焦」相关说明 |
| uploader.md | 移除「浏览器环境说明」tip；preview 事件 demo 接入 Gallery.show；展示 H5 × 删除按钮 |
| gallery.md | 新增说明「小程序端使用 uni.previewImage，删除按钮仅在 H5 端生效」 |

> **注：** checkbox 「自定义内容」与「分组底部说明」示例缺失属于子项目 4，不在本次范围。

---

## 六、影响范围与风险

| 改动 | 影响范围 | 风险 |
|---|---|---|
| input.vue 条件编译 | H5/小程序两端 input 行为 | 低（H5 走 ref+watch，小程序保持原属性） |
| checkbox.vue + group.vue 条件编译 | H5 端 group 联动机制重构 | 中（需 E2E 验证多选/单选切换、值变化） |
| searchbar.vue handleBlur 逻辑 | 失焦后视觉状态 | 低（有值保持聚焦态） |
| uploader.vue H5 × 按钮 + preview 接 gallery | H5 端文件操作 | 低 |
| gallery.vue 小程序端 uni.previewImage | 小程序端 gallery 行为 | 中（删除按钮能力丢失，需文档说明） |
| weui-extra.scss 补丁 | 全局样式 | 低 |

---

## 七、验证策略

1. **单元测试**：`cd packages/components && pnpm vitest run` — 全部通过；新增 checkbox group H5 联动测试、input focus 测试
2. **类型检查**：`pnpm -r typecheck` — 无错误
3. **E2E 测试**：`pnpm e2e` — 全部通过；新增/更新：
   - input 清除按钮可见 + 可点击
   - input focus 按钮触发聚焦
   - checkbox 单选/多选切换 + 值变化
   - searchbar 点击搜索后聚焦
   - searchbar 有值失焦保持展开态
   - uploader 文件 × 删除按钮
   - uploader preview 触发 gallery 显示
4. **手动验证**：
   - 文档站 input/checkbox/searchbar/uploader 所有 demo 可交互
   - 小程序端（uni-app H5 预览）gallery 调起 uni.previewImage

---

## 八、不在本次范围

- dialog / half-screen-dialog / toptips 的弹层显示问题（子项目 2）
- picker / slideview / navbar / panel / list / button / flex 的样式与交互问题（子项目 3）
- checkbox 「自定义内容」与「分组底部说明」示例缺失（子项目 4）
- form 配合 footer 完整示例（子项目 4）
- `.vp-doc .demo-block` 背景色（子项目 3 全局样式部分）

---

## 九、实施顺序建议

1. weui-extra.scss 补丁（独立改动，先做）
2. input.vue 条件编译 + 单元测试
3. checkbox.vue + checkbox-group.vue 条件编译 + 单元测试
4. searchbar.vue 改动 + 单元测试
5. gallery.vue 小程序端适配
6. uploader.vue H5 × 按钮 + preview 接 gallery
7. 文档示例更新（input/checkbox/searchbar/uploader/gallery）
8. E2E 测试更新
9. 全量验证（单元测试 + 类型检查 + E2E）
