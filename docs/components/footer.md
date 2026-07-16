# Footer 页脚

用于页面底部展示链接和文字，常用于版权声明、底部导航等场景。

## 基础用法

通过 `text` 属性设置底部文字。

```vue
<template>
  <weui-footer text="Copyright © 2026 weui.io" />
</template>
```

## 底部链接

通过 `links` 属性配置链接列表，链接之间会自动显示分隔线。

```vue
<template>
  <weui-footer
    :links="[
      { text: '底部链接' },
      { text: '底部链接' },
    ]"
    text="Copyright © 2026 weui.io"
  />
</template>
```

## 带跳转地址的链接

当链接对象提供 `url` 时，会渲染为 `navigator` 以支持页面跳转。

```vue
<template>
  <weui-footer
    :links="[
      { text: 'WeUI 首页', url: '/pages/index/index' },
    ]"
    text="Copyright © 2026 weui.io"
  />
</template>
```

## 固定在底部

通过 `fixed` 属性将页脚固定在视口底部，自动适配安全区域。

```vue
<template>
  <weui-footer
    fixed
    :links="[{ text: 'WeUI 首页', url: '/pages/index/index' }]"
    text="Copyright © 2026 weui.io"
  />
</template>
```

## 自定义内容

通过默认插槽替代 `text` 和 `links`，渲染完全自定义的内容。

```vue
<template>
  <weui-footer>
    <view class="weui-footer__text">自定义底部内容</view>
  </weui-footer>
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 底部文字 | `string` | — |
| links | 链接列表 | `Array<{ text: string; url?: string }>` | — |
| fixed | 是否固定在底部 | `boolean` | `false` |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义内容，替代 text 和 links | — |
