import { test, expect, expectNoErrors } from './helpers'

test.describe('Dialog 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('dialog')
    await expect(page.locator('h1')).toContainText('Dialog')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('dialog')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(8)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击按钮弹出 dialog', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('dialog')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    await expect(page.locator('.weui-dialog').first()).toBeVisible({ timeout: 5_000 })
  })

  test('点击按钮关闭 dialog', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('dialog')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    // 点击按钮后，由于"自定义插槽" demo 复用了 show1，会有两个 dialog 同时显示。
    // 使用 last() 选取最上层（DOM 顺序最后）的 dialog，其按钮可被点击。
    const dialog = page.locator('.weui-dialog').last()
    await expect(dialog).toBeVisible({ timeout: 5_000 })
    await dialog.locator('.weui-dialog__btn').first().click()
    await expect(dialog).not.toBeVisible({ timeout: 2_000 })
  })

  test('命令式 alert', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('dialog')
    const alertDemo = page.locator('.demo-block').filter({ hasText: 'Dialog.alert' })
    await alertDemo.locator('.weui-btn').first().click()
    const dialog = page.locator('.weui-dialog')
    await expect(dialog).toBeVisible({ timeout: 5_000 })
    await dialog.locator('.weui-dialog__btn').first().click()
    await expect(dialog).not.toBeVisible({ timeout: 2_000 })
    await expect(alertDemo.locator('p')).toContainText('alert 关闭')
  })

  test('命令式 confirm', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('dialog')
    const confirmDemo = page.locator('.demo-block').filter({ hasText: 'Dialog.confirm' })
    await confirmDemo.locator('.weui-btn').first().click()
    const dialog = page.locator('.weui-dialog')
    await expect(dialog).toBeVisible({ timeout: 5_000 })
    // 点击确定（primary 按钮）
    await dialog.locator('.weui-dialog__btn_primary').click()
    await expect(dialog).not.toBeVisible({ timeout: 2_000 })
    await expect(confirmDemo.locator('p')).toContainText('confirm')
  })
})
