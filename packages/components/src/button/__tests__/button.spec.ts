import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiButton from '../button.vue'

describe('WeuiButton', () => {
  describe('type', () => {
    it('默认渲染 default 类型按钮', () => {
      const wrapper = mount(WeuiButton, { slots: { default: '按钮' } })
      expect(wrapper.classes()).toContain('weui-btn')
      expect(wrapper.classes()).toContain('weui-btn_default')
      expect(wrapper.text()).toBe('按钮')
    })

    it('primary 类型', () => {
      const wrapper = mount(WeuiButton, { props: { type: 'primary' } })
      expect(wrapper.classes()).toContain('weui-btn_primary')
    })

    it('warn 类型', () => {
      const wrapper = mount(WeuiButton, { props: { type: 'warn' } })
      expect(wrapper.classes()).toContain('weui-btn_warn')
    })
  })

  describe('size', () => {
    it('medium 尺寸', () => {
      const wrapper = mount(WeuiButton, { props: { size: 'medium' } })
      expect(wrapper.classes()).toContain('weui-btn_medium')
    })

    it('mini 尺寸', () => {
      const wrapper = mount(WeuiButton, { props: { size: 'mini' } })
      expect(wrapper.classes()).toContain('weui-btn_mini')
    })

    it('xmini 尺寸', () => {
      const wrapper = mount(WeuiButton, { props: { size: 'xmini' } })
      expect(wrapper.classes()).toContain('weui-btn_xmini')
    })

    it('default 尺寸不添加额外类名', () => {
      const wrapper = mount(WeuiButton, { props: { size: 'default' } })
      expect(wrapper.classes()).not.toContain('weui-btn_medium')
      expect(wrapper.classes()).not.toContain('weui-btn_mini')
      expect(wrapper.classes()).not.toContain('weui-btn_xmini')
    })
  })

  describe('display', () => {
    it('block 模式添加 weui-btn_block', () => {
      const wrapper = mount(WeuiButton, { props: { display: 'block' } })
      expect(wrapper.classes()).toContain('weui-btn_block')
    })

    it('inline 模式添加 weui-btn_inline', () => {
      const wrapper = mount(WeuiButton, { props: { display: 'inline' } })
      expect(wrapper.classes()).toContain('weui-btn_inline')
    })

    it('不指定 display 时不添加 display 类名', () => {
      const wrapper = mount(WeuiButton)
      expect(wrapper.classes()).not.toContain('weui-btn_block')
      expect(wrapper.classes()).not.toContain('weui-btn_inline')
    })
  })

  describe('disabled', () => {
    it('disabled 添加 weui-btn_disabled 类名和 disabled 属性', () => {
      const wrapper = mount(WeuiButton, { props: { disabled: true } })
      expect(wrapper.classes()).toContain('weui-btn_disabled')
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('disabled 时点击不触发 click', () => {
      const onClick = vi.fn()
      const wrapper = mount(WeuiButton, {
        props: { disabled: true },
        attrs: { onClick },
      })
      wrapper.trigger('click')
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('loading', () => {
    it('loading 添加 weui-btn_loading 类名', () => {
      const wrapper = mount(WeuiButton, { props: { loading: true } })
      expect(wrapper.classes()).toContain('weui-btn_loading')
    })

    it('loading 渲染官方 mask loading 图标', () => {
      const wrapper = mount(WeuiButton, { props: { loading: true } })
      expect(wrapper.find('.weui-mask-loading').exists()).toBe(true)
      expect(wrapper.find('.weui-mask-loading_only').exists()).toBe(true)
    })

    it('非 loading 时不渲染加载图标', () => {
      const wrapper = mount(WeuiButton, { props: { loading: false } })
      expect(wrapper.find('.weui-mask-loading').exists()).toBe(false)
    })
  })

  describe('overlay', () => {
    it('overlay 添加 weui-btn_overlay 类名', () => {
      const wrapper = mount(WeuiButton, { props: { overlay: true } })
      expect(wrapper.classes()).toContain('weui-btn_overlay')
    })
  })

  describe('icon', () => {
    it('行按钮的 icon 渲染 image 元素', () => {
      const wrapper = mount(WeuiButton, {
        props: { cell: true, icon: '/assets/icon.png' },
      })
      expect(wrapper.find('img.weui-btn_cell__icon').exists()).toBe(true)
      expect(wrapper.find('img.weui-btn_cell__icon').attributes('src')).toBe(
        '/assets/icon.png',
      )
    })

    it('无 icon 时不渲染 image', () => {
      const wrapper = mount(WeuiButton)
      expect(wrapper.find('.weui-btn_cell__icon').exists()).toBe(false)
    })
  })

  describe('openType', () => {
    it('H5 不渲染小程序专属 open-type 属性', () => {
      const wrapper = mount(WeuiButton, {
        props: { openType: 'share' },
      })
      expect(wrapper.attributes('open-type')).toBeUndefined()
    })

    it('无 openType 时不渲染 open-type 属性', () => {
      const wrapper = mount(WeuiButton)
      expect(wrapper.attributes('open-type')).toBeUndefined()
    })
  })

  describe('cell 模式', () => {
    it('cell 添加 weui-btn_cell 和 weui-btn_cell-{type} 类名', () => {
      const wrapper = mount(WeuiButton, {
        props: { cell: true, type: 'primary' },
      })
      expect(wrapper.classes()).toContain('weui-btn_cell')
      expect(wrapper.classes()).toContain('weui-btn_cell-primary')
    })

    it('cell 模式下 icon 渲染 image 元素', () => {
      const wrapper = mount(WeuiButton, {
        props: { cell: true, icon: '/assets/icon.png' },
      })
      expect(wrapper.find('img.weui-btn_cell__icon').exists()).toBe(true)
    })

    it('cell 模式下 disabled 添加 weui-btn_disabled', () => {
      const wrapper = mount(WeuiButton, {
        props: { cell: true, disabled: true },
      })
      expect(wrapper.classes()).toContain('weui-btn_disabled')
    })
  })

  describe('vcode 模式', () => {
    it('vcode 使用 weui-vcode-btn 类名', () => {
      const wrapper = mount(WeuiButton, {
        props: { vcode: true },
        slots: { default: '获取验证码' },
      })
      expect(wrapper.classes()).toContain('weui-vcode-btn')
      expect(wrapper.text()).toBe('获取验证码')
    })

    it('vcode 模式下 disabled 设置 disabled 属性', () => {
      const wrapper = mount(WeuiButton, {
        props: { vcode: true, disabled: true },
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })
  })

  describe('click 事件', () => {
    it('未禁用时触发 click', () => {
      const onClick = vi.fn()
      const wrapper = mount(WeuiButton, { attrs: { onClick } })
      wrapper.trigger('click')
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('外部样式', () => {
    it('将 extClass、class 和 style 绑定到原生 button', () => {
      const wrapper = mount(WeuiButton, {
        props: { extClass: 'submit-button' },
        attrs: { class: 'page-action', style: 'margin-top: 40px' },
      })

      expect(wrapper.classes()).toContain('submit-button')
      expect(wrapper.classes()).toContain('page-action')
      expect(wrapper.attributes('style')).toContain('margin-top: 40px')
    })
  })
})
