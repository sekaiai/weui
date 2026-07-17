import { test, expect, expectNoErrors } from './helpers'

test.describe('Loading 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('loading')
    await expect(page.locator('h1')).toContainText('Loading')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loading')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-loading 且无文字', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loading')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-loading')).toHaveCount(1)
    // 默认 size 20
    await expect(firstDemo.locator('.weui-loading')).toHaveCSS('width', '20px')
    await expect(firstDemo.locator('.weui-loading')).toHaveCSS('height', '20px')
    // 无文字
    await expect(firstDemo.locator('.weui-loading__text')).toHaveCount(0)
  })

  test('带文字：weui-loading__text 显示加载中', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loading')
    const textDemo = page.locator('.demo-block').nth(1)
    await expect(textDemo.locator('.weui-loading')).toHaveCount(1)
    await expect(textDemo.locator('.weui-loading__text')).toContainText('加载中')
  })

  test('不同尺寸：weui-loading 宽高生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loading')
    const sizeDemo = page.locator('.demo-block').nth(2)
    const loadings = sizeDemo.locator('.weui-loading')
    await expect(loadings).toHaveCount(4)
    await expect(loadings.nth(0)).toHaveCSS('width', '16px')
    await expect(loadings.nth(0)).toHaveCSS('height', '16px')
    await expect(loadings.nth(1)).toHaveCSS('width', '20px')
    await expect(loadings.nth(2)).toHaveCSS('width', '32px')
    await expect(loadings.nth(3)).toHaveCSS('width', '48px')
  })

  test('透明背景：追加 weui-loading_transparent 类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loading')
    const transDemo = page.locator('.demo-block').nth(3)
    const loading = transDemo.locator('.weui-loading')
    await expect(loading).toHaveClass(/weui-loading_transparent/)
    // 深色背景容器渲染
    await expect(transDemo.locator('.loading-dark-bg')).toHaveCount(1)
  })

  test('页面级加载：渲染 weui-loadmore 与 tips', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loading')
    const pageDemo = page.locator('.demo-block').nth(4)
    await expect(pageDemo.locator('.weui-loadmore')).toHaveCount(1)
    await expect(pageDemo.locator('.weui-loadmore__tips')).toContainText('正在加载')
    // page 模式仍包含加载图标
    await expect(pageDemo.locator('.weui-loading')).toHaveCount(1)
  })

  test('自定义文字颜色：weui-loading__text color 生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loading')
    const colorDemo = page.locator('.demo-block').nth(5)
    const texts = colorDemo.locator('.weui-loading__text')
    await expect(texts).toHaveCount(3)
    await expect(texts.nth(0)).toHaveCSS('color', 'rgb(7, 193, 96)')
    await expect(texts.nth(1)).toHaveCSS('color', 'rgb(16, 174, 255)')
    await expect(texts.nth(2)).toHaveCSS('color', 'rgb(250, 81, 81)')
  })

  test('插槽文字：默认插槽渲染文字', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loading')
    const slotDemo = page.locator('.demo-block').nth(6)
    await expect(slotDemo.locator('.weui-loading__text')).toContainText('自定义加载文字')
  })
})
