# Checkbox 复选框

用于在列表中显示复选选项或单选选项。通过 `multi` 属性切换多选/单选模式，配合 `v-model` 实现双向绑定。

## 多选模式

默认 `multi=true`，使用 `checkbox-group` 包裹多个 `weui-checkbox`，通过 `v-model` 绑定选中项的 value 数组。

```vue
<template>
  <weui-checkbox-group v-model="checkedValues" title="复选列表">
    <weui-checkbox value="1" label="选项一" />
    <weui-checkbox value="2" label="选项二" />
    <weui-checkbox value="3" label="选项三" />
  </weui-checkbox-group>
</template>

<script setup>
import { ref } from 'vue'
const checkedValues = ref(['1'])
</script>
```

## 单选模式

设置 `multi=false`，使用 `radio-group` 包裹，选中项以数组形式返回（长度为 0 或 1）。

```vue
<template>
  <weui-checkbox-group v-model="radioValue" :multi="false" title="单选列表">
    <weui-checkbox value="1" label="选项一" />
    <weui-checkbox value="2" label="选项二" />
  </weui-checkbox-group>
</template>

<script setup>
import { ref } from 'vue'
const radioValue = ref(['1'])
</script>
```

## 表单型分组

设置 `form=true`，启用表单型分组样式（圆角卡片外观）。

```vue
<template>
  <weui-checkbox-group v-model="values" form title="表单复选">
    <weui-checkbox value="1" label="选项一" />
    <weui-checkbox value="2" label="选项二" />
  </weui-checkbox-group>
</template>
```

## 禁用状态

通过 group 的 `disabled` 属性禁用全部子项，或在单个 checkbox 上设置 `disabled`。

```vue
<template>
  <weui-checkbox-group v-model="values" title="禁用示例">
    <weui-checkbox value="1" label="正常选项" />
    <weui-checkbox value="2" label="禁用选项" disabled />
    <weui-checkbox value="3" label="禁用选项" disabled />
  </weui-checkbox-group>
</template>
```

## 自定义内容

通过默认插槽自定义每个选项的内容。

```vue
<template>
  <weui-checkbox-group v-model="values" title="自定义内容">
    <weui-checkbox value="1">
      <view>标题文字</view>
      <view class="weui-cell__desc">副标题</view>
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
| checked | 独立使用时的选中状态 | `boolean` | `false` |
| extClass | 根元素扩展类名 | `string` | — |

### CheckboxGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中项的 value 数组（v-model） | `string[]` | `[]` |
| multi | `true`=多选，`false`=单选 | `boolean` | `true` |
| disabled | 是否禁用全部子项 | `boolean` | `false` |
| title | 组标题 | `string` | — |
| footer | 组底部说明文字 | `string` | — |
| form | 是否为表单型组 | `boolean` | `false` |
| extClass | 根元素扩展类名 | `string` | — |
| ariaRole | 根元素 aria-role | `string` | — |

## Events

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
