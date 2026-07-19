import { chromium } from 'playwright'

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  page.on('console', (msg) => console.log('CONSOLE:', msg.type(), msg.text()))
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message))

  await page.goto('http://localhost:5173/#/pages/gallery/gallery')
  await page.waitForSelector('.page__title', { timeout: 10_000 })

  // 检查 uni 环境
  const env = await page.evaluate(() => ({
    typeofUni: typeof uni,
    hasGetSystemInfoSync: typeof uni !== 'undefined' && typeof uni.getSystemInfoSync,
    uniPlatform: typeof uni !== 'undefined' && typeof uni.getSystemInfoSync === 'function'
      ? (() => { try { return uni.getSystemInfoSync().uniPlatform } catch { return 'error' } })()
      : 'n/a',
  }))
  console.log('ENV:', env)

  // 点击按钮
  const section = page.locator('.demo-section').filter({ hasText: '基础用法' })
  await section.locator('.weui-btn').first().click()
  await page.waitForTimeout(500)

  // 检查 weui-gallery
  const galleryCount = await page.locator('.weui-gallery').count()
  const galleryVisible = await page.locator('.weui-gallery').isVisible().catch(() => false)
  console.log('gallery count:', galleryCount, 'visible:', galleryVisible)

  // 截图
  await page.screenshot({ path: 'debug-gallery.png', fullPage: true })

  await browser.close()
})()
