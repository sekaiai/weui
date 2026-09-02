import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiInput from '../input.vue'

describe('WeuiInput', () => {
  describe('基础渲染', () => {
    it('非 clearable 时根元素为原生 input', () => {
      const wrapper = mount(WeuiInput)
      expect(wrapper.element.tagName.toLowerCase()).toBe('input')
    })

    it('根元素带 weui-input 类', () => {
      const wrapper = mount(WeuiInput)
      expect(wrapper.classes()).toContain('weui-input')
    })

    it('内含原生 input 标签且带 weui-input 类', () => {
      const wrapper = mount(WeuiInput)
      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(input.classes()).toContain('weui-input')
    })
  })

  describe('modelValue', () => {
    it('将 modelValue 绑定到 input 的 value 属性', () => {
      const wrapper = mount(WeuiInput, { props: { modelValue: 'hello' } })
      expect(wrapper.find('input').attributes('value')).toBe('hello')
    })

    it('默认 modelValue 为空字符串', () => {
      const wrapper = mount(WeuiInput)
      expect(wrapper.find('input').attributes('value')).toBe('')
    })

    it('input 事件触发 update:modelValue', async () => {
      const wrapper = mount(WeuiInput)
      await wrapper.find('input').setValue('world')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['world'])
    })
  })

  describe('placeholder', () => {
    it('传入 placeholder', () => {
      const wrapper = mount(WeuiInput, { props: { placeholder: '请输入' } })
      expect(wrapper.find('input').attributes('placeholder')).toBe('请输入')
    })

    it('不传 placeholder 时无该属性', () => {
      const wrapper = mount(WeuiInput)
      expect(wrapper.find('input').attributes('placeholder')).toBeUndefined()
    })
  })

  describe('type', () => {
    it('默认 type 为 text', () => {
      const wrapper = mount(WeuiInput)
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })

    it('type=number', () => {
      const wrapper = mount(WeuiInput, { props: { type: 'number' } })
      expect(wrapper.find('input').attributes('type')).toBe('number')
    })

    it('type=password 时 H5 端 input type 为 password（无 password 属性）', () => {
      const wrapper = mount(WeuiInput, { props: { type: 'password' } })
      expect(wrapper.find('input').attributes('type')).toBe('password')
      expect(wrapper.find('input').attributes('password')).toBeUndefined()
    })

    it('type=idcard 时 H5 端降级为 text', () => {
      const wrapper = mount(WeuiInput, { props: { type: 'idcard' } })
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })

    it('type=digit 时 H5 端降级为 text', () => {
      const wrapper = mount(WeuiInput, { props: { type: 'digit' } })
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })

    it('非 password 类型时不渲染 password 属性', () => {
      const wrapper = mount(WeuiInput, { props: { type: 'text' } })
      expect(wrapper.find('input').attributes('password')).toBeUndefined()
    })
  })

  describe('disabled', () => {
    it('disabled=true 传递 disabled 属性', () => {
      const wrapper = mount(WeuiInput, { props: { disabled: true } })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('disabled=false 时不传递 disabled 属性', () => {
      const wrapper = mount(WeuiInput)
      expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
    })
  })

  describe('maxlength', () => {
    it('默认 maxlength=140', () => {
      const wrapper = mount(WeuiInput)
      expect(wrapper.find('input').attributes('maxlength')).toBe('140')
    })

    it('自定义 maxlength', () => {
      const wrapper = mount(WeuiInput, { props: { maxlength: 20 } })
      expect(wrapper.find('input').attributes('maxlength')).toBe('20')
    })

    it('maxlength=-1 表示不限制', () => {
      const wrapper = mount(WeuiInput, { props: { maxlength: -1 } })
      expect(wrapper.find('input').attributes('maxlength')).toBe('-1')
    })
  })

  describe('clearable', () => {
    it('clearable=false 时不显示清除按钮', () => {
      const wrapper = mount(WeuiInput, { props: { modelValue: 'hello' } })
      expect(wrapper.find('.weui-icon-clear').exists()).toBe(false)
    })

    it('clearable=true 且有值时显示清除按钮', () => {
      const wrapper = mount(WeuiInput, {
        props: { clearable: true, modelValue: 'hello' },
      })
      expect(wrapper.find('.weui-icon-clear').exists()).toBe(true)
    })

    it('clearable=true 但无值时不显示清除按钮', () => {
      const wrapper = mount(WeuiInput, {
        props: { clearable: true, modelValue: '' },
      })
      expect(wrapper.find('.weui-icon-clear').exists()).toBe(false)
    })

    it('disabled 时即使 clearable=true 也不显示清除按钮', () => {
      const wrapper = mount(WeuiInput, {
        props: { clearable: true, modelValue: 'hello', disabled: true },
      })
      expect(wrapper.find('.weui-icon-clear').exists()).toBe(false)
    })

    it('点击清除按钮触发 clear 事件并清空值', async () => {
      const wrapper = mount(WeuiInput, {
        props: { clearable: true, modelValue: 'hello' },
      })
      await wrapper.find('.weui-icon-clear').trigger('click')
      expect(wrapper.emitted('clear')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
    })
  })

  describe('focus', () => {
    it('focus=true 时组件正常渲染 input', () => {
      const wrapper = mount(WeuiInput, { props: { focus: true } })
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('focus=false 时组件正常渲染 input', () => {
      const wrapper = mount(WeuiInput)
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('focus=true 时 H5 端调用 DOM focus()', async () => {
      const wrapper = mount(WeuiInput, { props: { focus: false } })
      const inputEl = wrapper.find('input').element as HTMLInputElement
      const focusSpy = vi.spyOn(inputEl, 'focus')
      await wrapper.setProps({ focus: true })
      expect(focusSpy).toHaveBeenCalledTimes(1)
    })

    it('focus 从 true 变 false 时调用 DOM blur()', async () => {
      const wrapper = mount(WeuiInput, { props: { focus: true } })
      const inputEl = wrapper.find('input').element as HTMLInputElement
      const blurSpy = vi.spyOn(inputEl, 'blur')
      await wrapper.setProps({ focus: false })
      expect(blurSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiInput, { props: { extClass: 'my-input' } })
      expect(wrapper.classes()).toContain('my-input')
    })

    it('不传时不追加额外类名', () => {
      const wrapper = mount(WeuiInput)
      expect(wrapper.classes()).toEqual(['weui-input'])
    })
  })

  describe('外部样式', () => {
    it('将 extClass 与 style 绑定到 input，并将 wrapperClass 绑定到清除包装层', () => {
      const wrapper = mount(WeuiInput, {
        props: {
          clearable: true,
          extClass: 'profile-input',
          wrapperClass: 'profile-input-wrapper',
        },
        attrs: { style: 'margin-top: 16px' },
      })

      const input = wrapper.find('input')
      expect(input.classes()).toContain('profile-input')
      expect(input.attributes('style')).toContain('margin-top: 16px')
      expect(wrapper.find('.weui-input__wrapper').classes()).toContain('profile-input-wrapper')
    })
  })

  describe('事件透传', () => {
    it('focus 事件透传', async () => {
      const wrapper = mount(WeuiInput)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('blur 事件透传', async () => {
      const wrapper = mount(WeuiInput)
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })

    it('H5 端按 Enter 触发 confirm 事件', async () => {
      const wrapper = mount(WeuiInput)
      await wrapper.find('input').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('confirm')).toHaveLength(1)
    })
  })
})
