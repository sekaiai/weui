# Tabbar 底部导航栏

Tabbar 底部导航栏，用于页面底部 tab 切换。`weui-tabbar` 作为容器，`weui-tabbar-item` 作为单个标签项。

## 基础用法

通过 `weui-tabbar` 包裹多个 `weui-tabbar-item`，使用 `active` 属性标记当前选中项，配合 `icon` 和 `text` 设置图标与文字。

```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item
      icon="/static/icon.png"
      text="微信"
      :active="active === 0"
      @click="active = 0"
    />
    <weui-tabbar-item
      icon="/static/icon2.png"
      text="通讯录"
      :active="active === 1"
      @click="active = 1"
    />
    <weui-tabbar-item
      icon="/static/icon3.png"
      text="发现"
      :active="active === 2"
      @click="active = 2"
    />
    <weui-tabbar-item
      icon="/static/icon4.png"
      text="我"
      :active="active === 3"
      @click="active = 3"
    />
  </weui-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>
```

## 选中态

`active` 为 `true` 时，item 根元素追加 `weui-tabbar__item_active` 类，呈现高亮选中样式。

```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item icon="/static/icon.png" text="未选中" />
    <weui-tabbar-item icon="/static/icon.png" text="选中" active />
  </weui-tabbar>
</template>
```

## 激活图标

通过 `activeIcon` 属性设置激活状态下的图标，激活时会优先使用 `activeIcon` 而非 `icon`。

```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item
      icon="/static/icon.png"
      active-icon="/static/icon-active.png"
      text="首页"
      active
    />
    <weui-tabbar-item
      icon="/static/icon.png"
      active-icon="/static/icon-active.png"
      text="我的"
    />
  </weui-tabbar>
</template>
```

## 徽标提示

通过 `badge` 属性在图标右上角显示数字或文字徽标。`badge` 支持字符串和数字类型。

```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item icon="/static/icon.png" text="微信" badge="8" />
    <weui-tabbar-item icon="/static/icon.png" text="通讯录" :badge="99" />
    <weui-tabbar-item icon="/static/icon.png" text="发现" />
    <weui-tabbar-item icon="/static/icon.png" text="我" />
  </weui-tabbar>
</template>
```

## 红点提示

通过 `showDot` 属性显示红点提示，表示有新内容但不需要显示具体数量。

```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item icon="/static/icon.png" text="微信" badge="8" />
    <weui-tabbar-item icon="/static/icon.png" text="通讯录" />
    <weui-tabbar-item icon="/static/icon.png" text="发现" show-dot />
    <weui-tabbar-item icon="/static/icon.png" text="我" />
  </weui-tabbar>
</template>
```

## 固定在底部

通过 `fixed` 属性将 tabbar 固定在页面底部。

```vue
<template>
  <weui-tabbar fixed>
    <weui-tabbar-item icon="/static/icon.png" text="首页" active />
    <weui-tabbar-item icon="/static/icon.png" text="分类" />
    <weui-tabbar-item icon="/static/icon.png" text="购物车" />
    <weui-tabbar-item icon="/static/icon.png" text="我的" />
  </weui-tabbar>
</template>
```

## 自定义图标

通过 `icon` 具名插槽替代 `icon` / `activeIcon` 属性，渲染自定义图标内容。

```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item text="首页" active>
      <template #icon>
        <image src="/static/icon.png" class="custom-icon" />
      </template>
    </weui-tabbar-item>
    <weui-tabbar-item text="我的">
      <template #icon>
        <image src="/static/icon.png" class="custom-icon" />
      </template>
    </weui-tabbar-item>
  </weui-tabbar>
</template>
```

## 自定义内容

通过默认插槽替代 `text` 属性，渲染更丰富的标签内容。

```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item icon="/static/icon.png">
      <span style="color: #07c160;">首页</span>
    </weui-tabbar-item>
    <weui-tabbar-item icon="/static/icon.png">
      <span>我的</span>
    </weui-tabbar-item>
  </weui-tabbar>
</template>
```

## 点击事件

每个 `weui-tabbar-item` 点击时会触发 `click` 事件，回调参数为原生 `Event` 对象，可在事件处理中切换 `active`。

```vue
<template>
  <weui-tabbar>
    <weui-tabbar-item
      icon="/static/icon.png"
      text="tab1"
      :active="active === 0"
      @click="onTab(0)"
    />
    <weui-tabbar-item
      icon="/static/icon.png"
      text="tab2"
      :active="active === 1"
      @click="onTab(1)"
    />
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
| activeIcon | 激活图标 URL | `string` | — |
| text | 文字 | `string` | — |
| active | 是否选中 | `boolean` | `false` |
| badge | 徽标内容 | `string \| number` | — |
| showDot | 是否显示红点 | `boolean` | `false` |
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
