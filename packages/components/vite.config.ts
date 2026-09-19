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
    // dist/vue3/types 由 build:types（vue-tsc）生成，与 vite 产物同处一个目录。
    // docs 的 predev/prebuild 只调用 build:vue3，默认的 emptyOutDir 会把声明文件
    // 一并清空，导致随后发布的包缺失 types 入口。产物文件名固定
    // （index.mjs / index.css / ssr.mjs），关闭清空不会留下哈希残留。
    emptyOutDir: false,
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
