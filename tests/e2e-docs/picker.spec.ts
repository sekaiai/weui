import { test, expect, expectNoErrors } from './helpers'

test.describe('Picker 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('picker')
    await expect(page.locator('h1')).toContainText('Picker')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('picker')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击按钮弹出 picker', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('picker')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    await expect(page.locator('.weui-picker')).toBeVisible({ timeout: 5_000 })
  })

  test('点击确定关闭并显示结果', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('picker')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })
    await picker.locator('.weui-picker__action_confirm').click()
    await expect(picker).not.toBeVisible({ timeout: 2_000 })
    await expect(firstDemo.locator('p')).toContainText('选中索引')
  })

  test('点击取消关闭', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('picker')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })
    await picker.locator('.weui-picker__action_cancel').click()
    await expect(picker).not.toBeVisible({ timeout: 2_000 })
  })

  test('多列选择渲染多列', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('picker')
    const multiDemo = page.locator('.demo-block').filter({ hasText: '显示多列 Picker' })
    await multiDemo.locator('.weui-btn').first().click()
    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })
    // 多列应有 3 个 picker__group
    await expect(picker.locator('.weui-picker__group')).toHaveCount(3)
    await picker.locator('.weui-picker__action_cancel').click()
  })

  test('自定义按钮文字', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('picker')
    const customDemo = page.locator('.demo-block').filter({ hasText: '显示自定义按钮 Picker' })
    await customDemo.locator('.weui-btn').first().click()
    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })
    await expect(picker.locator('.weui-picker__action_cancel')).toContainText('关闭')
    await expect(picker.locator('.weui-picker__action_confirm')).toContainText('完成')
    await picker.locator('.weui-picker__action_cancel').click()
  })

  test('禁用遮罩点击：点击遮罩不关闭', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('picker')
    // 通过 h2 标题定位"禁用遮罩点击"章节下的 demo-block（按钮文字"显示 Picker"与基础用法重复）
    const heading = page.getByRole('heading', { name: '禁用遮罩点击', level: 2 })
    const maskDemo = heading.locator('xpath=following-sibling::div[contains(@class,"demo-block")][1]')
    await maskDemo.locator('.weui-btn').first().click()
    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })
    await page.locator('.weui-mask').first().click({ position: { x: 10, y: 10 } })
    await expect(picker).toBeVisible({ timeout: 2_000 })
    await picker.locator('.weui-picker__action_cancel').click()
    await expect(picker).not.toBeVisible({ timeout: 2_000 })
  })

  test('命令式调用', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('picker')
    const imperativeDemo = page.locator('.demo-block').filter({ hasText: 'Picker.show' })
    await imperativeDemo.locator('.weui-btn').first().click()
    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })
    await picker.locator('.weui-picker__action_confirm').click()
    await expect(picker).not.toBeVisible({ timeout: 2_000 })
    await expect(imperativeDemo.locator('p')).toContainText('命令式确认')
  })
})
