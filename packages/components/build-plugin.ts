import type { Plugin } from 'vite'

interface PlatformTransformOptions {
  platform: 'vue3' | 'uni-app'
}

// 标签映射表（HTML → uni-app）
const TAG_MAP: Record<string, string> = {
  div: 'view',
  span: 'text',
  img: 'image',
}

// 条件编译注释正则（JS 注释语境，仅在 <script> 中使用）
// 匹配 // #ifdef H5 ... // #endif
const IFDEF_RE = /\/\/\s*#ifdef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g
const IFNDEF_RE = /\/\/\s*#ifndef\s+(\S+)\s*\n([\s\S]*?)\/\/\s*#endif/g

/**
 * 移除条件编译注释块，按目标平台保留对应代码
 *
 * - vue3 平台：保留 #ifdef H5 块内容，移除 #ifndef H5 块
 * - uni-app 平台：移除 #ifdef H5 块，保留 #ifndef H5 块内容
 *
 * 保留的代码块会移除条件编译注释标记（#ifdef/#ifndef/#endif）
 * 如果块内代码本身带 // 注释（说明性注释），会保留注释
 */
export function stripConditionalCompile(code: string, platform: 'vue3' | 'uni-app'): string {
  let result = code

  if (platform === 'vue3') {
    // 先处理 #ifndef H5 块：移除整块
    result = result.replace(IFNDEF_RE, (match, platformName) => {
      return platformName === 'H5' ? '' : match
    })
    // 再处理 #ifdef H5 块：保留内容，移除注释标记
    result = result.replace(IFDEF_RE, (_, platformName, content) => {
      if (platformName === 'H5') {
        // 保留内容，移除 #ifdef 和 #endif 注释行
        return content
      }
      return ''
    })
  } else {
    // uni-app：先处理 #ifdef H5 块：移除整块
    result = result.replace(IFDEF_RE, (match, platformName) => {
      return platformName === 'H5' ? '' : match
    })
    // 再处理 #ifndef H5 块：保留内容，移除注释标记
    result = result.replace(IFNDEF_RE, (_, platformName, content) => {
      if (platformName === 'H5') {
        return content
      }
      return ''
    })
  }

  // 清理残留的条件编译注释标记（如果正则没匹配到完整块，作为兜底）
  result = result.replace(/\/\/\s*#ifdef\s+\S+[^\n]*\n/g, '')
  result = result.replace(/\/\/\s*#ifndef\s+\S+[^\n]*\n/g, '')
  result = result.replace(/\/\/\s*#endif[^\n]*\n?/g, '')

  return result
}

/**
 * 转换 SFC 中 <template> 区域的标签：div→view、span→text、img→image
 *
 * 实现思路：把 SFC 按 <script>...</script> 块切分，只对 script 块之外
 * 的内容（即 <template> 块及其内部，含嵌套 <template v-if>/<template v-for>）
 * 做标签替换。这样能正确处理嵌套 template，又不会动到 <script> 里的
 * 字符串字面量（如类名 'weui-cell__bd'）。
 *
 * 不误替换含 view/text/image 子串的复合标签（如 scroll-view/picker-view/rich-text），
 * 因为开标签正则要求 <div 后面必须跟空格、> 或 /。
 */
export function transformTemplateTags(source: string): string {
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

/**
 * 对一段文本做标签替换：div→view、span→text、img→image
 * 开标签 <div 后面必须跟空格、> 或 /（避免误匹配 scroll-view 等复合标签）
 */
function transformTags(content: string): string {
  let transformed = content
  for (const [htmlTag, uniTag] of Object.entries(TAG_MAP)) {
    // 开标签：<div 后面跟空格、> 或 /
    transformed = transformed.replace(
      new RegExp(`<${htmlTag}(\\s|>|/)`, 'g'),
      `<${uniTag}$1`,
    )
    // 闭标签
    transformed = transformed.replace(
      new RegExp(`</${htmlTag}>`, 'g'),
      `</${uniTag}>`,
    )
  }
  return transformed
}

/**
 * 替换 __IS_H5__ 常量为字面量
 * - vue3 平台：替换为 true
 * - uni-app 平台：替换为 false
 *
 * 使用 \b 词边界确保不替换 __IS_H5__XX 等更长标识符
 */
export function replacePlatformConstant(source: string, platform: 'vue3' | 'uni-app'): string {
  const value = platform === 'vue3' ? 'true' : 'false'
  return source.replace(/\b__IS_H5__\b/g, value)
}

/**
 * Vite 打包插件：平台转换
 *
 * 职责：
 * 1. 条件编译移除：按目标平台移除 #ifdef H5 / #ifndef H5 注释块
 * 2. __IS_H5__ 常量替换：替换为字面量 true/false
 * 3. 标签转换（仅 uni-app 产物）：div→view、span→text、img→image
 *
 * 用法：
 *   // vite.config.ts
 *   import { platformTransform } from './build-plugin'
 *   export default defineConfig({
 *     plugins: [vue(), platformTransform({ platform: 'uni-app' })]
 *   })
 */
export function platformTransform(options: PlatformTransformOptions): Plugin {
  return {
    name: 'weui-platform-transform',
    transform(code, id) {
      // 只处理 .vue 和 .ts 文件
      if (!id.endsWith('.vue') && !id.endsWith('.ts')) return null

      let result = code

      // 1. 条件编译移除
      result = stripConditionalCompile(result, options.platform)

      // 2. __IS_H5__ 常量替换
      result = replacePlatformConstant(result, options.platform)

      // 3. 标签转换（仅 uni-app 产物）
      if (options.platform === 'uni-app') {
        result = transformTemplateTags(result)
      }

      return result
    },
  }
}
