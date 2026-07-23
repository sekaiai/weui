import { test, expect, expectNoErrors } from './helpers'

test.describe('Cell 文档', () => {
  test('页面正常加载且无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('cell')
    await expect(page.locator('h1').first()).toContainText('Cell')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('副标题、access 与内置 swipe 结构可用', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const accessCell = page.locator('.weui-cell_access').first()
    await expect(accessCell.locator('.weui-cell__desc')).toContainText('副标题')
    const swipe = page.locator('.weui-cell_swiped').first()
    await expect(swipe.locator('.weui-swiped-btn')).toHaveCount(1)
  })
})
