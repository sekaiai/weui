import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiLoading from '../loading.vue'

describe('WeuiLoading', () => {
  describe('type', () => {
    it('默认 type 为 default，渲染 weui-loading 图标', () => {
      const wrapper = mount(WeuiLoading)
      expect(wrapper.find('.weui-loading').exists()).toBe(true)
    })

    it('type=page 时根元素带 weui-loadmore 类', () => {
      const wrapper = mount(WeuiLoading, { props: { type: 'page' } })
      expect(wrapper.classes()).toContain('weui-loadmore')
    })

    it('type=default 时根元素不带 weui-loadmore 类', () => {
      const wrapper = mount(WeuiLoading)
      expect(wrapper.classes()).not.toContain('weui-loadmore')
    })
  })

  describe('size', () => {
    it('默认 size 为 20px', () => {
      const wrapper = mount(WeuiLoading)
      const style = wrapper.find('.weui-loading').attributes('style')
      expect(style).toContain('width: 20px')
      expect(style).toContain('height: 20px')
    })

    it('自定义 size 为 32px', () => {
      const wrapper = mount(WeuiLoading, { props: { size: 32 } })
      const style = wrapper.find('.weui-loading').attributes('style')
      expect(style).toContain('width: 32px')
      expect(style).toContain('height: 32px')
    })
  })

  describe('color', () => {
    it('默认 color 为 #999', () => {
      const wrapper = mount(WeuiLoading)
      const style = wrapper.find('.weui-loading').attributes('style')
      expect(style).toContain('color: #999')
    })

    it('自定义 color 为 #1AAD19', () => {
      const wrapper = mount(WeuiLoading, { props: { color: '#1AAD19' } })
      const style = wrapper.find('.weui-loading').attributes('style')
      expect(style).toContain('color: #1AAD19')
    })
  })

  describe('text', () => {
    it('渲染 text prop 文字', () => {
      const wrapper = mount(WeuiLoading, { props: { text: '加载中...' } })
      expect(wrapper.text()).toContain('加载中...')
    })

    it('text 渲染在 weui-loading__text 元素中', () => {
      const wrapper = mount(WeuiLoading, { props: { text: '加载中' } })
      expect(wrapper.find('.weui-loading__text').exists()).toBe(true)
      expect(wrapper.find('.weui-loading__text').text()).toBe('加载中')
    })

    it('不传 text 且无 slot 时不渲染文字元素', () => {
      const wrapper = mount(WeuiLoading)
      expect(wrapper.find('.weui-loading__text').exists()).toBe(false)
    })
  })

  describe('default slot', () => {
    it('渲染 default slot 自定义文字', () => {
      const wrapper = mount(WeuiLoading, {
        slots: { default: '自定义加载文字' },
      })
      expect(wrapper.text()).toContain('自定义加载文字')
      expect(wrapper.find('.weui-loading__text').text()).toContain('自定义加载文字')
    })

    it('slot 优先于 text prop', () => {
      const wrapper = mount(WeuiLoading, {
        props: { text: 'prop文字' },
        slots: { default: 'slot文字' },
      })
      expect(wrapper.find('.weui-loading__text').text()).toContain('slot文字')
      expect(wrapper.find('.weui-loading__text').text()).not.toContain('prop文字')
    })
  })

  describe('transparent', () => {
    it('transparent 为 true 时图标带 weui-loading_transparent 类', () => {
      const wrapper = mount(WeuiLoading, { props: { transparent: true } })
      expect(wrapper.find('.weui-loading').classes()).toContain('weui-loading_transparent')
    })

    it('默认不带 weui-loading_transparent 类', () => {
      const wrapper = mount(WeuiLoading)
      expect(wrapper.find('.weui-loading').classes()).not.toContain('weui-loading_transparent')
    })
  })

  describe('page 模式', () => {
    it('page 模式下渲染 weui-loading 图标', () => {
      const wrapper = mount(WeuiLoading, { props: { type: 'page' } })
      expect(wrapper.find('.weui-loading').exists()).toBe(true)
    })

    it('page 模式下文字使用 weui-loadmore__tips 类（WeUI 实际类名）', () => {
      const wrapper = mount(WeuiLoading, {
        props: { type: 'page', text: '正在加载' },
      })
      expect(wrapper.find('.weui-loadmore__tips').exists()).toBe(true)
      expect(wrapper.text()).toContain('正在加载')
    })

    it('default 模式下文字使用 weui-loading__text 类', () => {
      const wrapper = mount(WeuiLoading, {
        props: { type: 'default', text: '加载中' },
      })
      expect(wrapper.find('.weui-loading__text').exists()).toBe(true)
    })

    it('default 模式下文字显式设置 font-size 保证可见', () => {
      const wrapper = mount(WeuiLoading, {
        props: { type: 'default', text: '加载中' },
      })
      const style = wrapper.find('.weui-loading__text').attributes('style') || ''
      expect(style).toContain('font-size: 14px')
    })
  })

  describe('根元素', () => {
    it('根元素为 view', () => {
      const wrapper = mount(WeuiLoading)
      expect(wrapper.element.tagName.toLowerCase()).toBe('view')
    })
  })
})
