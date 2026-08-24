import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const repositoryRoot = existsSync(join(process.cwd(), 'packages'))
  ? process.cwd()
  : join(process.cwd(), '../..')
const publicRoots = [
  'README.md',
  'packages/components/README.md',
  'docs/components',
  'docs/guide',
  'skills/weui-uniapp-setup',
  'examples/uni-app/src',
]

const forbiddenModifierPatterns = [
  /\b(?:ext-class|extClass)\s*=\s*["'][^"']*\bweui-/,
  /\bweui-cells_(?:form|radio|checkbox|after-title)\b/,
  /\bweui-cells__group_form-primary\b/,
  /\bweui-icon_msg\b/,
]
const rawCellModifierPattern = /class="[^"]*\bweui-cell_(?:active|access|warn|disabled|primary|vcode)\b/
const structuralCellMarkupAllowlist = new Set(['docs/components/panel.md'])

function collectPublicFiles(): string[] {
  return publicRoots.flatMap((root) => {
    const absolutePath = join(repositoryRoot, root)
    if (extname(absolutePath)) return [absolutePath]
    return collectFiles(absolutePath)
  })
}

function collectFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = join(directory, entry.name)
    if (entry.isDirectory()) return collectFiles(filePath)
    return /\.(?:md|vue|ts|tsx|js|mjs|json)$/.test(entry.name) ? [filePath] : []
  })
}

describe('semantic modifier usage', () => {
  it('does not expose WeUI modifier class names through public extClass or markup', () => {
    const violations = collectPublicFiles().flatMap((filePath) => {
      const source = readFileSync(filePath, 'utf8')
      const modifierViolations = forbiddenModifierPatterns
        .filter((pattern) => pattern.test(source))
        .map((pattern) => `${relative(repositoryRoot, filePath)}: ${pattern}`)
      const relativePath = relative(repositoryRoot, filePath)
      if (rawCellModifierPattern.test(source) && !structuralCellMarkupAllowlist.has(relativePath)) {
        modifierViolations.push(`${relativePath}: ${rawCellModifierPattern}`)
      }
      return modifierViolations
    })

    expect(violations).toEqual([])
  })

  it('documents the discoverable modifier props', () => {
    const sources = collectPublicFiles().map((filePath) => readFileSync(filePath, 'utf8')).join('\n')

    expect(sources).toContain('<weui-cells form>')
    expect(sources).toContain('<weui-cells checkbox>')
    expect(sources).toContain('<weui-cell-group form primary>')
    expect(sources).toMatch(/<weui-icon[^>]*\bmsg\b/)
  })
})
