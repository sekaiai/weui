import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiToast from '../toast.vue'
import { Toast, _resetForTest } from '../toast'
import { setOverlayHost } from '../../utils/overlay-host-ref'
import { overlayManager } from '../../utils/overlay'

describe('WeuiToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    overlayManager.reset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('visible', () => {
    it('visible=false 时不渲染', () => {
      const wrapper = mount(WeuiToast, { props: { visible: false } })
      expect(wrapper.find('.weui-toast').exists()).toBe(false)
      expect(wrapper.find('.weui-mask_transparent').exists()).toBe(false)
    })

    it('visible=true 时渲染 toast 与遮罩', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, duration: 0 },
      })
      expect(wrapper.find('.weui-toast').exists()).toBe(true)
      expect(wrapper.find('.weui-mask_transparent').exists()).toBe(true)
    })
  })

  describe('content', () => {
    it('渲染提示文字', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, content: '已完成', duration: 0 },
      })
      expect(wrapper.find('.weui-toast__content').text()).toBe('已完成')
    })
  })

  describe('type 与图标', () => {
    it('默认 type=success 使用 success-no-circle 图标', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, duration: 0 },
      })
      const icon = wrapper.find('.weui-icon_toast')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('weui-icon-success-no-circle')
      expect(wrapper.find('.weui-toast').classes()).not.toContain('weui-toast_text')
    })

    it('type=loading 使用 weui-primary-loading 图标', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, type: 'loading', duration: 0 },
      })
      const icon = wrapper.find('.weui-icon_toast')
      expect(icon.classes()).toContain('weui-primary-loading')
    })

    it('type=warning 使用 weui-icon-warn 图标', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, type: 'warning', duration: 0 },
      })
      const icon = wrapper.find('.weui-icon_toast')
      expect(icon.classes()).toContain('weui-icon-warn')
    })

    it('type=text 不渲染图标并添加 weui-toast_text 类', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, type: 'text', duration: 0 },
      })
      expect(wrapper.find('.weui-icon_toast').exists()).toBe(false)
      expect(wrapper.find('.weui-toast').classes()).toContain('weui-toast_text')
    })

    it('长文本类型添加官方 weui-toast_text-more 类', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, type: 'text', content: '这是一段超过十四个字符的长文本提示内容' },
      })
      expect(wrapper.find('.weui-toast').classes()).toContain('weui-toast_text-more')
    })
  })

  describe('mask', () => {
    it('默认显示透明遮罩', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, duration: 0 },
      })
      expect(wrapper.find('.weui-mask_transparent').exists()).toBe(true)
    })

    it('mask=false 时不渲染遮罩', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, mask: false, duration: 0 },
      })
      expect(wrapper.find('.weui-mask_transparent').exists()).toBe(false)
      expect(wrapper.find('.weui-toast').exists()).toBe(true)
    })
  })

  describe('extClass', () => {
    it('附加自定义类名到 toast 元素', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, extClass: 'my-toast', duration: 0 },
      })
      expect(wrapper.find('.weui-toast').classes()).toContain('my-toast')
    })
  })

  describe('zIndex', () => {
    it('设置 z-index 到遮罩元素', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, zIndex: 1234, duration: 0 },
      })
      const style = wrapper.find('.weui-mask_transparent').attributes('style') || ''
      expect(style).toContain('z-index: 1234')
    })

    it('未设置 zIndex 时不输出 z-index 样式', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, duration: 0 },
      })
      const style = wrapper.find('.weui-mask_transparent').attributes('style') || ''
      expect(style).not.toContain('z-index')
    })
  })

  describe('duration 自动关闭', () => {
    it('duration > 0 时到期触发 close/update:visible/weui-close', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, content: '提示', duration: 2000 },
      })
      vi.advanceTimersByTime(1999)
      expect(wrapper.emitted('close')).toBeFalsy()
      vi.advanceTimersByTime(1)
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('duration=0 时不自动关闭', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, content: '提示', duration: 0 },
      })
      vi.advanceTimersByTime(10000)
      expect(wrapper.emitted('close')).toBeFalsy()
      expect(wrapper.emitted('update:visible')).toBeFalsy()
    })

    it('未传 duration 时 success 默认 2000', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, type: 'success' },
      })
      vi.advanceTimersByTime(1999)
      expect(wrapper.emitted('close')).toBeFalsy()
      vi.advanceTimersByTime(1)
      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('未传 duration 时 loading 默认 0（不自动关闭）', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, type: 'loading' },
      })
      vi.advanceTimersByTime(10000)
      expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('显式 duration 优先于 type 默认值', () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, type: 'loading', duration: 1000 },
      })
      vi.advanceTimersByTime(999)
      expect(wrapper.emitted('close')).toBeFalsy()
      vi.advanceTimersByTime(1)
      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('visible 变为 false 时清除定时器', async () => {
      const wrapper = mount(WeuiToast, {
        props: { visible: true, content: '提示', duration: 2000 },
      })
      await wrapper.setProps({ visible: false })
      vi.advanceTimersByTime(2000)
      expect(wrapper.emitted('close')).toBeFalsy()
    })
  })
})

