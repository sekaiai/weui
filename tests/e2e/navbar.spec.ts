import { test, expect, expectNoErrors } from './helpers'

/**
 * Navbar 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（点击切换 active）+ WeUI 类名 + 扩展类名
 *
 * active 类名统一为 weui-bar__item_on（不是 weui-navbar__item_active）
 * 示例页面用 .section 分组，内有 .section__title 和 .section__panel
 */
test.describe('Navbar 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('navbar')
    await expect(page.locator('.page__title')).toContainText('Navbar')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 weui-navbar 和 3 个 item', async ({ page, gotoPage }) => {
    await gotoPage('navbar')

    const section = page.locator('.section').filter({ hasText: '基础用法' })
    const navbar = section.locator('.weui-navbar')
    await expect(navbar).toBeVisible()

    const items = navbar.locator('.weui-navbar__item')
    await expect(items).toHaveCount(3)

    // 验证 item 文本
    await expect(items.first()).toContainText('选项一')
    await expect(items.nth(1)).toContainText('选项二')
    await expect(items.nth(2)).toContainText('选项三')
  })

  test('基础用法初始第一项 active', async ({ page, gotoPage }) => {
    await gotoPage('navbar')

    const section = page.locator('.section').filter({ hasText: '基础用法' })
    const items = section.locator('.weui-navbar__item')

    // 第一项应有 weui-bar__item_on 类
    await expect(items.first()).toHaveClass(/weui-bar__item_on/)
    await expect(items.nth(1)).not.toHaveClass(/weui-bar__item_on/)
    await expect(items.nth(2)).not.toHaveClass(/weui-bar__item_on/)

    // 面板显示 "当前选中：选项1"
    await expect(section.locator('.section__panel')).toContainText('当前选中：选项1')
  })

  test('点击 item 切换 active 状态', async ({ page, gotoPage }) => {
    await gotoPage('navbar')

    const section = page.locator('.section').filter({ hasText: '基础用法' })
    const items = section.locator('.weui-navbar__item')

    // 点击第二项
    await items.nth(1).click()

    // 第二项 active，第一项不再 active
    await expect(items.nth(1)).toHaveClass(/weui-bar__item_on/)
    await expect(items.first()).not.toHaveClass(/weui-bar__item_on/)

    // 面板更新
    await expect(section.locator('.section__panel')).toContainText('当前选中：选项2')

    // 点击第三项
    await items.nth(2).click()
    await expect(items.nth(2)).toHaveClass(/weui-bar__item_on/)
    await expect(section.locator('.section__panel')).toContainText('当前选中：选项3')
  })

  test('默认选中第二项 section 第二个 item active', async ({ page, gotoPage }) => {
    await gotoPage('navbar')

    const section = page.locator('.section').filter({ hasText: '默认选中第二项' })
    const items = section.locator('.weui-navbar__item')

    // 第二项 active，第一项不 active
    await expect(items.nth(1)).toHaveClass(/weui-bar__item_on/)
    await expect(items.first()).not.toHaveClass(/weui-bar__item_on/)
  })

  test('两个选项 section 渲染 2 个 item', async ({ page, gotoPage }) => {
    await gotoPage('navbar')

    const section = page.locator('.section').filter({ hasText: '两个选项' })
    const items = section.locator('.weui-navbar__item')
    await expect(items).toHaveCount(2)

    // 初始第一项 active，显示推荐内容
    await expect(items.first()).toHaveClass(/weui-bar__item_on/)
    await expect(section.locator('.section__panel')).toContainText('推荐内容')

    // 点击第二项切换
    await items.nth(1).click()
    await expect(items.nth(1)).toHaveClass(/weui-bar__item_on/)
    await expect(section.locator('.section__panel')).toContainText('热门内容')
  })

  test('扩展类名 section 渲染自定义类名', async ({ page, gotoPage }) => {
    await gotoPage('navbar')

    const section = page.locator('.section').filter({ hasText: '扩展类名' })
    const navbar = section.locator('.weui-navbar')
    await expect(navbar).toHaveClass(/my-navbar/)

    // 2 个 item 都有 my-item 类
    const items = navbar.locator('.my-item')
    await expect(items).toHaveCount(2)
  })

  test('点击事件 section 点击增加计数', async ({ page, gotoPage }) => {
    await gotoPage('navbar')

    const section = page.locator('.section').filter({ hasText: '点击事件' })
    const items = section.locator('.weui-navbar__item')
    const panel = section.locator('.section__panel')

    // 初始计数 0
    await expect(panel).toContainText('点击次数：0')

    // 点击第二项
    await items.nth(1).click()
    await expect(panel).toContainText('点击次数：1')

    // 点击第三项
    await items.nth(2).click()
    await expect(panel).toContainText('点击次数：2')
  })
})
