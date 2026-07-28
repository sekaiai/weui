// 弹层 z-index 全局栈
// 声明式与命令式弹层共享同一栈，避免遮挡错乱
// z-index 起始 1000，每次 push 递增

const BASE_Z_INDEX = 1000

class OverlayManager {
  private stack: number[] = []

  /** 压入栈，返回分配的 z-index */
  push(): number {
    const next = this.stack.length === 0
      ? BASE_Z_INDEX
      : this.stack[this.stack.length - 1] + 1
    this.stack.push(next)
    return next
  }

  /** 弹出栈顶，返回新的栈顶 z-index（若栈空返回 undefined） */
  pop(): number | undefined {
    this.stack.pop()
    return this.stack.length === 0
      ? undefined
      : this.stack[this.stack.length - 1]
  }

  /** 移除指定层级；命令式弹层可以按任意关闭顺序安全释放 */
  remove(zIndex: number): number | undefined {
    const index = this.stack.indexOf(zIndex)
    if (index !== -1) this.stack.splice(index, 1)
    return this.stack.length === 0
      ? undefined
      : this.stack[this.stack.length - 1]
  }

  /** 当前栈大小 */
  size(): number {
    return this.stack.length
  }

  /** 重置栈（测试用） */
  reset(): void {
    this.stack = []
  }
}

export const overlayManager = new OverlayManager()