describe('Toast 命令式 API', () => {
  const addedItems: { component: unknown; props: Record<string, unknown> }[] = []
  const removeSpy = vi.fn()
  const mockHost = {
    add: (component: unknown, props: Record<string, unknown> = {}) => {
      addedItems.push({ component, props })
      return { id: addedItems.length, zIndex: 1000 + addedItems.length - 1 }
    },
    remove: removeSpy,
  }

  beforeEach(() => {
    vi.useFakeTimers()
    addedItems.length = 0
    removeSpy.mockClear()
    overlayManager.reset()
    // 先清除 host 再重置队列，避免重置时触发 host.add
    setOverlayHost(null)
    _resetForTest()
    setOverlayHost(mockHost)
  })

  afterEach(() => {
    vi.useRealTimers()
    setOverlayHost(null)
    _resetForTest()
  })

  describe('Toast.show', () => {
    it('调用 overlay-host.add 添加 Toast 组件', () => {
      Toast.show({ content: '已完成' })
      expect(addedItems).toHaveLength(1)
      expect(addedItems[0].props.visible).toBe(true)
      expect(addedItems[0].props.content).toBe('已完成')
    })

    it('未传 type 时默认 success', () => {
      Toast.show({ content: 'x' })
      expect(addedItems[0].props.type).toBe('success')
    })

    it('未传 duration 时为 undefined（交由组件按 type 取默认）', () => {
      Toast.show({ content: 'x' })
      expect(addedItems[0].props.duration).toBeUndefined()
    })

    it('自定义 duration 透传', () => {
      Toast.show({ content: 'x', duration: 0 })
      expect(addedItems[0].props.duration).toBe(0)
    })

    it('mask 默认 true', () => {
      Toast.show({ content: 'x' })
      expect(addedItems[0].props.mask).toBe(true)
    })

    it('mask=false 透传', () => {
      Toast.show({ content: 'x', mask: false })
      expect(addedItems[0].props.mask).toBe(false)
    })

    it('extClass 透传', () => {
      Toast.show({ content: 'x', extClass: 'custom' })
      expect(addedItems[0].props.extClass).toBe('custom')
    })

    it('type 透传', () => {
      Toast.show({ content: 'x', type: 'loading' })
      expect(addedItems[0].props.type).toBe('loading')
    })
  })

  describe('快捷方法', () => {
    it('Toast.success 传递 type=success', () => {
      Toast.success('成功')
      expect(addedItems[0].props.type).toBe('success')
      expect(addedItems[0].props.content).toBe('成功')
    })

    it('Toast.loading 传递 type=loading', () => {
      Toast.loading('加载中')
      expect(addedItems[0].props.type).toBe('loading')
      expect(addedItems[0].props.content).toBe('加载中')
    })

    it('Toast.warning 传递 type=warning', () => {
      Toast.warning('警告')
      expect(addedItems[0].props.type).toBe('warning')
    })

    it('Toast.text 传递 type=text', () => {
      Toast.text('纯文本')
      expect(addedItems[0].props.type).toBe('text')
    })

    it('快捷方法支持自定义 duration', () => {
      Toast.success('成功', 3000)
      expect(addedItems[0].props.duration).toBe(3000)
    })
  })

  describe('show 返回 Promise', () => {
    it('toast 关闭时 resolve', async () => {
      const promise = Toast.show({ content: 'x', duration: 0 })
      const onClose = addedItems[0].props.onClose as () => void
      onClose()
      await expect(promise).resolves.toBeUndefined()
    })

    it('自动关闭（duration 到期）后 resolve', async () => {
      const promise = Toast.show({ content: 'x', duration: 1000 })
      // 触发组件内定时器
      vi.advanceTimersByTime(1000)
      // 组件 emit close 后会调用 onClose prop
      const onClose = addedItems[0].props.onClose as () => void
      onClose()
      await expect(promise).resolves.toBeUndefined()
    })
  })

  describe('hide', () => {
    it('hide 移除当前 toast 并 resolve Promise', async () => {
      const promise = Toast.show({ content: 'x', duration: 0 })
      Toast.hide()
      expect(removeSpy).toHaveBeenCalledWith(1)
      await expect(promise).resolves.toBeUndefined()
    })

    it('无当前任务时 hide 不抛错', () => {
      expect(() => Toast.hide()).not.toThrow()
    })
  })

  describe('队列', () => {
    it('多次 show 排队，前一个关闭后才显示下一个', () => {
      Toast.show({ content: '第一个', duration: 0 })
      Toast.show({ content: '第二个', duration: 0 })
      // 只 add 了一次（第一个）
      expect(addedItems).toHaveLength(1)
      expect(addedItems[0].props.content).toBe('第一个')

      // 关闭第一个，触发第二个显示
      const onClose = addedItems[0].props.onClose as () => void
      onClose()
      expect(addedItems).toHaveLength(2)
      expect(addedItems[1].props.content).toBe('第二个')
    })

    it('hide 触发队列中下一个显示', async () => {
      Toast.show({ content: '第一个', duration: 0 })
      Toast.show({ content: '第二个', duration: 0 })
      expect(addedItems).toHaveLength(1)

      Toast.hide()
      expect(addedItems).toHaveLength(2)
      expect(addedItems[1].props.content).toBe('第二个')
    })
  })

  describe('未挂载 overlay-host', () => {
    it('getOverlayHost 为 null 时不抛错且 Promise resolve', async () => {
      setOverlayHost(null)
      const promise = Toast.show({ content: 'x' })
      await expect(promise).resolves.toBeUndefined()
    })
  })
})
