<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">列表 / 面板 / 宫格</span>
      <span class="page__desc">Cell · Cells · CellGroup · Panel · Grid · MediaBox · Preview · Slideview</span>
    </div>

    <div class="page__bd">
      <!-- Cells 基础列表 -->
      <div class="demo-section">
        <div class="demo-section__title">Cells 基础列表</div>
        <weui-cells title="带标题的列表" tips="列表底部提示文字">
          <weui-cell title="单行标题" value="说明文字" />
          <weui-cell title="带图标" :icon="iconUrl" value="右侧值" />
          <weui-cell title="可点击" value=">" access @click="log('cell click')" />
          <weui-cell title="描述信息" desc="这是一段描述文字" />
        </weui-cells>
      </div>

      <!-- CellGroup 表单分组 -->
      <div class="demo-section">
        <div class="demo-section__title">CellGroup 表单分组</div>
        <weui-cell-group form title="分组标题">
          <weui-cell label="姓名" active><weui-input v-model="name" placeholder="请输入姓名" /></weui-cell>
          <weui-cell label="城市" active><weui-input v-model="city" placeholder="请输入城市" /></weui-cell>
        </weui-cell-group>
      </div>

      <!-- Panel 面板 -->
      <div class="demo-section">
        <div class="demo-section__title">Panel 面板（access）</div>
        <weui-panel title="图文组合列表" type="access" footer-text="查看更多" @footer-click="log('panel footer')">
          <weui-media-box type="appmsg" :thumb="thumbUrl" title="标题一" desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状。" @click="log('media click')" />
          <weui-media-box type="appmsg" :thumb="thumbUrl" title="标题二" desc="另一段描述文字内容。" />
        </weui-panel>
      </div>

      <!-- Grid 宫格 -->
      <div class="demo-section">
        <div class="demo-section__title">Grid 宫格</div>
        <weui-grid>
          <weui-grid-item v-for="item in gridItems" :key="item.label" :icon="item.icon" :label="item.label" @click="log(item.label)" />
        </weui-grid>
      </div>

      <!-- MediaBox 文本 / 图文 -->
      <div class="demo-section">
        <div class="demo-section__title">MediaBox 文本与图文</div>
        <weui-cells>
          <weui-media-box type="text" title="文字标题" desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。" />
          <weui-media-box type="appmsg" :thumb="thumbUrl" title="图文标题" desc="图文组合的描述文字。" />
          <weui-media-box type="cells">
            <weui-cell title="子项一" value="值一" />
            <weui-cell title="子项二" value="值二" />
          </weui-media-box>
        </weui-cells>
      </div>

      <!-- Preview 表单预览 -->
      <div class="demo-section">
        <div class="demo-section__title">Preview 表单预览</div>
        <weui-preview
          title="付款金额"
          header-label="订单号"
          :items="previewItems"
          :buttons="previewButtons"
          @buttontap="onPreviewTap"
        />
      </div>

      <!-- Slideview 滑动菜单 -->
      <div class="demo-section">
        <div class="demo-section__title">Slideview 滑动菜单</div>
        <weui-cells>
          <weui-slideview :buttons="slideButtons" @buttonclick="onSlideClick">
            <weui-cell title="左滑显示操作" value="右滑内容" />
          </weui-slideview>
        </weui-cells>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const iconUrl = 'https://picsum.photos/seed/weui-icon/40/40'
const thumbUrl = 'https://picsum.photos/seed/weui-thumb/120/120'

const name = ref('')
const city = ref('')

const gridItems = [
  { icon: 'https://picsum.photos/seed/g1/60/60', label: '图标一' },
  { icon: 'https://picsum.photos/seed/g2/60/60', label: '图标二' },
  { icon: 'https://picsum.photos/seed/g3/60/60', label: '图标三' },
  { icon: 'https://picsum.photos/seed/g4/60/60', label: '图标四' },
]

const previewItems = [
  { label: '商品', value: '微信支付会员卡' },
  { label: '单价', value: '¥ 99.00' },
  { label: '数量', value: '1' },
]

const previewButtons = [
  { text: '辅助操作', type: 'default' as const },
  { text: '主操作', type: 'primary' as const },
]

const slideButtons = [
  { text: '普通', type: 'default' as const },
  { text: '删除', type: 'warn' as const },
]

const log = (msg: string) => console.log('[Cell]', msg)
const onPreviewTap = (btn: { text: string }, index: number) => console.log('[Preview]', btn.text, index)
const onSlideClick = (btn: { text: string }, index: number) => console.log('[Slideview]', btn.text, index)
</script>
