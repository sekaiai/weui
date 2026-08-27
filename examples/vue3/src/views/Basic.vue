<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">基础组件</span>
      <span class="page__desc">Button · Badge · Icon · Loading · Article · Footer · Progress · Loadmore · Flex</span>
    </div>

    <div class="page__bd">
      <!-- Button -->
      <div class="demo-section">
        <div class="demo-section__title">Button 按钮</div>
        <weui-button type="primary" @click="onPrimary">页面主操作</weui-button>
        <weui-button type="default">页面次要操作</weui-button>
        <weui-button type="warn">警告类操作</weui-button>
        <div class="demo-inline">
          <weui-button type="primary" size="medium">中等</weui-button>
          <weui-button type="primary" size="mini">迷你</weui-button>
          <weui-button type="primary" :loading="true">加载中</weui-button>
          <weui-button type="default" :disabled="true">禁用</weui-button>
        </div>
        <div class="demo-inline">
          <weui-button type="primary" display="inline">行内</weui-button>
          <weui-button type="default" display="inline">行内</weui-button>
        </div>
      </div>

      <!-- Badge -->
      <div class="demo-section">
        <div class="demo-section__title">Badge 徽章</div>
        <div class="demo-inline" style="align-items: center">
          <span>新消息 <weui-badge content="8" /></span>
          <span>红点 <weui-badge /></span>
          <span>更多 <weui-badge content="NEW" /></span>
        </div>
      </div>

      <!-- Icon -->
      <div class="demo-section">
        <div class="demo-section__title">Icon 图标</div>
        <div class="demo-inline" style="gap: 20px; font-size: 28px">
          <weui-icon type="success" />
          <weui-icon type="info" />
          <weui-icon type="warn" />
          <weui-icon type="waiting" />
          <weui-icon type="success-circle" />
          <weui-icon type="success-no-circle" />
          <weui-icon type="waiting-circle" />
          <weui-icon type="download" />
          <weui-icon type="search" />
          <weui-icon type="clear" />
          <weui-icon type="cancel" />
        </div>
        <div class="demo-inline" style="margin-top: 16px; align-items: center">
          <weui-icon type="success" :size="48" />
          <weui-icon type="warn" :size="48" color="#fa5151" />
        </div>
      </div>

      <!-- Loading -->
      <div class="demo-section">
        <div class="demo-section__title">Loading 加载</div>
        <div class="demo-inline" style="gap: 16px; align-items: center">
          <weui-loading :size="20" />
          <weui-loading :size="32" />
          <weui-loading :size="20" text="加载中" />
        </div>
      </div>

      <!-- Progress -->
      <div class="demo-section">
        <div class="demo-section__title">Progress 进度条</div>
        <weui-progress :percent="progress" @cancel="progress = 0" />
        <div class="demo-inline" style="margin-top: 12px">
          <weui-button type="default" size="mini" @click="progress = Math.min(100, progress + 10)">+10%</weui-button>
          <weui-button type="default" size="mini" @click="progress = Math.max(0, progress - 10)">-10%</weui-button>
        </div>
      </div>

      <!-- Loadmore -->
      <div class="demo-section">
        <div class="demo-section__title">Loadmore 加载更多</div>
        <weui-loadmore type="default" text="正在加载" />
        <weui-loadmore type="line" text="暂无更多" />
        <weui-loadmore type="dot" />
      </div>

      <!-- Flex -->
      <div class="demo-section">
        <div class="demo-section__title">Flex 弹性布局</div>
        <weui-flex justify="between" style="background: #fff; padding: 12px">
          <weui-flex-item><div style="background:#e1e1e1;padding:12px;text-align:center">1</div></weui-flex-item>
          <weui-flex-item><div style="background:#d1d1d1;padding:12px;text-align:center">2</div></weui-flex-item>
          <weui-flex-item><div style="background:#c1c1c1;padding:12px;text-align:center">3</div></weui-flex-item>
        </weui-flex>
      </div>

      <!-- Article -->
      <div class="demo-section">
        <div class="demo-section__title">Article 文章</div>
        <weui-article>
          <h1>大标题</h1>
          <section>
            <h2 class="title">章标题</h2>
            <p>这是一段正文内容，用于演示 WeUI 文章排版样式。支持多级标题、段落、引用、图片等富文本内容。</p>
            <p><img src="https://picsum.photos/600/300" alt="示例" style="width:100%" /></p>
          </section>
        </weui-article>
      </div>

      <!-- Footer -->
      <div class="demo-section">
        <div class="demo-section__title">Footer 页脚</div>
        <weui-footer>
          <p class="weui-footer__links">
            <a href="javascript:" class="weui-footer__link">底部链接一</a>
            <a href="javascript:" class="weui-footer__link">底部链接二</a>
          </p>
          <p class="weui-footer__text">Copyright © 2024 WeUI Design</p>
        </weui-footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(60)

const onPrimary = () => {
  console.log('primary click')
}
</script>
