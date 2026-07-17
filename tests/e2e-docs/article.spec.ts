import { test, expect, expectNoErrors } from './helpers'

test.describe('Article 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('article')
    // 页面内含多个 h1（文章 demo 中的 h1），页面标题为第一个
    await expect(page.locator('h1').first()).toContainText('Article')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('article')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(4)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('每个 demo-block 都渲染 weui-article 容器', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('article')
    const articles = page.locator('.demo-block .weui-article')
    await expect(articles).toHaveCount(4)
  })

  test('基础用法：渲染 h1/h2/p/ul/li', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('article')
    const firstDemo = page.locator('.demo-block').first()
    const article = firstDemo.locator('.weui-article')
    await expect(article.locator('h1')).toContainText('大标题')
    await expect(article.locator('h2')).toHaveCount(2)
    await expect(article.locator('p')).toHaveCount(1)
    const lis = article.locator('ul li')
    await expect(lis).toHaveCount(3)
    await expect(lis.nth(0)).toContainText('列表项一')
  })

  test('带图片：渲染 img 元素', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('article')
    const imgDemo = page.locator('.demo-block').nth(1)
    const img = imgDemo.locator('.weui-article img')
    await expect(img).toHaveCount(1)
    await expect(img).toHaveAttribute('alt', '示例图片')
    // src 以 data:image 开头
    const src = await img.getAttribute('src')
    expect(src).toContain('data:image/svg+xml')
  })

  test('带引用：渲染 blockquote', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('article')
    const quoteDemo = page.locator('.demo-block').nth(2)
    const quote = quoteDemo.locator('.weui-article blockquote')
    await expect(quote).toHaveCount(1)
    await expect(quote).toContainText('引用内容')
  })

  test('完整文章：组合多种元素', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('article')
    const fullDemo = page.locator('.demo-block').nth(3)
    const article = fullDemo.locator('.weui-article')
    await expect(article.locator('h1')).toContainText('Vue 3')
    const h2Count = await article.locator('h2').count()
    expect(h2Count).toBeGreaterThanOrEqual(2)
    const liCount = await article.locator('ul li').count()
    expect(liCount).toBeGreaterThanOrEqual(3)
    await expect(article.locator('blockquote')).toHaveCount(1)
    await expect(article.locator('img')).toHaveCount(1)
  })
})
