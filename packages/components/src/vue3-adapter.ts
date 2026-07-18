import type { Plugin } from 'vue'
import { transformVNodeArgs } from 'vue'

// uni-app 标签 → HTML 标签映射
// 仅列出在 H5/Vue 3 环境中需要映射的标签
// view/text/image 是 uni-app 最常用的三个布局/内容标签
const TAG_MAP: Record<string, string> = {
  view: 'div',
  text: 'span',
  image: 'img',
}

/**
 * Vue3Adapter 插件
 *
 * 将 uni-app 内置标签（view/text/image）在运行时映射为标准 HTML 标签
 * （div/span/img）。
 *
 * 仅用于纯 Vue 3 环境（如 VitePress 文档站、纯 Vue 3 项目），
 * uni-app 编译环境（小程序 / uni-app H5）无需此插件，
 * uni-app 编译器会自动处理这些标签。
 *
 * 实现说明：使用 `transformVNodeArgs` 而非 `app.component()` 注册，
 * 因为 Vue 3 将 view/text/image 视为 SVG 保留标签，
 * `app.component('view', ...)` 在运行时不会被解析为组件（h('view') 直接
 * 创建原生元素 vnode）。`transformVNodeArgs` 在 vnode 创建层面拦截，
 * 能同时覆盖 h() 调用和模板编译产物。
 *
 * 副作用提示：`transformVNodeArgs` 是全局变换（非 app 作用域），
 * 会影响同进程所有 Vue app。文档站场景（单 app）无影响。
 *
 * @example
 * ```ts
 * import { createApp } from 'vue'
 * import { Vue3Adapter } from 'weui-design-vue'
 * const app = createApp(App)
 * app.use(Vue3Adapter)
 * ```
 */
export const Vue3Adapter: Plugin = {
  install() {
    transformVNodeArgs((args) => {
      const type = args[0]
      if (typeof type === 'string' && TAG_MAP[type]) {
        return [TAG_MAP[type], ...args.slice(1)] as typeof args
      }
      return args
    })
  },
}
