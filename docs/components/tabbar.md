# Tabbar 底部导航栏

Tabbar 底部导航栏，用于页面底部 tab 切换。`weui-tabbar` 作为容器，`weui-tabbar-item` 作为单个标签项，支持图标、文字、徽标和红点提示。

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
const activeText = ref(0)

const onTab = (i: number) => {
  active.value = i
}
const onTabText = (i: number) => {
  activeText.value = i
}
</script>

## 基础用法

通过 `weui-tabbar` 包裹多个 `weui-tabbar-item`，使用 `active` 属性标记当前选中项。`text` 设置文字，`#icon` 具名插槽自定义图标内容。无论使用图片还是插槽，图标都会落入官方 `.weui-tabbar__icon` 容器，以保持默认尺寸与文字间距。

<div class="demo-block vp-raw">
  <weui-tabbar>
    <weui-tabbar-item text="微信" :active="active === 0" @click="onTab(0)">
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="通讯录" :active="active === 1" @click="onTab(1)">
      <template #icon><span style="font-size:20px;">👥</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="发现" :active="active === 2" @click="onTab(2)">
      <template #icon><span style="font-size:20px;">🔍</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="我" :active="active === 3" @click="onTab(3)">
      <template #icon><span style="font-size:20px;">👤</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
  <p style="margin-top: 12px; color: #07c160;">当前选中：{{ ['微信', '通讯录', '发现', '我'][active] }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item text="微信" :active="active === 0" @click="onTab(0)">
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="通讯录" :active="active === 1" @click="onTab(1)">
      <template #icon><span style="font-size:20px;">👥</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="发现" :active="active === 2" @click="onTab(2)">
      <template #icon><span style="font-size:20px;">🔍</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="我" :active="active === 3" @click="onTab(3)">
      <template #icon><span style="font-size:20px;">👤</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
const onTab = (i: number) => {
  active.value = i
}
</script>
```
:::

## 纯文字标签

不传 `icon` 与 `#icon` 插槽时，仅渲染文字标签，常用于纯文本切换场景。

<div class="demo-block vp-raw">
  <weui-tabbar>
    <weui-tabbar-item text="首页" :active="activeText === 0" @click="onTabText(0)" />
    <weui-tabbar-item text="分类" :active="activeText === 1" @click="onTabText(1)" />
    <weui-tabbar-item text="购物车" :active="activeText === 2" @click="onTabText(2)" />
  </weui-tabbar>
  <p style="margin-top: 12px; color: #07c160;">当前选中：{{ ['首页', '分类', '购物车'][activeText] }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item text="首页" :active="activeText === 0" @click="onTabText(0)" />
    <weui-tabbar-item text="分类" :active="activeText === 1" @click="onTabText(1)" />
    <weui-tabbar-item text="购物车" :active="activeText === 2" @click="onTabText(2)" />
  </weui-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeText = ref(0)
const onTabText = (i: number) => {
  activeText.value = i
}
</script>
```
:::

## 徽标提示

通过 `badge` 属性在图标右上角显示数字或文字徽标，支持字符串和数字类型。

<div class="demo-block vp-raw">
  <weui-tabbar>
    <weui-tabbar-item text="微信" badge="8">
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="通讯录" :badge="99">
      <template #icon><span style="font-size:20px;">👥</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="发现">
      <template #icon><span style="font-size:20px;">🔍</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="我">
      <template #icon><span style="font-size:20px;">👤</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
</div>

::: details 查看代码
```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item text="微信" badge="8">
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="通讯录" :badge="99">
      <template #icon><span style="font-size:20px;">👥</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="发现">
      <template #icon><span style="font-size:20px;">🔍</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="我">
      <template #icon><span style="font-size:20px;">👤</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
</template>
```
:::

## 红点提示

通过 `showDot` 属性显示红点提示，表示有新内容但不需要显示具体数量。红点与 `badge` 互斥，`showDot` 优先。

<div class="demo-block vp-raw">
  <weui-tabbar>
    <weui-tabbar-item text="微信" badge="8">
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="通讯录">
      <template #icon><span style="font-size:20px;">👥</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="发现" show-dot>
      <template #icon><span style="font-size:20px;">🔍</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="我">
      <template #icon><span style="font-size:20px;">👤</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
</div>

::: details 查看代码
```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item text="微信" badge="8">
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="通讯录">
      <template #icon><span style="font-size:20px;">👥</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="发现" show-dot>
      <template #icon><span style="font-size:20px;">🔍</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="我">
      <template #icon><span style="font-size:20px;">👤</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
</template>
```
:::

## 选中态

`active` 为 `true` 时，item 根元素追加 `weui-bar__item_on` 类，呈现高亮选中样式。

<div class="demo-block vp-raw">
  <weui-tabbar>
    <weui-tabbar-item text="未选中">
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="选中" active>
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
</div>

::: details 查看代码
```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item text="未选中">
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="选中" active>
      <template #icon><span style="font-size:20px;">💬</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
</template>
```
:::

## 自定义内容

通过默认插槽替代 `text` 属性，渲染更丰富的标签内容。

<div class="demo-block vp-raw">
  <weui-tabbar>
    <weui-tabbar-item active>
      <template #icon><span style="font-size:20px;">🏠</span></template>
      <span style="color: #07c160;">首页</span>
    </weui-tabbar-item>
    <weui-tabbar-item>
      <template #icon><span style="font-size:20px;">⚙️</span></template>
      <span>设置</span>
    </weui-tabbar-item>
  </weui-tabbar>
</div>

::: details 查看代码
```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item active>
      <template #icon><span style="font-size:20px;">🏠</span></template>
      <span style="color: #07c160;">首页</span>
    </weui-tabbar-item>
    <weui-tabbar-item>
      <template #icon><span style="font-size:20px;">⚙️</span></template>
      <span>设置</span>
    </weui-tabbar-item>
  </weui-tabbar>
</template>
```
:::

## 固定在底部

通过 `fixed` 属性将 tabbar 固定在视口底部。注意为页面底部内容预留足够间距，避免被遮挡。

<div class="demo-block vp-raw" style="min-height: 80px; position: relative;">
  <p style="color: #888;">下方 tabbar 使用 fixed 固定在视口底部。</p>
  <weui-tabbar fixed>
    <weui-tabbar-item text="首页" active>
      <template #icon><span style="font-size:20px;">🏠</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="分类">
      <template #icon><span style="font-size:20px;">📋</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="我的">
      <template #icon><span style="font-size:20px;">👤</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
</div>

::: details 查看代码
```vue
<template>
  <weui-tabbar fixed>
    <weui-tabbar-item text="首页" active>
      <template #icon><span style="font-size:20px;">🏠</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="分类">
      <template #icon><span style="font-size:20px;">📋</span></template>
    </weui-tabbar-item>
    <weui-tabbar-item text="我的">
      <template #icon><span style="font-size:20px;">👤</span></template>
    </weui-tabbar-item>
  </weui-tabbar>
</template>
```
:::

## Attributes

### Tabbar

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fixed | 是否固定在底部 | `boolean` | `false` |
| extClass | 根元素扩展类名 | `string` | — |

### TabbarItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 URL | `string` | — |
| activeIcon | 激活图标 URL，激活时优先使用 | `string` | — |
| text | 文字 | `string` | — |
| active | 是否选中 | `boolean` | `false` |
| badge | 徽标内容 | `string \| number` | — |
| showDot | 是否显示红点（与 badge 互斥，优先级更高） | `boolean` | `false` |
| extClass | 根元素扩展类名 | `string` | — |

## Events

### TabbarItem

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击选项时触发 | `(event: Event)` |

## Slots

### Tabbar

| 插槽名 | 说明 |
| --- | --- |
| default | tabbar-item 子项 |

### TabbarItem

| 插槽名 | 说明 | 备注 |
| --- | --- | --- |
| icon | 自定义图标 | 替代 `icon` / `activeIcon` 属性 |
| default | 标签内容 | `text` prop 为空时启用 |
