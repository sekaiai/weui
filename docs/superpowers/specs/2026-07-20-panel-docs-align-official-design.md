# Panel 文档对齐官方示例设计

## 1. 背景与问题

### 1.1 问题来源

对照 WeUI 官方示例 `node_modules/weui/dist/example/index.html`（weui@2.6.26）中的 panel.html，发现本项目 `docs/components/panel.md` 存在以下不规范之处：

1. **"两条分割线"问题**：基础用法在 `weui-panel__bd` 中直接放置 `weui-cells`，`weui-cells` 自带 `:before` 顶部分割线，与 `weui-panel__hd` 的下边框叠加，形成两条相邻的分割线。官方做法是用 `weui-media-box_small-appmsg` 包裹 `weui-cells` 来消除冲突。

2. **示例丰富度不足**：官方 panel 示例有 4 种标准形态（图文组合、文字组合、小图文组合、文字列表附来源），本项目仅实现了第 1 种（图文组合），缺失 3 种。

3. **标签语义化缺失**：官方用 `<strong>`（标题）、`<p>`（描述）、`<ul>/<li>`（来源列表）、`<a>`（可点击链接），本项目用 `<div>` 代替，不符合官方 HTML 语义。

4. **类名不完整**：官方在 cell 上使用 `weui-cell_active weui-cell_access weui-cell_link`（footer 链接）和 `weui-cell_example`（小图文列表），本项目均未使用。

5. **"查看更多"非语义化**：官方用 `<a class="weui-cell...">`，本项目用 `<div class="weui-cell...">`。

### 1.2 官方 panel.html 完整结构

从 `node_modules/.pnpm/weui@2.6.26/node_modules/weui/dist/example/index.html` 第 3873-3964 行提取，官方 panel 示例包含 4 种形态：

| 形态 | 容器类名 | 内容结构 | 是否可点击 |
|------|----------|----------|------------|
| ① 图文组合列表 | `weui-panel_access` + `weui-media-box_appmsg` | `<a>` 包裹 `__hd`(thumb) + `__bd`(strong+p) | 是（`<a href>`） |
| ② 文字组合列表 | `weui-panel_access` + `weui-media-box_text` | `<div>` 包含 strong+p | 否 |
| ③ 小图文组合列表 | `weui-media-box_small-appmsg` 包裹 `weui-cells` | cell 内 `__hd`(小图) + `__bd`(p) + `__ft` | 是（cell 上 `<a href>`） |
| ④ 文字列表附来源 | `weui-media-box_text` | strong + p + `ul.weui-media-box__info` | 否 |

**"查看更多"标准结构**：
```html
<a href="javascript:" class="weui-cell weui-cell_active weui-cell_access weui-cell_link">
  <span class="weui-cell__bd">查看更多</span>
  <span class="weui-cell__ft"></span>
</a>
```

## 2. 设计目标

1. **数据驱动**：Panel 作为整体容器，用户传 `items` 数组即可自动渲染，无需手写 media-box HTML
2. **组件化**：MediaBox 作为独立子组件，可被 Panel 内部调用，也可被用户单独使用
3. **官方对齐**：文档示例覆盖官方 4 种形态，使用官方语义标签和完整类名
4. **构建兼容**：源码用 div/span/img + 官方语义标签（strong/p/ul/li/a），构建时由 build-plugin 转换为 uni-app 标签
5. **最小破坏**：Panel 现有 `title`/`type`/`extClass` props 和 `default`/`header`/`footer` slots 保持向后兼容

## 3. 组件设计

### 3.1 新增 WeuiMediaBox 组件

**文件位置**：`packages/components/src/media-box/`

**目录结构**：
```
media-box/
├── media-box.vue
├── index.ts
└── __tests__/
    └── media-box.spec.ts
```

