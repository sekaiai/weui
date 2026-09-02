import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import WeuiActionsheet from '../actionsheet.vue'
import type { ActionsheetItem } from '../actionsheet.vue'
import { Actionsheet } from '../actionsheet'
import { setOverlayHost } from '../../utils/overlay-host-ref'
import { overlayManager } from '../../utils/overlay'

describe('WeuiActionsheet', () => {
  beforeEach(() => {
    overlayManager.reset()
  })

  describe('visible', () => {
    it('visible=false 时不渲染', () => {
      const wrapper = mount(WeuiActionsheet, { props: { visible: false } })
      expect(wrapper.find('.weui-mask').exists()).toBe(false)
    })

    it('visible=true 时渲染遮罩', () => {
      const wrapper = mount(WeuiActionsheet, { props: { visible: true } })
      expect(wrapper.find('.weui-mask').exists()).toBe(true)
    })
  })

  describe('title', () => {
    it('设置 title 时渲染标题区域', () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, title: '选择操作' },
      })
      expect(wrapper.find('.weui-actionsheet__title').exists()).toBe(true)
      expect(wrapper.find('.weui-actionsheet__title-text').text()).toBe('选择操作')
    })

    it('不设置 title 时不渲染标题区域', () => {
      const wrapper = mount(WeuiActionsheet, { props: { visible: true } })
      expect(wrapper.find('.weui-actionsheet__title').exists()).toBe(false)
    })
  })

  describe('items', () => {
    const items: ActionsheetItem[] = [
      { label: '操作一' },
      { label: '操作二' },
      { label: '删除', warn: true },
    ]

    it('渲染所有菜单项', () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, items },
      })
      const cells = wrapper.findAll('.weui-actionsheet__menu .weui-actionsheet__cell')
      expect(cells).toHaveLength(3)
      expect(cells[0].text()).toContain('操作一')
      expect(cells[1].text()).toContain('操作二')
      expect(cells[2].text()).toContain('删除')
    })

    it('warn 项添加 weui-actionsheet__cell_warn 类名', () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, items },
      })
      const cells = wrapper.findAll('.weui-actionsheet__menu .weui-actionsheet__cell')
      expect(cells[2].classes()).toContain('weui-actionsheet__cell_warn')
    })

    it('带 tips 的项添加 weui-actionsheet__cell_tips 类名并渲染提示', () => {
      const itemsWithTips: ActionsheetItem[] = [
        { label: '删除', tips: '删除后不可恢复', warn: true },
      ]
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, items: itemsWithTips },
      })
      const cell = wrapper.find('.weui-actionsheet__menu .weui-actionsheet__cell')
      expect(cell.classes()).toContain('weui-actionsheet__cell_tips')
      expect(cell.find('.weui-actionsheet__cell__tips').text()).toBe('删除后不可恢复')
    })
  })

  describe('cancelText', () => {
    it('默认显示取消按钮', () => {
      const wrapper = mount(WeuiActionsheet, { props: { visible: true } })
      const action = wrapper.find('.weui-actionsheet__action')
      expect(action.exists()).toBe(true)
      expect(action.text()).toContain('取消')
    })

    it('cancelText 为空时不显示操作区', () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, cancelText: '' },
      })
      expect(wrapper.find('.weui-actionsheet__action').exists()).toBe(false)
    })

    it('自定义取消按钮文字', () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, cancelText: '关闭' },
      })
      expect(wrapper.find('.weui-actionsheet__action').text()).toContain('关闭')
    })
  })

  describe('extClass', () => {
    it('附加自定义类名到 actionsheet 元素', () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, extClass: 'my-actionsheet' },
      })
      expect(wrapper.find('.weui-actionsheet').classes()).toContain('my-actionsheet')
    })

    it('将 wrapperClass 绑定到遮罩结构层', () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, wrapperClass: 'sheet-wrapper' },
      })
      expect(wrapper.find('.weui-mask').classes()).toContain('sheet-wrapper')
    })
  })

  describe('zIndex', () => {
    it('设置 z-index 样式', () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, zIndex: 1234 },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).toContain('z-index: 1234')
    })

    it('未设置 zIndex 时不输出 z-index 样式', () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).not.toContain('z-index')
    })
  })

  describe('事件', () => {
    it('点击菜单项触发 select 和 close', async () => {
      const items: ActionsheetItem[] = [{ label: '操作一' }]
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, items },
      })
      await wrapper.find('.weui-actionsheet__menu .weui-actionsheet__cell').trigger('click')
      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')![0][0]).toEqual({ label: '操作一' })
      expect(wrapper.emitted('select')![0][1]).toBe(0)
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('点击取消按钮触发 cancel 和 close', async () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true },
      })
      await wrapper.find('.weui-actionsheet__action .weui-actionsheet__cell').trigger('click')
      expect(wrapper.emitted('cancel')).toBeTruthy()
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('maskClosable=true 时点击遮罩关闭', async () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, maskClosable: true },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('maskClosable=false 时点击遮罩不关闭', async () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, maskClosable: false },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('close')).toBeFalsy()
      expect(wrapper.emitted('update:visible')).toBeFalsy()
    })
  })

  describe('weui-close 事件', () => {
    it('点击菜单项触发 weui-close', async () => {
      const items: ActionsheetItem[] = [{ label: '操作一' }]
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, items },
      })
      await wrapper.find('.weui-actionsheet__menu .weui-actionsheet__cell').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('点击取消按钮触发 weui-close', async () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true },
      })
      await wrapper.find('.weui-actionsheet__action .weui-actionsheet__cell').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('maskClosable=true 时点击遮罩触发 weui-close', async () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, maskClosable: true },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('maskClosable=false 时点击遮罩不触发 weui-close', async () => {
      const wrapper = mount(WeuiActionsheet, {
        props: { visible: true, maskClosable: false },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeFalsy()
    })
  })

  describe('动画', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('visible=true 后 16ms 添加 weui-actionsheet_toggle 类', async () => {
      const wrapper = mount(WeuiActionsheet, { props: { visible: true } })
      // 挂载时 wrapperShow 立即为 true，但 toggle 类尚未添加
      expect(wrapper.find('.weui-actionsheet').exists()).toBe(true)
      expect(wrapper.find('.weui-actionsheet').classes()).not.toContain('weui-actionsheet_toggle')
      // 推进 16ms 触发滑入动画
      vi.advanceTimersByTime(16)
      await nextTick()
      expect(wrapper.find('.weui-actionsheet').classes()).toContain('weui-actionsheet_toggle')
    })

    it('visible=false 后移除 toggle 类，300ms 后卸载外层', async () => {
      const wrapper = mount(WeuiActionsheet, { props: { visible: true } })
      vi.advanceTimersByTime(16)
      await nextTick()
      expect(wrapper.find('.weui-actionsheet').classes()).toContain('weui-actionsheet_toggle')

      // 触发隐藏
      await wrapper.setProps({ visible: false })
      // 立即移除 toggle 类（滑出动画）
      expect(wrapper.find('.weui-actionsheet').classes()).not.toContain('weui-actionsheet_toggle')
      // 外层仍然挂载
      expect(wrapper.find('.weui-mask').exists()).toBe(true)
      // 推进 300ms 后卸载
      vi.advanceTimersByTime(300)
      await nextTick()
      expect(wrapper.find('.weui-mask').exists()).toBe(false)
    })

    it('快速切换 visible 时清理定时器避免冲突', async () => {
      const wrapper = mount(WeuiActionsheet, { props: { visible: true } })
      vi.advanceTimersByTime(16)
      await nextTick()
      expect(wrapper.find('.weui-actionsheet').classes()).toContain('weui-actionsheet_toggle')

      // 快速切换：隐藏后立即显示
      await wrapper.setProps({ visible: false })
      await wrapper.setProps({ visible: true })
      // toggle 类被立即移除（隐藏时），然后 16ms 后重新添加（显示时）
      expect(wrapper.find('.weui-actionsheet').classes()).not.toContain('weui-actionsheet_toggle')
      vi.advanceTimersByTime(16)
      await nextTick()
      expect(wrapper.find('.weui-actionsheet').classes()).toContain('weui-actionsheet_toggle')
    })
  })
})

