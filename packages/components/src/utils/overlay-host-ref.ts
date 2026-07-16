// overlay-host 实例的全局引用
// overlay-host 组件挂载时注册 add/remove 方法，卸载时清除
// 命令式弹层 API（dialog/actionsheet/toptips 等）通过此模块访问 overlay-host

export interface OverlayHostHandle {
  add: (component: import('vue').Component, props?: Record<string, unknown>) => { id: number; zIndex: number }
  remove: (id: number) => void
}

let handle: OverlayHostHandle | null = null

/** 注册 overlay-host 实例 */
export function setOverlayHost(h: OverlayHostHandle | null): void {
  handle = h
}

/** 获取 overlay-host 实例，未注册时返回 null */
export function getOverlayHost(): OverlayHostHandle | null {
  return handle
}
