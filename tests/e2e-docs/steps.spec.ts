import { test, expect, expectNoErrors } from './helpers'

test.describe('Steps 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('steps')
    await expect(page.locator('h1')).toContainText('Steps')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('steps')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(6)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-steps 与 3 个 item', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('steps')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-steps')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-steps__item')).toHaveCount(3)
    // 水平方向默认追加 weui-steps_horizonal
    await expect(firstDemo.locator('.weui-steps')).toHaveClass(/weui-steps_horizonal/)
  })

  test('基础用法：current=1 时第 1 个 item 标记为已完成', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('steps')
    const firstDemo = page.locator('.demo-block').first()
    const items = firstDemo.locator('.weui-steps__item')
    // index < current(1) → index 0 为 success
    await expect(items.nth(0)).toHaveClass(/weui-steps__item_success/)
    await expect(items.nth(1)).not.toHaveClass(/weui-steps__item_success/)
    await expect(items.nth(2)).not.toHaveClass(/weui-steps__item_success/)
    // 验证标题与描述渲染
    await expect(firstDemo.locator('.weui-steps__item__title')).toHaveCount(3)
    await expect(firstDemo.locator('.weui-steps__item__desc')).toHaveCount(3)
  })

  test('垂直方向：追加 weui-steps_vertical 类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('steps')
    const verticalDemo = page.locator('.demo-block').nth(1)
    await expect(verticalDemo.locator('.weui-steps')).toHaveClass(/weui-steps_vertical/)
    await expect(verticalDemo.locator('.weui-steps')).not.toHaveClass(/weui-steps_horizonal/)
  })

  test('不同进度：current=0/1/2 时 success 数量递增', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('steps')
    const progressDemo = page.locator('.demo-block').nth(2)
    const stepsEls = progressDemo.locator('.weui-steps')
    await expect(stepsEls).toHaveCount(3)
    // 第 1 个 current=0 → 0 个 success
    await expect(stepsEls.nth(0).locator('.weui-steps__item_success')).toHaveCount(0)
    // 第 2 个 current=1 → 1 个 success
    await expect(stepsEls.nth(1).locator('.weui-steps__item_success')).toHaveCount(1)
    // 第 3 个 current=2 → 2 个 success
    await expect(stepsEls.nth(2).locator('.weui-steps__item_success')).toHaveCount(2)
  })

  test('带描述：渲染 desc 节点', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('steps')
    const descDemo = page.locator('.demo-block').nth(3)
    await expect(descDemo.locator('.weui-steps__item__desc')).toHaveCount(3)
    await expect(descDemo.locator('.weui-steps__item_success')).toHaveCount(2)
  })

  test('仅标题：不渲染 desc 节点', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('steps')
    const titleDemo = page.locator('.demo-block').nth(4)
    await expect(titleDemo.locator('.weui-steps__item__title')).toHaveCount(3)
    await expect(titleDemo.locator('.weui-steps__item__desc')).toHaveCount(0)
  })

  test('扩展类名：根元素追加自定义类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('steps')
    const extDemo = page.locator('.demo-block').nth(5)
    await expect(extDemo.locator('.my-steps')).toHaveCount(1)
  })
})
