import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { platformTransform } from './build-plugin'

const UNI_NATIVE_TAGS = [
  'checkbox', 'radio', 'switch',
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
    // Keep the default Vue entry zero-config: its extracted component styles
    // are referenced through a static CSS import in dist/vue3/index.mjs.
    libInjectCss(),
  ],
  build: {
    outDir: 'dist/vue3',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.mjs',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => assetInfo.name === 'style.css'
          ? 'index.css'
          : (assetInfo.name ?? '[name][extname]'),
      },
    },
  },
})
