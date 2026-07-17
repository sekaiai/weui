import { test, expect, expectNoErrors } from './helpers'

test.describe('FormPage 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('form-page')
    await expect(page.locator('h1').first()).toContainText('FormPage')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form-page')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(4)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-form-page 与标题', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form-page')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-form-page')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-form__text-area')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-form__title')).toContainText('页面标题')
    await expect(firstDemo.locator('.weui-form__control-area')).toHaveCount(1)
    // 无 desc / footer
    await expect(firstDemo.locator('.weui-form__desc')).toHaveCount(0)
    await expect(firstDemo.locator('.weui-form__opr-area')).toHaveCount(0)
  })

  test('标题与描述：渲染 weui-form__desc', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form-page')
    const descDemo = page.locator('.demo-block').nth(1)
    await expect(descDemo.locator('.weui-form__title')).toContainText('页面标题')
    await expect(descDemo.locator('.weui-form__desc')).toHaveCount(1)
    await expect(descDemo.locator('.weui-form__desc')).toContainText('页面描述文字')
  })

  test('底部操作区域：footer 插槽渲染 weui-form__opr-area', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form-page')
    const footerDemo = page.locator('.demo-block').nth(2)
    await expect(footerDemo.locator('.weui-form__opr-area')).toHaveCount(1)
    await expect(footerDemo.locator('.weui-form__opr-area')).toContainText('确定')
  })

  test('自定义标题区域：title 插槽覆盖属性', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form-page')
    const slotDemo = page.locator('.demo-block').nth(3)
    await expect(slotDemo.locator('.weui-form__title')).toContainText('自定义标题')
    await expect(slotDemo.locator('.weui-form__desc')).toContainText('通过 title 插槽')
  })
})
