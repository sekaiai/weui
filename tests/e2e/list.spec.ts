import { test, expect, expectNoErrors } from './helpers'

/**
 * List 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 标题/主体/底部提示结构 + 链接列表 + 扩展类名
 */
test.describe('List 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('list')
    await expect(page.locator('.page__title')).toContainText('List')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 weui-list 类与 weui-cell', async ({ page, gotoPage }) => {
    await gotoPage('list')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const list = section.locator('.weui-list').first()
    await expect(list).toBeVisible()

    // 2 个 weui-cell
    await expect(list.locator('.weui-cell')).toHaveCount(2)

    // 基础用法无 title 与 tips
    await expect(list.locator('> .weui-list__title')).toHaveCount(0)
    await expect(list.locator('> .weui-list__tips')).toHaveCount(0)
  })

  test('列表标题通过 title 渲染 .weui-list__title', async ({ page, gotoPage }) => {
    await gotoPage('list')

    const section = page.locator('.demo-section').filter({ hasText: '列表标题' })
    const list = section.locator('.weui-list').first()

    const title = list.locator('.weui-list__title').first()
    await expect(title).toBeVisible()
    await expect(title).toContainText('列表标题')
  })

  test('底部提示通过 tips 渲染 .weui-list__tips', async ({ page, gotoPage }) => {
    await gotoPage('list')

    const section = page.locator('.demo-section').filter({ hasText: '底部提示' })
    const list = section.locator('.weui-list').first()

    const tips = list.locator('.weui-list__tips').first()
    await expect(tips).toBeVisible()
    await expect(tips).toContainText('底部提示文字')
  })

  test('标题与提示组合同时渲染 title 和 tips', async ({ page, gotoPage }) => {
    await gotoPage('list')

    const section = page.locator('.demo-section').filter({ hasText: '标题与提示组合' })
    const list = section.locator('.weui-list').first()

    await expect(list.locator('.weui-list__title')).toBeVisible()
    await expect(list.locator('.weui-list__tips')).toBeVisible()
  })

  test('带链接的列表渲染 weui-cell_access', async ({ page, gotoPage }) => {
    await gotoPage('list')

    const section = page.locator('.demo-section').filter({ hasText: '带链接的列表' })
    const list = section.locator('.weui-list').first()

    // 头部标题
    await expect(list.locator('.weui-list__title')).toContainText('带链接的列表标题')

    // 2 个 access cell
    const accessCells = list.locator('.weui-cell_access')
    await expect(accessCells).toHaveCount(2)
  })

  test('扩展类名通过 ext-class 注入 custom-list', async ({ page, gotoPage }) => {
    await gotoPage('list')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名' })
    const list = section.locator('.weui-list').first()
    await expect(list).toBeVisible()
    await expect(list).toHaveClass(/custom-list/)
  })
})
