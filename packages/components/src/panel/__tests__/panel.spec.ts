import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiPanel from '../panel.vue'

describe('WeuiPanel', () => {
  describe('基础类名', () => {
    it('始终带 weui-panel 类', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.classes()).toContain('weui-panel')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.element.tagName.toLowerCase()).toBe('view')
    })
  })

  describe('type', () => {
    it('默认 type=default 不带 weui-panel_access 类', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.classes()).not.toContain('weui-panel_access')
    })

    it('type=access 时带 weui-panel_access 类', () => {
      const wrapper = mount(WeuiPanel, { props: { type: 'access' } })
      expect(wrapper.classes()).toContain('weui-panel_access')
    })

    it('显式传 type=default 不带 weui-panel_access 类', () => {
      const wrapper = mount(WeuiPanel, { props: { type: 'default' } })
      expect(wrapper.classes()).not.toContain('weui-panel_access')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiPanel, {
        props: { extClass: 'my-panel' },
      })
      expect(wrapper.classes()).toContain('my-panel')
    })

    it('不传 extClass 时不追加额外类名', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.classes()).toEqual(['weui-panel'])
    })

    it('access 模式下也支持 extClass', () => {
      const wrapper = mount(WeuiPanel, {
        props: { type: 'access', extClass: 'my-panel' },
      })
      expect(wrapper.classes()).toContain('weui-panel')
      expect(wrapper.classes()).toContain('weui-panel_access')
      expect(wrapper.classes()).toContain('my-panel')
    })
  })

  describe('header', () => {
    it('传入 title 时渲染 .weui-panel__hd 并显示标题', () => {
      const wrapper = mount(WeuiPanel, { props: { title: '面板标题' } })
      const hd = wrapper.find('.weui-panel__hd')
      expect(hd.exists()).toBe(true)
      expect(hd.text()).toBe('面板标题')
    })

    it('不传 title 时不渲染 .weui-panel__hd', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.find('.weui-panel__hd').exists()).toBe(false)
    })

    it('header slot 替代 title 渲染自定义头部', () => {
      const wrapper = mount(WeuiPanel, {
        props: { title: '默认标题' },
        slots: { header: '<view class="custom-hd">自定义头部</view>' },
      })
      const hd = wrapper.find('.weui-panel__hd')
      expect(hd.exists()).toBe(true)
      expect(hd.find('.custom-hd').exists()).toBe(true)
      expect(hd.text()).toBe('自定义头部')
    })

    it('仅提供 header slot（无 title）时也渲染 .weui-panel__hd', () => {
      const wrapper = mount(WeuiPanel, {
        slots: { header: '只有 slot' },
      })
      expect(wrapper.find('.weui-panel__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-panel__hd').text()).toBe('只有 slot')
    })
  })

  describe('body', () => {
    it('始终渲染 .weui-panel__bd', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.find('.weui-panel__bd').exists()).toBe(true)
    })

    it('default slot 内容渲染到主体', () => {
      const wrapper = mount(WeuiPanel, {
        slots: { default: '<view class="body-content">主体内容</view>' },
      })
      const bd = wrapper.find('.weui-panel__bd')
      expect(bd.find('.body-content').exists()).toBe(true)
      expect(bd.text()).toBe('主体内容')
    })
  })

  describe('footer', () => {
    it('提供 footer slot 时渲染 .weui-panel__ft', () => {
      const wrapper = mount(WeuiPanel, {
        slots: { footer: '<view class="ft-content">底部内容</view>' },
      })
      const ft = wrapper.find('.weui-panel__ft')
      expect(ft.exists()).toBe(true)
      expect(ft.find('.ft-content').exists()).toBe(true)
      expect(ft.text()).toBe('底部内容')
    })

    it('不提供 footer slot 时不渲染 .weui-panel__ft', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.find('.weui-panel__ft').exists()).toBe(false)
    })
  })

  describe('组合结构', () => {
    it('同时渲染 header、body、footer', () => {
      const wrapper = mount(WeuiPanel, {
        props: { title: '标题', type: 'access', extClass: 'ext' },
        slots: {
          default: '<view>主体</view>',
          footer: '<view>底部</view>',
        },
      })
      expect(wrapper.find('.weui-panel__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-panel__bd').exists()).toBe(true)
      expect(wrapper.find('.weui-panel__ft').exists()).toBe(true)
      expect(wrapper.classes()).toContain('weui-panel_access')
      expect(wrapper.classes()).toContain('ext')
    })
  })
})
