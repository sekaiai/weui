import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5174,
    strictPort: false,
    open: false,
  },
  // weui-uniapp-design 是 workspace 包，排除预打包以避免模块身份分裂
  // （全局注册与页面内显式 import 会生成两个模块实例，
  // 导致 overlay-host 的单例 handle 不一致，命令式弹层无法挂载）
  optimizeDeps: {
    exclude: ['weui-uniapp-design'],
  },
})