**Props**：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'appmsg' \| 'text' \| 'small-appmsg'` | `'appmsg'` | media-box 类型，对应官方类名后缀 |
| `thumb` | `string` | — | 缩略图 URL（仅 appmsg 模式有效） |
| `title` | `string` | — | 标题，渲染为 `<strong class="weui-media-box__title">` |
| `desc` | `string` | — | 描述，渲染为 `<p class="weui-media-box__desc">` |
| `href` | `string` | — | 链接地址，传入时整个 media-box 用 `<a>` 包裹 |
| `extClass` | `string` | — | 扩展类名 |

**Slots**：

| 名称 | 说明 |
|------|------|
| `default` | 放在 `__bd` 末尾。text 模式用于附 `weui-media-box__info` 来源列表；small-appmsg 模式用于放 `weui-cells` |
| `hd` | 自定义头部，替代 `thumb` prop（仅 appmsg 模式有效） |

**Emits**：

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `click` | 点击时触发（仅当 `href` 未传入时，内部用 `<div>` 包裹并触发 click） | `(event: Event)` |

**渲染规则**：

- `type=appmsg` + 有 `href` → `<a class="weui-media-box weui-media-box_appmsg" :href>`
- `type=appmsg` + 无 `href` → `<div class="weui-media-box weui-media-box_appmsg" @click>`
- `type=text` → `<div class="weui-media-box weui-media-box_text">`（不可点击，无 href 概念）
- `type=small-appmsg` → `<div class="weui-media-box weui-media-box_small-appmsg">`（仅作为容器，default slot 放 weui-cells）

**模板伪代码**：

> 注意：不能用 `<component :is="tag">` 动态组件，因为 build-plugin 基于源码字符串替换标签，动态组件的标签名是运行时决定的，无法被转换。必须用 `v-if` 条件渲染，让源码中直接出现 `<a>` 和 `<div>` 标签。

```vue
<template>
  <!-- appmsg + href → <a>（可点击） -->
  <a v-if="type === 'appmsg' && href" :href="href" :class="rootClass" @click="onClick">
    <div class="weui-media-box__hd">
      <slot name="hd">
        <img v-if="thumb" class="weui-media-box__thumb" :src="thumb" />
      </slot>
    </div>
    <div class="weui-media-box__bd">
      <strong v-if="title" class="weui-media-box__title">{{ title }}</strong>
      <p v-if="desc" class="weui-media-box__desc">{{ desc }}</p>
      <slot />
    </div>
  </a>

  <!-- 其他情况 → <div>（appmsg 无 href / text / small-appmsg） -->
  <div v-else :class="rootClass" @click="onClick">
    <!-- appmsg 模式：渲染 __hd + __bd -->
    <template v-if="type === 'appmsg'">
      <div class="weui-media-box__hd">
        <slot name="hd">
          <img v-if="thumb" class="weui-media-box__thumb" :src="thumb" />
        </slot>
      </div>
      <div class="weui-media-box__bd">
        <strong v-if="title" class="weui-media-box__title">{{ title }}</strong>
        <p v-if="desc" class="weui-media-box__desc">{{ desc }}</p>
        <slot />
      </div>
    </template>

    <!-- text 模式：仅渲染标题+描述+默认 slot -->
    <template v-else-if="type === 'text'">
      <strong v-if="title" class="weui-media-box__title">{{ title }}</strong>
      <p v-if="desc" class="weui-media-box__desc">{{ desc }}</p>
      <slot />
    </template>

    <!-- small-appmsg 模式：仅作为容器 -->
    <template v-else>
      <slot />
    </template>
  </div>
