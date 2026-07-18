import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// uni-app 原生组件标签，在测试环境中标记为自定义元素
// 避免被 Vue 当作未注册组件导致递归渲染
const uniAppCustomElements = [
  'checkbox', 'radio', 'checkbox-group', 'radio-group',
  'switch', 'slider', 'picker', 'picker-view', 'picker-view-column',
  'editor', 'camera', 'live-player', 'live-pusher',
  'open-data', 'web-view', 'ad', 'official-account',
  'navigator',
]

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => uniAppCustomElements.includes(tag),
        },
      },
    }),
  ],
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
