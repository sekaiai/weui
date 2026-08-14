// Shared SFC transform utilities used by both the Vite build plugin (build-plugin.ts)
// and the uni-app flat SFC copy script (copy-uniapp-components.mjs).
// Pure JavaScript — no TypeScript, no Node-only APIs beyond regex on strings.

// 标签映射表（HTML → uni-app）
export const TAG_MAP = {
  div: 'view',
  span: 'text',
  img: 'image',
  a: 'navigator',
  article: 'view',
  em: 'text',
  h2: 'text',
  i: 'text',
  strong: 'text',
  p: 'view',
  ul: 'view',
  li: 'view',
}

// 条件编译注释正则（JS 注释语境，仅在 <script> 中使用）
const IFDEF_RE = /^[ \t]*\/\/\s*#ifdef\s+(\S+)\s*\n([\s\S]*?)^[ \t]*\/\/\s*#endif/gm
const IFNDEF_RE = /^[ \t]*\/\/\s*#ifndef\s+(\S+)\s*\n([\s\S]*?)^[ \t]*\/\/\s*#endif/gm

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

  result = result.replace(/^[ \t]*\/\/\s*#ifdef\s+\S+[^\n]*\n/gm, '')
  result = result.replace(/^[ \t]*\/\/\s*#ifndef\s+\S+[^\n]*\n/gm, '')
  result = result.replace(/^[ \t]*\/\/\s*#endif[^\n]*\n?/gm, '')

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
    result += transformTemplateContent(source.slice(lastIndex, match.index))
    result += match[0]
    lastIndex = match.index + match[0].length
  }
  result += transformTemplateContent(source.slice(lastIndex))
  return result
}

function transformTemplateContent(content) {
  let transformed = transformAnchorTags(content)
  transformed = transformDynamicComponentTags(transformed)
  return transformTags(transformed)
}

function isActionAnchor(attrs) {
  return /(?:^|\s)href\s*=\s*(["'])(?:#|javascript:)[^"']*\1/i.test(attrs)
}

function isManualNavigationAnchor(attrs) {
  return /(?:^|\s)data-manual-navigation(?:\s|=|$)/i.test(attrs)
}

function removeManualNavigationAttribute(attrs) {
  return attrs
    .replace(/(?:^|\s)data-manual-navigation(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/gi, ' ')
    .replace(/\s{2,}/g, ' ')
}

function removeHrefAttributes(attrs) {
  return attrs
    .replace(/(?:^|\s)(?::|v-bind:)?href\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, ' ')
    .replace(/\s{2,}/g, ' ')
}

function convertHrefAttributes(attrs) {
  return attrs.replace(
    /(^|\s)(:|v-bind:)?href(\s*=)/gi,
    '$1$2url$3',
  )
}

/**
 * Convert anchors without relying on unsupported WXSS/HTML semantics in uni-app.
 * Literal #/javascript links are event controls; real links become navigator/url.
 */
function transformAnchorTags(content) {
  const anchorTagRegex = /<\/?a\b[^>]*>/gi
  const tagStack = []
  let result = ''
  let lastIndex = 0
  let match

  while ((match = anchorTagRegex.exec(content)) !== null) {
    result += content.slice(lastIndex, match.index)
    const tag = match[0]

    if (/^<\//.test(tag)) {
      result += `</${tagStack.pop() ?? 'navigator'}>`
      lastIndex = anchorTagRegex.lastIndex
      continue
    }

    const selfClosing = /\/\s*>$/.test(tag)
    const attrs = tag.slice(2, selfClosing ? -2 : -1)
    const action = isActionAnchor(attrs) || isManualNavigationAnchor(attrs)
    const targetTag = action ? 'view' : 'navigator'
    const targetAttrs = action
      ? removeManualNavigationAttribute(removeHrefAttributes(attrs))
      : convertHrefAttributes(attrs)
    const normalizedAttrs = targetAttrs.trim()

    result += `<${targetTag}${normalizedAttrs ? ` ${normalizedAttrs}` : ''}${selfClosing ? ' />' : '>'}`
    if (!selfClosing) tagStack.push(targetTag)
    lastIndex = anchorTagRegex.lastIndex
  }

  result += content.slice(lastIndex)
  return result
}

function transformDynamicComponentTags(content) {
  let transformed = content.replace(
    /(:is\s*=\s*)(["'])([\s\S]*?)\2/g,
    (_, prefix, quote, expression) => {
      const mappedExpression = expression.replace(/(['"])a\1/g, '$1navigator$1')
        .replace(/(['"])div\1/g, '$1view$1')
      return `${prefix}${quote}${mappedExpression}${quote}`
    },
  )

  return transformed.replace(/<component\b([^>]*)>/gi, (match, attrs) => {
    if (!/:is\s*=/.test(attrs)) return match
    return `<component${convertHrefAttributes(attrs)}>`
  })
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
