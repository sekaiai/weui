import type { Plugin } from 'vite'
import {
  stripConditionalCompile as _stripConditionalCompile,
  stripTemplateConditionalCompile as _stripTemplateConditionalCompile,
  replacePlatformConstant as _replacePlatformConstant,
  transformTemplateTags as _transformTemplateTags,
} from './scripts/transform-utils.mjs'

interface PlatformTransformOptions {
  platform: 'vue3' | 'uni-app'
}

type TransformPlatform = 'vue3' | 'uni-app'

export function stripConditionalCompile(code: string, platform: TransformPlatform): string {
  return _stripConditionalCompile(code, platform)
}

export function stripTemplateConditionalCompile(code: string, platform: TransformPlatform): string {
  return _stripTemplateConditionalCompile(code, platform)
}

export function replacePlatformConstant(source: string, platform: TransformPlatform): string {
  return _replacePlatformConstant(source, platform)
}

export function transformTemplateTags(source: string): string {
  return _transformTemplateTags(source)
}

export function platformTransform(options: PlatformTransformOptions): Plugin {
  return {
    name: 'weui-platform-transform',
    transform(code, id) {
      if (!id.endsWith('.vue') && !id.endsWith('.ts')) return null

      let result = code
      result = stripConditionalCompile(result, options.platform)
      result = replacePlatformConstant(result, options.platform)

      if (options.platform === 'uni-app') {
        result = transformTemplateTags(result)
      }

      return result
    },
  }
}
