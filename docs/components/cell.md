<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const clickResult = ref('')
const vcode = ref('')
const vcodeSeconds = ref(0)
let vcodeTimer: ReturnType<typeof setInterval> | undefined

const sendVcode = () => {
  if (vcodeSeconds.value) return
  vcodeSeconds.value = 59
  vcodeTimer = setInterval(() => {
    vcodeSeconds.value -= 1
    if (!vcodeSeconds.value && vcodeTimer) clearInterval(vcodeTimer)
  }, 1000)
}

onBeforeUnmount(() => vcodeTimer && clearInterval(vcodeTimer))
</script>

# Cell 列表项

Cell 由 header、body 与 footer 构成，适用于表单项、设置项和列表项。WeUI 的状态样式均使用明确 attr；`ext-class` 仅用于业务自定义样式。

`CellGroup` 是纯分组外壳，H5 与 uni-app 都只输出 `.weui-cells__group` 并渲染 `default` slot。标题、提示和列表主体由 `Cells` 负责；需要分组多个列表时显式组合 `CellGroup` 与 `Cells`。

Cells 容器的内置 modifier 使用语义属性：`<weui-cells form>`、`<weui-cells radio>`、`<weui-cells checkbox>` 和 `<weui-cells after-title>`；`ext-class` 只用于业务自定义样式。

## Cells 容器

`weui-cells` 自带标题、列表主体和底部提示结构。`title`、`tips` 没有内容时对应区域不会渲染；同名 slot 的优先级高于 prop。`default` slot 始终渲染到 `.weui-cells` 主体中。

```vue
<weui-cells title="列表标题" tips="底部提示" form>
  <weui-cell title="列表项" />
  <template #title><strong>自定义列表标题</strong></template>
  <template #tips>自定义底部提示</template>
</weui-cells>
```

### Cells / CellGroup API

| 组件 | Props | Slots |
| --- | --- | --- |
| `weui-cells` | `title`、`tips`、`form`、`radio`、`checkbox`、`after-title`、`ext-class` | `title`、`default`、`tips` |
| `weui-cell-group` | `form`、`primary`、`ext-class`、`aria-role` | `default` |

`CellGroup` 不接受 `title`、`footer`、`radio` 或 `checkbox`；这些内容和 modifier 分别由 `Cells` 或专用的 CheckboxGroup / RadioGroup 负责。

`CellGroup` 只用于包裹多个 Cells 或应用分组级样式，不接收标题、提示和 Cell modifier：

```vue
<weui-cell-group form primary>
  <weui-cells title="账号信息">
    <weui-cell label="姓名" />
  </weui-cells>
  <weui-cells title="其他信息">
    <weui-cell label="地址" />
  </weui-cells>
</weui-cell-group>
```

## 基础用法

`title` 渲染 body 中的列表标题，`footer` 渲染右侧说明。`icon` 位于左侧 header；`link` 表示链接样式并可传入页面路径，`access` 只表示普通访问箭头。默认插槽是表单控件等自由 body 内容入口。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cells title="列表项"><weui-cell title="标题文字" footer="说明文字" /><weui-cell icon="info" title="带图标的标题" subtitle="副标题在标题下方" footer="说明文字" /><weui-cell link="/components/cell" icon="success" title="可跳转的列表项" footer="查看详情" /></weui-cells><weui-cells form title="默认 body 插槽"><weui-cell label="姓名"><weui-input placeholder="请输入姓名" /></weui-cell></weui-cells></div></div>

::: details 查看代码
```vue
<weui-cells title="列表项">
  <weui-cell title="标题文字" footer="说明文字" />
  <weui-cell
    icon="info"
    title="带图标的标题"
    subtitle="副标题在标题下方"
    footer="说明文字"
  />
  <weui-cell
    link="/components/cell"
    icon="success"
    title="可跳转的列表项"
    footer="查看详情"
  />
</weui-cells>

<weui-cells form title="默认 body 插槽">
  <weui-cell label="姓名">
    <weui-input placeholder="请输入姓名" />
  </weui-cell>
</weui-cells>
```
:::

