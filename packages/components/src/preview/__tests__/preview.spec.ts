import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiPreview from '../preview.vue'
import type { PreviewItem, PreviewButton } from '../preview.vue'

describe('WeuiPreview', () => {
  describe('根元素', () => {
    it('根元素为 view 且始终带 weui-form-preview 类', () => {
      const wrapper = mount(WeuiPreview)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      expect(wrapper.classes()).toContain('weui-form-preview')
    })

    it('不传 extClass 时根元素只有 weui-form-preview 类', () => {
      const wrapper = mount(WeuiPreview)
      expect(wrapper.classes()).toEqual(['weui-form-preview'])
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiPreview, {
        props: { extClass: 'my-preview' },
      })
      expect(wrapper.classes()).toContain('my-preview')
    })
  })

  describe('title / 头部', () => {
    it('传入 title 时渲染 .weui-form-preview__hd 并显示标题', () => {
      const wrapper = mount(WeuiPreview, {
        props: { title: '订单详情' },
      })
      expect(wrapper.find('.weui-form-preview__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-form-preview__hd').text()).toContain('订单详情')
    })

    it('不传 title 且无 header slot 时不渲染头部', () => {
      const wrapper = mount(WeuiPreview)
      expect(wrapper.find('.weui-form-preview__hd').exists()).toBe(false)
    })

    it('header slot 优先于 title 渲染', () => {
      const wrapper = mount(WeuiPreview, {
        props: { title: '默认标题' },
        slots: {
          header: '<view class="custom-hd">自定义头部</view>',
        },
      })
      expect(wrapper.find('.custom-hd').exists()).toBe(true)
      expect(wrapper.find('.weui-form-preview__hd').text()).toBe('自定义头部')
    })
  })

  describe('items / 主体', () => {
    const items: PreviewItem[] = [
      { label: '商品', value: 'WeUI 设计指南' },
      { label: '金额', value: '¥99.00' },
    ]

    it('传入 items 时渲染 .weui-form-preview__bd 及对应 item', () => {
      const wrapper = mount(WeuiPreview, { props: { items } })
      const bd = wrapper.find('.weui-form-preview__bd')
      expect(bd.exists()).toBe(true)
      const itemEls = bd.findAll('.weui-form-preview__item')
      expect(itemEls).toHaveLength(2)
    })

    it('每条 item 渲染 label 与 value', () => {
      const wrapper = mount(WeuiPreview, { props: { items } })
      const labels = wrapper.findAll('.weui-form-preview__label').map((n) => n.text())
      const values = wrapper.findAll('.weui-form-preview__value').map((n) => n.text())
      expect(labels).toEqual(['商品', '金额'])
      expect(values).toEqual(['WeUI 设计指南', '¥99.00'])
    })

    it('不传 items 且无 default slot 时不渲染主体', () => {
      const wrapper = mount(WeuiPreview)
      expect(wrapper.find('.weui-form-preview__bd').exists()).toBe(false)
    })

    it('default slot 替代 items 渲染主体内容', () => {
      const wrapper = mount(WeuiPreview, {
        slots: {
          default: '<view class="custom-bd">自定义内容</view>',
        },
      })
      expect(wrapper.find('.weui-form-preview__bd').exists()).toBe(true)
      expect(wrapper.find('.custom-bd').exists()).toBe(true)
    })
  })

  describe('buttons / 底部', () => {
    const buttons: PreviewButton[] = [
      { text: '取消', type: 'default' },
      { text: '确定', type: 'primary' },
    ]

    it('传入 buttons 时渲染 .weui-form-preview__ft 及对应按钮', () => {
      const wrapper = mount(WeuiPreview, { props: { buttons } })
      const ft = wrapper.find('.weui-form-preview__ft')
      expect(ft.exists()).toBe(true)
      const btnEls = ft.findAll('.weui-form-preview__btn')
      expect(btnEls).toHaveLength(2)
      expect(btnEls[0].text()).toBe('取消')
      expect(btnEls[1].text()).toBe('确定')
    })

    it('type 为 default 时附加 weui-form-preview__btn_default 类', () => {
      const wrapper = mount(WeuiPreview, {
        props: { buttons: [{ text: '取消', type: 'default' }] },
      })
      expect(wrapper.find('.weui-form-preview__btn').classes()).toContain('weui-form-preview__btn_default')
    })

    it('type 为 primary 时附加 weui-form-preview__btn_primary 类', () => {
      const wrapper = mount(WeuiPreview, {
        props: { buttons: [{ text: '确定', type: 'primary' }] },
      })
      expect(wrapper.find('.weui-form-preview__btn').classes()).toContain('weui-form-preview__btn_primary')
    })

    it('type 未指定时只带基础 weui-form-preview__btn 类', () => {
      const wrapper = mount(WeuiPreview, {
        props: { buttons: [{ text: '操作' }] },
      })
      expect(wrapper.find('.weui-form-preview__btn').classes()).toEqual(['weui-form-preview__btn'])
    })

    it('不传 buttons 且无 footer slot 时不渲染底部', () => {
      const wrapper = mount(WeuiPreview)
      expect(wrapper.find('.weui-form-preview__ft').exists()).toBe(false)
    })

    it('footer slot 替代 buttons 渲染底部内容', () => {
      const wrapper = mount(WeuiPreview, {
        slots: {
          footer: '<view class="custom-ft">自定义底部</view>',
        },
      })
      expect(wrapper.find('.weui-form-preview__ft').exists()).toBe(true)
      expect(wrapper.find('.custom-ft').exists()).toBe(true)
    })
  })

  describe('buttontap 事件', () => {
    it('点击按钮时触发 buttontap 并传出 button 与 index', async () => {
      const buttons: PreviewButton[] = [
        { text: '取消', type: 'default' },
        { text: '确定', type: 'primary' },
      ]
      const wrapper = mount(WeuiPreview, { props: { buttons } })
      const btnEls = wrapper.findAll('.weui-form-preview__btn')
      await btnEls[1].trigger('click')
      expect(wrapper.emitted('buttontap')).toBeTruthy()
      const payload = wrapper.emitted('buttontap')![0]
      expect(payload[0]).toEqual({ text: '确定', type: 'primary' })
      expect(payload[1]).toBe(1)
    })
  })
})
