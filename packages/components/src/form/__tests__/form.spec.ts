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

    it('不传 title/desc 时不渲染 .weui-form__text-area', () => {
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

    it('title slot 不覆盖 title 属性内容', () => {
      const wrapper = mount(WeuiForm, {
        props: { title: '默认标题' },
        slots: { title: '<span class="custom-title">自定义标题</span>' },
      })
      const ta = wrapper.find('.weui-form__text-area')
      expect(ta.exists()).toBe(true)
      expect(ta.find('.custom-title').exists()).toBe(false)
      expect(ta.find('.weui-form__title').text()).toBe('默认标题')
    })

    it('desc slot 不再渲染描述内容', () => {
      const wrapper = mount(WeuiForm, {
        slots: { desc: '<span class="custom-desc">自定义描述</span>' },
      })
      expect(wrapper.find('.weui-form__text-area').exists()).toBe(false)
      expect(wrapper.find('.custom-desc').exists()).toBe(false)
    })

    it.each([
      ['left', 'left'],
      ['right', 'right'],
    ] as const)('textAlign=%s 时以内联样式对齐文字区域', (textAlign, expected) => {
      const wrapper = mount(WeuiForm, {
        props: { title: '表单标题', textAlign },
      })
      const textArea = wrapper.find('.weui-form__text-area').element as HTMLElement
      expect(textArea.style.textAlign).toBe(expected)
    })

    it('未传 textAlign 时保留 WeUI 默认对齐', () => {
      const wrapper = mount(WeuiForm, { props: { title: '表单标题' } })
      expect(wrapper.find('.weui-form__text-area').attributes('style')).toBeUndefined()
    })
  })

  describe('hd slot', () => {
    it('直接渲染到 bd 内并位于 text-area 前', () => {
      const wrapper = mount(WeuiForm, {
        props: { title: '默认标题' },
        slots: { hd: '<div class="custom-hd">自定义头部</div>' },
      })
      const children = wrapper.findAll('.weui-form__bd > *')
      expect(children[0].classes()).toContain('custom-hd')
      expect(children[1].classes()).toContain('weui-form__text-area')
      expect(wrapper.find('.custom-hd').element.parentElement?.classList).toContain('weui-form__bd')
    })

    it('不提供 hd 时不渲染头部内容或包装节点', () => {
      const wrapper = mount(WeuiForm, { props: { title: '默认标题' } })
      const children = wrapper.findAll('.weui-form__bd > *')
      expect(children[0].classes()).toContain('weui-form__text-area')
      expect(wrapper.find('.weui-form__hd').exists()).toBe(false)
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

  describe('footer areas', () => {
    it('提供 tips、opr、tips-b、extra slots 时按固定顺序渲染', () => {
      const wrapper = mount(WeuiForm, {
        slots: {
          tips: '提交前提示',
          opr: '<button>确定</button>',
          'tips-b': '提交后提示',
          extra: '<div class="extra-content">底部信息</div>',
        },
      })
      const ft = wrapper.find('.weui-form__ft')
      expect(ft.exists()).toBe(true)
      const areas = ft.findAll('.weui-form__ft > *')
      expect(areas).toHaveLength(4)
      expect(areas[0].classes()).toContain('weui-form__tips-area')
      expect(areas[1].classes()).toContain('weui-form__opr-area')
      expect(areas[2].classes()).toContain('weui-form__tips-area')
      expect(areas[3].classes()).toContain('weui-form__extra-area')
      expect(areas[0].text()).toBe('提交前提示')
      expect(areas[2].text()).toBe('提交后提示')
      expect(areas[3].find('.extra-content').exists()).toBe(true)
    })

    it.each([
      ['tips', '.weui-form__tips-area'],
      ['opr', '.weui-form__opr-area'],
      ['tips-b', '.weui-form__tips-area'],
      ['extra', '.weui-form__extra-area'],
    ] as const)('%s slot 单独控制对应区域', (slotName, selector) => {
      const wrapper = mount(WeuiForm, {
        slots: { [slotName]: '内容' },
      })
      expect(wrapper.find('.weui-form__ft').exists()).toBe(true)
      expect(wrapper.find(selector).exists()).toBe(true)
      expect(wrapper.findAll('.weui-form__ft > *')).toHaveLength(1)
    })

    it('没有 footer area slot 时不渲染 .weui-form__ft', () => {
      const wrapper = mount(WeuiForm)
      expect(wrapper.find('.weui-form__ft').exists()).toBe(false)
    })

    it('移除 footer、control 和 title-content slots', () => {
      const wrapper = mount(WeuiForm, {
        slots: {
          footer: '<div class="removed-footer">footer</div>',
          control: '<div class="removed-control">control</div>',
          'title-content': '<div class="removed-title">title</div>',
        },
      })
      expect(wrapper.find('.removed-footer').exists()).toBe(false)
      expect(wrapper.find('.removed-control').exists()).toBe(false)
      expect(wrapper.find('.removed-title').exists()).toBe(false)
      expect(wrapper.find('.weui-form__ft').exists()).toBe(false)
    })
  })
})
