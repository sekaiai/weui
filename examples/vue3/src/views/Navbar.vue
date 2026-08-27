<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Navbar 选项卡</span>
      <span class="page__desc">顶部导航选项卡，配合 active 控制选中态</span>
    </div>

    <div class="page__bd">
      <div class="demo-section">
        <div class="demo-section__title">基础用法</div>
        <weui-navbar>
          <weui-navbar-item
            v-for="(tab, index) in tabs"
            :key="tab"
            :active="activeTab === index"
            @click="activeTab = index"
          >{{ tab }}</weui-navbar-item>
        </weui-navbar>
        <div class="navbar-content">
          <p>当前选中：<strong>{{ tabs[activeTab] }}</strong></p>
          <p class="navbar-content__desc">点击上方选项卡切换内容区域。</p>
        </div>
      </div>

      <div class="demo-section">
        <div class="demo-section__title">更多选项</div>
        <weui-navbar>
          <weui-navbar-item
            v-for="(tab, index) in tabs2"
            :key="tab"
            :active="activeTab2 === index"
            @click="activeTab2 = index"
          >{{ tab }}</weui-navbar-item>
        </weui-navbar>
        <div class="navbar-content">
          <p>当前选中：<strong>{{ tabs2[activeTab2] }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['选项一', '选项二', '选项三']
const activeTab = ref(0)

const tabs2 = ['全部', '进行中', '已完成', '已取消']
const activeTab2 = ref(1)
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
