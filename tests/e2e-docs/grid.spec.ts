import { test, expect, expectNoErrors } from './helpers'

test.describe('Grid 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('grid')
    await expect(page.locator('h1').first()).toContainText('Grid')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('grid')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(4)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：9 个宫格渲染 icon 与 label', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('grid')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-grids')).toHaveCount(1)
    const items = firstDemo.locator('.weui-grid')
    await expect(items).toHaveCount(9)
    // 每个宫格渲染图标区与文字区
    await expect(firstDemo.locator('.weui-grid__icon')).toHaveCount(9)
    await expect(firstDemo.locator('.weui-grid__label')).toHaveCount(9)
    // icon 插槽渲染了 weui-icon
    await expect(firstDemo.locator('.weui-grid__icon i[class^="weui-icon-"]')).toHaveCount(9)
    await expect(firstDemo.locator('.weui-grid__label').first()).toContainText('成功')
  })

  test('无图标：仅渲染 label，不渲染 icon 区', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('grid')
    const plainDemo = page.locator('.demo-block').nth(1)
    const items = plainDemo.locator('.weui-grid')
    await expect(items).toHaveCount(6)
    await expect(plainDemo.locator('.weui-grid__icon')).toHaveCount(0)
    await expect(plainDemo.locator('.weui-grid__label')).toHaveCount(6)
    await expect(plainDemo.locator('.weui-grid__label').first()).toContainText('宫格一')
  })

  test('自定义内容：默认插槽覆盖 icon/label', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('grid')
    const customDemo = page.locator('.demo-block').nth(2)
    const items = customDemo.locator('.weui-grid')
    await expect(items).toHaveCount(3)
    // 默认插槽不渲染 weui-grid__icon / weui-grid__label
    await expect(customDemo.locator('.weui-grid__icon')).toHaveCount(0)
    await expect(customDemo.locator('.weui-grid__label')).toHaveCount(0)
    // 插槽文字渲染
    await expect(items.nth(0)).toContainText('A')
    await expect(items.nth(1)).toContainText('B')
    await expect(items.nth(2)).toContainText('C')
  })

  test('点击事件：点击宫格触发 click 并更新计数', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('grid')
    const clickDemo = page.locator('.demo-block').nth(3)
    // 初始无计数文字
    await expect(clickDemo.locator('p')).toHaveCount(0)
    // 点击第一个宫格（<view> 自定义元素，用 evaluate 触发原生 click）
    const firstItem = clickDemo.locator('.weui-grid').first()
    await firstItem.evaluate((el) => el.click())
    // 计数更新为 1，最近一次为"成功"
    await expect(clickDemo.locator('p')).toContainText('已点击 1 次')
    await expect(clickDemo.locator('p')).toContainText('成功')
    // 再点击第二个宫格
    await clickDemo.locator('.weui-grid').nth(1).evaluate((el) => el.click())
    await expect(clickDemo.locator('p')).toContainText('已点击 2 次')
    await expect(clickDemo.locator('p')).toContainText('信息')
  })
})
