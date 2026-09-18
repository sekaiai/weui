import { extname } from 'node:path'
import {
  stripConditionalCompile,
  replacePlatformConstant,
  transformTemplateTags,
} from './transform-utils.mjs'

export function isCopyableFile(filePath) {
  const extension = extname(filePath)
  return extension === '.vue' || extension === '.ts' || extension === '.scss'
}

export function transformUniAppSource(source, filePath) {
  const extension = extname(filePath)
  let transformed = source

  if (extension === '.vue' || extension === '.ts') {
    transformed = stripConditionalCompile(transformed, 'uni-app')
    transformed = replacePlatformConstant(transformed, 'uni-app')
  }

  if (extension === '.vue') {
    transformed = transformTemplateTags(transformed)
    transformed = removeUnsupportedAttrsBinding(transformed)
    transformed = restoreFallthroughAttrs(transformed)
    transformed = ensureUniAppVirtualHost(transformed)
  }

  return transformed
}

// The mini-program template compiler does not support object-form attribute
// bindings. Remove the explicit binding, then restore Vue's default automatic
// fallthrough so single-root components retain class, style, and listener
// forwarding without generating an unsupported directive.
function removeUnsupportedAttrsBinding(source) {
  const scriptBlockRegex = /<script\b[^>]*>[\s\S]*?<\/script>/g
  let result = ''
  let lastIndex = 0
  let match

  while ((match = scriptBlockRegex.exec(source)) !== null) {
    result += source.slice(lastIndex, match.index).replace(/\s+v-bind\s*=\s*(["'])\$attrs\1/g, '')
    result += match[0]
    lastIndex = match.index + match[0].length
  }

  return result + source.slice(lastIndex).replace(/\s+v-bind\s*=\s*(["'])\$attrs\1/g, '')
}

function restoreFallthroughAttrs(source) {
  return source.replace(/\binheritAttrs\s*:\s*false\s*,?\s*/g, '')
}

function ensureUniAppVirtualHost(source) {
  const optionsObject = /\boptions\s*:\s*\{/m
  if (!optionsObject.test(source) || /\bvirtualHost\s*:\s*true\b/.test(source)) {
    return source
  }

  return source.replace(optionsObject, (match) => `${match}\n    virtualHost: true,`)
}
