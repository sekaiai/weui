import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiCellGroup from '../cell-group.vue'

describe('WeuiCellGroup', () => {
  it('只渲染 weui-cells__group 外壳', () => {
    const wrapper = mount(WeuiCellGroup)

    expect(wrapper.classes()).toEqual(['weui-cells__group'])
    expect(wrapper.find('.weui-cells').exists()).toBe(false)
    expect(wrapper.find('.weui-cells__title').exists()).toBe(false)
    expect(wrapper.find('.weui-cells__tips').exists()).toBe(false)
  })

  it('将默认插槽原样渲染到外壳内', () => {
    const wrapper = mount(WeuiCellGroup, {
      slots: { default: '<div class="cells-content">内容</div>' },
    })

    expect(wrapper.find('.cells-content').exists()).toBe(true)
    expect(wrapper.find('.cells-content').element.parentElement).toBe(wrapper.element)
  })

  it('form=true 追加 weui-cells__group_form', () => {
    const wrapper = mount(WeuiCellGroup, { props: { form: true } })

    expect(wrapper.classes()).toContain('weui-cells__group_form')
  })

  it('form + primary 追加反色表单组类', () => {
    const wrapper = mount(WeuiCellGroup, {
      props: { form: true, primary: true },
    })

    expect(wrapper.classes()).toContain('weui-cells__group_form')
    expect(wrapper.classes()).toContain('weui-cells__group_form-primary')
  })

  it('primary 不与 form 一起使用时不追加反色表单组类', () => {
    const wrapper = mount(WeuiCellGroup, { props: { primary: true } })

    expect(wrapper.classes()).not.toContain('weui-cells__group_form-primary')
  })

  it('保留 ariaRole 和业务自定义 extClass', () => {
    const wrapper = mount(WeuiCellGroup, {
      props: { ariaRole: 'group', extClass: 'my-group' },
    })

    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.classes()).toContain('my-group')
  })
})
