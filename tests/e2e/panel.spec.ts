import { test, expect, expectNoErrors } from './helpers'

/**
 * Panel 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 头部/主体/底部结构 + access 模式 + 自定义插槽
 */
test.describe('Panel 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('panel')
    await expect(page.locator('.page__title')).toContainText('Panel')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 weui-panel 与三段结构', async ({ page, gotoPage }) => {
    await gotoPage('panel')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const panel = section.locator('.weui-panel').first()
    await expect(panel).toBeVisible()

    // 头部、主体均存在
    await expect(panel.locator('.weui-panel__hd')).toBeVisible()
    await expect(panel.locator('.weui-panel__bd')).toBeVisible()

    // 头部标题
    await expect(panel.locator('.weui-panel__hd')).toContainText('标题')

    // 主体内 2 个 weui-cell
    await expect(panel.locator('.weui-panel__bd .weui-cell')).toHaveCount(2)
  })

  test('无标题面板不渲染头部', async ({ page, gotoPage }) => {
    await gotoPage('panel')

    const section = page.locator('.demo-section').filter({ hasText: '无标题面板' })
    const panel = section.locator('.weui-panel').first()
    await expect(panel).toBeVisible()

    // 无 hd
    await expect(panel.locator('.weui-panel__hd')).toHaveCount(0)
    // 主体始终渲染
    await expect(panel.locator('.weui-panel__bd')).toBeVisible()
  })

  test('Access 模式渲染 weui-panel_access 与图文组合', async ({ page, gotoPage }) => {
    await gotoPage('panel')

    const section = page.locator('.demo-section').filter({ hasText: 'Access' })
    const panel = section.locator('.weui-panel').first()
    await expect(panel).toBeVisible()
    await expect(panel).toHaveClass(/weui-panel_access/)

    // 头部标题
    await expect(panel.locator('.weui-panel__hd')).toContainText('图文组合列表')

    // 2 个 media-box
    const boxes = panel.locator('.weui-media-box.weui-media-box_appmsg')
    await expect(boxes).toHaveCount(2)

    // 第一个 media-box 结构验证
    const first = boxes.first()
    await expect(first.locator('.weui-media-box__hd')).toBeVisible()
    await expect(first.locator('.weui-media-box__hd img')).toBeVisible()
    await expect(first.locator('.weui-media-box__bd')).toBeVisible()
    await expect(first.locator('.weui-media-box__title')).toBeVisible()
    await expect(first.locator('.weui-media-box__desc')).toBeVisible()
  })

  test('自定义头部通过 #header slot 渲染 .weui-panel__title', async ({ page, gotoPage }) => {
    await gotoPage('panel')

    const section = page.locator('.demo-section').filter({ hasText: '自定义头部' })
    const panel = section.locator('.weui-panel').first()
    await expect(panel).toBeVisible()

    // 自定义头部 slot 渲染 .weui-panel__title
    const title = panel.locator('.weui-panel__hd .weui-panel__title').first()
    await expect(title).toBeVisible()
  })

  test('底部内容通过 #footer slot 渲染"查看更多"', async ({ page, gotoPage }) => {
    await gotoPage('panel')

    const section = page.locator('.demo-section').filter({ hasText: '底部内容' })
    const panel = section.locator('.weui-panel').first()
    await expect(panel).toBeVisible()

    // 头部标题
    await expect(panel.locator('.weui-panel__hd')).toContainText('标题')

    // 底部 ft 渲染"查看更多"（slot 内容也含 .weui-panel__ft，用 first 定位外层）
    const ft = panel.locator('.weui-panel__ft').first()
    await expect(ft).toBeVisible()
    await expect(ft).toContainText('查看更多')
  })

  test('扩展类名通过 ext-class 注入 custom-panel', async ({ page, gotoPage }) => {
    await gotoPage('panel')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名' })
    const panel = section.locator('.weui-panel').first()
    await expect(panel).toBeVisible()
    await expect(panel).toHaveClass(/custom-panel/)
  })
})
