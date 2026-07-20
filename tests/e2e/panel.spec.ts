import { test, expect, expectNoErrors } from './helpers'

/**
 * Panel 组件 E2E 测试
 * 验证：图文组合、文字组合、小图文组合、文字列表附来源、自定义内容
 */
test.describe('Panel 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('panel')
    await expect(page.locator('.page__title')).toContainText('Panel')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('5 个 demo-section 渲染', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const sections = page.locator('.demo-section')
    await expect(sections).toHaveCount(5)
  })

  test('图文组合列表渲染 media-box_appmsg', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const section = page.locator('.demo-section').filter({ hasText: '图文组合列表' }).first()
    await expect(section.locator('.weui-panel_access')).toHaveCount(1)
    await expect(section.locator('.weui-media-box_appmsg')).toHaveCount(2)
    await expect(section.locator('.weui-media-box__thumb')).toHaveCount(2)
    // footer-text 自动渲染 link cell
    await expect(section.locator('.weui-cell_link')).toHaveCount(1)
  })

  test('文字组合列表渲染 media-box_text', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const section = page.locator('.demo-section').filter({ hasText: '文字组合列表' }).first()
    await expect(section.locator('.weui-media-box_text')).toHaveCount(2)
    await expect(section.locator('.weui-media-box__thumb')).toHaveCount(0)
  })

  test('小图文组合列表渲染 cell_example', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const section = page.locator('.demo-section').filter({ hasText: '小图文组合列表' }).first()
    await expect(section.locator('.weui-media-box_small-appmsg')).toHaveCount(1)
    await expect(section.locator('.weui-cell_example')).toHaveCount(2)
  })

  test('点击 footer 触发 toast', async ({ page, gotoPage }) => {
    await gotoPage('panel')
    const section = page.locator('.demo-section').filter({ hasText: '图文组合列表' }).first()
    // 点击 footer link（<a> 自定义元素，用 evaluate 触发原生 click）
    await section.locator('.weui-cell_link').evaluate((el) => el.click())
    // toast 可见
    await expect(page.locator('.weui-toast')).toBeVisible()
    await expect(page.locator('.weui-toast__content')).toContainText('点击查看更多')
  })
})
