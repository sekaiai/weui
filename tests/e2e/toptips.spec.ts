import { test, expect, expectNoErrors } from './helpers'

/**
 * Toptips 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（声明式 + 命令式）+ WeUI 类名
 */
test.describe('Toptips 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('toptips')
    await expect(page.locator('.page__title')).toContainText('Toptips')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('显示声明式 Toptips 并验证 WeUI 类名', async ({ page, gotoPage }) => {
    await gotoPage('toptips')

    // 基础用法 section：点击"显示 Toptips"
    const basicSection = page.locator('.demo-section').first()
    await basicSection.locator('.weui-btn').first().click()

    // 等待 toptips 出现
    const toptips = page.locator('.weui-toptips')
    await expect(toptips).toBeVisible({ timeout: 5_000 })

    // 验证 WeUI 类名（success 类型）
    await expect(toptips).toHaveClass(/weui-toptips_success/)

    // 验证内容
    await expect(toptips).toContainText('操作成功')
  })

  test('提示类型按钮渲染四种类型 toptips', async ({ page, gotoPage }) => {
    await gotoPage('toptips')

    const typeSection = page.locator('.demo-section').filter({ hasText: '提示类型' })
    const types = ['info', 'success', 'warn', 'error'] as const

    for (const type of types) {
      // 点击对应类型按钮
      const btn = typeSection.locator('.weui-btn').filter({ hasText: type })
      await btn.click()

      // 等待 toptips 出现并验证类名
      const toptips = typeSection.locator('.weui-toptips')
      await expect(toptips).toBeVisible({ timeout: 5_000 })
      await expect(toptips).toHaveClass(new RegExp(`weui-toptips_${type}`))

      // 等待自动关闭（默认 duration=2000）
      await expect(toptips).not.toBeVisible({ timeout: 3_000 })
    }
  })

  test('Toptips 自动关闭（duration=2000）', async ({ page, gotoPage }) => {
    await gotoPage('toptips')

    // 基础用法 section（duration=2000）
    const basicSection = page.locator('.demo-section').first()
    await basicSection.locator('.weui-btn').first().click()

    // 等待 toptips 出现
    const toptips = page.locator('.weui-toptips')
    await expect(toptips).toBeVisible({ timeout: 5_000 })

    // 等待 2500ms（duration=2000 + buffer）
    await page.waitForTimeout(2500)

    // toptips 应自动消失
    await expect(toptips).not.toBeVisible()
  })

  test('不自动关闭模式与手动关闭（duration=0）', async ({ page, gotoPage }) => {
    await gotoPage('toptips')

    // 不自动关闭 section（duration=0）
    const noAutoSection = page.locator('.demo-section').filter({ hasText: '不自动关闭' })
    const buttons = noAutoSection.locator('.weui-btn')

    // 点击"常驻提示"按钮
    await buttons.filter({ hasText: '常驻提示' }).click()
    const toptips = page.locator('.weui-toptips')
    await expect(toptips).toBeVisible({ timeout: 5_000 })

    // 等待一段时间，验证 toptips 仍然可见（不自动关闭）
    await page.waitForTimeout(1500)
    await expect(toptips).toBeVisible()

    // 点击"手动关闭"按钮
    await buttons.filter({ hasText: '手动关闭' }).click()

    // toptips 应消失
    await expect(toptips).not.toBeVisible({ timeout: 2_000 })
  })

  test('自定义时长（4 秒）显示', async ({ page, gotoPage }) => {
    await gotoPage('toptips')

    // 自定义时长 section（duration=4000）
    const customSection = page.locator('.demo-section').filter({ hasText: '自定义时长' })
    await customSection.locator('.weui-btn').first().click()

    const toptips = page.locator('.weui-toptips')
    await expect(toptips).toBeVisible({ timeout: 5_000 })

    // 等待 2500ms，验证仍可见（duration=4000 未到）
    await page.waitForTimeout(2500)
    await expect(toptips).toBeVisible()

    // 再等待至 4000ms 时长结束，验证已消失
    await expect(toptips).not.toBeVisible({ timeout: 2_500 })
  })

  test('命令式 Toptips.info/success 调用', async ({ page, gotoPage }) => {
    await gotoPage('toptips')

    const imperativeSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })
    const buttons = imperativeSection.locator('.weui-btn')

    // 测试 info
    await buttons.filter({ hasText: 'Toptips.info' }).click()
    const infoToptips = page.locator('.weui-toptips')
    await expect(infoToptips).toBeVisible({ timeout: 5_000 })
    await expect(infoToptips).toHaveClass(/weui-toptips_info/)
    await expect(infoToptips).toContainText('信息提示')
    // 等待自动关闭
    await expect(infoToptips).not.toBeVisible({ timeout: 3_000 })

    // 测试 success
    await buttons.filter({ hasText: 'Toptips.success' }).click()
    const successToptips = page.locator('.weui-toptips')
    await expect(successToptips).toBeVisible({ timeout: 5_000 })
    await expect(successToptips).toHaveClass(/weui-toptips_success/)
    await expect(successToptips).toContainText('操作成功')
  })

  test('命令式 Toptips.warn/error 调用', async ({ page, gotoPage }) => {
    await gotoPage('toptips')

    const imperativeSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })
    const buttons = imperativeSection.locator('.weui-btn')

    // 测试 warn
    await buttons.filter({ hasText: 'Toptips.warn' }).click()
    const warnToptips = page.locator('.weui-toptips')
    await expect(warnToptips).toBeVisible({ timeout: 5_000 })
    await expect(warnToptips).toHaveClass(/weui-toptips_warn/)
    await expect(warnToptips).toContainText('请注意警告')
    // 等待自动关闭
    await expect(warnToptips).not.toBeVisible({ timeout: 3_000 })

    // 测试 error
    await buttons.filter({ hasText: 'Toptips.error' }).click()
    const errorToptips = page.locator('.weui-toptips')
    await expect(errorToptips).toBeVisible({ timeout: 5_000 })
    await expect(errorToptips).toHaveClass(/weui-toptips_error/)
    await expect(errorToptips).toContainText('操作失败')
  })
})
