/**
 * 将 src/ 下的 .vue 和 .ts 文件经 platformTransform 处理后复制到 dist/uni-app/src/
 * 保留 SFC 形式，供 uni-app easycom 引入
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripConditionalCompile, transformTemplateTags, replacePlatformConstant } from '../build-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, '..', 'src')
const outBase = join(__dirname, '..', 'dist', 'uni-app')
const outSrcDir = join(outBase, 'src')

async function copyAndTransform(srcPath: string, outPath: string): Promise<void> {
  const ext = extname(srcPath)
  if (ext !== '.vue' && ext !== '.ts' && ext !== '.scss' && ext !== '.d.ts') {
    return
  }

  const content = await readFile(srcPath, 'utf-8')
  let transformed = content

  if (ext === '.vue' || ext === '.ts') {
    // 1. 条件编译移除（uni-app 平台：移除 #ifdef H5 块）
    transformed = stripConditionalCompile(transformed, 'uni-app')
    // 2. __IS_H5__ 常量替换为 false
    transformed = replacePlatformConstant(transformed, 'uni-app')
  }

  if (ext === '.vue') {
    // 3. 标签转换
    transformed = transformTemplateTags(transformed)
  }

  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, transformed, 'utf-8')
}

async function walkDir(srcPath: string, outPath: string): Promise<void> {
  const entries = await readdir(srcPath, { withFileTypes: true })
  for (const entry of entries) {
    const srcEntry = join(srcPath, entry.name)
    const outEntry = join(outPath, entry.name)
    if (entry.isDirectory()) {
      // 跳过 __tests__ 目录（测试文件不打包到产物）
      if (entry.name === '__tests__') continue
      await walkDir(srcEntry, outEntry)
    } else {
      await copyAndTransform(srcEntry, outEntry)
    }
  }
}

async function main(): Promise<void> {
  console.log(`Copying SFC files from ${srcDir} to ${outSrcDir}...`)

  // 清空并重建 outBase 目录
  await mkdir(outBase, { recursive: true })

  // 复制 src/ 到 dist/uni-app/src/（含组件 SFC 内联样式，无需独立 styles 目录）
  await walkDir(srcDir, outSrcDir)

  // 复制 index.ts 到 dist/uni-app/index.ts（如果 index.ts 在 src/ 下，上一步已复制到 src/index.ts）
  // 这里额外创建一个 dist/uni-app/index.ts 作为入口，re-export src/index
  const indexOut = join(outBase, 'index.ts')
  await writeFile(indexOut, `export * from './src/index'\n`, 'utf-8')

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
