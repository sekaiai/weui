import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiMediaBox from '../media-box.vue'

describe('WeuiMediaBox', () => {
  describe('图文模式（传入 thumb 自动判定为 appmsg）', () => {
    it('传入 thumb 时渲染 weui-media-box_appmsg 类名', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'https://example.com/x.png', title: '标题', desc: '描述' },
      })
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box').exists()).toBe(true)
    })

    it('根元素为 div（无 href 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'x.png', title: '标题' },
      })
      expect(wrapper.find('.weui-media-box_appmsg').element.tagName.toLowerCase()).toBe('div')
    })

    it('根元素为 a（有 href 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'x.png', title: '标题', href: '/detail/1' },
      })
      const root = wrapper.find('.weui-media-box_appmsg')
      expect(root.element.tagName.toLowerCase()).toBe('a')
      expect(root.attributes('href')).toBe('/detail/1')
    })

    it('渲染 __hd + __thumb', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'https://example.com/x.png' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__thumb').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__thumb').attributes('src')).toBe('https://example.com/x.png')
    })

    it('title 渲染为 <strong class="weui-media-box__title">', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'x.png', title: '标题一' },
      })
      const title = wrapper.find('.weui-media-box__title')
      expect(title.exists()).toBe(true)
      expect(title.element.tagName.toLowerCase()).toBe('strong')
      expect(title.text()).toBe('标题一')
    })

    it('desc 渲染为 <p class="weui-media-box__desc">', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'x.png', desc: '描述文字' },
      })
      const desc = wrapper.find('.weui-media-box__desc')
      expect(desc.exists()).toBe(true)
      expect(desc.element.tagName.toLowerCase()).toBe('p')
      expect(desc.text()).toBe('描述文字')
    })
  })

  describe('文字模式（无 thumb 自动判定为 text）', () => {
    it('无 thumb 时渲染 weui-media-box_text 类名', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { title: '标题' },
      })
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(true)
    })

    it('显式 type="text" 无 thumb 时也渲染 weui-media-box_text', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'text', title: '标题' },
      })
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(true)
    })

    it('根元素为 div（text 模式总是 div）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { title: '标题', href: '/detail' },
      })
      expect(wrapper.find('.weui-media-box_text').element.tagName.toLowerCase()).toBe('div')
    })

    it('不渲染 __hd（无 thumb 且无 hd slot 时）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { title: '标题' },
      })
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(false)
    })

    it('传入 thumb 时即使 type="text" 也渲染为 appmsg', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'text', thumb: 'x.png' },
      })
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(false)
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(true)
    })
  })

  describe('type=cells', () => {
    it('渲染 weui-media-box_small-appmsg 类名', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'cells' },
        slots: { default: '<div class="weui-cell" />' },
      })
      expect(wrapper.find('.weui-media-box_small-appmsg').exists()).toBe(true)
    })

    it('根元素为 div', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'cells' },
      })
      expect(wrapper.find('.weui-media-box_small-appmsg').element.tagName.toLowerCase()).toBe('div')
    })

    it('内部渲染 weui-cells 容器（不嵌套 weui-cells__group）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { type: 'cells' },
        slots: { default: '<div class="weui-cell">cell</div>' },
      })
      expect(wrapper.find('.weui-cells').exists()).toBe(true)
      expect(wrapper.find('.weui-cells__group').exists()).toBe(false)
      expect(wrapper.find('.weui-cell').exists()).toBe(true)
      expect(wrapper.text()).toContain('cell')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'x.png', extClass: 'my-box' },
      })
      expect(wrapper.find('.my-box').exists()).toBe(true)
    })
  })

  describe('click 事件', () => {
    it('无 href 时点击触发 click 事件', async () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'x.png', title: '标题' },
      })
      await wrapper.find('.weui-media-box_appmsg').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('有 href 时不触发 click 事件（由原生 a 处理）', async () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'x.png', title: '标题', href: '/detail' },
      })
      await wrapper.find('.weui-media-box_appmsg').trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('text 模式无 href 时也触发 click', async () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { title: '标题' },
      })
      await wrapper.find('.weui-media-box_text').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  })

  describe('slots', () => {
    it('default slot 放在 __bd 末尾（appmsg 模式）', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { thumb: 'x.png', title: '标题' },
        slots: { default: '<ul class="weui-media-box__info" />' },
      })
      const bd = wrapper.find('.weui-media-box__bd')
      expect(bd.find('.weui-media-box__info').exists()).toBe(true)
    })

    it('hd slot 替代 thumb prop 触发 appmsg 模式', () => {
      const wrapper = mount(WeuiMediaBox, {
        slots: { hd: '<div class="custom-hd" />' },
      })
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__hd .custom-hd').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__thumb').exists()).toBe(false)
    })

    it('default slot 放在 text 模式末尾', () => {
      const wrapper = mount(WeuiMediaBox, {
        props: { title: '标题' },
        slots: { default: '<ul class="weui-media-box__info" />' },
      })
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__info').exists()).toBe(true)
    })
  })
})
