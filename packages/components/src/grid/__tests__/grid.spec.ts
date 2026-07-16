import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiGrid from '../grid.vue'
import WeuiGridItem from '../grid-item.vue'

// mock uni API
const mockNavigateTo = vi.fn()
vi.stubGlobal('uni', {
  navigateTo: mockNavigateTo,
})

describe('WeuiGrid', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-grids 类', () => {
      const wrapper = mount(WeuiGrid)
      expect(wrapper.classes()).toContain('weui-grids')
    })

    it('不传 extClass 时仅含 weui-grids 类', () => {
      const wrapper = mount(WeuiGrid)
      expect(wrapper.classes()).toEqual(['weui-grids'])
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiGrid, {
        props: { extClass: 'my-grids' },
      })
      expect(wrapper.classes()).toContain('my-grids')
    })
  })

  describe('默认插槽', () => {
    it('渲染默认插槽内容', () => {
      const wrapper = mount(WeuiGrid, {
        slots: { default: '<view class="grid-item">item</view>' },
      })
      expect(wrapper.html()).toContain('grid-item')
    })
  })
})

describe('WeuiGridItem', () => {
  beforeEach(() => {
    mockNavigateTo.mockReset()
  })

  describe('基础渲染', () => {
    it('根元素带 weui-grid 类', () => {
      const wrapper = mount(WeuiGridItem, { props: { label: 'G' } })
      expect(wrapper.classes()).toContain('weui-grid')
    })

    it('根元素带 weui-grid_active 按下态', () => {
      const wrapper = mount(WeuiGridItem, { props: { label: 'G' } })
      expect(wrapper.attributes('hover-class')).toBe('weui-grid_active')
    })
  })

  describe('icon', () => {
    it('渲染 image 图标', () => {
      const wrapper = mount(WeuiGridItem, {
        props: { icon: '/static/icon.png', label: 'G' },
      })
      const img = wrapper.find('.weui-grid__icon image')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('/static/icon.png')
    })

    it('icon 为空时使用 icon slot', () => {
      const wrapper = mount(WeuiGridItem, {
        props: { label: 'G' },
        slots: { icon: '自定义图标' },
      })
      expect(wrapper.find('.weui-grid__icon').text()).toContain('自定义图标')
    })

    it('icon 和 icon slot 均为空时不渲染图标区域', () => {
      const wrapper = mount(WeuiGridItem, { props: { label: 'G' } })
      expect(wrapper.find('.weui-grid__icon').exists()).toBe(false)
    })
  })

  describe('label', () => {
    it('渲染文字标签', () => {
      const wrapper = mount(WeuiGridItem, { props: { label: '功能入口' } })
      expect(wrapper.find('.weui-grid__label').text()).toBe('功能入口')
    })

    it('label 为空时使用 label slot', () => {
      const wrapper = mount(WeuiGridItem, {
        slots: { label: '自定义标签' },
      })
      expect(wrapper.find('.weui-grid__label').text()).toBe('自定义标签')
    })

    it('label 和 label slot 均为空时不渲染标签区域', () => {
      const wrapper = mount(WeuiGridItem, {
        props: { icon: '/static/icon.png' },
      })
      expect(wrapper.find('.weui-grid__label').exists()).toBe(false)
    })
  })

  describe('默认插槽', () => {
    it('默认插槽替代 icon + label', () => {
      const wrapper = mount(WeuiGridItem, {
        props: { icon: '/static/icon.png', label: 'G' },
        slots: { default: '<view class="custom-content">自定义</view>' },
      })
      expect(wrapper.find('.weui-grid__icon').exists()).toBe(false)
      expect(wrapper.find('.weui-grid__label').exists()).toBe(false)
      expect(wrapper.find('.custom-content').exists()).toBe(true)
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiGridItem, {
        props: { extClass: 'my-grid-item', label: 'G' },
      })
      expect(wrapper.classes()).toContain('my-grid-item')
    })
  })

  describe('事件', () => {
    it('点击时触发 click 事件', async () => {
      const wrapper = mount(WeuiGridItem, { props: { label: 'G' } })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('url 不为空时调用 uni.navigateTo', async () => {
      const wrapper = mount(WeuiGridItem, {
        props: { url: '/pages/detail/detail', label: 'G' },
      })
      await wrapper.trigger('click')
      expect(mockNavigateTo).toHaveBeenCalledWith(
        expect.objectContaining({ url: '/pages/detail/detail' }),
      )
    })

    it('url 为空时不调用 uni.navigateTo', async () => {
      const wrapper = mount(WeuiGridItem, { props: { label: 'G' } })
      await wrapper.trigger('click')
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })
  })
})
