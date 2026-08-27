import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
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

  it('title slot 覆盖 title prop', () => {
    const wrapper = mount(WeuiRadioGroup, {
      props: { modelValue: '1', title: '默认标题' },
      slots: {
        default: '<div>content</div>',
        title: '<strong class="custom-title">自定义标题</strong>',
      },
    })

    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  it('渲染 tips', () => {
    const wrapper = mount(WeuiRadioGroup, {
      props: { modelValue: '1', tips: '提示信息' },
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.find('.weui-cells__tips').text()).toBe('提示信息')
  })

  it('tips slot 覆盖 tips prop', () => {
    const wrapper = mount(WeuiRadioGroup, {
      props: { modelValue: '1', tips: '默认提示' },
      slots: {
        default: '<div>content</div>',
        tips: '<strong class="custom-tips">自定义提示</strong>',
      },
    })

    expect(wrapper.find('.custom-tips').text()).toBe('自定义提示')
  })

  it('生成非空 name，并且连续选择时只保留一个选中项', async () => {
    const Harness = defineComponent({
      components: { WeuiRadioGroup, WeuiRadio },
      setup() {
        const value = ref('1')
        return { value }
      },
      template: '<weui-radio-group v-model="value"><weui-radio value="1" /><weui-radio value="2" /></weui-radio-group>',
    })
    const wrapper = mount(Harness)
    const inputs = wrapper.findAll('input[type="radio"]')
    expect(inputs[0].attributes('name')).toMatch(/^weui-radio-group-/)
    expect(inputs[0].attributes('name')).toBe(inputs[1].attributes('name'))
    await inputs[1].setValue()
    expect((inputs[0].element as HTMLInputElement).checked).toBe(false)
    expect((inputs[1].element as HTMLInputElement).checked).toBe(true)
  })

  it('在不同应用实例中生成稳定的 name', () => {
    const first = mount(WeuiRadioGroup, { slots: { default: '<div />' } })
    const second = mount(WeuiRadioGroup, { slots: { default: '<div />' } })

    const getName = (wrapper: typeof first) =>
      (wrapper.vm as unknown as { radioName: string }).radioName

    expect(getName(first)).toBe('weui-radio-group-0')
    expect(getName(second)).toBe('weui-radio-group-0')
  })
})
