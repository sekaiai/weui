<template>
  <div class="layout">
    <header class="layout__header">
      <span class="layout__logo">WeUI</span>
      <span class="layout__subtitle">Vue 3 组件示例</span>
    </header>

    <div class="layout__body">
      <aside class="layout__nav">
        <div v-for="group in navGroups" :key="group.title" class="layout__nav-group">
          <div class="layout__nav-title">{{ group.title }}</div>
          <RouterLink
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            class="layout__nav-item"
            active-class="layout__nav-item--active"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </aside>

      <main class="layout__main">
        <RouterView />
      </main>
    </div>

    <!-- 命令式弹层（Dialog/Toast/Actionsheet/Picker/Gallery 等）统一挂载点 -->
    <WeuiOverlayHost />
  </div>
</template>

<script setup lang="ts">
import { WeuiOverlayHost } from 'weui-uniapp-design'
import { navGroups } from './router'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ededed;
}
.layout__header {
  height: 52px;
  flex: 0 0 52px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  background: #1a1a1a;
  color: #fff;
}
.layout__logo {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.5px;
}
.layout__subtitle {
  font-size: 13px;
  color: #b0b0b0;
}
.layout__body {
  flex: 1;
  display: flex;
  min-height: 0;
}
.layout__nav {
  flex: 0 0 220px;
  background: #fafafa;
  border-right: 1px solid #e5e5e5;
  padding: 16px 12px;
  overflow-y: auto;
}
.layout__nav-group {
  margin-bottom: 18px;
}
.layout__nav-title {
  font-size: 12px;
  color: #999;
  margin: 0 8px 8px;
}
.layout__nav-item {
  display: block;
  padding: 8px 10px;
  border-radius: 6px;
  color: #333;
  text-decoration: none;
  font-size: 13px;
  line-height: 1.4;
}
.layout__nav-item:hover {
  background: #ececec;
}
.layout__nav-item--active {
  background: #07c160;
  color: #fff;
}
.layout__main {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
@media (max-width: 720px) {
  .layout__nav {
    flex-basis: 140px;
  }
  .layout__main {
    padding: 16px;
  }
}
</style>
