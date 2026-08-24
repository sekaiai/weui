import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E 测试配置
 * 单 project 模式：examples-chromium（uni-app H5 组件行为测试）
 * 运行 `pnpm e2e` 自动启动开发服务器并执行所有测试
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
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    console: 'preserve',
  },

  projects: [
    {
      name: 'examples-chromium',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5173' },
    },
  ],

  // 自动启动开发服务器
  webServer: {
    command: 'pnpm --filter weui-uniapp-design-example dev:h5',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
