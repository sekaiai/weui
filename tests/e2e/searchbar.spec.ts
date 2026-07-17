import { test, expect, expectNoErrors } from './helpers'

/**
 * Searchbar 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（聚焦/取消/输入）+ WeUI 类名
 *
 * 聚焦后根元素加 weui-search-bar_focusing 类，取消按钮 v-if 出现
 * 搜索按钮在 searchButtonText 设置时始终显示（不显示取消按钮）
 * 示例页面用 .section 分组（结果区域用 .result-section 分开）
 */
test.describe('Searchbar 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('searchbar')
    await expect(page.locator('.page__title')).toContainText('Searchbar')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 weui-search-bar 结构', async ({ page, gotoPage }) => {
    await gotoPage('searchbar')

    const section = page.locator('.section').filter({ hasText: '基础用法' })
    const searchBar = section.locator('.weui-search-bar')
    await expect(searchBar).toBeVisible()

    // 内部结构
    await expect(section.locator('.weui-search-bar__form')).toBeVisible()
    // __box 默认 visibility:hidden（未聚焦时），验证其存在于 DOM
    await expect(section.locator('.weui-search-bar__box')).toHaveCount(1)
    // __label 未聚焦时可见（其内部 .weui-icon-search 也可见）
    await expect(section.locator('.weui-search-bar__label')).toBeVisible()
    await expect(section.locator('.weui-search-bar__label .weui-icon-search')).toBeVisible()

    // uni-input 元素存在于 __box 内（uni-app H5 将 <input> 编译为 <uni-input>）
    await expect(section.locator('uni-input.weui-search-bar__input')).toHaveCount(1)

    // 初始未聚焦，无取消按钮
    await expect(section.locator('.weui-search-bar__cancel-btn')).toHaveCount(0)
    // label 中显示 placeholder
    await expect(section.locator('.weui-search-bar__label')).toContainText('搜索')
  })

  test('点击 label 聚焦后显示取消按钮，点击取消退出聚焦', async ({ page, gotoPage }) => {
    await gotoPage('searchbar')

    const section = page.locator('.section').filter({ hasText: '基础用法' })
    const searchBar = section.locator('.weui-search-bar')

    // 初始无 focusing 类
    await expect(searchBar).not.toHaveClass(/weui-search-bar_focusing/)

    // 点击 label 触发聚焦
    await section.locator('.weui-search-bar__label').click()

    // 聚焦后加 focusing 类
    await expect(searchBar).toHaveClass(/weui-search-bar_focusing/)

    // 取消按钮出现
    const cancelBtn = section.locator('.weui-search-bar__cancel-btn')
    await expect(cancelBtn).toBeVisible()
    await expect(cancelBtn).toContainText('取消')

    // 点击取消退出聚焦
    await cancelBtn.click()
    await expect(searchBar).not.toHaveClass(/weui-search-bar_focusing/)
    await expect(section.locator('.weui-search-bar__cancel-btn')).toHaveCount(0)
  })

  test('自定义取消按钮文字为"返回"', async ({ page, gotoPage }) => {
    await gotoPage('searchbar')

    const section = page.locator('.section').filter({ hasText: '自定义取消按钮' })

    // 聚焦
    await section.locator('.weui-search-bar__label').click()

    // 取消按钮文字应为 "返回"
    const cancelBtn = section.locator('.weui-search-bar__cancel-btn')
    await expect(cancelBtn).toBeVisible()
    await expect(cancelBtn).toContainText('返回')
  })

  test('搜索按钮 section 渲染搜索按钮而非取消按钮', async ({ page, gotoPage }) => {
    await gotoPage('searchbar')

    const section = page.locator('.section').filter({ hasText: '搜索按钮' })

    // 搜索按钮存在
    const searchBtn = section.locator('.weui-search-bar__btn')
    await expect(searchBtn).toBeVisible()
    await expect(searchBtn).toContainText('搜索')

    // 不应有取消按钮（searchButtonText 设置时不显示取消按钮）
    await expect(section.locator('.weui-search-bar__cancel-btn')).toHaveCount(0)
  })

  test('自定义占位文字显示在 label 中', async ({ page, gotoPage }) => {
    await gotoPage('searchbar')

    const section = page.locator('.section').filter({ hasText: '自定义占位文字' })
    const label = section.locator('.weui-search-bar__label')
    await expect(label).toContainText('请输入商品名称')
  })

  test('扩展类名 section 渲染 my-searchbar', async ({ page, gotoPage }) => {
    await gotoPage('searchbar')

    const section = page.locator('.section').filter({ hasText: '扩展类名' })
    const searchBar = section.locator('.weui-search-bar')
    await expect(searchBar).toHaveClass(/my-searchbar/)
  })

  test('输入文字更新结果区域', async ({ page, gotoPage }) => {
    await gotoPage('searchbar')

    const section = page.locator('.section').filter({ hasText: '基础用法' })

    // 先点击 label 聚焦（使 input 可见可交互）
    await section.locator('.weui-search-bar__label').click()
    await expect(section.locator('.weui-search-bar')).toHaveClass(/weui-search-bar_focusing/)

    // 输入文字（uni-input 内部的原生 input）
    const input = section.locator('uni-input input')
    await input.fill('测试搜索')

    // 结果区域应更新
    const resultText = page.locator('.result-text').filter({ hasText: '基础：' })
    await expect(resultText).toContainText('测试搜索')
  })
})
