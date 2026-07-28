# Slideview 滑动菜单

左滑显示操作按钮的视图组件，常用于列表项的快捷操作（删除、标记、分享等）。组件采用 Cell 内置滑动项的官方 `weui-cell_swiped` / `weui-swiped-btn` 结构；默认插槽放入一个完整的 `weui-cell`。通过 `v-model:show` 控制展开状态，点击按钮自动收起并触发 `buttonclick` 事件。

<script setup lang="ts">
import { ref } from 'vue'
import type { SlideButton } from 'weui-design-vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const lastResult = ref('')

const buttons1: SlideButton[] = [
  { text: '标记' },
  { text: '删除', type: 'warn' },
]

const buttons2: SlideButton[] = [
  { text: '标记' },
  { text: '分享' },
  { text: '删除', type: 'warn' },
]

const buttons3: SlideButton[] = [
  { text: '标记' },
  { text: '删除', type: 'warn' },
]

const buttons4: SlideButton[] = [
  { text: '标记' },
  { text: '删除', type: 'warn' },
]

const buttons5: SlideButton[] = [
  { text: '编辑' },
  { text: '删除', type: 'warn' },
]

const onButtonClick = (btn: SlideButton, index: number) => {
  lastResult.value = `点击：${btn.text}（索引 ${index}）`
}
</script>

## 基础用法

通过 `buttons` 设置操作按钮列表，`v-model:show` 控制是否展开右侧按钮。移动端可通过左滑手势展开，桌面端（无 touch 事件）通过按钮切换 `show` 状态。点击按钮触发 `buttonclick` 事件并自动收起。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show1 = !show1">{{ show1 ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show1" :buttons="buttons1" @buttonclick="onButtonClick">
    <weui-cell title="滑动菜单内容" />
  </weui-slideview>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = !show">{{ show ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show" :buttons="buttons" @buttonclick="onButtonClick">
    <weui-cell title="滑动菜单内容" />
  </weui-slideview>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SlideButton } from 'weui-design-vue'

const show = ref(false)
const buttons: SlideButton[] = [
  { text: '标记' },
  { text: '删除', type: 'warn' },
]

const onButtonClick = (btn: SlideButton, index: number) => {
  console.log(btn, index)
}
</script>
```
:::

## 三个操作按钮

通过在 `buttons` 中添加更多项实现多按钮操作，`warn` 类型的按钮显示为红色警告样式。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show2 = !show2">{{ show2 ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show2" :buttons="buttons2" @buttonclick="onButtonClick">
    <weui-cell title="三按钮滑动菜单" />
  </weui-slideview>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = !show">{{ show ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show" :buttons="buttons" @buttonclick="onButtonClick">
    <weui-cell title="三按钮滑动菜单" />
  </weui-slideview>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SlideButton } from 'weui-design-vue'

const show = ref(false)
const buttons: SlideButton[] = [
  { text: '标记' },
  { text: '分享' },
  { text: '删除', type: 'warn' },
]
</script>
```
:::

## 禁用滑动

通过 `disabled` 禁用滑动和点击收起交互。父组件仍可通过 `v-model:show` 控制展开状态，但点击内容区域不会自动收起。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show3 = !show3">{{ show3 ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show3" :buttons="buttons3" disabled>
    <weui-cell title="禁用滑动（点击内容区域不收起，但按钮仍可点击收起）" />
  </weui-slideview>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = !show">{{ show ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show" :buttons="buttons" disabled>
    <weui-cell title="禁用滑动（点击内容区域不收起）" />
  </weui-slideview>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SlideButton } from 'weui-design-vue'

const show = ref(false)
const buttons: SlideButton[] = [
  { text: '标记' },
  { text: '删除', type: 'warn' },
]
</script>
```
:::

## 点击按钮自动收起

点击右侧操作按钮时，组件自动触发 `buttonclick` 事件并收起（`show` 置为 `false`），无需手动处理收起逻辑。同时触发 `close` 事件。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show4 = !show4">{{ show4 ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show4" :buttons="buttons4" @buttonclick="onButtonClick">
    <weui-cell title="点击右侧按钮后自动收起" />
  </weui-slideview>
  <p v-if="lastResult" style="margin-top: 8px; color: #07c160;">{{ lastResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = !show">{{ show ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show" :buttons="buttons" @buttonclick="onButtonClick">
    <weui-cell title="点击右侧按钮后自动收起" />
  </weui-slideview>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SlideButton } from 'weui-design-vue'

const show = ref(false)
const buttons: SlideButton[] = [
  { text: '标记' },
  { text: '删除', type: 'warn' },
]

const onButtonClick = (btn: SlideButton, index: number) => {
  console.log(btn, index)
}
</script>
```
:::

## 自定义内容

通过 default slot 自定义左侧内容区域，可放置卡片、列表项等任意内容。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="show5 = !show5">{{ show5 ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show5" :buttons="buttons5" @buttonclick="onButtonClick">
    <div class="weui-cell" style="padding: 12px 16px; background: #fff;">
      <div class="weui-cell__hd" style="margin-right: 8px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: #07c160; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px;">A</div>
      </div>
      <div class="weui-cell__bd">
        <div style="font-weight: 500;">自定义卡片标题</div>
        <div style="font-size: 13px; color: #888;">这是一段描述文字</div>
      </div>
    </div>
  </weui-slideview>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = !show">{{ show ? '收起' : '展开' }}</weui-button>
  <weui-slideview v-model:show="show" :buttons="buttons" @buttonclick="onButtonClick">
    <div class="weui-cell" style="padding: 12px 16px; background: #fff;">
      <div class="weui-cell__hd" style="margin-right: 8px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: #07c160;">A</div>
      </div>
      <div class="weui-cell__bd">
        <div>自定义卡片标题</div>
        <div style="font-size: 13px; color: #888;">这是一段描述文字</div>
      </div>
    </div>
  </weui-slideview>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SlideButton } from 'weui-design-vue'

const show = ref(false)
const buttons: SlideButton[] = [
  { text: '编辑' },
  { text: '删除', type: 'warn' },
]
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show (v-model) | 是否展开右侧按钮 | boolean | false |
| buttons | 操作按钮列表 | SlideButton[] | [] |
| disabled | 是否禁用滑动和点击收起 | boolean | false |
| ext-class | 自定义附加类名 | string | — |

### SlideButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 按钮文字 | string | — |
| type | 按钮类型，`warn` 为警告样式（红色） | 'default' \| 'warn' | — |
| width | 操作按钮宽度（px）；展开距离由所有按钮宽度相加得出 | number | 68 |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:show | 展开状态变化时触发 | (value: boolean) |
| buttonclick | 点击按钮时触发，随后自动收起 | (button: SlideButton, index: number) |
| close | 收起时触发（点击按钮或点击内容区域均会触发） | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 左侧主内容区域 |
