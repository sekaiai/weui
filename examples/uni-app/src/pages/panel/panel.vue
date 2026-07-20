<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Panel</span>
      <span class="page__desc">面板组件验证页</span>
    </div>

    <div class="page__bd">
      <!-- ① 图文组合列表 -->
      <div class="demo-section">
        <div class="demo-section__title">图文组合列表</div>
        <weui-panel type="access" title="图文组合列表" footer-text="查看更多" @footer-click="onFooterClick">
          <weui-media-list :items="appmsgItems" />
        </weui-panel>
      </div>

      <!-- ② 文字组合列表 -->
      <div class="demo-section">
        <div class="demo-section__title">文字组合列表</div>
        <weui-panel type="access" title="文字组合列表" footer-text="查看更多">
          <weui-media-list :items="textItems" />
        </weui-panel>
      </div>

      <!-- ③ 小图文组合列表 -->
      <div class="demo-section">
        <div class="demo-section__title">小图文组合列表</div>
        <weui-panel title="小图文组合列表">
          <weui-media-box type="small-appmsg">
            <weui-cell
              v-for="item in cellItems"
              :key="item.id"
              variant="access"
              :icon="item.thumb"
              :value="item.title"
            />
          </weui-media-box>
        </weui-panel>
      </div>

      <!-- ④ 文字列表附来源 -->
      <div class="demo-section">
        <div class="demo-section__title">文字列表附来源</div>
        <weui-panel title="文字列表附来源">
          <weui-media-list :items="infoItems" />
        </weui-panel>
      </div>

      <!-- ⑤ 自定义内容 -->
      <div class="demo-section">
        <div class="demo-section__title">自定义内容</div>
        <weui-panel>
          <template #header>
            <div style="font-weight: bold; color: #576b95;">自定义头部</div>
          </template>
          <weui-media-box type="text" title="标题一" desc="由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星">
            <ul class="weui-media-box__info">
              <li class="weui-media-box__info__meta">文字来源</li>
              <li class="weui-media-box__info__meta">时间</li>
              <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
            </ul>
          </weui-media-box>
        </weui-panel>
      </div>
    </div>
  </div>
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
import { ref } from 'vue'

defineOptions({
  name: 'PagePanel',
})

const appmsgItems = ref([
  { id: 1, thumb: 'https://weui.io/images/pic_160.png', title: '标题一', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星', href: 'javascript:void(0);' },
  { id: 2, thumb: 'https://weui.io/images/pic_160.png', title: '标题二', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星', href: 'javascript:void(0);' },
])

const textItems = ref([
  { id: 1, title: '标题一', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星' },
  { id: 2, title: '标题二', desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星' },
])

const cellItems = ref([
  { id: 1, thumb: 'https://weui.io/images/pic_160.png', title: '文字标题', href: 'javascript:void(0);' },
  { id: 2, thumb: 'https://weui.io/images/pic_160.png', title: '文字标题', href: 'javascript:void(0);' },
])

const infoItems = ref([
  {
    id: 1,
    title: '标题一',
    desc: '由各种物质组成的巨型球状天体，由于本身会发光，所以不被天文学家定义为行星',
    info: ['文字来源', '时间', '其它信息'],
  },
])

const onFooterClick = () => {
  uni.showToast({ title: '点击查看更多', icon: 'none' })
}
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 96px;
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
.demo-section {
  margin-bottom: 32px;
}
.demo-section__title {
  margin-bottom: 12px;
  font-size: 14px;
  color: #888;
}
</style>
