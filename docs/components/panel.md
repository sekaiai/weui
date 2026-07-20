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
