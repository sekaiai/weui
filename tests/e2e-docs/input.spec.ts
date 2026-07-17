import { test, expect, expectNoErrors } from './helpers'

test.describe('Input 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('input')
    await expect(page.locator('h1')).toContainText('Input')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('input')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(6)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：输入文本后值更新', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('input')
    const firstDemo = page.locator('.demo-block').first()
    const input = firstDemo.locator('input')
    await input.fill('hello weui')
    // 验证当前值显示
    await expect(firstDemo.locator('p')).toContainText('hello weui')
  })

  test('输入类型：渲染 4 个输入框', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('input')
    const typeDemo = page.locator('.demo-block').nth(1)
    // 验证有 4 个 input（number/idcard/digit/password）
    await expect(typeDemo.locator('input')).toHaveCount(4)
    // 验证密码输入框存在
    const pwdInput = typeDemo.locator('input[password]')
    await expect(pwdInput).toHaveCount(1)
  })

  test('清除按钮：点击清除后值清空', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('input')
    const clearDemo = page.locator('.demo-block').nth(2)
    const input = clearDemo.locator('input')
    await input.fill('有内容')
    await expect(clearDemo.locator('p')).toContainText('有内容')
    // 点击清除按钮
    await clearDemo.locator('.weui-icon-clear').click()
    // 验证值已清空
    await expect(clearDemo.locator('p')).toContainText('当前值：')
    await expect(input).toHaveValue('')
  })

  test('最大长度：超过 5 字符被截断', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('input')
    const maxDemo = page.locator('.demo-block').nth(3)
    const input = maxDemo.locator('input')
    // 尝试输入 10 个字符
    await input.fill('1234567890')
    // 验证只保留了 5 个
    await expect(input).toHaveValue('12345')
    await expect(maxDemo.locator('p')).toContainText('5/5')
  })

  test('禁用状态：输入框不可编辑', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('input')
    const disabledDemo = page.locator('.demo-block').nth(4)
    const input = disabledDemo.locator('input')
    // 验证 input 确实禁用
    await expect(input).toBeDisabled()
    // 验证有预设值
    await expect(input).toHaveValue('不可编辑的内容')
  })

  test('自动聚焦：输入框可获取焦点', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('input')
    const focusDemo = page.locator('.demo-block').nth(5)
    const input = focusDemo.locator('input')
    // 点击 input 使其聚焦（浏览器中 focus prop 由 uni-app 框架处理，此处验证原生聚焦行为）
    await input.click()
    await expect(input).toBeFocused()
  })
})
