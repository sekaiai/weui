import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiToptips from '../toptips.vue'
import { Toptips } from '../toptips'
import { setOverlayHost } from '../../utils/overlay-host-ref'
import { overlayManager } from '../../utils/overlay'

describe('WeuiToptips', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    overlayManager.reset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('visible', () => {
    it('visible=false 时不渲染', () => {
      const wrapper = mount(WeuiToptips, { props: { visible: false } })
      expect(wrapper.find('.weui-toptips').exists()).toBe(false)
    })

    it('visible=true 时渲染', () => {
      const wrapper = mount(WeuiToptips, { props: { visible: true, duration: 0 } })
      expect(wrapper.find('.weui-toptips').exists()).toBe(true)
    })
  })

  describe('content', () => {
    it('渲染提示文字', () => {
      const wrapper = mount(WeuiToptips, {
        props: { visible: true, content: '操作成功', duration: 0 },
      })
      expect(wrapper.find('.weui-toptips').text()).toBe('操作成功')
    })
  })

  describe('官方样式', () => {
    it('始终添加官方 weui-toptips_warn 类名', () => {
      const wrapper = mount(WeuiToptips, { props: { visible: true, duration: 0 } })
      expect(wrapper.find('.weui-toptips').classes()).toContain('weui-toptips_warn')
    })
  })

  describe('extClass', () => {
    it('附加自定义类名', () => {
      const wrapper = mount(WeuiToptips, {
        props: { visible: true, extClass: 'my-toptips', duration: 0 },
      })
      expect(wrapper.find('.weui-toptips').classes()).toContain('my-toptips')
    })
  })

  describe('zIndex', () => {
    it('设置 z-index 样式', () => {
      const wrapper = mount(WeuiToptips, {
        props: { visible: true, zIndex: 1234, duration: 0 },
      })
      const style = wrapper.find('.weui-toptips').attributes('style') || ''
      expect(style).toContain('z-index: 1234')
    })
  })

  describe('duration 自动关闭', () => {
    it('duration > 0 时到期后触发 close/update:visible/weui-close', () => {
      const wrapper = mount(WeuiToptips, {
        props: { visible: true, content: '提示', duration: 2000 },
      })
      // 未到期不触发
      vi.advanceTimersByTime(1999)
      expect(wrapper.emitted('close')).toBeFalsy()
      // 到期触发
      vi.advanceTimersByTime(1)
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('duration=0 时不自动关闭', () => {
      const wrapper = mount(WeuiToptips, {
        props: { visible: true, content: '提示', duration: 0 },
      })
      vi.advanceTimersByTime(10000)
      expect(wrapper.emitted('close')).toBeFalsy()
      expect(wrapper.emitted('update:visible')).toBeFalsy()
    })

    it('visible 变为 false 时清除定时器', async () => {
      const wrapper = mount(WeuiToptips, {
        props: { visible: true, content: '提示', duration: 2000 },
      })
      await wrapper.setProps({ visible: false })
      vi.advanceTimersByTime(2000)
      // 父组件主动关闭，不应再触发 close
      expect(wrapper.emitted('close')).toBeFalsy()
    })
  })
})

describe('Toptips 命令式 API', () => {
  // mock overlay-host
  const addedItems: { component: unknown; props: Record<string, unknown> }[] = []
  const mockHost = {
    add: (component: unknown, props: Record<string, unknown> = {}) => {
      addedItems.push({ component, props })
      return { id: addedItems.length, zIndex: 1000 + addedItems.length - 1 }
    },
    remove: () => {},
  }

  beforeEach(() => {
    vi.useFakeTimers()
    addedItems.length = 0
    overlayManager.reset()
    setOverlayHost(mockHost)
  })

  afterEach(() => {
    vi.useRealTimers()
    setOverlayHost(null)
  })

  describe('Toptips.show', () => {
    it('调用 overlay-host.add 添加 Toptips 组件', () => {
      Toptips.show({ content: '提示' })
      expect(addedItems).toHaveLength(1)
      expect(addedItems[0].props.visible).toBe(true)
      expect(addedItems[0].props.content).toBe('提示')
      expect(addedItems[0].props.type).toBe('warn')
    })

    it('不传递非官方 type 属性', () => {
      Toptips.show({ content: 'x' })
      expect(addedItems[0].props.type).toBe('warn')
    })

    it('未传 duration 时默认 2000', () => {
      Toptips.show({ content: 'x' })
      expect(addedItems[0].props.duration).toBe(2000)
    })

    it('自定义 duration 透传', () => {
      Toptips.show({ content: 'x', duration: 0 })
      expect(addedItems[0].props.duration).toBe(0)
    })

    it('extClass 透传', () => {
      Toptips.show({ content: 'x', extClass: 'custom' })
      expect(addedItems[0].props.extClass).toBe('custom')
    })
  })

  describe('快捷方法', () => {
    it('Toptips.warn 传递提示内容', () => {
      Toptips.warn('警告')
      expect(addedItems[0].props.content).toBe('警告')
    })

    it('快捷方法支持自定义 duration', () => {
      Toptips.warn('警告', 3000)
      expect(addedItems[0].props.duration).toBe(3000)
    })
  })

  describe('未挂载 overlay-host', () => {
    it('getOverlayHost 为 null 时不抛错', () => {
      setOverlayHost(null)
      expect(() => Toptips.show({ content: 'x' })).not.toThrow()
    })
  })
})
