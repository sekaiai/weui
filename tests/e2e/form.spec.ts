import { test, expect, expectNoErrors } from './helpers'

/**
 * Form 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + title/desc/tips/footer/title slot 渲染 + 扩展类名
 */
test.describe('Form 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('form')
    await expect(page.locator('.page__title')).toContainText('Form')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('渲染基础类名结构', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const form = section.locator('.weui-form').first()
    await expect(form).toBeVisible()

    // 文字区、控件区均渲染
    await expect(form.locator('.weui-form__text-area')).toBeVisible()
    await expect(form.locator('.weui-form__control-area')).toBeVisible()
    // 基础用法无 tips/footer slot -> 不渲染 tips-area / opr-area
    await expect(form.locator('.weui-form__tips-area')).toHaveCount(0)
    await expect(form.locator('.weui-form__opr-area')).toHaveCount(0)
  })

  test('基础用法 section 渲染 title 与 2 个 cell', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const form = section.locator('.weui-form').first()

    await expect(form.locator('.weui-form__title')).toContainText('表单标题')
    // 内部 2 个 weui-cell（姓名 / 手机号）
    await expect(form.locator('.weui-cell')).toHaveCount(2)
    await expect(form.locator('.weui-label').first()).toContainText('姓名')
    await expect(form.locator('.weui-label').nth(1)).toContainText('手机号')
  })

  test('标题与描述 section 渲染 title 与 desc', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: '标题与描述' })
    const form = section.locator('.weui-form').first()

    await expect(form.locator('.weui-form__title')).toContainText('表单标题')
    await expect(form.locator('.weui-form__desc')).toContainText('表单描述文字')
  })

  test('提示区域渲染（prop tips 与 tips slot）', async ({ page, gotoPage }) => {
    await gotoPage('form')

    // prop tips：提示文字 section 渲染 tips-area 与文字
    const propSection = page.locator('.demo-section').filter({ hasText: '提示文字' })
    const propForm = propSection.locator('.weui-form').first()
    await expect(propForm.locator('.weui-form__tips-area')).toBeVisible()
    await expect(propForm.locator('.weui-form__tips-area')).toContainText('底部提示文字')

    // tips slot：自定义提示区域 section 渲染 .weui-tips
    const slotSection = page.locator('.demo-section').filter({ hasText: '自定义提示区域' })
    const slotForm = slotSection.locator('.weui-form').first()
    await expect(slotForm.locator('.weui-form__tips-area')).toBeVisible()
    await expect(slotForm.locator('.weui-form__tips-area .weui-tips')).toBeVisible()
    await expect(slotForm.locator('.weui-form__tips-area .weui-tips')).toContainText('通过 tips 插槽自定义提示内容')
  })

  test('操作按钮区域 section 渲染 opr-area 与按钮', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: '操作按钮区域' })
    const form = section.locator('.weui-form').first()

    // footer slot 触发 opr-area 渲染
    await expect(form.locator('.weui-form__opr-area')).toBeVisible()
    await expect(form.locator('.weui-form__opr-area .weui-btn-area')).toBeVisible()
    // 2 个按钮（确定 / 取消）
    await expect(form.locator('.weui-form__opr-area .weui-btn')).toHaveCount(2)
    await expect(form.locator('.weui-form__opr-area .weui-btn_primary').first()).toContainText('确定')
    await expect(form.locator('.weui-form__opr-area .weui-btn_default').first()).toContainText('取消')
  })

  test('自定义标题区域 section 通过 title slot 渲染', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: '自定义标题区域' })
    const form = section.locator('.weui-form').first()

    // title slot 触发 text-area 渲染，slot 内含自定义 title/desc
    await expect(form.locator('.weui-form__text-area')).toBeVisible()
    await expect(form.locator('.weui-form__text-area .weui-form__title')).toContainText('自定义标题')
    await expect(form.locator('.weui-form__text-area .weui-form__desc')).toContainText('通过 title 插槽')
  })

  test('扩展类名 section 含 custom-form 扩展类', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名' })
    const form = section.locator('.weui-form').first()
    await expect(form).toHaveClass(/custom-form/)
  })
})
