import { test, expect, expectNoErrors } from './helpers'

test.describe('Agree 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('agree')
    await expect(page.locator('h1').first()).toContainText('Agree')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('demo 中渲染 weui-agree', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('agree')
    const demo = page.locator('.demo-block').first()
    await expect(demo.locator('.weui-agree')).toHaveCount(1)
    await expect(demo.locator('.weui-agree__checkbox')).toHaveCount(1)
    await expect(demo.locator('.weui-agree__text')).toContainText('相关条款')
  })

  test('点击 checkbox 切换选中状态', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('agree')
    const checkbox = page.locator('.demo-block').first().locator('.weui-agree__checkbox')
    // WeUI 的 checkbox 在视觉上被隐藏（opacity:0），需要使用 force 绕过可见性检查
    await expect(checkbox).not.toBeChecked()
    await checkbox.check({ force: true })
    await expect(checkbox).toBeChecked()
  })
})
