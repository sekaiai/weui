/**
 * 批量替换 .vue 文件 <template> 块内的标签
 * view→div、text→span、image→img
 * 仅替换 <template> 块内，不替换 <script> 块
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, '..', 'src')

// 标签映射：HTML ← uni-app（我们要把 uni-app 标签改为 HTML）
const TAG_MAP: Record<string, string> = {
  view: 'div',
  text: 'span',
  image: 'img',
}

async function walkDir(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkDir(fullPath)))
    } else if (entry.name.endsWith('.vue')) {
      files.push(fullPath)
    }
  }
  return files
}

function transformTags(content: string): string {
  let transformed = content
  for (const [uniTag, htmlTag] of Object.entries(TAG_MAP)) {
    // 开标签：<view 后面必须跟空格、> 或 /（避免误匹配 scroll-view/picker-view 等）
    transformed = transformed.replace(
      new RegExp(`<${uniTag}(\\s|>|/)`, 'g'),
      `<${htmlTag}$1`,
    )
    // 闭标签
    transformed = transformed.replace(
      new RegExp(`</${uniTag}>`, 'g'),
      `</${htmlTag}>`,
    )
  }
  return transformed
}

function transformTemplate(source: string): string {
  // 思路：把 SFC 按 <script>...</script> 块切分，只对 script 块之外的
  // 内容（即 <template> 块及其内部，含嵌套 <template v-if>/<template v-for>）
  // 做标签替换。这样能正确处理嵌套 template，又不会动到 <script> 里的
  // 字符串字面量（如类名 'weui-cell__bd'）。
  // 注：本仓库 .vue 文件均无 <style> 块，故只处理 <script>。
  const scriptBlockRegex = /<script\b[^>]*>[\s\S]*?<\/script>/g
  let result = ''
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = scriptBlockRegex.exec(source)) !== null) {
    // script 块之前的内容（template 区域）——做替换
    result += transformTags(source.slice(lastIndex, match.index))
    // script 块本身——保持原样
    result += match[0]
    lastIndex = match.index + match[0].length
  }
  // 末尾剩余内容（若有）——做替换
  result += transformTags(source.slice(lastIndex))
  return result
}

async function main(): Promise<void> {
  const files = await walkDir(srcDir)
  console.log(`Found ${files.length} .vue files`)

  let modifiedCount = 0
  for (const file of files) {
    const content = await readFile(file, 'utf-8')
    const transformed = transformTemplate(content)
    if (transformed !== content) {
      await writeFile(file, transformed, 'utf-8')
      modifiedCount++
      console.log(`Modified: ${file.replace(srcDir, 'src')}`)
    }
  }
  console.log(`Done. Modified ${modifiedCount} files.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
