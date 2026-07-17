import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E 测试配置
 * 多 project 模式：examples-chromium（uni-app H5）+ docs-chromium（VitePress 文档站）
 * 运行 `pnpm e2e` 自动启动两个开发服务器并执行所有测试
 * 单独运行：`pnpm e2e --project=docs-chromium`
 */
export default defineConfig({
  testDir: './tests',
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
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5173' },
    },
    {
      name: 'docs-chromium',
      testDir: './tests/e2e-docs',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5174' },
    },
  ],

  // 自动启动两个开发服务器
  webServer: [
    {
      command: 'pnpm --filter weui-design-vue-example dev:h5',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      stdout: 'ignore',
      stderr: 'pipe',
    },
    {
      command: 'pnpm --filter docs dev',
      url: 'http://localhost:5174',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      stdout: 'ignore',
      stderr: 'pipe',
    },
  ],
})
