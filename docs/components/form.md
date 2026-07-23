<script setup lang="ts">
import { ref } from 'vue'

const checkboxValues = ref(['1'])
const radioValue = ref('1')
const switchValue = ref(false)
const switchValue2 = ref(true)
const switchValue3 = ref(true)
const textareaValue = ref('')
const selectValue = ref('1')
const selectAfterValue = ref('1')
const mockDate = ref('2026-07-22')
const mockPrefix = ref('+86')
const mockTicket = ref('的士票')

const cycle = <T>(value: { value: T }, options: T[]) => {
  value.value = options[(options.indexOf(value.value) + 1) % options.length]
}
</script>

# Form 表单容器

`weui-form` 组织表单标题、控件和底部操作区。以下案例与官方 WeUI form 示例一一对应，状态通过组件 attrs 表达，不通过 `ext-class` 传递；每个案例均提供可复制的完整用法。

## 表单结构

标题、说明、控件区域和底部操作区域由 `weui-form` 与相关子组件组合。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="表单结构" desc="展示表单页面的信息结构。">
    <weui-cell-group form title="表单组标题">
      <weui-cell label="微信号"><weui-input placeholder="填写本人微信号" /></weui-cell>
      <weui-cell label="昵称"><weui-input placeholder="填写本人微信号的昵称" /></weui-cell>
      <weui-cell label="联系电话"><weui-input type="number" placeholder="填写绑定的电话号码" /></weui-cell>
      <weui-textarea label="verification address" primary placeholder="input your address" rows="3" />
    </weui-cell-group>
    <template #footer><weui-form-tips>表单页提示，居中对齐</weui-form-tips><weui-form-opr><weui-button type="primary" disabled>确定</weui-button></weui-form-opr><weui-form-extra><weui-footer :links="[{ text: '底部链接文本' }]" text="Copyright © weui.io" /></weui-form-extra></template>
  </weui-form>
</div></div>

::: details 查看代码
```vue
<weui-form title="表单结构" desc="展示表单页面的信息结构。">
  <weui-cell-group form title="表单组标题">
    <weui-cell label="微信号"><weui-input placeholder="填写本人微信号" /></weui-cell>
    <weui-cell label="昵称"><weui-input placeholder="填写本人微信号的昵称" /></weui-cell>
    <weui-cell label="联系电话"><weui-input type="number" placeholder="填写绑定的电话号码" /></weui-cell>
  </weui-cell-group>
  <template #footer><weui-form-tips>表单页提示，居中对齐</weui-form-tips><weui-form-opr><weui-button type="primary">确定</weui-button></weui-form-opr></template>
</weui-form>
```
:::

## 反色表单

反色表单使用表单组的官方 primary 外观，适合深色背景区域。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="反色表单" desc="深色背景上的表单展示。">
    <weui-cell-group form ext-class="weui-cells__group_form-primary" title="表单组标题">
      <weui-cell label="微信号"><weui-input placeholder="填写本人微信号" /></weui-cell>
      <weui-cell label="昵称"><weui-input placeholder="填写本人微信号的昵称" /></weui-cell>
    </weui-cell-group>
  </weui-form>
</div></div>

::: details 查看代码
```vue
<weui-form title="反色表单" desc="深色背景上的表单展示。">
  <weui-cell-group form ext-class="weui-cells__group_form-primary" title="表单组标题">
    <weui-cell label="微信号"><weui-input placeholder="填写本人微信号" /></weui-cell>
    <weui-cell label="昵称"><weui-input placeholder="填写本人微信号的昵称" /></weui-cell>
  </weui-cell-group>
</weui-form>
```
:::

## 输入框状态

使用 `warn`、`readonly` 与 `disabled` 明确表达输入反馈状态。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="输入框状态">
    <weui-cell-group form>
      <weui-cell label="卡号" warn><weui-input placeholder="请输入16位数卡号" /></weui-cell>
      <weui-cell label="EMail" readonly><weui-input model-value="1234567" readonly /></weui-cell>
      <weui-cell label="微信号" disabled><weui-input model-value="WeUI" disabled /></weui-cell>
    </weui-cell-group>
  </weui-form>
</div></div>

::: details 查看代码
```vue
<weui-cell-group form>
  <weui-cell label="卡号" warn><weui-input placeholder="请输入16位数卡号" /></weui-cell>
  <weui-cell label="EMail" readonly><weui-input model-value="1234567" readonly /></weui-cell>
  <weui-cell label="微信号" disabled><weui-input model-value="WeUI" disabled /></weui-cell>
</weui-cell-group>
```
:::

