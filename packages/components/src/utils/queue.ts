// Toast 队列：多次调用自动排队，避免叠加
// 泛型 T 为任务负载（如 toast 的配置对象）

export type ToastTask<T> = T

export class ToastQueue<T> {
  private tasks: ToastTask<T>[] = []
  private executor: (task: ToastTask<T>) => void

  constructor(executor: (task: ToastTask<T>) => void) {
    this.executor = executor
  }

  /** 入队。若队列为空，立即执行；否则排队等待 */
  enqueue(task: ToastTask<T>): void {
    this.tasks.push(task)
    if (this.tasks.length === 1) {
      this.executor(task)
    }
  }

  /** 标记当前任务完成，执行下一个 */
  done(): void {
    this.tasks.shift()
    if (this.tasks.length > 0) {
      this.executor(this.tasks[0])
    }
  }

  /** 当前队列长度 */
  size(): number {
    return this.tasks.length
  }
}
