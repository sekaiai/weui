import { test, expect, expectNoErrors } from './helpers'

test.describe('Slideview 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('slideview')
    await expect(page.locator('h1')).toContainText('Slideview')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('slideview')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(5)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('.weui-slideview 渲染', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('slideview')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-slideview')).toBeVisible()
  })

  test('展开后验证 .weui-slideview__btn 数量', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('slideview')
    // 第 0 个 demo：2 个按钮
    const firstDemo = page.locator('.demo-block').first()
    const toggleBtn = firstDemo.locator('.weui-btn').first()
    const slideview = firstDemo.locator('.weui-slideview')
    // 初始未展开
    await expect(slideview).not.toHaveClass(/weui-slideview_show/)
    // 点击展开
    await toggleBtn.click()
    await expect(slideview).toHaveClass(/weui-slideview_show/)
    // 验证按钮数量
    const btns = slideview.locator('.weui-slideview__btn')
    await expect(btns).toHaveCount(2)

    // 第 1 个 demo：3 个按钮
    const secondDemo = page.locator('.demo-block').nth(1)
    const toggleBtn2 = secondDemo.locator('.weui-btn').first()
    const slideview2 = secondDemo.locator('.weui-slideview')
    await toggleBtn2.click()
    await expect(slideview2).toHaveClass(/weui-slideview_show/)
    await expect(slideview2.locator('.weui-slideview__btn')).toHaveCount(3)
  })

  test('点击按钮自动收起', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('slideview')
    // 使用第 3 个 demo（索引 3）"点击按钮自动收起"，验证 buttonclick + 自动收起
    const demo = page.locator('.demo-block').nth(3)
    const toggleBtn = demo.locator('.weui-btn').first()
    const slideview = demo.locator('.weui-slideview')
    // 展开
    await toggleBtn.click()
    await expect(slideview).toHaveClass(/weui-slideview_show/)
    // 点击第一个操作按钮（展开后 .weui-slideview__left 会覆盖右侧按钮拦截 pointer 事件，
    // 使用 evaluate 触发原生 click 绕过命中检测）
    await slideview.locator('.weui-slideview__btn').first().evaluate((el) => el.click())
    // 自动收起
    await expect(slideview).not.toHaveClass(/weui-slideview_show/)
    // 验证 buttonclick 事件触发
    await expect(demo.locator('p')).toContainText('点击：')
  })
})
