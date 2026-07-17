import { test, expect, expectNoErrors } from './helpers'

/**
 * Loadmore 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 不同类型渲染 + 扩展类名 + 列表场景
 */
test.describe('Loadmore 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('loadmore')
    await expect(page.locator('.page__title')).toContainText('Loadmore')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 loading 图标和文字', async ({ page, gotoPage }) => {
    await gotoPage('loadmore')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const loadmores = section.locator('.weui-loadmore')
    await expect(loadmores).toHaveCount(2)

    // 第一个：默认文字"正在加载"
    const first = loadmores.nth(0)
    await expect(first).toBeVisible()
    await expect(first.locator('.weui-loading')).toBeVisible()
    await expect(first.locator('.weui-loadmore__tips')).toContainText('正在加载')

    // 第二个：自定义文字"加载中..."
    await expect(loadmores.nth(1).locator('.weui-loadmore__tips')).toContainText('加载中...')
  })

  test('分割线样式有 line 类名且无 loading 图标', async ({ page, gotoPage }) => {
    await gotoPage('loadmore')

    const section = page.locator('.demo-section').filter({ hasText: '分割线样式' })
    const loadmores = section.locator('.weui-loadmore')
    await expect(loadmores).toHaveCount(2)

    // line 类型应有 weui-loadmore_line 类
    await expect(loadmores.nth(0)).toHaveClass(/weui-loadmore_line/)
    await expect(loadmores.nth(1)).toHaveClass(/weui-loadmore_line/)

    // line 类型不应有 loading 图标
    await expect(loadmores.nth(0).locator('.weui-loading')).toHaveCount(0)
    await expect(loadmores.nth(1).locator('.weui-loading')).toHaveCount(0)
  })

  test('点点样式有 dot 类名', async ({ page, gotoPage }) => {
    await gotoPage('loadmore')

    const section = page.locator('.demo-section').filter({ hasText: '点点样式' })
    const loadmore = section.locator('.weui-loadmore')
    await expect(loadmore).toHaveClass(/weui-loadmore_dot/)

    // dot 类型不应有 loading 图标
    await expect(loadmore.locator('.weui-loading')).toHaveCount(0)
  })

  test('隐藏文字时不渲染 tips', async ({ page, gotoPage }) => {
    await gotoPage('loadmore')

    const section = page.locator('.demo-section').filter({ hasText: '隐藏文字' })
    const loadmores = section.locator('.weui-loadmore')
    await expect(loadmores).toHaveCount(2)

    // showText=false 时不应有 tips 文字
    await expect(loadmores.nth(0).locator('.weui-loadmore__tips')).toHaveCount(0)
    await expect(loadmores.nth(1).locator('.weui-loadmore__tips')).toHaveCount(0)

    // default 类型仍保留 loading 图标
    await expect(loadmores.nth(0).locator('.weui-loading')).toBeVisible()
  })

  test('扩展类名正确应用', async ({ page, gotoPage }) => {
    await gotoPage('loadmore')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名' })
    const loadmore = section.locator('.weui-loadmore')
    await expect(loadmore).toHaveClass(/my-loadmore/)
    await expect(loadmore.locator('.weui-loadmore__tips')).toContainText('自定义间距')
  })

  test('列表加载场景渲染 cells 和 line loadmore', async ({ page, gotoPage }) => {
    await gotoPage('loadmore')

    const section = page.locator('.demo-section').filter({ hasText: '列表加载场景' })

    // 应有 5 个 cell
    await expect(section.locator('.weui-cell')).toHaveCount(5)

    // loading=false 时应渲染 line 类型 loadmore
    const loadmore = section.locator('.weui-loadmore')
    await expect(loadmore).toHaveClass(/weui-loadmore_line/)
    await expect(loadmore.locator('.weui-loadmore__tips')).toContainText('暂无更多数据')
  })
})
