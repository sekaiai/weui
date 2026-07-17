import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiUploader from '../uploader.vue'
import type { UploaderFile } from '../uploader.vue'

// mock uni API
const mockChooseImage = vi.fn()
const mockChooseFile = vi.fn()
vi.stubGlobal('uni', {
  chooseImage: mockChooseImage,
  chooseFile: mockChooseFile,
})

describe('WeuiUploader', () => {
  beforeEach(() => {
    mockChooseImage.mockReset()
    mockChooseFile.mockReset()
  })

  describe('基础渲染', () => {
    it('根元素带 weui-uploader 类', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.classes()).toContain('weui-uploader')
    })

    it('不传 extClass 时根元素仅含 weui-uploader 类', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.classes()).toEqual(['weui-uploader'])
    })

    it('包含 weui-uploader__bd 主体区域', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('.weui-uploader__bd').exists()).toBe(true)
    })

    it('包含 weui-uploader__files 文件列表容器', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('.weui-uploader__files').exists()).toBe(true)
    })

    it('包含 weui-uploader__input-box 上传按钮区域', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('.weui-uploader__input-box').exists()).toBe(true)
    })

    it('上传按钮区域不再渲染原生 input', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('input').exists()).toBe(false)
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiUploader, { props: { extClass: 'my-uploader' } })
      expect(wrapper.classes()).toContain('my-uploader')
    })
  })

  describe('showHeader', () => {
    it('默认显示头部', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('.weui-uploader__hd').exists()).toBe(true)
    })

    it('showHeader=false 时不渲染头部', () => {
      const wrapper = mount(WeuiUploader, { props: { showHeader: false } })
      expect(wrapper.find('.weui-uploader__hd').exists()).toBe(false)
    })
  })

  describe('title', () => {
    it('传入 title 时渲染 .weui-uploader__title', () => {
      const wrapper = mount(WeuiUploader, { props: { title: '图片上传' } })
      expect(wrapper.find('.weui-uploader__title').exists()).toBe(true)
      expect(wrapper.find('.weui-uploader__title').text()).toBe('图片上传')
    })

    it('不传 title 时不渲染 .weui-uploader__title', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('.weui-uploader__title').exists()).toBe(false)
    })
  })

  describe('info 计数', () => {
    it('默认显示 0/9', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('.weui-uploader__info').text()).toBe('0/9')
    })

    it('根据 files 长度和 count 更新计数', () => {
      const wrapper = mount(WeuiUploader, {
        props: {
          count: 5,
          files: [{ url: 'a.jpg' }, { url: 'b.jpg' }],
        },
      })
      expect(wrapper.find('.weui-uploader__info').text()).toBe('2/5')
    })
  })

  describe('files 文件列表', () => {
    it('渲染每个文件为 .weui-uploader__file', () => {
      const wrapper = mount(WeuiUploader, {
        props: {
          files: [{ url: 'a.jpg' }, { url: 'b.jpg' }, { url: 'c.jpg' }],
        },
      })
      expect(wrapper.findAll('.weui-uploader__file')).toHaveLength(3)
    })

    it('文件背景图设置为 file.url', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'test.jpg' }] },
      })
      const fileEl = wrapper.find('.weui-uploader__file')
      expect((fileEl.element as HTMLElement).style.backgroundImage).toContain('test.jpg')
    })

    it('status 为 loading 时添加 weui-uploader__file_status 类', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg', status: 'loading' }] },
      })
      expect(wrapper.find('.weui-uploader__file').classes()).toContain('weui-uploader__file_status')
    })

    it('status 为 error 时添加 weui-uploader__file_status 类', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg', status: 'error' }] },
      })
      expect(wrapper.find('.weui-uploader__file').classes()).toContain('weui-uploader__file_status')
    })

    it('status 为 success 时不添加 weui-uploader__file_status 类', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg', status: 'success' }] },
      })
      expect(wrapper.find('.weui-uploader__file').classes()).not.toContain('weui-uploader__file_status')
    })

    it('无 status 时不添加 weui-uploader__file_status 类', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg' }] },
      })
      expect(wrapper.find('.weui-uploader__file').classes()).not.toContain('weui-uploader__file_status')
    })

    it('loading 状态默认显示"上传中"文字', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg', status: 'loading' }] },
      })
      expect(wrapper.find('.weui-uploader__file-content').text()).toBe('上传中')
    })

    it('error 状态默认显示"上传失败"文字', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg', status: 'error' }] },
      })
      expect(wrapper.find('.weui-uploader__file-content').text()).toBe('上传失败')
    })

    it('statusText 自定义状态文字', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg', status: 'loading', statusText: '50%' }] },
      })
      expect(wrapper.find('.weui-uploader__file-content').text()).toBe('50%')
    })

    it('success 状态不渲染 .weui-uploader__file-content', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg', status: 'success' }] },
      })
      expect(wrapper.find('.weui-uploader__file-content').exists()).toBe(false)
    })
  })

  describe('count 与上传按钮', () => {
    it('files 未达上限时显示上传按钮', () => {
      const wrapper = mount(WeuiUploader, {
        props: { count: 3, files: [{ url: 'a.jpg' }] },
      })
      expect(wrapper.find('.weui-uploader__input-box').exists()).toBe(true)
    })

    it('files 达到上限时隐藏上传按钮', () => {
      const wrapper = mount(WeuiUploader, {
        props: { count: 2, files: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      })
      expect(wrapper.find('.weui-uploader__input-box').exists()).toBe(false)
    })

    it('默认 count 为 9', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('.weui-uploader__input-box').exists()).toBe(true)
    })
  })

  describe('tips', () => {
    it('传入 tips 时渲染提示文字', () => {
      const wrapper = mount(WeuiUploader, { props: { tips: '最多上传9张图片' } })
      expect(wrapper.find('.weui-uploader__tips').exists()).toBe(true)
      expect(wrapper.find('.weui-uploader__tips').text()).toBe('最多上传9张图片')
    })

    it('不传 tips 时不渲染提示区域', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('.weui-uploader__tips').exists()).toBe(false)
    })
  })

  describe('select 事件', () => {
    it('点击上传按钮调用 uni.chooseImage', async () => {
      mockChooseImage.mockImplementation(({ success }: any) =>
        success?.({ tempFilePaths: ['a.jpg'] }),
      )
      const wrapper = mount(WeuiUploader, { props: { count: 9 } })
      await wrapper.find('.weui-uploader__input-box').trigger('click')
      expect(mockChooseImage).toHaveBeenCalledWith(
        expect.objectContaining({ count: 9 }),
      )
    })

    it('chooseImage success 回调触发 select 事件并携带 tempFilePaths', async () => {
      mockChooseImage.mockImplementation(({ success }: any) =>
        success?.({ tempFilePaths: ['a.jpg', 'b.jpg'] }),
      )
      const wrapper = mount(WeuiUploader, { props: { count: 9 } })
      await wrapper.find('.weui-uploader__input-box').trigger('click')
      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')).toHaveLength(1)
      expect(wrapper.emitted('select')![0]).toEqual([
        { tempFilePaths: ['a.jpg', 'b.jpg'], tempFiles: undefined },
      ])
    })

    it('accept=file 时调用 uni.chooseFile', async () => {
      mockChooseFile.mockImplementation(({ success }: any) =>
        success?.({ tempFilePaths: ['a.pdf'] }),
      )
      const wrapper = mount(WeuiUploader, {
        props: { count: 9, accept: 'file' },
      })
      await wrapper.find('.weui-uploader__input-box').trigger('click')
      expect(mockChooseFile).toHaveBeenCalledWith(
        expect.objectContaining({ count: 9 }),
      )
      expect(mockChooseImage).not.toHaveBeenCalled()
      expect(wrapper.emitted('select')).toBeTruthy()
    })

    it('chooseImage fail 回调触发 select-fail 事件', async () => {
      mockChooseImage.mockImplementation(({ fail }: any) =>
        fail?.({ errMsg: 'chooseImage:fail cancel' }),
      )
      const wrapper = mount(WeuiUploader, { props: { count: 9 } })
      await wrapper.find('.weui-uploader__input-box').trigger('click')
      expect(wrapper.emitted('select-fail')).toBeTruthy()
      expect(wrapper.emitted('select-fail')![0]).toEqual([
        { errMsg: 'chooseImage:fail cancel' },
      ])
      expect(wrapper.emitted('select')).toBeFalsy()
    })

    it('剩余数量不足时传入正确的 count', async () => {
      mockChooseImage.mockImplementation(({ success }: any) =>
        success?.({ tempFilePaths: ['c.jpg'] }),
      )
      const wrapper = mount(WeuiUploader, {
        props: { count: 3, files: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      })
      await wrapper.find('.weui-uploader__input-box').trigger('click')
      expect(mockChooseImage).toHaveBeenCalledWith(
        expect.objectContaining({ count: 1 }),
      )
    })
  })

  describe('exceed 事件', () => {
    it('chooseImage 返回文件数超出最大数量时触发 exceed 并携带 count', async () => {
      mockChooseImage.mockImplementation(({ success }: any) =>
        success?.({ tempFilePaths: ['b.jpg', 'c.jpg'] }),
      )
      const wrapper = mount(WeuiUploader, {
        props: { count: 2, files: [{ url: 'a.jpg' }] },
      })
      await wrapper.find('.weui-uploader__input-box').trigger('click')
      expect(wrapper.emitted('exceed')).toBeTruthy()
      expect(wrapper.emitted('exceed')![0]).toEqual([2])
      expect(wrapper.emitted('select')).toBeFalsy()
    })
  })

  describe('preview 事件', () => {
    it('点击文件时触发 preview 并携带 file 和 index', async () => {
      const file: UploaderFile = { url: 'a.jpg' }
      const wrapper = mount(WeuiUploader, {
        props: { files: [file, { url: 'b.jpg' }] },
      })
      const files = wrapper.findAll('.weui-uploader__file')
      await files[1].trigger('click')
      expect(wrapper.emitted('preview')).toBeTruthy()
      expect(wrapper.emitted('preview')![0]).toEqual([{ url: 'b.jpg' }, 1])
    })
  })

  describe('delete 事件', () => {
    it('长按文件时触发 delete 并携带 file 和 index', async () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      })
      const files = wrapper.findAll('.weui-uploader__file')
      await files[0].trigger('longpress')
      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('delete')![0]).toEqual([{ url: 'a.jpg' }, 0])
    })
  })

  describe('slots', () => {
    it('支持 default slot 自定义内容', () => {
      const wrapper = mount(WeuiUploader, {
        slots: { default: '<view class="custom-content">自定义</view>' },
      })
      expect(wrapper.find('.custom-content').exists()).toBe(true)
    })
  })
})
