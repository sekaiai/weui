import { test, expect, expectNoErrors } from './helpers'

/**
 * Loading 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + default/page 模式 + 尺寸/透明背景/插槽
 */
test.describe('Loading 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('loading')
    await expect(page.locator('.page__title')).toContainText('Loading')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 weui-loading 图标', async ({ page, gotoPage }) => {
    await gotoPage('loading')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const icons = section.locator('.weui-loading')
    await expect(icons).toHaveCount(2)
    await expect(icons.first()).toBeVisible()
  })

  test('基础用法带文字渲染 weui-loading__text', async ({ page, gotoPage }) => {
    await gotoPage('loading')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const text = section.locator('.weui-loading__text')
    await expect(text).toContainText('加载中...')
  })

  test('页面模式渲染 weui-loadmore 与 __tips', async ({ page, gotoPage }) => {
    await gotoPage('loading')

    // "页面模式" 与 "页面模式组合" 均含 "页面模式"，取第一个
    const section = page.locator('.demo-section').filter({ hasText: '页面模式' }).first()
    const loadmore = section.locator('.weui-loadmore')
    await expect(loadmore).toBeVisible()
    const tips = loadmore.locator('.weui-loadmore__tips')
    await expect(tips).toContainText('正在加载')
    // 内部包含 weui-loading 图标
    await expect(loadmore.locator('.weui-loading')).toBeVisible()
  })

  test('透明背景渲染 weui-loading_transparent 类', async ({ page, gotoPage }) => {
    await gotoPage('loading')

    const section = page.locator('.demo-section').filter({ hasText: '透明背景' })
    const transparent = section.locator('.weui-loading_transparent')
    await expect(transparent).toBeVisible()
    // 在深色容器内
    await expect(section.locator('.demo-block-dark')).toBeVisible()
  })

  test('自定义尺寸输出 width/height 内联样式', async ({ page, gotoPage }) => {
    await gotoPage('loading')

    const section = page.locator('.demo-section').filter({ hasText: '自定义尺寸' })
    const icons = section.locator('.weui-loading')
    // 4 个纯图标 + 1 个带文字图标
    await expect(icons).toHaveCount(5)
    await expect(icons.nth(0)).toHaveCSS('width', '16px')
    await expect(icons.nth(0)).toHaveCSS('height', '16px')
    await expect(icons.nth(2)).toHaveCSS('width', '32px')
    await expect(icons.nth(3)).toHaveCSS('width', '48px')
    await expect(icons.nth(3)).toHaveCSS('height', '48px')
  })

  test('自定义文字（插槽）渲染 slot 内容', async ({ page, gotoPage }) => {
    await gotoPage('loading')

    const section = page.locator('.demo-section').filter({ hasText: '自定义文字（插槽）' })
    const text = section.locator('.weui-loading__text')
    await expect(text).toContainText('自定义加载文字')
  })

  test('页面模式组合渲染多个 weui-loadmore', async ({ page, gotoPage }) => {
    await gotoPage('loading')

    const section = page.locator('.demo-section').filter({ hasText: '页面模式组合' })
    const loadmores = section.locator('.weui-loadmore')
    await expect(loadmores).toHaveCount(2)
    await expect(loadmores.first()).toBeVisible()
    await expect(loadmores.nth(1)).toBeVisible()
  })
})
