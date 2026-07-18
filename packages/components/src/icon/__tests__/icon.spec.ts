import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiIcon from '../icon.vue'

describe('WeuiIcon', () => {
  describe('根元素', () => {
    it('根元素为 span', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'success' } })
      expect(wrapper.element.tagName.toLowerCase()).toBe('span')
    })
  })

  describe('type 类名映射', () => {
    it('type=success 渲染 weui-icon-success', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'success' } })
      expect(wrapper.classes()).toContain('weui-icon-success')
    })

    it('type=success-no-circle 渲染 weui-icon-success-no-circle', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'success-no-circle' } })
      expect(wrapper.classes()).toContain('weui-icon-success-no-circle')
    })

    it('type=info 渲染 weui-icon-info', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'info' } })
      expect(wrapper.classes()).toContain('weui-icon-info')
    })

    it('type=info-circle 渲染 weui-icon-info-circle', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'info-circle' } })
      expect(wrapper.classes()).toContain('weui-icon-info-circle')
    })

    it('type=warn 渲染 weui-icon-warn', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'warn' } })
      expect(wrapper.classes()).toContain('weui-icon-warn')
    })

    it('type=waiting 渲染 weui-icon-waiting', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'waiting' } })
      expect(wrapper.classes()).toContain('weui-icon-waiting')
    })

    it('type=waiting-circle 渲染 weui-icon-waiting-circle', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'waiting-circle' } })
      expect(wrapper.classes()).toContain('weui-icon-waiting-circle')
    })

    it('type=cancel 渲染 weui-icon-cancel', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'cancel' } })
      expect(wrapper.classes()).toContain('weui-icon-cancel')
    })

    it('type=download 渲染 weui-icon-download', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'download' } })
      expect(wrapper.classes()).toContain('weui-icon-download')
    })

    it('type=search 渲染 weui-icon-search', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'search' } })
      expect(wrapper.classes()).toContain('weui-icon-search')
    })

    it('type=clear 渲染 weui-icon-clear', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'clear' } })
      expect(wrapper.classes()).toContain('weui-icon-clear')
    })

    it('type=back 渲染 weui-icon-back', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'back' } })
      expect(wrapper.classes()).toContain('weui-icon-back')
    })

    it('type=delete 渲染 weui-icon-delete', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'delete' } })
      expect(wrapper.classes()).toContain('weui-icon-delete')
    })
  })

  describe('size', () => {
    it('默认不传 size 时不输出 font-size，由 WeUI 默认样式决定', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'success' } })
      expect(wrapper.attributes('style') || '').not.toContain('font-size')
    })

    it('自定义 size 为 32，输出 font-size: 32px', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'success', size: 32 } })
      expect(wrapper.attributes('style')).toContain('font-size: 32px')
    })

    it('size 支持字符串类型', () => {
      const wrapper = mount(WeuiIcon, {
        props: { type: 'success', size: '16' },
      })
      expect(wrapper.attributes('style')).toContain('font-size: 16px')
    })
  })

  describe('color', () => {
    it('传入 color 输出到 style', () => {
      const wrapper = mount(WeuiIcon, {
        props: { type: 'success', color: '#07C160' },
      })
      expect(wrapper.attributes('style')).toContain('color: #07C160')
    })

    it('不传 color 时不输出 color 样式', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'success' } })
      expect(wrapper.attributes('style') || '').not.toContain('color:')
    })
  })

  describe('extClass', () => {
    it('传入 extClass 附加到根元素', () => {
      const wrapper = mount(WeuiIcon, {
        props: { type: 'success', extClass: 'weui-icon_msg' },
      })
      expect(wrapper.classes()).toContain('weui-icon-success')
      expect(wrapper.classes()).toContain('weui-icon_msg')
    })

    it('不传 extClass 时仅含 weui-icon-{type} 类', () => {
      const wrapper = mount(WeuiIcon, { props: { type: 'success' } })
      expect(wrapper.classes()).toEqual(['weui-icon-success'])
    })

    it('extClass 与 size 搭配使用', () => {
      const wrapper = mount(WeuiIcon, {
        props: { type: 'success', extClass: 'weui-icon_msg', size: 32 },
      })
      expect(wrapper.classes()).toContain('weui-icon_msg')
      expect(wrapper.attributes('style')).toContain('font-size: 32px')
    })
  })
})
