import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiMsg from '../msg.vue'
import type { MsgButton } from '../msg.vue'

describe('WeuiMsg', () => {
  describe('根元素', () => {
    it('始终带 weui-msg 类', () => {
      const wrapper = mount(WeuiMsg)
      expect(wrapper.classes()).toContain('weui-msg')
    })

    it('extClass 附加到根元素', () => {
      const wrapper = mount(WeuiMsg, { props: { extClass: 'my-msg' } })
      expect(wrapper.classes()).toContain('my-msg')
    })

    it('不传 extClass 时仅含 weui-msg', () => {
      const wrapper = mount(WeuiMsg)
      expect(wrapper.classes()).toEqual(['weui-msg'])
    })
  })

  describe('icon', () => {
    it('设置 type 时渲染图标区域', () => {
      const wrapper = mount(WeuiMsg, { props: { type: 'success' } })
      expect(wrapper.find('.weui-msg__icon-area').exists()).toBe(true)
      expect(wrapper.find('.weui-icon-success').exists()).toBe(true)
    })

    it('不设置 type 时不渲染图标区域', () => {
      const wrapper = mount(WeuiMsg)
      expect(wrapper.find('.weui-msg__icon-area').exists()).toBe(false)
    })

    it('默认传递 weui-icon_msg 扩展类（让 WeUI 默认 font-size:10px 生效，渲染 64px）', () => {
      const wrapper = mount(WeuiMsg, { props: { type: 'success' } })
      const icon = wrapper.find('.weui-icon-success')
      expect(icon.classes()).toContain('weui-icon_msg')
      // 不传 iconSize 时不输出 inline font-size，由 WeUI 默认 font-size:10px 决定
      expect(icon.attributes('style') || '').not.toContain('font-size')
    })

    it('自定义 iconSize 传递给图标 font-size', () => {
      const wrapper = mount(WeuiMsg, {
        props: { type: 'success', iconSize: 48 },
      })
      const style = wrapper.find('.weui-icon-success').attributes('style') || ''
      expect(style).toContain('font-size: 48px')
    })

    it('icon slot 替代默认图标', () => {
      const wrapper = mount(WeuiMsg, {
        slots: { icon: '<view class="custom-icon">图标</view>' },
      })
      expect(wrapper.find('.weui-msg__icon-area').exists()).toBe(true)
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
      expect(wrapper.find('.weui-icon-success').exists()).toBe(false)
    })
  })

  describe('title / desc', () => {
    it('设置 title 时渲染标题', () => {
      const wrapper = mount(WeuiMsg, { props: { title: '操作成功' } })
      expect(wrapper.find('.weui-msg__title').exists()).toBe(true)
      expect(wrapper.find('.weui-msg__title').text()).toBe('操作成功')
    })

    it('设置 desc 时渲染描述', () => {
      const wrapper = mount(WeuiMsg, { props: { desc: '内容详情' } })
      expect(wrapper.find('.weui-msg__desc').exists()).toBe(true)
      expect(wrapper.find('.weui-msg__desc').text()).toBe('内容详情')
    })

    it('title 和 desc 都为空时不渲染文字区域', () => {
      const wrapper = mount(WeuiMsg)
      expect(wrapper.find('.weui-msg__text-area').exists()).toBe(false)
    })
  })

  describe('buttons', () => {
    const buttons: MsgButton[] = [
      { text: '辅助操作', type: 'default' },
      { text: '推荐操作', type: 'primary' },
    ]

    it('渲染所有按钮', () => {
      const wrapper = mount(WeuiMsg, { props: { buttons } })
      const btns = wrapper.findAll('.weui-btn')
      expect(btns).toHaveLength(2)
      expect(btns[0].text()).toBe('辅助操作')
      expect(btns[1].text()).toBe('推荐操作')
    })

    it('按钮按 type 分配类名', () => {
      const wrapper = mount(WeuiMsg, { props: { buttons } })
      const btns = wrapper.findAll('.weui-btn')
      expect(btns[0].classes()).toContain('weui-btn_default')
      expect(btns[1].classes()).toContain('weui-btn_primary')
    })

    it('未指定 type 时默认 default', () => {
      const wrapper = mount(WeuiMsg, {
        props: { buttons: [{ text: '知道了' }] },
      })
      expect(wrapper.find('.weui-btn').classes()).toContain('weui-btn_default')
    })

    it('无按钮时不渲染操作区域', () => {
      const wrapper = mount(WeuiMsg)
      expect(wrapper.find('.weui-msg__opr-area').exists()).toBe(false)
    })

    it('点击按钮触发 buttontap 事件并携带 button 与 index', async () => {
      const wrapper = mount(WeuiMsg, { props: { buttons } })
      await wrapper.findAll('.weui-btn')[1].trigger('click')
      expect(wrapper.emitted('buttontap')).toBeTruthy()
      expect(wrapper.emitted('buttontap')![0][0]).toEqual({ text: '推荐操作', type: 'primary' })
      expect(wrapper.emitted('buttontap')![0][1]).toBe(1)
    })
  })

  describe('slots', () => {
    it('default slot 替代默认 icon+title+desc 内容', () => {
      const wrapper = mount(WeuiMsg, {
        props: { type: 'success', title: '标题', desc: '描述' },
        slots: { default: '<view class="custom-content">自定义内容</view>' },
      })
      expect(wrapper.find('.custom-content').exists()).toBe(true)
      // default slot 存在时不渲染默认图标/文字区域
      expect(wrapper.find('.weui-msg__icon-area').exists()).toBe(false)
      expect(wrapper.find('.weui-msg__text-area').exists()).toBe(false)
    })

    it('footer slot 渲染在额外区域', () => {
      const wrapper = mount(WeuiMsg, {
        slots: { footer: '<view class="custom-footer">底部</view>' },
      })
      const extra = wrapper.find('.weui-msg__extra-area')
      expect(extra.exists()).toBe(true)
      expect(extra.find('.custom-footer').exists()).toBe(true)
    })

    it('无 footer slot 时不渲染额外区域', () => {
      const wrapper = mount(WeuiMsg)
      expect(wrapper.find('.weui-msg__extra-area').exists()).toBe(false)
    })
  })
})
