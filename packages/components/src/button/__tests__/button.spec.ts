import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiButton from '../button.vue'

describe('WeuiButton', () => {
  it('默认渲染 default 类型按钮', () => {
    const wrapper = mount(WeuiButton, {
      slots: { default: '按钮' },
    })
    expect(wrapper.classes()).toContain('weui-btn')
    expect(wrapper.classes()).toContain('weui-btn_default')
    expect(wrapper.text()).toBe('按钮')
  })

  it('根据 type 渲染对应类名', () => {
    const types = ['primary', 'default', 'warn'] as const
    types.forEach((type) => {
      const wrapper = mount(WeuiButton, { props: { type } })
      expect(wrapper.classes()).toContain(`weui-btn_${type}`)
    })
  })

  it('disabled 时禁用点击并设置 disabled 属性', () => {
    const onClick = vi.fn()
    const wrapper = mount(WeuiButton, {
      props: { disabled: true },
      attrs: { onClick },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('未禁用时触发 click 事件', () => {
    const onClick = vi.fn()
    const wrapper = mount(WeuiButton, {
      attrs: { onClick },
    })
    wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
