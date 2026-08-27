<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">Gallery / Slideview</span>
      <span class="page__desc">Gallery 全屏图片预览；Slideview 已在「列表 / 面板 / 宫格」页演示</span>
    </div>

    <div class="page__bd">
      <div class="demo-section">
        <div class="demo-section__title">Gallery 图片预览</div>
        <div class="gallery-thumbs">
          <img
            v-for="(src, i) in images"
            :key="i"
            :src="src"
            class="gallery-thumb"
            alt="预览图"
            @click="openGallery(i)"
          />
        </div>
        <p class="gallery-tip">点击缩略图打开全屏预览，可点击删除按钮。</p>
      </div>

      <div class="demo-section" v-if="result">
        <div class="demo-section__title">结果</div>
        <div class="result-text">{{ result }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Gallery } from 'weui-uniapp-design'

const images = [
  'https://picsum.photos/seed/gallery1/800/600',
  'https://picsum.photos/seed/gallery2/800/600',
  'https://picsum.photos/seed/gallery3/800/600',
]

const result = ref('')

const openGallery = async (index: number) => {
  const { promise } = Gallery.show({ src: images[index], showDelete: true, deleteText: '删除' })
  const action = await promise
  if (action === 'delete') {
    result.value = `删除了第 ${index + 1} 张`
  } else {
    result.value = '关闭了预览'
  }
}
</script>

<style scoped>
.gallery-thumbs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.gallery-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
}
.gallery-tip {
  margin-top: 10px;
  font-size: 13px;
  color: #888;
}
.result-text {
  font-size: 14px;
  color: #576b95;
}
</style>
