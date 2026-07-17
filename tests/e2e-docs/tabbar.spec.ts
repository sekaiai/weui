import { test, expect, expectNoErrors } from './helpers'

test.describe('Tabbar 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('tabbar')
    await expect(page.locator('h1')).toContainText('Tabbar')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('tabbar')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-tabbar 与 4 个 item', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('tabbar')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-tabbar')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-tabbar__item')).toHaveCount(4)
    // 验证图标与文字渲染
    await expect(firstDemo.locator('.weui-tabbar__icon-wrap')).toHaveCount(4)
    await expect(firstDemo.locator('.weui-tabbar__label')).toHaveCount(4)
  })

  test('基础用法：点击第 3 个 tab 切换 active', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('tabbar')
    const firstDemo = page.locator('.demo-block').first()
    const items = firstDemo.locator('.weui-tabbar__item')
    // 初始第 1 个选中
    await expect(items.nth(0)).toHaveClass(/weui-bar__item_on/)
    // 点击第 3 个（view 自定义元素，用 evaluate 触发原生 click）
    await items.nth(2).evaluate((el) => el.click())
    // 验证选中态切换
    await expect(items.nth(0)).not.toHaveClass(/weui-bar__item_on/)
    await expect(items.nth(2)).toHaveClass(/weui-bar__item_on/)
    // 验证提示文字更新
    await expect(firstDemo.locator('p')).toContainText('发现')
  })

  test('纯文字标签：无图标且可切换', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('tabbar')
    const textDemo = page.locator('.demo-block').nth(1)
    const items = textDemo.locator('.weui-tabbar__item')
    await expect(items).toHaveCount(3)
    // 无图标
    await expect(textDemo.locator('.weui-tabbar__icon-wrap')).toHaveCount(0)
    // 仍有文字标签
    await expect(textDemo.locator('.weui-tabbar__label')).toHaveCount(3)
    // 点击第 2 个
    await items.nth(1).evaluate((el) => el.click())
    await expect(items.nth(1)).toHaveClass(/weui-bar__item_on/)
    await expect(textDemo.locator('p')).toContainText('分类')
  })

  test('徽标提示：渲染 weui-badge', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('tabbar')
    const badgeDemo = page.locator('.demo-block').nth(2)
    // 第 1 个 item badge="8"，第 2 个 :badge="99"
    const badges = badgeDemo.locator('.weui-badge')
    await expect(badges).toHaveCount(2)
    await expect(badges.nth(0)).toContainText('8')
    await expect(badges.nth(1)).toContainText('99')
  })

  test('红点提示：渲染 weui-badge_dot', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('tabbar')
    const dotDemo = page.locator('.demo-block').nth(3)
    // 第 1 个 badge="8"（普通徽标），第 3 个 show-dot（红点）
    await expect(dotDemo.locator('.weui-badge_dot')).toHaveCount(1)
  })

  test('选中态 demo：默认第 2 个 item 选中', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('tabbar')
    const stateDemo = page.locator('.demo-block').nth(4)
    const items = stateDemo.locator('.weui-tabbar__item')
    await expect(items.nth(1)).toHaveClass(/weui-bar__item_on/)
    await expect(items.nth(0)).not.toHaveClass(/weui-bar__item_on/)
  })

  test('固定在底部：tabbar 使用 fixed', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('tabbar')
    const fixedDemo = page.locator('.demo-block').nth(6)
    const tabbar = fixedDemo.locator('.weui-tabbar')
    // fixed 时根元素 position 为 fixed
    await expect(tabbar).toHaveCSS('position', 'fixed')
  })
})
