import { test, expect, expectNoErrors } from './helpers'

/**
 * Preview 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 头部/主体/底部结构 + 自定义插槽
 *
 * 注意：Preview 类名前缀是 `weui-form-preview`（不是 weui-preview）
 */
test.describe('Preview 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('preview')
    await expect(page.locator('.page__title')).toContainText('Preview')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 weui-form-preview 类与三段结构', async ({ page, gotoPage }) => {
    await gotoPage('preview')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const preview = section.locator('.weui-form-preview').first()
    await expect(preview).toBeVisible()

    // 三段结构：hd / bd / ft
    await expect(preview.locator('.weui-form-preview__hd')).toBeVisible()
    await expect(preview.locator('.weui-form-preview__bd')).toBeVisible()
    await expect(preview.locator('.weui-form-preview__ft')).toBeVisible()

    // 头部 value 渲染标题
    await expect(preview.locator('.weui-form-preview__hd .weui-form-preview__value')).toContainText('合计：¥99.00')
  })

  test('主体渲染多个 item（label + value）', async ({ page, gotoPage }) => {
    await gotoPage('preview')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const bd = section.locator('.weui-form-preview__bd').first()

    // 3 个 item
    const items = bd.locator('.weui-form-preview__item')
    await expect(items).toHaveCount(3)

    // 每个 item 应包含 label 与 value
    await expect(items.nth(0).locator('.weui-form-preview__label')).toBeVisible()
    await expect(items.nth(0).locator('.weui-form-preview__value')).toBeVisible()
  })

  test('底部渲染按钮并区分 primary / default 类型', async ({ page, gotoPage }) => {
    await gotoPage('preview')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const ft = section.locator('.weui-form-preview__ft').first()

    // 2 个按钮
    const buttons = ft.locator('.weui-form-preview__btn')
    await expect(buttons).toHaveCount(2)

    // 取消为 default，确定为 primary
    await expect(buttons.nth(0)).toContainText('取消')
    await expect(buttons.nth(0)).toHaveClass(/weui-form-preview__btn_default/)
    await expect(buttons.nth(1)).toContainText('确定')
    await expect(buttons.nth(1)).toHaveClass(/weui-form-preview__btn_primary/)
  })

  test('仅展示信息模式无底部按钮', async ({ page, gotoPage }) => {
    await gotoPage('preview')

    const section = page.locator('.demo-section').filter({ hasText: '仅展示信息' })
    const preview = section.locator('.weui-form-preview').first()

    // 头部标题
    await expect(preview.locator('.weui-form-preview__hd .weui-form-preview__value')).toContainText('收款方：WeUI')

    // 3 个 item
    await expect(preview.locator('.weui-form-preview__item')).toHaveCount(3)

    // 无底部
    await expect(preview.locator('.weui-form-preview__ft')).toHaveCount(0)
  })

  test('自定义头部通过 #header slot 渲染 .custom-header', async ({ page, gotoPage }) => {
    await gotoPage('preview')

    const section = page.locator('.demo-section').filter({ hasText: '自定义头部' })
    const customHeader = section.locator('.custom-header').first()
    await expect(customHeader).toBeVisible()
  })

  test('自定义主体通过默认 slot 渲染 .custom-body', async ({ page, gotoPage }) => {
    await gotoPage('preview')

    const section = page.locator('.demo-section').filter({ hasText: '自定义主体' })
    const customBody = section.locator('.custom-body').first()
    await expect(customBody).toBeVisible()
  })

  test('自定义底部通过 #footer slot 渲染 .custom-footer', async ({ page, gotoPage }) => {
    await gotoPage('preview')

    const section = page.locator('.demo-section').filter({ hasText: '自定义底部' })
    const customFooter = section.locator('.custom-footer').first()
    await expect(customFooter).toBeVisible()
  })

  test('扩展类名通过 ext-class 注入 my-preview', async ({ page, gotoPage }) => {
    await gotoPage('preview')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名' })
    const preview = section.locator('.weui-form-preview').first()
    await expect(preview).toBeVisible()
    await expect(preview).toHaveClass(/my-preview/)
  })
})
