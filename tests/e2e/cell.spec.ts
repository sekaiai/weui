import { test, expect, expectNoErrors } from './helpers'

/**
 * Cell 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为 + WeUI 类名
 */
test.describe('Cell 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('cell')
    await expect(page.locator('.page__title')).toContainText('Cell')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('cell-group 渲染 WeUI 类名正确', async ({ page, gotoPage }) => {
    await gotoPage('cell')

    // 验证 weui-cells 容器存在
    const cells = page.locator('.weui-cells').first()
    await expect(cells).toBeVisible()

    // 验证标题
    const title = page.locator('.weui-cells__title').first()
    await expect(title).toContainText('带说明的列表项')
  })

  test('cell 渲染标题和值', async ({ page, gotoPage }) => {
    await gotoPage('cell')

    // 验证 cell 结构
    const firstCell = page.locator('.weui-cell').first()
    await expect(firstCell).toBeVisible()

    // 验证标题文字（在 __hd 中）
    const cellTitle = firstCell.locator('.weui-cell__hd')
    await expect(cellTitle).toContainText('标题文字')

    // 验证说明文字（在 __bd 中）
    const cellValue = firstCell.locator('.weui-cell__bd')
    await expect(cellValue).toContainText('说明文字')
  })

  test('access 模式 cell 有 weui-cell_access 类', async ({ page, gotoPage }) => {
    await gotoPage('cell')

    // 找到带跳转的列表项
    const accessSection = page.locator('.weui-cells__title').filter({ hasText: '带跳转的列表项' })
    const cellsContainer = accessSection.locator('+ .weui-cells')

    // 验证 access cell 有正确的类名
    const accessCell = cellsContainer.locator('.weui-cell_access').first()
    await expect(accessCell).toBeVisible()
  })

  test('点击 link cell 触发跳转', async ({ page, gotoPage }) => {
    await gotoPage('cell')

    // 找到带 url 的 cell
    const accessSection = page.locator('.weui-cells__title').filter({ hasText: '带跳转的列表项' })
    const cellsContainer = accessSection.locator('+ .weui-cells')
    const linkCell = cellsContainer.locator('.weui-cell').first()

    // 点击后应导航到首页（uni-app H5 中首页路由为 /#/）
    await linkCell.click()

    // 等待导航完成，验证 URL 不再是 cell 页面
    await page.waitForTimeout(1_000)
    expect(page.url()).not.toContain('/pages/cell/cell')
  })

  test('表单型 cell-group 有 weui-cells_form 类', async ({ page, gotoPage }) => {
    await gotoPage('cell')

    // 找到表单型分组
    const formTitle = page.locator('.weui-cells__title').filter({ hasText: '表单型分组' })
    const formCells = formTitle.locator('+ .weui-cells')
    await expect(formCells).toHaveClass(/weui-cells_form/)
  })

  test('上下布局 cell 有 weui-cell_vertical 类', async ({ page, gotoPage }) => {
    await gotoPage('cell')

    // 找到表单型分组中的 cell
    const formTitle = page.locator('.weui-cells__title').filter({ hasText: '表单型分组' })
    const formCells = formTitle.locator('+ .weui-cells')
    const verticalCell = formCells.locator('.weui-cell_vertical').first()
    await expect(verticalCell).toBeVisible()
  })

  test('分组底部说明渲染正确', async ({ page, gotoPage }) => {
    await gotoPage('cell')

    // 找到带底部说明的分组
    const tipsCell = page.locator('.weui-cells__tips').filter({ hasText: '底部说明文字' })
    await expect(tipsCell).toBeVisible()
  })

  test('vcode 变体 cell：渲染 weui-cell_vcode 和 weui-flex', async ({ page, gotoPage }) => {
    await gotoPage('cell')

    // 直接定位 vcode cell
    const vcodeCell = page.locator('.weui-cell_vcode')
    await expect(vcodeCell).toBeVisible()
    await expect(vcodeCell.locator('.weui-cell__bd')).toHaveClass(/weui-flex/)
  })
})