</template>
```

**计算属性**：

```ts
const rootClass = computed(() => {
  const classes = ['weui-media-box', `weui-media-box_${props.type}`]
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onClick = (event: Event) => {
  // 仅当 href 未传入时触发 click 事件（有 href 时由 <a> 原生处理跳转）
  if (!props.href) {
    emit('click', event)
  }
}
```

### 3.2 WeuiPanel 组件增强

**文件位置**：`packages/components/src/panel/panel.vue`

**新增 Props**：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `PanelItem[]` | `[]` | 数据列表，传入时自动渲染 media-box 或 cells（根据 itemType） |
| `itemType` | `'media' \| 'cell'` | `'media'` | 列表项渲染模式。media=松散卡片，cell=紧凑列表（有分割线） |
| `footerText` | `string` | — | 底部"查看更多"文字。传入时自动渲染为标准 link cell |
| `footerHref` | `string` | `'javascript:void(0);'` | footer 链接地址，配合 footerText 使用 |

**PanelItem 类型**：

```ts
export interface PanelItem {
  /** 唯一标识，用于 v-for key */
  id?: string | number
  /** 标题 */
  title: string
  /** 描述（仅 media 模式有效，cell 模式不渲染） */
  desc?: string
  /** 缩略图 URL。有 thumb 的 media 项 → appmsg；无 thumb → text；cell 模式下渲染为 20×20 小图标 */
  thumb?: string
  /** 链接地址，传入时该项可点击 */
  href?: string
  /** 来源信息列表（media 模式下渲染为 weui-media-box__info，cell 模式不渲染） */
  info?: string[]
  /** 扩展类名 */
  extClass?: string
}
```

**新增 Emits**：

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `footer-click` | 点击 footerText 渲染的链接时触发 | `(event: Event)` |
| `item-click` | 点击某个列表项时触发（仅当该项无 href 时） | `(item: PanelItem, event: Event)` |

**内部渲染逻辑**：

1. **header 区域**：`title` prop 或 `header` slot（slot 优先）
2. **body 区域**：
   - 有 `items` 时按 `itemType` 自动渲染
   - `itemType='media'`：每项渲染为 `<weui-media-box>`，type 自动判断（有 thumb → appmsg，无 thumb → text）
   - `itemType='cell'`：用单个 `<weui-media-box type="small-appmsg">` 包裹 `<weui-cells>`，每项渲染为 cell
3. **footer 区域**：`footerText` prop 或 `footer` slot（slot 优先）

**模板伪代码**（关键部分）：

```vue
<template>
  <div :class="rootClass">
    <div v-if="$slots.header || title" class="weui-panel__hd">
      <slot name="header">{{ title }}</slot>
    </div>

    <div class="weui-panel__bd">
      <!-- 默认 slot：无外部传入时用 items 渲染 -->
      <slot>
        <!-- media 模式 -->
        <template v-if="items?.length && itemType === 'media'">
          <weui-media-box
            v-for="(item, i) in items"
            :key="item.id ?? i"
            :type="item.thumb ? 'appmsg' : 'text'"
            :thumb="item.thumb"
            :title="item.title"
            :desc="item.desc"
            :href="item.href"
            :ext-class="item.extClass"
            @click="emit('item-click', item, $event)"
          >
            <ul v-if="item.info?.length" class="weui-media-box__info">
              <li
                v-for="(meta, mi) in item.info"
                :key="mi"
                class="weui-media-box__info__meta"
                :class="{ 'weui-media-box__info__meta_extra': mi === item.info!.length - 1 }"
              >{{ meta }}</li>
            </ul>
          </weui-media-box>
        </template>

        <!-- cell 模式 -->
        <weui-media-box v-else-if="items?.length && itemType === 'cell'" type="small-appmsg">
          <div class="weui-cells">
            <a
              v-for="(item, i) in items"
              :key="item.id ?? i"
              class="weui-cell weui-cell_active weui-cell_access weui-cell_example"
              :href="item.href || 'javascript:void(0);'"
              @click="!item.href && emit('item-click', item, $event)"
            >
              <div v-if="item.thumb" class="weui-cell__hd">
                <img :src="item.thumb" style="width:20px;height:20px;display:block" />
              </div>
              <div class="weui-cell__bd weui-cell_primary">
                <p>{{ item.title }}</p>
              </div>
              <div class="weui-cell__ft" />
            </a>
          </div>
        </weui-media-box>
      </slot>
    </div>

    <div v-if="footerText || $slots.footer" class="weui-panel__ft">
      <slot name="footer">
        <a
          v-if="footerText"
          :href="footerHref"
          class="weui-cell weui-cell_active weui-cell_access weui-cell_link"
          @click="emit('footer-click', $event)"
        >
          <span class="weui-cell__bd">{{ footerText }}</span>
          <span class="weui-cell__ft" />
        </a>
      </slot>
    </div>
  </div>
</template>
```

**向后兼容**：现有 `title`/`type`/`extClass` props 和 `default`/`header`/`footer` slots 完全保留。当 `items` 未传入时，走默认 slot 逻辑，与旧行为一致。

## 4. build-plugin 标签映射扩展

**文件**：`packages/components/build-plugin.ts`

**当前 TAG_MAP**：
```ts
const TAG_MAP: Record<string, string> = {
  div: 'view',
  span: 'text',
  img: 'image',
}
```

**扩展后**：
```ts
const TAG_MAP: Record<string, string> = {
  div: 'view',
  span: 'text',
  img: 'image',
  a: 'navigator',     // media-box 和 footer link 的 <a>
  strong: 'text',     // media-box__title
  p: 'view',          // media-box__desc（保留块级语义）
  ul: 'view',         // media-box__info 列表容器
  li: 'view',         // media-box__info__meta
}
```

**选择理由**：
- `<a>` → `<navigator>`：uni-app 标准导航组件
- `<strong>` → `<text>`：行内文字
- `<p>` → `<view>`：保留块级换行语义（`<text>` 多行需用 `\n`，不友好）
- `<ul>/<li>` → `<view>`：列表容器和项，保留块级语义

**正则安全性**：现有 `transformTags` 正则 `<${htmlTag}(\s|>|/)` 要求标签名后紧跟空格/`>`/`/`，已能避免 `<a>` 误匹配 `<article>`（`a` 后跟 `r` 不匹配）。为防御性编程，建议对 tag 名做正则转义：

```ts
function transformTags(content: string): string {
  let transformed = content
  for (const [htmlTag, uniTag] of Object.entries(TAG_MAP)) {
    const escapedTag = htmlTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    transformed = transformed.replace(
      new RegExp(`<${escapedTag}(\\s|>|/)`, 'g'),
      `<${uniTag}$1`,
    )
    transformed = transformed.replace(
      new RegExp(`</${escapedTag}>`, 'g'),
      `</${uniTag}>`,
    )
  }
  return transformed
}
```

## 5. 文档示例重写

### 5.1 docs/components/panel.md

重写为 **6 个 demo**，对照官方 4 种形态 + 新增属性展示：

| Demo | 标题 | 对应官方形态 | 实现方式 |
|------|------|-------------|----------|
| 1 | 图文组合列表 | ① appmsg | `items` 有 thumb + `footer-text` |
| 2 | 文字组合列表 | ② text | `items` 无 thumb + `footer-text` |
| 3 | 小图文组合列表 | ③ small-appmsg | `items` + `item-type="cell"` |
| 4 | 文字列表附来源 | ④ text+info | `items` 项含 `info` 字段 |
| 5 | footer-click 事件交互 | — | 展示 `footerText` + `@footer-click` 显示反馈文字 |
| 6 | 自定义内容 | — | 默认 slot + header slot 手动组合 MediaBox |

**示例代码风格**：
- 文档示例用 `<div>`/`<span>`/`<img>`/`<strong>`/`<p>`/`<a>`/`<ul>`/`<li>` 标签
- 数据驱动为主，手写 HTML 仅在 Demo 6 展示
- 每个 demo 配 `::: details 查看代码` 折叠块

### 5.2 examples/uni-app/src/pages/panel/panel.vue

重写为 **5 个 demo-section**，与文档 demo 对齐（不含 footerText 单独 demo，因示例页用 toast 反馈）：

1. 图文组合列表（数据驱动 + footer-text + @footer-click 显示 toast）
2. 文字组合列表（数据驱动 + footer-text）
3. 小图文组合列表（cell 模式）
4. 文字列表附来源（info 字段）
5. 自定义内容（手动组合 MediaBox）

**标签要求**：示例页源码用 `<div>`/`<span>`/`<img>` 等标准 HTML 标签（构建时由 build-plugin 转换为 view/text/image）。

## 6. E2E 测试更新

### 6.1 tests/e2e-docs/panel.spec.ts

| 测试用例 | 断言要点 |
|---------|----------|
| 页面正常加载，无 console 错误 | h1 包含 Panel |
| 所有 demo-block 渲染成功 | count ≥ 5 |
| 图文组合列表 | `.weui-panel_access` + `.weui-media-box_appmsg` × 2 + `.weui-media-box__thumb` × 2 + footer link cell |
| 文字组合列表 | `.weui-media-box_text` × 2 + 无 thumb + `strong.weui-media-box__title` + `p.weui-media-box__desc` |
| 小图文组合列表 | `.weui-media-box_small-appmsg` × 1 + `.weui-cells` × 1 + `.weui-cell_example` × 2 |
| 文字列表附来源 | `.weui-media-box__info` × 1 + `.weui-media-box__info__meta` × 3 + `meta_extra` × 1 |
| footerText 点击触发事件 | 点击 `.weui-cell_link` 后显示"点击了查看更多"文字 |

### 6.2 tests/e2e/panel.spec.ts

| 测试用例 | 断言要点 |
|---------|----------|
| 页面正常加载 | 5 个 demo-section |
| 图文组合列表 | `.weui-media-box_appmsg` × 2 |
| 文字组合列表 | `.weui-media-box_text` × 2 |
| 小图文组合列表 | `.weui-cell_example` × 2 |
| 点击 footer 触发 toast | `.weui-cell_link` click → toast 可见 |

### 6.3 单元测试

**media-box.spec.ts**（新增）：
- 3 种 type 渲染对应类名（appmsg/text/small-appmsg）
- thumb 渲染到 `.weui-media-box__hd` + `.weui-media-box__thumb`
- href 传入时根元素为 `<a>`，否则为 `<div>`
- title 用 `<strong>`，desc 用 `<p>`
- default slot 放在 `__bd` 末尾
- click 事件触发（仅无 href 时）

**panel.spec.ts**（补充）：
- `items` 传入时渲染对应数量 media-box
- `itemType='media'` + 有 thumb → appmsg；无 thumb → text
- `itemType='cell'` → 渲染 small-appmsg + cells + cell_example
- `footerText` 渲染 link cell（weui-cell_link）
- `footerText` 与 `footer` slot 同时存在时，slot 优先
- `footer-click` 事件触发
- `item-click` 事件触发（仅无 href 项）
- `items` 含 `info` 字段时渲染 `weui-media-box__info` + `meta_extra`

## 7. 实现步骤

| 步骤 | 文件 | 操作 |
|------|------|------|
| 1 | `packages/components/build-plugin.ts` | 扩展 TAG_MAP（新增 a/strong/p/ul/li）+ 正则转义 |
| 2 | `packages/components/src/media-box/media-box.vue` | 新增组件 |
| 3 | `packages/components/src/media-box/index.ts` | 新增导出 |
| 4 | `packages/components/src/media-box/__tests__/media-box.spec.ts` | 新增单元测试 |
| 5 | `packages/components/src/panel/panel.vue` | 增强：items/itemType/footerText/footerHref + 内部调用 media-box |
| 6 | `packages/components/src/panel/index.ts` | 导出 WeuiMediaBox + PanelItem 类型 |
| 7 | `packages/components/src/index.ts` | 导出 WeuiMediaBox + 类型 |
| 8 | `docs/components/panel.md` | 重写 6 个 demo |
| 9 | `examples/uni-app/src/pages/panel/panel.vue` | 重写 5 个 demo-section |
| 10 | `tests/e2e-docs/panel.spec.ts` | 重写 7 个测试 |
| 11 | `tests/e2e/panel.spec.ts` | 重写 5 个测试 |
| 12 | `packages/components/src/panel/__tests__/panel.spec.ts` | 补充新 props/emit 测试 |
| 13 | 运行 `pnpm build` | 重建产物 |
| 14 | 运行 `pnpm vitest run` | 单元测试 |
| 15 | 运行 `pnpm -r typecheck` | 类型检查 |
| 16 | 运行 `pnpm e2e` | E2E 测试 |

## 8. 验收标准

1. 文档页面 `http://localhost:5174/components/panel` 加载无 console 错误
2. 6 个 demo-block 全部渲染成功
3. 小图文组合列表 demo 无"两条分割线"问题
4. 所有语义标签正确渲染（`<strong>`/`<p>`/`<ul>`/`<li>`/`<a>`）
5. `footerText` 点击触发 `footer-click` 事件
6. 单元测试全部通过
7. typecheck 无错误
8. E2E 测试全部通过（docs + examples）
9. `pnpm build` 产物中 media-box 组件正确打包到 `dist/vue3/index.mjs`
10. `dist/uni-app/src/media-box/media-box.vue` 中标签已转换为 view/text/image/navigator

## 9. 不在本次范围内

- 其他 31 个组件文档的官方对齐（本次仅 panel 试点）
- WeuiCell 组件本身的增强（如支持 `example` 变体）
- WeuiMediaBox 在 panel 之外的其他场景应用（如 list 组件）
- weui.css 版本升级
