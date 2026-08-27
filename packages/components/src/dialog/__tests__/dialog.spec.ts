import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiDialog from '../dialog.vue'
import type { DialogButton } from '../dialog.vue'
import { Dialog } from '../dialog'
import { setOverlayHost } from '../../utils/overlay-host-ref'
import { overlayManager } from '../../utils/overlay'

describe('WeuiDialog', () => {
  beforeEach(() => {
    overlayManager.reset()
  })

  describe('visible', () => {
    it('visible=false 时不渲染', () => {
      const wrapper = mount(WeuiDialog, { props: { visible: false } })
      expect(wrapper.find('.weui-mask').exists()).toBe(false)
    })

    it('visible=true 时渲染遮罩', () => {
      const wrapper = mount(WeuiDialog, { props: { visible: true } })
      expect(wrapper.find('.weui-mask').exists()).toBe(true)
    })
  })

  describe('title', () => {
    it('设置 title 时渲染标题区域', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, title: '提示' },
      })
      expect(wrapper.find('.weui-dialog__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-dialog__hd').text()).toBe('提示')
    })

    it('不设置 title 时不渲染标题区域', () => {
      const wrapper = mount(WeuiDialog, { props: { visible: true } })
      expect(wrapper.find('.weui-dialog__hd').exists()).toBe(false)
    })

    it('使用 title slot 替代 title prop', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true },
        slots: { title: '自定义标题' },
      })
      expect(wrapper.find('.weui-dialog__hd').text()).toBe('自定义标题')
    })
  })

  describe('content', () => {
    it('渲染 content 文字', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, content: '内容文字' },
      })
      expect(wrapper.find('.weui-dialog__bd').text()).toBe('内容文字')
    })

    it('使用 default slot 替代 content', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true },
        slots: { default: '自定义内容' },
      })
      expect(wrapper.find('.weui-dialog__bd').text()).toBe('自定义内容')
    })
  })

  describe('buttons', () => {
    const buttons: DialogButton[] = [
      { label: '取消' },
      { label: '确定' },
    ]

    it('渲染所有按钮', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, buttons },
      })
      const btns = wrapper.findAll('.weui-dialog__btn')
      expect(btns).toHaveLength(2)
      expect(btns[0].text()).toBe('取消')
      expect(btns[1].text()).toBe('确定')
    })

    it('无按钮且无 footer slot 时不渲染底部', () => {
      const wrapper = mount(WeuiDialog, { props: { visible: true } })
      expect(wrapper.find('.weui-dialog__ft').exists()).toBe(false)
    })

    it('单按钮自动分配 primary 类名', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, buttons: [{ label: '知道了' }] },
      })
      const btn = wrapper.find('.weui-dialog__btn')
      expect(btn.classes()).toContain('weui-dialog__btn_primary')
    })

    it('多按钮首个 default 其余 primary', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, buttons },
      })
      const btns = wrapper.findAll('.weui-dialog__btn')
      expect(btns[0].classes()).toContain('weui-dialog__btn_default')
      expect(btns[1].classes()).toContain('weui-dialog__btn_primary')
    })

    it('显式指定 type 时按 type 分配类名', () => {
      const wrapper = mount(WeuiDialog, {
        props: {
          visible: true,
          buttons: [
            { label: '默认', type: 'default' },
            { label: '主操作', type: 'primary' },
            { label: '警告', type: 'warn' },
          ],
        },
      })
      const btns = wrapper.findAll('.weui-dialog__btn')
      expect(btns[0].classes()).toContain('weui-dialog__btn_default')
      expect(btns[1].classes()).toContain('weui-dialog__btn_primary')
      expect(btns[2].classes()).toContain('weui-dialog__btn_warn')
    })
  })

  describe('btnWrap', () => {
    it('btnWrap=true 时添加 weui-dialog_btn-wrap 类名', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, btnWrap: true, buttons: [{ label: 'a' }] },
      })
      expect(wrapper.find('.weui-dialog').classes()).toContain('weui-dialog_btn-wrap')
    })
  })

  describe('mask', () => {
    it('mask=false 时遮罩背景透明', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, mask: false },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).toContain('background: transparent')
    })

    it('mask=true 时遮罩正常显示', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, mask: true },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).not.toContain('transparent')
    })
  })

  describe('extClass', () => {
    it('附加自定义类名到 dialog 元素', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, extClass: 'my-dialog' },
      })
      expect(wrapper.find('.weui-dialog').classes()).toContain('my-dialog')
    })
  })

  describe('zIndex', () => {
    it('设置 z-index 样式', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, zIndex: 1234 },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).toContain('z-index: 1234')
    })
  })

  describe('事件', () => {
    it('点击按钮触发 buttontap、close 和 update:visible', async () => {
      const buttons: DialogButton[] = [{ label: '取消' }, { label: '确定' }]
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, buttons },
      })
      await wrapper.findAll('.weui-dialog__btn')[1].trigger('click')
      expect(wrapper.emitted('buttontap')).toBeTruthy()
      expect(wrapper.emitted('buttontap')![0][0]).toEqual({ label: '确定' })
      expect(wrapper.emitted('buttontap')![0][1]).toBe(1)
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('点击按钮触发 weui-close（供 overlay-host 监听）', async () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, buttons: [{ label: '确定' }] },
      })
      await wrapper.find('.weui-dialog__btn').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('maskClosable=true 时点击遮罩关闭', async () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, maskClosable: true },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('weui-close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('maskClosable=false 时点击遮罩不关闭', async () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true, maskClosable: false },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('close')).toBeFalsy()
      expect(wrapper.emitted('weui-close')).toBeFalsy()
      expect(wrapper.emitted('update:visible')).toBeFalsy()
    })
  })

  describe('slots', () => {
    it('使用 footer slot 替代默认按钮区', () => {
      const wrapper = mount(WeuiDialog, {
        props: { visible: true },
        slots: { footer: '<view class="custom-footer">自定义底部</view>' },
      })
      expect(wrapper.find('.weui-dialog__ft').exists()).toBe(true)
      expect(wrapper.find('.custom-footer').exists()).toBe(true)
      // footer slot 存在时不渲染默认按钮
      expect(wrapper.findAll('.weui-dialog__btn')).toHaveLength(0)
    })
  })
})

