import { readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { transformUniAppSource } from '../uni-app-transform.mjs'
import { collectUniAppCompatibilityIssues } from '../check-uni-app-compat.mjs'

function findVueFiles(root: string): string[] {
  const files: string[] = []

  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.name === '__tests__') continue

    const filePath = join(root, entry.name)
    if (entry.isDirectory()) {
      files.push(...findVueFiles(filePath))
    } else if (entry.isFile() && extname(entry.name) === '.vue') {
      files.push(filePath)
    }
  }

  return files
}

describe('uni-app compatibility audit', () => {
  it('transformed component templates and WXSS pass the compatibility checker', () => {
    const sourceRoot = join(process.cwd(), 'packages/components/src')
    const issues = findVueFiles(sourceRoot).flatMap((filePath) => {
      const transformed = transformUniAppSource(readFileSync(filePath, 'utf-8'), filePath)
      return collectUniAppCompatibilityIssues(transformed, filePath)
    })

    expect(issues).toEqual([])
  })

  it('uses native mini-program form controls without retaining H5 fallbacks', () => {
    const cases = [
      ['switch-ctrl/switch-ctrl.vue', '<switch', 'type="checkbox"'],
      ['radio/radio.vue', '<radio', 'type="radio"'],
      ['radio/radio-group.vue', '<radio-group', ''],
      ['agree/agree.vue', '<checkbox', 'type="checkbox"'],
      ['checkbox/checkbox.vue', '<checkbox', 'type="checkbox"'],
      ['checkbox/checkbox-group.vue', '<checkbox-group', ''],
    ] as const

    for (const [relativePath, nativeTag, removedFallback] of cases) {
      const sourcePath = join(sourceRoot(), relativePath)
      const transformed = transformUniAppSource(readFileSync(sourcePath, 'utf-8'), sourcePath)
      const template = transformed.match(/<template\b[^>]*>([\s\S]*?)<\/template>/i)?.[1] ?? ''

      expect(template, relativePath).toContain(nativeTag)
      if (removedFallback) expect(template, relativePath).not.toContain(removedFallback)
      if (relativePath === 'checkbox/checkbox.vue' || relativePath === 'radio/radio.vue') {
        expect(template, relativePath).not.toContain('weui-icon-checked')
        expect(template, relativePath).not.toMatch(/class="weui-check"/)
      }
      expect(transformed, relativePath).not.toMatch(/<!--\s*#(?:ifdef|ifndef|endif)/)
    }
  })

  it('reports unsupported selectors and template attributes', () => {
    const source = `
      <template><a href="#"><img /></a></template>
      <style>.x[readonly] + .y { color: red; }</style>
    `

    expect(collectUniAppCompatibilityIssues(source)).toEqual([
      '<source>: unresolved template tag <a>',
      '<source>: unresolved template tag <img>',
      '<source>: unresolved href attribute',
      '<source>: attribute selector in WXSS: .x[readonly] + .y',
      '<source>: sibling selector in WXSS: .x[readonly] + .y',
    ])
  })
})

function sourceRoot(): string {
  return join(process.cwd(), 'packages/components/src')
}
