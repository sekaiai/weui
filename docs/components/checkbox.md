# Checkbox 复选框

用于在列表中显示复选选项。`CheckboxGroup` 配合 `v-model` 管理多个选中项；`Checkbox` 也可独立使用。单选列表请使用 `weui-radio-group` 与 `weui-radio`，以匹配 WeUI 的单选结构和原生互斥行为。

<script setup lang="ts">
import { ref } from 'vue'

const standaloneChecked = ref(false)
const defaultChecked = ref(true)
const groupValues = ref(['1'])
const radioValue = ref('1')
const formValues = ref(['1', '3'])
</script>

## 基础用法

`Checkbox` 独立使用时，通过 `v-model:checked` 绑定选中状态，点击切换。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <div class="weui-cells weui-cells_checkbox">
      <weui-checkbox v-model:checked="standaloneChecked" value="1" label="独立选项" />
    </div>
  </div>
  <p style="margin-top: 8px; color: #576b95;">选中状态：{{ standaloneChecked }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-checkbox v-model:checked="checked" value="1" label="独立选项" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(false)
</script>
```
:::

## 默认选中

通过 `v-model:checked` 设为 `true` 实现默认选中。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <div class="weui-cells weui-cells_checkbox">
      <weui-checkbox v-model:checked="defaultChecked" value="1" label="默认选中" />
    </div>
  </div>
  <p style="margin-top: 8px; color: #576b95;">选中状态：{{ defaultChecked }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-checkbox v-model:checked="checked" value="1" label="默认选中" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
</script>
```
:::

## 多选模式

`CheckboxGroup` 使用 `v-model` 绑定选中项的 value 数组。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-checkbox-group v-model="groupValues" title="复选列表">
      <weui-checkbox value="1" label="选项一" />
      <weui-checkbox value="2" label="选项二" />
      <weui-checkbox value="3" label="选项三" />
    </weui-checkbox-group>
  </div>
  <p style="margin-top: 8px; color: #576b95;">选中值：{{ groupValues }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-checkbox-group v-model="checkedValues" title="复选列表">
    <weui-checkbox value="1" label="选项一" />
    <weui-checkbox value="2" label="选项二" />
    <weui-checkbox value="3" label="选项三" />
  </weui-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const checkedValues = ref(['1'])
</script>
```
:::

## 单选列表

单选列表使用独立的 `weui-radio-group` 与 `weui-radio`。它使用官方 `.weui-cells_radio` 结构，并始终只保留一个选中项。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-radio-group v-model="radioValue" title="单选列表">
      <weui-radio value="1" label="选项一" />
      <weui-radio value="2" label="选项二" />
    </weui-radio-group>
  </div>
  <p style="margin-top: 8px; color: #576b95;">选中值：{{ radioValue }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-radio-group v-model="radioValue" title="单选列表">
    <weui-radio value="1" label="选项一" />
    <weui-radio value="2" label="选项二" />
  </weui-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radioValue = ref('1')
</script>
```
:::

## 表单型分组

设置 `form=true`，启用表单型分组样式（圆角卡片外观）。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-checkbox-group v-model="formValues" form title="表单复选">
      <weui-checkbox value="1" label="选项一" />
      <weui-checkbox value="2" label="选项二" />
      <weui-checkbox value="3" label="选项三" />
    </weui-checkbox-group>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-checkbox-group v-model="values" form title="表单复选">
    <weui-checkbox value="1" label="选项一" />
    <weui-checkbox value="2" label="选项二" />
  </weui-checkbox-group>
</template>
```
:::

## 禁用状态

通过 group 的 `disabled` 属性禁用全部子项，或在单个 checkbox 上设置 `disabled`。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-checkbox-group v-model="formValues" title="禁用示例">
      <weui-checkbox value="1" label="正常选项" />
      <weui-checkbox value="2" label="禁用选项" disabled />
      <weui-checkbox value="3" label="禁用选项" disabled />
    </weui-checkbox-group>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-checkbox-group v-model="values" title="禁用示例">
    <weui-checkbox value="1" label="正常选项" />
    <weui-checkbox value="2" label="禁用选项" disabled />
    <weui-checkbox value="3" label="禁用选项" disabled />
  </weui-checkbox-group>
</template>
```
:::

## 自定义内容

通过默认插槽自定义每个选项的内容。

```vue
<template>
  <weui-checkbox-group v-model="values" title="自定义内容">
    <weui-checkbox value="1">
      <div>标题文字</div>
      <div class="weui-cell__desc">副标题</div>
    </weui-checkbox>
  </weui-checkbox-group>
</template>
```

## 分组底部说明

通过 `footer` 属性在分组底部显示说明文字。

```vue
<template>
  <weui-checkbox-group v-model="values" title="复选列表" footer="底部说明文字">
    <weui-checkbox value="1" label="选项一" />
    <weui-checkbox value="2" label="选项二" />
  </weui-checkbox-group>
</template>
```

## Attributes

### Checkbox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | checkbox 标识值 | `string` | — |
| label | 显示文字 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| checked | 独立使用时的选中状态（v-model:checked） | `boolean` | `false` |
| extClass | 根元素扩展类名 | `string` | — |

### CheckboxGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中项的 value 数组（v-model） | `string[]` | `[]` |
| disabled | 是否禁用全部子项 | `boolean` | `false` |
| title | 组标题 | `string` | — |
| footer | 组底部说明文字 | `string` | — |
| form | 是否为表单型组 | `boolean` | `false` |
| extClass | 根元素扩展类名 | `string` | — |
| ariaRole | 根元素 aria-role | `string` | — |

## Events

### Checkbox

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:checked | 选中状态变化时触发（独立使用） | `(value: boolean)` |
| change | 选中状态变化时触发（独立使用） | `(value: boolean)` |

### CheckboxGroup

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 选中项变化时触发 | `(value: string[])` |
| change | 选中项变化时触发 | `(value: string[])` |

## Slots

### Checkbox

| 插槽名 | 说明 | 备注 |
| --- | --- | --- |
| default | 选项内容 | `label` prop 为空时启用 |

### CheckboxGroup

| 插槽名 | 说明 |
| --- | --- |
| default | checkbox 子项 |
