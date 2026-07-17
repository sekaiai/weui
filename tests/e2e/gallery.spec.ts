import { test, expect, expectNoErrors } from './helpers'

/**
 * Gallery 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 显示/隐藏交互 + slot 自定义 + 动画
 */
test.describe('Gallery 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('gallery')
    await expect(page.locator('.page__title')).toContainText('Gallery')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('点击按钮显示 gallery 和图片', async ({ page, gotoPage }) => {
    await gotoPage('gallery')

    // 初始时 gallery 不在 DOM 中
    await expect(page.locator('.weui-gallery')).toHaveCount(0)

    // 点击"预览图片"按钮
    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    await section.locator('.weui-btn').first().click()

    // 等待动画生效
    await page.waitForTimeout(200)

    // gallery 应可见
    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })

    // 应有图片元素
    await expect(gallery.locator('.weui-gallery__img')).toBeVisible()

    // 基础用法无操作区（无 show-delete、无 slot）
    await expect(gallery.locator('.weui-gallery__opr')).toHaveCount(0)
  })

  test('gallery 显示时有淡入动画类名', async ({ page, gotoPage }) => {
    await gotoPage('gallery')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    await section.locator('.weui-btn').first().click()
    await page.waitForTimeout(200)

    // 应有 weui-animate-fade-in 类
    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })
    await expect(gallery).toHaveClass(/weui-animate-fade-in/)
  })

  test('显示删除按钮渲染删除区域', async ({ page, gotoPage }) => {
    await gotoPage('gallery')

    const section = page.locator('.demo-section').filter({ hasText: '显示删除按钮' })
    await section.locator('.weui-btn').first().click()
    await page.waitForTimeout(200)

    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })

    // 应有操作区
    const opr = gallery.locator('.weui-gallery__opr')
    await expect(opr).toBeVisible()

    // 应有删除按钮，默认文字"删除"
    const del = opr.locator('.weui-gallery__del')
    await expect(del).toBeVisible()
    await expect(del).toContainText('删除')
  })

  test('自定义删除文字渲染正确', async ({ page, gotoPage }) => {
    await gotoPage('gallery')

    const section = page.locator('.demo-section').filter({ hasText: '自定义删除文字' })
    await section.locator('.weui-btn').first().click()
    await page.waitForTimeout(200)

    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })

    // 删除按钮文字应为"移除"
    const del = gallery.locator('.weui-gallery__del')
    await expect(del).toContainText('移除')
  })

  test('自定义操作区 slot 渲染', async ({ page, gotoPage }) => {
    await gotoPage('gallery')

    const section = page.locator('.demo-section').filter({ hasText: '自定义操作区' })
    await section.locator('.weui-btn').first().click()
    await page.waitForTimeout(200)

    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })

    // 应有操作区
    const opr = gallery.locator('.weui-gallery__opr')
    await expect(opr).toBeVisible()

    // 操作区内有自定义 .custom-actions 和 3 个 .action-item
    const actions = opr.locator('.custom-actions')
    await expect(actions).toBeVisible()
    await expect(actions.locator('.action-item')).toHaveCount(3)

    // 使用 slot 时不应渲染默认的 .weui-gallery__del
    await expect(opr.locator('.weui-gallery__del')).toHaveCount(0)
  })

  test('点击遮罩关闭 gallery', async ({ page, gotoPage }) => {
    await gotoPage('gallery')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    await section.locator('.weui-btn').first().click()
    await page.waitForTimeout(200)

    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })

    // 点击 gallery 遮罩区域（左上角，避开图片和操作区）
    await gallery.click({ position: { x: 10, y: 10 } })

    // gallery 应消失（等待淡出动画 + 卸载）
    await expect(gallery).not.toBeVisible({ timeout: 2_000 })
  })
})
