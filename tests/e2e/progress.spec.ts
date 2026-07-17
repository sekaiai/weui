import { test, expect, expectNoErrors } from './helpers'

/**
 * Progress 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 不同属性渲染 + 边界值夹取
 */
test.describe('Progress 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('progress')
    await expect(page.locator('.page__title')).toContainText('Progress')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染进度条结构', async ({ page, gotoPage }) => {
    await gotoPage('progress')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const progress = section.locator('.weui-progress')
    await expect(progress).toBeVisible()

    // 验证内部结构
    await expect(progress.locator('.weui-progress__bar')).toBeVisible()
    await expect(progress.locator('.weui-progress__inner-bar')).toBeVisible()

    // 验证百分比文字
    await expect(progress.locator('.weui-progress__info')).toContainText('30%')

    // 验证 inner-bar 宽度为 30%
    await expect(progress.locator('.weui-progress__inner-bar')).toHaveAttribute(
      'style',
      /width:\s*30%/i,
    )
  })

  test('不同进度渲染多个进度条', async ({ page, gotoPage }) => {
    await gotoPage('progress')

    const section = page.locator('.demo-section').filter({ hasText: '不同进度' })
    const progressBars = section.locator('.weui-progress')
    await expect(progressBars).toHaveCount(3)

    // 验证各进度条百分比文字
    const infos = section.locator('.weui-progress__info')
    await expect(infos.nth(0)).toContainText('0%')
    await expect(infos.nth(1)).toContainText('50%')
    await expect(infos.nth(2)).toContainText('100%')

    // 验证 inner-bar 宽度
    const innerBars = section.locator('.weui-progress__inner-bar')
    await expect(innerBars.nth(0)).toHaveAttribute('style', /width:\s*0%/i)
    await expect(innerBars.nth(1)).toHaveAttribute('style', /width:\s*50%/i)
    await expect(innerBars.nth(2)).toHaveAttribute('style', /width:\s*100%/i)
  })

  test('隐藏百分比文字时不渲染 info', async ({ page, gotoPage }) => {
    await gotoPage('progress')

    const section = page.locator('.demo-section').filter({ hasText: '隐藏百分比文字' })
    const progress = section.locator('.weui-progress')
    await expect(progress).toBeVisible()

    // showInfo=false 时不应有百分比文字
    await expect(progress.locator('.weui-progress__info')).toHaveCount(0)

    // 但进度条结构仍存在
    await expect(progress.locator('.weui-progress__bar')).toBeVisible()
    await expect(progress.locator('.weui-progress__inner-bar')).toBeVisible()
  })

  test('自定义高度设置 bar 样式', async ({ page, gotoPage }) => {
    await gotoPage('progress')

    const section = page.locator('.demo-section').filter({ hasText: '自定义高度' })
    const bars = section.locator('.weui-progress__bar')
    await expect(bars).toHaveCount(3)

    // 验证各进度条高度样式
    await expect(bars.nth(0)).toHaveAttribute('style', /height:\s*3px/i)
    await expect(bars.nth(1)).toHaveAttribute('style', /height:\s*6px/i)
    await expect(bars.nth(2)).toHaveAttribute('style', /height:\s*10px/i)
  })

  test('自定义激活颜色设置 inner-bar 样式', async ({ page, gotoPage }) => {
    await gotoPage('progress')

    const section = page.locator('.demo-section').filter({ hasText: '自定义激活颜色' })
    const innerBars = section.locator('.weui-progress__inner-bar')
    await expect(innerBars).toHaveCount(4)

    // 验证各 inner-bar 的 background-color（用 toHaveCSS 检查计算样式，避免内联格式差异）
    await expect(innerBars.nth(0)).toHaveCSS('background-color', 'rgb(16, 174, 255)')
    await expect(innerBars.nth(1)).toHaveCSS('background-color', 'rgb(250, 157, 59)')
    await expect(innerBars.nth(2)).toHaveCSS('background-color', 'rgb(250, 81, 81)')
    await expect(innerBars.nth(3)).toHaveCSS('background-color', 'rgb(7, 193, 96)')
  })

  test('自定义背景色设置 bar 样式', async ({ page, gotoPage }) => {
    await gotoPage('progress')

    const section = page.locator('.demo-section').filter({ hasText: '自定义背景色' })
    const bar = section.locator('.weui-progress__bar')
    await expect(bar).toHaveCSS('background-color', 'rgb(237, 237, 237)')
  })

  test('边界值自动夹取 0-100', async ({ page, gotoPage }) => {
    await gotoPage('progress')

    const section = page.locator('.demo-section').filter({ hasText: '边界值' })
    const innerBars = section.locator('.weui-progress__inner-bar')
    await expect(innerBars).toHaveCount(2)

    // percent=-20 → 夹取为 0
    await expect(innerBars.nth(0)).toHaveAttribute('style', /width:\s*0%/i)
    // percent=150 → 夹取为 100
    await expect(innerBars.nth(1)).toHaveAttribute('style', /width:\s*100%/i)
  })
})
