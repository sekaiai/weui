import { test, expect, expectNoErrors } from './helpers'

/**
 * Icon 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 尺寸/颜色自定义
 */
test.describe('Icon 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('icon')
    await expect(page.locator('.page__title')).toContainText('Icon')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('渲染所有 13 种图标类型的 weui-icon-{type} 类', async ({ page, gotoPage }) => {
    await gotoPage('icon')

    const section = page.locator('.demo-section').filter({ hasText: '所有图标类型' })
    const icons = section.locator('[class*="weui-icon-"]')
    await expect(icons).toHaveCount(13)

    const types = [
      'success',
      'success-no-circle',
      'info',
      'info-circle',
      'warn',
      'waiting',
      'waiting-circle',
      'cancel',
      'download',
      'search',
      'clear',
      'back',
      'delete',
    ]
    for (const t of types) {
      await expect(section.locator(`.weui-icon-${t}`).first()).toBeVisible()
    }
  })

  test('自定义尺寸输出 font-size 内联样式', async ({ page, gotoPage }) => {
    await gotoPage('icon')

    const section = page.locator('.demo-section').filter({ hasText: '自定义尺寸' })
    const icons = section.locator('[class*="weui-icon-"]')
    await expect(icons).toHaveCount(4)
    await expect(icons.nth(0)).toHaveCSS('font-size', '16px')
    await expect(icons.nth(1)).toHaveCSS('font-size', '23px')
    await expect(icons.nth(2)).toHaveCSS('font-size', '32px')
    await expect(icons.nth(3)).toHaveCSS('font-size', '48px')
  })

  test('自定义颜色输出 color 内联样式', async ({ page, gotoPage }) => {
    await gotoPage('icon')

    const section = page.locator('.demo-section').filter({ hasText: '自定义颜色' })
    const icons = section.locator('[class*="weui-icon-"]')
    await expect(icons).toHaveCount(4)
    await expect(icons.nth(0)).toHaveCSS('color', 'rgb(7, 193, 96)')   // #07C160
    await expect(icons.nth(1)).toHaveCSS('color', 'rgb(16, 174, 255)') // #10AEFF
    await expect(icons.nth(2)).toHaveCSS('color', 'rgb(250, 157, 59)') // #FA9D3B
    await expect(icons.nth(3)).toHaveCSS('color', 'rgb(250, 81, 81)')  // #FA5151
  })

  test('字符串 size 正常渲染为 font-size', async ({ page, gotoPage }) => {
    await gotoPage('icon')

    const section = page.locator('.demo-section').filter({ hasText: '字符串 size' })
    const icons = section.locator('[class*="weui-icon-"]')
    await expect(icons).toHaveCount(3)
    await expect(icons.nth(0)).toHaveCSS('font-size', '28px')
    await expect(icons.nth(1)).toHaveCSS('font-size', '28px')
    await expect(icons.nth(2)).toHaveAttribute('style', /font-size:\s*1em/i)
  })

  test('不传 color 时不输出 color 内联样式', async ({ page, gotoPage }) => {
    await gotoPage('icon')

    const section = page.locator('.demo-section').filter({ hasText: '自定义尺寸' })
    const icon = section.locator('[class*="weui-icon-"]').first()
    await expect(icon).toBeVisible()
    const style = await icon.getAttribute('style')
    expect(style).not.toContain('color:')
  })
})
