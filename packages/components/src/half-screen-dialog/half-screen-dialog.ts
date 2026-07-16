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
}

export interface HalfScreenDialogShowResult {
  /** 被点击的按钮 */
  button: HalfScreenDialogButton
  /** 被点击的按钮索引 */
  index: number
}

/** 构造传给 WeuiHalfScreenDialog 的 props + onButtontap 监听器 */
function showInternal(
  options: HalfScreenDialogShowOptions,
  resolve: (result: HalfScreenDialogShowResult) => void,
): void {
  const host = getOverlayHost()
  if (!host) {
    // 未挂载 overlay-host 时，降级为无操作（生产环境应避免）
    return
  }

  const buttons: HalfScreenDialogButton[] = options.buttons ?? []

  const props: Record<string, unknown> = {
    visible: true,
    title: options.title,
    subtitle: options.subtitle,
    content: options.content,
    buttons,
    maskClosable: options.maskClosable ?? true,
    mask: options.mask ?? true,
    extClass: options.extClass,
    // Vue 3: onXxx 形式的 prop 会被当作事件监听器
    onButtontap: (btn: HalfScreenDialogButton, index: number) => {
      resolve({ button: btn, index })
    },
  }

  host.add(WeuiHalfScreenDialog, props)
}

export const HalfScreenDialog = {
  /**
   * 显示半屏弹窗
   * 点击任意按钮后关闭并 resolve
   */
  show(options: HalfScreenDialogShowOptions): Promise<HalfScreenDialogShowResult> {
    return new Promise((resolve) => {
      showInternal(options, resolve)
    })
  },
}
