import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transformUniAppSource } from './uni-app-transform.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, '..', 'src')
const outBase = join(__dirname, '..', 'dist', 'uni-app')
const internalDir = join(outBase, '_internal')

const componentOutputAliases = {
  'switch-ctrl': ['switch', 'switch-ctrl'],
}

const serviceSourceFiles = [
  'actionsheet/actionsheet.ts',
  'dialog/dialog.ts',
  'gallery/gallery.ts',
  'half-screen-dialog/half-screen-dialog.ts',
  'picker/picker.ts',
  'toast/toast.ts',
  'toptips/toptips.ts',
]

// Remap specifiers that point at sibling components. In the flat output every
// component lives directly under `outBase`, so cross-component imports use a
// single leading dot (`./`) instead of `../`.
const standaloneImportMap = {
  '../cells': './cells',
  '../icon/icon.vue': './icon.vue',
  './picker-group.vue': './picker-group.vue',
}

function rewriteStandaloneImports(source) {
  const moduleSpecifierRe = /(['"])(\.\.?\/[^'"]+)\1/g
  let result = source.replace(moduleSpecifierRe, (match, quote, specifier) => {
    let rewritten = standaloneImportMap[specifier] ?? specifier

    if (rewritten.startsWith('../utils/')) {
      rewritten = rewritten.replace('../utils/', './_internal/utils/')
    }

    if (rewritten === '../globals.d.ts') {
      rewritten = './_internal/globals.d.ts'
    }

    return `${quote}${rewritten}${quote}`
  })

  return result.replaceAll('../globals.d.ts', './_internal/globals.d.ts')
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

// Flat compatibility shim so `cell-group.vue` (which pulls the named export
// `WeuiCells` from `../cells`) still resolves.
// Placed at the root as `cells.ts` so the output stays flat.
async function writeCellsCompatibilityIndex() {
  await writeFile(
    join(outBase, 'cells.ts'),
    [
      "export { default as WeuiCells } from './cells.vue'",
      "export type { WeuiCellsProps } from './cells.vue'",
      '',
    ].join('\n'),
    'utf-8',
  )
}

async function writeBarrelIndex() {
  await writeFile(
    join(outBase, 'index.ts'),
    [
      "export { Actionsheet } from './actionsheet'",
      "export type { ActionsheetItem, ActionsheetShowOptions, ActionsheetShowResult } from './actionsheet'",
      "export { Dialog } from './dialog'",
      "export type { DialogButton, DialogShowOptions, DialogAlertOptions, DialogConfirmOptions, DialogShowResult } from './dialog'",
      "export { Gallery } from './gallery'",
      "export type { GalleryShowOptions } from './gallery'",
      "export { HalfScreenDialog } from './half-screen-dialog'",
      "export type { HalfScreenDialogButton, HalfScreenDialogShowOptions, HalfScreenDialogShowResult } from './half-screen-dialog'",
      "export { Picker } from './picker'",
      "export type { PickerColumn, PickerOption, PickerShowOptions, PickerShowResult } from './picker'",
      "export { Toast } from './toast'",
      "export type { ToastType, ToastShowOptions } from './toast'",
      "export { Toptips } from './toptips'",
      "export type { ToptipsType, ToptipsShowOptions } from './toptips'",
      '',
    ].join('\n'),
    'utf-8',
  )
}

async function copyServiceFiles() {
  for (const relativePath of serviceSourceFiles) {
    const sourcePath = join(srcDir, relativePath)
    const outputPath = join(outBase, basename(relativePath))
    const source = await readFile(sourcePath, 'utf-8')
    const transformed = rewriteStandaloneImports(
      transformUniAppSource(source, sourcePath),
    )
    await writeFile(outputPath, transformed, 'utf-8')
  }
}

export async function generateUniAppOutput() {
  await rm(outBase, { recursive: true, force: true })
  await mkdir(outBase, { recursive: true })

  const sourceFiles = await findVueFiles(srcDir)
  const componentNames = new Set()

  for (const sourcePath of sourceFiles) {
    const componentName = basename(sourcePath, '.vue')
    const source = await readFile(sourcePath, 'utf-8')
    const transformed = rewriteStandaloneImports(
      transformUniAppSource(source, sourcePath),
    )
    const outputNames = componentOutputAliases[componentName] ?? [componentName]

    for (const outputName of outputNames) {
      if (componentNames.has(outputName)) {
        throw new Error(`Duplicate uni-app component output name: ${outputName}`)
      }
      componentNames.add(outputName)
      await writeFile(join(outBase, `${outputName}.vue`), transformed, 'utf-8')
    }
  }

  await copyInternalFiles()
  await copyServiceFiles()
  await writeCellsCompatibilityIndex()
  await writeBarrelIndex()

  console.log(`Generated ${sourceFiles.length} uni-app easycom components in ${outBase}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateUniAppOutput().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
