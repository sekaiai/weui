import { test as base, expect, type Page, type ConsoleMessage } from '@playwright/test'

/**
 * 文档站 E2E 测试辅助工具
 * 提供页面导航、console 错误收集功能
 */

export interface DocsFixture {
  /** 收集到的 console 消息 */
  consoleErrors: ConsoleMessage[]
  /** 收集到的页面错误 */
  pageErrors: Error[]
  /** 访问组件文档页 */
  gotoDocsPage: (component: string) => Promise<void>
}

export const test = base.extend<DocsFixture>({
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
  gotoDocsPage: async ({ page }, use) => {
    const gotoDocsPage = async (component: string) => {
      await page.goto(`/components/${component}`)
      // 等待 H1 标题渲染完成
      await page.waitForSelector('h1', { timeout: 10_000 })
    }
    await use(gotoDocsPage)
  },
})

export { expect }

/**
 * 断言页面无 console 错误和页面错误
 */
export function expectNoErrors(consoleErrors: ConsoleMessage[], pageErrors: Error[]) {
  expect(pageErrors, `页面存在 JS 错误:\n${pageErrors.map((e) => e.message).join('\n')}`).toHaveLength(0)
  expect(consoleErrors, `Console 存在错误:\n${consoleErrors.map((e) => e.text()).join('\n')}`).toHaveLength(0)
}
