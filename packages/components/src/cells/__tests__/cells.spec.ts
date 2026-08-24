import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiCells from '../cells.vue'

describe('WeuiCells', () => {
  it('默认只渲染 weui-cells 基础类', () => {
    const wrapper = mount(WeuiCells)
    expect(wrapper.classes()).toEqual(['weui-cells'])
  })

  it('通过语义 props 追加 modifier classes', () => {
    const wrapper = mount(WeuiCells, {
      props: { form: true, radio: true, checkbox: true, afterTitle: true },
    })

    expect(wrapper.classes()).toEqual([
      'weui-cells',
      'weui-cells_form',
      'weui-cells_radio',
      'weui-cells_checkbox',
      'weui-cells_after-title',
    ])
  })

  it('保留业务自定义 extClass', () => {
    const wrapper = mount(WeuiCells, {
      props: { form: true, extClass: 'my-cells' },
    })

    expect(wrapper.classes()).toContain('weui-cells_form')
    expect(wrapper.classes()).toContain('my-cells')
  })

  it('渲染默认插槽内容', () => {
    const wrapper = mount(WeuiCells, {
      slots: { default: '<div class="cell-item">内容</div>' },
    })

    expect(wrapper.find('.cell-item').exists()).toBe(true)
  })
})
