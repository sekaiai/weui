import { test, expect, expectNoErrors } from './helpers'

/**
 * FormPage 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名（根 weui-form-page，内部复用 weui-form__）+ title/desc/footer/title slot + 扩展类名
 */
test.describe('FormPage 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('form-page')
    await expect(page.locator('.page__title')).toContainText('FormPage')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('渲染基础类名结构（根 weui-form-page，内部复用 weui-form__）', async ({ page, gotoPage }) => {
    await gotoPage('form-page')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const formPage = section.locator('.weui-form-page').first()
    await expect(formPage).toBeVisible()

    // 内部复用 weui-form__ 类名
    await expect(formPage.locator('.weui-form__text-area')).toBeVisible()
    await expect(formPage.locator('.weui-form__control-area')).toBeVisible()
    // form-page 无 tips-area
    await expect(formPage.locator('.weui-form__tips-area')).toHaveCount(0)
    // 基础用法无 footer slot -> 无 opr-area
    await expect(formPage.locator('.weui-form__opr-area')).toHaveCount(0)
  })

  test('基础用法 section 渲染 title 与 2 个 cell', async ({ page, gotoPage }) => {
    await gotoPage('form-page')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const formPage = section.locator('.weui-form-page').first()

    await expect(formPage.locator('.weui-form__title')).toContainText('页面标题')
    // 内部 2 个 weui-cell（姓名 / 手机号）
    await expect(formPage.locator('.weui-cell')).toHaveCount(2)
    await expect(formPage.locator('.weui-label').first()).toContainText('姓名')
    await expect(formPage.locator('.weui-label').nth(1)).toContainText('手机号')
  })

  test('标题与描述 section 渲染 title 与 desc', async ({ page, gotoPage }) => {
    await gotoPage('form-page')

    const section = page.locator('.demo-section').filter({ hasText: '标题与描述' })
    const formPage = section.locator('.weui-form-page').first()

    await expect(formPage.locator('.weui-form__title')).toContainText('页面标题')
    await expect(formPage.locator('.weui-form__desc')).toContainText('页面描述文字')
  })

  test('底部操作区域 section 渲染 opr-area 与按钮', async ({ page, gotoPage }) => {
    await gotoPage('form-page')

    const section = page.locator('.demo-section').filter({ hasText: '底部操作区域' })
    const formPage = section.locator('.weui-form-page').first()

    // footer slot 触发 opr-area 渲染
    await expect(formPage.locator('.weui-form__opr-area')).toBeVisible()
    await expect(formPage.locator('.weui-form__opr-area .weui-btn-area')).toBeVisible()
    // 2 个按钮（确定 / 取消）
    await expect(formPage.locator('.weui-form__opr-area .weui-btn')).toHaveCount(2)
    await expect(formPage.locator('.weui-form__opr-area .weui-btn_primary').first()).toContainText('确定')
    await expect(formPage.locator('.weui-form__opr-area .weui-btn_default').first()).toContainText('取消')
  })

  test('自定义标题区域 section 通过 title slot 渲染', async ({ page, gotoPage }) => {
    await gotoPage('form-page')

    const section = page.locator('.demo-section').filter({ hasText: '自定义标题区域' })
    const formPage = section.locator('.weui-form-page').first()

    // title slot 触发 text-area 渲染，slot 内含自定义 title/desc
    await expect(formPage.locator('.weui-form__text-area')).toBeVisible()
    await expect(formPage.locator('.weui-form__text-area .weui-form__title')).toContainText('自定义标题')
    await expect(formPage.locator('.weui-form__text-area .weui-form__desc')).toContainText('通过 title 插槽')
  })

  test('扩展类名 section 含 custom-page 扩展类', async ({ page, gotoPage }) => {
    await gotoPage('form-page')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名' })
    const formPage = section.locator('.weui-form-page').first()
    await expect(formPage).toHaveClass(/custom-page/)
  })
})
