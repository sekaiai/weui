import { test, expect, expectNoErrors } from './helpers'

/**
 * Footer 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 不同属性渲染 + slot 自定义 + fixed 定位
 */
test.describe('Footer 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('footer')
    await expect(page.locator('.page__title')).toContainText('Footer')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('仅文字 footer 渲染文本类名', async ({ page, gotoPage }) => {
    await gotoPage('footer')

    const section = page.locator('.demo-section').filter({ hasText: '仅文字' })
    const footer = section.locator('.weui-footer')
    await expect(footer).toBeVisible()

    // 应有底部文字
    await expect(footer.locator('.weui-footer__text')).toContainText('Copyright © 2026 weui.io')

    // 仅文字时不应有 links 区
    await expect(footer.locator('.weui-footer__links')).toHaveCount(0)
  })

  test('单链接 footer 渲染链接结构', async ({ page, gotoPage }) => {
    await gotoPage('footer')

    const section = page.locator('.demo-section').filter({ hasText: '单链接 + 文字' })
    const footer = section.locator('.weui-footer')
    await expect(footer).toBeVisible()

    // 应有 links 区，包含 1 个链接
    const links = footer.locator('.weui-footer__links')
    await expect(links).toBeVisible()
    await expect(links.locator('.weui-footer__link')).toHaveCount(1)
    await expect(links.locator('.weui-footer__link')).toContainText('底部链接')

    // 也应有底部文字
    await expect(footer.locator('.weui-footer__text')).toContainText('Copyright')
  })

  test('多链接 footer 渲染多个链接', async ({ page, gotoPage }) => {
    await gotoPage('footer')

    const section = page.locator('.demo-section').filter({ hasText: '多链接 + 文字' })
    const links = section.locator('.weui-footer__links')
    await expect(links.locator('.weui-footer__link')).toHaveCount(2)
  })

  test('带跳转地址的链接渲染为 navigator', async ({ page, gotoPage }) => {
    await gotoPage('footer')

    const section = page.locator('.demo-section').filter({ hasText: '带跳转地址的链接' })
    const link = section.locator('.weui-footer__link').first()
    await expect(link).toContainText('WeUI 首页')

    // 带 url 的链接应渲染为 navigator（uni-app H5 编译为 <uni-navigator>）
    const tagName = await link.evaluate((el) => el.tagName.toLowerCase())
    expect(tagName).toBe('uni-navigator')
  })

  test('自定义内容通过 slot 渲染', async ({ page, gotoPage }) => {
    await gotoPage('footer')

    const section = page.locator('.demo-section').filter({ hasText: '自定义内容' })
    const footer = section.locator('.weui-footer')
    await expect(footer).toBeVisible()

    // slot 内容应存在
    await expect(footer.locator('.weui-footer__link')).toContainText('自定义链接')
    await expect(footer.locator('.weui-footer__text')).toContainText('自定义底部内容')
  })

  test('fixed footer 有固定定位类名', async ({ page, gotoPage }) => {
    await gotoPage('footer')

    // 页面末尾有 1 个 fixed footer
    const fixedFooter = page.locator('.weui-footer_fixed-bottom')
    await expect(fixedFooter).toHaveCount(1)
    await expect(fixedFooter).toBeVisible()

    // 页面总共有 6 个 footer（5 个 demo + 1 个 fixed）
    await expect(page.locator('.weui-footer')).toHaveCount(6)
  })
})
