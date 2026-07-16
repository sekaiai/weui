import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiFooter from '../footer.vue'

describe('WeuiFooter', () => {
  describe('基础类名', () => {
    it('始终带 weui-footer 类', () => {
      const wrapper = mount(WeuiFooter)
      expect(wrapper.classes()).toContain('weui-footer')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiFooter)
      expect(wrapper.element.tagName.toLowerCase()).toBe('view')
    })
  })

  describe('fixed', () => {
    it('fixed 为 true 时添加 weui-footer_fixed-bottom 类', () => {
      const wrapper = mount(WeuiFooter, { props: { fixed: true } })
      expect(wrapper.classes()).toContain('weui-footer_fixed-bottom')
    })

    it('fixed 为 false 时不带 weui-footer_fixed-bottom 类', () => {
      const wrapper = mount(WeuiFooter)
      expect(wrapper.classes()).not.toContain('weui-footer_fixed-bottom')
    })
  })

  describe('links', () => {
    it('传入 links 时渲染 .weui-footer__links 容器', () => {
      const wrapper = mount(WeuiFooter, {
        props: { links: [{ text: '底部链接' }] },
      })
      expect(wrapper.find('.weui-footer__links').exists()).toBe(true)
    })

    it('link 文字正确渲染', () => {
      const wrapper = mount(WeuiFooter, {
        props: { links: [{ text: '底部链接' }] },
      })
      expect(wrapper.find('.weui-footer__link').text()).toBe('底部链接')
    })

    it('支持渲染多个链接', () => {
      const wrapper = mount(WeuiFooter, {
        props: {
          links: [
            { text: '链接一' },
            { text: '链接二' },
            { text: '链接三' },
          ],
        },
      })
      const links = wrapper.findAll('.weui-footer__link')
      expect(links).toHaveLength(3)
      expect(links[0].text()).toBe('链接一')
      expect(links[1].text()).toBe('链接二')
      expect(links[2].text()).toBe('链接三')
    })

    it('不传 links 时不渲染 .weui-footer__links', () => {
      const wrapper = mount(WeuiFooter)
      expect(wrapper.find('.weui-footer__links').exists()).toBe(false)
    })
  })

  describe('text', () => {
    it('传入 text 时渲染 .weui-footer__text', () => {
      const wrapper = mount(WeuiFooter, {
        props: { text: 'Copyright © 2026' },
      })
      expect(wrapper.find('.weui-footer__text').exists()).toBe(true)
      expect(wrapper.find('.weui-footer__text').text()).toBe(
        'Copyright © 2026',
      )
    })

    it('不传 text 时不渲染 .weui-footer__text', () => {
      const wrapper = mount(WeuiFooter)
      expect(wrapper.find('.weui-footer__text').exists()).toBe(false)
    })
  })

  describe('default slot', () => {
    it('渲染默认插槽内容（替代 text 和 links）', () => {
      const wrapper = mount(WeuiFooter, {
        props: {
          text: '不应显示的文字',
          links: [{ text: '不应显示的链接' }],
        },
        slots: {
          default: '<view class="custom-content">自定义内容</view>',
        },
      })
      expect(wrapper.find('.custom-content').exists()).toBe(true)
      expect(wrapper.find('.weui-footer__text').exists()).toBe(false)
      expect(wrapper.find('.weui-footer__links').exists()).toBe(false)
    })
  })

  describe('无内容渲染', () => {
    it('无任何 props 时正常渲染且仅含 weui-footer 类', () => {
      const wrapper = mount(WeuiFooter)
      expect(wrapper.classes()).toEqual(['weui-footer'])
      expect(wrapper.find('.weui-footer__links').exists()).toBe(false)
      expect(wrapper.find('.weui-footer__text').exists()).toBe(false)
    })
  })

  describe('links 与 text 组合', () => {
    it('同时传入 links 和 text 时都渲染', () => {
      const wrapper = mount(WeuiFooter, {
        props: {
          links: [{ text: '底部链接' }],
          text: 'Copyright © 2026',
        },
      })
      expect(wrapper.find('.weui-footer__links').exists()).toBe(true)
      expect(wrapper.find('.weui-footer__text').exists()).toBe(true)
    })
  })
})
