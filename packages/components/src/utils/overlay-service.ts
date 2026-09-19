// 命令式弹层公共装配
//
// 声明式弹层由 <weui-overlay-host /> 渲染；命令式 API（Dialog、Toast 等）
// 统一通过本模块挂载，避免每个服务重复处理 overlay-host 的查找与降级。

import type { Component } from 'vue'
import { getOverlayHost } from './overlay-host-ref'

export interface OverlayHandle {
  id: number
  zIndex: number
}

/**
 * 挂载命令式弹层，返回 overlay-host 分配的 id 与 z-index。
 * overlay-host 未挂载时返回 null，由调用方决定降级行为。
 */
export function addOverlay(
  component: Component,
  props: Record<string, unknown>,
): OverlayHandle | null {
  const host = getOverlayHost()
  if (!host) return null
  return host.add(component, props)
}

/** 移除命令式弹层；overlay-host 未挂载时静默忽略 */
export function removeOverlay(id: number): void {
  getOverlayHost()?.remove(id)
}

export interface ButtonTapResult<TButton> {
  /** 被点击的按钮；遮罩关闭时为 undefined */
  button: TButton | undefined
  /** 被点击的按钮索引；遮罩关闭时为 -1 */
  index: number
}

/**
 * 挂载带按钮列表的对话框类弹层。
 *
 * 关闭来源：
 *  - 按钮点击：触发 buttontap → resolve { button, index }
 *  - 遮罩点击（maskClosable）：触发 close → resolve { button: undefined, index: -1 }
 *
 * 按钮点击也会顺带触发 close（见 dialog.vue / half-screen-dialog.vue 的
 * handleButtonTap），因此用 settled 标志位保证 resolve 只调用一次。
 */
export function showDialogOverlay<TButton>(
  component: Component,
  props: Record<string, unknown>,
  resolve: (result: ButtonTapResult<TButton>) => void,
): void {
  let settled = false
  const safeResolve = (result: ButtonTapResult<TButton>): void => {
    if (settled) return
    settled = true
    resolve(result)
  }

  const handle = addOverlay(component, {
    ...props,
    // Vue 3: onXxx 形式的 prop 会被当作事件监听器
    onButtontap: (button: TButton, index: number) => {
      safeResolve({ button, index })
    },
    onClose: () => {
      // 遮罩关闭：无按钮点击，index 标记为 -1
      safeResolve({ button: undefined, index: -1 })
    },
  })

  if (!handle) {
    throw new Error('WeuiOverlayHost is not mounted')
  }
}
