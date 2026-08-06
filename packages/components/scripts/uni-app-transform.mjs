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
  }

  return transformed
}
