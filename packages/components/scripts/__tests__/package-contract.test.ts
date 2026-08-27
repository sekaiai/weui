import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

interface PackageManifest {
  exports: {
    '.': Record<string, string>
    './ssr': Record<string, string>
  }
}

describe('npm package contract', () => {
  it('resolves declarations before the JavaScript import condition', () => {
    const manifest = JSON.parse(
      readFileSync(join(packageRoot(), 'package.json'), 'utf-8'),
    ) as PackageManifest

    expect(Object.keys(manifest.exports['.'])[0]).toBe('types')
  })

  it('resolves SSR declarations before the JavaScript import condition', () => {
    const manifest = JSON.parse(
      readFileSync(join(packageRoot(), 'package.json'), 'utf-8'),
    ) as PackageManifest

    expect(Object.keys(manifest.exports['./ssr'])[0]).toBe('types')
  })

  it.skipIf(!existsSync(join(packageRoot(), 'dist/vue3/index.mjs')))('automatically imports component CSS from the default entry', () => {
    const entry = readFileSync(join(packageRoot(), 'dist/vue3/index.mjs'), 'utf-8')
    expect(entry).toMatch(/^import\s+['"]\.\/index\.css['"];?/m)
  })

  it.skipIf(!existsSync(join(packageRoot(), 'dist/vue3/ssr.mjs')))('keeps CSS out of the SSR entry', () => {
    const entry = readFileSync(join(packageRoot(), 'dist/vue3/ssr.mjs'), 'utf-8')
    expect(entry).not.toMatch(/^import\s+['"].+\.css['"];?/m)
  })

  it.skipIf(!existsSync(join(packageRoot(), 'dist/vue3/types/index.d.ts')))('emits ESM-safe relative declaration specifiers', () => {
    const declaration = readFileSync(
      join(packageRoot(), 'dist/vue3/types/index.d.ts'),
      'utf-8',
    )
    expect(declaration).not.toMatch(/(?:from\s+|import\()(['"])(\.\.?\/[^'"]+)(?<!\.js)\1/)
  })
})

function packageRoot(): string {
  return join(process.cwd(), 'package.json').endsWith('packages/components/package.json')
    ? process.cwd()
    : join(process.cwd(), 'packages/components')
}
