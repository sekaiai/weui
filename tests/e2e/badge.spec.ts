import { test, expect, expectNoErrors } from './helpers'

/**
 * Badge 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 不同模式渲染 + 无障碍标签
 */
test.describe('Badge 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('badge')
    await expect(page.locator('.page__title')).toContainText('Badge')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('数字角标渲染 weui-badge 类与内容', async ({ page, gotoPage }) => {
    await gotoPage('badge')

    const section = page.locator('.demo-section').filter({ hasText: '数字角标' })
    const badges = section.locator('.weui-badge')
    await expect(badges).toHaveCount(4)

    await expect(badges.nth(0)).toContainText('1')
    await expect(badges.nth(1)).toContainText('8')
    await expect(badges.nth(2)).toContainText('88')
    await expect(badges.nth(3)).toContainText('888')

    // 数字角标不应有 dot 类
    await expect(badges.nth(0)).not.toHaveClass(/weui-badge_dot/)
  })

  test('红点模式（content 为空）渲染 weui-badge_dot 类', async ({ page, gotoPage }) => {
    await gotoPage('badge')

    const section = page.locator('.demo-section').filter({ hasText: '红点模式' })
    const dotBadge = section.locator('.weui-badge').first()
    await expect(dotBadge).toBeVisible()
    await expect(dotBadge).toHaveClass(/weui-badge_dot/)
  })

  test('文字角标渲染 New/Hot/VIP', async ({ page, gotoPage }) => {
    await gotoPage('badge')

    const section = page.locator('.demo-section').filter({ hasText: '文字角标' })
    const badges = section.locator('.weui-badge')
    await expect(badges).toHaveCount(3)
    await expect(badges.nth(0)).toContainText('New')
    await expect(badges.nth(1)).toContainText('Hot')
    await expect(badges.nth(2)).toContainText('VIP')
  })

  test('无障碍标签输出 aria-label 属性', async ({ page, gotoPage }) => {
    await gotoPage('badge')

    const section = page.locator('.demo-section').filter({ hasText: '无障碍标签' })
    const badges = section.locator('.weui-badge')
    await expect(badges).toHaveCount(2)
    await expect(badges.nth(0)).toHaveAttribute('aria-label', '，8个新通知')
    await expect(badges.nth(1)).toHaveAttribute('aria-label', '，有更新')
  })

  test('头像角标场景通过 ext-class 渲染 avatar-badge', async ({ page, gotoPage }) => {
    await gotoPage('badge')

    const section = page.locator('.demo-section').filter({ hasText: '头像角标场景' })
    const badge = section.locator('.weui-badge').first()
    await expect(badge).toBeVisible()
    await expect(badge).toHaveClass(/avatar-badge/)
    // 头像元素存在
    await expect(section.locator('.avatar')).toBeVisible()
  })

  test('列表项角标场景在 weui-cell 内渲染 badge', async ({ page, gotoPage }) => {
    await gotoPage('badge')

    const section = page.locator('.demo-section').filter({ hasText: '列表项角标场景' })
    const cells = section.locator('.weui-cell')
    await expect(cells).toHaveCount(3)
    // 每个 cell 内均有一个 badge
    const badges = section.locator('.weui-cell .weui-badge')
    await expect(badges).toHaveCount(3)
  })
})
