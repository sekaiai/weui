import { test, expect, expectNoErrors } from './helpers'

test.describe('Panel 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('panel')
    await expect(page.locator('h1').first()).toContainText('Panel')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(5)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-panel__hd 与 weui-panel__bd', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const firstDemo = page.locator('.demo-block').first()
    const panel = firstDemo.locator('.weui-panel')
    await expect(panel).toHaveCount(1)
    await expect(panel).not.toHaveClass(/weui-panel_access/)
    await expect(firstDemo.locator('.weui-panel__hd')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-panel__hd')).toContainText('标题')
    await expect(firstDemo.locator('.weui-panel__bd')).toHaveCount(1)
    // 无 footer 插槽时不渲染底部
    await expect(firstDemo.locator('.weui-panel__ft')).toHaveCount(0)
  })

  test('无标题面板：不渲染 weui-panel__hd', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const noTitleDemo = page.locator('.demo-block').nth(1)
    await expect(noTitleDemo.locator('.weui-panel__hd')).toHaveCount(0)
    await expect(noTitleDemo.locator('.weui-panel__bd')).toHaveCount(1)
  })

  test('Access 模式：追加 weui-panel_access 类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const accessDemo = page.locator('.demo-block').nth(2)
    const panel = accessDemo.locator('.weui-panel')
    await expect(panel).toHaveClass(/weui-panel_access/)
    await expect(panel).toContainText('图文组合列表')
  })

  test('自定义头部：header 插槽覆盖 title', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const headerDemo = page.locator('.demo-block').nth(3)
    await expect(headerDemo.locator('.weui-panel__hd')).toHaveCount(1)
    await expect(headerDemo.locator('.weui-panel__hd')).toContainText('自定义头部')
  })

  test('底部内容：footer 插槽渲染 weui-panel__ft', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    const footerDemo = page.locator('.demo-block').nth(4)
    await expect(footerDemo.locator('.weui-panel__ft')).toHaveCount(1)
    await expect(footerDemo.locator('.weui-panel__ft')).toContainText('查看更多')
  })
})
