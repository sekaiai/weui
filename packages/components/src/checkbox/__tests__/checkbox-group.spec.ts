import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiCheckboxGroup from '../checkbox-group.vue'

describe('WeuiCheckboxGroup', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-cells__group 类', () => {
      const wrapper = mount(WeuiCheckboxGroup)
      expect(wrapper.classes()).toContain('weui-cells__group')
    })

    it('包含 weui-cells 容器', () => {
      const wrapper = mount(WeuiCheckboxGroup)
      expect(wrapper.find('.weui-cells').exists()).toBe(true)
      expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_after-title')
    })
  })

  describe('multi', () => {
    it('multi=true（默认）渲染 checkbox-group + weui-cells_checkbox', () => {
      const wrapper = mount(WeuiCheckboxGroup)
      expect(wrapper.find('checkbox-group').exists()).toBe(true)
      expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_checkbox')
      expect(wrapper.find('.weui-cells').classes()).not.toContain('weui-cells_radio')
    })

    it('multi=false 渲染 radio-group + weui-cells_radio', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { multi: false },
      })
      expect(wrapper.find('radio-group').exists()).toBe(true)
      expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_radio')
      expect(wrapper.find('.weui-cells').classes()).not.toContain('weui-cells_checkbox')
    })
  })

  describe('title', () => {
    it('渲染组标题', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { title: '复选列表' },
      })
      const title = wrapper.find('.weui-cells__title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('复选列表')
    })

    it('不传 title 时不渲染标题', () => {
      const wrapper = mount(WeuiCheckboxGroup)
      expect(wrapper.find('.weui-cells__title').exists()).toBe(false)
    })
  })

  describe('footer', () => {
    it('渲染底部说明', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { footer: '说明文字' },
      })
      const tips = wrapper.find('.weui-cells__tips')
      expect(tips.exists()).toBe(true)
      expect(tips.text()).toBe('说明文字')
    })
  })

  describe('form', () => {
    it('form=true 追加 weui-cells__group_form', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { form: true },
      })
      expect(wrapper.classes()).toContain('weui-cells__group_form')
      expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_form')
    })

    it('form=false 时不追加 form 类', () => {
      const wrapper = mount(WeuiCheckboxGroup)
      expect(wrapper.classes()).not.toContain('weui-cells__group_form')
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { extClass: 'my-group' },
      })
      expect(wrapper.classes()).toContain('my-group')
    })
  })

  describe('change 事件', () => {
    it('checkbox-group change 时触发 update:modelValue 和 change', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { modelValue: [] },
      })
      // 模拟 checkbox-group 原生组件的 change 事件
      wrapper.find('checkbox-group').element.dispatchEvent(
        new CustomEvent('change', { detail: { value: ['1', '2'] } }),
      )
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([['1', '2']])
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.emitted('change')![0]).toEqual([['1', '2']])
    })

    it('radio-group change 时将单值转为数组', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { multi: false, modelValue: [] },
      })
      wrapper.find('radio-group').element.dispatchEvent(
        new CustomEvent('change', { detail: { value: '1' } }),
      )
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([['1']])
    })
  })

  describe('默认插槽', () => {
    it('渲染默认插槽内容', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        slots: { default: '<view class="test-item">item</view>' },
      })
      expect(wrapper.find('.weui-cells').html()).toContain('test-item')
    })
  })
})
