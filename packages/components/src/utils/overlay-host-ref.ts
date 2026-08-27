// overlay-host 实例的运行时引用。
// uni-app 的扁平 SFC 产物会复制这段工具模块，因此必须通过同一运行时
// key 共享宿主；使用命名空间字符串以兼容 uni-app 编译器的多模块产物。

export interface OverlayHostHandle {
  add: (component: import('vue').Component, props?: Record<string, unknown>) => { id: number; zIndex: number }
  remove: (id: number) => void
}

const overlayHostKey = '__WEUI_UNIAPP_DESIGN_OVERLAY_HOST__'
type OverlayHostGlobal = typeof globalThis & {
  [key: string]: unknown
}

const runtime = globalThis as OverlayHostGlobal

/** 注册 overlay-host 实例 */
export function setOverlayHost(h: OverlayHostHandle | null): void {
  runtime[overlayHostKey] = h
}

/** 获取 overlay-host 实例，未注册时返回 null */
export function getOverlayHost(): OverlayHostHandle | null {
  return (runtime[overlayHostKey] as OverlayHostHandle | null | undefined) ?? null
}
