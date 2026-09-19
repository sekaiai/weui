// HalfScreenDialog 命令式 API
// 通过 overlay-host 渲染 WeuiHalfScreenDialog，提供 show 方法
// 调用前需确保应用中已挂载 <weui-overlay-host />

import WeuiHalfScreenDialog from './half-screen-dialog.vue'
import type { HalfScreenDialogButton } from './half-screen-dialog.vue'
import { showDialogOverlay } from '../utils/overlay-service'

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

export const HalfScreenDialog = {
  /**
   * 显示半屏弹窗
   * 点击任意按钮后 resolve { button, index }
   * 点击遮罩关闭时 resolve { button: undefined, index: -1 }
   */
  show(options: HalfScreenDialogShowOptions): Promise<HalfScreenDialogShowResult> {
    return new Promise((resolve) => {
      showDialogOverlay<HalfScreenDialogButton>(
        WeuiHalfScreenDialog,
        {
          visible: true,
          title: options.title,
          subtitle: options.subtitle,
          content: options.content,
          buttons: options.buttons ?? [],
          maskClosable: options.maskClosable ?? true,
          mask: options.mask ?? true,
          extClass: options.extClass,
          wrapperClass: options.wrapperClass,
        },
        resolve,
      )
    })
  },
}
