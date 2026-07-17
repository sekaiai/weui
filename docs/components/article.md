# Article 文章

用于文章排版，提供标题、段落、列表、引用、图片等元素的统一样式。组件本身是一个容器（`.weui-article`），内部内容通过默认插槽传入。

## 基础用法

在 `weui-article` 内使用 `h1`/`h2`/`p`/`ul`/`li` 等标签，WeUI 会应用文章排版样式。

<div class="demo-block">
  <weui-article>
    <h1>大标题</h1>
    <h2>章节标题</h2>
    <p>这是文章的正文内容，用于展示段落排版样式。WeUI 的文章组件会自动处理字号、行高与间距，使长文更易读。</p>
    <h2>列表</h2>
    <ul>
      <li>列表项一</li>
      <li>列表项二</li>
      <li>列表项三</li>
    </ul>
  </weui-article>
</div>

::: details 查看代码
```vue
<template>
  <weui-article>
    <h1>大标题</h1>
    <h2>章节标题</h2>
    <p>这是文章的正文内容，用于展示段落排版样式。</p>
    <h2>列表</h2>
    <ul>
      <li>列表项一</li>
      <li>列表项二</li>
      <li>列表项三</li>
    </ul>
  </weui-article>
</template>
```
:::

## 带图片

文章中可插入图片，WeUI 会为图片添加圆角与间距样式。

<div class="demo-block">
  <weui-article>
    <h1>图文文章</h1>
    <p>图文混排是文章常见形态，下方为示例图片。</p>
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='160'%3E%3Crect width='100%25' height='100%25' fill='%23e5e5e5'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23999' text-anchor='middle' dy='.3em'%3E图片占位%3C/text%3E%3C/svg%3E" alt="示例图片" />
    <p>图片下方的说明文字。</p>
  </weui-article>
</div>

::: details 查看代码
```vue
<template>
  <weui-article>
    <h1>图文文章</h1>
    <p>图文混排是文章常见形态，下方为示例图片。</p>
    <img src="/static/demo.png" alt="示例图片" />
    <p>图片下方的说明文字。</p>
  </weui-article>
</template>
```
:::

## 带引用

使用 `blockquote` 展示引用内容，WeUI 会添加左侧边框与缩进。

<div class="demo-block">
  <weui-article>
    <h1>引用示例</h1>
    <p>正文段落，引出下方引用。</p>
    <blockquote>这是一段引用内容，用于强调或摘录来源信息。</blockquote>
    <p>引用后的正文段落。</p>
  </weui-article>
</div>

::: details 查看代码
```vue
<template>
  <weui-article>
    <h1>引用示例</h1>
    <p>正文段落，引出下方引用。</p>
    <blockquote>这是一段引用内容，用于强调或摘录来源信息。</blockquote>
    <p>引用后的正文段落。</p>
  </weui-article>
</template>
```
:::

## 完整文章

组合标题、段落、列表、引用、图片，展示完整文章排版。

<div class="demo-block">
  <weui-article>
    <h1>Vue 3 组合式 API 指南</h1>
    <p>组合式 API（Composition API）是 Vue 3 引入的一组 API，用于通过函数组织组件逻辑，提升逻辑复用与类型推断。</p>
    <h2>核心优势</h2>
    <ul>
      <li>更好的逻辑复用</li>
      <li>更灵活的代码组织</li>
      <li>更友好的 TypeScript 支持</li>
    </ul>
    <h2>基本结构</h2>
    <p>使用 <code>setup</code> 函数或 <code>&lt;script setup&gt;</code> 语法声明响应式状态与副作用。</p>
    <blockquote>推荐使用 <code>&lt;script setup&gt;</code> 语法，编译后自动暴露绑定。</blockquote>
    <h2>示例图</h2>
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='120'%3E%3Crect width='100%25' height='100%25' fill='%2310aeff'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23fff' text-anchor='middle' dy='.3em'%3EVue 3%3C/text%3E%3C/svg%3E" alt="Vue 3 示例" />
  </weui-article>
</div>

::: details 查看代码
```vue
<template>
  <weui-article>
    <h1>Vue 3 组合式 API 指南</h1>
    <p>组合式 API 是 Vue 3 引入的一组 API。</p>
    <h2>核心优势</h2>
    <ul>
      <li>更好的逻辑复用</li>
      <li>更灵活的代码组织</li>
      <li>更友好的 TypeScript 支持</li>
    </ul>
    <blockquote>推荐使用 &lt;script setup&gt; 语法。</blockquote>
  </weui-article>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extClass | 附加在根元素上的扩展类名 | `string` | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 文章内容，使用 `h1`-`h6`/`p`/`ul`/`ol`/`blockquote`/`img` 等标签 |
