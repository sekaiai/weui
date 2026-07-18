import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { platformTransform } from './build-plugin'

// uni-app 原生组件标签，在测试环境中标记为自定义元素
// 注意：H5 端不渲染这些标签（用 v-if="__IS_H5__" 切换为 input/div），
// 但保留列表以防有遗漏的非 H5 路径
const uniAppCustomElements = [
  'checkbox', 'radio', 'checkbox-group', 'radio-group',
  'switch', 'slider', 'picker', 'picker-view', 'picker-view-column',
  'editor', 'camera', 'live-player', 'live-pusher',
  'open-data', 'web-view', 'ad', 'official-account',
  'navigator',
]

export default defineConfig({
  plugins: [
    // 测试时也运行平台转换：__IS_H5__ 替换为 true，移除非 H5 条件编译块
    // 使用 enforce: 'pre' 让本插件在 @vitejs/plugin-vue 解析 SFC 之前运行
    {
      ...platformTransform({ platform: 'vue3' }),
      enforce: 'pre',
    },
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => uniAppCustomElements.includes(tag),
        },
      },
    }),
  ],
  define: {
    __IS_H5__: true,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: [
      'src/**/__tests__/**/*.spec.ts',
      'src/**/__tests__/**/*.test.ts',
      '../../tests/components/**/*.test.ts',
    ],
  },
})
