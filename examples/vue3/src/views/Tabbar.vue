<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Tabbar 底部导航</span>
      <span class="page__desc">底部标签栏，支持图标、徽标、红点与选中态</span>
    </div>

    <div class="page__bd">
      <div class="demo-section">
        <div class="demo-section__title">基础用法（演示选中态切换）</div>
        <weui-tabbar>
          <weui-tabbar-item
            v-for="(tab, index) in tabs"
            :key="tab.text"
            :icon="tab.icon"
            :active-icon="tab.activeIcon"
            :text="tab.text"
            :active="activeTab === index"
            :badge="tab.badge"
            :show-dot="tab.showDot"
            @click="activeTab = index"
          />
        </weui-tabbar>
        <div class="navbar-content">
          <p>当前页面：<strong>{{ tabs[activeTab].text }}</strong></p>
          <p class="navbar-content__desc">点击底部标签切换，徽标与红点用于展示未读提示。</p>
        </div>
      </div>

      <div class="demo-section">
        <div class="demo-section__title">带红点与徽标</div>
        <weui-tabbar>
          <weui-tabbar-item text="微信" :icon="iconA" :active-icon="iconAOn" :show-dot="true" active />
          <weui-tabbar-item text="通讯录" :icon="iconB" :badge="8" />
          <weui-tabbar-item text="发现" :icon="iconC" :badge="'NEW'" />
        </weui-tabbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const iconA = 'https://picsum.photos/seed/tab-a/48/48'
const iconAOn = 'https://picsum.photos/seed/tab-a-on/48/48'
const iconB = 'https://picsum.photos/seed/tab-b/48/48'
const iconC = 'https://picsum.photos/seed/tab-c/48/48'

const tabs = [
  { text: '微信', icon: iconA, activeIcon: iconAOn, badge: undefined, showDot: false },
  { text: '通讯录', icon: iconB, activeIcon: iconB, badge: '2', showDot: false },
  { text: '发现', icon: iconC, activeIcon: iconC, badge: undefined, showDot: true },
  { text: '我', icon: iconAOn, activeIcon: iconA, badge: undefined, showDot: false },
]

const activeTab = ref(0)
</script>

<style scoped>
.navbar-content {
  padding: 20px 16px;
  background: #fff;
  font-size: 14px;
}
.navbar-content__desc {
  margin-top: 6px;
  color: #888;
}
</style>
