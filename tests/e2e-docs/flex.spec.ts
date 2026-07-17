import { test, expect, expectNoErrors } from './helpers'

test.describe('Flex 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('flex')
    await expect(page.locator('h1').first()).toContainText('Flex')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('flex')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(6)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：3 个 weui-flex__item 等分', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('flex')
    const firstDemo = page.locator('.demo-block').first()
    const flex = firstDemo.locator('.weui-flex')
    await expect(flex).toHaveCount(1)
    // 默认 row / flex-start / center
    await expect(flex).toHaveCSS('flex-direction', 'row')
    await expect(flex).toHaveCSS('justify-content', 'flex-start')
    await expect(flex).toHaveCSS('align-items', 'center')
    const items = firstDemo.locator('.weui-flex__item')
    await expect(items).toHaveCount(3)
    await expect(items.nth(0)).toContainText('1')
    await expect(items.nth(2)).toContainText('3')
  })

  test('主轴对齐：5 行 justify-content 依次生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('flex')
    const justifyDemo = page.locator('.demo-block').nth(1)
    const flexes = justifyDemo.locator('.weui-flex')
    await expect(flexes).toHaveCount(5)
    await expect(flexes.nth(0)).toHaveCSS('justify-content', 'flex-start')
    await expect(flexes.nth(1)).toHaveCSS('justify-content', 'center')
    await expect(flexes.nth(2)).toHaveCSS('justify-content', 'flex-end')
    await expect(flexes.nth(3)).toHaveCSS('justify-content', 'space-between')
    await expect(flexes.nth(4)).toHaveCSS('justify-content', 'space-around')
  })

  test('交叉轴对齐：3 行 align-items 依次生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('flex')
    const alignDemo = page.locator('.demo-block').nth(2)
    const flexes = alignDemo.locator('.weui-flex')
    await expect(flexes).toHaveCount(3)
    await expect(flexes.nth(0)).toHaveCSS('align-items', 'flex-start')
    await expect(flexes.nth(1)).toHaveCSS('align-items', 'center')
    await expect(flexes.nth(2)).toHaveCSS('align-items', 'flex-end')
  })

  test('换行：flex-wrap 为 wrap', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('flex')
    const wrapDemo = page.locator('.demo-block').nth(3)
    const flex = wrapDemo.locator('.weui-flex')
    await expect(flex).toHaveCount(1)
    await expect(flex).toHaveCSS('flex-wrap', 'wrap')
    await expect(wrapDemo.locator('.flex-demo-box')).toHaveCount(6)
  })

  test('垂直布局：flex-direction 为 column', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('flex')
    const colDemo = page.locator('.demo-block').nth(4)
    const flex = colDemo.locator('.weui-flex')
    await expect(flex).toHaveCount(1)
    await expect(flex).toHaveCSS('flex-direction', 'column')
    await expect(colDemo.locator('.flex-demo-box')).toHaveCount(3)
  })

  test('子项比例：flex 属性 1/2/3 生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('flex')
    const ratioDemo = page.locator('.demo-block').nth(5)
    const items = ratioDemo.locator('.weui-flex__item')
    await expect(items).toHaveCount(3)
    await expect(items.nth(0)).toHaveCSS('flex-grow', '1')
    await expect(items.nth(1)).toHaveCSS('flex-grow', '2')
    await expect(items.nth(2)).toHaveCSS('flex-grow', '3')
    await expect(items.nth(0)).toContainText('flex 1')
    await expect(items.nth(2)).toContainText('flex 3')
  })
})
