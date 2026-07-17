import { test, expect, expectNoErrors } from './helpers'

/**
 * Article 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 原生 HTML 标签渲染 + 扩展类名
 */
test.describe('Article 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('article')
    await expect(page.locator('.page__title')).toContainText('Article')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('渲染 weui-article 根元素', async ({ page, gotoPage }) => {
    await gotoPage('article')
    const article = page.locator('.weui-article').first()
    await expect(article).toBeVisible()
  })

  test('渲染 h1 大标题', async ({ page, gotoPage }) => {
    await gotoPage('article')
    const h1 = page.locator('.weui-article h1').first()
    await expect(h1).toContainText('文章页大标题')
  })

  test('渲染多级标题 h2/h3/h4', async ({ page, gotoPage }) => {
    await gotoPage('article')
    const article = page.locator('.weui-article').first()
    await expect(article.locator('h2').first()).toContainText('章节标题')
    await expect(article.locator('h3').first()).toContainText('1.1 节标题')
    await expect(article.locator('h4').first()).toContainText('四级标题')
  })

  test('渲染无序列表 ul/li', async ({ page, gotoPage }) => {
    await gotoPage('article')
    const article = page.locator('.weui-article').first()
    const ul = article.locator('ul').first()
    await expect(ul).toBeVisible()
    await expect(ul).toContainText('列表项一')
    await expect(ul).toContainText('列表项三')
    // 嵌套子项
    await expect(ul).toContainText('嵌套子项 A')
    await expect(ul).toContainText('嵌套子项 B')
  })

  test('渲染有序列表 ol/li', async ({ page, gotoPage }) => {
    await gotoPage('article')
    const article = page.locator('.weui-article').first()
    const ol = article.locator('ol').first()
    await expect(ol).toBeVisible()
    await expect(ol).toContainText('第一项')
    await expect(ol).toContainText('第三项')
    // 嵌套子项
    await expect(ol).toContainText('子项 2.1')
    await expect(ol).toContainText('子项 2.2')
  })

  test('扩展类名示例渲染嵌套 article 与 my-article 类', async ({ page, gotoPage }) => {
    await gotoPage('article')
    // 外层 + 嵌套共 2 个 weui-article
    const articles = page.locator('.weui-article')
    await expect(articles).toHaveCount(2)
    // 嵌套的有 my-article 类
    const nested = page.locator('.weui-article.my-article')
    await expect(nested).toBeVisible()
    await expect(nested).toContainText('嵌套的 article')
  })
})
