import { test, expect, expectNoErrors } from './helpers'

test.describe('Badge 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('badge')
    await expect(page.locator('h1')).toContainText('Badge')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('badge')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-badge 且显示数字 8', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('badge')
    const firstDemo = page.locator('.demo-block').first()
    const badge = firstDemo.locator('.weui-badge')
    await expect(badge).toHaveCount(1)
    await expect(badge).toContainText('8')
    // 有内容时不带红点类
    await expect(badge).not.toHaveClass(/weui-badge_dot/)
  })

  test('红点模式：content 为空时追加 weui-badge_dot', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('badge')
    const dotDemo = page.locator('.demo-block').nth(1)
    const badge = dotDemo.locator('.weui-badge')
    await expect(badge).toHaveCount(1)
    await expect(badge).toHaveClass(/weui-badge_dot/)
  })

  test('文字角标：渲染多个文本徽章', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('badge')
    const textDemo = page.locator('.demo-block').nth(2)
    const badges = textDemo.locator('.weui-badge')
    await expect(badges).toHaveCount(3)
    await expect(badges.nth(0)).toContainText('New')
    await expect(badges.nth(1)).toContainText('hot')
    await expect(badges.nth(2)).toContainText('99+')
  })

  test('不同内容对比：5 个徽章混合渲染', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('badge')
    const mixDemo = page.locator('.demo-block').nth(3)
    const badges = mixDemo.locator('.weui-badge')
    await expect(badges).toHaveCount(5)
    // 最后一个为红点模式
    await expect(badges.nth(4)).toHaveClass(/weui-badge_dot/)
  })

  test('无障碍标签：aria-label 属性输出', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('badge')
    const a11yDemo = page.locator('.demo-block').nth(4)
    const badge = a11yDemo.locator('.weui-badge')
    await expect(badge).toHaveAttribute('aria-label', '8个新通知')
  })

  test('扩展类名：根元素追加自定义类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('badge')
    const extDemo = page.locator('.demo-block').nth(5)
    await expect(extDemo.locator('.badge-avatar-dot')).toHaveCount(1)
    // 头像元素渲染
    await expect(extDemo.locator('.badge-avatar')).toHaveCount(1)
  })

  test('列表场景：cell 内渲染红点徽章', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('badge')
    const cellDemo = page.locator('.demo-block').nth(6)
    await expect(cellDemo.locator('.weui-cell')).toHaveCount(1)
    const badge = cellDemo.locator('.weui-badge')
    await expect(badge).toHaveCount(1)
    await expect(badge).toHaveClass(/weui-badge_dot/)
  })
})
