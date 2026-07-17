// Toast 命令式 API
// 通过 overlay-host 渲染 WeuiToast，提供 show/success/loading/warning/text/hide 方法
// 多次调用通过 ToastQueue 排队，前一个关闭后才显示下一个
// 调用前需确保应用中已挂载 <weui-overlay-host />

import WeuiToast from './toast.vue'
import type { ToastType } from './toast.vue'
import { getOverlayHost } from '../utils/overlay-host-ref'
import { ToastQueue } from '../utils/queue'

export type { ToastType } from './toast.vue'

export interface ToastShowOptions {
  /** 提示文字 */
  content?: string
  /** 提示类型，默认 success */
  type?: ToastType
  /** 显示时长 ms，0 为不自动关闭。未传时按 type 取默认值（loading=0，其他=2000） */
  duration?: number
  /** 是否显示透明遮罩，默认 true */
  mask?: boolean
  /** 自定义附加类名 */
  extClass?: string
}

interface ToastTask {
  options: ToastShowOptions
  /** overlay-host 分配的 id，用于 hide() 强制移除 */
  id?: number
  /** show() 返回的 Promise 的 resolve 函数 */
  resolve: () => void
}

/** 当前正在显示的任务，用于 hide() 强制关闭 */
let currentTask: ToastTask | null = null

const queue = new ToastQueue<ToastTask>((task) => {
  const host = getOverlayHost()
  if (!host) {
    // 未挂载 overlay-host 时，直接 resolve 并执行下一个
    task.resolve()
    queue.done()
    return
  }

  currentTask = task
  const { id } = host.add(WeuiToast, {
    visible: true,
    content: task.options.content ?? '',
    type: task.options.type ?? 'success',
    duration: task.options.duration,
    mask: task.options.mask ?? true,
    extClass: task.options.extClass,
    // Vue 3: onClose prop 会被当作 close 事件监听器
    onClose: () => {
      currentTask = null
      task.resolve()
      queue.done()
    },
  })
  task.id = id
})

export const Toast = {
  /**
   * 显示 toast，关闭时（自动或 hide()）resolve
   * 多次调用会排队，前一个关闭后才显示下一个
   */
  show(options: ToastShowOptions): Promise<void> {
    return new Promise((resolve) => {
      queue.enqueue({ options, resolve })
    })
  },

  /**
   * 成功提示。默认 duration=2000
   */
  success(content: string, duration?: number): Promise<void> {
    return this.show({ content, type: 'success', duration })
  },

  /**
   * 加载提示。默认 duration=0（不自动关闭），需手动 hide()
   */
  loading(content: string, duration?: number): Promise<void> {
    return this.show({ content, type: 'loading', duration })
  },

  /**
   * 警告提示。默认 duration=2000
   */
  warning(content: string, duration?: number): Promise<void> {
    return this.show({ content, type: 'warning', duration })
  },

  /**
   * 纯文本提示（无图标）。默认 duration=2000
   */
  text(content: string, duration?: number): Promise<void> {
    return this.show({ content, type: 'text', duration })
  },

  /**
   * 立即关闭当前正在显示的 toast，并触发队列中下一个
   */
  hide(): void {
    if (!currentTask) return
    const host = getOverlayHost()
    if (host && currentTask.id !== undefined) {
      host.remove(currentTask.id)
    }
    currentTask.resolve()
    currentTask = null
    queue.done()
  },
}

/**
 * 重置内部队列与当前任务状态，仅供单元测试使用
 */
export function _resetForTest(): void {
  currentTask = null
  while (queue.size() > 0) {
    queue.done()
  }
}
