import { test, expect, expectNoErrors } from './helpers'

test.describe('Form 文档', () => {
  test('页面正常加载且无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('form')
    await expect(page.locator('h1').first()).toContainText('Form')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('验证码、底部悬浮和 radio 案例可交互', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const vcode = page.locator('.weui-cell_vcode')
    await expect(vcode.locator('input')).toHaveCount(1)
    await expect(vcode.locator('.weui-vcode-btn')).toHaveCount(1)
    await expect(page.locator('.weui-bottom-fixed-opr-page')).toHaveCount(1)
    const radios = page.locator('.weui-cells_radio input[type="radio"]')
    await page.locator('.weui-cells_radio .weui-check__label').nth(1).click()
    await expect(radios.nth(0)).not.toBeChecked()
    await expect(radios.nth(1)).toBeChecked()
  })
})
