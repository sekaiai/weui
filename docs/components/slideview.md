# Slideview 滑动视图

左滑显示操作按钮的视图组件，常用于列表项的快捷操作（删除、收藏、编辑等）。

## 基础用法

通过 `buttons` 设置操作按钮列表，`v-model:show` 控制是否展开右侧按钮。点击按钮触发 `buttonclick` 事件并自动收起。

```vue
<template>
  <weui-slideview
    v-model:show="show"
    :buttons="buttons"
    @buttonclick="onButtonClick"
  >
    <view class="weui-cell__bd">滑动视图内容</view>
  </weui-slideview>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SlideButton } from 'weui-design-vue'

const show = ref(false)
const buttons: SlideButton[] = [
  { text: '收藏' },
  { text: '编辑' },
]
</script>
```

## 警告按钮

通过 `type: 'warn'` 将按钮设为警告样式，常用于删除等危险操作。

```vue
<template>
  <weui-slideview
    v-model:show="show"
    :buttons="buttons"
    @buttonclick="onButtonClick"
  >
    <view class="weui-cell__bd">左滑显示删除按钮</view>
  </weui-slideview>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SlideButton } from 'weui-design-vue'

const show = ref(false)
const buttons: SlideButton[] = [
  { text: '收藏' },
  { text: '删除', type: 'warn' },
]

const onButtonClick = (btn: SlideButton, index: number) => {
  console.log(btn, index)
}
</script>
```

## 禁用滑动

通过 `disabled` 禁用滑动交互，此时点击内容区域不会收起。父组件仍可通过 `v-model:show` 控制展开状态。

```vue
<template>
  <weui-slideview
    v-model:show="show"
    :buttons="buttons"
    disabled
  >
    <view class="weui-cell__bd">禁用滑动（点击内容区域不收起）</view>
  </weui-slideview>
</template>
```

## 自定义类名

通过 `ext-class` 追加自定义类名到根元素。

```vue
<template>
  <weui-slideview
    v-model:show="show"
    :buttons="buttons"
    ext-class="my-slideview"
  >
    <view class="weui-cell__bd">自定义类名</view>
  </weui-slideview>
</template>
```

## 点击内容区域收起

当 `show=true` 时，点击左侧内容区域会自动收起并触发 `close` 事件。配合 `v-model:show` 即可实现双向绑定。

```vue
<template>
  <weui-slideview
    v-model:show="show"
    :buttons="buttons"
    @close="onClose"
  >
    <view class="weui-cell__bd">展开后点击此区域收起</view>
  </weui-slideview>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
const onClose = () => {
  console.log('已收起')
}
</script>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show (v-model) | 是否展开右侧按钮 | `boolean` | `false` |
| buttons | 操作按钮列表 | `SlideButton[]` | `[]` |
| disabled | 是否禁用滑动 | `boolean` | `false` |
| ext-class | 自定义附加类名 | `string` | — |

### SlideButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 按钮文字 | `string` | — |
| type | 按钮类型，`warn` 为警告样式 | `'default' \| 'warn'` | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:show | 展开状态变化时触发 | `(value: boolean)` |
| buttonclick | 点击按钮时触发 | `(button: SlideButton, index: number)` |
| close | 收起时触发 | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 主内容区域 |
