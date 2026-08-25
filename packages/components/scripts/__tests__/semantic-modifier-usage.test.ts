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
const rawCellModifierPattern = /class="[^"]*\bweui-cell_(?:active|access|link|warn|disabled|primary|vcode|uploader|readonly|wrap|vertical|select(?:-before|-after)?)\b/
const structuralCellMarkupAllowlist = new Set(['docs/components/panel.md'])
const cellGroupPropPattern = /<weui-cell-group\b[^>]*\b(?:title|footer|radio|checkbox)\s*=/
const directCellGroupChildPattern = /<weui-cell-group\b[^>]*>\s*<weui-cell\b/
const checkboxRadioFooterPattern = /<weui-(?:checkbox|radio)-group\b[^>]*\bfooter\s*=/
const removedFormComponentPattern = /\b(?:weui-form-(?:control|tips|opr|extra)|WeuiForm(?:Control|Tips|Opr|Extra))\b/
const removedFormComponentPaths = [
  'packages/components/src/form-control',
  'packages/components/src/form-tips',
  'packages/components/src/form-opr',
  'packages/components/src/form-extra',
]
const formDocPath = join(repositoryRoot, 'docs/components/form.md')

function collectPublicFiles(): string[] {
  return publicRoots.flatMap((root) => {
    const absolutePath = join(repositoryRoot, root)
    if (!existsSync(absolutePath)) return []
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

  it('does not retain removed standalone Form components in public sources or exports', () => {
    const files = [
      ...collectPublicFiles(),
      join(repositoryRoot, 'packages/components/src/index.ts'),
    ]
    const violations = files.flatMap((filePath) => {
      const source = readFileSync(filePath, 'utf8')
      return removedFormComponentPattern.test(source)
        ? [`${relative(repositoryRoot, filePath)}: ${removedFormComponentPattern}`]
        : []
    })

    expect(violations).toEqual([])
    for (const componentPath of removedFormComponentPaths) {
      expect(existsSync(join(repositoryRoot, componentPath)), componentPath).toBe(false)
    }
  })

  it('enforces the Cells and CellGroup boundaries in public sources', () => {
    const violations = collectPublicFiles().flatMap((filePath) => {
      const source = readFileSync(filePath, 'utf8')
      const relativePath = relative(repositoryRoot, filePath)
      const patterns = [
        cellGroupPropPattern,
        directCellGroupChildPattern,
        checkboxRadioFooterPattern,
      ]

      return patterns
        .filter((pattern) => pattern.test(source))
        .map((pattern) => `${relativePath}: ${pattern}`)
    })

    expect(violations).toEqual([])
  })

  it('keeps every Form documentation example wrapped by WeuiForm', () => {
    const source = readFileSync(formDocPath, 'utf8')
    const vueBlocks = [...source.matchAll(/```vue\n([\s\S]*?)\n```/g)].map((match) => match[1])
    const structureSection = source.match(/## 表单结构([\s\S]*?)(?=## Slots 与固定结构)/)?.[1]

    expect(vueBlocks.length).toBeGreaterThan(0)
    expect(vueBlocks.every((block) => /<weui-form\b/.test(block))).toBe(true)
    expect(structureSection).toBeDefined()
    expect(structureSection?.match(/<weui-cell-group form>/g)).toHaveLength(2)
    expect(structureSection?.match(/<weui-cells>/g)).toHaveLength(2)
    expect(source).not.toMatch(/<weui-form\b[^>]*\b(?:footer|control|title-content)(?:\s|=|>)/)
    expect(source).not.toMatch(/<template\s+#(?:control|title-content)>/)
  })
})
