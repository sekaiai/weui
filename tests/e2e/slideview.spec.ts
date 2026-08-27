import { test, expect, expectNoErrors } from './helpers'

/**
 * Slideview 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 交互行为（展开/收起/按钮点击/禁用）
 */
test.describe('Slideview 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('slideview')
    await expect(page.locator('.page__title')).toContainText('Slideview')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('渲染基础类名结构', async ({ page, gotoPage }) => {
    await gotoPage('slideview')

    // 基础用法 section 的 slideview 应包含左侧内容、官方 Cell footer 与按钮
    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const slideview = section.locator('.weui-slideview').first()
    await expect(slideview).toBeVisible()
    await expect(slideview.locator('.weui-slideview__left')).toBeVisible()
    await expect(slideview.locator('.weui-cell__ft')).toBeVisible()

    // 基础用法有 2 个按钮（收藏、编辑）
    const buttons = slideview.locator('.weui-slideview__btn')
    await expect(buttons).toHaveCount(2)
    await expect(buttons.first()).toContainText('收藏')
    await expect(buttons.nth(1)).toContainText('编辑')
  })

  test('警告按钮 section 渲染 weui-slideview__btn_warn 类', async ({ page, gotoPage }) => {
    await gotoPage('slideview')

    const section = page.locator('.demo-section').filter({ hasText: '警告按钮' })
    const slideview = section.locator('.weui-slideview').first()

    // 删除按钮为 warn 类型
    const warnBtn = slideview.locator('.weui-slideview__btn_warn')
    await expect(warnBtn).toHaveCount(1)
    await expect(warnBtn.first()).toContainText('删除')

    // 另一个按钮（收藏）不是 warn
    const normalBtn = slideview.locator('.weui-slideview__btn:not(.weui-slideview__btn_warn)')
    await expect(normalBtn).toHaveCount(1)
    await expect(normalBtn.first()).toContainText('收藏')
  })

  test('自定义类名 section 含 my-slideview 扩展类', async ({ page, gotoPage }) => {
    await gotoPage('slideview')

    const section = page.locator('.demo-section').filter({ hasText: '自定义类名' })
    const slideview = section.locator('.weui-slideview').first()
    await expect(slideview).toHaveClass(/my-slideview/)
  })

  test('默认展开 section 初始含 weui-slideview_show 类', async ({ page, gotoPage }) => {
    await gotoPage('slideview')

    const section = page.locator('.demo-section').filter({ hasText: '默认展开' })
    const slideview = section.locator('.weui-slideview').first()
    await expect(slideview).toHaveClass(/weui-slideview_show/)
  })

  test('点击默认展开左侧内容区收起', async ({ page, gotoPage }) => {
    await gotoPage('slideview')

    const section = page.locator('.demo-section').filter({ hasText: '默认展开' })
    const slideview = section.locator('.weui-slideview').first()
    await expect(slideview).toHaveClass(/weui-slideview_show/)

    // 点击左侧内容区（展开时 left 被 translateX(-100%) 移出且父级 overflow:hidden，
    // Playwright 的 click 无法命中，用 evaluate 直接触发 DOM click 事件）
    const left = slideview.locator('.weui-slideview__left').first()
    await left.evaluate((el) => el.click())

    // 应收起，移除 weui-slideview_show 类
    await expect(slideview).not.toHaveClass(/weui-slideview_show/)
  })

  test('禁用滑动 section 点击左侧内容区不展开', async ({ page, gotoPage }) => {
    await gotoPage('slideview')

    const section = page.locator('.demo-section').filter({ hasText: '禁用滑动' })
    const slideview = section.locator('.weui-slideview').first()

    // 初始不展开
    await expect(slideview).not.toHaveClass(/weui-slideview_show/)

    // 点击左侧内容区
    const left = slideview.locator('.weui-slideview__left').first()
    await left.click()

    // 仍不展开（disabled 阻止交互）
    await expect(slideview).not.toHaveClass(/weui-slideview_show/)
  })

  test('点击按钮触发收起', async ({ page, gotoPage }) => {
    await gotoPage('slideview')

    const section = page.locator('.demo-section').filter({ hasText: '默认展开' })
    const slideview = section.locator('.weui-slideview').first()
    await expect(slideview).toHaveClass(/weui-slideview_show/)

    // 点击第一个按钮（收藏），应触发 buttonclick 并 close
    const btn = slideview.locator('.weui-slideview__btn').first()
    await btn.click()

    // 应收起
    await expect(slideview).not.toHaveClass(/weui-slideview_show/)
  })
})
