import { test, expect, expectNoErrors } from './helpers'

/**
 * Tabbar 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（点击切换 active）+ WeUI 类名 + 徽标渲染
 *
 * active 类名统一为 weui-bar__item_on（不是 weui-tabbar__item_active）
 * 徽标：.weui-badge（带文字）或 .weui-badge.weui-badge_dot（红点）
 * 示例页面用 .section 分组，页面末尾有 1 个 fixed tabbar
 */
test.describe('Tabbar 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('tabbar')
    await expect(page.locator('.page__title')).toContainText('Tabbar')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 weui-tabbar 和 4 个 item，初始第一项 active', async ({ page, gotoPage }) => {
    await gotoPage('tabbar')

    const section = page.locator('.section').filter({ hasText: '基础用法' })
    const tabbar = section.locator('.weui-tabbar')
    await expect(tabbar).toBeVisible()

    const items = tabbar.locator('.weui-tabbar__item')
    await expect(items).toHaveCount(4)

    // 每个 item 有 icon-wrap 和 label
    await expect(items.first().locator('.weui-tabbar__icon-wrap')).toBeVisible()
    await expect(items.first().locator('.weui-tabbar__label')).toContainText('微信')

    // 初始第一项 active
    await expect(items.first()).toHaveClass(/weui-bar__item_on/)
    await expect(items.nth(1)).not.toHaveClass(/weui-bar__item_on/)

    // 面板显示当前选中
    await expect(section.locator('.section__panel')).toContainText('当前选中：微信')
  })

  test('点击 item 切换 active 状态', async ({ page, gotoPage }) => {
    await gotoPage('tabbar')

    const section = page.locator('.section').filter({ hasText: '基础用法' })
    const items = section.locator('.weui-tabbar__item')

    // 点击第二项
    await items.nth(1).click()
    await expect(items.nth(1)).toHaveClass(/weui-bar__item_on/)
    await expect(items.first()).not.toHaveClass(/weui-bar__item_on/)
    await expect(section.locator('.section__panel')).toContainText('当前选中：通讯录')

    // 点击第四项
    await items.nth(3).click()
    await expect(items.nth(3)).toHaveClass(/weui-bar__item_on/)
    await expect(section.locator('.section__panel')).toContainText('当前选中：我')
  })

  test('带徽标 section 渲染 badge 和 dot', async ({ page, gotoPage }) => {
    await gotoPage('tabbar')

    const section = page.locator('.section').filter({ hasText: '带徽标' })
    const items = section.locator('.weui-tabbar__item')

    // 第一个 item badge="8"
    await expect(items.nth(0).locator('.weui-badge')).toContainText('8')
    // 第二个 item badge=99
    await expect(items.nth(1).locator('.weui-badge')).toContainText('99')
    // 第三个 item show-dot，应有 dot badge（无文字）
    const dotBadge = items.nth(2).locator('.weui-badge.weui-badge_dot')
    await expect(dotBadge).toBeVisible()
    // 第四个 item 无徽标
    await expect(items.nth(3).locator('.weui-badge')).toHaveCount(0)
  })

  test('纯文字 section 无 icon-wrap', async ({ page, gotoPage }) => {
    await gotoPage('tabbar')

    const section = page.locator('.section').filter({ hasText: '纯文字' })
    const items = section.locator('.weui-tabbar__item')
    await expect(items).toHaveCount(4)

    // 无 icon-wrap
    await expect(items.first().locator('.weui-tabbar__icon-wrap')).toHaveCount(0)
    // 有 label
    await expect(items.first().locator('.weui-tabbar__label')).toContainText('首页')
    await expect(items.nth(3).locator('.weui-tabbar__label')).toContainText('我的')
  })

  test('扩展类名 section 渲染自定义类名', async ({ page, gotoPage }) => {
    await gotoPage('tabbar')

    const section = page.locator('.section').filter({ hasText: '扩展类名' })
    const tabbar = section.locator('.weui-tabbar')
    await expect(tabbar).toHaveClass(/my-tabbar/)

    // 2 个 item 都有 my-item 类
    const items = tabbar.locator('.my-item')
    await expect(items).toHaveCount(2)
  })

  test('点击事件 section 点击增加计数', async ({ page, gotoPage }) => {
    await gotoPage('tabbar')

    const section = page.locator('.section').filter({ hasText: '点击事件' })
    const items = section.locator('.weui-tabbar__item')
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

  test('页面末尾有 fixed tabbar，第三个 item 有 badge', async ({ page, gotoPage }) => {
    await gotoPage('tabbar')

    // 固定 tabbar 有 page-fixed-tabbar 类
    const fixedTabbar = page.locator('.weui-tabbar.page-fixed-tabbar')
    await expect(fixedTabbar).toBeVisible()

    // 4 个 item
    const items = fixedTabbar.locator('.weui-tabbar__item')
    await expect(items).toHaveCount(4)

    // 第三个 item 有 badge="3"
    await expect(items.nth(2).locator('.weui-badge')).toContainText('3')

    // 初始第一项 active
    await expect(items.first()).toHaveClass(/weui-bar__item_on/)

    // 点击第三项切换
    await items.nth(2).click()
    await expect(items.nth(2)).toHaveClass(/weui-bar__item_on/)
    await expect(items.first()).not.toHaveClass(/weui-bar__item_on/)
  })
})
