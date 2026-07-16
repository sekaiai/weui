<template>
  <view class="page">
    <view class="page__hd">
      <text class="page__title">Tabbar</text>
      <text class="page__desc">底部导航栏组件验证页</text>
    </view>

    <view class="page__bd">
      <!-- 基础用法 -->
      <view class="section">
        <text class="section__title">基础用法</text>
        <weui-tabbar>
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="微信"
            :active="basicActive === 0"
            @click="basicActive = 0"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="通讯录"
            :active="basicActive === 1"
            @click="basicActive = 1"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="发现"
            :active="basicActive === 2"
            @click="basicActive = 2"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="我"
            :active="basicActive === 3"
            @click="basicActive = 3"
          />
        </weui-tabbar>
        <view class="section__panel">当前选中：{{ basicText }}</view>
      </view>

      <!-- 带徽标 -->
      <view class="section">
        <text class="section__title">带徽标</text>
        <weui-tabbar>
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="微信"
            badge="8"
            :active="badgeActive === 0"
            @click="badgeActive = 0"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="通讯录"
            :badge="99"
            :active="badgeActive === 1"
            @click="badgeActive = 1"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="发现"
            show-dot
            :active="badgeActive === 2"
            @click="badgeActive = 2"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="我"
            :active="badgeActive === 3"
            @click="badgeActive = 3"
          />
        </weui-tabbar>
      </view>

      <!-- 激活图标 -->
      <view class="section">
        <text class="section__title">激活图标</text>
        <weui-tabbar>
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            active-icon="/static/tabbar/icon_tabbar_active.png"
            text="首页"
            :active="iconActive === 0"
            @click="iconActive = 0"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            active-icon="/static/tabbar/icon_tabbar_active.png"
            text="分类"
            :active="iconActive === 1"
            @click="iconActive = 1"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            active-icon="/static/tabbar/icon_tabbar_active.png"
            text="我的"
            :active="iconActive === 2"
            @click="iconActive = 2"
          />
        </weui-tabbar>
      </view>

      <!-- 无图标 -->
      <view class="section">
        <text class="section__title">纯文字</text>
        <weui-tabbar>
          <weui-tabbar-item
            text="首页"
            :active="textActive === 0"
            @click="textActive = 0"
          />
          <weui-tabbar-item
            text="分类"
            :active="textActive === 1"
            @click="textActive = 1"
          />
          <weui-tabbar-item
            text="购物车"
            :active="textActive === 2"
            @click="textActive = 2"
          />
          <weui-tabbar-item
            text="我的"
            :active="textActive === 3"
            @click="textActive = 3"
          />
        </weui-tabbar>
      </view>

      <!-- 扩展类名 -->
      <view class="section">
        <text class="section__title">扩展类名</text>
        <weui-tabbar ext-class="my-tabbar">
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="tab1"
            ext-class="my-item"
            :active="extActive === 0"
            @click="extActive = 0"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="tab2"
            ext-class="my-item"
            :active="extActive === 1"
            @click="extActive = 1"
          />
        </weui-tabbar>
      </view>

      <!-- 点击事件回调 -->
      <view class="section">
        <text class="section__title">点击事件</text>
        <weui-tabbar>
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="tab1"
            :active="evtActive === 0"
            @click="onTab(0)"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="tab2"
            :active="evtActive === 1"
            @click="onTab(1)"
          />
          <weui-tabbar-item
            icon="/static/tabbar/icon_tabbar.png"
            text="tab3"
            :active="evtActive === 2"
            @click="onTab(2)"
          />
        </weui-tabbar>
        <view class="section__panel">点击次数：{{ clickCount }}</view>
      </view>

      <!-- 固定在底部 -->
      <view class="section">
        <text class="section__title">固定在底部</text>
        <view class="section__placeholder">滚动到页面底部查看固定 tabbar</view>
      </view>
    </view>

    <!-- 固定底部 tabbar -->
    <weui-tabbar fixed ext-class="page-fixed-tabbar">
      <weui-tabbar-item
        icon="/static/tabbar/icon_tabbar.png"
        text="首页"
        :active="fixedActive === 0"
        @click="fixedActive = 0"
      />
      <weui-tabbar-item
        icon="/static/tabbar/icon_tabbar.png"
        text="分类"
        :active="fixedActive === 1"
        @click="fixedActive = 1"
      />
      <weui-tabbar-item
        icon="/static/tabbar/icon_tabbar.png"
        text="购物车"
        badge="3"
        :active="fixedActive === 2"
        @click="fixedActive = 2"
      />
      <weui-tabbar-item
        icon="/static/tabbar/icon_tabbar.png"
        text="我的"
        :active="fixedActive === 3"
        @click="fixedActive = 3"
      />
    </weui-tabbar>
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
import { ref, computed } from 'vue'

const basicActive = ref(0)
const badgeActive = ref(0)
const iconActive = ref(0)
const textActive = ref(0)
const extActive = ref(0)
const evtActive = ref(0)
const fixedActive = ref(0)
const clickCount = ref(0)

const basicText = computed(() => {
  const texts = ['微信', '通讯录', '发现', '我']
  return texts[basicActive.value]
})

const onTab = (i: number) => {
  evtActive.value = i
  clickCount.value += 1
  uni.showToast({ title: `tab${i + 1}`, icon: 'none' })
}
</script>

<style scoped>
.page {
  padding: 0 0 56px;
}
.page__hd {
  padding: 16px;
  margin-bottom: 8px;
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
.page__bd {
  padding-bottom: 32px;
}
.section {
  margin-bottom: 24px;
}
.section__title {
  display: block;
  padding: 0 16px 8px;
  font-size: 14px;
  color: #888;
}
.section__panel {
  padding: 16px;
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
.section__placeholder {
  padding: 24px 16px;
  font-size: 14px;
  color: #b2b2b2;
  text-align: center;
}
</style>
