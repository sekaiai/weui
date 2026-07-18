import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiList from '../list.vue'

describe('WeuiList', () => {
  describe('基础类名', () => {
    it('始终带 weui-list 类', () => {
      const wrapper = mount(WeuiList)
      expect(wrapper.classes()).toContain('weui-list')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiList)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('不传任何 props 时仅带 weui-list 类', () => {
      const wrapper = mount(WeuiList)
      expect(wrapper.classes()).toEqual(['weui-list'])
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiList, {
        props: { extClass: 'my-list' },
      })
      expect(wrapper.classes()).toContain('my-list')
    })

    it('与基础类名共存', () => {
      const wrapper = mount(WeuiList, {
        props: { extClass: 'my-list' },
      })
      expect(wrapper.classes()).toContain('weui-list')
      expect(wrapper.classes()).toContain('my-list')
    })
  })

  describe('title', () => {
    it('传入 title 时渲染 .weui-list__title 并显示标题', () => {
      const wrapper = mount(WeuiList, { props: { title: '列表标题' } })
      const title = wrapper.find('.weui-list__title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('列表标题')
    })

    it('不传 title 时不渲染 .weui-list__title', () => {
      const wrapper = mount(WeuiList)
      expect(wrapper.find('.weui-list__title').exists()).toBe(false)
    })

    it('title 为空字符串时不渲染 .weui-list__title', () => {
      const wrapper = mount(WeuiList, { props: { title: '' } })
      expect(wrapper.find('.weui-list__title').exists()).toBe(false)
    })
  })

  describe('tips', () => {
    it('传入 tips 时渲染 .weui-list__tips 并显示提示文字', () => {
      const wrapper = mount(WeuiList, { props: { tips: '底部提示' } })
      const tips = wrapper.find('.weui-list__tips')
      expect(tips.exists()).toBe(true)
      expect(tips.text()).toBe('底部提示')
    })

    it('不传 tips 时不渲染 .weui-list__tips', () => {
      const wrapper = mount(WeuiList)
      expect(wrapper.find('.weui-list__tips').exists()).toBe(false)
    })

    it('tips 为空字符串时不渲染 .weui-list__tips', () => {
      const wrapper = mount(WeuiList, { props: { tips: '' } })
      expect(wrapper.find('.weui-list__tips').exists()).toBe(false)
    })
  })

  describe('default slot', () => {
    it('渲染默认插槽内容', () => {
      const wrapper = mount(WeuiList, {
        slots: { default: '<view class="slot-content">列表内容</view>' },
      })
      expect(wrapper.find('.slot-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('列表内容')
    })

    it('无插槽内容时主体为空', () => {
      const wrapper = mount(WeuiList)
      expect(wrapper.find('.weui-list__title').exists()).toBe(false)
      expect(wrapper.find('.weui-list__tips').exists()).toBe(false)
    })
  })

  describe('组合结构', () => {
    it('同时渲染 title、slot 与 tips', () => {
      const wrapper = mount(WeuiList, {
        props: { title: '标题', tips: '提示', extClass: 'ext' },
        slots: { default: '<view class="body">主体</view>' },
      })
      expect(wrapper.find('.weui-list__title').exists()).toBe(true)
      expect(wrapper.find('.weui-list__tips').exists()).toBe(true)
      expect(wrapper.find('.body').exists()).toBe(true)
      expect(wrapper.classes()).toContain('ext')
    })

    it('title 渲染在 slot 之前、tips 渲染在 slot 之后', () => {
      const wrapper = mount(WeuiList, {
        props: { title: '标题', tips: '提示' },
        slots: { default: '<view class="body">主体</view>' },
      })
      const children = wrapper.element.children
      expect(children[0]).toBe(wrapper.find('.weui-list__title').element)
      expect(children[1]).toBe(wrapper.find('.body').element)
      expect(children[2]).toBe(wrapper.find('.weui-list__tips').element)
    })
  })
})
