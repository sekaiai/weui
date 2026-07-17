import { test, expect, expectNoErrors } from './helpers'

/**
 * Picker 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（声明式 + 命令式）+ WeUI 类名
 */
test.describe('Picker 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('picker')
    await expect(page.locator('.page__title')).toContainText('Picker')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('显示声明式 Picker 并验证 WeUI 类名', async ({ page, gotoPage }) => {
    await gotoPage('picker')

    // 基础用法 section：点击"显示 Picker"
    const basicSection = page.locator('.demo-section').first()
    await basicSection.locator('.weui-btn').first().click()

    // 等待 picker 出现
    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })

    // 验证遮罩存在
    await expect(page.locator('.weui-mask')).toBeVisible()

    // 验证 picker 结构类名
    await expect(picker.locator('.weui-picker__hd')).toBeVisible()
    await expect(picker.locator('.weui-picker__bd')).toBeVisible()
    await expect(picker.locator('.weui-picker__title')).toContainText('请选择')

    // 验证取消/确定按钮
    await expect(picker.locator('.weui-picker__action_cancel')).toContainText('取消')
    await expect(picker.locator('.weui-picker__action_confirm')).toContainText('确定')

    // 验证 picker-group 结构
    await expect(picker.locator('.weui-picker__group')).toHaveCount(1)
    await expect(picker.locator('.weui-picker__mask')).toBeVisible()
    await expect(picker.locator('.weui-picker__indicator')).toBeVisible()
    await expect(picker.locator('.weui-picker__content')).toBeVisible()

    // 验证选项渲染
    await expect(picker.locator('.weui-picker__item').first()).toContainText('选项一')
  })

  test('多列选择渲染多个 picker-group', async ({ page, gotoPage }) => {
    await gotoPage('picker')

    const multiSection = page.locator('.demo-section').filter({ hasText: '多列选择' })
    await multiSection.locator('.weui-btn').first().click()

    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })

    // 多列应有 3 个 picker-group
    await expect(picker.locator('.weui-picker__group')).toHaveCount(3)

    // 验证标题
    await expect(picker.locator('.weui-picker__title')).toContainText('请选择日期')
  })

  test('点击确定关闭 Picker 并显示选中结果', async ({ page, gotoPage }) => {
    await gotoPage('picker')

    const basicSection = page.locator('.demo-section').first()
    await basicSection.locator('.weui-btn').first().click()

    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })

    // 点击确定按钮
    await picker.locator('.weui-picker__action_confirm').click()

    // picker 应消失
    await expect(picker).not.toBeVisible({ timeout: 2_000 })

    // 验证结果展示
    await expect(basicSection.locator('.demo-result')).toContainText('已选')
  })

  test('点击取消关闭 Picker 且不显示结果', async ({ page, gotoPage }) => {
    await gotoPage('picker')

    const basicSection = page.locator('.demo-section').first()
    await basicSection.locator('.weui-btn').first().click()

    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })

    // 点击取消按钮
    await picker.locator('.weui-picker__action_cancel').click()

    // picker 应消失
    await expect(picker).not.toBeVisible({ timeout: 2_000 })

    // 基础用法 section 不应显示结果
    await expect(basicSection.locator('.demo-result')).toHaveCount(0)
  })

  test('maskClosable=true 时点击遮罩关闭', async ({ page, gotoPage }) => {
    await gotoPage('picker')

    const basicSection = page.locator('.demo-section').first()
    await basicSection.locator('.weui-btn').first().click()

    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })

    // 点击遮罩（点击 picker 外部区域）
    await page.locator('.weui-mask').click({ position: { x: 10, y: 10 } })

    // picker 应消失
    await expect(picker).not.toBeVisible({ timeout: 2_000 })
  })

  test('maskClosable=false 时点击遮罩不关闭', async ({ page, gotoPage }) => {
    await gotoPage('picker')

    const noMaskSection = page.locator('.demo-section').filter({ hasText: '禁用遮罩点击' })
    await noMaskSection.locator('.weui-btn').first().click()

    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })

    // 点击遮罩
    await page.locator('.weui-mask').click({ position: { x: 10, y: 10 } })

    // picker 应仍然可见
    await expect(picker).toBeVisible()

    // 点击取消关闭
    await picker.locator('.weui-picker__action_cancel').click()
    await expect(picker).not.toBeVisible({ timeout: 2_000 })
  })

  test('自定义按钮文字', async ({ page, gotoPage }) => {
    await gotoPage('picker')

    const customSection = page.locator('.demo-section').filter({ hasText: '自定义按钮文字' })
    await customSection.locator('.weui-btn').first().click()

    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })

    // 验证自定义按钮文字
    await expect(picker.locator('.weui-picker__action_cancel')).toContainText('关闭')
    await expect(picker.locator('.weui-picker__action_confirm')).toContainText('完成')

    // 关闭 picker
    await picker.locator('.weui-picker__action_cancel').click()
  })

  test('命令式 Picker.show 调用', async ({ page, gotoPage }) => {
    await gotoPage('picker')

    const imperativeSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })
    await imperativeSection.locator('.weui-btn').first().click()

    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })

    // 验证标题（命令式调用传入了 title="命令式选择"）
    await expect(picker.locator('.weui-picker__title')).toContainText('命令式选择')

    // 点击确定
    await picker.locator('.weui-picker__action_confirm').click()

    // picker 应消失
    await expect(picker).not.toBeVisible({ timeout: 2_000 })

    // 验证结果展示
    await expect(imperativeSection.locator('.demo-result')).toContainText('已选')
  })

  test('命令式 Picker.show 取消调用', async ({ page, gotoPage }) => {
    await gotoPage('picker')

    const imperativeSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })
    await imperativeSection.locator('.weui-btn').first().click()

    const picker = page.locator('.weui-picker')
    await expect(picker).toBeVisible({ timeout: 5_000 })

    // 点击取消
    await picker.locator('.weui-picker__action_cancel').click()

    // picker 应消失
    await expect(picker).not.toBeVisible({ timeout: 2_000 })

    // 验证结果展示为"已取消"
    await expect(imperativeSection.locator('.demo-result')).toContainText('已取消')
  })
})
