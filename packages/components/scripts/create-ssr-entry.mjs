import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const clientEntryPath = resolve(packageRoot, 'dist/vue3/index.mjs')
const ssrEntryPath = resolve(packageRoot, 'dist/vue3/ssr.mjs')
const cssImport = /^import\s+['"]\.\/index\.css['"];?/m

const clientEntry = await readFile(clientEntryPath, 'utf-8')
if (!cssImport.test(clientEntry)) {
  throw new Error('Vue entry is missing the expected ./index.css import')
}

const ssrEntry = clientEntry.replace(cssImport, '')
if (cssImport.test(ssrEntry)) {
  throw new Error('SSR entry still contains the ./index.css import')
}

await writeFile(ssrEntryPath, ssrEntry, 'utf-8')
