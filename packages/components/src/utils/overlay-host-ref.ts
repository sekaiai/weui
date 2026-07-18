// overlay-host 实例的全局引用
// overlay-host 组件挂载时注册 add/remove 方法，卸载时清除
// 命令式弹层 API（dialog/actionsheet/toptips 等）通过此模块访问 overlay-host
//
// 使用 globalThis 共享引用，确保 Vue 3 产物与 uni-app 产物即使被同时引入
// （例如 uni-app H5 模式下，overlay-host 来自 uni-app 产物，而命令式 API
// 可能来自 Vue 3 产物），也能访问到同一个 overlay-host 实例。

export interface OverlayHostHandle {
  add: (component: import('vue').Component, props?: Record<string, unknown>) => { id: number; zIndex: number }
  remove: (id: number) => void
}

const GLOBAL_KEY = '__weuiOverlayHost__'

/** 注册 overlay-host 实例 */
export function setOverlayHost(h: OverlayHostHandle | null): void {
  const g = globalThis as unknown as Record<string, unknown>
  if (h) {
    g[GLOBAL_KEY] = h
  } else {
    delete g[GLOBAL_KEY]
  }
}

/** 获取 overlay-host 实例，未注册时返回 null */
export function getOverlayHost(): OverlayHostHandle | null {
  const g = globalThis as unknown as Record<string, unknown>
  return (g[GLOBAL_KEY] as OverlayHostHandle | undefined) ?? null
}
