import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  // Keep the command entry out of Vite's dependency prebundle. Its copied
  // overlay-host bridge must share runtime state with easycom SFCs.
  optimizeDeps: {
    exclude: ['weui-uniapp-design/uni-app'],
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
