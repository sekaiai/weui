import { test, expect, expectNoErrors } from './helpers'

test.describe('Msg 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('msg')
    await expect(page.locator('h1').first()).toContainText('Msg')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('msg')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染图标、标题、描述与按钮', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('msg')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-msg')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-msg__icon-area')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-msg__text-area')).toHaveCount(1)
    await expect(firstDemo.locator('.weui-msg__title')).toContainText('操作成功')
    await expect(firstDemo.locator('.weui-msg__desc')).toContainText('内容详情')
    // 操作区 2 个按钮
    const btns = firstDemo.locator('.weui-msg__opr-area .weui-btn')
    await expect(btns).toHaveCount(2)
    await expect(btns.nth(0)).toContainText('推荐操作')
    await expect(btns.nth(1)).toContainText('辅助操作')
  })

  test('图标类型：success/warn/info/waiting 均渲染图标区', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('msg')
    // index 1~4 分别为 success / warn / info / waiting
    const types = ['success', 'warn', 'info', 'waiting']
    for (let i = 0; i < types.length; i++) {
      const demo = page.locator('.demo-block').nth(1 + i)
      await expect(demo.locator('.weui-msg__icon-area')).toHaveCount(1)
      await expect(demo.locator('.weui-msg__title')).toBeVisible()
    }
  })

  test('自定义内容：默认插槽替换图标与标题区', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('msg')
    // 自定义内容 demo：index 6（含底部提示 demo 在 index 5）
    const slotDemo = page.locator('.demo-block').nth(6)
    await expect(slotDemo.locator('.weui-msg')).toHaveCount(1)
    // 插槽内容渲染
    await expect(slotDemo).toContainText('完全自定义的内容')
    // 不渲染默认的图标区与标题区
    await expect(slotDemo.locator('.weui-msg__icon-area')).toHaveCount(0)
    await expect(slotDemo.locator('.weui-msg__text-area')).toHaveCount(0)
    // 仍有按钮区
    await expect(slotDemo.locator('.weui-msg__opr-area .weui-btn')).toHaveCount(1)
  })

  test('底部额外区域：footer 插槽渲染 weui-msg__extra-area', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('msg')
    // footer demo：index 7（含底部提示 demo 在 index 5）
    const footerDemo = page.locator('.demo-block').nth(7)
    await expect(footerDemo.locator('.weui-msg__extra-area')).toHaveCount(1)
    await expect(footerDemo.locator('.weui-msg__extra-area')).toContainText('Copyright')
  })

  test('点击按钮触发 buttontap 事件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('msg')
    const firstDemo = page.locator('.demo-block').first()
    const btns = firstDemo.locator('.weui-msg__opr-area .weui-btn')
    // 点击「推荐操作」按钮（view 自定义元素，用 evaluate 触发原生 click）
    await btns.nth(0).evaluate((el) => el.click())
    // 验证提示文字更新 — 只匹配无 class 的结果 <p>（避免命中 .weui-msg__desc / .weui-btn-area）
    const resultText = firstDemo.locator('p:not([class])')
    await expect(resultText).toContainText('推荐操作')
    await expect(resultText).toContainText('index=0')
  })
})
