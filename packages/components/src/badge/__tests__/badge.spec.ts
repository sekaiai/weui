import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiBadge from '../badge.vue'

describe('WeuiBadge', () => {
  describe('content', () => {
    it('渲染传入的文本内容', () => {
      const wrapper = mount(WeuiBadge, { props: { content: '8' } })
      expect(wrapper.text()).toBe('8')
    })

    it('渲染文字内容（如 New）', () => {
      const wrapper = mount(WeuiBadge, { props: { content: 'New' } })
      expect(wrapper.text()).toBe('New')
    })

    it('content 为空时默认转红点模式', () => {
      const wrapper = mount(WeuiBadge)
      expect(wrapper.classes()).toContain('weui-badge_dot')
    })

    it('content 有值时不带 weui-badge_dot 类', () => {
      const wrapper = mount(WeuiBadge, { props: { content: '8' } })
      expect(wrapper.classes()).not.toContain('weui-badge_dot')
    })
  })

  describe('基础类名', () => {
    it('始终带 weui-badge 类', () => {
      const wrapper = mount(WeuiBadge, { props: { content: '8' } })
      expect(wrapper.classes()).toContain('weui-badge')
    })

    it('红点模式下仍带 weui-badge 类', () => {
      const wrapper = mount(WeuiBadge)
      expect(wrapper.classes()).toContain('weui-badge')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiBadge, {
        props: { content: '8', extClass: 'my-badge' },
      })
      expect(wrapper.classes()).toContain('my-badge')
    })

    it('不传 extClass 时不追加额外类名', () => {
      const wrapper = mount(WeuiBadge, { props: { content: '8' } })
      expect(wrapper.classes()).toEqual(['weui-badge'])
    })

    it('红点模式下也支持 extClass', () => {
      const wrapper = mount(WeuiBadge, {
        props: { extClass: 'my-dot' },
      })
      expect(wrapper.classes()).toContain('weui-badge')
      expect(wrapper.classes()).toContain('weui-badge_dot')
      expect(wrapper.classes()).toContain('my-dot')
    })
  })

  describe('ariaLabel', () => {
    it('输出到 aria-label 属性', () => {
      const wrapper = mount(WeuiBadge, {
        props: { content: '8', ariaLabel: '，8个新通知' },
      })
      expect(wrapper.attributes('aria-label')).toBe('，8个新通知')
    })

    it('不传时不输出 aria-label 属性', () => {
      const wrapper = mount(WeuiBadge, { props: { content: '8' } })
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('红点模式下支持 aria-label', () => {
      const wrapper = mount(WeuiBadge, {
        props: { ariaLabel: '，有更新' },
      })
      expect(wrapper.attributes('aria-label')).toBe('，有更新')
    })
  })

  describe('根元素', () => {
    it('根元素为 text', () => {
      const wrapper = mount(WeuiBadge, { props: { content: '8' } })
      expect(wrapper.element.tagName.toLowerCase()).toBe('text')
    })
  })
})
