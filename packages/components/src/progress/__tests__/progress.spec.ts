import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiProgress from '../progress.vue'

describe('WeuiProgress', () => {
  describe('基础类名与结构', () => {
    it('始终带 weui-progress 类', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      expect(wrapper.classes()).toContain('weui-progress')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('渲染 .weui-progress__bar 作为进度条背景容器', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      expect(wrapper.find('.weui-progress__bar').exists()).toBe(true)
    })

    it('渲染 .weui-progress__inner-bar 作为前景进度', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      expect(wrapper.find('.weui-progress__inner-bar').exists()).toBe(true)
    })
  })

  describe('percent', () => {
    it('inner-bar 宽度等于 percent%', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 42 } })
      const style = wrapper.find('.weui-progress__inner-bar').attributes('style')
      expect(style).toContain('width: 42%')
    })

    it('percent 超过 100 时限制为 100%', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 150 } })
      const style = wrapper.find('.weui-progress__inner-bar').attributes('style')
      expect(style).toContain('width: 100%')
    })

    it('percent 小于 0 时限制为 0%', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: -20 } })
      const style = wrapper.find('.weui-progress__inner-bar').attributes('style')
      expect(style).toContain('width: 0%')
    })
  })

  describe('showInfo', () => {
    it('默认显示右侧百分比文字 .weui-progress__info', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      expect(wrapper.find('.weui-progress__info').exists()).toBe(true)
    })

    it('百分比文字格式为 "X%"', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 60 } })
      expect(wrapper.find('.weui-progress__info').text()).toBe('60%')
    })

    it('百分比文字使用 Math.round 处理小数', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 60.4 } })
      expect(wrapper.find('.weui-progress__info').text()).toBe('60%')
      const wrapper2 = mount(WeuiProgress, { props: { percent: 60.6 } })
      expect(wrapper2.find('.weui-progress__info').text()).toBe('61%')
    })

    it('文字元素显式通过 SFC style 覆盖父级 font-size:0', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      // SFC style 中 .weui-progress__info { font-size: 14px; margin-left: 15px }
      // 这里仅验证元素存在并使用 .weui-progress__info 类（font-size 覆盖在 SFC style 块）
      expect(wrapper.find('.weui-progress__info').exists()).toBe(true)
    })

    it('showInfo 为 false 时不渲染 .weui-progress__info', () => {
      const wrapper = mount(WeuiProgress, {
        props: { percent: 30, showInfo: false },
      })
      expect(wrapper.find('.weui-progress__info').exists()).toBe(false)
    })

    it('不再使用 .weui-progress__opr（该类 font-size:0 会导致文字不可见）', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      expect(wrapper.find('.weui-progress__opr').exists()).toBe(false)
    })
  })

  describe('strokeWidth', () => {
    it('设置进度条高度 px', () => {
      const wrapper = mount(WeuiProgress, {
        props: { percent: 30, strokeWidth: 6 },
      })
      const style = wrapper.find('.weui-progress__bar').attributes('style')
      expect(style).toContain('height: 6px')
    })

    it('不传 strokeWidth 时不设置 height', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      const style = wrapper.find('.weui-progress__bar').attributes('style') || ''
      expect(style).not.toContain('height')
    })
  })

  describe('activeColor', () => {
    it('设置 inner-bar 的背景色', () => {
      const wrapper = mount(WeuiProgress, {
        props: { percent: 30, activeColor: '#10aeff' },
      })
      const style = wrapper.find('.weui-progress__inner-bar').attributes('style')
      expect(style).toContain('background-color: #10aeff')
    })

    it('不传 activeColor 时不设置 inner-bar 背景色', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      const style =
        wrapper.find('.weui-progress__inner-bar').attributes('style') || ''
      expect(style).not.toContain('background-color')
    })
  })

  describe('backgroundColor', () => {
    it('设置 bar 的背景色', () => {
      const wrapper = mount(WeuiProgress, {
        props: { percent: 30, backgroundColor: '#ededed' },
      })
      const style = wrapper.find('.weui-progress__bar').attributes('style')
      expect(style).toContain('background-color: #ededed')
    })

    it('不传 backgroundColor 时不设置 bar 背景色', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      const style = wrapper.find('.weui-progress__bar').attributes('style') || ''
      expect(style).not.toContain('background-color')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiProgress, {
        props: { percent: 30, extClass: 'my-progress' },
      })
      expect(wrapper.classes()).toContain('my-progress')
    })

    it('不传 extClass 时仅含 weui-progress 类', () => {
      const wrapper = mount(WeuiProgress, { props: { percent: 30 } })
      expect(wrapper.classes()).toEqual(['weui-progress'])
    })
  })
})
