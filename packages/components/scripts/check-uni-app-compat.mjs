import { readdir, readFile } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const UNSUPPORTED_TAGS = ['article', 'em', 'h2', 'i', 'a', 'div', 'span', 'img']
const NESTED_WEUI_COMPONENT_RE = /<(weui-[a-z0-9-]+)\b/gi
// 被 TAG_MAP 改写成 uni-app 标签、但已不再是空元素（void）的标签。
// 目前只有 image（来自 img）：Vue 把 img 当空元素，所以源码 <img ...> 合法，
// 但 transformTags() 只改标签名、不补斜杠；而 uni-app 的 image 不是空元素，
// 必须写成 <image ... />（或成对闭合），否则消费端 Vue 编译器报 "Element is missing end tag"。
const VOID_MAPPED_TAGS = ['image']

// 提取根 <template> 内容。必须用「配平」方式而非非贪婪正则：组件模板里常见
// 嵌套的 <template v-if>/<template v-else>，非贪婪正则会停在第一个 </template>，
// 导致其后半段模板（例如 half-screen-dialog 的头像 <img>）完全逃过校验。
function extractTemplate(source) {
  const withoutComments = source.replace(/<!--[\s\S]*?-->/g, '')
  const re = /<\/?template\b[^>]*>/gi
  let depth = 0
  let start = -1
  let match

  while ((match = re.exec(withoutComments)) !== null) {
    const isClose = match[0].startsWith('</')
    if (!isClose && depth === 0) start = re.lastIndex
    depth += isClose ? -1 : 1
    if (depth === 0 && start !== -1) {
      return withoutComments.slice(start, match.index)
    }
    if (depth < 0) {
      depth = 0
      start = -1
    }
  }

  return ''
}

function extractStyleBlocks(source) {
  return [...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1])
}

/**
 * 扫描字符串中某个标签的所有开标签，判断每个开标签是否自闭合。
 *
 * 先用 `<tag` 定位起点，再以「引号感知」的方式逐个字符前进到真正的结束
 * `>`：因为属性值里可能包含 `>`（例如 `:style="a > b"`），直接非贪婪匹配到
 * 第一个 `>` 会被截断，所以这里额外跟踪引号状态再校验一次。
 *
 * @param {string} source 待扫描的模板文本
 * @param {string} tagName 标签名（小写，如 'image'）
 * @returns {Array<{ selfClosing: boolean }>} 每个开标签的闭合形态
 */
function findOpenTags(source, tagName) {
  const openTagRe = new RegExp(`<${tagName}(?=[\\s/>])`, 'gi')
  const openTags = []
  let match

  while ((match = openTagRe.exec(source)) !== null) {
    let index = openTagRe.lastIndex
    let quote = null
    let selfClosing = false

    for (; index < source.length; index += 1) {
      const char = source[index]
      if (quote) {
        if (char === quote) quote = null
        continue
      }
      if (char === '"' || char === "'") {
        quote = char
        continue
      }
      if (char === '>') {
        selfClosing = source[index - 1] === '/'
        break
      }
    }

    openTags.push({ selfClosing })
    openTagRe.lastIndex = index + 1
  }

  return openTags
}

/**
 * 收集被改写成非空元素（如 img → image）却未自闭合的标签。
 *
 * 判定：开标签若以 `/>` 结尾则通过；若以 `>` 结尾，再看模板里是否存在配对的
 * `</image>`——存在（有人真写成 `<image>...</image>`）则通过，否则报 issue。
 */
function collectVoidMappedTagsIssues(template, filePath) {
  const issues = []

  for (const tag of VOID_MAPPED_TAGS) {
    const unclosedCount = findOpenTags(template, tag).filter((open) => !open.selfClosing).length
    if (unclosedCount === 0) continue

    const closerCount = template.match(new RegExp(`</${tag}>`, 'gi'))?.length ?? 0
    if (closerCount >= unclosedCount) continue

    issues.push(
      `${filePath}: <${tag}> 未自闭合——源文件里的 <img> 会被改写为 <image>，`
        + '而 image 不是空元素，必须写成 <image ... />',
    )
  }

  return issues
}

