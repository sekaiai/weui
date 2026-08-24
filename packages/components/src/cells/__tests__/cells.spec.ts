import { createApp } from 'vue'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiCells from '../cells.vue'
import { WeuiCells as InstalledCells } from '../index'
import WeuiDesignVue from '../../index'

describe('WeuiCells', () => {
  it('为 Cells 系列组件提供全局安装能力', () => {
    const app = createApp({})

    InstalledCells.install?.(app)

    expect(app.component('WeuiCells')).toBe(InstalledCells)
  })

  it('通过组件包根插件注册 Cells 系列组件', () => {
    const app = createApp({})
    app.use(WeuiDesignVue)

    expect(app.component('WeuiCells')).toBe(InstalledCells)
  })

  it('默认只渲染 weui-cells 基础类', () => {
    const wrapper = mount(WeuiCells)
    expect(wrapper.find('.weui-cells').classes()).toEqual(['weui-cells'])
  })

  it('通过语义 props 追加 modifier classes', () => {
    const wrapper = mount(WeuiCells, {
      props: { form: true, radio: true, checkbox: true, afterTitle: true },
    })

    expect(wrapper.find('.weui-cells').classes()).toEqual([
      'weui-cells',
      'weui-cells_form',
      'weui-cells_radio',
      'weui-cells_checkbox',
      'weui-cells_after-title',
    ])
  })

  it('title prop 渲染标题区域', () => {
    const wrapper = mount(WeuiCells, { props: { title: '列表标题' } })
    expect(wrapper.find('.weui-cells__title').text()).toBe('列表标题')
  })

  it('title slot 覆盖 title prop', () => {
    const wrapper = mount(WeuiCells, {
      props: { title: '默认标题' },
      slots: { title: '<span class="custom-title">自定义标题</span>' },
    })
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  it('tips prop 渲染底部提示区域', () => {
    const wrapper = mount(WeuiCells, { props: { tips: '底部提示' } })
    expect(wrapper.find('.weui-cells__tips').text()).toBe('底部提示')
  })

  it('tips slot 覆盖 tips prop', () => {
    const wrapper = mount(WeuiCells, {
      props: { tips: '默认提示' },
      slots: { tips: '<span class="custom-tips">自定义提示</span>' },
    })
    expect(wrapper.find('.custom-tips').text()).toBe('自定义提示')
  })

  it('没有 title/tips 时不渲染空区域', () => {
    const wrapper = mount(WeuiCells)
    expect(wrapper.find('.weui-cells__title').exists()).toBe(false)
    expect(wrapper.find('.weui-cells__tips').exists()).toBe(false)
  })

  it('保留业务自定义 extClass', () => {
    const wrapper = mount(WeuiCells, {
      props: { form: true, extClass: 'my-cells' },
    })

    expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_form')
    expect(wrapper.find('.weui-cells').classes()).toContain('my-cells')
  })

  it('渲染默认插槽内容', () => {
    const wrapper = mount(WeuiCells, {
      slots: { default: '<div class="cell-item">内容</div>' },
    })

    expect(wrapper.find('.cell-item').exists()).toBe(true)
  })
})
