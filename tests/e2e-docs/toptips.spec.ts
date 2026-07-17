import { test, expect, expectNoErrors } from './helpers'

test.describe('Toptips 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('toptips')
    await expect(page.locator('h1')).toContainText('Toptips')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toptips')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(6)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击按钮显示 toptips', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toptips')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    await expect(page.locator('.weui-toptips')).toBeVisible({ timeout: 5_000 })
  })

  test('提示类型：info 按钮可触发并自动关闭', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toptips')
    const typeDemo = page.locator('.demo-block').nth(1)
    await typeDemo.locator('.weui-btn').filter({ hasText: 'info' }).click()
    await expect(page.locator('.weui-toptips.weui-toptips_info')).toBeVisible({ timeout: 5_000 })
    // 默认 2000ms 自动关闭
    await expect(page.locator('.weui-toptips')).not.toBeVisible({ timeout: 4_000 })
  })

  test('不自动关闭：手动关闭', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toptips')
    const persistDemo = page.locator('.demo-block').nth(2)
    const buttons = persistDemo.locator('.weui-btn')
    await buttons.filter({ hasText: '常驻提示' }).click()
    const toptips = page.locator('.weui-toptips')
    await expect(toptips).toBeVisible({ timeout: 5_000 })
    // 等待 2.5 秒确认不会自动关闭
    await page.waitForTimeout(2500)
    await expect(toptips).toBeVisible({ timeout: 1_000 })
    await buttons.filter({ hasText: '手动关闭' }).click()
    await expect(toptips).not.toBeVisible({ timeout: 2_000 })
  })

  test('命令式 info / success', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toptips')
    // 第 4 个 demo-block 为"命令式：info / success"（lastResult 共享，用 nth）
    const impDemo = page.locator('.demo-block').nth(4)
    await impDemo.locator('.weui-btn').filter({ hasText: 'Toptips.info' }).click()
    await expect(page.locator('.weui-toptips')).toBeVisible({ timeout: 5_000 })
    await expect(impDemo.locator('p')).toContainText('Toptips.info 已调用')
    await expect(page.locator('.weui-toptips')).not.toBeVisible({ timeout: 4_000 })
  })

  test('命令式 warn / error', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toptips')
    // 第 5 个 demo-block 为"命令式：warn / error"
    const impDemo = page.locator('.demo-block').nth(5)
    await impDemo.locator('.weui-btn').filter({ hasText: 'Toptips.warn' }).click()
    await expect(page.locator('.weui-toptips.weui-toptips_warn')).toBeVisible({ timeout: 5_000 })
    await expect(impDemo.locator('p')).toContainText('Toptips.warn 已调用')
    await expect(page.locator('.weui-toptips')).not.toBeVisible({ timeout: 4_000 })
  })
})
