import { test, expect, expectNoErrors } from './helpers'

test.describe('Preview 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('preview')
    await expect(page.locator('h1').first()).toContainText('Preview')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('preview')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(3)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染头部、键值对与按钮', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('preview')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-form-preview')).toHaveCount(1)
    // 头部标题
    await expect(firstDemo.locator('.weui-form-preview__hd')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-form-preview__hd')).toContainText('合计：¥99.00')
    // 3 个键值对项
    const items = firstDemo.locator('.weui-form-preview__item')
    await expect(items).toHaveCount(3)
    await expect(items.nth(0).locator('.weui-form-preview__label')).toContainText('商品')
    await expect(items.nth(0).locator('.weui-form-preview__value')).toContainText('WeUI 设计指南')
    // 2 个按钮
    const btns = firstDemo.locator('.weui-form-preview__btn')
    await expect(btns).toHaveCount(2)
    await expect(btns.nth(0)).toContainText('取消')
    await expect(btns.nth(1)).toContainText('确定')
  })

  test('仅展示信息：无底部按钮区', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('preview')
    const infoDemo = page.locator('.demo-block').nth(1)
    await expect(infoDemo.locator('.weui-form-preview__hd')).toHaveCount(1)
    await expect(infoDemo.locator('.weui-form-preview__item')).toHaveCount(3)
    await expect(infoDemo.locator('.weui-form-preview__ft')).toHaveCount(0)
  })

  test('按钮类型：primary 与 default 类名', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('preview')
    const typeDemo = page.locator('.demo-block').nth(2)
    const btns = typeDemo.locator('.weui-form-preview__btn')
    await expect(btns).toHaveCount(2)
    await expect(btns.nth(0)).toHaveClass(/weui-form-preview__btn_default/)
    await expect(btns.nth(1)).toHaveClass(/weui-form-preview__btn_primary/)
  })

  test('点击按钮触发 buttontap 事件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('preview')
    const firstDemo = page.locator('.demo-block').first()
    const btns = firstDemo.locator('.weui-form-preview__btn')
    // 点击「确定」按钮（view 自定义元素，用 evaluate 触发原生 click）
    await btns.nth(1).evaluate((el) => el.click())
    // 验证提示文字更新
    await expect(firstDemo.locator('p')).toContainText('确定')
    await expect(firstDemo.locator('p')).toContainText('index=1')
  })
})
