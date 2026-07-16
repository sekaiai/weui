import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ToastQueue, type ToastTask } from '../queue'

describe('ToastQueue', () => {
  let queue: ToastQueue<string>
  let executed: string[]

  beforeEach(() => {
    executed = []
    queue = new ToastQueue<string>((task) => {
      executed.push(task)
    })
  })

  it('enqueue 后立即执行第一个任务', () => {
    queue.enqueue('a')
    expect(executed).toEqual(['a'])
  })

  it('任务在栈上排队，done 后才执行下一个', () => {
    queue.enqueue('a')
    queue.enqueue('b')
    expect(executed).toEqual(['a'])
    queue.done()
    expect(executed).toEqual(['a', 'b'])
  })

  it('所有任务 done 后队列清空', () => {
    queue.enqueue('a')
    queue.enqueue('b')
    queue.done()
    queue.done()
    expect(queue.size()).toBe(0)
  })

  it('空队列 done 无副作用', () => {
    expect(() => queue.done()).not.toThrow()
    expect(queue.size()).toBe(0)
  })

  it('size 返回当前队列长度', () => {
    expect(queue.size()).toBe(0)
    queue.enqueue('a')
    expect(queue.size()).toBe(1)
    queue.enqueue('b')
    expect(queue.size()).toBe(2)
    queue.done()
    expect(queue.size()).toBe(1)
  })
})
