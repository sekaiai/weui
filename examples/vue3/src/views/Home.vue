<template>
  <div class="page">
    <div class="home-hero">
      <div class="home-hero__title">WeUI Design · Vue 3</div>
      <div class="home-hero__desc">
        基于 <code>weui-uniapp-design</code> 的纯网页（Vue 3 + Vite）组件示例。<br />
        左侧导航按类别浏览全部组件，每个页面均可实时交互。
      </div>
    </div>

    <div class="home-card">
      <div class="home-card__title">快速开始</div>
      <p style="font-size: 14px; line-height: 1.8; color: #555">
        在 <code>examples/vue3</code> 目录下执行：
      </p>
      <pre style="background: #f2f2f2; padding: 12px; border-radius: 6px; font-size: 13px; overflow:auto">pnpm install
pnpm dev</pre>
      <p style="font-size: 13px; color: #888">
        组件已通过 <code>app.use(WeuiDesign)</code> 全局注册，并引入了
        <code>weui/dist/style/weui.css</code> 与 <code>weui-uniapp-design/index.css</code>。
      </p>
    </div>

    <div class="home-card" v-for="group in groups" :key="group.title">
      <div class="home-card__title">{{ group.title }}</div>
      <div class="home-grid">
        <RouterLink
          v-for="item in group.items"
          :key="item.path"
          :to="item.path"
          class="home-link"
        >{{ item.label }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navGroups } from '../router'

const groups = navGroups
  .filter((g) => g.title !== '入门')
  .map((g) => ({
    title: g.title,
    items: g.items.map((i) => ({ path: i.path, label: i.label.split(' ')[0] })),
  }))
</script>
