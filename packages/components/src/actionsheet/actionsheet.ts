// Actionsheet 命令式 API
// 通过 overlay-host 渲染 WeuiActionsheet，提供 show 方法
// 调用前需确保应用中已挂载 <weui-overlay-host />

import WeuiActionsheet from './actionsheet.vue'
import type { ActionsheetItem } from './actionsheet.vue'
import { getOverlayHost } from '../utils/overlay-host-ref'

export type { ActionsheetItem } from './actionsheet.vue'

export interface ActionsheetShowOptions {
  /** 标题 */
  title?: string
  /** 菜单项列表 */
  items?: ActionsheetItem[]
  /** 取消按钮文字，默认 "取消" */
  cancelText?: string
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 遮罩结构包装层的扩展类名。 */
  wrapperClass?: string
}

export interface ActionsheetShowResult {
  /** 被点击的菜单项，取消时为 null */
  item: ActionsheetItem | null
  /** 被点击的菜单项索引，-1 表示取消 */
  index: number
}

export const Actionsheet = {
  /**
   * 显示操作菜单
   * 点击菜单项 → resolve({ item, index })
   * 点击取消按钮 / 遮罩 → resolve({ item: null, index: -1 })
   */
  show(options: ActionsheetShowOptions): Promise<ActionsheetShowResult> {
    return new Promise((resolve) => {
      const host = getOverlayHost()
      if (!host) {
        // 未挂载 overlay-host 时，降级为取消
        resolve({ item: null, index: -1 })
        return
      }

      const props: Record<string, unknown> = {
        visible: true,
        title: options.title,
        items: options.items ?? [],
        cancelText: options.cancelText ?? '取消',
        maskClosable: options.maskClosable ?? true,
        extClass: options.extClass,
        wrapperClass: options.wrapperClass,
        // Vue 3: onXxx 形式的 prop 会被当作事件监听器
        onSelect: (item: ActionsheetItem, index: number) => {
          resolve({ item, index })
        },
        onCancel: () => {
          resolve({ item: null, index: -1 })
        },
        onClose: () => {
          resolve({ item: null, index: -1 })
        },
      }

      host.add(WeuiActionsheet, props)
    })
  },
}
