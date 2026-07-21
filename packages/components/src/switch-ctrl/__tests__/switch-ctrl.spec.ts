import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiSwitch from '../switch-ctrl.vue'

describe('WeuiSwitch', () => {
  it('根元素为 label.weui-cell.weui-cell_switch', () => {
    const wrapper = mount(WeuiSwitch)
    expect(wrapper.element.tagName).toBe('LABEL')
    expect(wrapper.classes()).toContain('weui-cell')
    expect(wrapper.classes()).toContain('weui-cell_switch')
  })

  it('渲染 label 文字', () => {
    const wrapper = mount(WeuiSwitch, { props: { label: '标题文字' } })
    expect(wrapper.find('.weui-cell__bd').text()).toBe('标题文字')
  })

  it('渲染 input.weui-switch', () => {
    const wrapper = mount(WeuiSwitch)
    expect(wrapper.find('.weui-switch').exists()).toBe(true)
  })

  it('modelValue 控制选中状态', () => {
    const wrapper = mount(WeuiSwitch, { props: { modelValue: true } })
    expect((wrapper.find('.weui-switch').element as HTMLInputElement).checked).toBe(true)
  })

  it('cp=true 渲染 weui-switch-cp', () => {
    const wrapper = mount(WeuiSwitch, { props: { cp: true, modelValue: true } })
    expect(wrapper.find('.weui-switch-cp').exists()).toBe(true)
  })

  it('切换时触发 update:modelValue', async () => {
    const wrapper = mount(WeuiSwitch, { props: { modelValue: false } })
    await wrapper.find('.weui-switch').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('disabled 禁止点击', () => {
    const wrapper = mount(WeuiSwitch, { props: { disabled: true } })
    expect((wrapper.find('.weui-switch').element as HTMLInputElement).disabled).toBe(true)
  })
})
