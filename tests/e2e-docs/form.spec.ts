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

  test('基础用法：渲染 weui-form__title 与 weui-form__control-area', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-form')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-form__text-area')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-form__title')).toContainText('表单标题')
    await expect(firstDemo.locator('.weui-form__control-area')).toHaveCount(1)
    // 无 desc / tips / footer
    await expect(firstDemo.locator('.weui-form__desc')).toHaveCount(0)
    await expect(firstDemo.locator('.weui-form__tips-area')).toHaveCount(0)
    await expect(firstDemo.locator('.weui-form__opr-area')).toHaveCount(0)
  })

  test('标题与描述：渲染 weui-form__desc', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const descDemo = page.locator('.demo-block').nth(1)
    await expect(descDemo.locator('.weui-form__title')).toContainText('表单标题')
    await expect(descDemo.locator('.weui-form__desc')).toHaveCount(1)
    await expect(descDemo.locator('.weui-form__desc')).toContainText('表单描述文字')
  })

  test('提示文字：渲染 weui-form__tips-area', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const tipsDemo = page.locator('.demo-block').nth(2)
    await expect(tipsDemo.locator('.weui-form__tips-area')).toHaveCount(1)
    await expect(tipsDemo.locator('.weui-form__tips-area')).toContainText('底部提示文字')
  })

  test('操作按钮区域：footer 插槽渲染 weui-form__opr-area', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const footerDemo = page.locator('.demo-block').nth(3)
    await expect(footerDemo.locator('.weui-form__opr-area')).toHaveCount(1)
    await expect(footerDemo.locator('.weui-form__opr-area')).toContainText('确定')
  })

  test('自定义标题区域：title 插槽覆盖属性', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    const slotDemo = page.locator('.demo-block').nth(4)
    await expect(slotDemo.locator('.weui-form__title')).toContainText('自定义标题')
    await expect(slotDemo.locator('.weui-form__desc')).toContainText('通过 title 插槽')
  })
})