describe('Dialog 命令式 API', () => {
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
    addedItems.length = 0
    overlayManager.reset()
    setOverlayHost(mockHost)
  })

  afterEach(() => {
    setOverlayHost(null)
  })

  describe('Dialog.show', () => {
    it('调用 overlay-host.add 添加 Dialog 组件', () => {
      Dialog.show({ title: '标题', content: '内容', buttons: [{ label: '确定' }] })
      expect(addedItems).toHaveLength(1)
      expect(addedItems[0].props.visible).toBe(true)
      expect(addedItems[0].props.title).toBe('标题')
      expect(addedItems[0].props.content).toBe('内容')
    })

    it('点击按钮后 resolve 返回 button 和 index', async () => {
      const promise = Dialog.show({
        buttons: [{ label: '取消' }, { label: '确定' }],
      })
      const onButtontap = addedItems[0].props.onButtontap as (btn: DialogButton, index: number) => void
      onButtontap({ label: '确定' }, 1)
      const result = await promise
      expect(result.index).toBe(1)
      expect(result.button).toEqual({ label: '确定' })
    })

    it('遮罩点击关闭时 resolve { button: undefined, index: -1 }', async () => {
      const promise = Dialog.show({
        buttons: [{ label: '确定' }],
      })
      const onClose = addedItems[0].props.onClose as () => void
      onClose()
      const result = await promise
      expect(result.index).toBe(-1)
      expect(result.button).toBeUndefined()
    })

    it('按钮点击后 close 接着触发时只 resolve 一次（settled 标志）', async () => {
      const promise = Dialog.show({
        buttons: [{ label: '取消' }, { label: '确定' }],
      })
      const onButtontap = addedItems[0].props.onButtontap as (btn: DialogButton, index: number) => void
      const onClose = addedItems[0].props.onClose as () => void
      // 模拟真实按钮点击：buttontap 先触发，紧接着 close 触发
      onButtontap({ label: '确定' }, 1)
      onClose()
      const result = await promise
      // 应保留 buttontap 的值，不被 close 覆盖为 { button: undefined, index: -1 }
      expect(result.index).toBe(1)
      expect(result.button).toEqual({ label: '确定' })
    })
  })

  describe('Dialog.alert', () => {
    it('默认确认按钮文字为 "确定"', () => {
      Dialog.alert({ content: '提示内容' })
      const buttons = addedItems[0].props.buttons as DialogButton[]
      expect(buttons).toHaveLength(1)
      expect(buttons[0].label).toBe('确定')
    })

    it('自定义确认按钮文字', () => {
      Dialog.alert({ content: '内容', confirmText: '知道了' })
      const buttons = addedItems[0].props.buttons as DialogButton[]
      expect(buttons[0].label).toBe('知道了')
    })

    it('点击确认后 resolve', async () => {
      const promise = Dialog.alert({ content: '内容' })
      const onButtontap = addedItems[0].props.onButtontap as (btn: DialogButton, index: number) => void
      onButtontap({ label: '确定' }, 0)
      await expect(promise).resolves.toBeUndefined()
    })

    it('遮罩点击关闭时 resolve(undefined)', async () => {
      const promise = Dialog.alert({ content: '内容' })
      const onClose = addedItems[0].props.onClose as () => void
      onClose()
      await expect(promise).resolves.toBeUndefined()
    })
  })

  describe('Dialog.confirm', () => {
    it('默认取消+确认按钮', () => {
      Dialog.confirm({ content: '确认吗？' })
      const buttons = addedItems[0].props.buttons as DialogButton[]
      expect(buttons).toHaveLength(2)
      expect(buttons[0].label).toBe('取消')
      expect(buttons[1].label).toBe('确定')
    })

    it('默认 maskClosable=false 防误触', () => {
      Dialog.confirm({ content: '确认吗？' })
      expect(addedItems[0].props.maskClosable).toBe(false)
    })

    it('点击确认 resolve(true)', async () => {
      const promise = Dialog.confirm({ content: '确认吗？' })
      const onButtontap = addedItems[0].props.onButtontap as (btn: DialogButton, index: number) => void
      onButtontap({ label: '确定' }, 1)
      await expect(promise).resolves.toBe(true)
    })

    it('点击取消 resolve(false)', async () => {
      const promise = Dialog.confirm({ content: '确认吗？' })
      const onButtontap = addedItems[0].props.onButtontap as (btn: DialogButton, index: number) => void
      onButtontap({ label: '取消' }, 0)
      await expect(promise).resolves.toBe(false)
    })

    it('遮罩点击关闭视为取消，resolve(false)', async () => {
      const promise = Dialog.confirm({ content: '确认吗？', maskClosable: true })
      const onClose = addedItems[0].props.onClose as () => void
      onClose()
      await expect(promise).resolves.toBe(false)
    })
  })

  describe('未挂载 overlay-host', () => {
    it('getOverlayHost 为 null 时 Promise 明确拒绝', async () => {
      setOverlayHost(null)
      await expect(Dialog.show({ content: 'x' })).rejects.toThrow(
        'WeuiOverlayHost is not mounted',
      )
    })
  })
})
