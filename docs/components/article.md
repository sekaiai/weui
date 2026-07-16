# Article 文章

用于展示富文本内容（如文章、说明、协议等），内部支持标题、段落、章节、列表等原生 HTML 结构，并自动应用 WeUI 排版样式。

## 基础用法

`weui-article` 作为容器，通过默认插槽放入 `h1`、`h2`、`section`、`p` 等原生标签即可获得 WeUI 文章样式。

```vue
<template>
  <weui-article>
    <h1>文章页大标题</h1>
    <section>
      <h2>二级标题</h2>
      <p>这是文章正文段落。</p>
    </section>
  </weui-article>
</template>
```

## 章节与标题层级

文章内支持 `h1` ~ `h6` 多级标题，配合 `section` 进行层级嵌套，自动获得合适的字号与间距。

```vue
<template>
  <weui-article>
    <h1>文章页大标题</h1>
    <section>
      <h2>二级标题</h2>
      <section>
        <h3>三级标题</h3>
        <p>三级标题下的段落内容。</p>
      </section>
    </section>
  </weui-article>
</template>
```

## 段落与配图

段落使用 `<p>` 标签，配图使用 `<img>` 标签，图片会自动限制最大宽度。

```vue
<template>
  <weui-article>
    <h1>带配图的文章</h1>
    <section>
      <p>段落文本内容。</p>
      <p>
        <img src="/static/pic_article.png" alt="配图" />
      </p>
    </section>
  </weui-article>
</template>
```

## 列表

支持原生无序列表 `<ul>` 和有序列表 `<ol>`。如需段落式列表或自定义序号列表，可追加 `weui-article__list_inside` 或 `weui-article__list_none` 类。

```vue
<template>
  <weui-article>
    <section>
      <h2>无序列表</h2>
      <ul>
        <li>列表项一</li>
        <li>列表项二</li>
      </ul>
    </section>
    <section>
      <h2>有序列表</h2>
      <ol>
        <li>第一项</li>
        <li>第二项</li>
      </ol>
    </section>
    <section>
      <h2>段落式列表</h2>
      <ol class="weui-article__list_inside">
        <li>段落式列表项</li>
      </ol>
    </section>
    <section>
      <h2>自定义序号列表</h2>
      <ol class="weui-article__list_none">
        <li>1 自定义序号项</li>
        <li>2 自定义序号项</li>
      </ol>
    </section>
  </weui-article>
</template>
```

## 扩展类名

通过 `extClass` 属性追加自定义类名，可用于自定义样式覆盖或外部定位。

```vue
<template>
  <weui-article ext-class="my-article">
    <h1>自定义样式文章</h1>
    <p>正文内容。</p>
  </weui-article>
</template>

<style>
.my-article {
  background-color: #f7f7f7;
}
</style>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## Slots

| 插槽名 | 说明 | 备注 |
| --- | --- | --- |
| default | 文章正文内容 | 推荐使用 `h1`~`h6`、`section`、`p`、`ul`、`ol`、`img` 等原生标签构建结构 |
