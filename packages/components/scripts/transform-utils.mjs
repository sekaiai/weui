// Shared SFC transform utilities used by both the Vite build plugin (build-plugin.ts)
// and the uni-app flat SFC copy script (copy-uniapp-components.mjs).
// Pure JavaScript — no TypeScript, no Node-only APIs beyond regex on strings.

// 标签映射表（HTML → uni-app）
export const TAG_MAP = {
  div: 'view',
  span: 'text',
  img: 'image',
  a: 'navigator',
  strong: 'text',
  p: 'view',
  ul: 'view',
  li: 'view',
}

// 条件编译注释正则（JS 注释语境，仅在 <script> 中使用）
const IFDEF_RE = /\/\/\s*#ifdef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g
const IFNDEF_RE = /\/\/\s*#ifndef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g

/**
 * 移除条件编译注释块，按目标平台保留对应代码
 */
export function stripConditionalCompile(code, platform) {
  let result = code

  if (platform === 'vue3') {
    result = result.replace(IFNDEF_RE, (match, platformName) => {
      return platformName === 'H5' ? '' : match
    })
    result = result.replace(IFDEF_RE, (_, platformName, content) => {
      if (platformName === 'H5') return content
      return ''
    })
  } else {
    result = result.replace(IFDEF_RE, (match, platformName) => {
      return platformName === 'H5' ? '' : match
    })
    result = result.replace(IFNDEF_RE, (_, platformName, content) => {
      if (platformName === 'H5') return content
      return ''
    })
  }

  result = result.replace(/\/\/\s*#ifdef\s+\S+[^\n]*\n/g, '')
  result = result.replace(/\/\/\s*#ifndef\s+\S+[^\n]*\n/g, '')
  result = result.replace(/\/\/\s*#endif[^\n]*\n?/g, '')

  return result
}

/**
 * 转换 SFC 中 <template> 区域的标签：div→view、span→text、img→image
 */
export function transformTemplateTags(source) {
  const scriptBlockRegex = /<script\b[^>]*>[\s\S]*?<\/script>/g
  let result = ''
  let lastIndex = 0
  let match
  while ((match = scriptBlockRegex.exec(source)) !== null) {
    result += transformTags(source.slice(lastIndex, match.index))
    result += match[0]
    lastIndex = match.index + match[0].length
  }
  result += transformTags(source.slice(lastIndex))
  return result
}

/**
 * 对一段文本做标签替换
 */
export function transformTags(content) {
  let transformed = content
  for (const [htmlTag, uniTag] of Object.entries(TAG_MAP)) {
    const escapedTag = htmlTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    transformed = transformed.replace(
      new RegExp(`<${escapedTag}(\\s|>|/)`, 'g'),
      `<${uniTag}$1`,
    )
    transformed = transformed.replace(
      new RegExp(`</${escapedTag}>`, 'g'),
      `</${uniTag}>`,
    )
  }
  return transformed
}

/**
 * 替换 __IS_H5__ 常量为字面量
 */
export function replacePlatformConstant(source, platform) {
  const value = platform === 'vue3' ? 'true' : 'false'
  return source.replace(/\b__IS_H5__\b/g, value)
}
