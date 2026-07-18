import { test, expect, expectNoErrors } from './helpers'

test.describe('Searchbar 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('searchbar')
    await expect(page.locator('h1')).toContainText('Searchbar')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(4)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染搜索栏与初始占位文字', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    const firstDemo = page.locator('.demo-block').first()
    // 未聚焦时显示 label 占位
    await expect(firstDemo.locator('.weui-search-bar__label')).toBeVisible()
    await expect(firstDemo.locator('.weui-search-bar')).toHaveClass(/weui-search-bar/)
  })

  test('基础用法：点击搜索栏进入聚焦状态', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    const firstDemo = page.locator('.demo-block').first()
    // 点击 label 进入聚焦
    await firstDemo.locator('.weui-search-bar__label').click()
    // 聚焦后添加 focusing 类
    await expect(firstDemo.locator('.weui-search-bar')).toHaveClass(/weui-search-bar_focusing/)
    // 显示取消按钮
    await expect(firstDemo.locator('.weui-search-bar__cancel-btn')).toBeVisible()
  })

  test('基础用法：输入文字后显示清除按钮并更新当前值', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    const firstDemo = page.locator('.demo-block').first()
    // 点击进入聚焦
    await firstDemo.locator('.weui-search-bar__label').click()
    // 输入文字
    await firstDemo.locator('.weui-search-bar__input').fill('苹果')
    // 验证清除按钮出现
    await expect(firstDemo.locator('.weui-icon-clear')).toBeVisible()
    // 验证当前值更新
    await expect(firstDemo.locator('p')).toContainText('苹果')
  })

  test('基础用法：点击清除按钮清空输入', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    const firstDemo = page.locator('.demo-block').first()
    // 点击进入聚焦
    await firstDemo.locator('.weui-search-bar__label').click()
    // 输入文字
    await firstDemo.locator('.weui-search-bar__input').fill('测试')
    await expect(firstDemo.locator('p')).toContainText('测试')
    // 使用原生 click 触发 Vue 事件（Playwright click 在 view 自定义元素上不可靠）
    await firstDemo.locator('.weui-icon-clear').evaluate((el) => (el as HTMLElement).click())
    // 验证清空
    await expect(firstDemo.locator('p')).toContainText('当前值：')
    await expect(firstDemo.locator('p')).not.toContainText('测试')
  })

  test('自定义取消按钮：渲染自定义文字', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    // 自定义取消按钮是第 3 个 demo-block（index 2）
    const customDemo = page.locator('.demo-block').nth(2)
    await customDemo.locator('.weui-search-bar__label').click()
    await expect(customDemo.locator('.weui-search-bar__cancel-btn')).toContainText('返回')
  })

  test('搜索按钮：渲染搜索按钮替代取消按钮', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    // 搜索按钮是第 4 个 demo-block（index 3）
    const searchDemo = page.locator('.demo-block').nth(3)
    await searchDemo.locator('.weui-search-bar__label').click()
    // 验证搜索按钮存在
    await expect(searchDemo.locator('.weui-search-bar__btn')).toBeVisible()
    await expect(searchDemo.locator('.weui-search-bar__btn')).toContainText('搜索')
    // 验证没有取消按钮
    await expect(searchDemo.locator('.weui-search-bar__cancel-btn')).toHaveCount(0)
  })

  test('事件回调：聚焦输入框触发 focus 事件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    // 事件回调是第 2 个 demo-block（index 1）
    const eventDemo = page.locator('.demo-block').nth(1)
    // 初始无事件
    await expect(eventDemo.locator('p', { hasText: '点击搜索栏并输入文字以触发事件' })).toBeVisible()
    // 先点击 label 进入聚焦状态
    await eventDemo.locator('.weui-search-bar__label').click()
    // 直接点击 input 触发原生 focus 事件（label 点击在浏览器中不触发原生 focus）
    await eventDemo.locator('.weui-search-bar__input').click()
    // 验证 focus 事件被记录
    await expect(eventDemo.locator('p', { hasText: 'focus 事件' })).toBeVisible()
  })

  test('事件回调：点击取消按钮触发 cancel 事件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    const eventDemo = page.locator('.demo-block').nth(1)
    // 点击进入聚焦
    await eventDemo.locator('.weui-search-bar__label').click()
    await eventDemo.locator('.weui-search-bar__cancel-btn').click()
    // 验证 cancel 事件被记录
    await expect(eventDemo.locator('p', { hasText: 'cancel 事件' })).toBeVisible()
  })

  test('搜索按钮：点击搜索按钮后 input 获得焦点', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    // 搜索按钮是第 4 个 demo-block（index 3）
    const searchDemo = page.locator('.demo-block').nth(3)
    // 先输入值（searchbar 需要值才能稳定显示搜索按钮区）
    await searchDemo.locator('.weui-search-bar__label').click()
    await searchDemo.locator('.weui-search-bar__input').fill('keyword')
    // 点击搜索按钮
    await searchDemo.locator('.weui-search-bar__btn').click()
    // 验证 input 获得焦点（H5 端 handleSearch 调 inputRef.focus()）
    await expect(searchDemo.locator('.weui-search-bar__input')).toBeFocused()
    // 验证 focusing 类保留
    await expect(searchDemo.locator('.weui-search-bar')).toHaveClass(/weui-search-bar_focusing/)
  })

  test('有值时 blur 保持聚焦态', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    const firstDemo = page.locator('.demo-block').first()
    // 点击进入聚焦
    await firstDemo.locator('.weui-search-bar__label').click()
    // 输入文字
    await firstDemo.locator('.weui-search-bar__input').fill('有内容')
    // 触发 blur（点击搜索栏外部）
    await page.locator('h1').click()
    // 验证有值时保留 focusing 类（task 4 改造点）
    await expect(firstDemo.locator('.weui-search-bar')).toHaveClass(/weui-search-bar_focusing/)
  })
})
