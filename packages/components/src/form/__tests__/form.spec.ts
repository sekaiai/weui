import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiForm from '../form.vue'

describe('WeuiForm', () => {
  describe('基础类名', () => {
    it('始终带 weui-form 类', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.classes()).toContain('weui-form')
    })

    it('根元素为 div', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiForm, { props: { extClass: 'my-form' } })
      expect(wrapper.classes()).toContain('my-form')
    })

    it('不传 extClass 时不追加额外类名', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.classes()).toEqual(['weui-form'])
    })
  })

  describe('bottomFixed', () => {
    it('通过 prop 渲染官方底部悬浮页面结构', () => {
      const wrapper = mount(WeuiForm, { props: { bottomFixed: true } })
      expect(wrapper.classes()).toContain('weui-bottom-fixed-opr-page')
      expect(wrapper.find('.weui-form__bd').classes()).toContain('weui-bottom-fixed-opr-page__content')
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
        slots: { title: '<div class="custom-title">自定义标题</div>' },
      })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      expect(ta.find('.custom-title').exists()).toBe(true)
      expect(ta.find('.weui-form__title').exists()).toBe(false)
    })
  })

  describe('control-area', () => {
    it('始终渲染 .weui-form__control-area', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__control-area').exists()).toBe(true)
    })

    it('default slot 内容渲染到控件区域', () => {
      const wrapper = mount(WeuiForm, {
        slots: { default: '<div class="control-content">控件内容</div>' },
      })
      const ca = wrapper.find('.weui-form__control-area')
      expect(ca.find('.control-content').exists()).toBe(true)
    })
  })

  describe('footer slot', () => {
    it('提供 footer slot 时渲染 .weui-form__ft', () => {
      const wrapper = mount(WeuiForm, {
        slots: { footer: '<div class="my-footer">底部内容</div>' },
      })
      const ft = wrapper.find('.weui-form__ft')
      expect(ft.exists()).toBe(true)
      expect(ft.find('.my-footer').exists()).toBe(true)
    })

    it('不提供 footer slot 时不渲染 .weui-form__ft', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__ft').exists()).toBe(false)
    })

    it('footer slot 内用户自行组合 tips-area 和 opr-area', () => {
      const wrapper = mount(WeuiForm, {
        slots: {
          footer: `
            <div class="weui-form__tips-area"><p class="weui-form__tips">提示</p></div>
            <div class="weui-form__opr-area"><button>确定</button></div>
          `,
        },
      })
      const ft = wrapper.find('.weui-form__ft')
      expect(ft.find('.weui-form__tips-area').exists()).toBe(true)
      expect(ft.find('.weui-form__opr-area').exists()).toBe(true)
    })

    it('footer slot 内渲染 extra-area', () => {
      const wrapper = mount(WeuiForm, {
        slots: {
          footer: '<div class="weui-form__extra-area"><div class="weui-footer">Copyright</div></div>',
        },
      })
      expect(wrapper.find('.weui-form__extra-area').exists()).toBe(true)
    })
  })
})
