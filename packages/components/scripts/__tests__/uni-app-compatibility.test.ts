import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
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
    const root = sourceRoot()
    const issues = findVueFiles(root).flatMap((filePath) => {
      const transformed = transformUniAppSource(readFileSync(filePath, 'utf-8'), filePath)
      return collectUniAppCompatibilityIssues(transformed, filePath)
    })

    expect(issues).toEqual([])
  })

  it('removes nested WeUI component dependencies from uni-app output', () => {
    const cases = [
      {
        relativePath: 'cell/cell-group.vue',
        forbiddenTemplate: [
          '<weui-cells',
          '<weui-cell',
        ],
        forbiddenScript: [],
      },
      {
        relativePath: 'msg/msg.vue',
        forbiddenTemplate: ['weui-icon'],
        forbiddenScript: ['WeuiIcon'],
      },
      {
        relativePath: 'picker/picker.vue',
        forbiddenTemplate: [],
        forbiddenScript: [],
      },
      {
        relativePath: 'form/form.vue',
        forbiddenTemplate: ['<weui-form-tips', '<weui-form-opr', '<weui-form-extra'],
        forbiddenScript: [],
      },
    ] as const

    for (const { relativePath, forbiddenTemplate, forbiddenScript } of cases) {
      const sourcePath = join(sourceRoot(), relativePath)
      const transformed = transformUniAppSource(readFileSync(sourcePath, 'utf-8'), sourcePath)
      const template = transformed.match(/<template\b[^>]*>([\s\S]*?)<\/template>/i)?.[1] ?? ''

      for (const fragment of forbiddenTemplate) {
        expect(template, `${relativePath} template`).not.toContain(fragment)
      }
      for (const fragment of forbiddenScript) {
        expect(transformed, `${relativePath} script`).not.toContain(fragment)
      }
    }

    const pickerTransformed = transformUniAppSource(
      readFileSync(join(sourceRoot(), 'picker/picker.vue'), 'utf-8'),
      join(sourceRoot(), 'picker/picker.vue'),
    )
    expect(pickerTransformed).toContain("import WeuiPickerGroup from './picker-group.vue'")

    const cellGroupSource = readFileSync(
      join(sourceRoot(), 'cell/cell-group.vue'),
      'utf-8',
    )
    const cellGroupTemplate = transformUniAppSource(
      cellGroupSource,
      join(sourceRoot(), 'cell/cell-group.vue'),
    ).match(/<template\b[^>]*>([\s\S]*?)<\/template>/i)?.[1] ?? ''
    expect(cellGroupTemplate.match(/<([a-z][\w-]*)\b/gi)).toEqual(['<view', '<slot'])
    expect(cellGroupTemplate).toContain(':class="groupClass"')
    expect(cellGroupSource).toContain("['weui-cells__group']")

    const formSourcePath = join(sourceRoot(), 'form/form.vue')
    const formTransformed = transformUniAppSource(
      readFileSync(formSourcePath, 'utf-8'),
      formSourcePath,
    )
    const formTemplate = formTransformed.match(/<template\b[^>]*>([\s\S]*?)<\/template>/i)?.[1] ?? ''
    expect(formTemplate).toContain('class="weui-form__bd"')
    expect(formTemplate).toContain('weui-form__control-area')
    expect(formTemplate).toContain('class="weui-form__ft"')
    expect(formTemplate).toContain('<slot />')
    for (const slotName of ['title', 'desc', 'tips', 'opr', 'tips-b', 'extra']) {
      expect(formTemplate, `form slot ${slotName}`).toContain(`name="${slotName}"`)
    }
    for (const removedSlot of ['control', 'title-content', 'footer']) {
      expect(formTemplate, `removed form slot ${removedSlot}`).not.toContain(`name="${removedSlot}"`)
    }
    expect(formTemplate).not.toMatch(/<weui-form-(?:tips|opr|extra)\b/i)
  })

  it('does not retain standalone Cells title/tips sources', () => {
    for (const componentName of ['cells-title', 'cells-tips']) {
      expect(existsSync(join(sourceRoot(), 'cells', `${componentName}.vue`)), componentName).toBe(false)
    }
  })

  it('adds options.virtualHost = true to every uni-app component', () => {
    for (const filePath of findVueFiles(sourceRoot())) {
      const transformed = transformUniAppSource(readFileSync(filePath, 'utf-8'), filePath)
      expect(transformed, filePath).toMatch(
        /options\s*:\s*\{[\s\S]*?virtualHost\s*:\s*true\b/,
      )
    }
  })

  it('publishes an easycom file for every component tag used by the example', () => {
    const packageRoot = dirname(sourceRoot())
    const exampleRoot = resolve(packageRoot, '../../examples/uni-app/src')
    const outputRoot = join(packageRoot, 'dist/uni-app')
    const tags = new Set<string>()

    for (const filePath of findVueFiles(exampleRoot)) {
      const source = readFileSync(filePath, 'utf-8')
      for (const match of source.matchAll(/<weui-([a-z0-9-]+)\b/gi)) {
        tags.add(match[1].toLowerCase())
      }
    }

    const missing = [...tags]
      .filter((tag) => !existsSync(join(outputRoot, `${tag}.vue`)))
      .sort()

    expect(missing).toEqual([])
  })

  it('does not retain standalone Form component sources for uni-app generation', () => {
    for (const componentName of ['form-control', 'form-tips', 'form-opr', 'form-extra']) {
      expect(existsSync(join(sourceRoot(), componentName)), componentName).toBe(false)
    }
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

  it('reports unresolved nested WeUI component tags', () => {
    expect(collectUniAppCompatibilityIssues('<template><weui-icon /></template>')).toEqual([
      '<source>: unresolved custom component <weui-icon>',
    ])
  })
})

function sourceRoot(): string {
  const packageRoot = existsSync(join(process.cwd(), 'src'))
    ? process.cwd()
    : join(process.cwd(), 'packages/components')
  return join(packageRoot, 'src')
}
