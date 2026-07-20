import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiMediaBox from '../media-box.vue'

describe('WeuiMediaBox', () => {
  describe('type=appmsg', () => {
    it('渲染 weui-media-box_appmsg 类名', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题', desc: '描述' },
      })
      expect(wrapper.classes()).toContain('weui-media-box')
      expect(wrapper.classes()).toContain('weui-media-box_appmsg')
    })

    it('根元素为 div（无 href 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题' },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('根元素为 a（有 href 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题', href: '/detail/1' },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('a')
      expect(wrapper.attributes('href')).toBe('/detail/1')
    })

    it('渲染 __hd + __thumb（有 thumb 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', thumb: 'https://example.com/x.png' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__thumb').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__thumb').attributes('src')).toBe('https://example.com/x.png')
    })

    it('不渲染 __hd（无 thumb 且无 hd slot 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(false)
    })

    it('title 渲染为 <strong class="weui-media-box__title">', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题一' },
      })
      const title = wrapper.find('.weui-media-box__title')
      expect(title.exists()).toBe(true)
      expect(title.element.tagName.toLowerCase()).toBe('strong')
      expect(title.text()).toBe('标题一')
    })

    it('desc 渲染为 <p class="weui-media-box__desc">', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', desc: '描述文字' },
      })
      const desc = wrapper.find('.weui-media-box__desc')
      expect(desc.exists()).toBe(true)
      expect(desc.element.tagName.toLowerCase()).toBe('p')
      expect(desc.text()).toBe('描述文字')
    })
  })

  describe('type=text', () => {
    it('渲染 weui-media-box_text 类名', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'text', title: '标题' },
      })
      expect(wrapper.classes()).toContain('weui-media-box_text')
    })

    it('根元素为 div（text 模式总是 div）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'text', title: '标题', href: '/detail' },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('不渲染 __hd（text 模式无头部）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'text', thumb: 'x.png' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(false)
    })
  })

  describe('type=small-appmsg', () => {
    it('渲染 weui-media-box_small-appmsg 类名', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'small-appmsg' },
        slots: { default: '<div class="weui-cells" />' },
      })
      expect(wrapper.classes()).toContain('weui-media-box_small-appmsg')
    })

    it('根元素为 div', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'small-appmsg' },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })

    it('default slot 渲染到根元素内', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'small-appmsg' },
        slots: { default: '<div class="weui-cells">cells</div>' },
      })
      expect(wrapper.find('.weui-cells').exists()).toBe(true)
      expect(wrapper.text()).toContain('cells')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', extClass: 'my-box' },
      })
      expect(wrapper.classes()).toContain('my-box')
    })
  })

  describe('click 事件', () => {
    it('无 href 时点击触发 click 事件', async () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题' },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('有 href 时不触发 click 事件（由原生 a 处理）', async () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题', href: '/detail' },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('slots', () => {
    it('default slot 放在 __bd 末尾（appmsg 模式）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg', title: '标题' },
        slots: { default: '<ul class="weui-media-box__info" />' },
      })
      const bd = wrapper.find('.weui-media-box__bd')
      expect(bd.find('.weui-media-box__info').exists()).toBe(true)
    })

    it('hd slot 替代 thumb prop', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'appmsg' },
        slots: { hd: '<div class="custom-hd" />' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__hd .custom-hd').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__thumb').exists()).toBe(false)
    })
  })
})
