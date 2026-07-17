import { test, expect, expectNoErrors } from './helpers'

/**
 * Grid 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + slot 自定义 + 扩展类名 + 交互
 */
test.describe('Grid 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('grid')
    await expect(page.locator('.page__title')).toContainText('Grid')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 icon 和 label', async ({ page, gotoPage }) => {
    await gotoPage('grid')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const grids = section.locator('.weui-grids')
    await expect(grids).toBeVisible()

    // 应有 3 个 grid-item
    const items = grids.locator('.weui-grid')
    await expect(items).toHaveCount(3)

    // 每个 item 应有 icon 和 label
    const firstItem = items.first()
    await expect(firstItem.locator('.weui-grid__icon')).toBeVisible()
    await expect(firstItem.locator('.weui-grid__label')).toContainText('Grid')
  })

  test('带跳转的 grid-item 结构正确', async ({ page, gotoPage }) => {
    await gotoPage('grid')

    const section = page.locator('.demo-section').filter({ hasText: '带跳转' })
    const items = section.locator('.weui-grid')
    await expect(items).toHaveCount(3)

    // 验证标签内容
    await expect(items.nth(0).locator('.weui-grid__label')).toContainText('首页')
    await expect(items.nth(1).locator('.weui-grid__label')).toContainText('Cell')
    await expect(items.nth(2).locator('.weui-grid__label')).toContainText('Badge')
  })

  test('自定义图标 slot 渲染', async ({ page, gotoPage }) => {
    await gotoPage('grid')

    const section = page.locator('.demo-section').filter({ hasText: '自定义图标' })
    const items = section.locator('.weui-grid')
    await expect(items).toHaveCount(3)

    // 每个 item 的 icon 区应有 .custom-icon
    await expect(items.nth(0).locator('.weui-grid__icon .custom-icon')).toContainText('★')
    await expect(items.nth(1).locator('.weui-grid__icon .custom-icon')).toContainText('♥')
    await expect(items.nth(2).locator('.weui-grid__icon .custom-icon')).toContainText('↗')

    // 验证 label 文字
    await expect(items.nth(0).locator('.weui-grid__label')).toContainText('收藏')
  })

  test('自定义标签 slot 渲染', async ({ page, gotoPage }) => {
    await gotoPage('grid')

    const section = page.locator('.demo-section').filter({ hasText: '自定义标签' })
    const items = section.locator('.weui-grid')
    await expect(items).toHaveCount(2)

    // label 区应有 .custom-label
    await expect(items.nth(0).locator('.weui-grid__label .custom-label')).toContainText('自定义')
    await expect(items.nth(1).locator('.weui-grid__label .custom-label')).toContainText('自定义')

    // 仍应有 icon 区
    await expect(items.nth(0).locator('.weui-grid__icon')).toBeVisible()
  })

  test('自定义内容默认 slot 渲染', async ({ page, gotoPage }) => {
    await gotoPage('grid')

    const section = page.locator('.demo-section').filter({ hasText: '自定义内容' })
    const items = section.locator('.weui-grid')
    await expect(items).toHaveCount(3)

    // 默认 slot 替换 icon+label，直接渲染 .custom-content
    await expect(items.nth(0).locator('.custom-content')).toBeVisible()
    await expect(items.nth(0).locator('.custom-content__num')).toContainText('8')
    await expect(items.nth(0).locator('.custom-content__label')).toContainText('待办')

    // 不应有默认的 icon/label 结构
    await expect(items.nth(0).locator('.weui-grid__icon')).toHaveCount(0)
    await expect(items.nth(0).locator('.weui-grid__label')).toHaveCount(0)
  })

  test('扩展类名正确应用', async ({ page, gotoPage }) => {
    await gotoPage('grid')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名' })

    // grid 容器应有 my-grids 类
    const grids = section.locator('.weui-grids')
    await expect(grids).toHaveClass(/my-grids/)

    // 每个 item 应有 my-grid-item 类
    const items = grids.locator('.weui-grid')
    await expect(items).toHaveCount(2)
    await expect(items.nth(0)).toHaveClass(/my-grid-item/)
    await expect(items.nth(1)).toHaveClass(/my-grid-item/)
  })

  test('点击 grid-item 不产生错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('grid')

    const section = page.locator('.demo-section').filter({ hasText: '仅触发 click 事件' })
    const item = section.locator('.weui-grid').first()
    await expect(item).toBeVisible()

    // 点击 grid-item，验证不产生 console 错误
    await item.click()
    expectNoErrors(consoleErrors, pageErrors)
  })
})
