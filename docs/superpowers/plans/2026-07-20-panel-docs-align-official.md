# Panel 文档对齐官方示例实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 新增 `WeuiMediaBox` 子组件，增强 `WeuiPanel` 支持数据驱动渲染（`items`/`itemType`/`footerText`），重写 panel 文档与示例页对齐 WeUI 官方 4 种形态，修复小图文组合列表"两条分割线"问题。

**架构：** 源码用 `<div>`/`<span>`/`<img>` + 官方语义标签（`<strong>`/`<p>`/`<ul>`/`<li>`/`<a>`），build-plugin 在构建 uni-app 产物时转换为 `view`/`text`/`image`/`navigator`。Panel 内部根据 `items` 和 `itemType` 自动渲染 `<weui-media-box>`，无需用户手写复杂 HTML。

**技术栈：** Vue 3 + TypeScript + Vite 库模式 + VitePress + Playwright + Vitest

---

## 文件结构

### 创建的文件

- `packages/components/src/media-box/media-box.vue` — MediaBox 组件主文件
- `packages/components/src/media-box/index.ts` — MediaBox 导出
- `packages/components/src/media-box/__tests__/media-box.spec.ts` — MediaBox 单元测试

### 修改的文件

- `packages/components/build-plugin.ts` — 扩展 TAG_MAP（新增 a/strong/p/ul/li）+ 正则转义
- `packages/components/src/panel/panel.vue` — 新增 items/itemType/footerText/footerHref props + 内部调用 media-box
- `packages/components/src/panel/index.ts` — 导出 WeuiMediaBox + PanelItem 类型
- `packages/components/src/index.ts` — 导出 WeuiMediaBox + 类型
- `packages/components/src/panel/__tests__/panel.spec.ts` — 补充新 props/emit 测试
- `docs/components/panel.md` — 重写 6 个 demo
- `examples/uni-app/src/pages/panel/panel.vue` — 重写 5 个 demo-section
- `tests/e2e-docs/panel.spec.ts` — 重写 7 个测试
- `tests/e2e/panel.spec.ts` — 重写 5 个测试

---

## 任务 1：扩展 build-plugin TAG_MAP

**文件：**
- 修改：`packages/components/build-plugin.ts`

- [ ] **步骤 1：扩展 TAG_MAP 并加固正则**

打开 `packages/components/build-plugin.ts`，将第 8-12 行的 `TAG_MAP` 扩展为：

```ts
// 标签映射表（HTML → uni-app）
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

然后将第 98-113 行的 `transformTags` 函数替换为带正则转义的版本：

```ts
function transformTags(content: string): string {
  let transformed = content
  for (const [htmlTag, uniTag] of Object.entries(TAG_MAP)) {
    // 转义 tag 名中的正则特殊字符（防御性编程）
    const escapedTag = htmlTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // 开标签：<div 后面跟空格、> 或 /（避免 <a 误匹配 <article>）
    transformed = transformed.replace(
      new RegExp(`<${escapedTag}(\\s|>|/)`, 'g'),
      `<${uniTag}$1`,
    )
    // 闭标签
    transformed = transformed.replace(
      new RegExp(`</${escapedTag}>`, 'g'),
      `</${uniTag}>`,
    )
  }
  return transformed
}
```

- [ ] **步骤 2：Commit**

```bash
git add packages/components/build-plugin.ts
git commit -m "build: 扩展 TAG_MAP 支持 a/strong/p/ul/li 标签转换"
```

---

## 任务 2：编写 MediaBox 单元测试（TDD）

**文件：**
- 创建：`packages/components/src/media-box/__tests__/media-box.spec.ts`

- [ ] **步骤 1：编写失败的测试**

创建 `packages/components/src/media-box/__tests__/media-box.spec.ts`：

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiMediaBox from '../media-box.vue'

describe('WeuiMediaBox', () => {
  describe('type=appmsg', () => {
    it('渲染 weui-media-box_appmsg 类名', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题', desc: '描述' },
      })
      expect(wrapper.classes()).toContain('weui-media-box')
      expect(wrapper.classes()).toContain('weui-media-box_appmsg')
    })

    it('根元素为 div（无 href 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题' },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('根元素为 a（有 href 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题', href: '/detail/1' },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('a')
      expect(wrapper.attributes('href')).toBe('/detail/1')
    })

    it('渲染 __hd + __thumb（有 thumb 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', thumb: 'https://example.com/x.png' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__thumb').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__thumb').attributes('src')).toBe('https://example.com/x.png')
    })

    it('不渲染 __hd（无 thumb 且无 hd slot 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(false)
    })

    it('title 渲染为 <strong class="weui-media-box__title">', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题一' },
      })
      const title = wrapper.find('.weui-media-box__title')
      expect(title.exists()).toBe(true)
      expect(title.element.tagName.toLowerCase()).toBe('strong')
      expect(title.text()).toBe('标题一')
    })

    it('desc 渲染为 <p class="weui-media-box__desc">', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', desc: '描述文字' },
      })
      const desc = wrapper.find('.weui-media-box__desc')
      expect(desc.exists()).toBe(true)
      expect(desc.element.tagName.toLowerCase()).toBe('p')
      expect(desc.text()).toBe('描述文字')
    })
  })

  describe('type=text', () => {
    it('渲染 weui-media-box_text 类名', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'text', title: '标题' },
      })
      expect(wrapper.classes()).toContain('weui-media-box_text')
    })

    it('根元素为 div（text 模式总是 div）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'text', title: '标题', href: '/detail' },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('不渲染 __hd（text 模式无头部）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'text', thumb: 'x.png' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(false)
    })
  })

  describe('type=small-appmsg', () => {
    it('渲染 weui-media-box_small-appmsg 类名', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'small-appmsg' },
        slots: { default: '<div class="weui-cells" />' },
      })
      expect(wrapper.classes()).toContain('weui-media-box_small-appmsg')
    })

    it('根元素为 div', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'small-appmsg' },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('default slot 渲染到根元素内', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'small-appmsg' },
        slots: { default: '<div class="weui-cells">cells</div>' },
      })
      expect(wrapper.find('.weui-cells').exists()).toBe(true)
      expect(wrapper.text()).toContain('cells')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', extClass: 'my-box' },
      })
      expect(wrapper.classes()).toContain('my-box')
    })
  })

  describe('click 事件', () => {
    it('无 href 时点击触发 click 事件', async () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题' },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('有 href 时不触发 click 事件（由原生 a 处理）', async () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题', href: '/detail' },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('slots', () => {
    it('default slot 放在 __bd 末尾（appmsg 模式）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题' },
        slots: { default: '<ul class="weui-media-box__info" />' },
      })
      const bd = wrapper.find('.weui-media-box__bd')
      expect(bd.find('.weui-media-box__info').exists()).toBe(true)
    })

    it('hd slot 替代 thumb prop', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg' },
        slots: { hd: '<div class="custom-hd" />' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__hd .custom-hd').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__thumb').exists()).toBe(false)
    })
  })
})
```

