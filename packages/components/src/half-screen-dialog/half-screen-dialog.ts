// HalfScreenDialog 命令式 API
// 通过 overlay-host 渲染 WeuiHalfScreenDialog，提供 show 方法
// 调用前需确保应用中已挂载 <weui-overlay-host />

import WeuiHalfScreenDialog from './half-screen-dialog.vue'
import type { HalfScreenDialogButton } from './half-screen-dialog.vue'
import { getOverlayHost } from '../utils/overlay-host-ref'

export type { HalfScreenDialogButton } from './half-screen-dialog.vue'

export interface HalfScreenDialogShowOptions {
  /** 标题 */
  title?: string
  /** 副标题 */
  subtitle?: string
  /** 内容文字 */
  content?: string
  /** 按钮列表 */
  buttons?: HalfScreenDialogButton[]
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 是否显示遮罩，默认 true */
  mask?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 遮罩结构包装层的扩展类名。 */
  wrapperClass?: string
}

export interface HalfScreenDialogShowResult {
  /** 被点击的按钮；遮罩关闭时为 undefined */
  button: HalfScreenDialogButton | undefined
  /** 被点击的按钮索引；遮罩关闭时为 -1 */
  index: number
}

/**
 * 构造传给 WeuiHalfScreenDialog 的 props + onButtontap/onClose 监听器
 *
 * 关闭来源：
 *  - 按钮点击：触发 buttontap → resolve { button, index }
 *  - 遮罩点击（maskClosable）：触发 close → resolve { button: undefined, index: -1 }
 *
 * 由于按钮点击也会顺带触发 close 事件（见 half-screen-dialog.vue 的 handleButtonTap），
 * 使用 settled 标志位保证 resolve 只调用一次。
 */
function showInternal(
  options: HalfScreenDialogShowOptions,
  resolve: (result: HalfScreenDialogShowResult) => void,
): void {
  const host = getOverlayHost()
  if (!host) {
    throw new Error('WeuiOverlayHost is not mounted')
  }

  const buttons: HalfScreenDialogButton[] = options.buttons ?? []

  let settled = false
  const safeResolve = (result: HalfScreenDialogShowResult) => {
    if (settled) return
    settled = true
    resolve(result)
  }

  const props: Record<string, unknown> = {
    visible: true,
    title: options.title,
    subtitle: options.subtitle,
    content: options.content,
    buttons,
    maskClosable: options.maskClosable ?? true,
    mask: options.mask ?? true,
    extClass: options.extClass,
    wrapperClass: options.wrapperClass,
    // Vue 3: onXxx 形式的 prop 会被当作事件监听器
    onButtontap: (btn: HalfScreenDialogButton, index: number) => {
      safeResolve({ button: btn, index })
    },
    onClose: () => {
      // 遮罩关闭：无按钮点击，index 标记为 -1
      safeResolve({ button: undefined, index: -1 })
    },
  }

  host.add(WeuiHalfScreenDialog, props)
}

export const HalfScreenDialog = {
  /**
   * 显示半屏弹窗
   * 点击任意按钮后 resolve { button, index }
   * 点击遮罩关闭时 resolve { button: undefined, index: -1 }
   */
  show(options: HalfScreenDialogShowOptions): Promise<HalfScreenDialogShowResult> {
    return new Promise((resolve) => {
      showInternal(options, resolve)
    })
  },
}
