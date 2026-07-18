import { test, expect, expectNoErrors, type Locator } from './helpers'

/**
 * 断言 inner-bar 的内联 style 包含指定百分比宽度
 * （getComputedStyle 会把百分比换算为像素，需直接检查 style 属性）
 */
async function expectInnerBarWidth(innerBar: Locator, percent: string): Promise<void> {
  const style = await innerBar.getAttribute('style') ?? ''
  expect(style, `expected style="${style}" to contain width:${percent}`).toMatch(
    new RegExp(`width:\\s*${percent}`),
  )
}

test.describe('Progress 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('progress')
    await expect(page.locator('h1')).toContainText('Progress')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(8)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染 weui-progress 与百分比文字', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-progress')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-progress__bar')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-progress__inner-bar')).toHaveCount(1)
    // 显示百分比文字 50%
    await expect(firstDemo.locator('.weui-progress__info')).toContainText('50%')
  })

  test('基础用法：inner-bar 宽度为 50%', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const firstDemo = page.locator('.demo-block').first()
    const innerBar = firstDemo.locator('.weui-progress__inner-bar')
    await expectInnerBarWidth(innerBar, '50%')
  })

  test('不同进度：4 条进度条宽度依次为 0/30/60/100', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const multiDemo = page.locator('.demo-block').nth(1)
    const innerBars = multiDemo.locator('.weui-progress__inner-bar')
    await expect(innerBars).toHaveCount(4)
    await expectInnerBarWidth(innerBars.nth(0), '0%')
    await expectInnerBarWidth(innerBars.nth(1), '30%')
    await expectInnerBarWidth(innerBars.nth(2), '60%')
    await expectInnerBarWidth(innerBars.nth(3), '100%')
  })

  test('动态进度：点击 +20 按钮增加进度', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const dynamicDemo = page.locator('.demo-block').nth(2)
    // 初始 30%
    await expect(dynamicDemo.locator('p')).toContainText('当前进度：30%')
    await expectInnerBarWidth(dynamicDemo.locator('.weui-progress__inner-bar'), '30%')
    // 点击 +20 按钮（primary 按钮）
    await dynamicDemo.locator('.weui-btn_primary').click()
    await expect(dynamicDemo.locator('p')).toContainText('当前进度：50%')
    await expectInnerBarWidth(dynamicDemo.locator('.weui-progress__inner-bar'), '50%')
    // 再点击两次直到 90%
    await dynamicDemo.locator('.weui-btn_primary').click()
    await dynamicDemo.locator('.weui-btn_primary').click()
    await expect(dynamicDemo.locator('p')).toContainText('当前进度：90%')
  })

  test('动态进度：上限为 100%', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const dynamicDemo = page.locator('.demo-block').nth(2)
    // 连续点击 +20 直到上限
    for (let i = 0; i < 6; i++) {
      await dynamicDemo.locator('.weui-btn_primary').click()
    }
    await expect(dynamicDemo.locator('p')).toContainText('当前进度：100%')
    await expectInnerBarWidth(dynamicDemo.locator('.weui-progress__inner-bar'), '100%')
  })

  test('隐藏百分比文字：不渲染 weui-progress__info', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const hiddenDemo = page.locator('.demo-block').nth(3)
    await expect(hiddenDemo.locator('.weui-progress__info')).toHaveCount(0)
  })

  test('自定义激活颜色：inner-bar 背景色生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const colorDemo = page.locator('.demo-block').nth(4)
    const innerBars = colorDemo.locator('.weui-progress__inner-bar')
    await expect(innerBars.nth(0)).toHaveCSS('background-color', 'rgb(16, 174, 255)')
    await expect(innerBars.nth(1)).toHaveCSS('background-color', 'rgb(250, 157, 59)')
    await expect(innerBars.nth(2)).toHaveCSS('background-color', 'rgb(250, 81, 81)')
  })

  test('自定义粗细：bar 高度生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const strokeDemo = page.locator('.demo-block').nth(5)
    const bars = strokeDemo.locator('.weui-progress__bar')
    await expect(bars.nth(0)).toHaveCSS('height', '3px')
    await expect(bars.nth(1)).toHaveCSS('height', '6px')
    await expect(bars.nth(2)).toHaveCSS('height', '12px')
  })

  test('自定义背景色：bar 背景色生效', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const bgDemo = page.locator('.demo-block').nth(6)
    await expect(bgDemo.locator('.weui-progress__bar')).toHaveCSS('background-color', 'rgb(237, 237, 237)')
  })

  test('组合使用：同时设置多个属性', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('progress')
    const comboDemo = page.locator('.demo-block').nth(7)
    const bar = comboDemo.locator('.weui-progress__bar')
    const innerBar = comboDemo.locator('.weui-progress__inner-bar')
    await expect(bar).toHaveCSS('height', '8px')
    await expect(bar).toHaveCSS('background-color', 'rgb(229, 229, 229)')
    await expect(innerBar).toHaveCSS('background-color', 'rgb(7, 193, 96)')
    await expectInnerBarWidth(innerBar, '75%')
  })
})