## 表单标签

`label` 渲染表单标签；验证码场景使用 `vcode`，输入框放在默认插槽，发送按钮放在 `#footer` 插槽。点击按钮会模拟发送并从“已发送(59)”开始倒计时。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cells form title="表单标签"><weui-cell label="手机号"><weui-input type="number" placeholder="请输入手机号" /></weui-cell><weui-cell label="验证码" vcode><weui-input v-model="vcode" type="number" placeholder="请输入验证码" /><template #footer><weui-button vcode :disabled="vcodeSeconds > 0" @click="sendVcode">{{ vcodeSeconds ? `已发送(${vcodeSeconds})` : '获取验证码' }}</weui-button></template></weui-cell></weui-cells></div></div>

::: details 查看代码
```vue
<script setup lang="ts">
import { ref } from 'vue'

const seconds = ref(0)
const code = ref('')
let timer: ReturnType<typeof setInterval> | undefined
const send = () => {
  if (seconds.value) return
  seconds.value = 59
  timer = setInterval(() => {
    seconds.value -= 1
    if (!seconds.value && timer) clearInterval(timer)
  }, 1000)
}
</script>

<template>
  <weui-cells form title="表单标签">
    <weui-cell label="手机号"><weui-input type="number" placeholder="请输入手机号" /></weui-cell>
    <weui-cell label="验证码" vcode>
      <weui-input v-model="code" type="number" placeholder="请输入验证码" />
      <template #footer>
        <weui-button vcode :disabled="seconds > 0" @click="send">
          {{ seconds ? `已发送(${seconds})` : '获取验证码' }}
        </weui-button>
      </template>
    </weui-cell>
  </weui-cells>
</template>
```
:::

## 图标、跳转与副标题

`icon` 独立渲染在 header，`title` 与 `subtitle` 位于可伸缩的 body，`footer` 位于右侧。`link` 是推荐的跳转 attr：传入路径时，H5 直接渲染 `href`，小程序直接使用 `url`，并同时使用链接与访问箭头样式；`access` 只使用访问箭头样式。普通图标字符串会渲染为 WeUI 图标，`/`、`./`、`../`、`http(s):` 与 `data:` 开头的字符串会渲染为图片；`#icon` 插槽也自带默认对齐和间距。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cells title="带图标、跳转的列表项"><weui-cell link icon="info" title="cell standard" subtitle="通过图标名渲染" footer="说明文字" @click="clickResult = 'cell click 事件已触发'" /><weui-cell link icon="https://weui.io/images/pic_160.png" title="image icon" subtitle="通过图片地址渲染" /><weui-cell link title="slot icon" subtitle="插槽也有默认对齐"><template #icon><weui-icon type="success" /></template></weui-cell></weui-cells><p>{{ clickResult || '点击列表项试试' }}</p></div></div>

::: details 查看代码
```vue
<weui-cells title="带跳转的列表项">
  <weui-cell link="/pages/detail/index" icon="info" title="cell standard" subtitle="通过图标名渲染" footer="说明文字" />
  <weui-cell link icon="https://weui.io/images/pic_160.png" title="image icon" subtitle="通过图片地址渲染" />
  <weui-cell link title="slot icon" subtitle="插槽也有默认对齐">
    <template #icon><weui-icon type="success" /></template>
  </weui-cell>
</weui-cells>
```
:::

## 内置状态

