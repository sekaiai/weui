import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiForm from '../form.vue'

describe('WeuiForm', () => {
  describe('基础类名', () => {
    it('始终带 weui-form 类', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.classes()).toContain('weui-form')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiForm, {
        props: { extClass: 'my-form' },
      })
      expect(wrapper.classes()).toContain('my-form')
    })

    it('不传 extClass 时不追加额外类名', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.classes()).toEqual(['weui-form'])
    })
  })

  describe('text-area', () => {
    it('传入 title 时渲染 .weui-form__text-area 和 .weui-form__title', () => {
      const wrapper = mount(WeuiForm, { props: { title: '表单标题' } })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      const titleEl = ta.find('.weui-form__title')
      expect(titleEl.exists()).toBe(true)
      expect(titleEl.text()).toBe('表单标题')
    })

    it('传入 desc 时渲染 .weui-form__desc', () => {
      const wrapper = mount(WeuiForm, {
        props: { title: '标题', desc: '表单描述' },
      })
      const descEl = wrapper.find('.weui-form__text-area .weui-form__desc')
      expect(descEl.exists()).toBe(true)
      expect(descEl.text()).toBe('表单描述')
    })

    it('不传 title/desc 且无 title slot 时不渲染 .weui-form__text-area', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__text-area').exists()).toBe(false)
    })

    it('仅传 desc（无 title）时也渲染 .weui-form__text-area', () => {
      const wrapper = mount(WeuiForm, { props: { desc: '只有描述' } })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      expect(ta.find('.weui-form__title').exists()).toBe(false)
      expect(ta.find('.weui-form__desc').text()).toBe('只有描述')
    })

    it('title slot 替代默认标题内容', () => {
      const wrapper = mount(WeuiForm, {
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
      const wrapper = mount(WeuiForm, {
        slots: { title: '<view class="custom-title">只有 slot</view>' },
      })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      expect(ta.text()).toBe('只有 slot')
    })
  })

  describe('control-area', () => {
    it('始终渲染 .weui-form__control-area', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__control-area').exists()).toBe(true)
    })

    it('default slot 内容渲染到控件区域', () => {
      const wrapper = mount(WeuiForm, {
        slots: { default: '<view class="control-content">控件内容</view>' },
      })
      const ca = wrapper.find('.weui-form__control-area')
      expect(ca.find('.control-content').exists()).toBe(true)
      expect(ca.text()).toBe('控件内容')
    })
  })

  describe('tips-area', () => {
    it('传入 tips 时渲染 .weui-form__tips-area 并显示文本', () => {
      const wrapper = mount(WeuiForm, { props: { tips: '提示文字' } })
      const ta = wrapper.find('.weui-form__tips-area')
      expect(ta.exists()).toBe(true)
      expect(ta.text()).toBe('提示文字')
    })

    it('不传 tips 且无 tips slot 时不渲染 .weui-form__tips-area', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__tips-area').exists()).toBe(false)
    })

    it('tips slot 替代默认提示内容', () => {
      const wrapper = mount(WeuiForm, {
        slots: { tips: '<view class="custom-tips">自定义提示</view>' },
      })
      const ta = wrapper.find('.weui-form__tips-area')
      expect(ta.exists()).toBe(true)
      expect(ta.find('.custom-tips').exists()).toBe(true)
      expect(ta.text()).toBe('自定义提示')
    })
  })

  describe('opr-area', () => {
    it('提供 footer slot 时渲染 .weui-form__opr-area', () => {
      const wrapper = mount(WeuiForm, {
        slots: { footer: '<view class="footer-content">操作按钮</view>' },
      })
      const oa = wrapper.find('.weui-form__opr-area')
      expect(oa.exists()).toBe(true)
      expect(oa.find('.footer-content').exists()).toBe(true)
      expect(oa.text()).toBe('操作按钮')
    })

    it('不提供 footer slot 时不渲染 .weui-form__opr-area', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__opr-area').exists()).toBe(false)
    })
  })

  describe('组合结构', () => {
    it('同时渲染 text-area、control-area、tips-area、opr-area', () => {
      const wrapper = mount(WeuiForm, {
        props: { title: '标题', desc: '描述', tips: '提示', extClass: 'ext' },
        slots: {
          default: '<view>主体</view>',
          footer: '<view>底部</view>',
        },
      })
      expect(wrapper.find('.weui-form__text-area').exists()).toBe(true)
      expect(wrapper.find('.weui-form__control-area').exists()).toBe(true)
      expect(wrapper.find('.weui-form__tips-area').exists()).toBe(true)
      expect(wrapper.find('.weui-form__opr-area').exists()).toBe(true)
      expect(wrapper.classes()).toContain('ext')
    })
  })
})
