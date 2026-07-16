# Steps 步骤条

引导用户按流程完成任务的导航条，常用于表单分步、订单流程、引导页等场景。

## 基础用法

通过 `steps` 属性传入步骤列表，`current` 指定当前步骤索引。

```vue
<template>
  <weui-steps
    :steps="[
      { title: '步骤一', desc: '描述一' },
      { title: '步骤二', desc: '描述二' },
      { title: '步骤三', desc: '描述三' },
    ]"
    :current="1"
  />
</template>
```

## 步骤状态

- `index < current`：已完成（`weui-steps__item_done`）
- `index === current`：进行中（`weui-steps__item_current`）
- `index > current`：未开始

```vue
<template>
  <weui-steps
    :steps="[
      { title: '已完成' },
      { title: '进行中' },
      { title: '未开始' },
    ]"
    :current="1"
  />
</template>
```

## 垂直方向

通过 `direction="vertical"` 切换为垂直布局。

```vue
<template>
  <weui-steps
    :steps="[
      { title: '步骤一', desc: '描述一' },
      { title: '步骤二', desc: '描述二' },
      { title: '步骤三', desc: '描述三' },
    ]"
    :current="1"
    direction="vertical"
  />
</template>
```

## 仅标题

`desc` 为可选字段，不传时不渲染描述区域。

```vue
<template>
  <weui-steps
    :steps="[
      { title: '第一步' },
      { title: '第二步' },
      { title: '第三步' },
    ]"
    :current="0"
  />
</template>
```

## 扩展类名

通过 `extClass` 追加自定义类名到根元素。

```vue
<template>
  <weui-steps
    :steps="[
      { title: '步骤一' },
      { title: '步骤二' },
    ]"
    :current="0"
    ext-class="my-steps"
  />
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| steps | 步骤列表 | `Array<{ title: string; desc?: string }>` | — |
| current | 当前步骤索引 | `number` | `0` |
| direction | 方向，可选 `horizontal` / `vertical` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| extClass | 附加在根元素上的扩展类名 | `string` | — |
