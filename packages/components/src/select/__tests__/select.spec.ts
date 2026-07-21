import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiSelect from '../select.vue'

describe('WeuiSelect', () => {
  it('根元素为 div.weui-cell.weui-cell_select', () => {
    const wrapper = mount(WeuiSelect)
    expect(wrapper.classes()).toContain('weui-cell')
    expect(wrapper.classes()).toContain('weui-cell_select')
  })

  it('渲染 select.weui-select', () => {
    const wrapper = mount(WeuiSelect)
    expect(wrapper.find('select.weui-select').exists()).toBe(true)
  })

  it('渲染 options', () => {
    const wrapper = mount(WeuiSelect, {
      slots: { default: '<option value="1">选项一</option><option value="2">选项二</option>' },
    })
    expect(wrapper.findAll('option')).toHaveLength(2)
  })

  it('before=true 追加 weui-cell_select-before', () => {
    const wrapper = mount(WeuiSelect, { props: { before: true } })
    expect(wrapper.classes()).toContain('weui-cell_select-before')
  })

  it('after=true 追加 weui-cell_select-after', () => {
    const wrapper = mount(WeuiSelect, { props: { after: true } })
    expect(wrapper.classes()).toContain('weui-cell_select-after')
  })

  it('label 渲染', () => {
    const wrapper = mount(WeuiSelect, { props: { label: '国家' } })
    expect(wrapper.find('.weui-label').text()).toBe('国家')
  })

  it('modelValue 选中对应 option', () => {
    const wrapper = mount(WeuiSelect, {
      props: { modelValue: '2' },
      slots: { default: '<option value="1">1</option><option value="2">2</option>' },
    })
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('2')
  })

  it('选择触发 update:modelValue', async () => {
    const wrapper = mount(WeuiSelect, {
      props: { modelValue: '1' },
      slots: { default: '<option value="1">1</option><option value="2">2</option>' },
    })
    await wrapper.find('select').setValue('2')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2'])
  })

  it('extClass 追加', () => {
    const wrapper = mount(WeuiSelect, { props: { extClass: 'my-select' } })
    expect(wrapper.classes()).toContain('my-select')
  })
})