- [ ] **步骤 2：运行测试验证失败**

运行：`cd packages/components && pnpm vitest run src/media-box/__tests__/media-box.spec.ts`
预期：FAIL，报错 "Cannot find module '../media-box.vue'"

---

## 任务 3：实现 MediaBox 组件

**文件：**
- 创建：`packages/components/src/media-box/media-box.vue`
- 创建：`packages/components/src/media-box/index.ts`

- [ ] **步骤 1：实现 media-box.vue**

创建 `packages/components/src/media-box/media-box.vue`：

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

<script lang="ts">
export default {
  name: 'WeuiMediaBox',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export type WeuiMediaBoxType = 'appmsg' | 'text' | 'small-appmsg'

export interface WeuiMediaBoxProps {
  /** media-box 类型，对应官方类名后缀 */
  type: WeuiMediaBoxType
  /** 缩略图 URL（仅 appmsg 模式有效） */
  thumb?: string
  /** 标题，渲染为 <strong class="weui-media-box__title"> */
  title?: string
  /** 描述，渲染为 <p class="weui-media-box__desc"> */
  desc?: string
  /** 链接地址，传入时整个 media-box 用 <a> 包裹（仅 appmsg 模式有效） */
  href?: string
  /** 扩展类名 */
  extClass?: string
}

export interface WeuiMediaBoxEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<WeuiMediaBoxProps>(), {
  type: 'appmsg',
  thumb: undefined,
  title: undefined,
  desc: undefined,
  href: undefined,
  extClass: undefined,
})

const emit = defineEmits<WeuiMediaBoxEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-media-box', `weui-media-box_${props.type}`]
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onClick = (event: Event) => {
  // 仅当 href 未传入时触发 click 事件（有 href 时由 <a> 原生处理跳转）
  if (!props.href) {
    emit('click', event)
  }
}
</script>
```

- [ ] **步骤 2：创建 index.ts**

创建 `packages/components/src/media-box/index.ts`：

```ts
import type { App } from 'vue'
import WeuiMediaBox from './media-box.vue'

WeuiMediaBox.install = (app: App) => {
  app.component(WeuiMediaBox.name || 'WeuiMediaBox', WeuiMediaBox)
}

export { WeuiMediaBox }
export type { WeuiMediaBoxProps, WeuiMediaBoxEmits, WeuiMediaBoxType } from './media-box.vue'
```

- [ ] **步骤 3：运行测试验证通过**

运行：`cd packages/components && pnpm vitest run src/media-box/__tests__/media-box.spec.ts`
预期：PASS，所有测试通过

- [ ] **步骤 4：Commit**

```bash
git add packages/components/src/media-box/
git commit -m "feat(media-box): 新增 MediaBox 组件支持 appmsg/text/small-appmsg 三种类型"
```

---

## 任务 4：增强 Panel 组件支持数据驱动

**文件：**
- 修改：`packages/components/src/panel/panel.vue`

- [ ] **步骤 1：重写 panel.vue**

将 `packages/components/src/panel/panel.vue` 完整内容替换为：

```vue
<template>
  <div :class="rootClass">
    <!-- 头部：header slot 优先，否则用 title -->
    <div v-if="$slots.header || title" class="weui-panel__hd">
      <slot name="header">{{ title }}</slot>
    </div>

    <!-- 主体 -->
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

    <!-- 底部：footer slot 优先，否则用 footerText -->
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

