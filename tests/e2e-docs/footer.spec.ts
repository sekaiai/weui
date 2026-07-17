import { test, expect, expectNoErrors } from './helpers'

test.describe('Footer 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('footer')
    await expect(page.locator('h1').first()).toContainText('Footer')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('footer')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(6)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：仅渲染 weui-footer__text，无 links', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('footer')
    const firstDemo = page.locator('.demo-block').first()
    const footer = firstDemo.locator('.weui-footer')
    await expect(footer).toHaveCount(1)
    await expect(firstDemo.locator('.weui-footer__text')).toContainText('Copyright')
    await expect(firstDemo.locator('.weui-footer__links')).toHaveCount(0)
  })

  test('带链接：渲染 3 个文本链接 + 文字', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('footer')
    const linkDemo = page.locator('.demo-block').nth(1)
    await expect(linkDemo.locator('.weui-footer__links')).toHaveCount(1)
    const links = linkDemo.locator('.weui-footer__link')
    await expect(links).toHaveCount(3)
    await expect(links.nth(0)).toContainText('首页')
    await expect(links.nth(2)).toContainText('联系')
    await expect(linkDemo.locator('.weui-footer__text')).toContainText('Copyright')
  })

  test('链接带 URL：渲染为 navigator 且带 url 属性', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('footer')
    const urlDemo = page.locator('.demo-block').nth(2)
    const links = urlDemo.locator('.weui-footer__link')
    await expect(links).toHaveCount(2)
    // 提供 url 的链接渲染为 navigator
    await expect(links.nth(0)).toHaveAttribute('url', 'https://weui.io')
    await expect(links.nth(1)).toHaveAttribute('url', 'https://vuejs.org')
    await expect(links.nth(0)).toContainText('WeUI')
  })

  test('仅链接：不渲染 weui-footer__text', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('footer')
    const onlyLinkDemo = page.locator('.demo-block').nth(3)
    await expect(onlyLinkDemo.locator('.weui-footer__links')).toHaveCount(1)
    await expect(onlyLinkDemo.locator('.weui-footer__link')).toHaveCount(3)
    await expect(onlyLinkDemo.locator('.weui-footer__text')).toHaveCount(0)
  })

  test('固定底部：追加 weui-footer_fixed-bottom 类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('footer')
    const fixedDemo = page.locator('.demo-block').nth(4)
    const footer = fixedDemo.locator('.weui-footer')
    await expect(footer).toHaveClass(/weui-footer_fixed-bottom/)
    await expect(footer).toContainText('固定在底部的页脚')
  })

  test('自定义内容：插槽覆盖 text 与 links', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('footer')
    const slotDemo = page.locator('.demo-block').nth(5)
    const footer = slotDemo.locator('.weui-footer')
    await expect(footer).toHaveCount(1)
    // 插槽内容渲染
    await expect(footer).toContainText('通过插槽传入的自定义内容')
    // 不渲染属性默认的 links/text 结构
    await expect(footer.locator('.weui-footer__links')).toHaveCount(0)
  })
})
