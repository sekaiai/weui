// Gallery 命令式 API
// 通过 overlay-host 渲染 WeuiGallery，提供 show 方法
// 调用前需确保应用中已挂载 <weui-overlay-host />

import WeuiGallery from './gallery.vue'
import { addOverlay, removeOverlay } from '../utils/overlay-service'

export interface GalleryShowOptions {
  /** 图片地址 */
  src?: string
  /** 是否显示删除按钮 */
  showDelete?: boolean
  /** 删除图标按钮的无障碍标签 */
  deleteText?: string
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 自定义附加类名 */
  extClass?: string
}

export const Gallery = {
  /**
   * 显示画廊
   * 点击删除按钮 → promise resolve('delete')，需手动调用 close() 关闭
   * 点击遮罩（maskClosable=true 时）→ promise resolve('hide') 并自动关闭
   */
  show(options: GalleryShowOptions): { close: () => void; promise: Promise<'delete' | 'hide'> } {
    let resolveFn!: (v: 'delete' | 'hide') => void
    const promise = new Promise<'delete' | 'hide'>((r) => {
      resolveFn = r
    })

    const handle = addOverlay(WeuiGallery, {
      visible: true,
      src: options.src,
      showDelete: options.showDelete ?? false,
      deleteText: options.deleteText ?? '删除',
      maskClosable: options.maskClosable ?? true,
      extClass: options.extClass,
      // Vue 3: onXxx 形式的 prop 会被当作事件监听器
      onDelete: () => resolveFn('delete'),
      onHide: () => resolveFn('hide'),
    })

    // 未挂载 overlay-host 时，降级为无操作（生产环境应避免）
    if (!handle) {
      return { close: () => {}, promise: Promise.resolve<'delete' | 'hide'>('hide') }
    }

    return { close: () => removeOverlay(handle.id), promise }
  },
}