<script lang="ts">
export default {
  name: 'WeuiPanel',
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import WeuiMediaBox from '../media-box/media-box.vue'

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

export type WeuiPanelItemType = 'media' | 'cell'

export interface WeuiPanelProps {
  /** 头部标题 */
  title?: string
  /** 面板类型，access 模式添加 weui-panel_access 类 */
  type?: 'default' | 'access'
  /** 数据列表，传入时自动渲染 media-box 或 cells（根据 itemType） */
  items?: PanelItem[]
  /** 列表项渲染模式。media=松散卡片，cell=紧凑列表（有分割线） */
  itemType?: WeuiPanelItemType
  /** 底部"查看更多"文字。传入时自动渲染为标准 link cell */
  footerText?: string
  /** footer 链接地址，配合 footerText 使用 */
  footerHref?: string
  /** 附加在根元素上的扩展类名 */
  extClass?: string
}

export interface WeuiPanelEmits {
  (e: 'footer-click', event: Event): void
  (e: 'item-click', item: PanelItem, event: Event): void
}

const props = withDefaults(defineProps<WeuiPanelProps>(), {
  title: undefined,
  type: 'default',
  items: () => [],
  itemType: 'media',
  footerText: undefined,
  footerHref: 'javascript:void(0);',
  extClass: undefined,
})

const emit = defineEmits<WeuiPanelEmits>()

const slots = useSlots()

const rootClass = computed(() => {
  const classes: string[] = ['weui-panel']
  if (props.type === 'access') classes.push('weui-panel_access')
  if (props.extClass) classes.push(props.extClass)
  return classes
})
</script>
```

- [ ] **步骤 2：更新 panel/index.ts 导出**

将 `packages/components/src/panel/index.ts` 替换为：

```ts
import type { App } from 'vue'
import WeuiPanel from './panel.vue'
import { WeuiMediaBox } from '../media-box'

WeuiPanel.install = (app: App) => {
  app.component(WeuiPanel.name || 'WeuiPanel', WeuiPanel)
  app.component(WeuiMediaBox.name || 'WeuiMediaBox', WeuiMediaBox)
}

export { WeuiPanel, WeuiMediaBox }
export type { WeuiPanelProps, WeuiPanelEmits, WeuiPanelItemType, PanelItem } from './panel.vue'
```

- [ ] **步骤 3：Commit**

```bash
git add packages/components/src/panel/panel.vue packages/components/src/panel/index.ts
git commit -m "feat(panel): 增强 Panel 支持 items/itemType/footerText 数据驱动渲染"
```

---

## 任务 5：更新 src/index.ts 导出 MediaBox

**文件：**
- 修改：`packages/components/src/index.ts`

- [ ] **步骤 1：在导入区添加 MediaBox**

在 `packages/components/src/index.ts` 第 17 行（`import { WeuiPanel } from './panel'`）下方添加：

```ts
import { WeuiMediaBox } from './media-box'
```

- [ ] **步骤 2：在类型导入区添加**

在第 62 行（`import type { WeuiPanelProps } from './panel'`）下方添加：

```ts
import type { WeuiMediaBoxProps, WeuiMediaBoxEmits, WeuiMediaBoxType } from './media-box'
import type { WeuiPanelEmits, WeuiPanelItemType, PanelItem } from './panel'
```

- [ ] **步骤 3：在 components 数组添加**

在第 97 行（`WeuiCell, WeuiCellGroup, WeuiGrid, WeuiGridItem, WeuiPanel, WeuiList,`）修改为：

```ts
WeuiCell, WeuiCellGroup, WeuiGrid, WeuiGridItem, WeuiPanel, WeuiMediaBox, WeuiList,
```

- [ ] **步骤 4：在组件导出添加**

在第 121 行（`WeuiCell, WeuiCellGroup, WeuiGrid, WeuiGridItem, WeuiPanel, WeuiList,`）修改为：

```ts
WeuiCell, WeuiCellGroup, WeuiGrid, WeuiGridItem, WeuiPanel, WeuiMediaBox, WeuiList,
```

- [ ] **步骤 5：在类型导出添加**

在第 147 行（`WeuiPanelProps,`）下方添加：

```ts
WeuiMediaBoxProps, WeuiMediaBoxEmits, WeuiMediaBoxType,
WeuiPanelEmits, WeuiPanelItemType, PanelItem,
```

- [ ] **步骤 6：运行 typecheck 验证**

运行：`pnpm -r typecheck`
预期：无错误

- [ ] **步骤 7：Commit**

```bash
git add packages/components/src/index.ts
git commit -m "feat: 导出 WeuiMediaBox 组件及相关类型"
```

---

## 任务 6：补充 Panel 单元测试

**文件：**
- 修改：`packages/components/src/panel/__tests__/panel.spec.ts`

- [ ] **步骤 1：在文件末尾追加新测试块**

在 `packages/components/src/panel/__tests__/panel.spec.ts` 末尾的 `})` 之前（第 139 行之前）追加：

```ts
  describe('items (media 模式)', () => {
    it('传入 items 时渲染对应数量 media-box', () => {
      const items = [
        { id: 1, title: '标题一', desc: '描述一' },
        { id: 2, title: '标题二', desc: '描述二' },
      ]
      const wrapper = mount(WeuiPanel, { props: { items } })
      expect(wrapper.findAll('.weui-media-box')).toHaveLength(2)
    })

    it('有 thumb 的项渲染为 appmsg', () => {
      const items = [{ id: 1, title: '标题', thumb: 'x.png' }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(false)
    })

    it('无 thumb 的项渲染为 text', () => {
      const items = [{ id: 1, title: '标题' }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(false)
    })

    it('含 info 字段的项渲染 weui-media-box__info', () => {
      const items = [{
        id: 1,
        title: '标题',
        info: ['来源', '时间', '其它'],
      }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      expect(wrapper.find('.weui-media-box__info').exists()).toBe(true)
      expect(wrapper.findAll('.weui-media-box__info__meta')).toHaveLength(3)
      // 最后一项有 meta_extra 类
      const metas = wrapper.findAll('.weui-media-box__info__meta')
      expect(metas[2].classes()).toContain('weui-media-box__info__meta_extra')
    })

    it('有 thumb + info 时也渲染 info（info 不受 thumb 影响）', () => {
      const items = [{
        id: 1,
        title: '标题',
        thumb: 'x.png',
        info: ['来源', '时间'],
      }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      // appmsg 模式下也渲染 info
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__info').exists()).toBe(true)
      expect(wrapper.findAll('.weui-media-box__info__meta')).toHaveLength(2)
    })
  })

  describe('items (cell 模式)', () => {
    it('itemType=cell 时渲染 small-appmsg + weui-cells', () => {
      const items = [{ id: 1, title: '标题一' }]
      const wrapper = mount(WeuiPanel, {
        props: { items, itemType: 'cell' },
      })
      expect(wrapper.find('.weui-media-box_small-appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-cells').exists()).toBe(true)
    })

    it('每项渲染为 weui-cell_example', () => {
      const items = [
        { id: 1, title: '标题一' },
        { id: 2, title: '标题二' },
      ]
      const wrapper = mount(WeuiPanel, {
        props: { items, itemType: 'cell' },
      })
      expect(wrapper.findAll('.weui-cell_example')).toHaveLength(2)
    })

    it('有 thumb 时渲染为 cell__hd 内的小图', () => {
      const items = [{ id: 1, title: '标题', thumb: 'x.png' }]
      const wrapper = mount(WeuiPanel, {
        props: { items, itemType: 'cell' },
      })
      const hd = wrapper.find('.weui-cell .weui-cell__hd')
      expect(hd.exists()).toBe(true)
      expect(hd.find('img').exists()).toBe(true)
    })
  })

  describe('footerText', () => {
    it('传入 footerText 渲染 link cell', () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '查看更多' },
      })
      const link = wrapper.find('.weui-cell_link')
      expect(link.exists()).toBe(true)
      expect(link.text()).toContain('查看更多')
    })

    it('footerText 渲染的 link cell 含 weui-cell_active weui-cell_access 类', () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '查看更多' },
      })
      const link = wrapper.find('.weui-cell_link')
      expect(link.classes()).toContain('weui-cell_active')
      expect(link.classes()).toContain('weui-cell_access')
    })

    it('footerHref 默认为 javascript:void(0);', () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '查看更多' },
      })
      expect(wrapper.find('.weui-cell_link').attributes('href')).toBe('javascript:void(0);')
    })

    it('footer slot 优先于 footerText', () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '默认文字' },
        slots: { footer: '<div class="custom-footer">自定义</div>' },
      })
      expect(wrapper.find('.custom-footer').exists()).toBe(true)
      expect(wrapper.find('.weui-cell_link').exists()).toBe(false)
    })
  })

  describe('events', () => {
    it('点击 footerText 渲染的链接触发 footer-click 事件', async () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '查看更多' },
      })
      await wrapper.find('.weui-cell_link').trigger('click')
      expect(wrapper.emitted('footer-click')).toBeTruthy()
      expect(wrapper.emitted('footer-click')).toHaveLength(1)
    })

    it('点击无 href 的 media 项触发 item-click 事件', async () => {
      const items = [{ id: 1, title: '标题' }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      await wrapper.find('.weui-media-box').trigger('click')
      expect(wrapper.emitted('item-click')).toBeTruthy()
      const [itemArg] = wrapper.emitted('item-click')![0] as [PanelItem]
      expect(itemArg.id).toBe(1)
    })
  })

  describe('向后兼容', () => {
    it('无 items 时 default slot 正常渲染', () => {
      const wrapper = mount(WeuiPanel, {
        slots: { default: '<div class="custom-body">主体</div>' },
      })
      expect(wrapper.find('.custom-body').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box').exists()).toBe(false)
    })

    it('无 footerText 且无 footer slot 时不渲染 __ft', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.find('.weui-panel__ft').exists()).toBe(false)
    })
  })
