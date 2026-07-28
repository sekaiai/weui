# Panel 面板

用于组合内容区块，可作为列表、图文等内容的容器。面板由头部（标题）、主体、底部三部分组成。主体内容通过默认插槽自定义，可组合 `MediaBox`、`Cell`、`CellGroup` 等子组件实现各种列表形态。

`Panel` 是纯容器组件，列表数据由外部通过 `v-for` 在插槽中循环渲染 `MediaBox` 或 `Cell`。

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

const infoItem = ref({
  title: '标题一',
  desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星',
  info: ['文字来源', '时间', '其它信息'],
})

const footerClicked = ref(false)
const onFooterClick = () => { footerClicked.value = true }
</script>

## 图文组合列表

`Panel` 作为容器，外部 `v-for` 循环 `MediaBox` 并传入 `thumb`。`MediaBox` 会根据是否传入 `thumb`（或 `hd` slot）自动判定为 `appmsg` 图文模式或 `text` 纯文字模式。配合 `footer-text` 自动渲染"查看更多"链接。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-panel type="access" title="图文组合列表" footer-text="查看更多">
      <weui-media-box
        v-for="item in appmsgItems"
        :key="item.id"
        :thumb="item.thumb"
        :title="item.title"
        :desc="item.desc"
        :href="item.href"
      />
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="图文组合列表" footer-text="查看更多">
    <weui-media-box
      v-for="item in items"
      :key="item.id"
      :thumb="item.thumb"
      :title="item.title"
      :desc="item.desc"
      :href="item.href"
    />
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

`MediaBox` 不传 `thumb` 时自动渲染为纯文字组合列表（`weui-media-box_text`）。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-panel type="access" title="文字组合列表" footer-text="查看更多">
      <weui-media-box
        v-for="item in textItems"
        :key="item.id"
        :title="item.title"
        :desc="item.desc"
      />
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="文字组合列表" footer-text="查看更多">
    <weui-media-box
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :desc="item.desc"
    />
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

`MediaBox` 指定 `type="cells"` 作为容器。这个案例的图片尺寸、正文语义和跳转箭头与通用 `Cell` 不同，因此按官方结构直接组合 `.weui-cell_example`：46px 图片放在 `__hd`，标题放在 `__bd.weui-cell_primary`，跳转箭头由空的 `__ft` 保留。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-panel title="小图文组合列表">
      <weui-media-box type="cells">
        <a
          v-for="item in cellItems"
          :key="item.id"
          :href="item.href"
          class="weui-cell weui-cell_active weui-cell_access weui-cell_example"
        >
          <div class="weui-cell__hd">
            <img :src="item.thumb" alt="" style="display: block; width: 46px; height: 46px;" />
          </div>
          <div class="weui-cell__bd weui-cell_primary"><p>{{ item.title }}</p></div>
          <div class="weui-cell__ft" />
        </a>
      </weui-media-box>
    </weui-panel>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel title="小图文组合列表">
    <weui-media-box type="cells">
      <a
        v-for="item in items"
        :key="item.id"
        :href="item.href"
        class="weui-cell weui-cell_active weui-cell_access weui-cell_example"
      >
        <div class="weui-cell__hd">
          <img :src="item.thumb" alt="" style="display: block; width: 46px; height: 46px;" />
        </div>
        <div class="weui-cell__bd weui-cell_primary"><p>{{ item.title }}</p></div>
        <div class="weui-cell__ft" />
      </a>
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

`MediaBox` 不传 `thumb` 时为纯文字模式，默认插槽放在 `__bd` 末尾，可用于渲染 `weui-media-box__info` 来源信息。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-panel title="文字列表附来源">
      <weui-media-box :title="infoItem.title" :desc="infoItem.desc">
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
  <weui-panel title="文字列表附来源">
    <weui-media-box :title="item.title" :desc="item.desc">
      <ul class="weui-media-box__info">
        <li class="weui-media-box__info__meta">文字来源</li>
        <li class="weui-media-box__info__meta">时间</li>
        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
      </ul>
    </weui-media-box>
  </weui-panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const item = ref({
  title: '标题一',
  desc: '由各种物质组成的巨型球状天体...',
  info: ['文字来源', '时间', '其它信息'],
})
</script>
```
:::

## footer-click 事件交互

通过 `@footer-click` 监听"查看更多"链接的点击事件。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-panel type="access" title="图文组合列表" footer-text="查看更多" @footer-click="onFooterClick">
      <weui-media-box
        v-for="item in appmsgItems"
        :key="item.id"
        :thumb="item.thumb"
        :title="item.title"
        :desc="item.desc"
        :href="item.href"
      />
    </weui-panel>
  </div>
  <p style="margin-top: 8px; color: #576b95;">{{ footerClicked ? '已点击查看更多' : '点击下方"查看更多"试试' }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-panel type="access" title="图文组合列表" footer-text="查看更多" @footer-click="onFooterClick">
    <weui-media-box
      v-for="item in items"
      :key="item.id"
      :thumb="item.thumb"
      :title="item.title"
      :desc="item.desc"
    />
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

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-panel>
      <template #header>
        <div style="font-weight: bold; color: #576b95;">自定义头部</div>
      </template>
      <weui-media-box :title="infoItem.title" :desc="infoItem.desc">
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
    <weui-media-box title="标题一" desc="描述...">
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

### MediaBox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | media-box 类型：`text`=图文/纯文字（根据 `thumb` 自动判断），`cells`=小图文组合列表容器 | `'text' \| 'cells'` | `'text'` |
| thumb | 缩略图 URL。传入时自动渲染为 `appmsg` 图文模式，否则为 `text` 纯文字模式 | `string` | — |
| title | 标题 | `string` | — |
| desc | 描述 | `string` | — |
| href | 链接地址，传入时用 `<a>` 包裹（仅非 cells 模式有效） | `string` | — |
| ext-class | 扩展类名 | `string` | — |

## Events

### Panel

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| footer-click | 点击 footerText 渲染的链接时触发 | `(event: Event)` |

### MediaBox

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击时触发（仅当 href 未传入时，非 cells 模式有效） | `(event: Event)` |

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
| default | appmsg/text 模式：放在 `__bd` 末尾（如 info 来源列表）；cells 模式：放 `Cell` 组件 |
| hd | 自定义头部，替代 `thumb`。传入时自动切换为 appmsg 图文模式 |
