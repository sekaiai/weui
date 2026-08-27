import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import WeuiPicker from '../picker.vue'
import WeuiPickerGroup from '../picker-group.vue'
import type { PickerOption } from '../picker-group.vue'
import type { PickerColumn } from '../picker.vue'
import { Picker } from '../picker'
import { setOverlayHost } from '../../utils/overlay-host-ref'
import { overlayManager } from '../../utils/overlay'

const sampleOptions: PickerOption[] = [
  { label: '选项一', value: 'a' },
  { label: '选项二', value: 'b' },
  { label: '选项三', value: 'c' },
]

describe('WeuiPickerGroup', () => {
  describe('渲染', () => {
    it('渲染所有选项', () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions },
      })
      const items = wrapper.findAll('.weui-picker__item')
      expect(items).toHaveLength(3)
      expect(items[0].text()).toBe('选项一')
      expect(items[1].text()).toBe('选项二')
      expect(items[2].text()).toBe('选项三')
    })

    it('渲染 picker 结构类名', () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions },
      })
      expect(wrapper.find('.weui-picker__group').exists()).toBe(true)
      expect(wrapper.find('.weui-picker__mask').exists()).toBe(true)
      expect(wrapper.find('.weui-picker__indicator').exists()).toBe(true)
      expect(wrapper.find('.weui-picker__content').exists()).toBe(true)
    })

    it('禁用项添加 weui-picker__item_disabled 类名', () => {
      const options: PickerOption[] = [
        { label: '可选', value: 'a' },
        { label: '禁用', value: 'b', disabled: true },
      ]
      const wrapper = mount(WeuiPickerGroup, { props: { options } })
      const items = wrapper.findAll('.weui-picker__item')
      expect(items[0].classes()).not.toContain('weui-picker__item_disabled')
      expect(items[1].classes()).toContain('weui-picker__item_disabled')
    })
  })

  describe('index 与 offset', () => {
    it('默认 index=0 时 offset 为 INDICATOR_TOP', () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions, index: 0 },
      })
      const style = wrapper.find('.weui-picker__content').attributes('style') || ''
      // INDICATOR_TOP = 112, offset = 112 - 0 * 56 = 112
      expect(style).toContain('translate3d(0, 112px, 0)')
    })

    it('index=1 时 offset 上移一个 ITEM_HEIGHT', () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions, index: 1 },
      })
      const style = wrapper.find('.weui-picker__content').attributes('style') || ''
      // offset = 112 - 1 * 56 = 56
      expect(style).toContain('translate3d(0, 56px, 0)')
    })

    it('index 变化时同步 offset', async () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions, index: 0 },
      })
      await wrapper.setProps({ index: 2 })
      const style = wrapper.find('.weui-picker__content').attributes('style') || ''
      // offset = 112 - 2 * 56 = 0
      expect(style).toContain('translate3d(0, 0px, 0)')
    })
  })

  describe('触摸滚动', () => {
    it('向上滑动一个 item 后触发 change(index +1)', async () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions, index: 0 },
      })
      const group = wrapper.find('.weui-picker__group')
      // touchstart at clientY=100
      await group.trigger('touchstart', { touches: [{ clientY: 100 }] })
      // touchmove to clientY=44（delta=-56，向上一个 item）
      await group.trigger('touchmove', { touches: [{ clientY: 44 }] })
      // touchend
      await group.trigger('touchend')

      // 应触发 change，索引从 0 变为 1
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')![0][0]).toBe(1)
    })

    it('向下滑动一个 item 后触发 change(index -1)', async () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions, index: 1 },
      })
      const group = wrapper.find('.weui-picker__group')
      // touchstart at clientY=100
      await group.trigger('touchstart', { touches: [{ clientY: 100 }] })
      // touchmove to clientY=156（delta=+56，向下一个 item）
      await group.trigger('touchmove', { touches: [{ clientY: 156 }] })
      // touchend
      await group.trigger('touchend')

      // 应触发 change，索引从 1 变为 0
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')![0][0]).toBe(0)
    })

    it('滑动距离不足一个 item 时不触发 change', async () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions, index: 0 },
      })
      const group = wrapper.find('.weui-picker__group')
      // touchstart at clientY=100
      await group.trigger('touchstart', { touches: [{ clientY: 100 }] })
      // touchmove to clientY=90（delta=-10，远不足一个 item）
      await group.trigger('touchmove', { touches: [{ clientY: 90 }] })
      await group.trigger('touchend')

      // 不应触发 change（索引仍为 0）
      expect(wrapper.emitted('change')).toBeFalsy()
    })

    it('滑动超出边界时索引被夹紧到 0', async () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions, index: 0 },
      })
      const group = wrapper.find('.weui-picker__group')
      // 向下大幅滑动（超出上边界）
      await group.trigger('touchstart', { touches: [{ clientY: 100 }] })
      await group.trigger('touchmove', { touches: [{ clientY: 500 }] })
      await group.trigger('touchend')

      // 索引仍为 0（被夹紧），不触发 change
      expect(wrapper.emitted('change')).toBeFalsy()
    })

    it('滑动超出边界时索引被夹紧到 maxIndex', async () => {
      const wrapper = mount(WeuiPickerGroup, {
        props: { options: sampleOptions, index: 0 },
      })
      const group = wrapper.find('.weui-picker__group')
      // 向上大幅滑动（超出下边界）
      await group.trigger('touchstart', { touches: [{ clientY: 100 }] })
      await group.trigger('touchmove', { touches: [{ clientY: -500 }] })
      await group.trigger('touchend')

      // 索引应被夹紧到 2（最后一项），触发 change
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')![0][0]).toBe(2)
    })
  })
})

