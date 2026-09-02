// Picker 命令式 API
// 通过 overlay-host 渲染 WeuiPicker，提供 show 方法
// 调用前需确保应用中已挂载 <weui-overlay-host />

import WeuiPicker from './picker.vue'
import type { PickerColumn } from './picker.vue'
import { getOverlayHost } from '../utils/overlay-host-ref'

export type { PickerColumn } from './picker.vue'
export type { PickerOption } from './picker-group.vue'

export interface PickerShowOptions {
  /** 标题 */
  title?: string
  /** 副标题描述 */
  desc?: string
  /** 多列配置 */
  columns: PickerColumn[]
  /** 是否显示左上角关闭按钮，默认 false；传入 showClose: true 即启用 */
  showClose?: boolean
  /** 官方命名的关闭按钮文字，默认 "关闭" */
  closeText?: string
  /** 兼容旧版本的取消按钮文字；closeText 优先 */
  cancelText?: string
  /** 确定按钮文字，默认 "确定" */
  confirmText?: string
  /** 点击遮罩是否关闭，默认 true */
  maskClosable?: boolean
  /** 自定义附加类名 */
  extClass?: string
  /** 弹层宿主包装层的扩展类名。 */
  wrapperClass?: string
}

export interface PickerShowResult {
  /** 触发动作：confirm 确认 / cancel 取消（取消按钮或遮罩点击） */
  action: 'confirm' | 'cancel'
  /** 各列选中索引（cancel 时为空数组） */
  indexes: number[]
  /** 各列选中值（cancel 时为空数组） */
  values: (string | number)[]
}

export const Picker = {
  /**
   * 显示选择器
   * 点击确定 → resolve({ action: 'confirm', indexes, values })
   * 点击取消 / 遮罩 → resolve({ action: 'cancel', indexes: [], values: [] })
   */
  show(options: PickerShowOptions): Promise<PickerShowResult> {
    return new Promise((resolve) => {
      const host = getOverlayHost()
      if (!host) {
        // 未挂载 overlay-host 时，降级为取消
        resolve({ action: 'cancel', indexes: [], values: [] })
        return
      }

      const props: Record<string, unknown> = {
        visible: true,
        title: options.title,
        desc: options.desc,
        columns: options.columns,
        showClose: options.showClose ?? false,
        closeText: options.closeText,
        cancelText: options.cancelText,
        confirmText: options.confirmText ?? '确定',
        maskClosable: options.maskClosable ?? true,
        extClass: options.extClass,
        wrapperClass: options.wrapperClass,
        // Vue 3: onXxx 形式的 prop 会被当作事件监听器
        onConfirm: (indexes: number[], values: (string | number)[]) => {
          resolve({ action: 'confirm', indexes, values })
        },
        onCancel: () => {
          resolve({ action: 'cancel', indexes: [], values: [] })
        },
        onClose: () => {
          resolve({ action: 'cancel', indexes: [], values: [] })
        },
      }

      host.add(WeuiPicker, props)
    })
  },
}
