import { test, expect, expectNoErrors } from './helpers'

/**
 * Checkbox 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为 + WeUI 类名
 *
 * uni-app H5 编译后原生标签会添加 uni- 前缀：
 * checkbox-group → uni-checkbox-group, checkbox → uni-checkbox,
 * radio-group → uni-radio-group, radio → uni-radio, label → uni-label
 * 选中状态通过 .uni-checkbox-input / .uni-radio-input 内是否含 svg 体现
 */
test.describe('Checkbox 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('checkbox')
    await expect(page.locator('.page__title')).toContainText('Checkbox')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('多选模式渲染 checkbox-group + checkbox', async ({ page, gotoPage }) => {
    await gotoPage('checkbox')

    // 验证多选列表标题
    const multiTitle = page.locator('.weui-cells__title').filter({ hasText: '复选列表' })
    await expect(multiTitle).toBeVisible()

    // 验证 uni-checkbox-group 存在
    const checkboxGroup = multiTitle.locator('+ .weui-cells').locator('uni-checkbox-group')
    await expect(checkboxGroup).toBeVisible()

    // 验证有 3 个 uni-checkbox
    const checkboxes = checkboxGroup.locator('uni-checkbox')
    await expect(checkboxes).toHaveCount(3)
  })

  test('点击 checkbox 切换选中状态', async ({ page, gotoPage }) => {
    await gotoPage('checkbox')

    // 找到多选列表，初始 multiValues=['1']，第一项已选中，第二项未选中
    const multiTitle = page.locator('.weui-cells__title').filter({ hasText: '复选列表' })
    const cells = multiTitle.locator('+ .weui-cells')
    const labels = cells.locator('.weui-check__label')

    // 第二项初始未选中（无 svg）
    const secondCheckboxInput = labels.nth(1).locator('.uni-checkbox-input')
    await expect(secondCheckboxInput.locator('svg')).toHaveCount(0)

    // 点击第二项
    await labels.nth(1).click()

    // 第二项应变为选中（出现 svg）
    await expect(secondCheckboxInput.locator('svg')).toHaveCount(1)
  })

  test('单选模式点击切换选中（互斥）', async ({ page, gotoPage }) => {
    await gotoPage('checkbox')

    // 找到单选列表，初始 radioValue=['1']，第一项已选中
    const radioTitle = page.locator('.weui-cells__title').filter({ hasText: '单选列表' })
    const cells = radioTitle.locator('+ .weui-cells')
    const labels = cells.locator('.weui-check__label')

    // 第一项初始已选中（有 svg）
    const firstRadioInput = labels.first().locator('.uni-radio-input')
    await expect(firstRadioInput.locator('svg')).toHaveCount(1)

    // 第二项初始未选中（无 svg）
    const secondRadioInput = labels.nth(1).locator('.uni-radio-input')
    await expect(secondRadioInput.locator('svg')).toHaveCount(0)

    // 点击第二项
    await labels.nth(1).click()

    // 第二项应变为选中
    await expect(secondRadioInput.locator('svg')).toHaveCount(1)

    // 第一项应取消选中（互斥）
    await expect(firstRadioInput.locator('svg')).toHaveCount(0)
  })

  test('禁用选项有 weui-cell_disabled 类', async ({ page, gotoPage }) => {
    await gotoPage('checkbox')

    // 找到禁用示例
    const disabledTitle = page.locator('.weui-cells__title').filter({ hasText: '禁用示例' })
    const cells = disabledTitle.locator('+ .weui-cells')
    const disabledCell = cells.locator('.weui-cell_disabled').first()
    await expect(disabledCell).toBeVisible()
  })

  test('全部禁用分组所有 cell 都有 disabled 类', async ({ page, gotoPage }) => {
    await gotoPage('checkbox')

    const allDisabledTitle = page.locator('.weui-cells__title').filter({ hasText: '全部禁用' })
    const cells = allDisabledTitle.locator('+ .weui-cells')
    const disabledCells = cells.locator('.weui-cell_disabled')
    await expect(disabledCells).toHaveCount(2)
  })

  test('表单型分组有 weui-cells_form 类', async ({ page, gotoPage }) => {
    await gotoPage('checkbox')

    const formTitle = page.locator('.weui-cells__title').filter({ hasText: '表单型复选' })
    const formCells = formTitle.locator('+ .weui-cells')
    await expect(formCells).toHaveClass(/weui-cells_form/)
  })
})
