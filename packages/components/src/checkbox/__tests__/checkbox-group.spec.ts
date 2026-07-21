import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiCheckboxGroup from '../checkbox-group.vue'
import WeuiCheckbox from '../checkbox.vue'

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

  describe('H5 端 toggle 联动', () => {
    it('multi 模式下子项 toggle 调用更新 modelValue', async () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: '<weui-checkbox value="1" label="A" /><weui-checkbox value="2" label="B" />',
        },
        global: {
          components: { 'weui-checkbox': WeuiCheckbox },
        },
      })
      // 点击第一个 checkbox 的 input
      const checkboxes = wrapper.findAll('input[type="checkbox"]')
      await checkboxes[0].trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([['1']])
      expect(wrapper.emitted('change')![0]).toEqual([['1']])
    })

    it('multi 模式下再次点击同一项取消选中', async () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { modelValue: ['1'] },
        slots: {
          default: '<weui-checkbox value="1" label="A" />',
        },
        global: {
          components: { 'weui-checkbox': WeuiCheckbox },
        },
      })
      await wrapper.find('input[type="checkbox"]').trigger('change')
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([[]])
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
