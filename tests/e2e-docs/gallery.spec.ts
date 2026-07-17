import { test, expect, expectNoErrors } from './helpers'

test.describe('Gallery 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('gallery')
    await expect(page.locator('h1')).toContainText('Gallery')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('gallery')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(5)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击按钮显示 gallery', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('gallery')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    await expect(page.locator('.weui-gallery')).toBeVisible({ timeout: 5_000 })
  })

  test('点击遮罩区域关闭 gallery', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('gallery')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })
    // 点击 gallery 顶部边缘（避开图片和操作区）
    await gallery.click({ position: { x: 10, y: 10 } })
    await expect(gallery).not.toBeVisible({ timeout: 2_000 })
  })

  test('显示删除按钮：点击删除触发事件并手动关闭', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('gallery')
    // 第 1 个 demo-block（索引 1）为"显示删除按钮"
    const deleteDemo = page.locator('.demo-block').nth(1)
    await deleteDemo.locator('.weui-btn').first().click()
    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })
    // 点击删除按钮
    await gallery.locator('.weui-gallery__del').click()
    // 删除事件回调内手动关闭
    await expect(gallery).not.toBeVisible({ timeout: 2_000 })
    await expect(deleteDemo.locator('p')).toContainText('点击了删除按钮')
  })

  test('禁用遮罩点击：点击遮罩不关闭', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('gallery')
    // 第 3 个 demo-block（索引 3）为"禁用遮罩点击"
    const maskDemo = page.locator('.demo-block').nth(3)
    await maskDemo.locator('.weui-btn').first().click()
    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })
    await gallery.click({ position: { x: 10, y: 10 } })
    await expect(gallery).toBeVisible({ timeout: 2_000 })
    // 点击删除按钮关闭
    await gallery.locator('.weui-gallery__del').click()
    await expect(gallery).not.toBeVisible({ timeout: 2_000 })
  })

  test('命令式调用：点击遮罩 resolve hide', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('gallery')
    // 最后一个 demo-block 为"命令式调用"
    const imperativeDemo = page.locator('.demo-block').last()
    await imperativeDemo.locator('.weui-btn').first().click()
    const gallery = page.locator('.weui-gallery')
    await expect(gallery).toBeVisible({ timeout: 5_000 })
    // 点击遮罩 resolve 'hide' 并自动关闭
    await gallery.click({ position: { x: 10, y: 10 } })
    await expect(gallery).not.toBeVisible({ timeout: 2_000 })
    await expect(imperativeDemo.locator('p')).toContainText('命令式返回：hide')
  })
})