## 验证码

验证码 cell 把 input 和发送操作放在同一正文区，避免额外 slot 或嵌套 cell。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="验证码" desc="验证手机号样式。">
    <weui-cell-group form>
      <weui-cell label="手机号"><weui-input type="number" model-value="12345678907" placeholder="请输入手机号" /></weui-cell>
      <weui-cell label="验证码" vcode wrap><weui-input ext-class="weui-cell__control weui-cell__control_flex" placeholder="输入验证码" /><button class="weui-cell__control weui-btn weui-btn_default weui-vcode-btn">获取验证码</button></weui-cell>
    </weui-cell-group>
    <template #footer><weui-form-tips><weui-agree>阅读并同意<a href="javascript:">《相关条款》</a></weui-agree></weui-form-tips><weui-form-opr><weui-button type="primary">确定</weui-button></weui-form-opr></template>
  </weui-form>
</div></div>

::: details 查看代码
```vue
<weui-cell-group form>
  <weui-cell label="手机号"><weui-input type="number" placeholder="请输入手机号" /></weui-cell>
  <weui-cell label="验证码" vcode wrap><weui-input ext-class="weui-cell__control weui-cell__control_flex" placeholder="输入验证码" /><button class="weui-cell__control weui-btn weui-btn_default weui-vcode-btn">获取验证码</button></weui-cell>
</weui-cell-group>
```
:::

## 底部悬浮

`bottom-fixed` 同时为内容区和操作区应用官方底部悬浮布局，并保留最小展示高度。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form bottom-fixed title="底部悬浮表单" desc="操作区固定于底部。">
    <weui-cell-group form><weui-cell label="手机号"><weui-input type="number" placeholder="请输入手机号" /></weui-cell></weui-cell-group>
    <template #footer><weui-form-tips><weui-agree>阅读并同意<a href="javascript:">《相关条款》</a></weui-agree></weui-form-tips><weui-form-opr><weui-button type="primary">确定</weui-button></weui-form-opr></template>
  </weui-form>
</div></div>

::: details 查看代码
```vue
<weui-form bottom-fixed title="底部悬浮表单" desc="操作区固定于底部。">
  <weui-cell-group form><weui-cell label="手机号"><weui-input type="number" placeholder="请输入手机号" /></weui-cell></weui-cell-group>
  <template #footer><weui-form-opr><weui-button type="primary">确定</weui-button></weui-form-opr></template>
</weui-form>
```
:::

## 复选框

复选框组本身负责官方 `cells_checkbox` 和 form group 结构，不需要额外布局元素。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="复选框样式展示">
    <weui-checkbox-group v-model="checkboxValues" form><weui-checkbox value="1" label="standard is dealt for u." /><weui-checkbox value="2" label="standard is dealicient for u." /></weui-checkbox-group>
    <template #footer><weui-form-opr><weui-button type="primary">下一步</weui-button></weui-form-opr></template>
  </weui-form>
</div></div>

::: details 查看代码
```vue
<script setup lang="ts">import { ref } from 'vue'; const values = ref(['1'])</script>
<template><weui-checkbox-group v-model="values" form><weui-checkbox value="1" label="standard is dealt for u." /><weui-checkbox value="2" label="standard is dealicient for u." /></weui-checkbox-group></template>
```
:::

## 跳转列表项

`access` 提供官方箭头和导航语义；不使用 `variant="access"`。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="跳转列表项"><weui-cell-group form><weui-cell access url="javascript:">cell standard</weui-cell><weui-cell access url="javascript:">cell standard</weui-cell></weui-cell-group></weui-form>
</div></div>

::: details 查看代码
```vue
<weui-cell-group form><weui-cell access url="/pages/detail">cell standard</weui-cell><weui-cell access url="/pages/detail">cell standard</weui-cell></weui-cell-group>
```
:::

## 单选框

单选组管理唯一选中值，并生成同名原生 radio 输入。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="单选样式展示"><weui-radio-group v-model="radioValue" form><weui-radio value="1" label="选项一" /><weui-radio value="2" label="选项二" /><weui-radio value="3" label="选项三" /></weui-radio-group><template #footer><weui-form-opr><weui-button type="primary">确定</weui-button></weui-form-opr></template></weui-form>
</div></div>

::: details 查看代码
```vue
<script setup lang="ts">import { ref } from 'vue'; const value = ref('1')</script>
<template><weui-radio-group v-model="value" form><weui-radio value="1" label="选项一" /><weui-radio value="2" label="选项二" /><weui-radio value="3" label="选项三" /></weui-radio-group></template>
```
:::

