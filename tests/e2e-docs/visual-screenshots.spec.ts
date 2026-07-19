import { test, expect } from './helpers'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const OUT_DIR = join(__dirname, '__screenshots__')

function ensureDir() {
  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true })
  }
}

async function screenshot(page: any, name: string) {
  const path = join(OUT_DIR, `${name}.png`)
  await page.screenshot({ path, fullPage: true })
  console.log(`screenshot: ${path}`)
}

test.describe('视觉截图', () => {
  test.beforeAll(() => {
    ensureDir()
  })

  test('input 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('input')
    await screenshot(page, 'input')
  })

  test('checkbox 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('checkbox')
    await screenshot(page, 'checkbox')
  })

  test('searchbar 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('searchbar')
    await screenshot(page, 'searchbar')
  })

  test('uploader 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('uploader')
    await screenshot(page, 'uploader')
  })

  test('dialog 页面 - 打开弹窗', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('dialog')
    const demo = page.locator('.demo-block').first()
    const btn = demo.locator('.weui-btn').first()
    if (await btn.count() > 0) {
      await btn.click()
      await page.waitForSelector('.weui-mask', { state: 'visible', timeout: 5_000 })
      await page.waitForTimeout(500)
      await screenshot(page, 'dialog-open')
      await page.locator('.weui-mask').click({ position: { x: 10, y: 10 } })
      await page.waitForSelector('.weui-mask', { state: 'detached', timeout: 5_000 })
    } else {
      await screenshot(page, 'dialog')
    }
  })

  test('half-screen-dialog 页面 - 打开弹窗', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('half-screen-dialog')
    const demo = page.locator('.demo-block').first()
    const btn = demo.locator('.weui-btn').first()
    if (await btn.count() > 0) {
      await btn.click()
      await page.waitForSelector('.weui-mask', { state: 'visible', timeout: 5_000 })
      await page.waitForTimeout(500)
      await screenshot(page, 'half-screen-dialog-open')
      await page.locator('.weui-mask').click({ position: { x: 10, y: 10 } })
      await page.waitForSelector('.weui-mask', { state: 'detached', timeout: 5_000 })
    } else {
      await screenshot(page, 'half-screen-dialog')
    }
  })

  test('toptips 页面 - 显示提示', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('toptips')
    const demo = page.locator('.demo-block').first()
    const btn = demo.locator('.weui-btn').first()
    if (await btn.count() > 0) {
      await btn.click()
      await page.waitForTimeout(800)
      await screenshot(page, 'toptips-show')
      await page.waitForTimeout(3_000)
    } else {
      await screenshot(page, 'toptips')
    }
  })

  test('picker 页面 - 打开选择器', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('picker')
    const demo = page.locator('.demo-block').first()
    const btn = demo.locator('.weui-btn').first()
    if (await btn.count() > 0) {
      await btn.click()
      await page.waitForSelector('.weui-picker', { state: 'visible', timeout: 5_000 })
      await page.waitForTimeout(500)
      await screenshot(page, 'picker-open')
      await page.locator('.weui-mask').click({ position: { x: 10, y: 10 } })
      await page.waitForSelector('.weui-picker', { state: 'detached', timeout: 5_000 })
    } else {
      await screenshot(page, 'picker')
    }
  })

  test('slideview 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('slideview')
    await screenshot(page, 'slideview')
  })

  test('navbar 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('navbar')
    await screenshot(page, 'navbar')
  })

  test('flex 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('flex')
    await screenshot(page, 'flex')
  })

  test('panel 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('panel')
    await screenshot(page, 'panel')
  })

  test('list 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('list')
    await screenshot(page, 'list')
  })

  test('button 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('button')
    await screenshot(page, 'button')
  })

  test('form 页面', async ({ page, gotoDocsPage }) => {
    await gotoDocsPage('form')
    await screenshot(page, 'form')
  })
})
