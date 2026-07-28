import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiLoading from '../loading.vue'

describe('WeuiLoading', () => {
  describe('基础加载图标', () => {
    it('渲染 weui-loading 图标', () => {
      const wrapper = mount(WeuiLoading)
      expect(wrapper.find('.weui-loading').exists()).toBe(true)
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

  describe('文字结构', () => {
    it('文字使用 weui-loading__text 类', () => {
      const wrapper = mount(WeuiLoading, {
        props: { text: '加载中' },
      })
      expect(wrapper.find('.weui-loading__text').exists()).toBe(true)
    })

    it('文字显式设置 font-size 保证可见', () => {
      const wrapper = mount(WeuiLoading, {
        props: { text: '加载中' },
      })
      const style = wrapper.find('.weui-loading__text').attributes('style') || ''
      expect(style).toContain('font-size: 14px')
    })
  })

  describe('根元素', () => {
    it('根元素为 view', () => {
      const wrapper = mount(WeuiLoading)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })
  })
})