export function collectUniAppCompatibilityIssues(source, filePath = '<source>') {
  const issues = []
  const template = extractTemplate(source)

  if (/<script\b[\s\S]*?export\s+default\s*\{/.test(source)
    && !/\boptions\s*:\s*\{[\s\S]*?\bvirtualHost\s*:\s*true\b/.test(source)) {
    issues.push(`${filePath}: missing options.virtualHost = true`)
  }

  for (const tag of UNSUPPORTED_TAGS) {
    if (new RegExp(`<${tag}\\b`, 'i').test(template)) {
      issues.push(`${filePath}: unresolved template tag <${tag}>`)
    }
  }

  issues.push(...collectVoidMappedTagsIssues(template, filePath))

  const nestedWeuiTags = new Set(
    [...template.matchAll(NESTED_WEUI_COMPONENT_RE)].map((match) => match[1].toLowerCase()),
  )
  const localComponentTags = new Set(
    [...source.matchAll(/import\s+([A-Z][\w]*)\s+from\s+['"][^'"]+\.vue['"]/g)]
      .map((match) => match[1].replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()),
  )
  for (const tag of nestedWeuiTags) {
    if (localComponentTags.has(tag)) continue
    issues.push(`${filePath}: unresolved custom component <${tag}>`)
  }

  if (/:is\s*=\s*["'][^"']*(['"])a\1/i.test(template)) {
    issues.push(`${filePath}: dynamic component still contains tag value 'a'`)
  }

  if (/:is\s*=\s*["'][^"']*(['"])div\1/i.test(template)) {
    issues.push(`${filePath}: dynamic component still contains tag value 'div'`)
  }

  if (/(?:^|\s)(?::|v-bind:)?href\s*=/i.test(template)) {
    issues.push(`${filePath}: unresolved href attribute`)
  }

  if (/\bv-bind\s*=/i.test(template)) {
    issues.push(`${filePath}: unsupported object-form v-bind`)
  }

  for (const style of extractStyleBlocks(source)) {
    const cleanStyle = style.replace(/\/\*[\s\S]*?\*\//g, '')
    const selectorBlocks = cleanStyle.match(/[^{}]+\{/g) ?? []

    for (const selectorBlock of selectorBlocks) {
      const selector = selectorBlock.slice(0, -1).trim()
      if (selector.includes('[')) {
        issues.push(`${filePath}: attribute selector in WXSS: ${selector}`)
      }
      if (selector.includes('+') || selector.includes('~')) {
        issues.push(`${filePath}: sibling selector in WXSS: ${selector}`)
      }
    }
  }

  return issues
}

async function findVueFiles(root) {
  const files = []
  const entries = await readdir(root, { withFileTypes: true })

  for (const entry of entries) {
    const filePath = join(root, entry.name)
    if (entry.isDirectory()) {
      files.push(...await findVueFiles(filePath))
    } else if (entry.isFile() && extname(entry.name) === '.vue') {
      files.push(filePath)
    }
  }

  return files
}

export async function checkUniAppCompatibility(root) {
  const files = await findVueFiles(resolve(root))
  const issues = []

  for (const filePath of files) {
    const source = await readFile(filePath, 'utf-8')
    issues.push(...collectUniAppCompatibilityIssues(source, filePath))
  }

  return { files, issues }
}

async function main() {
  const root = process.argv[2] ?? fileURLToPath(new URL('../dist/uni-app', import.meta.url))
  const result = await checkUniAppCompatibility(root)

  if (result.issues.length > 0) {
    console.error(result.issues.join('\n'))
    process.exitCode = 1
    return
  }

  console.log(`Checked ${result.files.length} uni-app Vue files: no compatibility issues found.`)
}

const entryPath = process.argv[1] ? resolve(process.argv[1]) : ''
if (entryPath && import.meta.url === pathToFileURL(entryPath).href) {
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
