import { describe, it, expect, beforeEach } from 'vitest'
import { overlayManager } from '../overlay'

describe('overlayManager', () => {
  beforeEach(() => {
    overlayManager.reset()
  })

  it('每次 push 应返回递增的 z-index，起始 1000', () => {
    expect(overlayManager.push()).toBe(1000)
    expect(overlayManager.push()).toBe(1001)
    expect(overlayManager.push()).toBe(1002)
  })

  it('pop 应移除栈顶并返回剩余栈顶的 z-index', () => {
    const a = overlayManager.push()
    const b = overlayManager.push()
    expect(overlayManager.pop()).toBe(a)
    expect(overlayManager.pop()).toBe(undefined)
  })

  it('空栈 pop 返回 undefined', () => {
    expect(overlayManager.pop()).toBe(undefined)
  })

  it('reset 清空栈', () => {
    overlayManager.push()
    overlayManager.push()
    overlayManager.reset()
    expect(overlayManager.push()).toBe(1000)
  })

  it('size 返回当前栈大小', () => {
    expect(overlayManager.size()).toBe(0)
    overlayManager.push()
    overlayManager.push()
    expect(overlayManager.size()).toBe(2)
  })
})
