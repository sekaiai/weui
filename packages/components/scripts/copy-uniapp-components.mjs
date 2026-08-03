import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transformUniAppSource } from './uni-app-transform.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, '..', 'src')
const outBase = join(__dirname, '..', 'dist', 'uni-app-components')
const internalDir = join(outBase, '_internal')

const standaloneImportMap = {
  '../cells': '../weui-cells',
  '../icon/icon.vue': '../weui-icon/weui-icon.vue',
  './picker-group.vue': '../weui-picker-group/weui-picker-group.vue',
}

function rewriteStandaloneImports(source) {
  const moduleSpecifierRe = /(['"])(\.\.?\/[^'"]+)\1/g
  let result = source.replace(moduleSpecifierRe, (match, quote, specifier) => {
    let rewritten = standaloneImportMap[specifier] ?? specifier

    if (rewritten.startsWith('../utils/')) {
      rewritten = rewritten.replace('../utils/', '../_internal/utils/')
    }

    if (rewritten === '../globals.d.ts') {
      rewritten = '../_internal/globals.d.ts'
    }

    return `${quote}${rewritten}${quote}`
  })

  return result.replaceAll('../globals.d.ts', '../_internal/globals.d.ts')
}

async function findVueFiles(currentDir) {
  const files = []
  const entries = await readdir(currentDir, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = join(currentDir, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === '__tests__') continue
      files.push(...await findVueFiles(sourcePath))
      continue
    }

    if (extname(entry.name) === '.vue') {
      files.push(sourcePath)
    }
  }

  return files
}

async function copyInternalFiles() {
  const globalTypesPath = join(srcDir, 'globals.d.ts')
  await mkdir(internalDir, { recursive: true })
  await writeFile(
    join(internalDir, 'globals.d.ts'),
    await readFile(globalTypesPath, 'utf-8'),
    'utf-8',
  )

  const utilsSourceDir = join(srcDir, 'utils')
  const utilsOutputDir = join(internalDir, 'utils')
  const utilsEntries = await readdir(utilsSourceDir, { withFileTypes: true })

  for (const entry of utilsEntries) {
    if (!entry.isFile() || extname(entry.name) !== '.ts') continue

    await mkdir(utilsOutputDir, { recursive: true })
    await writeFile(
      join(utilsOutputDir, entry.name),
      await readFile(join(utilsSourceDir, entry.name), 'utf-8'),
      'utf-8',
    )
  }
}

async function writeCellsCompatibilityIndex() {
  await mkdir(join(outBase, 'weui-cells'), { recursive: true })
  await writeFile(
    join(outBase, 'weui-cells', 'index.ts'),
    [
      "export { default as WeuiCells } from './weui-cells.vue'",
      "export { default as WeuiCellsTitle } from '../weui-cells-title/weui-cells-title.vue'",
      "export { default as WeuiCellsTips } from '../weui-cells-tips/weui-cells-tips.vue'",
      '',
    ].join('\n'),
    'utf-8',
  )
}

async function main() {
  await rm(outBase, { recursive: true, force: true })
  await mkdir(outBase, { recursive: true })

  const sourceFiles = await findVueFiles(srcDir)
  const componentNames = new Set()

  for (const sourcePath of sourceFiles) {
    const componentName = basename(sourcePath, '.vue')
    const outputName = `weui-${componentName}`

    if (componentNames.has(outputName)) {
      throw new Error(`Duplicate uni-app component output name: ${outputName}`)
    }
    componentNames.add(outputName)

    const outputDir = join(outBase, outputName)
    const outputPath = join(outputDir, `${outputName}.vue`)
    const source = await readFile(sourcePath, 'utf-8')
    const transformed = rewriteStandaloneImports(
      transformUniAppSource(source, sourcePath),
    )

    await mkdir(outputDir, { recursive: true })
    await writeFile(outputPath, transformed, 'utf-8')
  }

  await copyInternalFiles()
  await writeCellsCompatibilityIndex()

  console.log(`Generated ${sourceFiles.length} uni-app easycom components in ${outBase}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
