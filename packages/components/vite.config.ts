import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { platformTransform } from './build-plugin'

// uni-app 原生标签：在 Vue3 产物中作为自定义元素渲染
// 这些标签在 uni-app 产物中由 uni-app 编译器处理，但在 Vue3 产物中
// 必须配置为 isCustomElement，否则 @vitejs/plugin-vue 会编译为
// resolveComponent 调用，运行时因组件未注册而报错
const UNI_NATIVE_TAGS = [
  'checkbox', 'radio',
  'checkbox-group', 'radio-group',
  'navigator',
  'swiper', 'swiper-item', 'scroll-view',
  'movable-area', 'movable-view',
  'picker-view', 'picker-view-column', 'rich-text',
]

export default defineConfig(({ mode, command }) => {
  const isUniApp = mode === 'uni-app'
  const isBuild = command === 'build'

  return {
    plugins: [
      // 仅在 build 时启用平台转换插件（test 时不启用，测试用 vitest.config.ts 的 define）
      // 使用 enforce: 'pre' 让本插件在 @vitejs/plugin-vue 解析 SFC 之前运行，
      // 这样 stripConditionalCompile/replacePlatformConstant 能直接处理 .vue 源码
      ...(isBuild
        ? [
            {
              ...platformTransform({ platform: isUniApp ? 'uni-app' : 'vue3' }),
              enforce: 'pre' as const,
            },
          ]
        : []),
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag: string) => UNI_NATIVE_TAGS.includes(tag),
          },
        },
      }),
    ],
    build: isBuild ? {
      outDir: `dist/${isUniApp ? 'uni-app' : 'vue3'}`,
      // Vue 3 产物：用库模式打包为 ESM
      // uni-app 产物：vite build 不实际打包（emptyOutDir: false 避免删除），由 copy-uniapp-sfc.ts 输出 SFC
      lib: isUniApp
        ? undefined
        : {
            entry: 'src/index.ts',
            formats: ['es'],
            // Vite 5 在 es 格式下会自动追加 .mjs 扩展名，这里只给文件名部分
            fileName: 'index',
          },
      rollupOptions: {
        external: ['vue'],
      },
      emptyOutDir: !isUniApp,
    } : undefined,
  }
})
