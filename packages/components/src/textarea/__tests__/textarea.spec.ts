import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiTextarea from '../textarea.vue'

describe('WeuiTextarea', () => {
  it('根元素为 div.weui-cell', () => {
    const wrapper = mount(WeuiTextarea)
    expect(wrapper.classes()).toContain('weui-cell')
  })

  it('渲染 textarea 和 counter', () => {
    const wrapper = mount(WeuiTextarea)
    expect(wrapper.find('textarea.weui-textarea').exists()).toBe(true)
    expect(wrapper.find('.weui-textarea-counter').exists()).toBe(true)
  })

  it('showCount=false 时隐藏 counter', () => {
    const wrapper = mount(WeuiTextarea, { props: { showCount: false } })
    expect(wrapper.find('.weui-textarea-counter').exists()).toBe(false)
  })

  it('显示计数', () => {
    const wrapper = mount(WeuiTextarea, { props: { modelValue: 'hello' } })
    expect(wrapper.find('.weui-textarea-counter span').text()).toBe('5')
  })

  it('warn=true 追加 weui-cell_warn', () => {
    const wrapper = mount(WeuiTextarea, { props: { warn: true } })
    expect(wrapper.classes()).toContain('weui-cell_warn')
  })

  it('渲染 label', () => {
    const wrapper = mount(WeuiTextarea, { props: { label: '问题描述' } })
    expect(wrapper.find('.weui-label').text()).toBe('问题描述')
  })

  it('v-model 双向绑定', async () => {
    const wrapper = mount(WeuiTextarea, { props: { modelValue: '' } })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('新内容')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['新内容'])
  })

  it('vertical prop 追加 weui-cell_vertical', () => {
    const wrapper = mount(WeuiTextarea, { props: { vertical: true } })
    expect(wrapper.classes()).toContain('weui-cell_vertical')
  })

  it('extClass 追加到根元素', () => {
    const wrapper = mount(WeuiTextarea, { props: { extClass: 'my-ta' } })
    expect(wrapper.classes()).toContain('my-ta')
  })
})
