import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  server: {
    port: 5173,
    strictPort: true,
  },
  // weui-uniapp-design 是 workspace 包，需排除预打包以避免模块身份分裂
  // （bare import 与 easycom 文件路径导入会生成两个模块实例，
  // 导致 overlay-host-ref 的单例 handle 不一致）
  optimizeDeps: {
    exclude: ['weui-uniapp-design'],
  },
})