describe('Actionsheet 命令式 API', () => {
  // mock overlay-host
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
    addedItems.length = 0
    removeSpy.mockClear()
    overlayManager.reset()
    setOverlayHost(mockHost)
  })

  afterEach(() => {
    setOverlayHost(null)
  })

  describe('Actionsheet.show', () => {
    it('调用 overlay-host.add 添加 Actionsheet 组件', () => {
      Actionsheet.show({ title: '标题', items: [{ label: '操作一' }] })
      expect(addedItems).toHaveLength(1)
      expect(addedItems[0].props.visible).toBe(true)
      expect(addedItems[0].props.title).toBe('标题')
      expect(addedItems[0].props.items).toEqual([{ label: '操作一' }])
    })

    it('默认 cancelText 为 "取消"', () => {
      Actionsheet.show({})
      expect(addedItems[0].props.cancelText).toBe('取消')
    })

    it('自定义 cancelText', () => {
      Actionsheet.show({ cancelText: '关闭' })
      expect(addedItems[0].props.cancelText).toBe('关闭')
    })

    it('默认 maskClosable 为 true', () => {
      Actionsheet.show({})
      expect(addedItems[0].props.maskClosable).toBe(true)
    })

    it('maskClosable=false 时透传', () => {
      Actionsheet.show({ maskClosable: false })
      expect(addedItems[0].props.maskClosable).toBe(false)
    })

    it('默认 items 为空数组', () => {
      Actionsheet.show({})
      expect(addedItems[0].props.items).toEqual([])
    })

    it('透传 extClass', () => {
      Actionsheet.show({ extClass: 'my-actionsheet' })
      expect(addedItems[0].props.extClass).toBe('my-actionsheet')
    })

    it('点击菜单项后 resolve 返回 item 和 index', async () => {
      const items: ActionsheetItem[] = [{ label: '操作一' }, { label: '操作二' }]
      const promise = Actionsheet.show({ items })
      const onSelect = addedItems[0].props.onSelect as (
        item: ActionsheetItem,
        index: number,
      ) => void
      onSelect({ label: '操作二' }, 1)
      const result = await promise
      expect(result.index).toBe(1)
      expect(result.item).toEqual({ label: '操作二' })
    })

    it('点击取消按钮后 resolve 返回 index -1', async () => {
      const promise = Actionsheet.show({})
      const onCancel = addedItems[0].props.onCancel as () => void
      onCancel()
      const result = await promise
      expect(result.index).toBe(-1)
      expect(result.item).toBeNull()
    })

    it('点击遮罩（onClose）后 resolve 返回 index -1', async () => {
      const promise = Actionsheet.show({})
      const onClose = addedItems[0].props.onClose as () => void
      onClose()
      const result = await promise
      expect(result.index).toBe(-1)
      expect(result.item).toBeNull()
    })

    it('onSelect 先于 onClose 触发时以 onSelect 结果为准', async () => {
      const items: ActionsheetItem[] = [{ label: '操作一' }]
      const promise = Actionsheet.show({ items })
      const onSelect = addedItems[0].props.onSelect as (
        item: ActionsheetItem,
        index: number,
      ) => void
      const onClose = addedItems[0].props.onClose as () => void
      onSelect({ label: '操作一' }, 0)
      onClose()
      const result = await promise
      expect(result.index).toBe(0)
      expect(result.item).toEqual({ label: '操作一' })
    })
  })

  describe('未挂载 overlay-host', () => {
    it('getOverlayHost 为 null 时不抛错', () => {
      setOverlayHost(null)
      expect(() => Actionsheet.show({})).not.toThrow()
    })

    it('返回 resolve 为取消的 promise', async () => {
      setOverlayHost(null)
      const promise = Actionsheet.show({})
      await expect(promise).resolves.toEqual({ item: null, index: -1 })
    })
  })
})
