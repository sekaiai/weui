import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiFormPage from '../form-page.vue'

describe('WeuiFormPage', () => {
  describe('基础类名', () => {
    it('始终带 weui-form-page 类', () => {
      const wrapper = mount(WeuiFormPage)
      expect(wrapper.classes()).toContain('weui-form-page')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiFormPage)
      expect(wrapper.element.tagName.toLowerCase()).toBe('view')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiFormPage, {
        props: { extClass: 'my-page' },
      })
      expect(wrapper.classes()).toContain('my-page')
    })

    it('不传 extClass 时不追加额外类名', () => {
      const wrapper = mount(WeuiFormPage)
      expect(wrapper.classes()).toEqual(['weui-form-page'])
    })
  })

  describe('标题区域', () => {
    it('传入 title 时渲染 .weui-form__text-area 和 .weui-form__title', () => {
      const wrapper = mount(WeuiFormPage, { props: { title: '页面标题' } })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      const titleEl = ta.find('.weui-form__title')
      expect(titleEl.exists()).toBe(true)
      expect(titleEl.text()).toBe('页面标题')
    })

    it('传入 desc 时渲染 .weui-form__desc', () => {
      const wrapper = mount(WeuiFormPage, {
        props: { title: '标题', desc: '页面描述' },
      })
      const descEl = wrapper.find('.weui-form__text-area .weui-form__desc')
      expect(descEl.exists()).toBe(true)
      expect(descEl.text()).toBe('页面描述')
    })

    it('不传 title/desc 且无 title slot 时不渲染 .weui-form__text-area', () => {
      const wrapper = mount(WeuiFormPage)
      expect(wrapper.find('.weui-form__text-area').exists()).toBe(false)
    })

    it('仅传 desc（无 title）时也渲染 .weui-form__text-area', () => {
      const wrapper = mount(WeuiFormPage, { props: { desc: '只有描述' } })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      expect(ta.find('.weui-form__title').exists()).toBe(false)
      expect(ta.find('.weui-form__desc').text()).toBe('只有描述')
    })

    it('title slot 替代默认标题内容', () => {
      const wrapper = mount(WeuiFormPage, {
        props: { title: '默认标题' },
        slots: { title: '<view class="custom-title">自定义标题</view>' },
      })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      expect(ta.find('.custom-title').exists()).toBe(true)
      expect(ta.find('.weui-form__title').exists()).toBe(false)
      expect(ta.text()).toBe('自定义标题')
    })

    it('仅提供 title slot（无 title/desc）时也渲染 .weui-form__text-area', () => {
      const wrapper = mount(WeuiFormPage, {
        slots: { title: '<view class="custom-title">只有 slot</view>' },
      })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      expect(ta.text()).toBe('只有 slot')
    })
  })

  describe('主体内容', () => {
    it('始终渲染 .weui-form__control-area', () => {
      const wrapper = mount(WeuiFormPage)
      expect(wrapper.find('.weui-form__control-area').exists()).toBe(true)
    })

    it('default slot 内容渲染到主体区域', () => {
      const wrapper = mount(WeuiFormPage, {
        slots: { default: '<view class="body-content">主体内容</view>' },
      })
      const ca = wrapper.find('.weui-form__control-area')
      expect(ca.find('.body-content').exists()).toBe(true)
      expect(ca.text()).toBe('主体内容')
    })
  })

  describe('底部区域', () => {
    it('提供 footer slot 时渲染 .weui-form__opr-area', () => {
      const wrapper = mount(WeuiFormPage, {
        slots: { footer: '<view class="footer-content">底部操作</view>' },
      })
      const oa = wrapper.find('.weui-form__opr-area')
      expect(oa.exists()).toBe(true)
      expect(oa.find('.footer-content').exists()).toBe(true)
      expect(oa.text()).toBe('底部操作')
    })

    it('不提供 footer slot 时不渲染 .weui-form__opr-area', () => {
      const wrapper = mount(WeuiFormPage)
      expect(wrapper.find('.weui-form__opr-area').exists()).toBe(false)
    })
  })

  describe('组合结构', () => {
    it('同时渲染标题区域、主体区域、底部区域', () => {
      const wrapper = mount(WeuiFormPage, {
        props: { title: '标题', desc: '描述', extClass: 'ext' },
        slots: {
          default: '<view>主体</view>',
          footer: '<view>底部</view>',
        },
      })
      expect(wrapper.find('.weui-form__text-area').exists()).toBe(true)
      expect(wrapper.find('.weui-form__control-area').exists()).toBe(true)
      expect(wrapper.find('.weui-form__opr-area').exists()).toBe(true)
      expect(wrapper.classes()).toContain('ext')
    })
  })
})