状态 attr 只作用于对应的 Cell；输入控件本身也必须同步设置 `readonly` 或 `disabled`。`primary` 使用多行文本域的顶部对齐样式，原生选择框直接使用 `weui-select`，它会内置完整的 `weui-cell_select` 结构；传入 `label` 时会自动使用官方 after 布局以对齐标题。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cells form title="输入状态"><weui-cell warn label="卡号"><weui-input type="number" model-value="1234567" /><template #footer><i class="weui-icon-warn" /></template></weui-cell><weui-cell readonly label="EMail"><weui-input model-value="1234567" readonly /></weui-cell><weui-cell disabled label="微信号"><weui-input model-value="WeUI" disabled /></weui-cell></weui-cells><weui-cells form title="多行与选择"><weui-textarea primary label="地址" placeholder="请输入地址" /><weui-select label="地区" placeholder="请选择"><option value="shenzhen">深圳</option><option value="guangzhou">广州</option></weui-select></weui-cells></div></div>

::: details 查看代码
```vue
<weui-cells form title="输入状态">
  <weui-cell warn label="卡号">
    <weui-input type="number" model-value="1234567" />
    <template #footer><i class="weui-icon-warn" /></template>
  </weui-cell>
  <weui-cell readonly label="EMail">
    <weui-input model-value="1234567" readonly />
  </weui-cell>
  <weui-cell disabled label="微信号">
    <weui-input model-value="WeUI" disabled />
  </weui-cell>
</weui-cells>

<weui-cells form title="多行与选择">
  <weui-textarea primary label="地址" placeholder="请输入地址" />
  <weui-select label="地区" placeholder="请选择">
    <option value="shenzhen">深圳</option>
    <option value="guangzhou">广州</option>
  </weui-select>
</weui-cells>
```
:::

## 内置滑动删除

`is-swipe` 使用官方滑动结构。向左滑动显示操作按钮，点击按钮触发 `swipe-click`。

<div class="demo-block vp-raw"><div class="demo-mobile"><weui-cells title="滑动删除"><weui-cell is-swipe title="可滑动的列表项" footer="向左滑动试试" @swipe-click="clickResult = 'swipe-click 已触发'" /><weui-cell is-swipe swipe-text="归档" swipe-type="default" title="可滑动的列表项" footer="自定义按钮" /></weui-cells></div></div>

::: details 查看代码
```vue
<weui-cells title="滑动删除">
  <weui-cell is-swipe title="可滑动的列表项" footer="向左滑动试试" @swipe-click="removeItem" />
  <weui-cell is-swipe swipe-text="归档" swipe-type="default" title="可滑动的列表项" footer="自定义按钮" />
</weui-cells>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | body 标题；`#title` 可自定义 | `string` | — |
| label | header 中的表单标签，可与 icon 共存 | `string` | — |
| subtitle | body 标题下的副标题；`#subtitle` 可自定义 | `string` | — |
| footer | 右侧说明；`#footer` 可自定义 | `string` | — |
| value / desc | footer 的兼容回退，优先级低于 footer | `string` | — |
| link | 链接样式与目标；追加访问箭头，字符串直接作为 href / url | `boolean \| string` | `false` |
| access | 普通访问箭头样式与目标；字符串直接作为 href / url | `boolean \| string` | `false` |
| vcode / warn / uploader | 验证码、警告、上传状态 | `boolean` | `false` |
| readonly / disabled | 输入只读或禁用状态 | `boolean` | `false` |
| primary / wrap | 顶部对齐或可折行 | `boolean` | `false` |
| select / select-before / select-after | 选择框状态 | `boolean` | `false` |
| active | 静态按下态样式 | `boolean` | `false` |
| is-swipe | 官方结构的滑动操作项 | `boolean` | `false` |
| swipe-text / swipe-type | 操作按钮文案与类型 | `string` / `'default' \| 'warn'` | `'删除'` / `'warn'` |
| ext-class | 自定义扩展类 | `string` | — |

## Events

| 事件 | 说明 |
| --- | --- |
| click | 点击 cell |
| navigate / navigate-error | 使用 link、access 或 url 导航时的结果 |
| swipe-click | 点击内置 swipe 操作按钮 |
