import { test, expect, expectNoErrors } from './helpers'

test.describe('Button 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('button')
    await expect(page.locator('h1')).toContainText('Button')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(9)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：点击 primary 按钮显示结果', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const firstDemo = page.locator('.demo-block').first()
    await firstDemo.locator('.weui-btn').first().click()
    await expect(firstDemo.locator('p')).toContainText('点击了按钮')
  })

  test('不同类型按钮均可点击', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const firstDemo = page.locator('.demo-block').first()
    const buttons = firstDemo.locator('.weui-btn')
    await buttons.nth(1).click()
    await expect(firstDemo.locator('p')).toContainText('点击了按钮')
  })

  test('禁用按钮不触发 click', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const disabledDemo = page.locator('.demo-block').nth(3)
    const disabledBtn = disabledDemo.locator('.weui-btn').first()
    await expect(disabledBtn).toBeDisabled()
    await disabledBtn.click({ force: true }).catch(() => {})
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('p')).toHaveCount(0)
  })

  test('加载状态按钮渲染 loading 图标', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const loadingDemo = page.locator('.demo-block').nth(4)
    await expect(loadingDemo.locator('.weui-primary-loading')).toHaveCount(2)
  })

  test('Cell 样式按钮：配合 weui-cell-group 渲染通栏操作', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    // 定位包含"添加成员"文本的 demo-block
    const demo = page.locator('.demo-block').filter({ hasText: '添加成员' })
    await expect(demo).toBeVisible()
    // 验证 weui-cell 结构存在
    await expect(demo.locator('.weui-cell')).toHaveCount(2)
    // 验证通栏 cell 按钮存在
    await expect(demo.locator('.weui-btn_cell')).toHaveCount(1)
    await expect(demo.locator('.weui-btn_cell-primary')).toHaveCount(1)
  })

  test('Cell 样式按钮：cell 右侧操作按钮（mini）', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    // 定位包含"编辑"和"开启"的 demo-block
    const demo = page.locator('.demo-block').filter({ hasText: '编辑' }).filter({ hasText: '开启' })
    await expect(demo).toBeVisible()
    // 验证 weui-cell 结构存在
    await expect(demo.locator('.weui-cell')).toHaveCount(2)
    // 验证 mini 按钮存在（非 cell 模式）
    await expect(demo.locator('.weui-btn_mini')).toHaveCount(2)
  })

  test('Cell 样式按钮：通栏按钮三种类型', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    // 定位包含 "Cell Primary" 的 demo-block
    const demo = page.locator('.demo-block').filter({ hasText: 'Cell Primary' })
    await expect(demo).toBeVisible()
    await expect(demo.locator('.weui-btn_cell')).toHaveCount(3)
    await expect(demo.locator('.weui-btn_cell-primary')).toHaveCount(1)
    await expect(demo.locator('.weui-btn_cell-warn')).toHaveCount(1)
  })

  test('验证码按钮：点击后启动倒计时', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    // 定位验证码 demo-block（cell 标题"验证码"在点击前后都存在，作为稳定锚点）
    const vcodeDemo = page.locator('.demo-block').filter({ hasText: '验证码' })
    await expect(vcodeDemo).toBeVisible()
    const vcodeBtn = vcodeDemo.locator('.weui-vcode-btn')
    await expect(vcodeBtn).toHaveCount(1)
    // 初始文本
    await expect(vcodeBtn).toContainText('获取验证码')
    // 点击启动倒计时
    await vcodeBtn.click()
    // 验证倒计时启动（按钮变为禁用，显示倒计时文本）
    await expect(vcodeBtn).toBeDisabled()
    await expect(vcodeBtn).toContainText('后重发')
    // 验证发送提示出现
    await expect(vcodeDemo.locator('p')).toContainText('验证码已发送')
  })

  test('半透明样式：点击显示遮罩层', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    // 定位半透明章节的触发 demo-block（包含"显示遮罩层"文本）
    const overlayDemo = page.locator('.demo-block').filter({ hasText: '显示遮罩层' })
    await expect(overlayDemo).toBeVisible()
    const triggerBtn = overlayDemo.locator('.weui-btn').first()
    // 初始遮罩层不存在
    await expect(page.locator('.weui-btn_overlay')).toHaveCount(0)
    // 点击触发遮罩层
    await triggerBtn.click()
    // 验证遮罩层出现，包含两个半透明按钮
    await expect(page.locator('.weui-btn_overlay')).toHaveCount(2)
    await expect(page.locator('.weui-btn_overlay').filter({ hasText: '取消' })).toBeVisible()
    await expect(page.locator('.weui-btn_overlay').filter({ hasText: '确定' })).toBeVisible()
  })

  test('半透明样式：点击取消隐藏遮罩层', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    const overlayDemo = page.locator('.demo-block').filter({ hasText: '显示遮罩层' })
    const triggerBtn = overlayDemo.locator('.weui-btn').first()
    await triggerBtn.click()
    // 点击取消
    await page.locator('.weui-btn_overlay').filter({ hasText: '取消' }).click()
    // 验证遮罩层消失
    await expect(page.locator('.weui-btn_overlay')).toHaveCount(0)
    // 验证结果显示
    await expect(overlayDemo.locator('p')).toContainText('取消了半透明按钮操作')
  })
})
