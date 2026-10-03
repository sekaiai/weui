// transform-utils.mjs 是构建脚本（纯 JS），本文件只为 src 下的测试提供类型，
// 让 `vue-tsc -p tsconfig.json`（CI 的 typecheck）能解析对它的 import。
// 不参与任何构建产物。

export type WeuiPlatform = 'vue3' | 'uni-app'

export const TAG_MAP: Record<string, string>

export function stripTemplateConditionalCompile(code: string, platform: WeuiPlatform): string

export function stripStyleConditionalCompile(code: string, platform: WeuiPlatform): string

export function stripConditionalCompile(code: string, platform: WeuiPlatform): string

export function transformTemplateTags(source: string): string

export function transformTags(content: string): string

export function replacePlatformConstant(source: string, platform: WeuiPlatform): string
