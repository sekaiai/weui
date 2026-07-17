import { test, expect, expectNoErrors } from './helpers'

test.describe('Actionsheet 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('actionsheet')
    await expect(page.locator('h1')).toContainText('Actionsheet')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('actionsheet')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击按钮弹出 actionsheet', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('actionsheet')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    await expect(page.locator('.weui-actionsheet')).toBeVisible({ timeout: 5_000 })
  })

  test('选择菜单项后关闭并显示结果', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('actionsheet')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    const sheet = page.locator('.weui-actionsheet')
    await expect(sheet).toBeVisible({ timeout: 5_000 })
    // 点击第一个菜单项（菜单项类名为 weui-actionsheet__cell，位于 __menu 内）
    await sheet.locator('.weui-actionsheet__menu .weui-actionsheet__cell').first().click()
    await expect(sheet).not.toBeVisible({ timeout: 2_000 })
    // 验证结果显示
    await expect(firstDemo.locator('p')).toContainText('选中')
  })

  test('点击取消关闭', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('actionsheet')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    const sheet = page.locator('.weui-actionsheet')
    await expect(sheet).toBeVisible({ timeout: 5_000 })
    // 取消按钮位于 __action 内
    await page.locator('.weui-actionsheet__action .weui-actionsheet__cell').click()
    await expect(sheet).not.toBeVisible({ timeout: 2_000 })
  })

  test('命令式调用', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('actionsheet')
    const imperativeDemo = page.locator('.demo-block').filter({ hasText: 'Actionsheet.show' })
    await imperativeDemo.locator('.weui-btn').first().click()
    const sheet = page.locator('.weui-actionsheet')
    await expect(sheet).toBeVisible({ timeout: 5_000 })
    await sheet.locator('.weui-actionsheet__menu .weui-actionsheet__cell').first().click()
    await expect(imperativeDemo.locator('p')).toContainText('命令式选中')
  })
})
