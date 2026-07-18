import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiLoadmore from '../loadmore.vue'

describe('WeuiLoadmore', () => {
  describe('基础类名', () => {
    it('始终带 weui-loadmore 类', () => {
      const wrapper = mount(WeuiLoadmore)
      expect(wrapper.classes()).toContain('weui-loadmore')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiLoadmore)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })
  })

  describe('type', () => {
    it('默认 type 为 default，不带 weui-loadmore_line 类', () => {
      const wrapper = mount(WeuiLoadmore)
      expect(wrapper.classes()).not.toContain('weui-loadmore_line')
    })

    it('默认 type 为 default，不带 weui-loadmore_dot 类', () => {
      const wrapper = mount(WeuiLoadmore)
      expect(wrapper.classes()).not.toContain('weui-loadmore_dot')
    })

    it('type=default 渲染 weui-loading 加载图标', () => {
      const wrapper = mount(WeuiLoadmore)
      expect(wrapper.find('.weui-loading').exists()).toBe(true)
    })

    it('type=line 带 weui-loadmore_line 类', () => {
      const wrapper = mount(WeuiLoadmore, { props: { type: 'line' } })
      expect(wrapper.classes()).toContain('weui-loadmore_line')
    })

    it('type=line 不渲染加载图标', () => {
      const wrapper = mount(WeuiLoadmore, { props: { type: 'line' } })
      expect(wrapper.find('.weui-loading').exists()).toBe(false)
    })

    it('type=dot 带 weui-loadmore_dot 类', () => {
      const wrapper = mount(WeuiLoadmore, { props: { type: 'dot' } })
      expect(wrapper.classes()).toContain('weui-loadmore_dot')
    })

    it('type=dot 不渲染加载图标', () => {
      const wrapper = mount(WeuiLoadmore, { props: { type: 'dot' } })
      expect(wrapper.find('.weui-loading').exists()).toBe(false)
    })

    it('type=dot 不带 weui-loadmore_line 类', () => {
      const wrapper = mount(WeuiLoadmore, { props: { type: 'dot' } })
      expect(wrapper.classes()).not.toContain('weui-loadmore_line')
    })
  })

  describe('text', () => {
    it('默认文字为 正在加载', () => {
      const wrapper = mount(WeuiLoadmore)
      expect(wrapper.text()).toContain('正在加载')
    })

    it('渲染自定义文字', () => {
      const wrapper = mount(WeuiLoadmore, {
        props: { text: '暂无数据' },
      })
      expect(wrapper.text()).toContain('暂无数据')
    })

    it('文字渲染在 weui-loadmore__tips 元素中', () => {
      const wrapper = mount(WeuiLoadmore, { props: { text: '加载中' } })
      expect(wrapper.find('.weui-loadmore__tips').exists()).toBe(true)
      expect(wrapper.find('.weui-loadmore__tips').text()).toBe('加载中')
    })
  })

  describe('showText', () => {
    it('默认 showText 为 true，渲染 tips 元素', () => {
      const wrapper = mount(WeuiLoadmore)
      expect(wrapper.find('.weui-loadmore__tips').exists()).toBe(true)
    })

    it('showText 为 false 时不渲染 tips 元素', () => {
      const wrapper = mount(WeuiLoadmore, { props: { showText: false } })
      expect(wrapper.find('.weui-loadmore__tips').exists()).toBe(false)
    })

    it('showText 为 false 时仍渲染加载图标（default 类型）', () => {
      const wrapper = mount(WeuiLoadmore, { props: { showText: false } })
      expect(wrapper.find('.weui-loading').exists()).toBe(true)
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiLoadmore, {
        props: { extClass: 'my-loadmore' },
      })
      expect(wrapper.classes()).toContain('my-loadmore')
    })

    it('不传 extClass 时不追加额外类名', () => {
      const wrapper = mount(WeuiLoadmore)
      expect(wrapper.classes()).toEqual(['weui-loadmore'])
    })

    it('line 类型也支持 extClass', () => {
      const wrapper = mount(WeuiLoadmore, {
        props: { type: 'line', extClass: 'my-line' },
      })
      expect(wrapper.classes()).toContain('weui-loadmore')
      expect(wrapper.classes()).toContain('weui-loadmore_line')
      expect(wrapper.classes()).toContain('my-line')
    })
  })
})
