import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiGallery from '../gallery.vue'

describe('WeuiGallery', () => {
  describe('visible', () => {
    it('visible=false 时不渲染', () => {
      const wrapper = mount(WeuiGallery, { props: { visible: false } })
      expect(wrapper.find('.weui-gallery').exists()).toBe(false)
    })

    it('visible=true 时渲染画廊', () => {
      const wrapper = mount(WeuiGallery, { props: { visible: true, src: 'a.jpg' } })
      expect(wrapper.find('.weui-gallery').exists()).toBe(true)
    })
  })

  describe('src', () => {
    it('渲染 image 标签并设置 src', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'test.jpg' },
      })
      const img = wrapper.find('.weui-gallery__img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('test.jpg')
    })
  })

  describe('showDelete', () => {
    it('showDelete=false 时不渲染操作区', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', showDelete: false },
      })
      expect(wrapper.find('.weui-gallery__opr').exists()).toBe(false)
      expect(wrapper.find('.weui-gallery__del').exists()).toBe(false)
    })

    it('showDelete=true 时渲染删除按钮', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', showDelete: true },
      })
      expect(wrapper.find('.weui-gallery__opr').exists()).toBe(true)
      expect(wrapper.find('.weui-gallery__del').exists()).toBe(true)
    })
  })

  describe('deleteText', () => {
    it('默认删除按钮文字为"删除"', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', showDelete: true },
      })
      expect(wrapper.find('.weui-gallery__del').text()).toBe('删除')
    })

    it('自定义删除按钮文字', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', showDelete: true, deleteText: '移除' },
      })
      expect(wrapper.find('.weui-gallery__del').text()).toBe('移除')
    })
  })

  describe('extClass', () => {
    it('附加自定义类名到根元素', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', extClass: 'my-gallery' },
      })
      expect(wrapper.find('.weui-gallery').classes()).toContain('my-gallery')
    })
  })

  describe('事件', () => {
    it('点击画廊触发 update:visible(false) 和 hide', async () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg' },
      })
      await wrapper.find('.weui-gallery').trigger('click')
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
      expect(wrapper.emitted('hide')).toBeTruthy()
    })

    it('点击删除按钮触发 delete 事件但不关闭', async () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', showDelete: true },
      })
      await wrapper.find('.weui-gallery__del').trigger('click')
      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('update:visible')).toBeFalsy()
      expect(wrapper.emitted('hide')).toBeFalsy()
    })
  })

  describe('slots', () => {
    it('使用 default slot 替代默认删除按钮', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg' },
        slots: { default: '<view class="custom-opr">自定义操作</view>' },
      })
      expect(wrapper.find('.weui-gallery__opr').exists()).toBe(true)
      expect(wrapper.find('.custom-opr').exists()).toBe(true)
      expect(wrapper.find('.weui-gallery__del').exists()).toBe(false)
    })
  })
})
