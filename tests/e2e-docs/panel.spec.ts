import { test, expect, expectNoErrors } from './helpers'

test.describe('Panel 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('panel')
    await expect(page.locator('h1').first()).toContainText('Panel')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功（≥6）', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(6)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('图文组合列表：渲染 media-box_appmsg 与 thumb', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(0)
    await expect(demo.locator('.weui-panel_access')).toHaveCount(1)
    await expect(demo.locator('.weui-media-box_appmsg')).toHaveCount(2)
    await expect(demo.locator('.weui-media-box__thumb')).toHaveCount(2)
    await expect(demo.locator('.weui-cell_access.weui-cell_link')).toHaveCount(1)
    await expect(demo.locator('.weui-cell__bd')).toContainText('查看更多')
  })

  test('文字组合列表：无 thumb 自动渲染 media-box_text', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(1)
    await expect(demo.locator('.weui-media-box_text')).toHaveCount(2)
    await expect(demo.locator('.weui-media-box__thumb')).toHaveCount(0)
    await expect(demo.locator('strong.weui-media-box__title')).toHaveCount(2)
    await expect(demo.locator('p.weui-media-box__desc')).toHaveCount(2)
  })

  test('小图文组合：small-appmsg + CellGroup + Cell', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(2)
    await expect(demo.locator('.weui-media-box_small-appmsg')).toHaveCount(1)
    // CellGroup 渲染 weui-cells
    await expect(demo.locator('.weui-cells')).toHaveCount(1)
    // 2 个 Cell
    await expect(demo.locator('.weui-cell_access')).toHaveCount(2)
    // Cell icon 渲染
    await expect(demo.locator('.weui-cell__icon')).toHaveCount(2)
  })

  test('文字列表附来源：渲染 weui-media-box__info', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(3)
    await expect(demo.locator('.weui-media-box__info')).toHaveCount(1)
    await expect(demo.locator('.weui-media-box__info__meta')).toHaveCount(3)
    await expect(demo.locator('.weui-media-box__info__meta_extra')).toHaveCount(1)
  })

  test('footerText 点击触发 footer-click 事件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(4)
    const tip = demo.locator('> p')
    await expect(tip).toContainText('点击下方')
    await demo.locator('.weui-cell_link').click()
    await expect(tip).toContainText('已点击')
  })

  test('自定义内容：header slot + MediaBox 手动组合', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demo = page.locator('.demo-block').nth(5)
    await expect(demo.locator('.weui-panel__hd')).toContainText('自定义头部')
    await expect(demo.locator('.weui-media-box_text')).toHaveCount(1)
    await expect(demo.locator('.weui-media-box__info')).toHaveCount(1)
  })
})
