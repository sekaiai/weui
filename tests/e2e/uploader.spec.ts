import { test, expect, expectNoErrors } from './helpers'

/**
 * Uploader 组件 E2E 测试
 * 验证：页面可访问性 + WeUI 类名 + 头部信息 + 状态渲染 + 提示/隐藏头部/限制数量 + 点击不报错
 *
 * 注意：uni.chooseImage 在 H5 测试环境无法真正选择文件，
 * 本测试只验证渲染与点击交互不抛错，不验证真实文件上传。
 */
test.describe('Uploader 组件', () => {
  test('页面正常加载，无 console 错误', async ({ page, gotoPage, consoleErrors, pageErrors }) => {
    await gotoPage('uploader')
    await expect(page.locator('.page__title')).toContainText('Uploader')
    expectNoErrors(consoleErrors, pageErrors)
  })

  test('渲染基础类名结构', async ({ page, gotoPage }) => {
    await gotoPage('uploader')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const uploader = section.locator('.weui-uploader').first()
    await expect(uploader).toBeVisible()

    // 头部、主体、文件列表、上传按钮均存在
    await expect(uploader.locator('.weui-uploader__hd')).toBeVisible()
    await expect(uploader.locator('.weui-uploader__bd')).toBeVisible()
    // __files 容器可能因无显式高度而被判定为 hidden，验证其存在于 DOM 即可
    await expect(uploader.locator('.weui-uploader__files')).toHaveCount(1)
    await expect(uploader.locator('.weui-uploader__input-box')).toBeVisible()
    await expect(uploader.locator('.weui-uploader__input')).toBeVisible()

    // 基础用法有 2 个文件
    await expect(uploader.locator('.weui-uploader__file')).toHaveCount(2)
  })

  test('头部 title 与 info 文字正确', async ({ page, gotoPage }) => {
    await gotoPage('uploader')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    await expect(section.locator('.weui-uploader__title')).toContainText('图片上传')
    // 基础用法 2 个文件，count=9，info="2/9"
    await expect(section.locator('.weui-uploader__info')).toContainText('2/9')
  })

  test('上传状态 section 渲染状态文件与状态文字', async ({ page, gotoPage }) => {
    await gotoPage('uploader')

    const section = page.locator('.demo-section').filter({ hasText: '上传状态' })
    const uploader = section.locator('.weui-uploader').first()

    // 3 个文件
    await expect(uploader.locator('.weui-uploader__file')).toHaveCount(3)

    // success 状态不加 _status 类，loading/error 加 _status 类 -> 共 2 个状态文件
    await expect(uploader.locator('.weui-uploader__file_status')).toHaveCount(2)

    // 状态文字：loading 显示 "50%"，error 显示 "上传失败"
    const contents = uploader.locator('.weui-uploader__file-content')
    await expect(contents).toHaveCount(2)
    await expect(contents.filter({ hasText: '50%' })).toBeVisible()
    await expect(contents.filter({ hasText: '上传失败' })).toBeVisible()
  })

  test('隐藏头部 section 不渲染 __hd', async ({ page, gotoPage }) => {
    await gotoPage('uploader')

    const section = page.locator('.demo-section').filter({ hasText: '隐藏头部' })
    const uploader = section.locator('.weui-uploader').first()

    // 头部不渲染
    await expect(uploader.locator('.weui-uploader__hd')).toHaveCount(0)
    // 主体仍渲染
    await expect(uploader.locator('.weui-uploader__bd')).toBeVisible()
  })

  test('提示文字 section 渲染 tips', async ({ page, gotoPage }) => {
    await gotoPage('uploader')

    const section = page.locator('.demo-section').filter({ hasText: '提示文字' })
    await expect(section.locator('.weui-uploader__tips')).toBeVisible()
    await expect(section.locator('.weui-uploader__tips')).toContainText('最多上传9张图片，单张不超过2MB')
  })

  test('限制数量 section info 为 1/2', async ({ page, gotoPage }) => {
    await gotoPage('uploader')

    const section = page.locator('.demo-section').filter({ hasText: '限制数量' })
    // 1 个文件，count=2，info="1/2"
    await expect(section.locator('.weui-uploader__info')).toContainText('1/2')
    await expect(section.locator('.weui-uploader__file')).toHaveCount(1)
    // 文件数 < count，仍可上传
    await expect(section.locator('.weui-uploader__input-box')).toBeVisible()
  })

  test('点击上传按钮不抛错', async ({ page, gotoPage }) => {
    await gotoPage('uploader')

    const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
    const inputBox = section.locator('.weui-uploader__input-box').first()
    await expect(inputBox).toBeVisible()

    // uni.chooseImage 在 H5 测试环境无法真正选择文件，仅验证点击不抛错
    // 监听 filechooser 事件以防阻塞（uni H5 会触发 input file 点击）
    const fileChooserPromise = page.waitForEvent('filechooser', { timeout: 3000 }).catch(() => null)
    await inputBox.click()
    await fileChooserPromise

    // 点击后按钮仍可见
    await expect(inputBox).toBeVisible()
  })
})
