import { test, expect, expectNoErrors } from './helpers'

/**
 * Dialog 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（声明式 + 命令式）+ WeUI 类名
 */
test.describe('Dialog 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('dialog')
    await expect(page.locator('.page__title')).toContainText('Dialog')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('点击按钮弹出声明式 Dialog', async ({ page, gotoPage }) => {
    await gotoPage('dialog')

    // 点击"弹出 Dialog"按钮
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()

    // 等待 dialog 出现
    const dialog = page.locator('.weui-dialog')
    await expect(dialog).toBeVisible({ timeout: 5_000 })

    // 验证 WeUI 类名结构（标题在 __hd 中，非 __title）
    await expect(page.locator('.weui-dialog__hd')).toContainText('提示')
    await expect(page.locator('.weui-dialog__bd')).toContainText('这是一个对话框')

    // 验证按钮渲染
    const buttons = page.locator('.weui-dialog__btn')
    await expect(buttons).toHaveCount(2)
  })

  test('点击确定按钮关闭 Dialog', async ({ page, gotoPage }) => {
    await gotoPage('dialog')

    // 打开 dialog
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-dialog')).toBeVisible()

    // 点击第二个按钮（确定）
    const confirmBtn = page.locator('.weui-dialog__btn').last()
    await confirmBtn.click()

    // dialog 应消失（等待动画）
    await expect(page.locator('.weui-dialog')).not.toBeVisible({ timeout: 3_000 })
  })

  test('点击遮罩关闭 Dialog（maskClosable=true）', async ({ page, gotoPage }) => {
    await gotoPage('dialog')

    // 打开基础 dialog（默认 maskClosable=true）
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-dialog')).toBeVisible()

    // 点击遮罩区域（dialog 外部）
    const mask = page.locator('.weui-mask').first()
    await mask.click({ position: { x: 5, y: 5 } })

    // dialog 应消失
    await expect(page.locator('.weui-dialog')).not.toBeVisible({ timeout: 3_000 })
  })

  test('禁止遮罩关闭时点击遮罩不关闭', async ({ page, gotoPage }) => {
    await gotoPage('dialog')

    // 找到"禁止遮罩关闭"的 section
    const noMaskSection = page.locator('.demo-section').filter({ hasText: '禁止遮罩关闭' })
    const openBtn = noMaskSection.locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-dialog')).toBeVisible()

    // 点击遮罩
    const mask = page.locator('.weui-mask').first()
    await mask.click({ position: { x: 5, y: 5 } })

    // dialog 应仍然可见
    await expect(page.locator('.weui-dialog')).toBeVisible()
  })

  test('命令式 Dialog.alert 调用', async ({ page, gotoPage }) => {
    await gotoPage('dialog')

    // 点击 Dialog.alert 按钮
    const alertSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })
    const alertBtn = alertSection.locator('.weui-btn').filter({ hasText: 'Dialog.alert' })
    await alertBtn.click()

    // 命令式 dialog 应出现（通过 overlay-host 渲染）
    await expect(page.locator('.weui-dialog')).toBeVisible({ timeout: 5_000 })
    await expect(page.locator('.weui-dialog__bd')).toContainText('操作已完成')

    // 点击按钮关闭
    await page.locator('.weui-dialog__btn').first().click()
    await expect(page.locator('.weui-dialog')).not.toBeVisible({ timeout: 3_000 })
  })

  test('命令式 Dialog.confirm 调用', async ({ page, gotoPage }) => {
    await gotoPage('dialog')

    // 点击 Dialog.confirm 按钮
    const alertSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })
    const confirmBtn = alertSection.locator('.weui-btn').filter({ hasText: 'Dialog.confirm' })
    await confirmBtn.click()

    // 命令式 dialog 应出现
    await expect(page.locator('.weui-dialog')).toBeVisible({ timeout: 5_000 })
    await expect(page.locator('.weui-dialog__bd')).toContainText('是否提交申请')

    // 应有两个按钮（取消 + 确定）
    const buttons = page.locator('.weui-dialog__btn')
    await expect(buttons).toHaveCount(2)

    // 点击确定
    await buttons.last().click()
    await expect(page.locator('.weui-dialog')).not.toBeVisible({ timeout: 3_000 })
  })

  test('垂直按钮布局类名正确', async ({ page, gotoPage }) => {
    await gotoPage('dialog')

    // 打开垂直按钮 dialog
    const wrapSection = page.locator('.demo-section').filter({ hasText: '垂直按钮' })
    const openBtn = wrapSection.locator('.weui-btn').first()
    await openBtn.click()

    await expect(page.locator('.weui-dialog')).toBeVisible()

    // 验证垂直按钮容器类名
    const btnWrap = page.locator('.weui-dialog_btn-wrap, .weui-dialog__btn-wrap').first()
    await expect(btnWrap).toBeVisible()
  })
})
