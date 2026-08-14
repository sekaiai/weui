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
