// Toptips 命令式 API
// 通过 overlay-host 渲染 WeuiToptips，提供 show/warn 方法
// 调用前需确保应用中已挂载 <weui-overlay-host />

import WeuiToptips from './toptips.vue'
import type { ToptipsType } from './toptips.vue'
import { getOverlayHost } from '../utils/overlay-host-ref'

export type { ToptipsType } from './toptips.vue'

export interface ToptipsShowOptions {
  /** 提示文字 */
  content?: string
  type?: ToptipsType
  /** 显示时长 ms，0 为不自动关闭，默认 2000 */
  duration?: number
  /** 自定义附加类名 */
  extClass?: string
}

/** 默认显示时长 */
const DEFAULT_DURATION = 2000

/** 构造传给 WeuiToptips 的 props，通过 overlay-host 渲染 */
function showInternal(options: ToptipsShowOptions): void {
  const host = getOverlayHost()
  if (!host) {
    // 未挂载 overlay-host 时，降级为无操作（生产环境应避免）
    return
  }

  const props: Record<string, unknown> = {
    visible: true,
    content: options.content ?? '',
    type: options.type ?? 'warn',
    duration: options.duration ?? DEFAULT_DURATION,
    extClass: options.extClass,
  }

  host.add(WeuiToptips, props)
}

export const Toptips = {
  /**
   * 显示提示
   * duration 后自动关闭（默认 2000ms），通过 weui-close 触发 overlay-host 卸载
   */
  show(options: ToptipsShowOptions): void {
    showInternal(options)
  },

  /**
   * 警告提示
   */
  warn(content: string, duration?: number): void {
    showInternal({ content, duration, type: 'warn' })
  },
  info(content: string, duration?: number): void {
    showInternal({ content, duration, type: 'info' })
  },
  success(content: string, duration?: number): void {
    showInternal({ content, duration, type: 'success' })
  },
  error(content: string, duration?: number): void {
    showInternal({ content, duration, type: 'error' })
  },
}
