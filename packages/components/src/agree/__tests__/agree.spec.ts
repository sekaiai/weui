import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiAgree from '../agree.vue'

describe('WeuiAgree', () => {
  describe('基础渲染', () => {
    it('根元素为 label 且带 weui-agree 和 weui-wa-hotarea 类', () => {
      const wrapper = mount(WeuiAgree)
      expect(wrapper.element.tagName).toBe('LABEL')
      expect(wrapper.classes()).toContain('weui-agree')
      expect(wrapper.classes()).toContain('weui-wa-hotarea')
    })

    it('包含 checkbox 和文本区域', () => {
      const wrapper = mount(WeuiAgree)
      expect(wrapper.find('.weui-agree__checkbox').exists()).toBe(true)
      expect(wrapper.find('.weui-agree__text').exists()).toBe(true)
    })

    it('默认不选中', () => {
      const wrapper = mount(WeuiAgree)
      const cb = wrapper.find('.weui-agree__checkbox')
      expect((cb.element as HTMLInputElement).checked).toBe(false)
    })
  })

  describe('modelValue', () => {
    it('modelValue=true 时 checkbox 选中', () => {
      const wrapper = mount(WeuiAgree, { props: { modelValue: true } })
      const cb = wrapper.find('.weui-agree__checkbox')
      expect((cb.element as HTMLInputElement).checked).toBe(true)
    })
  })

  describe('disabled', () => {
    it('disabled=true 时 checkbox 禁用', () => {
      const wrapper = mount(WeuiAgree, { props: { disabled: true } })
      const cb = wrapper.find('.weui-agree__checkbox')
      expect((cb.element as HTMLInputElement).disabled).toBe(true)
    })
  })

  describe('extClass', () => {
    it('extClass 追加到根元素', () => {
      const wrapper = mount(WeuiAgree, { props: { extClass: 'my-agree' } })
      expect(wrapper.classes()).toContain('my-agree')
    })
  })

  describe('default slot', () => {
    it('默认插槽内容渲染到 .weui-agree__text', () => {
      const wrapper = mount(WeuiAgree, {
        slots: { default: '同意<a href="#">相关条款</a>' },
      })
      const text = wrapper.find('.weui-agree__text')
      expect(text.html()).toContain('同意')
      expect(text.html()).toContain('相关条款')
    })
  })

  describe('事件', () => {
    it('点击 checkbox 触发 update:modelValue', async () => {
      const wrapper = mount(WeuiAgree, { props: { modelValue: false } })
      const cb = wrapper.find('.weui-agree__checkbox')
      await cb.setValue(true)
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    })

    it('点击 checkbox 触发 change', async () => {
      const wrapper = mount(WeuiAgree, { props: { modelValue: false } })
      const cb = wrapper.find('.weui-agree__checkbox')
      await cb.setValue(true)
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.emitted('change')![0]).toEqual([true])
    })
  })
})