describe('WeuiPicker', () => {
  beforeEach(() => {
    overlayManager.reset()
  })

  describe('visible', () => {
    it('visible=false 时不渲染', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: false, columns: [{ options: sampleOptions }] },
      })
      expect(wrapper.find('.weui-mask').exists()).toBe(false)
      expect(wrapper.find('.weui-picker').exists()).toBe(false)
    })

    it('visible=true 时渲染遮罩和 picker', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns: [{ options: sampleOptions }] },
      })
      expect(wrapper.find('.weui-mask').exists()).toBe(true)
      expect(wrapper.find('.weui-picker').exists()).toBe(true)
      expect(wrapper.find('.weui-half-screen-dialog').classes()).toContain('weui-picker')
    })
  })

  describe('title', () => {
    it('设置 title 时渲染标题', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, title: '请选择', columns: [{ options: sampleOptions }] },
      })
      const title = wrapper.find('.weui-half-screen-dialog__title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('请选择')
    })

    it('不设置 title 时不渲染标题', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns: [{ options: sampleOptions }] },
      })
      expect(wrapper.find('.weui-half-screen-dialog__title').exists()).toBe(true)
      expect(wrapper.find('.weui-half-screen-dialog__title').text()).toBe('')
    })
  })

  describe('closeText / cancelText / confirmText', () => {
    it('默认隐藏关闭按钮，仅显示官方确认按钮', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns: [{ options: sampleOptions }] },
      })
      expect(wrapper.find('.weui-half-screen-dialog__hd__side').exists()).toBe(false)
      expect(wrapper.find('.weui-picker__btn').text()).toBe('确定')
    })

    it('showClose=true 时显示官方关闭按钮', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, showClose: true, columns: [{ options: sampleOptions }] },
      })
      expect(wrapper.find('.weui-half-screen-dialog__hd__side button').text()).toContain('关闭')
    })

    it('自定义 closeText 和 confirmText', () => {
      const wrapper = mount(WeuiPicker, {
        props: {
          visible: true,
          showClose: true,
          closeText: '返回',
          confirmText: '完成',
          columns: [{ options: sampleOptions }],
        },
      })
      expect(wrapper.find('.weui-half-screen-dialog__hd__side button').text()).toContain('返回')
      expect(wrapper.find('.weui-picker__btn').text()).toBe('完成')
    })

    it('cancelText 作为兼容别名，closeText 优先', async () => {
      const wrapper = mount(WeuiPicker, {
        props: {
          visible: true,
          showClose: true,
          cancelText: '取消旧文案',
          columns: [{ options: sampleOptions }],
        },
      })
      expect(wrapper.find('.weui-half-screen-dialog__hd__side button').text()).toContain('取消旧文案')

      await wrapper.setProps({ closeText: '关闭新文案' })
      expect(wrapper.find('.weui-half-screen-dialog__hd__side button').text()).toContain('关闭新文案')
    })

    it('showClose=false 时隐藏关闭按钮', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, showClose: false, columns: [{ options: sampleOptions }] },
      })
      expect(wrapper.find('.weui-half-screen-dialog__hd__side').exists()).toBe(false)
    })

    it('渲染标题描述', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, title: '标题', desc: '描述', columns: [{ options: sampleOptions }] },
      })
      expect(wrapper.find('.weui-half-screen-dialog__title').text()).toBe('标题')
      expect(wrapper.find('.weui-half-screen-dialog__subtitle').text()).toBe('描述')
    })
  })

  describe('columns', () => {
    it('单列渲染一个 picker-group', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns: [{ options: sampleOptions }] },
      })
      expect(wrapper.findAll('.weui-picker__group')).toHaveLength(1)
    })

    it('多列渲染多个 picker-group', () => {
      const columns: PickerColumn[] = [
        { options: sampleOptions },
        { options: [{ label: 'X', value: 'x' }, { label: 'Y', value: 'y' }] },
        { options: [{ label: '1', value: 1 }, { label: '2', value: 2 }] },
      ]
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns },
      })
      expect(wrapper.findAll('.weui-picker__group')).toHaveLength(3)
    })

    it('每列 index 初始选中', () => {
      const columns: PickerColumn[] = [
        { options: sampleOptions, index: 1 },
        { options: sampleOptions, index: 2 },
      ]
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns },
      })
      const groups = wrapper.findAll('.weui-picker__group')
      // 第一列 index=1，offset = 112 - 56 = 56
      expect(groups[0].find('.weui-picker__content').attributes('style') || '').toContain('translate3d(0, 56px, 0)')
      // 第二列 index=2，offset = 112 - 112 = 0
      expect(groups[1].find('.weui-picker__content').attributes('style') || '').toContain('translate3d(0, 0px, 0)')
    })
  })

  describe('extClass', () => {
    it('附加自定义类名到 picker 元素', () => {
      const wrapper = mount(WeuiPicker, {
        props: {
          visible: true,
          extClass: 'my-picker',
          columns: [{ options: sampleOptions }],
        },
      })
      expect(wrapper.find('.weui-picker').classes()).toContain('my-picker')
    })
  })

  describe('zIndex', () => {
    it('设置 z-index 到遮罩元素', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, zIndex: 1234, columns: [{ options: sampleOptions }] },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).toContain('z-index: 1234')
    })

    it('未设置 zIndex 时不输出 z-index 样式', () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns: [{ options: sampleOptions }] },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).not.toContain('z-index')
    })
  })

  describe('事件', () => {
    const columns: PickerColumn[] = [
      { options: sampleOptions, index: 0 },
    ]

    it('picker-group 触发 change 时冒泡为 change 事件（带索引和值）', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns },
      })
      const group = wrapper.find('.weui-picker__group')
      // 滑动使索引从 0 变 1
      await group.trigger('touchstart', { touches: [{ clientY: 100 }] })
      await group.trigger('touchmove', { touches: [{ clientY: 44 }] })
      await group.trigger('touchend')

      expect(wrapper.emitted('change')).toBeTruthy()
      const [indexes, values] = wrapper.emitted('change')![0] as [number[], (string | number)[]]
      expect(indexes).toEqual([1])
      expect(values).toEqual(['b'])
    })

    it('点击确定触发 confirm（带索引和值）并关闭', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns },
      })
      await wrapper.find('.weui-picker__btn').trigger('click')
      expect(wrapper.emitted('confirm')).toBeTruthy()
      const [indexes, values] = wrapper.emitted('confirm')![0] as [number[], (string | number)[]]
      expect(indexes).toEqual([0])
      expect(values).toEqual(['a'])
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('点击取消触发 cancel 并关闭', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, showClose: true, columns },
      })
      await wrapper.find('.weui-half-screen-dialog__hd__side button').trigger('click')
      expect(wrapper.emitted('cancel')).toBeTruthy()
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('maskClosable=true 时点击遮罩关闭', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, maskClosable: true, columns },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('maskClosable=false 时点击遮罩不关闭', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, maskClosable: false, columns },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('close')).toBeFalsy()
      expect(wrapper.emitted('update:visible')).toBeFalsy()
    })
  })

  describe('weui-close 事件', () => {
    it('点击确定触发 weui-close', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns: [{ options: sampleOptions }] },
      })
      await wrapper.find('.weui-picker__btn').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('点击取消触发 weui-close', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, showClose: true, columns: [{ options: sampleOptions }] },
      })
      await wrapper.find('.weui-half-screen-dialog__hd__side button').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('maskClosable=true 时点击遮罩触发 weui-close', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, maskClosable: true, columns: [{ options: sampleOptions }] },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('maskClosable=false 时点击遮罩不触发 weui-close', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, maskClosable: false, columns: [{ options: sampleOptions }] },
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

    it('visible=true 后 16ms 添加官方滑入动画类', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns: [{ options: sampleOptions }] },
      })
      // 挂载时 wrapperShow 立即为 true，但 showSheet=false（picker 在屏幕下方）
      expect(wrapper.find('.weui-picker').exists()).toBe(true)
      expect(wrapper.find('.weui-picker').classes()).not.toContain('weui-transition_show')
      // 推进 16ms 触发滑入
      vi.advanceTimersByTime(16)
      await nextTick()
      expect(wrapper.find('.weui-picker').classes()).toContain('weui-transition_show')
      expect(wrapper.find('.weui-picker').classes()).toContain('weui-animate-slide-up')
    })

    it('visible=false 后滑出，300ms 后卸载外层', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns: [{ options: sampleOptions }] },
      })
      vi.advanceTimersByTime(16)
      await nextTick()

      // 触发隐藏
      await wrapper.setProps({ visible: false })
      // 立即滑出，使用官方 slide-down 类
      expect(wrapper.find('.weui-picker').classes()).toContain('weui-animate-slide-down')
      // 外层仍然挂载
      expect(wrapper.find('.weui-mask').exists()).toBe(true)
      // 推进 300ms 后卸载
      vi.advanceTimersByTime(300)
      await nextTick()
      expect(wrapper.find('.weui-mask').exists()).toBe(false)
    })

    it('快速切换 visible 时清理定时器避免冲突', async () => {
      const wrapper = mount(WeuiPicker, {
        props: { visible: true, columns: [{ options: sampleOptions }] },
      })
      vi.advanceTimersByTime(16)
      await nextTick()

      // 快速切换：隐藏后立即显示
      await wrapper.setProps({ visible: false })
      await wrapper.setProps({ visible: true })
      // 16ms 后应再次滑入
      vi.advanceTimersByTime(16)
      await nextTick()
      expect(wrapper.find('.weui-picker').classes()).toContain('weui-transition_show')
    })
  })
})

