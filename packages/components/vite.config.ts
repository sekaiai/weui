import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { platformTransform } from './build-plugin'

const UNI_NATIVE_TAGS = [
  'checkbox', 'radio',
  'checkbox-group', 'radio-group',
  'navigator',
  'swiper', 'swiper-item', 'scroll-view',
  'movable-area', 'movable-view',
  'picker-view', 'picker-view-column', 'rich-text',
]

export default defineConfig({
  plugins: [
    { ...platformTransform({ platform: 'vue3' }), enforce: 'pre' as const },
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => UNI_NATIVE_TAGS.includes(tag),
        },
      },
    }),
  ],
  build: {
    outDir: 'dist/vue3',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
})