```

同时在文件顶部 import 区追加 `PanelItem` 类型导入：

```ts
import WeuiPanel, { type PanelItem } from '../panel.vue'
```

- [ ] **步骤 2：运行测试验证通过**

运行：`cd packages/components && pnpm vitest run src/panel/__tests__/panel.spec.ts`
预期：PASS，所有测试通过（包括原有 + 新增）

- [ ] **步骤 3：Commit**

```bash
git add packages/components/src/panel/__tests__/panel.spec.ts
git commit -m "test(panel): 补充 items/itemType/footerText/events 单元测试"
```

---

## 任务 7：重写 panel.md 文档

**文件：**
- 修改：`docs/components/panel.md`

- [ ] **步骤 1：完整重写 panel.md**

将 `docs/components/panel.md` 完整内容替换为：

```markdown
# Panel 面板

用于组合内容区块，可作为列表、图文等内容的容器。面板由头部（标题）、主体、底部三部分组成。通过 `items` 数组数据驱动渲染，支持图文组合、文字组合、小图文组合、文字列表附来源四种官方形态；也可通过默认插槽手动组合 `MediaBox`。

<script setup lang="ts">
import { ref } from 'vue'

const appmsgItems = ref([
  { id: 1, thumb: 'https://weui.io/images/pic_160.png', title: '标题一', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星', href: 'javascript:void(0);' },
  { id: 2, thumb: 'https://weui.io/images/pic_160.png', title: '标题二', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星', href: 'javascript:void(0);' },
])

const textItems = ref([
  { id: 1, title: '标题一', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星' },
  { id: 2, title: '标题二', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星' },
])

const cellItems = ref([
  { id: 1, thumb: 'https://weui.io/images/pic_160.png', title: '文字标题', href: 'javascript:void(0);' },
  { id: 2, thumb: 'https://weui.io/images/pic_160.png', title: '文字标题', href: 'javascript:void(0);' },
])

const infoItems = ref([
  {
    id: 1,
    title: '标题一',
    desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星',
    info: ['文字来源', '时间', '其它信息'],
  },
])

const footerClicked = ref(false)
const onFooterClick = () => { footerClicked.value = true }
</script>

## 图文组合列表

`type="access"` + `items` 每项含 `thumb`，自动渲染为 `weui-media-box_appmsg`。配合 `footer-text` 自动渲染"查看更多"链接。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel type="access" title="图文组合列表" :items="appmsgItems" footer-text="查看更多" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="图文组合列表" :items="items" footer-text="查看更多" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const items = ref([
  { id: 1, thumb: 'https://weui.io/images/pic_160.png', title: '标题一', desc: '由各种物质组成的巨型球状天体...', href: 'javascript:void(0);' },
  { id: 2, thumb: 'https://weui.io/images/pic_160.png', title: '标题二', desc: '由各种物质组成的巨型球状天体...', href: 'javascript:void(0);' },
])
</script>
```
:::

## 文字组合列表

`items` 每项不含 `thumb`，自动渲染为 `weui-media-box_text`。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel type="access" title="文字组合列表" :items="textItems" footer-text="查看更多" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="文字组合列表" :items="items" footer-text="查看更多" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const items = ref([
  { id: 1, title: '标题一', desc: '由各种物质组成的巨型球状天体...' },
  { id: 2, title: '标题二', desc: '由各种物质组成的巨型球状天体...' },
])
</script>
```
:::

## 小图文组合列表

`item-type="cell"` 模式，渲染为 `weui-media-box_small-appmsg` 包裹 `weui-cells`，每项为紧凑列表 cell。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel title="小图文组合列表" :items="cellItems" item-type="cell" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel title="小图文组合列表" :items="items" item-type="cell" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const items = ref([
  { id: 1, thumb: 'https://weui.io/images/pic_160.png', title: '文字标题', href: 'javascript:void(0);' },
  { id: 2, thumb: 'https://weui.io/images/pic_160.png', title: '文字标题', href: 'javascript:void(0);' },
])
</script>
```
:::

## 文字列表附来源

`items` 每项含 `info` 字段，渲染为 `weui-media-box__info` 来源列表（media 模式下均可渲染，cell 模式不渲染）。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel title="文字列表附来源" :items="infoItems" />
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel title="文字列表附来源" :items="items" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const items = ref([
  {
    id: 1,
    title: '标题一',
    desc: '由各种物质组成的巨型球状天体...',
    info: ['文字来源', '时间', '其它信息'],
  },
])
</script>
```
:::

## footer-click 事件交互

通过 `@footer-click` 监听"查看更多"链接的点击事件。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel type="access" title="图文组合列表" :items="appmsgItems" footer-text="查看更多" @footer-click="onFooterClick" />
  </div>
  <p style="margin-top: 8px; color: #576b95;">{{ footerClicked ? '已点击查看更多' : '点击下方"查看更多"试试' }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="图文组合列表" :items="items" footer-text="查看更多" @footer-click="onFooterClick" />
  <p>{{ clicked ? '已点击' : '未点击' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const clicked = ref(false)
const onFooterClick = () => { clicked.value = true }
const items = ref([{ id: 1, thumb: '...', title: '标题', desc: '描述' }])
</script>
```
:::

## 自定义内容

通过 `header` 插槽自定义头部，通过默认插槽手动组合 `MediaBox` 组件。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel>
      <template #header>
        <div style="font-weight: bold; color: #576b95;">自定义头部</div>
      </template>
      <weui-media-box type="small-appmsg">
        <div class="weui-cells">
          <a class="weui-cell weui-cell_active weui-cell_access weui-cell_example" href="javascript:void(0);">
            <div class="weui-cell__hd"><img src="https://weui.io/images/pic_160.png" style="width:20px;height:20px;display:block" /></div>
            <div class="weui-cell__bd weui-cell_primary"><p>文字标题</p></div>
            <div class="weui-cell__ft" />
          </a>
        </div>
      </weui-media-box>
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel>
    <template #header>
      <div style="font-weight: bold; color: #576b95;">自定义头部</div>
    </template>
    <weui-media-box type="small-appmsg">
      <div class="weui-cells">
        <a class="weui-cell weui-cell_active weui-cell_access weui-cell_example" href="javascript:void(0);">
          <div class="weui-cell__hd"><img src="..." style="width:20px;height:20px;display:block" /></div>
          <div class="weui-cell__bd weui-cell_primary"><p>文字标题</p></div>
          <div class="weui-cell__ft" />
        </a>
      </div>
    </weui-media-box>
  </weui-panel>
</template>
```
:::

## Attributes

### Panel

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 头部标题 | `string` | — |
| type | 面板类型，access 模式追加 `weui-panel_access` 类 | `'default' \| 'access'` | `'default'` |
| items | 数据列表，传入时自动渲染 media-box 或 cells | `PanelItem[]` | `[]` |
| item-type | 列表项渲染模式 | `'media' \| 'cell'` | `'media'` |
| footer-text | 底部"查看更多"文字，传入时自动渲染为 link cell | `string` | — |
| footer-href | footer 链接地址 | `string` | `'javascript:void(0);'` |
| ext-class | 附加在根元素上的扩展类名 | `string` | — |

### MediaBox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | media-box 类型 | `'appmsg' \| 'text' \| 'small-appmsg'` | `'appmsg'` |
| thumb | 缩略图 URL（仅 appmsg 模式有效） | `string` | — |
| title | 标题 | `string` | — |
| desc | 描述 | `string` | — |
| href | 链接地址，传入时用 `<a>` 包裹（仅 appmsg 模式有效） | `string` | — |
| ext-class | 扩展类名 | `string` | — |

### PanelItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| id | 唯一标识 | `string \| number` |
| title | 标题 | `string` |
| desc | 描述（仅 media 模式有效） | `string` |
| thumb | 缩略图 URL | `string` |
| href | 链接地址 | `string` |
| info | 来源信息列表（media 模式下渲染，cell 模式不渲染） | `string[]` |
| ext-class | 扩展类名 | `string` |

## Events

### Panel

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| footer-click | 点击 footerText 渲染的链接时触发 | `(event: Event)` |
| item-click | 点击无 href 的列表项时触发 | `(item: PanelItem, event: Event)` |

### MediaBox

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击时触发（仅当 href 未传入时） | `(event: Event)` |

## Slots

### Panel

| 名称 | 说明 |
| --- | --- |
| default | 主体内容，传入 items 时作为 fallback |
| header | 自定义头部，替代 `title` |
| footer | 底部内容，替代 `footer-text` |

### MediaBox

| 名称 | 说明 |
| --- | --- |
| default | 放在 `__bd` 末尾（text 模式附 info；small-appmsg 模式放 cells） |
| hd | 自定义头部，替代 `thumb`（仅 appmsg 模式） |
```

- [ ] **步骤 2：Commit**

```bash
git add docs/components/panel.md
git commit -m "docs(panel): 重写文档对齐官方 4 种形态示例"
```

---

## 任务 8：重写 uni-app 示例页

**文件：**
- 修改：`examples/uni-app/src/pages/panel/panel.vue`

- [ ] **步骤 1：完整重写示例页**

将 `examples/uni-app/src/pages/panel/panel.vue` 完整内容替换为：

```vue
<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Panel</span>
      <span class="page__desc">面板组件验证页</span>
    </div>

    <div class="page__bd">
      <!-- ① 图文组合列表 -->
      <div class="demo-section">
        <div class="demo-section__title">图文组合列表</div>
        <weui-panel
          type="access"
          title="图文组合列表"
          :items="appmsgItems"
          footer-text="查看更多"
          @footer-click="onFooterClick"
        />
      </div>

      <!-- ② 文字组合列表 -->
      <div class="demo-section">
        <div class="demo-section__title">文字组合列表</div>
        <weui-panel
          type="access"
          title="文字组合列表"
          :items="textItems"
          footer-text="查看更多"
        />
      </div>

      <!-- ③ 小图文组合列表 -->
      <div class="demo-section">
        <div class="demo-section__title">小图文组合列表</div>
        <weui-panel title="小图文组合列表" :items="cellItems" item-type="cell" />
      </view>

      <!-- ④ 文字列表附来源 -->
      <div class="demo-section">
        <div class="demo-section__title">文字列表附来源</div>
        <weui-panel title="文字列表附来源" :items="infoItems" />
      </div>

      <!-- ⑤ 自定义内容 -->
      <div class="demo-section">
        <div class="demo-section__title">自定义内容</div>
        <weui-panel>
          <template #header>
            <div style="font-weight: bold; color: #576b95;">自定义头部</div>
          </template>
          <weui-media-box type="small-appmsg">
            <div class="weui-cells">
              <a class="weui-cell weui-cell_active weui-cell_access weui-cell_example" href="javascript:void(0);">
                <div class="weui-cell__hd"><img src="https://weui.io/images/pic_160.png" style="width:20px;height:20px;display:block" /></div>
                <div class="weui-cell__bd weui-cell_primary"><p>文字标题</p></div>
                <div class="weui-cell__ft" />
              </a>
            </div>
          </weui-media-box>
        </weui-panel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'PagePanel',
})

const appmsgItems = ref([
  { id: 1, thumb: 'https://weui.io/images/pic_160.png', title: '标题一', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星', href: 'javascript:void(0);' },
  { id: 2, thumb: 'https://weui.io/images/pic_160.png', title: '标题二', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星', href: 'javascript:void(0);' },
])

const textItems = ref([
  { id: 1, title: '标题一', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星' },
  { id: 2, title: '标题二', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星' },
])

const cellItems = ref([
  { id: 1, thumb: 'https://weui.io/images/pic_160.png', title: '文字标题', href: 'javascript:void(0);' },
  { id: 2, thumb: 'https://weui.io/images/pic_160.png', title: '文字标题', href: 'javascript:void(0);' },
])

const infoItems = ref([
  {
    id: 1,
    title: '标题一',
    desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星',
    info: ['文字来源', '时间', '其它信息'],
  },
])

const onFooterClick = () => {
  uni.showToast({ title: '点击查看更多', icon: 'none' })
}
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 96px;
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
.demo-section {
  margin-bottom: 32px;
}
.demo-section__title {
  margin-bottom: 12px;
  font-size: 14px;
  color: #888;
}
</style>
```

> 注意：上面示例代码中"小图文组合列表"section 的闭合标签是 `</view>`，这是示例文档中的笔误。实际写入文件时必须是 `</div>`。请严格使用 `</div>`。

- [ ] **步骤 2：修正笔误（如有）**

检查文件中"小图文组合列表"section 的闭合标签是否为 `</div>`，如误写为 `</view>` 则修正为 `</div>`。

- [ ] **步骤 3：Commit**

```bash
git add examples/uni-app/src/pages/panel/panel.vue
git commit -m "feat(examples): 重写 panel 示例页对齐官方 4 种形态"
```

---

## 任务 9：重写 docs E2E 测试

**文件：**
- 修改：`tests/e2e-docs/panel.spec.ts`

- [ ] **步骤 1：完整重写测试文件**

将 `tests/e2e-docs/panel.spec.ts` 完整内容替换为：

```ts
import { test, expect, expectNoErrors } from './helpers'

test.describe('Panel 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('panel')
    await expect(page.locator('h1').first()).toContainText('Panel')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功（≥6）', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(6)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('图文组合列表：渲染 media-box_appmsg 与 thumb', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(0)
    await expect(demo.locator('.weui-panel_access')).toHaveCount(1)
    await expect(demo.locator('.weui-media-box_appmsg')).toHaveCount(2)
    await expect(demo.locator('.weui-media-box__thumb')).toHaveCount(2)
    // footer-text 自动渲染为 link cell
    await expect(demo.locator('.weui-cell_access.weui-cell_link')).toHaveCount(1)
    await expect(demo.locator('.weui-cell__bd')).toContainText('查看更多')
  })

  test('文字组合列表：无 thumb 自动渲染 media-box_text', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(1)
    await expect(demo.locator('.weui-media-box_text')).toHaveCount(2)
    await expect(demo.locator('.weui-media-box__thumb')).toHaveCount(0)
    // 语义标签：strong.weui-media-box__title / p.weui-media-box__desc
    await expect(demo.locator('strong.weui-media-box__title')).toHaveCount(2)
    await expect(demo.locator('p.weui-media-box__desc')).toHaveCount(2)
  })

  test('小图文组合：small-appmsg 包裹 weui-cells，无两条分割线', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(2)
    await expect(demo.locator('.weui-media-box_small-appmsg')).toHaveCount(1)
    await expect(demo.locator('.weui-cells')).toHaveCount(1)
    await expect(demo.locator('.weui-cell_example')).toHaveCount(2)
  })

  test('文字列表附来源：渲染 weui-media-box__info', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(3)
    await expect(demo.locator('.weui-media-box__info')).toHaveCount(1)
    await expect(demo.locator('.weui-media-box__info__meta')).toHaveCount(3)
    // 最后一项有 meta_extra 类
    await expect(demo.locator('.weui-media-box__info__meta_extra')).toHaveCount(1)
  })

  test('footerText 点击触发 footer-click 事件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(4)
    // 初始显示提示文字
    await expect(demo.locator('p')).toContainText('点击下方')
    // 点击 footer link
    await demo.locator('.weui-cell_link').click()
    // 显示已点击
    await expect(demo.locator('p')).toContainText('已点击')
  })

  test('自定义内容：header slot + MediaBox 手动组合', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(5)
    await expect(demo.locator('.weui-panel__hd')).toContainText('自定义头部')
    await expect(demo.locator('.weui-media-box_small-appmsg')).toHaveCount(1)
    await expect(demo.locator('.weui-cell_example')).toHaveCount(1)
  })
})
```

- [ ] **步骤 2：Commit**

```bash
git add tests/e2e-docs/panel.spec.ts
git commit -m "test(e2e-docs): 重写 panel 文档测试覆盖官方 4 种形态"
```

---

## 任务 10：重写 uni-app E2E 测试

**文件：**
- 修改：`tests/e2e/panel.spec.ts`

- [ ] **步骤 1：完整重写测试文件**

将 `tests/e2e/panel.spec.ts` 完整内容替换为：

```ts
import { test, expect, expectNoErrors } from './helpers'

/**
 * Panel 组件 E2E 测试
 * 验证：图文组合、文字组合、小图文组合、文字列表附来源、自定义内容
 */
test.describe('Panel 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('panel')
    await expect(page.locator('.page__title')).toContainText('Panel')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('5 个 demo-section 渲染', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const sections = page.locator('.demo-section')
    await expect(sections).toHaveCount(5)
  })

  test('图文组合列表渲染 media-box_appmsg', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const section = page.locator('.demo-section').filter({ hasText: '图文组合列表' }).first()
    await expect(section.locator('.weui-panel_access')).toHaveCount(1)
    await expect(section.locator('.weui-media-box_appmsg')).toHaveCount(2)
    await expect(section.locator('.weui-media-box__thumb')).toHaveCount(2)
    // footer-text 自动渲染 link cell
    await expect(section.locator('.weui-cell_link')).toHaveCount(1)
  })

  test('文字组合列表渲染 media-box_text', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const section = page.locator('.demo-section').filter({ hasText: '文字组合列表' }).first()
    await expect(section.locator('.weui-media-box_text')).toHaveCount(2)
    await expect(section.locator('.weui-media-box__thumb')).toHaveCount(0)
  })

  test('小图文组合列表渲染 cell_example', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const section = page.locator('.demo-section').filter({ hasText: '小图文组合列表' }).first()
    await expect(section.locator('.weui-media-box_small-appmsg')).toHaveCount(1)
    await expect(section.locator('.weui-cell_example')).toHaveCount(2)
  })

  test('点击 footer 触发 toast', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const section = page.locator('.demo-section').filter({ hasText: '图文组合列表' }).first()
    // 点击 footer link（<a> 自定义元素，用 evaluate 触发原生 click）
    await section.locator('.weui-cell_link').evaluate((el) => el.click())
    // toast 可见
    await expect(page.locator('.weui-toast')).toBeVisible()
    await expect(page.locator('.weui-toast__content')).toContainText('点击查看更多')
  })
})
```

- [ ] **步骤 2：Commit**

```bash
git add tests/e2e/panel.spec.ts
git commit -m "test(e2e): 重写 panel 示例页测试覆盖 5 个 demo-section"
```

---

## 任务 11：全量验证

- [ ] **步骤 1：运行 pnpm build 重建产物**

运行：`pnpm build`
预期：vue3 和 uni-app 产物均构建成功，`dist/uni-app/src/media-box/media-box.vue` 中标签已转换为 view/text/image/navigator

- [ ] **步骤 2：运行单元测试**

运行：`cd packages/components && pnpm vitest run`
预期：所有测试通过（包括原有 + 新增 media-box + panel 补充）

- [ ] **步骤 3：运行 typecheck**

运行：`pnpm -r typecheck`
预期：无错误

- [ ] **步骤 4：运行 E2E 测试**

运行：`pnpm e2e`
预期：所有测试通过（docs + examples）

- [ ] **步骤 5：手动验证关键页面**

在浏览器打开 `http://localhost:5174/components/panel`，验证：
1. 6 个 demo-block 全部渲染成功
2. 小图文组合列表 demo 无"两条分割线"问题
3. 所有语义标签正确渲染（strong/p/ul/li/a）
4. footerText 点击后显示"已点击"反馈

- [ ] **步骤 6：生成验证报告**

向用户报告：
- 单元测试：X 个通过
- typecheck：无错误
- E2E 测试：X 个通过

- [ ] **步骤 7：Commit（如有验证修复）**

如验证中发现问题并修复，则 commit：

```bash
git add -A
git commit -m "fix: 验证修复"
```

如无问题则跳过此步。
