import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E 测试配置
 * 自动启动 uni-app H5 开发服务器，运行浏览器测试
 * AI 运行 `pnpm e2e` 即可自动验证组件页面
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 30_000,
  expect: { timeout: 5_000 },

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // 收集 console 错误用于断言
    console: 'preserve',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // 自动启动 H5 开发服务器
  webServer: {
    command: 'pnpm --filter weui-design-vue-example dev:h5',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
