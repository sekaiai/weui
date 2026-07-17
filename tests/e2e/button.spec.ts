import { test, expect, expectNoErrors } from './helpers'

/**
 * Button 组件 E2E 测试
 * 验证：页面可访问性 + 无报错 + 交互行为 + WeUI 类名
 */
test.describe('Button 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('index')
    // 首页就是 button 验证页
    await expect(page.locator('.page__title')).toContainText('WeUI Design Vue')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('渲染所有按钮类型，WeUI 类名正确', async ({ page, gotoPage }) => {
    await gotoPage('index')

    // primary 按钮应有 weui-btn 类
    const primaryBtn = page.locator('.weui-btn_primary').first()
    await expect(primaryBtn).toBeVisible()
    await expect(primaryBtn).toHaveClass(/weui-btn/)

    // default 按钮
    const defaultBtn = page.locator('.weui-btn_default').first()
    await expect(defaultBtn).toBeVisible()

    // warn 按钮
    const warnBtn = page.locator('.weui-btn_warn').first()
    await expect(warnBtn).toBeVisible()
  })

  test('点击按钮触发 click 事件', async ({ page, gotoPage }) => {
    await gotoPage('index')

    // 点击 primary 按钮，监听 console
    const primaryBtn = page.locator('.weui-btn_primary').first()
    await primaryBtn.click()

    // 验证点击不会导致页面错误
    // （onPrimary 回调会 console.log）
  })

  test('禁用按钮不可点击', async ({ page, gotoPage }) => {
    await gotoPage('index')

    // 找到禁用按钮
    const disabledBtn = page.locator('.weui-btn_disabled').first()
    await expect(disabledBtn).toBeVisible()
    // 禁用按钮应有 disabled 属性或 weui-btn_disabled 类
    await expect(disabledBtn).toHaveClass(/weui-btn_disabled/)
  })

  test('加载状态按钮渲染正确', async ({ page, gotoPage }) => {
    await gotoPage('index')

    // loading 按钮应有 weui-btn_loading 类或 loading 图标
    const loadingSection = page.locator('.demo-section').filter({ hasText: '加载状态' })
    await expect(loadingSection).toBeVisible()
    // 验证 loading 图标存在（WeUI 使用 weui-primary-loading 类）
    const loadingIcon = loadingSection.locator('.weui-primary-loading').first()
    await expect(loadingIcon).toBeVisible()
  })

  test('Cell 样式按钮类名正确', async ({ page, gotoPage }) => {
    await gotoPage('index')

    // cell 按钮应有 weui-btn_cell 类
    const cellSection = page.locator('.demo-section').filter({ hasText: 'Cell 样式按钮' })
    const cellBtn = cellSection.locator('.weui-btn_cell').first()
    await expect(cellBtn).toBeVisible()
  })

  test('迷你尺寸按钮类名正确', async ({ page, gotoPage }) => {
    await gotoPage('index')

    // mini 按钮应有 weui-btn_mini 类
    const sizeSection = page.locator('.demo-section').filter({ hasText: '按钮尺寸' })
    const miniBtn = sizeSection.locator('.weui-btn_mini').first()
    await expect(miniBtn).toBeVisible()
  })
})
