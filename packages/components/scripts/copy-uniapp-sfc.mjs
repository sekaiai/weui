import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isCopyableFile, transformUniAppSource } from './uni-app-transform.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, '..', 'src')
const outBase = join(__dirname, '..', 'dist', 'uni-app')
const outSrcDir = join(outBase, 'src')

async function copyAndTransform(srcPath, outPath) {
  if (!isCopyableFile(srcPath)) {
    return
  }

  const content = await readFile(srcPath, 'utf-8')
  const transformed = transformUniAppSource(content, srcPath)

  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, transformed, 'utf-8')
}

async function walkDir(srcPath, outPath) {
  const entries = await readdir(srcPath, { withFileTypes: true })

  for (const entry of entries) {
    const srcEntry = join(srcPath, entry.name)
    const outEntry = join(outPath, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === '__tests__') continue
      await walkDir(srcEntry, outEntry)
    } else {
      await copyAndTransform(srcEntry, outEntry)
    }
  }
}

async function main() {
  console.log(`Copying SFC files from ${srcDir} to ${outSrcDir}...`)

  await mkdir(outBase, { recursive: true })
  await walkDir(srcDir, outSrcDir)
  await writeFile(join(outBase, 'index.ts'), `export * from './src/index'\n`, 'utf-8')

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
