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

    it('H5 端上传按钮区域渲染原生 input[type=file]', () => {
      const wrapper = mount(WeuiUploader)
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.exists()).toBe(true)
      expect(fileInput.classes()).toContain('weui-uploader__input')
    })

    it('H5 端默认 accept=image 时 input accept=image/*', () => {
      const wrapper = mount(WeuiUploader)
      expect(wrapper.find('input[type="file"]').attributes('accept')).toBe('image/*')
    })

    it('H5 端 accept=file 时 input 不带 accept 属性', () => {
      const wrapper = mount(WeuiUploader, { props: { accept: 'file' } })
      expect(wrapper.find('input[type="file"]').attributes('accept')).toBeUndefined()
    })

    it('H5 端 count>1 时 input 带 multiple 属性', () => {
      const wrapper = mount(WeuiUploader, { props: { count: 9 } })
      expect(wrapper.find('input[type="file"]').attributes('multiple')).toBeDefined()
    })

    it('H5 端 count=1 时 input 不带 multiple 属性', () => {
      const wrapper = mount(WeuiUploader, { props: { count: 1 } })
      expect(wrapper.find('input[type="file"]').attributes('multiple')).toBeUndefined()
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
      const thumb = wrapper.find('.weui-uploader__file__thumb')
      expect((thumb.element as HTMLElement).style.backgroundImage).toContain('test.jpg')
    })

    it('使用官方缩略图结构', () => {
      const wrapper = mount(WeuiUploader, { props: { files: [{ url: 'test.jpg' }] } })
      expect(wrapper.find('.weui-uploader__file__thumb').exists()).toBe(true)
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

  describe('H5 端删除按钮', () => {
    it('H5 端每个文件渲染官方关闭图标删除按钮', () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      })
      expect(wrapper.findAll('.weui-uploader__file__delete')).toHaveLength(2)
      expect(wrapper.findAll('.weui-uploader__file__delete .weui-icon-close')).toHaveLength(2)
    })

    it('点击关闭图标触发 delete 事件并阻止冒泡', async () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      })
      const deleteBtns = wrapper.findAll('.weui-uploader__file__delete')
      await deleteBtns[0].trigger('click')
      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('delete')![0]).toEqual([{ url: 'a.jpg' }, 0])
      // 不应触发 preview（点击 × 不应冒泡到 file 的 click）
      expect(wrapper.emitted('preview')).toBeFalsy()
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

  describe('select 事件（H5 端）', () => {
    it('H5 端点击上传按钮触发 fileInput.click()', async () => {
      const wrapper = mount(WeuiUploader, { props: { count: 9 } })
      const fileInput = wrapper.find('input[type="file"]')
      // mockImplementation 阻止真实 click 触发 file picker
      const clickSpy = vi.spyOn(fileInput.element as HTMLElement, 'click').mockImplementation(() => {})
      await wrapper.find('.weui-uploader__input-box').trigger('click')
      expect(clickSpy).toHaveBeenCalledTimes(1)
    })

    it('H5 端 fileInput change 触发 select 事件并携带 tempFilePaths/tempFiles', async () => {
      // happy-dom 的 URL.createObjectURL 会校验 Blob 类型，mock 之
      const createObjectURLSpy = vi
        .spyOn(URL, 'createObjectURL')
        .mockReturnValue('blob:mock-url')
      const wrapper = mount(WeuiUploader, { props: { count: 9 } })
      const fileInput = wrapper.find('input[type="file"]')
      const mockFile = { name: 'a.jpg', size: 1024 } as unknown as File
      Object.defineProperty(fileInput.element, 'files', {
        value: [mockFile],
        configurable: true,
      })
      await fileInput.trigger('change')
      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')).toHaveLength(1)
      expect(wrapper.emitted('select')![0]).toEqual([
        expect.objectContaining({
          tempFilePaths: [expect.any(String)],
          tempFiles: [{ path: expect.any(String), size: 1024 }],
        }),
      ])
      expect(createObjectURLSpy).toHaveBeenCalledTimes(1)
      createObjectURLSpy.mockRestore()
    })

    it('H5 端 fileInput change 无文件时不触发 select', async () => {
      const wrapper = mount(WeuiUploader, { props: { count: 9 } })
      const fileInput = wrapper.find('input[type="file"]')
      Object.defineProperty(fileInput.element, 'files', {
        value: [],
        configurable: true,
      })
      await fileInput.trigger('change')
      expect(wrapper.emitted('select')).toBeFalsy()
    })
  })

  describe('exceed 事件（H5 端）', () => {
    it('H5 端 fileInput change 返回文件数超出 remaining 时触发 exceed', async () => {
      const wrapper = mount(WeuiUploader, {
        props: { count: 2, files: [{ url: 'a.jpg' }] },
      })
      const fileInput = wrapper.find('input[type="file"]')
      const mockFiles = [
        { name: 'b.jpg', size: 1024 },
        { name: 'c.jpg', size: 1024 },
      ] as unknown as File[]
      Object.defineProperty(fileInput.element, 'files', {
        value: mockFiles,
        configurable: true,
      })
      await fileInput.trigger('change')
      expect(wrapper.emitted('exceed')).toBeTruthy()
      expect(wrapper.emitted('exceed')![0]).toEqual([2])
      expect(wrapper.emitted('select')).toBeFalsy()
    })
  })

  describe('小程序端适配（非 H5）', () => {
    // 注：vitest 中 __IS_H5__ = true，无法直接测试非 H5 路径
    // 非 H5 路径由 build-plugin 在构建时处理，单元测试不覆盖
    // 此处仅验证 H5 端不调用 uni.chooseImage / uni.chooseFile
    it('H5 端点击上传按钮不调用 uni.chooseImage/uni.chooseFile', async () => {
      const wrapper = mount(WeuiUploader, { props: { count: 9 } })
      const fileInput = wrapper.find('input[type="file"]')
      vi.spyOn(fileInput.element as HTMLElement, 'click').mockImplementation(() => {})
      await wrapper.find('.weui-uploader__input-box').trigger('click')
      expect(mockChooseImage).not.toHaveBeenCalled()
      expect(mockChooseFile).not.toHaveBeenCalled()
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
    it('H5 端通过关闭图标触发 delete', async () => {
      const wrapper = mount(WeuiUploader, {
        props: { files: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      })
      const deleteBtns = wrapper.findAll('.weui-uploader__file__delete')
      await deleteBtns[1].trigger('click')
      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('delete')![0]).toEqual([{ url: 'b.jpg' }, 1])
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
