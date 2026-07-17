import { test, expect, expectNoErrors } from './helpers'

test.describe('HalfScreenDialog 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('half-screen-dialog')
    await expect(page.locator('h1')).toContainText('HalfScreenDialog')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('half-screen-dialog')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击按钮弹出半屏弹窗', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('half-screen-dialog')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    await expect(page.locator('.weui-half-screen-dialog')).toBeVisible({ timeout: 5_000 })
  })

  test('点击按钮关闭并显示结果', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('half-screen-dialog')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    const dialog = page.locator('.weui-half-screen-dialog')
    await expect(dialog).toBeVisible({ timeout: 5_000 })
    await dialog.locator('.weui-half-screen-dialog__btn').first().click()
    await expect(dialog).not.toBeVisible({ timeout: 2_000 })
    await expect(firstDemo.locator('p')).toContainText('点击')
  })

  test('禁用遮罩点击：点击遮罩不关闭', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('half-screen-dialog')
    const maskDemo = page.locator('.demo-block').filter({ hasText: '禁用遮罩点击' })
    await maskDemo.locator('.weui-btn').first().click()
    const dialog = page.locator('.weui-half-screen-dialog')
    await expect(dialog).toBeVisible({ timeout: 5_000 })
    // 点击遮罩区域（弹窗外部的 mask）
    await page.locator('.weui-mask').first().click({ position: { x: 10, y: 10 } })
    // 仍可见
    await expect(dialog).toBeVisible({ timeout: 2_000 })
    // 点击按钮关闭
    await dialog.locator('.weui-half-screen-dialog__btn').first().click()
    await expect(dialog).not.toBeVisible({ timeout: 2_000 })
  })

  test('命令式调用', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('half-screen-dialog')
    const imperativeDemo = page.locator('.demo-block').filter({ hasText: 'HalfScreenDialog.show' })
    await imperativeDemo.locator('.weui-btn').first().click()
    const dialog = page.locator('.weui-half-screen-dialog')
    await expect(dialog).toBeVisible({ timeout: 5_000 })
    // 点击确定按钮（第二个按钮）
    await dialog.locator('.weui-half-screen-dialog__btn').nth(1).click()
    await expect(dialog).not.toBeVisible({ timeout: 2_000 })
    await expect(imperativeDemo.locator('p')).toContainText('命令式点击')
  })
})
