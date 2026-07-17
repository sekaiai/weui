import { test, expect, expectNoErrors } from './helpers'

/**
 * Input 组件 E2E 测试
 * 验证：页面可访问性 + 交互行为（输入/清除）+ WeUI 类名 + 属性渲染
 *
 * uni-app H5 编译后：
 * - weui-input 根元素是 <view class="weui-input">，内部是 <uni-input class="weui-input">
 * - <uni-input> 内部包含原生 <input class="uni-input-input">
 * - 属性（type/maxlength/disabled/value）在原生 input 上，class 在 <uni-input> 上
 * - 示例页面用 .weui-cells__title 分组，每组后跟 .weui-cells.weui-cells_form
 */
test.describe('Input 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('input')
    await expect(page.locator('.page__title')).toContainText('Input')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('基础用法渲染 weui-input 结构', async ({ page, gotoPage }) => {
    await gotoPage('input')

    const basicTitle = page.locator('.weui-cells__title').filter({ hasText: '基础用法' })
    await expect(basicTitle).toBeVisible()

    const cells = basicTitle.locator('+ .weui-cells')
    await expect(cells).toHaveClass(/weui-cells_form/)

    // 根 view 有 weui-input 类
    const inputRoot = cells.locator('.weui-input').first()
    await expect(inputRoot).toBeVisible()

    // uni-input 元素也有 weui-input 类
    const uniInput = cells.locator('uni-input.weui-input').first()
    await expect(uniInput).toBeVisible()

    // label 文本
    await expect(cells.locator('.weui-label')).toContainText('文本')
  })

  test('输入类型 section 渲染 4 个不同类型输入框', async ({ page, gotoPage }) => {
    await gotoPage('input')

    const typeTitle = page.locator('.weui-cells__title').filter({ hasText: '输入类型' })
    const cells = typeTitle.locator('+ .weui-cells')

    // 应有 4 个 uni-input
    const inputs = cells.locator('uni-input.weui-input')
    await expect(inputs).toHaveCount(4)

    // 验证标签文本
    await expect(cells.locator('.weui-label', { hasText: '数字' })).toBeVisible()
    await expect(cells.locator('.weui-label', { hasText: '身份证' })).toBeVisible()
    await expect(cells.locator('.weui-label', { hasText: '小数' })).toBeVisible()
    await expect(cells.locator('.weui-label', { hasText: '密码' })).toBeVisible()
  })

  test('密码类型 input 使用 password 掩码', async ({ page, gotoPage }) => {
    await gotoPage('input')

    const typeTitle = page.locator('.weui-cells__title').filter({ hasText: '输入类型' })
    const cells = typeTitle.locator('+ .weui-cells')

    // 密码 cell 是第 4 个，原生 input 在 uni-input 内部
    // uni-app H5 将 password 属性转为 type="password"
    const passwordInput = cells.locator('.weui-cell').nth(3).locator('uni-input input').first()
    await expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('最大长度设置 maxlength 属性', async ({ page, gotoPage }) => {
    await gotoPage('input')

    const maxTitle = page.locator('.weui-cells__title').filter({ hasText: '最大长度' })
    const cells = maxTitle.locator('+ .weui-cells')
    // 原生 input 在 uni-input 内部，maxlength 属性在原生 input 上
    const input = cells.locator('uni-input input').first()
    await expect(input).toHaveAttribute('maxlength', '5')
  })

  test('禁用状态 input 不可编辑', async ({ page, gotoPage }) => {
    await gotoPage('input')

    const disabledTitle = page.locator('.weui-cells__title').filter({ hasText: '禁用状态' })
    const cells = disabledTitle.locator('+ .weui-cells')
    // 原生 input 在 uni-input 内部
    const input = cells.locator('uni-input input').first()
    await expect(input).toBeDisabled()
    // 初始有值
    await expect(input).toHaveValue('不可编辑的内容')
  })

  test('清除按钮在有值时显示并清空内容', async ({ page, gotoPage }) => {
    await gotoPage('input')

    const clearTitle = page.locator('.weui-cells__title').filter({ hasText: '清除按钮' })
    const cells = clearTitle.locator('+ .weui-cells')
    const input = cells.locator('uni-input input').first()

    // 初始无清除按钮
    await expect(cells.locator('.weui-icon-clear')).toHaveCount(0)

    // 输入内容
    await input.fill('hello')
    // 等待 v-model 更新，结果区域显示值
    await expect(page.locator('.result-text').filter({ hasText: '可清：hello' })).toBeVisible()

    // 清除按钮出现
    const clearBtn = cells.locator('.weui-icon-clear')
    await expect(clearBtn).toBeVisible()

    // 点击清除
    await clearBtn.click()
    // input 值应被清空
    await expect(input).toHaveValue('')
    // 清除按钮消失
    await expect(cells.locator('.weui-icon-clear')).toHaveCount(0)
  })

  test('输入文本更新结果区域', async ({ page, gotoPage }) => {
    await gotoPage('input')

    const basicTitle = page.locator('.weui-cells__title').filter({ hasText: '基础用法' })
    const cells = basicTitle.locator('+ .weui-cells')
    const input = cells.locator('uni-input input').first()

    await input.fill('测试文本')

    // 结果区域应显示输入值
    const resultText = page.locator('.result-text').filter({ hasText: '文本：' })
    await expect(resultText).toContainText('测试文本')
  })
})
