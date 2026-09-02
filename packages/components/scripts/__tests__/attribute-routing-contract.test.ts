import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const packageRoot = join(process.cwd(), 'package.json').endsWith('packages/components/package.json')
  ? process.cwd()
  : join(process.cwd(), 'packages/components')

function findVueFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : findVueFiles(path)
    return entry.name.endsWith('.vue') ? [path] : []
  })
}

describe('component external-attribute routing contract', () => {
  const componentFiles = findVueFiles(join(packageRoot, 'src'))

  it('gives every component an extClass prop and an explicit main-anchor attrs binding', () => {
    expect(componentFiles).toHaveLength(46)

    for (const file of componentFiles) {
      const source = readFileSync(file, 'utf-8')
      expect(source, file).toContain('inheritAttrs: false')
      expect(source, file).toContain('extClass?: string')
      expect(source, file).toContain('v-bind="$attrs"')
    }
  })

  it('exposes wrapperClass only on components with a structural wrapper', () => {
    const wrappers = [
      'actionsheet/actionsheet.vue',
      'cell/cell.vue',
      'dialog/dialog.vue',
      'half-screen-dialog/half-screen-dialog.vue',
      'input/input.vue',
      'picker/picker.vue',
      'toast/toast.vue',
    ]

    for (const relativePath of wrappers) {
      const source = readFileSync(join(packageRoot, 'src', relativePath), 'utf-8')
      expect(source, relativePath).toContain('wrapperClass?: string')
    }
  })
})
