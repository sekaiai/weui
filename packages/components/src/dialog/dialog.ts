// Dialog 命令式 API
// 通过 overlay-host 渲染 WeuiDialog，提供 show/alert/confirm 三个方法
// 调用前需确保应用中已挂载 <weui-overlay-host />

import WeuiDialog from './dialog.vue'
import type { DialogButton } from './dialog.vue'
import { getOverlayHost } from '../utils/overlay-host-ref'

export type { DialogButton } from './dialog.vue'

export interface DialogShowOptions {
  /** 标题 */
  title?: string
  /** 内容文字 */
  content?: string
  /** 按钮列表 */
  buttons?: DialogButton[]
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 是否显示遮罩，默认 true */
  mask?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 按钮是否垂直排列 */
  btnWrap?: boolean
}

export interface DialogAlertOptions {
  /** 标题 */
  title?: string
  /** 内容文字 */
  content?: string
  /** 确认按钮文字，默认 "确定" */
  confirmText?: string
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
}

export interface DialogConfirmOptions {
  /** 标题 */
  title?: string
  /** 内容文字 */
  content?: string
  /** 确认按钮文字，默认 "确定" */
  confirmText?: string
  /** 取消按钮文字，默认 "取消" */
  cancelText?: string
  /** 点击遮罩是否关闭，默认 false（confirm 场景防误触） */
  maskClosable?: boolean
}

export interface DialogShowResult {
  /** 被点击的按钮 */
  button: DialogButton
  /** 被点击的按钮索引 */
  index: number
}

/** 构造传给 WeuiDialog 的 props + onButtontap 监听器 */
function showInternal(
  options: DialogShowOptions,
  resolve: (result: DialogShowResult) => void,
): void {
  const host = getOverlayHost()
  if (!host) {
    // 未挂载 overlay-host 时，降级为无操作（生产环境应避免）
    return
  }

  const buttons: DialogButton[] = options.buttons ?? []

  const props: Record<string, unknown> = {
    visible: true,
    title: options.title,
    content: options.content,
    buttons,
    maskClosable: options.maskClosable ?? true,
    mask: options.mask ?? true,
    extClass: options.extClass,
    btnWrap: options.btnWrap ?? false,
    // Vue 3: onXxx 形式的 prop 会被当作事件监听器
    onButtontap: (btn: DialogButton, index: number) => {
      resolve({ button: btn, index })
    },
  }

  host.add(WeuiDialog, props)
}

export const Dialog = {
  /**
   * 显示自定义按钮的对话框
   * 点击任意按钮后关闭并 resolve
   */
  show(options: DialogShowOptions): Promise<DialogShowResult> {
    return new Promise((resolve) => {
      showInternal(options, resolve)
    })
  },

  /**
   * 显示只有一个确认按钮的提示框
   */
  alert(options: DialogAlertOptions): Promise<void> {
    return new Promise((resolve) => {
      showInternal(
        {
          title: options.title,
          content: options.content,
          maskClosable: options.maskClosable ?? true,
          buttons: [{ label: options.confirmText ?? '确定' }],
        },
        () => resolve(),
      )
    })
  },

  /**
   * 显示确认/取消对话框
   * 点击确认 → resolve(true)，点击取消 → resolve(false)
   */
  confirm(options: DialogConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      showInternal(
        {
          title: options.title,
          content: options.content,
          maskClosable: options.maskClosable ?? false,
          buttons: [
            { label: options.cancelText ?? '取消' },
            { label: options.confirmText ?? '确定' },
          ],
        },
        (result) => resolve(result.index === 1),
      )
    })
  },
}
