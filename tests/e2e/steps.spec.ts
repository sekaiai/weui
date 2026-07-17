import { test, expect, expectNoErrors } from './helpers'

/**
 * Steps 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 不同方向/状态渲染
 *
 * 注意：
 * - 水平方向类名为 `weui-steps_horizonal`（单 r，非 horizontal）
 * - title/desc 类名为双下划线 `weui-steps__item__title` / `weui-steps__item__desc`
 */
test.describe('Steps 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('steps')
    await expect(page.locator('.page__title')).toContainText('Steps')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('水平方向渲染 weui-steps_horizonal 类（单 r）', async ({ page, gotoPage }) => {
    await gotoPage('steps')

    // 基础用法 section 为水平方向
    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const steps = section.locator('.weui-steps').first()
    await expect(steps).toBeVisible()
    // 注意：类名是 horizonal（单 r），不是 horizontal
    await expect(steps).toHaveClass(/weui-steps_horizonal/)
    // 不应包含 vertical 类
    await expect(steps).not.toHaveClass(/weui-steps_vertical/)
  })

  test('基础用法渲染 3 个步骤且 current=1 时第一个为成功态', async ({ page, gotoPage }) => {
    await gotoPage('steps')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const items = section.locator('.weui-steps__item')
    await expect(items).toHaveCount(3)

    // current=1 表示 index 0 已完成（带 success 类），index 1 为当前
    await expect(items.nth(0)).toHaveClass(/weui-steps__item_success/)
    // 后续步骤不应带 success 类
    await expect(items.nth(1)).not.toHaveClass(/weui-steps__item_success/)
    await expect(items.nth(2)).not.toHaveClass(/weui-steps__item_success/)
  })

  test('步骤项渲染 title 与 desc（双下划线类名）', async ({ page, gotoPage }) => {
    await gotoPage('steps')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const firstItem = section.locator('.weui-steps__item').first()

    // 验证 inner 容器存在
    await expect(firstItem.locator('.weui-steps__item__inner')).toBeVisible()

    // 验证 title 与 desc 类名（双下划线）
    const title = firstItem.locator('.weui-steps__item__title')
    const desc = firstItem.locator('.weui-steps__item__desc')
    await expect(title).toBeVisible()
    await expect(desc).toBeVisible()
    await expect(title).not.toBeEmpty()
    await expect(desc).not.toBeEmpty()
  })

  test('不同 current 值控制成功步骤数量', async ({ page, gotoPage }) => {
    await gotoPage('steps')

    // "不同 current" section 内 .demo-stack 有 3 个 steps，current 分别为 0/1/2
    const section = page.locator('.demo-section').filter({ hasText: '不同 current' })
    const stacks = section.locator('.demo-stack')
    const stepsList = stacks.locator('.weui-steps')
    await expect(stepsList).toHaveCount(3)

    // current=0：无 success 步骤
    const steps0 = stepsList.nth(0).locator('.weui-steps__item')
    await expect(steps0.nth(0)).not.toHaveClass(/weui-steps__item_success/)

    // current=1：1 个 success 步骤
    const steps1 = stepsList.nth(1).locator('.weui-steps__item')
    await expect(steps1.nth(0)).toHaveClass(/weui-steps__item_success/)

    // current=2：2 个 success 步骤
    const steps2 = stepsList.nth(2).locator('.weui-steps__item')
    await expect(steps2.nth(0)).toHaveClass(/weui-steps__item_success/)
    await expect(steps2.nth(1)).toHaveClass(/weui-steps__item_success/)
  })

  test('垂直方向渲染 weui-steps_vertical 类', async ({ page, gotoPage }) => {
    await gotoPage('steps')

    const section = page.locator('.demo-section').filter({ hasText: '垂直方向' })
    const steps = section.locator('.weui-steps').first()
    await expect(steps).toBeVisible()
    await expect(steps).toHaveClass(/weui-steps_vertical/)
    // 不应同时包含水平类
    await expect(steps).not.toHaveClass(/weui-steps_horizonal/)

    // 垂直方向同样有 3 个步骤
    const items = steps.locator('.weui-steps__item')
    await expect(items).toHaveCount(3)
  })

  test('仅标题模式不渲染 desc', async ({ page, gotoPage }) => {
    await gotoPage('steps')

    const section = page.locator('.demo-section').filter({ hasText: '仅标题' })
    const items = section.locator('.weui-steps__item')
    await expect(items).toHaveCount(3)

    // 每个 step 应有 title
    await expect(items.nth(0).locator('.weui-steps__item__title')).toBeVisible()
    // 不应渲染 desc
    await expect(items.nth(0).locator('.weui-steps__item__desc')).toHaveCount(0)
  })

  test('扩展类名通过 ext-class 注入 my-steps', async ({ page, gotoPage }) => {
    await gotoPage('steps')

    const section = page.locator('.demo-section').filter({ hasText: '扩展类名' })
    const steps = section.locator('.weui-steps').first()
    await expect(steps).toBeVisible()
    await expect(steps).toHaveClass(/my-steps/)
  })
})
