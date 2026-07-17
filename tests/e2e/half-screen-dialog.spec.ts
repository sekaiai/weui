import { test, expect, expectNoErrors } from './helpers'

/**
 * HalfScreenDialog 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（声明式 + 命令式）+ WeUI 类名
 */
test.describe('HalfScreenDialog 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('half-screen-dialog')
    await expect(page.locator('.page__title')).toContainText('HalfScreenDialog')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('点击按钮弹出声明式 HalfScreenDialog', async ({ page, gotoPage }) => {
    await gotoPage('half-screen-dialog')

    // 点击"弹出 HalfScreenDialog"按钮
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()

    // 等待 half-screen-dialog 出现
    const dialog = page.locator('.weui-half-screen-dialog')
    await expect(dialog).toBeVisible({ timeout: 5_000 })

    // 等待 innerShow 动画类生效
    await page.waitForTimeout(200)
    await expect(dialog).toHaveClass(/weui-animate-slide-up/)

    // 验证 WeUI 类名结构：头部（标题 + 副标题）、内容、底部
    await expect(page.locator('.weui-half-screen-dialog__hd')).toBeVisible()
    await expect(page.locator('.weui-half-screen-dialog__title')).toContainText('提示')
    await expect(page.locator('.weui-half-screen-dialog__subtitle')).toContainText('这是一个副标题')
    await expect(page.locator('.weui-half-screen-dialog__bd')).toContainText('这是一个半屏弹窗')
    await expect(page.locator('.weui-half-screen-dialog__ft')).toBeVisible()

    // 验证按钮渲染（取消/确定）
    const buttons = page.locator('.weui-half-screen-dialog__btn')
    await expect(buttons).toHaveCount(2)
  })

  test('点击确定按钮关闭 HalfScreenDialog', async ({ page, gotoPage }) => {
    await gotoPage('half-screen-dialog')

    // 打开基础 half-screen-dialog
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-half-screen-dialog')).toBeVisible()

    // 点击第二个按钮（确定）
    const confirmBtn = page.locator('.weui-half-screen-dialog__btn').last()
    await confirmBtn.click()

    // half-screen-dialog 应消失（等待 300ms 动画 + 卸载）
    await expect(page.locator('.weui-half-screen-dialog')).not.toBeVisible({ timeout: 2_000 })
  })

  test('点击遮罩关闭 HalfScreenDialog（maskClosable=true）', async ({ page, gotoPage }) => {
    await gotoPage('half-screen-dialog')

    // 打开基础 half-screen-dialog（默认 maskClosable=true）
    const openBtn = page.locator('.demo-section').first().locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-half-screen-dialog')).toBeVisible()

    // 点击遮罩区域（half-screen-dialog 外部）
    const mask = page.locator('.weui-mask').first()
    await mask.click({ position: { x: 5, y: 5 } })

    // half-screen-dialog 应消失
    await expect(page.locator('.weui-half-screen-dialog')).not.toBeVisible({ timeout: 2_000 })
  })

  test('禁止遮罩关闭时点击遮罩不关闭', async ({ page, gotoPage }) => {
    await gotoPage('half-screen-dialog')

    // 找到"禁止遮罩关闭"的 section
    const noMaskSection = page.locator('.demo-section').filter({ hasText: '禁止遮罩关闭' })
    const openBtn = noMaskSection.locator('.weui-btn').first()
    await openBtn.click()
    await expect(page.locator('.weui-half-screen-dialog')).toBeVisible()

    // 点击遮罩
    const mask = page.locator('.weui-mask').first()
    await mask.click({ position: { x: 5, y: 5 } })

    // half-screen-dialog 应仍然可见
    await expect(page.locator('.weui-half-screen-dialog')).toBeVisible()
  })

  test('单按钮模式自动 primary，警告按钮模式渲染 warn 类', async ({ page, gotoPage }) => {
    await gotoPage('half-screen-dialog')

    // 单按钮 section：单按钮自动 primary
    const singleSection = page.locator('.demo-section').filter({ hasText: '单按钮' })
    await singleSection.locator('.weui-btn').first().click()
    await expect(page.locator('.weui-half-screen-dialog')).toBeVisible({ timeout: 5_000 })

    // 验证只有一个按钮且为 primary
    const singleButtons = page.locator('.weui-half-screen-dialog__btn')
    await expect(singleButtons).toHaveCount(1)
    await expect(singleButtons.first()).toHaveClass(/weui-half-screen-dialog__btn_primary/)

    // 关闭单按钮 dialog
    await singleButtons.first().click()
    await expect(page.locator('.weui-half-screen-dialog')).not.toBeVisible({ timeout: 2_000 })

    // 警告按钮 section
    const warnSection = page.locator('.demo-section').filter({ hasText: '警告按钮' })
    await warnSection.locator('.weui-btn').first().click()
    await expect(page.locator('.weui-half-screen-dialog')).toBeVisible({ timeout: 5_000 })

    // 验证 warn 类按钮存在
    await expect(page.locator('.weui-half-screen-dialog__btn_warn')).toBeVisible()
    // 验证有两个按钮
    await expect(page.locator('.weui-half-screen-dialog__btn')).toHaveCount(2)
  })

  test('自定义内容 Slot 渲染', async ({ page, gotoPage }) => {
    await gotoPage('half-screen-dialog')

    // 自定义内容 Slot section
    const slotSection = page.locator('.demo-section').filter({ hasText: '自定义内容 Slot' })
    await slotSection.locator('.weui-btn').first().click()
    await expect(page.locator('.weui-half-screen-dialog')).toBeVisible({ timeout: 5_000 })

    // 验证自定义 title slot（替换默认 title）
    await expect(page.locator('.weui-half-screen-dialog__hd')).toContainText('自定义标题')

    // 验证默认 slot 自定义内容
    await expect(page.locator('.weui-half-screen-dialog__bd .custom-content')).toBeVisible()
    await expect(page.locator('.custom-icon')).toContainText('⚠️')
    await expect(page.locator('.custom-text')).toBeVisible()
  })

  test('命令式 HalfScreenDialog.show 调用', async ({ page, gotoPage }) => {
    await gotoPage('half-screen-dialog')

    // 点击 HalfScreenDialog.show 按钮
    const imperativeSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })
    const showBtn = imperativeSection.locator('.weui-btn').filter({ hasText: 'HalfScreenDialog.show' })
    await showBtn.click()

    // 命令式 half-screen-dialog 应出现（通过 overlay-host 渲染）
    await expect(page.locator('.weui-half-screen-dialog')).toBeVisible({ timeout: 5_000 })
    await expect(page.locator('.weui-half-screen-dialog__title')).toContainText('提示')
    await expect(page.locator('.weui-half-screen-dialog__subtitle')).toContainText('命令式调用')
    await expect(page.locator('.weui-half-screen-dialog__bd')).toContainText('是否确认提交？')

    // 应有两个按钮（取消 + 确定）
    const buttons = page.locator('.weui-half-screen-dialog__btn')
    await expect(buttons).toHaveCount(2)

    // 点击第一个按钮关闭
    await buttons.first().click()
    await expect(page.locator('.weui-half-screen-dialog')).not.toBeVisible({ timeout: 2_000 })
  })
})
