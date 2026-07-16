<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Article</text>
      <text class="page__desc">文章组件验证页</text>
    </view>

    <view class="page__bd">
      <weui-article>
        <h1>文章页大标题</h1>

        <!-- 章节：基础段落 -->
        <section>
          <h2>章节标题</h2>
          <section>
            <h3>1.1 节标题</h3>
            <p>
              这是文章正文段落。WeUI Article 组件用于展示富文本内容，自动应用排版样式，支持标题、段落、章节、列表等原生 HTML 结构。
            </p>
            <p>
              段落之间会自动产生合适的间距，长文本会自动换行，不会超出容器边界。
            </p>
          </section>
        </section>

        <!-- 章节：多级标题 -->
        <section>
          <h2>多级标题示例</h2>
          <section>
            <h3>三级标题</h3>
            <section>
              <h4>四级标题</h4>
              <p>四级标题下的段落内容，字号与正文一致但加粗层级不同。</p>
            </section>
          </section>
        </section>

        <!-- 章节：列表 -->
        <section>
          <h2>列表示例</h2>

          <section>
            <h3>无序列表</h3>
            <ul>
              <li>列表项一</li>
              <li>
                列表项二
                <ul>
                  <li>嵌套子项 A</li>
                  <li>嵌套子项 B</li>
                </ul>
              </li>
              <li>列表项三</li>
            </ul>
          </section>

          <section>
            <h3>有序列表</h3>
            <ol>
              <li>第一项</li>
              <li>
                第二项
                <ol>
                  <li>子项 2.1</li>
                  <li>子项 2.2</li>
                </ol>
              </li>
              <li>第三项</li>
            </ol>
          </section>

          <section>
            <h3>段落式列表</h3>
            <ol class="weui-article__list_inside">
              <li>段落式列表项：序号显示在文本内部。</li>
              <li>段落式列表项：适用于长文本内容。</li>
            </ol>
          </section>

          <section>
            <h3>自定义序号列表</h3>
            <ol class="weui-article__list_none">
              <li>1 自定义序号项</li>
              <li>
                2 自定义序号项
                <ol>
                  <li>2.1 子项</li>
                  <li>2.2 子项</li>
                </ol>
              </li>
              <li>3 自定义序号项</li>
            </ol>
          </section>
        </section>

        <!-- 章节：扩展类名 -->
        <section>
          <h2>扩展类名示例</h2>
          <weui-article ext-class="my-article">
            <p>这是一个嵌套的 article，通过 extClass 追加自定义背景色。</p>
            <p>适用于在文章内部需要特殊样式强调的内容块。</p>
          </weui-article>
        </section>
      </weui-article>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
defineOptions({
  name: 'PageArticle',
})
</script>

<style scoped>
.page {
  padding: 16px;
}
.page__hd {
  margin-bottom: 24px;
}
.page__title {
  display: block;
  font-size: 20px;
  font-weight: bold;
}
.page__desc {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #888;
}
.my-article {
  padding: 16px;
  background-color: #f7f7f7;
  border-radius: 8px;
}
</style>