## 开关

开关自身就是完整 cell，放入 `cell-group` 即可，不再使用原生 `div` 模拟列表结构。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="开关样式展示"><weui-cell-group form><weui-switch v-model="switchValue" label="标题文字" /><weui-switch v-model="switchValue2" label="标题文字" disabled /><weui-switch v-model="switchValue3" label="兼容 IE Edge 的版本" cp /></weui-cell-group></weui-form>
</div></div>

::: details 查看代码
```vue
<weui-cell-group form><weui-switch v-model="switchValue" label="标题文字" /><weui-switch v-model="switchValue2" label="标题文字" disabled /><weui-switch v-model="switchValue3" label="兼容 IE Edge 的版本" cp /></weui-cell-group>
```
:::

## 原生选择框

`weui-select` 已经输出选择框所需的完整 cell，不应被 `weui-cell` 再包一层。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="原生选择框"><weui-cell-group form><weui-select v-model="selectValue"><option value="1">微信号</option><option value="2">QQ号</option><option value="3">Email</option></weui-select><weui-select v-model="selectAfterValue" after label="国家"><option value="1">中国</option><option value="2">美国</option><option value="3">英国</option></weui-select></weui-cell-group></weui-form>
</div></div>

::: details 查看代码
```vue
<weui-cell-group form><weui-select v-model="selectValue"><option value="1">微信号</option><option value="2">QQ号</option></weui-select><weui-select v-model="selectAfterValue" after label="国家"><option value="1">中国</option><option value="2">美国</option></weui-select></weui-cell-group>
```
:::

## 模拟选择框

模拟选择框保留官方 `weui-cell_select` 外观，但使用 cell click 切换示例值，便于直接观察无原生 select 时的交互状态。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="模拟选择框" desc="点击各项切换模拟值。"><weui-cell-group form><weui-cell select active @click="cycle(mockDate, ['2026-07-22', '2026-07-23', '2026-07-24'])">{{ mockDate }}</weui-cell><weui-cell select select-before active :title="mockPrefix" @click="cycle(mockPrefix, ['+86', '+80', '+84'])"><weui-input placeholder="请输入号码" /></weui-cell><weui-cell select select-after active label="票种" @click="cycle(mockTicket, ['的士票', '飞机票', '火车票'])">{{ mockTicket }}</weui-cell></weui-cell-group></weui-form>
</div></div>

::: details 查看代码
```vue
<script setup lang="ts">
import { ref } from 'vue'
const date = ref('2026-07-22')
const cycleDate = () => { date.value = date.value === '2026-07-22' ? '2026-07-23' : '2026-07-22' }
</script>
<template><weui-cell-group form><weui-cell select active @click="cycleDate">{{ date }}</weui-cell><weui-cell select select-before active title="+86"><weui-input placeholder="请输入号码" /></weui-cell><weui-cell select select-after active label="票种">的士票</weui-cell></weui-cell-group></template>
```
:::

## 文本域

`weui-textarea` 已是带计数器的完整 cell，直接作为 form group 的子项，避免生成双层 `.weui-cell`。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="文本域" desc="输入更多内容的输入区域样式展示。"><weui-cell-group form title="问题描述"><weui-textarea v-model="textareaValue" placeholder="请描述你所发生的问题" /></weui-cell-group></weui-form>
</div></div>

::: details 查看代码
```vue
<script setup lang="ts">import { ref } from 'vue'; const value = ref('')</script>
<template><weui-cell-group form title="问题描述"><weui-textarea v-model="value" placeholder="请描述你所发生的问题" /></weui-cell-group></template>
```
:::

## 上下结构

上下结构由 textarea 的 `label` 和 `vertical` props 生成，标签、输入区域与计数器属于同一个官方 cell。

<div class="demo-block vp-raw"><div class="demo-mobile">
  <weui-form title="上下结构" desc="上下结构样式。"><weui-cell-group form><weui-textarea label="问题描述" vertical placeholder="请描述你所发生的问题" /></weui-cell-group></weui-form>
</div></div>

::: details 查看代码
```vue
<weui-cell-group form><weui-textarea label="问题描述" vertical placeholder="请描述你所发生的问题" /></weui-cell-group>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 表单标题 | `string` | — |
| desc | 表单描述 | `string` | — |
| bottom-fixed | 底部悬浮模式，内置最小高度 | `boolean` | `false` |
| ext-class | 纯自定义样式扩展类 | `string` | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 控件区域内容 |
| title | 自定义标题区域 |
| footer | 提示、操作与底部信息区域 |
