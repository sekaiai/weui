import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiActionsheet from '../actionsheet.vue'
import type { ActionsheetItem } from '../actionsheet.vue'

describe('WeuiActionsheet', () => {
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
})
