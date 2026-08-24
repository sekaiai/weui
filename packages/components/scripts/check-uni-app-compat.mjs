import { readdir, readFile } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const UNSUPPORTED_TAGS = ['article', 'em', 'h2', 'i', 'a', 'div', 'span', 'img']
const NESTED_WEUI_COMPONENT_RE = /<(weui-[a-z0-9-]+)\b/gi

function extractTemplate(source) {
  const template = source.match(/<template\b[^>]*>([\s\S]*?)<\/template>/i)?.[1] ?? ''
  return template.replace(/<!--[\s\S]*?-->/g, '')
}

function extractStyleBlocks(source) {
  return [...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1])
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

  const nestedWeuiTags = new Set(
    [...template.matchAll(NESTED_WEUI_COMPONENT_RE)].map((match) => match[1].toLowerCase()),
  )
  for (const tag of nestedWeuiTags) {
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
