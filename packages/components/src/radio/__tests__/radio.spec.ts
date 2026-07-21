import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiRadio from '../radio.vue'
import WeuiRadioGroup from '../radio-group.vue'

describe('WeuiRadio', () => {
  it('根元素为 label.weui-check__label', () => {
    const wrapper = mount(WeuiRadio, {
      props: { value: '1' },
    })
    expect(wrapper.element.tagName).toBe('LABEL')
    expect(wrapper.classes()).toContain('weui-check__label')
    expect(wrapper.classes()).toContain('weui-cell')
  })

  it('渲染 radio input', () => {
    const wrapper = mount(WeuiRadio, {
      props: { value: '1' },
    })
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
    expect(wrapper.find('input.weui-check').exists()).toBe(true)
    expect(wrapper.find('span.weui-icon-checked').exists()).toBe(true)
  })

  it('渲染 label text', () => {
    const wrapper = mount(WeuiRadio, {
      props: { value: '1', label: '选项一' },
    })
    expect(wrapper.find('.weui-cell__bd p').text()).toBe('选项一')
  })

  it('使用 slot 替代 label', () => {
    const wrapper = mount(WeuiRadio, {
      props: { value: '1' },
      slots: { default: '自定义内容' },
    })
    expect(wrapper.find('.weui-cell__bd').text()).toBe('自定义内容')
  })

  it('disabled 状态添加 .weui-cell_disabled', () => {
    const wrapper = mount(WeuiRadio, {
      props: { value: '1', disabled: true },
    })
    expect(wrapper.classes()).toContain('weui-cell_disabled')
  })

  it('接受 extClass', () => {
    const wrapper = mount(WeuiRadio, {
      props: { value: '1', extClass: 'custom-class' },
    })
    expect(wrapper.classes()).toContain('custom-class')
  })
})

describe('WeuiRadioGroup', () => {
  const mountGroup = (props = {}, slots = {}) => {
    return mount(WeuiRadioGroup, {
      props: { ...props },
      slots: {
        default: [
          mount(WeuiRadio, { props: { value: '1', label: '选项一' } }).element.outerHTML,
          mount(WeuiRadio, { props: { value: '2', label: '选项二' } }).element.outerHTML,
        ].join('\n'),
        ...slots,
      },
    })
  }

  it('渲染 weui-cells_radio', () => {
    const wrapper = mount(WeuiRadioGroup, {
      props: { modelValue: '1' },
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.find('.weui-cells_radio').exists()).toBe(true)
  })

  it('渲染 title', () => {
    const wrapper = mount(WeuiRadioGroup, {
      props: { modelValue: '1', title: '单选标题' },
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.find('.weui-cells__title').text()).toBe('单选标题')
  })

  it('渲染 footer', () => {
    const wrapper = mount(WeuiRadioGroup, {
      props: { modelValue: '1', footer: '提示信息' },
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.find('.weui-cells__tips').text()).toBe('提示信息')
  })
})
