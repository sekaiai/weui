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
    transformed = ensureUniAppVirtualHost(transformed)
  }

  return transformed
}

function ensureUniAppVirtualHost(source) {
  const optionsObject = /\boptions\s*:\s*\{/m
  if (!optionsObject.test(source) || /\bvirtualHost\s*:\s*true\b/.test(source)) {
    return source
  }

  return source.replace(optionsObject, (match) => `${match}\n    virtualHost: true,`)
}
