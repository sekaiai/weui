# Panel 面板

用于组合内容区块，可作为列表、图文等内容的容器。面板由头部（标题）、主体、底部三部分组成。主体内容通过默认插槽自定义，可组合 `MediaList`、`MediaBox`、`CellGroup` 等子组件实现各种列表形态。

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

`Panel` 作为容器，`MediaList` 接收 `items` 数组自动渲染。每项含 `thumb` 时自动渲染为 `weui-media-box_appmsg`。配合 `footer-text` 自动渲染"查看更多"链接。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel type="access" title="图文组合列表" footer-text="查看更多">
      <weui-media-list :items="appmsgItems" />
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="图文组合列表" footer-text="查看更多">
    <weui-media-list :items="items" />
  </weui-panel>
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

`items` 每项不含 `thumb`，`MediaList` 自动渲染为 `weui-media-box_text`。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel type="access" title="文字组合列表" footer-text="查看更多">
      <weui-media-list :items="textItems" />
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="文字组合列表" footer-text="查看更多">
    <weui-media-list :items="items" />
  </weui-panel>
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

`MediaBox` 的 `small-appmsg` 类型作为容器，内部用 `CellGroup` + `Cell` 组件渲染紧凑列表。icon 自动有 16px 右间距。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel title="小图文组合列表">
      <weui-media-box type="small-appmsg">
        <weui-cell
          v-for="item in cellItems"
          :key="item.id"
          variant="access"
          :icon="item.thumb"
          :value="item.title"
        />
      </weui-media-box>
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel title="小图文组合列表">
    <weui-media-box type="small-appmsg">
      <weui-cell
        v-for="item in items"
        :key="item.id"
        variant="access"
        :icon="item.thumb"
        :value="item.title"
      />
    </weui-media-box>
  </weui-panel>
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

`items` 每项含 `info` 字段，`MediaList` 自动渲染为 `weui-media-box__info` 来源列表。

<div class="demo-block">
  <div class="demo-mobile">
    <weui-panel title="文字列表附来源">
      <weui-media-list :items="infoItems" />
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel title="文字列表附来源">
    <weui-media-list :items="items" />
  </weui-panel>
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
    <weui-panel type="access" title="图文组合列表" footer-text="查看更多" @footer-click="onFooterClick">
      <weui-media-list :items="appmsgItems" />
    </weui-panel>
  </div>
  <p style="margin-top: 8px; color: #576b95;">{{ footerClicked ? '已点击查看更多' : '点击下方"查看更多"试试' }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="图文组合列表" footer-text="查看更多" @footer-click="onFooterClick">
    <weui-media-list :items="items" />
  </weui-panel>
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
      <weui-media-box type="text" title="标题一" desc="由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星">
        <ul class="weui-media-box__info">
          <li class="weui-media-box__info__meta">文字来源</li>
          <li class="weui-media-box__info__meta">时间</li>
          <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
        </ul>
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
    <weui-media-box type="text" title="标题一" desc="描述...">
      <ul class="weui-media-box__info">
        <li class="weui-media-box__info__meta">文字来源</li>
        <li class="weui-media-box__info__meta">时间</li>
        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
      </ul>
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
| footer-text | 底部"查看更多"文字，传入时自动渲染为 link cell | `string` | — |
| footer-href | footer 链接地址 | `string` | `'javascript:void(0);'` |
| ext-class | 附加在根元素上的扩展类名 | `string` | — |

### MediaList

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据列表，自动按 thumb 判断 appmsg/text | `MediaListItem[]` | — |

### MediaBox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | media-box 类型 | `'appmsg' \| 'text' \| 'small-appmsg'` | `'appmsg'` |
| thumb | 缩略图 URL（仅 appmsg 模式有效） | `string` | — |
| title | 标题 | `string` | — |
| desc | 描述 | `string` | — |
| href | 链接地址，传入时用 `<a>` 包裹（仅 appmsg 模式有效） | `string` | — |
| ext-class | 扩展类名 | `string` | — |

### MediaListItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| id | 唯一标识 | `string \| number` |
| title | 标题 | `string` |
| desc | 描述 | `string` |
| thumb | 缩略图 URL | `string` |
| href | 链接地址 | `string` |
| info | 来源信息列表 | `string[]` |
| ext-class | 扩展类名 | `string` |

## Events

### Panel

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| footer-click | 点击 footerText 渲染的链接时触发 | `(event: Event)` |

### MediaList

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| item-click | 点击无 href 的列表项时触发 | `(item: MediaListItem, event: Event)` |

### MediaBox

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击时触发（仅当 href 未传入时） | `(event: Event)` |

## Slots

### Panel

| 名称 | 说明 |
| --- | --- |
| default | 主体内容 |
| header | 自定义头部，替代 `title` |
| footer | 底部内容，替代 `footer-text` |

### MediaBox

| 名称 | 说明 |
| --- | --- |
| default | 放在 `__bd` 末尾（text 模式附 info；small-appmsg 模式放 Cell 组件） |
| hd | 自定义头部，替代 `thumb`（仅 appmsg 模式） |
