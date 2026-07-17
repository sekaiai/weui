import { test, expect, expectNoErrors } from './helpers'

test.describe('Loadmore 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('loadmore')
    await expect(page.locator('h1')).toContainText('Loadmore')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loadmore')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：default 类型渲染加载图标与默认文字', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loadmore')
    const firstDemo = page.locator('.demo-block').first()
    const loadmore = firstDemo.locator('.weui-loadmore')
    await expect(loadmore).toHaveCount(1)
    // default 类型不追加 line/dot 类
    await expect(loadmore).not.toHaveClass(/weui-loadmore_line/)
    await expect(loadmore).not.toHaveClass(/weui-loadmore_dot/)
    // 渲染加载图标
    await expect(firstDemo.locator('.weui-loading')).toHaveCount(1)
    // 默认文字"正在加载"
    await expect(firstDemo.locator('.weui-loadmore__tips')).toContainText('正在加载')
  })

  test('分割线样式：line 类型追加 weui-loadmore_line 类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loadmore')
    const lineDemo = page.locator('.demo-block').nth(1)
    const loadmore = lineDemo.locator('.weui-loadmore')
    await expect(loadmore).toHaveClass(/weui-loadmore_line/)
    await expect(loadmore).not.toHaveClass(/weui-loadmore_dot/)
    // line 类型不渲染加载图标
    await expect(lineDemo.locator('.weui-loading')).toHaveCount(0)
    // 自定义文字
    await expect(lineDemo.locator('.weui-loadmore__tips')).toContainText('暂无数据')
  })

  test('点点样式：dot 类型追加 weui-loadmore_dot 类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loadmore')
    const dotDemo = page.locator('.demo-block').nth(2)
    const loadmore = dotDemo.locator('.weui-loadmore')
    await expect(loadmore).toHaveClass(/weui-loadmore_dot/)
    await expect(loadmore).not.toHaveClass(/weui-loadmore_line/)
    // dot 类型不渲染加载图标
    await expect(dotDemo.locator('.weui-loading')).toHaveCount(0)
  })

  test('自定义文字：text 属性生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loadmore')
    const textDemo = page.locator('.demo-block').nth(3)
    const tips = textDemo.locator('.weui-loadmore__tips')
    await expect(tips.nth(0)).toContainText('正在加载更多')
    await expect(tips.nth(1)).toContainText('没有更多了')
  })

  test('隐藏文字：showText=false 时不渲染 tips', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loadmore')
    const hiddenDemo = page.locator('.demo-block').nth(4)
    // 第 1 个 default 隐藏文字：仍有加载图标，但无 tips 文字
    const loadmores = hiddenDemo.locator('.weui-loadmore')
    await expect(loadmores).toHaveCount(2)
    await expect(hiddenDemo.locator('.weui-loadmore__tips')).toHaveCount(0)
    // default 仍有加载图标
    await expect(hiddenDemo.locator('.weui-loading')).toHaveCount(1)
  })

  test('三种样式对比：同时渲染 default/line/dot', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loadmore')
    const compareDemo = page.locator('.demo-block').nth(5)
    const loadmores = compareDemo.locator('.weui-loadmore')
    await expect(loadmores).toHaveCount(3)
    await expect(loadmores.nth(0)).not.toHaveClass(/weui-loadmore_line|weui-loadmore_dot/)
    await expect(loadmores.nth(1)).toHaveClass(/weui-loadmore_line/)
    await expect(loadmores.nth(2)).toHaveClass(/weui-loadmore_dot/)
  })

  test('扩展类名：根元素追加自定义类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('loadmore')
    const extDemo = page.locator('.demo-block').nth(6)
    await expect(extDemo.locator('.my-loadmore')).toHaveCount(1)
  })
})
