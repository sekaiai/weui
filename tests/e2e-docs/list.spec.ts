import { test, expect, expectNoErrors } from './helpers'

test.describe('List 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('list')
    await expect(page.locator('h1').first()).toContainText('List')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('list')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(4)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-list，无标题与提示', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('list')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-list')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-list__title')).toHaveCount(0)
    await expect(firstDemo.locator('.weui-list__tips')).toHaveCount(0)
    // 主体内容渲染
    await expect(firstDemo.locator('.weui-cell__bd').first()).toContainText('标题文字')
  })

  test('列表标题：渲染 weui-list__title', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('list')
    const titleDemo = page.locator('.demo-block').nth(1)
    await expect(titleDemo.locator('.weui-list__title')).toHaveCount(1)
    await expect(titleDemo.locator('.weui-list__title')).toContainText('列表标题')
    await expect(titleDemo.locator('.weui-list__tips')).toHaveCount(0)
  })

  test('底部提示：渲染 weui-list__tips', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('list')
    const tipsDemo = page.locator('.demo-block').nth(2)
    await expect(tipsDemo.locator('.weui-list__title')).toHaveCount(0)
    await expect(tipsDemo.locator('.weui-list__tips')).toHaveCount(1)
    await expect(tipsDemo.locator('.weui-list__tips')).toContainText('底部提示文字')
  })

  test('标题与提示组合：同时渲染 title 与 tips', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('list')
    const comboDemo = page.locator('.demo-block').nth(3)
    await expect(comboDemo.locator('.weui-list__title')).toHaveCount(1)
    await expect(comboDemo.locator('.weui-list__tips')).toHaveCount(1)
    // 标题在主体之前（DOM 顺序）
    const title = comboDemo.locator('.weui-list__title')
    const tips = comboDemo.locator('.weui-list__tips')
    const titleTop = await title.boundingBox()
    const tipsTop = await tips.boundingBox()
    expect(titleTop!.y).toBeLessThan(tipsTop!.y)
  })
})
