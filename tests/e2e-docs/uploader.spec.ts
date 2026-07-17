import { test, expect, expectNoErrors } from './helpers'

test.describe('Uploader 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('uploader')
    await expect(page.locator('h1')).toContainText('Uploader')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('uploader')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(6)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：渲染标题与文件列表', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('uploader')
    const firstDemo = page.locator('.demo-block').first()
    // 验证标题
    await expect(firstDemo.locator('.weui-uploader__title')).toContainText('图片上传')
    // 验证有 2 个文件
    await expect(firstDemo.locator('.weui-uploader__file')).toHaveCount(2)
    // 验证计数 2/9
    await expect(firstDemo.locator('.weui-uploader__info')).toContainText('2/9')
    // 验证显示上传按钮（未达上限）
    await expect(firstDemo.locator('.weui-uploader__input-box')).toBeVisible()
  })

  test('上传状态：渲染 loading/error 状态遮罩', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('uploader')
    // 上传状态是第 2 个 demo-block（index 1）
    const statusDemo = page.locator('.demo-block').nth(1)
    // 验证有 3 个文件
    await expect(statusDemo.locator('.weui-uploader__file')).toHaveCount(3)
    // 验证有 2 个状态遮罩（loading 和 error，success 不显示遮罩）
    await expect(statusDemo.locator('.weui-uploader__file_status')).toHaveCount(2)
    // 验证状态文字
    await expect(statusDemo.locator('.weui-uploader__file-content').first()).toContainText('50%')
  })

  test('数量限制：文件数达上限时隐藏上传按钮', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('uploader')
    // 数量限制是第 3 个 demo-block（index 2）
    const countDemo = page.locator('.demo-block').nth(2)
    // 验证标题
    await expect(countDemo.locator('.weui-uploader__title')).toContainText('最多2张')
    // 验证有 2 个文件
    await expect(countDemo.locator('.weui-uploader__file')).toHaveCount(2)
    // 验证计数 2/2
    await expect(countDemo.locator('.weui-uploader__info')).toContainText('2/2')
    // 验证上传按钮已隐藏
    await expect(countDemo.locator('.weui-uploader__input-box')).toHaveCount(0)
  })

  test('隐藏头部：不渲染标题与计数', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('uploader')
    // 隐藏头部是第 4 个 demo-block（index 3）
    const headerDemo = page.locator('.demo-block').nth(3)
    // 验证没有头部
    await expect(headerDemo.locator('.weui-uploader__hd')).toHaveCount(0)
    // 验证有文件
    await expect(headerDemo.locator('.weui-uploader__file')).toHaveCount(1)
  })

  test('提示文字：底部渲染 tips', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('uploader')
    // 提示文字是第 5 个 demo-block（index 4）
    const tipsDemo = page.locator('.demo-block').nth(4)
    await expect(tipsDemo.locator('.weui-uploader__tips')).toContainText('最多上传9张图片')
  })

  test('文件预览：点击文件触发 preview 事件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('uploader')
    // 文件预览与删除是第 6 个 demo-block（index 5）
    const previewDemo = page.locator('.demo-block').nth(5)
    // 初始状态
    await expect(previewDemo.locator('p')).toContainText('暂无事件')
    // 点击第一个文件（使用原生 click，因为 view 自定义元素的 Playwright click 不可靠）
    await previewDemo.locator('.weui-uploader__file').first().evaluate((el) => (el as HTMLElement).click())
    // 验证 preview 事件被触发
    await expect(previewDemo.locator('p')).toContainText('preview: 预览第 1 个文件')
  })

  test('基础用法：点击文件触发 preview 事件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('uploader')
    const firstDemo = page.locator('.demo-block').first()
    // 初始状态
    await expect(firstDemo.locator('p')).toContainText('暂无事件')
    // 点击第一个文件
    await firstDemo.locator('.weui-uploader__file').first().evaluate((el) => (el as HTMLElement).click())
    // 验证 preview 事件被触发
    await expect(firstDemo.locator('p')).toContainText('preview: 预览第 1 个文件')
  })
})
