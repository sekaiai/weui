import { test as base, expect, type Page, type ConsoleMessage } from '@playwright/test'

/**
 * E2E 测试辅助工具
 * 提供 console 错误收集和页面导航功能
 */

export interface E2EFixture {
  /** 收集到的 console 消息 */
  consoleErrors: ConsoleMessage[]
  /** 收集到的页面错误 */
  pageErrors: Error[]
  /** 访问组件页面 */
  gotoPage: (pagePath: string) => Promise<void>
}

export const test = base.extend<E2EFixture>({
  consoleErrors: async ({ page }, use) => {
    const errors: ConsoleMessage[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg)
      }
    })
    await use(errors)
  },
  pageErrors: async ({ page }, use) => {
    const errors: Error[] = []
    page.on('pageerror', (err) => {
      errors.push(err)
    })
    await use(errors)
  },
  gotoPage: async ({ page }, use) => {
    const gotoPage = async (pagePath: string) => {
      // uni-app H5 使用 hash 路由
      await page.goto(`/#/pages/${pagePath}/${pagePath}`)
      // 等待页面渲染完成（等待页面标题出现）
      await page.waitForSelector('.page__title', { timeout: 10_000 })
    }
    await use(gotoPage)
  },
})

export { expect }

/**
 * 断言页面无 console 错误和页面错误
 */
export function expectNoErrors(consoleErrors: ConsoleMessage[], pageErrors: Error[]) {
  expect(pageErrors, `页面存在 JS 错误:\n${pageErrors.map((e) => e.message).join('\n')}`).toHaveLength(0)
  // 过滤掉 uni-app 开发模式的警告，只关注真正的 error
  const realErrors = consoleErrors.filter((e) => {
    const text = e.text()
    // 忽略 uni-app 开发模式的一些已知警告
    if (text.includes('uni-app') && text.includes('runtime')) return false
    return true
  })
  expect(realErrors, `Console 存在错误:\n${realErrors.map((e) => e.text()).join('\n')}`).toHaveLength(0)
}
