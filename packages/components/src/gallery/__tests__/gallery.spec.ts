import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiGallery from '../gallery.vue'
import { Gallery } from '../gallery'
import { setOverlayHost } from '../../utils/overlay-host-ref'
import { overlayManager } from '../../utils/overlay'

// mock uni.previewImage（gallery 非 H5 端调用）
const mockPreviewImage = vi.fn()
vi.stubGlobal('uni', {
  previewImage: mockPreviewImage,
})

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
    it('渲染官方背景图节点并设置 background-image', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'test.jpg' },
      })
      const image = wrapper.find('.weui-gallery__img')
      expect(image.exists()).toBe(true)
      expect(image.element.tagName).toBe('SPAN')
      expect(image.attributes('style')).toContain('test.jpg')
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
    it('默认删除按钮使用官方删除图标并设置无障碍标签', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', showDelete: true },
      })
      const del = wrapper.find('.weui-gallery__del')
      expect(del.attributes('aria-label')).toBe('删除')
      expect(del.find('i.weui-icon-delete.weui-icon_gallery-delete').exists()).toBe(true)
    })

    it('自定义删除按钮无障碍标签', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', showDelete: true, deleteText: '移除' },
      })
      expect(wrapper.find('.weui-gallery__del').attributes('aria-label')).toBe('移除')
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

  describe('zIndex', () => {
    it('设置 z-index 样式', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', zIndex: 1234 },
      })
      const style = wrapper.find('.weui-gallery').attributes('style') || ''
      expect(style).toContain('z-index: 1234')
    })

    it('未设置 zIndex 时不输出 z-index 样式', () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg' },
      })
      const style = wrapper.find('.weui-gallery').attributes('style') || ''
      expect(style).not.toContain('z-index')
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

  describe('weui-close 事件', () => {
    it('点击遮罩触发 weui-close', async () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg' },
      })
      await wrapper.find('.weui-gallery').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('点击删除按钮不触发 weui-close', async () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', showDelete: true },
      })
      await wrapper.find('.weui-gallery__del').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeFalsy()
    })

    it('maskClosable=false 时点击遮罩不触发 weui-close', async () => {
      const wrapper = mount(WeuiGallery, {
        props: { visible: true, src: 'a.jpg', maskClosable: false },
      })
      await wrapper.find('.weui-gallery').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeFalsy()
      expect(wrapper.emitted('hide')).toBeFalsy()
      expect(wrapper.emitted('update:visible')).toBeFalsy()
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

  describe('小程序端适配（非 H5）', () => {
    // 注：vitest 中 __IS_H5__ = true，无法直接测试非 H5 路径
    // 非 H5 路径由 build-plugin 在构建时处理，单元测试不覆盖
    // 此处仅验证 H5 端不调用 uni.previewImage
    it('H5 端 visible=true 时不调用 uni.previewImage', async () => {
      mockPreviewImage.mockReset()
      const wrapper = mount(WeuiGallery, {
        props: { visible: false, src: 'test.jpg' },
      })
      await wrapper.setProps({ visible: true })
      expect(mockPreviewImage).not.toHaveBeenCalled()
    })
  })
})

describe('Gallery 命令式 API', () => {
  // mock overlay-host
  const addedItems: { component: unknown; props: Record<string, unknown> }[] = []
  const removeSpy = vi.fn()
  const mockHost = {
    add: (component: unknown, props: Record<string, unknown> = {}) => {
      addedItems.push({ component, props })
      return { id: addedItems.length, zIndex: 1000 + addedItems.length - 1 }
    },
    remove: removeSpy,
  }

  beforeEach(() => {
    addedItems.length = 0
    removeSpy.mockClear()
    overlayManager.reset()
    setOverlayHost(mockHost)
  })

  afterEach(() => {
    setOverlayHost(null)
  })

  describe('Gallery.show', () => {
    it('调用 overlay-host.add 添加 Gallery 组件', () => {
      Gallery.show({ src: 'a.jpg', showDelete: true })
      expect(addedItems).toHaveLength(1)
      expect(addedItems[0].props.visible).toBe(true)
      expect(addedItems[0].props.src).toBe('a.jpg')
      expect(addedItems[0].props.showDelete).toBe(true)
    })

    it('默认 showDelete 为 false', () => {
      Gallery.show({ src: 'a.jpg' })
      expect(addedItems[0].props.showDelete).toBe(false)
    })

    it('默认 deleteText 为 "删除"', () => {
      Gallery.show({ src: 'a.jpg' })
      expect(addedItems[0].props.deleteText).toBe('删除')
    })

    it('自定义 deleteText', () => {
      Gallery.show({ src: 'a.jpg', deleteText: '移除' })
      expect(addedItems[0].props.deleteText).toBe('移除')
    })

    it('默认 maskClosable 为 true', () => {
      Gallery.show({ src: 'a.jpg' })
      expect(addedItems[0].props.maskClosable).toBe(true)
    })

    it('maskClosable=false 时透传', () => {
      Gallery.show({ src: 'a.jpg', maskClosable: false })
      expect(addedItems[0].props.maskClosable).toBe(false)
    })

    it('透传 extClass', () => {
      Gallery.show({ src: 'a.jpg', extClass: 'my-gallery' })
      expect(addedItems[0].props.extClass).toBe('my-gallery')
    })

    it('点击删除按钮 resolve("delete")', async () => {
      const { promise } = Gallery.show({ src: 'a.jpg', showDelete: true })
      const onDelete = addedItems[0].props.onDelete as () => void
      onDelete()
      await expect(promise).resolves.toBe('delete')
    })

    it('点击遮罩 resolve("hide")', async () => {
      const { promise } = Gallery.show({ src: 'a.jpg' })
      const onHide = addedItems[0].props.onHide as () => void
      onHide()
      await expect(promise).resolves.toBe('hide')
    })

    it('close 调用 host.remove(id)', () => {
      const { close } = Gallery.show({ src: 'a.jpg' })
      close()
      expect(removeSpy).toHaveBeenCalledWith(1)
    })

    it('多次 show 分配递增 id', () => {
      const { close: close1 } = Gallery.show({ src: 'a.jpg' })
      const { close: close2 } = Gallery.show({ src: 'b.jpg' })
      close1()
      expect(removeSpy).toHaveBeenLastCalledWith(1)
      close2()
      expect(removeSpy).toHaveBeenLastCalledWith(2)
    })
  })

  describe('未挂载 overlay-host', () => {
    it('getOverlayHost 为 null 时不抛错', () => {
      setOverlayHost(null)
      expect(() => Gallery.show({ src: 'a.jpg' })).not.toThrow()
    })

    it('返回 noop close 和 resolve("hide") 的 promise', async () => {
      setOverlayHost(null)
      const { close, promise } = Gallery.show({ src: 'a.jpg' })
      expect(() => close()).not.toThrow()
      await expect(promise).resolves.toBe('hide')
    })
  })
})
