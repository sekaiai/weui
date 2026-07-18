import { test, expect, expectNoErrors } from './helpers'

test.describe('Icon 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('icon')
    await expect(page.locator('h1')).toContainText('Icon')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('icon')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(5)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-icon-success/info/warn', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('icon')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-icon-success')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-icon-info')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-icon-warn')).toHaveCount(1)
  })

  test('图标类型：渲染 14 个图标项', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('icon')
    const gridDemo = page.locator('.demo-block').nth(1)
    const items = gridDemo.locator('.icon-grid__item')
    await expect(items).toHaveCount(14)
    // 每项都渲染了图标
    await expect(gridDemo.locator('[class^="weui-icon-"]')).toHaveCount(14)
  })

  test('图标类型：点击图标显示对应类型名', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('icon')
    const gridDemo = page.locator('.demo-block').nth(1)
    // 点击第一项内的图标元素，事件冒泡到父级 div 的 @click
    const firstIcon = gridDemo.locator('.icon-grid__item').first().locator('[class^="weui-icon-"]')
    await firstIcon.click()
    await expect(gridDemo.locator('p')).toContainText('已点击：success')
  })

  test('自定义尺寸：font-size 生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('icon')
    const sizeDemo = page.locator('.demo-block').nth(2)
    const icons = sizeDemo.locator('.weui-icon-success')
    await expect(icons).toHaveCount(4)
    await expect(icons.nth(0)).toHaveCSS('font-size', '16px')
    await expect(icons.nth(1)).toHaveCSS('font-size', '24px')
    await expect(icons.nth(2)).toHaveCSS('font-size', '32px')
    await expect(icons.nth(3)).toHaveCSS('font-size', '48px')
  })

  test('自定义颜色：color 生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('icon')
    const colorDemo = page.locator('.demo-block').nth(3)
    const icons = colorDemo.locator('[class^="weui-icon-"]')
    await expect(icons).toHaveCount(4)
    await expect(icons.nth(0)).toHaveCSS('color', 'rgb(7, 193, 96)')
    await expect(icons.nth(1)).toHaveCSS('color', 'rgb(250, 157, 59)')
    await expect(icons.nth(2)).toHaveCSS('color', 'rgb(16, 174, 255)')
    await expect(icons.nth(3)).toHaveCSS('color', 'rgb(250, 81, 81)')
  })

  test('扩展类名：weui-icon_msg 追加成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('icon')
    const extDemo = page.locator('.demo-block').nth(4)
    const msgIcons = extDemo.locator('.weui-icon_msg')
    await expect(msgIcons).toHaveCount(3)
    // weui-icon_msg 宽高为 6.4em，size 未传时 font-size:10px → 64px
    await expect(msgIcons.nth(0)).toHaveCSS('width', '64px')
    await expect(msgIcons.nth(0)).toHaveCSS('height', '64px')
  })
})
