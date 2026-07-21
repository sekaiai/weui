import { test, expect, expectNoErrors } from './helpers'

test.describe('Cell 文档', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoDocsPage, consoleErrors, pageErrors }) => {
    await gotoDocsPage('cell')
    await expect(page.locator('h1').first()).toContainText('Cell')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('所有 demo-block 渲染成功', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const demos = page.locator('.demo-block')
    const count = await demos.count()
    expect(count).toBeGreaterThanOrEqual(9)
    for (let i = 0; i < count; i++) {
      await expect(demos.nth(i)).toBeVisible()
    }
  })

  test('基础用法：cell-group 渲染标题与 2 个 cell', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const firstDemo = page.locator('.demo-block').first()
    await expect(firstDemo.locator('.weui-cells__title')).toContainText('带说明的列表项')
    const cells = firstDemo.locator('.weui-cell')
    await expect(cells).toHaveCount(2)
    // title 渲染在 hd，value 渲染在 bd
    await expect(cells.nth(0).locator('.weui-cell__hd')).toContainText('标题文字')
    await expect(cells.nth(0).locator('.weui-cell__bd')).toContainText('说明文字')
    // 默认 cell 无 access 类
    await expect(cells.nth(0)).not.toHaveClass(/weui-cell_access/)
  })

  test('带图标：icon 插槽渲染 weui-icon', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const iconDemo = page.locator('.demo-block').nth(1)
    const cell = iconDemo.locator('.weui-cell').first()
    await expect(cell.locator('.weui-cell__hd')).toHaveCount(1)
    await expect(cell.locator('.weui-icon-info')).toHaveCount(1)
  })

  test('链接型：link 追加 weui-cell_access 类', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const linkDemo = page.locator('.demo-block').nth(2)
    const cells = linkDemo.locator('.weui-cell')
    await expect(cells).toHaveCount(2)
    await expect(cells.nth(0)).toHaveClass(/weui-cell_access/)
    await expect(cells.nth(0)).toContainText('cell standard')
  })

  test('点击 cell 触发 click 事件', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const linkDemo = page.locator('.demo-block').nth(2)
    const cell = linkDemo.locator('.weui-cell').first()
    // view 自定义元素，用 evaluate 触发原生 click
    await cell.evaluate((el) => el.click())
    await expect(linkDemo.locator('p')).toContainText('click 事件已触发')
  })

  test('带副标题：默认插槽渲染标题与副标题', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const subDemo = page.locator('.demo-block').nth(3)
    const body = subDemo.locator('.weui-cell__bd').first()
    await expect(body).toContainText('标题文字')
    await expect(body).toContainText('副标题')
  })

  test('上下布局：inline=false 追加 weui-cell_vertical', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const verticalDemo = page.locator('.demo-block').nth(4)
    const cell = verticalDemo.locator('.weui-cell').first()
    await expect(cell).toHaveClass(/weui-cell_vertical/)
  })

  test('表单型分组：form 追加 weui-cells__group_form', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const formDemo = page.locator('.demo-block').nth(5)
    await expect(formDemo.locator('.weui-cells__group')).toHaveClass(/weui-cells__group_form/)
    await expect(formDemo.locator('.weui-cell')).toHaveCount(2)
  })

  test('分组底部说明：footer 渲染 weui-cells__tips', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const footerDemo = page.locator('.demo-block').nth(6)
    await expect(footerDemo.locator('.weui-cells__tips')).toHaveCount(1)
    await expect(footerDemo.locator('.weui-cells__tips')).toContainText('底部说明文字')
  })

  test('视觉变体：warn/vcode/link 类名正确', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const variantDemo = page.locator('.demo-block').nth(7)
    const cells = variantDemo.locator('.weui-cell')
    await expect(cells).toHaveCount(3)
    await expect(cells.nth(0)).toHaveClass(/weui-cell_warn/)
    await expect(cells.nth(1)).toHaveClass(/weui-cell_vcode/)
    await expect(cells.nth(2)).toHaveClass(/weui-cell_link/)
  })

  test('自定义插槽：四个插槽内容均渲染', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('cell')
    const slotDemo = page.locator('.demo-block').nth(8)
    const cell = slotDemo.locator('.weui-cell').first()
    await expect(cell.locator('.weui-icon-info')).toHaveCount(1)
    await expect(cell.locator('.weui-cell__hd')).toContainText('自定义标题')
    await expect(cell.locator('.weui-cell__bd')).toContainText('自定义内容')
    await expect(cell.locator('.weui-cell__ft')).toContainText('自定义说明')
  })
})
