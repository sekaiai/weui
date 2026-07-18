import { test, expect, expectNoErrors } from './helpers'

test.describe('Checkbox 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('checkbox')
    await expect(page.locator('h1')).toContainText('Checkbox')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('checkbox')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(6)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击独立 checkbox 切换选中状态', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('checkbox')
    const firstDemo = page.locator('.demo-block').first()
    // 初始状态为 false
    await expect(firstDemo.locator('p')).toContainText('false')
    // 点击 checkbox label
    await firstDemo.locator('.weui-check__label').click()
    // 验证状态变为 true
    await expect(firstDemo.locator('p')).toContainText('true')
    // 再次点击切换回 false
    await firstDemo.locator('.weui-check__label').click()
    await expect(firstDemo.locator('p')).toContainText('false')
  })

  test('默认选中：初始状态为 true', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('checkbox')
    const defaultDemo = page.locator('.demo-block').nth(1)
    // 验证初始状态为 true
    await expect(defaultDemo.locator('p')).toContainText('true')
  })

  test('多选模式：渲染 3 个选项', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('checkbox')
    const groupDemo = page.locator('.demo-block').nth(2)
    // 验证有 3 个 checkbox 选项
    await expect(groupDemo.locator('.weui-check__label')).toHaveCount(3)
    // 验证初始选中值包含 "1"
    await expect(groupDemo.locator('p')).toContainText('1')
  })

  test('单选模式：渲染 2 个选项', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('checkbox')
    const radioDemo = page.locator('.demo-block').nth(3)
    // 验证有 2 个 checkbox 选项
    await expect(radioDemo.locator('.weui-check__label')).toHaveCount(2)
  })

  test('禁用状态：禁用选项有 disabled 类名', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('checkbox')
    const disabledDemo = page.locator('.demo-block').nth(5)
    // 验证有 2 个禁用选项（weui-cell_disabled 类）
    await expect(disabledDemo.locator('.weui-cell_disabled')).toHaveCount(2)
  })

  test('多选模式：点击 checkbox 改变选中值', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('checkbox')
    // 多选模式是第 3 个 demo-block（index 2）
    const groupDemo = page.locator('.demo-block').nth(2)
    // 初始选中值包含 "1"
    await expect(groupDemo.locator('p')).toContainText('"1"')
    // 点击「选项二」checkbox label 触发 toggle
    await groupDemo.locator('.weui-check__label').nth(1).click()
    // 验证选中值变为 ['1', '2']（包含 "2"）
    await expect(groupDemo.locator('p')).toContainText('"2"')
    // 再次点击「选项二」取消选中
    await groupDemo.locator('.weui-check__label').nth(1).click()
    // 验证选中值回到 ['1']（不再包含 "2"）
    await expect(groupDemo.locator('p')).not.toContainText('"2"')
  })

  test('单选模式：点击 radio 替换选中值', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('checkbox')
    // 单选模式是第 4 个 demo-block（index 3）
    const radioDemo = page.locator('.demo-block').nth(3)
    // 初始选中值包含 "1"
    await expect(radioDemo.locator('p')).toContainText('"1"')
    // 点击「选项二」radio label 触发 toggle
    await radioDemo.locator('.weui-check__label').nth(1).click()
    // 验证选中值替换为 ['2']（包含 "2"）
    await expect(radioDemo.locator('p')).toContainText('"2"')
    // 验证不再包含 "1"（单选模式下被替换）
    await expect(radioDemo.locator('p')).not.toContainText('"1"')
  })
})