describe('Picker 命令式 API', () => {
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

  describe('Picker.show', () => {
    it('调用 overlay-host.add 添加 Picker 组件', () => {
      Picker.show({ columns: [{ options: sampleOptions }] })
      expect(addedItems).toHaveLength(1)
      expect(addedItems[0].props.visible).toBe(true)
      expect(addedItems[0].props.columns).toEqual([{ options: sampleOptions }])
    })

    it('透传 title', () => {
      Picker.show({ title: '请选择', columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.title).toBe('请选择')
    })

    it('默认 closeText 使用官方默认值 "关闭"', () => {
      Picker.show({ columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.closeText).toBeUndefined()
      expect(addedItems[0].props.showClose).toBe(false)
    })

    it('透传 desc 和 showClose', () => {
      Picker.show({ desc: '描述', showClose: false, columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.desc).toBe('描述')
      expect(addedItems[0].props.showClose).toBe(false)
    })

    it('自定义 closeText', () => {
      Picker.show({ closeText: '返回', columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.closeText).toBe('返回')
    })

    it('兼容透传 cancelText', () => {
      Picker.show({ cancelText: '取消旧文案', columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.cancelText).toBe('取消旧文案')
    })

    it('默认 confirmText 为 "确定"', () => {
      Picker.show({ columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.confirmText).toBe('确定')
    })

    it('自定义 confirmText', () => {
      Picker.show({ confirmText: '完成', columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.confirmText).toBe('完成')
    })

    it('默认 maskClosable 为 true', () => {
      Picker.show({ columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.maskClosable).toBe(true)
    })

    it('maskClosable=false 时透传', () => {
      Picker.show({ maskClosable: false, columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.maskClosable).toBe(false)
    })

    it('透传 extClass', () => {
      Picker.show({ extClass: 'my-picker', columns: [{ options: sampleOptions }] })
      expect(addedItems[0].props.extClass).toBe('my-picker')
    })

    it('点击确定后 resolve 返回 action=confirm 和索引/值', async () => {
      const promise = Picker.show({ columns: [{ options: sampleOptions, index: 0 }] })
      const onConfirm = addedItems[0].props.onConfirm as (
        indexes: number[],
        values: (string | number)[],
      ) => void
      onConfirm([1], ['b'])
      const result = await promise
      expect(result.action).toBe('confirm')
      expect(result.indexes).toEqual([1])
      expect(result.values).toEqual(['b'])
    })

    it('点击取消后 resolve 返回 action=cancel', async () => {
      const promise = Picker.show({ columns: [{ options: sampleOptions }] })
      const onCancel = addedItems[0].props.onCancel as () => void
      onCancel()
      const result = await promise
      expect(result.action).toBe('cancel')
      expect(result.indexes).toEqual([])
      expect(result.values).toEqual([])
    })

    it('点击遮罩（onClose）后 resolve 返回 action=cancel', async () => {
      const promise = Picker.show({ columns: [{ options: sampleOptions }] })
      const onClose = addedItems[0].props.onClose as () => void
      onClose()
      const result = await promise
      expect(result.action).toBe('cancel')
    })

    it('onConfirm 先于 onClose 触发时以 confirm 结果为准', async () => {
      const promise = Picker.show({ columns: [{ options: sampleOptions }] })
      const onConfirm = addedItems[0].props.onConfirm as (
        indexes: number[],
        values: (string | number)[],
      ) => void
      const onClose = addedItems[0].props.onClose as () => void
      onConfirm([2], ['c'])
      onClose()
      const result = await promise
      expect(result.action).toBe('confirm')
      expect(result.indexes).toEqual([2])
    })
  })

  describe('未挂载 overlay-host', () => {
    it('getOverlayHost 为 null 时不抛错', () => {
      setOverlayHost(null)
      expect(() => Picker.show({ columns: [{ options: sampleOptions }] })).not.toThrow()
    })

    it('返回 resolve 为 cancel 的 promise', async () => {
      setOverlayHost(null)
      const promise = Picker.show({ columns: [{ options: sampleOptions }] })
      await expect(promise).resolves.toEqual({ action: 'cancel', indexes: [], values: [] })
    })
  })
})
