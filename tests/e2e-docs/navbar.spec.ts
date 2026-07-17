import { test, expect, expectNoErrors } from './helpers'

test.describe('Navbar 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('navbar')
    await expect(page.locator('h1')).toContainText('Navbar')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('navbar')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(4)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-navbar 与 3 个 navbar-item', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('navbar')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-navbar')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-navbar__item')).toHaveCount(3)
  })

  test('基础用法：点击第 2 个 tab 切换 active', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('navbar')
    const firstDemo = page.locator('.demo-block').first()
    const items = firstDemo.locator('.weui-navbar__item')
    // 初始第 1 个选中
    await expect(items.nth(0)).toHaveClass(/weui-bar__item_on/)
    // 点击第 2 个（view 自定义元素，用 evaluate 触发原生 click）
    await items.nth(1).evaluate((el) => el.click())
    // 验证选中态切换
    await expect(items.nth(0)).not.toHaveClass(/weui-bar__item_on/)
    await expect(items.nth(1)).toHaveClass(/weui-bar__item_on/)
    // 验证提示文字更新
    await expect(firstDemo.locator('p')).toContainText('选项 2')
  })

  test('选中态 demo：默认第 2 个 item 选中', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('navbar')
    const stateDemo = page.locator('.demo-block').nth(1)
    const items = stateDemo.locator('.weui-navbar__item')
    await expect(items).toHaveCount(3)
    await expect(items.nth(1)).toHaveClass(/weui-bar__item_on/)
    await expect(items.nth(0)).not.toHaveClass(/weui-bar__item_on/)
  })

  test('多选项卡：渲染 5 个 item 且可切换', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('navbar')
    const manyDemo = page.locator('.demo-block').nth(2)
    const items = manyDemo.locator('.weui-navbar__item')
    await expect(items).toHaveCount(5)
    // 初始第 1 个选中
    await expect(items.nth(0)).toHaveClass(/weui-bar__item_on/)
    // 点击第 5 个
    await items.nth(4).evaluate((el) => el.click())
    await expect(items.nth(4)).toHaveClass(/weui-bar__item_on/)
    await expect(manyDemo.locator('p')).toContainText('第 5 个')
  })

  test('扩展类名：容器与 item 追加自定义类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('navbar')
    const extDemo = page.locator('.demo-block').nth(3)
    await expect(extDemo.locator('.my-navbar')).toHaveCount(1)
    await expect(extDemo.locator('.my-item')).toHaveCount(2)
  })
})
