import { test, expect, expectNoErrors } from './helpers'

/**
 * Toast 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（声明式 + 命令式）+ WeUI 类名
 */
test.describe('Toast 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('toast')
    await expect(page.locator('.page__title')).toContainText('Toast')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('显示声明式 success Toast 并验证 WeUI 类名', async ({ page, gotoPage }) => {
    await gotoPage('toast')

    // 基础用法 section：点击"显示 Toast"
    const basicSection = page.locator('.demo-section').first()
    await basicSection.locator('.weui-btn').first().click()

    // 等待 toast 出现
    const toast = page.locator('.weui-toast')
    await expect(toast).toBeVisible({ timeout: 5_000 })

    // 验证 WeUI 类名
    await expect(toast).toHaveClass(/weui-toast/)

    // 验证 success 图标类名
    const icon = toast.locator('.weui-icon_toast')
    await expect(icon).toHaveClass(/weui-icon-success-no-circle/)

    // 验证内容
    await expect(toast.locator('.weui-toast__content')).toContainText('已完成')

    // 验证透明遮罩存在
    await expect(page.locator('.weui-mask_transparent')).toHaveCount(1)
  })

  test('提示类型按钮渲染不同类型 toast', async ({ page, gotoPage }) => {
    await gotoPage('toast')

    const typeSection = page.locator('.demo-section').filter({ hasText: '提示类型' })

    // 测试 loading（duration=2000，自动关闭）
    await typeSection.locator('.weui-btn').filter({ hasText: 'loading' }).click()
    const loadingToast = page.locator('.weui-toast')
    await expect(loadingToast).toBeVisible({ timeout: 5_000 })
    await expect(loadingToast.locator('.weui-icon_toast')).toHaveClass(/weui-loading/)
    // 等待自动关闭
    await expect(loadingToast).not.toBeVisible({ timeout: 3_000 })

    // 测试 warning
    await typeSection.locator('.weui-btn').filter({ hasText: 'warning' }).click()
    const warningToast = page.locator('.weui-toast')
    await expect(warningToast).toBeVisible({ timeout: 5_000 })
    await expect(warningToast.locator('.weui-icon_toast')).toHaveClass(/weui-icon-warn/)
    await expect(warningToast).not.toBeVisible({ timeout: 3_000 })

    // 测试 text（无图标）
    await typeSection.locator('.weui-btn').filter({ hasText: 'text' }).click()
    const textToast = page.locator('.weui-toast')
    await expect(textToast).toBeVisible({ timeout: 5_000 })
    await expect(textToast.locator('.weui-icon_toast')).toHaveCount(0)
    await expect(textToast).toHaveClass(/weui-toast_text/)
  })

  test('Toast 自动关闭（duration=2000）', async ({ page, gotoPage }) => {
    await gotoPage('toast')

    // 基础用法 section（duration=2000）
    const basicSection = page.locator('.demo-section').first()
    await basicSection.locator('.weui-btn').first().click()

    const toast = page.locator('.weui-toast')
    await expect(toast).toBeVisible({ timeout: 5_000 })

    // 等待 2500ms（duration=2000 + buffer）
    await page.waitForTimeout(2500)

    // toast 应自动消失
    await expect(toast).not.toBeVisible()
  })

  test('不自动关闭模式与手动关闭（duration=0）', async ({ page, gotoPage }) => {
    await gotoPage('toast')

    // 不自动关闭 section（duration=0）
    const noAutoSection = page.locator('.demo-section').filter({ hasText: '不自动关闭' })
    const buttons = noAutoSection.locator('.weui-btn')

    // 点击"显示常驻 Toast"（此时 mask 未显示，可正常点击）
    await buttons.filter({ hasText: '常驻' }).click()
    const toast = page.locator('.weui-toast')
    await expect(toast).toBeVisible({ timeout: 5_000 })

    // 等待一段时间，验证 toast 仍然可见（不自动关闭）
    await page.waitForTimeout(2500)
    await expect(toast).toBeVisible()

    // 点击"手动关闭"按钮 — toast 的透明遮罩会拦截点击，
    // 用 evaluate 直接触发 DOM click 事件绕过遮罩
    const closeBtn = buttons.filter({ hasText: '手动关闭' })
    await closeBtn.evaluate((el) => el.click())

    // toast 应消失
    await expect(toast).not.toBeVisible({ timeout: 2_000 })
  })

  test('自定义时长（4 秒）显示', async ({ page, gotoPage }) => {
    await gotoPage('toast')

    // 自定义时长 section（duration=4000）
    const customSection = page.locator('.demo-section').filter({ hasText: '自定义时长' })
    await customSection.locator('.weui-btn').first().click()

    const toast = page.locator('.weui-toast')
    await expect(toast).toBeVisible({ timeout: 5_000 })

    // 等待 2500ms，验证仍可见（duration=4000 未到）
    await page.waitForTimeout(2500)
    await expect(toast).toBeVisible()

    // 再等待至 4000ms 时长结束，验证已消失
    await expect(toast).not.toBeVisible({ timeout: 2_500 })
  })

  test('无遮罩模式（mask=false）', async ({ page, gotoPage }) => {
    await gotoPage('toast')

    const noMaskSection = page.locator('.demo-section').filter({ hasText: '无遮罩' })
    await noMaskSection.locator('.weui-btn').first().click()

    const toast = page.locator('.weui-toast')
    await expect(toast).toBeVisible({ timeout: 5_000 })

    // 无遮罩元素
    await expect(page.locator('.weui-mask_transparent')).toHaveCount(0)

    // 等待自动关闭
    await expect(toast).not.toBeVisible({ timeout: 3_000 })
  })

  test('命令式 Toast.success 调用', async ({ page, gotoPage }) => {
    await gotoPage('toast')

    const imperativeSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })
    await imperativeSection.locator('.weui-btn').filter({ hasText: 'Toast.success' }).click()

    const toast = page.locator('.weui-toast')
    await expect(toast).toBeVisible({ timeout: 5_000 })
    await expect(toast.locator('.weui-icon_toast')).toHaveClass(/weui-icon-success-no-circle/)
    await expect(toast.locator('.weui-toast__content')).toContainText('已完成')

    // 等待自动关闭
    await expect(toast).not.toBeVisible({ timeout: 3_000 })
  })

  test('命令式 Toast.warning / text 调用', async ({ page, gotoPage }) => {
    await gotoPage('toast')

    const imperativeSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })

    // 测试 warning
    await imperativeSection.locator('.weui-btn').filter({ hasText: 'Toast.warning' }).click()
    const warningToast = page.locator('.weui-toast')
    await expect(warningToast).toBeVisible({ timeout: 5_000 })
    await expect(warningToast.locator('.weui-icon_toast')).toHaveClass(/weui-icon-warn/)
    await expect(warningToast.locator('.weui-toast__content')).toContainText('警告提示')
    // 等待自动关闭
    await expect(warningToast).not.toBeVisible({ timeout: 3_000 })

    // 测试 text
    await imperativeSection.locator('.weui-btn').filter({ hasText: 'Toast.text' }).click()
    const textToast = page.locator('.weui-toast')
    await expect(textToast).toBeVisible({ timeout: 5_000 })
    await expect(textToast.locator('.weui-icon_toast')).toHaveCount(0)
    await expect(textToast).toHaveClass(/weui-toast_text/)
    await expect(textToast.locator('.weui-toast__content')).toContainText('纯文本提示')
  })

  test('命令式 Toast.loading + hide', async ({ page, gotoPage }) => {
    await gotoPage('toast')

    const imperativeSection = page.locator('.demo-section').filter({ hasText: '命令式调用' })

    // 显示 loading（默认不自动关闭）
    await imperativeSection.locator('.weui-btn').filter({ hasText: 'Toast.loading' }).click()
    const loadingToast = page.locator('.weui-toast')
    await expect(loadingToast).toBeVisible({ timeout: 5_000 })
    await expect(loadingToast.locator('.weui-icon_toast')).toHaveClass(/weui-loading/)
    await expect(loadingToast.locator('.weui-toast__content')).toContainText('加载中')

    // 等待 3 秒，验证 loading 仍可见（不自动关闭）
    await page.waitForTimeout(3000)
    await expect(loadingToast).toBeVisible()

    // 点击 hide 关闭 — toast 的透明遮罩会拦截点击，
    // 用 evaluate 直接触发 DOM click 事件绕过遮罩
    const hideBtn = imperativeSection.locator('.weui-btn').filter({ hasText: 'Toast.hide' })
    await hideBtn.evaluate((el) => el.click())
    await expect(loadingToast).not.toBeVisible({ timeout: 2_000 })
  })
})
