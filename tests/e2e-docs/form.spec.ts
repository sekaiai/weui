import { test, expect, expectNoErrors } from './helpers'

test.describe('Form 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('form')
    await expect(page.locator('h1').first()).toContainText('Form')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(5)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('Demo 1 基础表单结构：渲染 title/desc/tips/opr/extra-area', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const demo = page.locator('.demo-block').nth(0)
    await expect(demo.locator('.weui-form__title')).toContainText('表单结构')
    await expect(demo.locator('.weui-form__desc')).toHaveCount(1)
    await expect(demo.locator('.weui-form__tips-area')).toHaveCount(1)
    await expect(demo.locator('.weui-form__opr-area')).toHaveCount(1)
    await expect(demo.locator('.weui-form__extra-area')).toHaveCount(1)
  })

  test('Demo 2 输入框状态：渲染 readonly 和 disabled cell', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const demo = page.locator('.demo-block').nth(1)
    await expect(demo.locator('.weui-cell_readonly')).toHaveCount(1)
    await expect(demo.locator('.weui-cell_disabled')).toHaveCount(1)
  })

  test('Demo 3 验证码表单：渲染 vcode cell 和 Agree 组件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const demo = page.locator('.demo-block').nth(2)
    await expect(demo.locator('.weui-cell_vcode')).toHaveCount(1)
    await expect(demo.locator('.weui-agree')).toHaveCount(1)
  })

  test('Demo 4 复选框表单：渲染 CheckboxGroup', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const demo = page.locator('.demo-block').nth(3)
    await expect(demo.locator('.weui-cells_checkbox')).toHaveCount(1)
  })

  test('Demo 5 底部悬浮表单：渲染 ext-class 和 Agree', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const demo = page.locator('.demo-block').nth(4)
    await expect(demo.locator('.weui-bottom-fixed-opr-page')).toHaveCount(1)
    await expect(demo.locator('.weui-agree')).toHaveCount(1)
  })
})
