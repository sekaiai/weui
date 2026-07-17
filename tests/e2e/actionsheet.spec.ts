import { test, expect, expectNoErrors } from './helpers'

/**
 * Actionsheet 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（声明式 + 命令式）+ WeUI 类名
 */
test.describe('Actionsheet 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('actionsheet')
    await expect(page.locator('.page__title')).toContainText('Actionsheet')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('点击按钮弹出 Actionsheet', async ({ page, gotoPage }) => {
    await gotoPage('actionsheet')

    // 点击第一个按钮弹出 actionsheet
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()

    // 等待 actionsheet 出现
    const actionsheet = page.locator('.weui-actionsheet')
    await expect(actionsheet).toBeVisible({ timeout: 5_000 })

    // 验证遮罩存在
    const mask = page.locator('.weui-mask')
    await expect(mask).toBeVisible()
  })

  test('Actionsheet 渲染菜单项类名正确', async ({ page, gotoPage }) => {
    await gotoPage('actionsheet')

    // 打开 actionsheet
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-actionsheet')).toBeVisible()

    // 验证菜单项
    const items = page.locator('.weui-actionsheet__menu').locator('.weui-actionsheet__cell')
    await expect(items.first()).toBeVisible()

    // 验证取消按钮
    const cancelBtn = page.locator('.weui-actionsheet__action').locator('.weui-actionsheet__cell')
    await expect(cancelBtn).toBeVisible()
  })

  test('点击菜单项关闭 Actionsheet', async ({ page, gotoPage }) => {
    await gotoPage('actionsheet')

    // 打开 actionsheet
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-actionsheet')).toBeVisible()

    // 点击第一个菜单项
    const firstItem = page.locator('.weui-actionsheet__menu .weui-actionsheet__cell').first()
    await firstItem.click()

    // actionsheet 应消失
    await expect(page.locator('.weui-actionsheet')).not.toBeVisible({ timeout: 3_000 })
  })

  test('点击取消按钮关闭 Actionsheet', async ({ page, gotoPage }) => {
    await gotoPage('actionsheet')

    // 打开 actionsheet
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-actionsheet')).toBeVisible()

    // 点击取消按钮
    const cancelBtn = page.locator('.weui-actionsheet__action .weui-actionsheet__cell').first()
    await cancelBtn.click()

    // actionsheet 应消失
    await expect(page.locator('.weui-actionsheet')).not.toBeVisible({ timeout: 3_000 })
  })

  test('点击遮罩关闭 Actionsheet', async ({ page, gotoPage }) => {
    await gotoPage('actionsheet')

    // 打开 actionsheet
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-actionsheet')).toBeVisible()

    // 点击遮罩
    const mask = page.locator('.weui-mask')
    await mask.click({ position: { x: 5, y: 5 } })

    // actionsheet 应消失
    await expect(page.locator('.weui-actionsheet')).not.toBeVisible({ timeout: 3_000 })
  })

  test('带标题的 Actionsheet 渲染标题', async ({ page, gotoPage }) => {
    await gotoPage('actionsheet')

    // 找到"带标题"的 section
    const titleSection = page.locator('.demo-section').filter({ hasText: '带标题' })
    const openBtn = titleSection.locator('.weui-btn').first()
    await openBtn.click()

    await expect(page.locator('.weui-actionsheet')).toBeVisible()

    // 验证标题存在
    const title = page.locator('.weui-actionsheet__title')
    await expect(title).toContainText('选择您要进行的操作')
  })

  test('警告操作项有 weui-actionsheet__cell_warn 类', async ({ page, gotoPage }) => {
    await gotoPage('actionsheet')

    // 找到"警告操作"的 section
    const warnSection = page.locator('.demo-section').filter({ hasText: '警告操作' })
    const openBtn = warnSection.locator('.weui-btn').first()
    await openBtn.click()

    await expect(page.locator('.weui-actionsheet')).toBeVisible()

    // 验证警告项
    const warnCell = page.locator('.weui-actionsheet__cell_warn').first()
    await expect(warnCell).toBeVisible()
  })
})
