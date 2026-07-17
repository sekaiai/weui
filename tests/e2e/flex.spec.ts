import { test, expect, expectNoErrors } from './helpers'

/**
 * Flex 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + direction/justify/align/wrap 内联样式 + extClass
 */
test.describe('Flex 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('flex')
    await expect(page.locator('.page__title')).toContainText('Flex')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 weui-flex 与 3 个等分 item', async ({ page, gotoPage }) => {
    await gotoPage('flex')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法（等分）' })
    const flex = section.locator('.weui-flex')
    await expect(flex).toBeVisible()
    const items = flex.locator('.weui-flex__item')
    await expect(items).toHaveCount(3)
    await expect(items.nth(0).locator('.placeholder')).toContainText('A')
    await expect(items.nth(1).locator('.placeholder')).toContainText('B')
    await expect(items.nth(2).locator('.placeholder')).toContainText('C')
  })

  test('自定义 flex 比例输出 flex 内联样式', async ({ page, gotoPage }) => {
    await gotoPage('flex')

    const section = page.locator('.demo-section').filter({ hasText: '自定义 flex 比例' })
    const items = section.locator('.weui-flex__item')
    await expect(items).toHaveCount(3)
    // 第一个 flex:2，后两个 flex:1
    await expect(items.nth(0)).toHaveCSS('flex-grow', '2')
    await expect(items.nth(1)).toHaveCSS('flex-grow', '1')
    await expect(items.nth(2)).toHaveCSS('flex-grow', '1')
  })

  test('direction=column 输出 flex-direction:column', async ({ page, gotoPage }) => {
    await gotoPage('flex')

    const section = page.locator('.demo-section').filter({ hasText: 'direction="column"' })
    const flex = section.locator('.weui-flex')
    await expect(flex).toHaveCSS('flex-direction', 'column')
  })

  test('justify=center 输出 justify-content:center', async ({ page, gotoPage }) => {
    await gotoPage('flex')

    const section = page.locator('.demo-section').filter({ hasText: 'justify="center"' })
    const flex = section.locator('.weui-flex')
    await expect(flex).toHaveCSS('justify-content', 'center')
  })

  test('align=start 输出 align-items:flex-start', async ({ page, gotoPage }) => {
    await gotoPage('flex')

    const section = page.locator('.demo-section').filter({ hasText: 'align="start"' })
    const flex = section.locator('.weui-flex')
    await expect(flex).toHaveCSS('align-items', 'flex-start')
  })

  test('wrap=wrap 输出 flex-wrap:wrap 且渲染 6 个 item', async ({ page, gotoPage }) => {
    await gotoPage('flex')

    const section = page.locator('.demo-section').filter({ hasText: '换行' })
    const flex = section.locator('.weui-flex')
    await expect(flex).toHaveCSS('flex-wrap', 'wrap')
    const items = flex.locator('.weui-flex__item')
    await expect(items).toHaveCount(6)
  })

  test('扩展类名 extClass 渲染 my-flex 与 my-item', async ({ page, gotoPage }) => {
    await gotoPage('flex')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名 extClass' })
    const flex = section.locator('.weui-flex')
    await expect(flex).toHaveClass(/my-flex/)
    const items = flex.locator('.weui-flex__item')
    await expect(items).toHaveCount(2)
    await expect(items.nth(0)).toHaveClass(/my-item/)
    await expect(items.nth(1)).not.toHaveClass(/my-item/)
  })
})
