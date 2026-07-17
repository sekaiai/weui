import { test, expect, expectNoErrors } from './helpers'

/**
 * Msg 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 图标/文字/操作/额外区域结构 + 自定义 slot + 按钮交互
 *
 * 注意：msg 页面用 .demo-section 包裹且有 border 样式
 */
test.describe('Msg 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('msg')
    await expect(page.locator('.page__title')).toContainText('Msg')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('操作成功渲染 weui-msg 与图标/标题/描述/按钮', async ({ page, gotoPage }) => {
    await gotoPage('msg')

    const section = page.locator('.demo-section').filter({ hasText: '操作成功' })
    const msg = section.locator('.weui-msg').first()
    await expect(msg).toBeVisible()

    // 图标区：weui-icon-success + weui-icon_msg
    const icon = msg.locator('.weui-msg__icon-area .weui-icon-success')
    await expect(icon).toBeVisible()
    await expect(icon).toHaveClass(/weui-icon_msg/)

    // 文字区
    await expect(msg.locator('.weui-msg__text-area')).toBeVisible()
    await expect(msg.locator('.weui-msg__title')).toContainText('操作成功')
    await expect(msg.locator('.weui-msg__desc')).toBeVisible()

    // 操作区：2 个 button
    const buttons = msg.locator('.weui-msg__opr-area .weui-btn-area .weui-btn')
    await expect(buttons).toHaveCount(2)
  })

  test('操作失败渲染 weui-icon-warn', async ({ page, gotoPage }) => {
    await gotoPage('msg')

    const section = page.locator('.demo-section').filter({ hasText: '操作失败' })
    const msg = section.locator('.weui-msg').first()

    await expect(msg.locator('.weui-msg__icon-area .weui-icon-warn')).toBeVisible()
  })

  test('等待中渲染 weui-icon-waiting 且仅 1 个按钮', async ({ page, gotoPage }) => {
    await gotoPage('msg')

    const section = page.locator('.demo-section').filter({ hasText: '等待中' })
    const msg = section.locator('.weui-msg').first()

    await expect(msg.locator('.weui-msg__icon-area .weui-icon-waiting')).toBeVisible()

    const buttons = msg.locator('.weui-msg__opr-area .weui-btn-area .weui-btn')
    await expect(buttons).toHaveCount(1)
  })

  test('自定义图标尺寸 icon-size=93 应用到图标元素', async ({ page, gotoPage }) => {
    await gotoPage('msg')

    const section = page.locator('.demo-section').filter({ hasText: '自定义图标尺寸' })
    const msg = section.locator('.weui-msg').first()

    const icon = msg.locator('.weui-msg__icon-area .weui-icon-info').first()
    await expect(icon).toBeVisible()

    // icon-size=93 应用为 font-size
    const fontSize = await icon.evaluate((el) => window.getComputedStyle(el).fontSize)
    expect(fontSize).toBe('93px')
  })

  test('自定义图标 Slot 渲染 .custom-icon 与星号', async ({ page, gotoPage }) => {
    await gotoPage('msg')

    const section = page.locator('.demo-section').filter({ hasText: '自定义图标 Slot' })
    const msg = section.locator('.weui-msg').first()

    const customIcon = msg.locator('.weui-msg__icon-area .custom-icon').first()
    await expect(customIcon).toBeVisible()
    await expect(customIcon).toContainText('★')

    // 使用 slot 时不应渲染默认 icon i 元素
    await expect(msg.locator('.weui-msg__icon-area i[class*="weui-icon-"]')).toHaveCount(0)
  })

  test('仅标题描述模式不渲染图标区与操作区', async ({ page, gotoPage }) => {
    await gotoPage('msg')

    const section = page.locator('.demo-section').filter({ hasText: '仅标题描述' })
    const msg = section.locator('.weui-msg').first()

    await expect(msg).toBeVisible()

    // 无 type 时不渲染图标区
    await expect(msg.locator('.weui-msg__icon-area')).toHaveCount(0)

    // 无 buttons 时不渲染操作区
    await expect(msg.locator('.weui-msg__opr-area')).toHaveCount(0)

    // 文字区仍渲染
    await expect(msg.locator('.weui-msg__title')).toBeVisible()
  })

  test('底部额外区域通过 #footer slot 渲染 .weui-footer', async ({ page, gotoPage }) => {
    await gotoPage('msg')

    const section = page.locator('.demo-section').filter({ hasText: '底部额外区域' })
    const msg = section.locator('.weui-msg').first()

    const extraArea = msg.locator('.weui-msg__extra-area')
    await expect(extraArea).toBeVisible()

    // footer slot 内含 .weui-footer
    await expect(extraArea.locator('.weui-footer')).toBeVisible()
  })

  test('点击按钮触发对应操作', async ({ page, gotoPage }) => {
    await gotoPage('msg')

    const section = page.locator('.demo-section').filter({ hasText: '操作成功' })
    const msg = section.locator('.weui-msg').first()

    // 点击第一个按钮，确保可点击且不报错
    const firstBtn = msg.locator('.weui-msg__opr-area .weui-btn-area .weui-btn').first()
    await expect(firstBtn).toBeVisible()
    await firstBtn.click({ timeout: 3_000 })

    // 操作后按钮仍然存在（msg 按钮通常不销毁自身）
    await expect(firstBtn).toBeVisible()
  })
})
