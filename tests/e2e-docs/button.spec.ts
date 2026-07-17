import { test, expect, expectNoErrors } from './helpers'

test.describe('Button 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('button')
    await expect(page.locator('h1')).toContainText('Button')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(9)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击 primary 按钮显示结果', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    // 验证结果显示
    await expect(firstDemo.locator('p')).toContainText('点击了按钮')
  })

  test('不同类型按钮均可点击', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const firstDemo = page.locator('.demo-block').first()
    const buttons = firstDemo.locator('.weui-btn')
    // 点击第二个按钮（default）
    await buttons.nth(1).click()
    await expect(firstDemo.locator('p')).toContainText('点击了按钮')
  })

  test('禁用按钮不触发 click', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    // 禁用状态是第 4 个 demo-block
    const disabledDemo = page.locator('.demo-block').nth(3)
    const disabledBtn = disabledDemo.locator('.weui-btn').first()
    // 确认按钮确实禁用
    await expect(disabledBtn).toBeDisabled()
    // 尝试点击（Playwright 对 disabled button 会跳过实际点击）
    await disabledBtn.click({ force: true }).catch(() => {})
    // 验证第一个 demo-block 中没有出现结果（clickResult 未变化）
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('p')).toHaveCount(0)
  })

  test('加载状态按钮渲染 loading 图标', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const loadingDemo = page.locator('.demo-block').nth(4)
    // 验证 loading 图标存在
    await expect(loadingDemo.locator('.weui-primary-loading')).toHaveCount(2)
  })

  test('Cell 样式按钮渲染正确类名', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const cellDemo = page.locator('.demo-block').nth(6)
    await expect(cellDemo.locator('.weui-btn_cell')).toHaveCount(3)
    await expect(cellDemo.locator('.weui-btn_cell-primary')).toHaveCount(1)
    await expect(cellDemo.locator('.weui-btn_cell-warn')).toHaveCount(1)
  })

  test('验证码按钮渲染正确类名', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const vcodeDemo = page.locator('.demo-block').nth(7)
    await expect(vcodeDemo.locator('.weui-vcode-btn')).toHaveCount(1)
  })
})
