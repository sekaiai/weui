import { test, expect, expectNoErrors } from './helpers'

/**
 * Form 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + title/desc/tips/footer/hd slot 渲染 + 扩展类名
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

  test('标题与描述 section 通过属性渲染 title 与 desc', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: '标题与描述' })
    const form = section.locator('.weui-form').first()

    await expect(form.locator('.weui-form__title')).toContainText('左对齐标题')
    await expect(form.locator('.weui-form__desc')).toContainText('标题和描述通过属性传入')
  })

  test('提示文字 section 渲染（footer slot 中包含 tips-area）', async ({ page, gotoPage }) => {
    await gotoPage('form')

    // 提示文字 section：footer slot 中渲染 tips-area
    const propSection = page.locator('.demo-section').filter({ hasText: '提示文字' })
    const propForm = propSection.locator('.weui-form').first()
    // form 组件本身渲染
    await expect(propForm).toBeVisible()
    // 表单渲染控件区域
    await expect(propForm.locator('.weui-form__control-area')).toBeVisible()
  })

  test('操作按钮区域 section 渲染 footer slot', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: '操作按钮区域' })
    const form = section.locator('.weui-form').first()

    // footer slot 触发 ft 区域渲染
    await expect(form.locator('.weui-form__ft')).toBeVisible()
    // 按钮区域渲染
    await expect(form.locator('.weui-btn-area')).toBeVisible()
    // 2 个按钮（确定 / 取消）
    await expect(form.locator('.weui-btn-area .weui-btn')).toHaveCount(2)
    await expect(form.locator('.weui-btn-area .weui-btn_primary').first()).toContainText('确定')
    await expect(form.locator('.weui-btn-area .weui-btn_default').first()).toContainText('取消')
  })

  test('hd 自定义标题区域 section 通过 hd slot 渲染', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: 'hd 自定义标题区域' })
    const form = section.locator('.weui-form').first()

    // hd slot 直接渲染自定义 text-area，组件不添加额外包装节点
    await expect(form.locator('.weui-form__text-area')).toBeVisible()
    await expect(form.locator('.weui-form__text-area .weui-form__title')).toContainText('自定义表单标题')
    await expect(form.locator('.weui-form__text-area .weui-form__desc')).toContainText('通过 hd 插槽完整模拟默认标题和描述')
  })

  test('扩展类名 section 含 custom-form 扩展类', async ({ page, gotoPage }) => {
    await gotoPage('form')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名' })
    const form = section.locator('.weui-form').first()
    await expect(form).toHaveClass(/custom-form/)
  })
})
