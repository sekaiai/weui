import { extname } from 'node:path'

const tagMap = {
  div: 'view',
  span: 'text',
  img: 'image',
  a: 'navigator',
  strong: 'text',
  p: 'view',
  ul: 'view',
  li: 'view',
}

const ifdefRe = /\/\/\s*#ifdef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g
const ifndefRe = /\/\/\s*#ifndef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g

export function isCopyableFile(filePath) {
  const extension = extname(filePath)
  return extension === '.vue'
    || extension === '.ts'
    || extension === '.scss'
}

function stripConditionalCompile(code) {
  let result = code

  result = result.replace(ifdefRe, (match, platformName) => {
    return platformName === 'H5' ? '' : match
  })

  result = result.replace(ifndefRe, (_, platformName, content) => {
    return platformName === 'H5' ? content : ''
  })

  result = result.replace(/\/\/\s*#ifdef\s+\S+[^\n]*\n/g, '')
  result = result.replace(/\/\/\s*#ifndef\s+\S+[^\n]*\n/g, '')
  result = result.replace(/\/\/\s*#endif[^\n]*\n?/g, '')

  return result
}

function replacePlatformConstant(source) {
  return source.replace(/\b__IS_H5__\b/g, 'false')
}

function transformTemplateTags(source) {
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

function transformTags(content) {
  let transformed = content

  for (const [htmlTag, uniTag] of Object.entries(tagMap)) {
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

export function transformUniAppSource(source, filePath) {
  const extension = extname(filePath)
  let transformed = source

  if (extension === '.vue' || extension === '.ts') {
    transformed = stripConditionalCompile(transformed)
    transformed = replacePlatformConstant(transformed)
  }

  if (extension === '.vue') {
    transformed = transformTemplateTags(transformed)
  }

  return transformed
}
