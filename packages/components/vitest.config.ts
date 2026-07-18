import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { replacePlatformConstant } from './build-plugin'
import type { Plugin } from 'vite'

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

// 最小化平台转换插件：仅对 .vue 文件替换 __IS_H5__ 常量
//
// 不使用完整的 platformTransform，因为它的 stripConditionalCompile 会：
// 1. 破坏 cell.vue/grid.vue 的条件编译块——测试期望 H5 与非 H5 两分支均执行
//    （见 cell.spec.ts 注释「测试环境未处理条件编译注释，H5 与非 H5 分支均会执行」）
// 2. 破坏 build-plugin.ts 的正则字面量（// #ifdef 等出现在注释/正则中），
//    导致 build-plugin.test.ts 报「IFDEF_RE is not defined」
//
// 本插件只做 __IS_H5__ → true 的字面量替换（replacePlatformConstant），
// 仅处理 .vue 文件（SFC 模板中的 __IS_H5__ 需要替换为 true 才能让
// uploader 的 <input v-if="__IS_H5__"> 渲染，使「不再渲染原生 input」测试
// FAIL，证明 __IS_H5__ 在 SFC 模板中生效）。
//
// 跳过 .ts 文件（避免破坏 build-plugin.ts 中的正则定义）和测试文件
// （避免破坏测试数据中的条件编译注释）。
function minimalPlatformTransform(): Plugin {
  return {
    name: 'weui-minimal-platform-transform',
    enforce: 'pre',
    transform(code, id) {
      // 只处理 .vue 文件
      if (!id.endsWith('.vue')) {
        return null
      }
      // 仅替换 __IS_H5__ 常量，不做条件编译移除、不做标签转换
      return replacePlatformConstant(code, 'vue3')
    },
  }
}

export default defineConfig({
  plugins: [
    minimalPlatformTransform(),
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
