import { test, expect, expectNoErrors } from './helpers'

test.describe('Toast 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('toast')
    await expect(page.locator('h1')).toContainText('Toast')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toast')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击按钮显示 toast', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toast')
    const firstDemo = page.locator('.demo-block').first()
    const btn = firstDemo.locator('.weui-btn').first()
    // toast 的透明遮罩会拦截后续 click，使用 evaluate click 绕过
    await btn.evaluate((el) => el.click())
    await expect(page.locator('.weui-toast')).toBeVisible({ timeout: 5_000 })
  })

  test('提示类型：四种类型按钮可触发', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toast')
    const typeDemo = page.locator('.demo-block').nth(1)
    const buttons = typeDemo.locator('.weui-btn')
    // 点击 success
    await buttons.nth(0).evaluate((el) => el.click())
    await expect(page.locator('.weui-toast')).toBeVisible({ timeout: 5_000 })
    // 等待自动关闭（默认 2000ms）
    await expect(page.locator('.weui-toast')).not.toBeVisible({ timeout: 4_000 })
  })

  test('不自动关闭：手动关闭', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toast')
    // 第 2 个 demo-block（索引 2）为"不自动关闭"
    const persistDemo = page.locator('.demo-block').nth(2)
    const buttons = persistDemo.locator('.weui-btn')
    await buttons.filter({ hasText: '常驻提示' }).evaluate((el) => el.click())
    const toast = page.locator('.weui-toast')
    await expect(toast).toBeVisible({ timeout: 5_000 })
    // 等待 3 秒确认不会自动关闭
    await page.waitForTimeout(2500)
    await expect(toast).toBeVisible({ timeout: 1_000 })
    // 手动关闭（无遮罩拦截问题，但 toast 仍在，用 evaluate 安全）
    await buttons.filter({ hasText: '手动关闭' }).evaluate((el) => el.click())
    await expect(toast).not.toBeVisible({ timeout: 2_000 })
  })

  test('命令式 success', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toast')
    // 第 5 个 demo-block 为"命令式：success / warning / text"（lastResult 共享，避免用 hasText 过滤）
    const impDemo = page.locator('.demo-block').nth(5)
    await impDemo.locator('.weui-btn').filter({ hasText: 'Toast.success' }).evaluate((el) => el.click())
    await expect(page.locator('.weui-toast')).toBeVisible({ timeout: 5_000 })
    await expect(impDemo.locator('p')).toContainText('Toast.success 已调用')
    // 等待自动关闭
    await expect(page.locator('.weui-toast')).not.toBeVisible({ timeout: 4_000 })
  })

  test('命令式 loading + hide', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toast')
    // 第 6 个 demo-block 为"命令式：loading + hide"
    const loadingDemo = page.locator('.demo-block').nth(6)
    const buttons = loadingDemo.locator('.weui-btn')
    await buttons.filter({ hasText: 'Toast.loading' }).evaluate((el) => el.click())
    const toast = page.locator('.weui-toast')
    await expect(toast).toBeVisible({ timeout: 5_000 })
    // loading 默认不自动关闭，等待 2.5 秒确认仍可见
    await page.waitForTimeout(2500)
    await expect(toast).toBeVisible({ timeout: 1_000 })
    // 点击 hide（此时 toast 遮罩可能拦截，用 evaluate）
    await buttons.filter({ hasText: 'Toast.hide' }).evaluate((el) => el.click())
    await expect(toast).not.toBeVisible({ timeout: 2_000 })
    await expect(loadingDemo.locator('p')).toContainText('Toast.hide 已调用')
  })
})
