import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiCell from '../cell.vue'

// mock uni API
const mockNavigateTo = vi.fn()
vi.stubGlobal('uni', {
  navigateTo: mockNavigateTo,
})

describe('WeuiCell', () => {
  beforeEach(() => {
    mockNavigateTo.mockReset()
  })

  describe('基础渲染', () => {
    it('根元素带 weui-cell 类', () => {
      const wrapper = mount(WeuiCell)
      expect(wrapper.classes()).toContain('weui-cell')
    })

    it('默认渲染 header/body/footer 三个区域', () => {
      const wrapper = mount(WeuiCell, {
        props: { title: 'T', value: 'V', footer: 'F' },
      })
      expect(wrapper.find('.weui-cell__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-cell__bd').exists()).toBe(true)
      expect(wrapper.find('.weui-cell__ft').exists()).toBe(true)
    })
  })

  describe('title', () => {
    it('渲染标题文字', () => {
      const wrapper = mount(WeuiCell, { props: { title: '标题文字' } })
      expect(wrapper.find('.weui-cell__hd').text()).toBe('标题文字')
    })

    it('title 为空时使用 title slot', () => {
      const wrapper = mount(WeuiCell, {
        slots: { title: '自定义标题' },
      })
      expect(wrapper.find('.weui-cell__hd').text()).toBe('自定义标题')
    })
  })

  describe('label', () => {
    it('在 __hd 渲染 label.weui-label', () => {
      const wrapper = mount(WeuiCell, { props: { label: '手机号' } })
      const label = wrapper.find('.weui-cell__hd .weui-label')
      expect(label.exists()).toBe(true)
      expect(label.element.tagName).toBe('LABEL')
      expect(label.text()).toBe('手机号')
    })
  })

  describe('subtitle', () => {
    it('在正文默认插槽标题下渲染副标题', () => {
      const wrapper = mount(WeuiCell, {
        props: { subtitle: '副标题' },
        slots: { default: '标题文字' },
      })
      expect(wrapper.find('.weui-cell__bd').text()).toContain('标题文字')
      expect(wrapper.find('.weui-cell__bd .weui-cell__desc').text()).toBe('副标题')
    })
  })

  describe('desc', () => {
    it('在 __ft 渲染说明文字', () => {
      const wrapper = mount(WeuiCell, { props: { desc: '说明文字' } })
      expect(wrapper.find('.weui-cell__ft').text()).toBe('说明文字')
    })
  })

  describe('value', () => {
    it('在 __ft 渲染说明文字', () => {
      const wrapper = mount(WeuiCell, { props: { value: '说明' } })
      expect(wrapper.find('.weui-cell__ft').text()).toBe('说明')
    })

    it('value 为空时使用默认 slot', () => {
      const wrapper = mount(WeuiCell, {
        slots: { default: '默认内容' },
      })
      expect(wrapper.find('.weui-cell__bd').text()).toBe('默认内容')
    })
  })

  describe('footer', () => {
    it('渲染 footer 文字', () => {
      const wrapper = mount(WeuiCell, { props: { footer: '说明' } })
      expect(wrapper.find('.weui-cell__ft').text()).toBe('说明')
    })

    it('footer 为空时使用 footer slot', () => {
      const wrapper = mount(WeuiCell, {
        slots: { footer: '自定义说明' },
      })
      expect(wrapper.find('.weui-cell__ft').text()).toBe('自定义说明')
    })
  })

  describe('icon', () => {
    it('渲染 image 图标', () => {
      const wrapper = mount(WeuiCell, {
        props: { icon: '/static/icon.png' },
      })
      const img = wrapper.find('.weui-cell__icon')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('/static/icon.png')
    })

    it('icon 为空时使用 icon slot', () => {
      const wrapper = mount(WeuiCell, {
        slots: { icon: '图标' },
      })
      expect(wrapper.find('.weui-cell__hd').text()).toContain('图标')
    })
  })

  describe('link', () => {
    it('link=true 追加 weui-cell_access 类', () => {
      const wrapper = mount(WeuiCell, { props: { link: true } })
      expect(wrapper.classes()).toContain('weui-cell_access')
    })

    it('link=true 时 footer 不追加 weui-cell__ft_in-access（access 模式靠父选择器接管）', () => {
      const wrapper = mount(WeuiCell, { props: { link: true } })
      expect(wrapper.find('.weui-cell__ft').classes()).not.toContain('weui-cell__ft_in-access')
    })

    it('link=false 时不追加 access 类', () => {
      const wrapper = mount(WeuiCell)
      expect(wrapper.classes()).not.toContain('weui-cell_access')
    })
  })

  describe('access', () => {
    it('access=true 追加 weui-cell_access 类', () => {
      const wrapper = mount(WeuiCell, { props: { access: true } })
      expect(wrapper.classes()).toContain('weui-cell_access')
    })
  })

  describe('vcode', () => {
    it('vcode=true 时 bd 追加 weui-flex 类', () => {
      const wrapper = mount(WeuiCell, { props: { vcode: true } })
      const bd = wrapper.find('.weui-cell__bd')
      expect(bd.classes()).toContain('weui-flex')
    })
  })

  describe('warn', () => {
    it('warn=true 追加 weui-cell_warn', () => {
      const wrapper = mount(WeuiCell, { props: { warn: true } })
      expect(wrapper.classes()).toContain('weui-cell_warn')
    })

    it('warn=false 不追加 weui-cell_warn', () => {
      const wrapper = mount(WeuiCell)
      expect(wrapper.classes()).not.toContain('weui-cell_warn')
    })
  })

  describe('uploader', () => {
    it('uploader=true 追加 weui-cell_uploader', () => {
      const wrapper = mount(WeuiCell, { props: { uploader: true } })
      expect(wrapper.classes()).toContain('weui-cell_uploader')
    })

    it('uploader=false 不追加 weui-cell_uploader', () => {
      const wrapper = mount(WeuiCell)
      expect(wrapper.classes()).not.toContain('weui-cell_uploader')
    })
  })

  describe('inline', () => {
    it('inline=true（默认）不追加 weui-cell_vertical', () => {
      const wrapper = mount(WeuiCell)
      expect(wrapper.classes()).not.toContain('weui-cell_vertical')
    })

    it('inline=false 追加 weui-cell_vertical', () => {
      const wrapper = mount(WeuiCell, { props: { inline: false } })
      expect(wrapper.classes()).toContain('weui-cell_vertical')
    })

    it('inline=false 不追加废弃的 weui-cell_label-block', () => {
      const wrapper = mount(WeuiCell, { props: { inline: false } })
      expect(wrapper.classes()).not.toContain('weui-cell_label-block')
    })
  })

  describe('isSwipe', () => {
    it('追加 weui-cell_swiped 类', () => {
      const wrapper = mount(WeuiCell, { props: { isSwipe: true } })
      expect(wrapper.classes()).toContain('weui-cell_swiped')
    })

    it('手势左滑超过30px展开', async () => {
      const wrapper = mount(WeuiCell, { props: { isSwipe: true } })
      const bd = wrapper.find('.weui-cell__bd')
      await bd.trigger('touchstart', { touches: [{ clientX: 200 }] })
      await bd.trigger('touchmove', { touches: [{ clientX: 150 }] })
      expect(bd.attributes('style')).toContain('translateX(-68px)')
    })

    it('isSwipe=false 时不追加 swiped 类', () => {
      const wrapper = mount(WeuiCell)
      expect(wrapper.classes()).not.toContain('weui-cell_swiped')
    })
  })

  describe('hasHeader/hasBody/hasFooter', () => {
    it('hasHeader=false 时不渲染 header', () => {
      const wrapper = mount(WeuiCell, {
        props: { hasHeader: false, title: 'T' },
      })
      expect(wrapper.find('.weui-cell__hd').exists()).toBe(false)
    })

    it('hasBody=false 时不渲染 body', () => {
      const wrapper = mount(WeuiCell, {
        props: { hasBody: false, value: 'V' },
      })
      expect(wrapper.find('.weui-cell__bd').exists()).toBe(false)
    })

    it('hasFooter=false 时不渲染 footer', () => {
      const wrapper = mount(WeuiCell, {
        props: { hasFooter: false, footer: 'F' },
      })
      expect(wrapper.find('.weui-cell__ft').exists()).toBe(false)
    })
  })

  describe('扩展类名', () => {
    it('extClass 追加到根元素', () => {
      const wrapper = mount(WeuiCell, { props: { extClass: 'my-cell' } })
      expect(wrapper.classes()).toContain('my-cell')
    })

    it('iconClass 追加到 header', () => {
      const wrapper = mount(WeuiCell, {
        props: { iconClass: 'my-hd', title: 'T' },
      })
      expect(wrapper.find('.weui-cell__hd').classes()).toContain('my-hd')
    })

    it('bodyClass 追加到 body', () => {
      const wrapper = mount(WeuiCell, {
        props: { bodyClass: 'my-bd', value: 'V' },
      })
      expect(wrapper.find('.weui-cell__bd').classes()).toContain('my-bd')
    })

    it('footerClass 追加到 footer', () => {
      const wrapper = mount(WeuiCell, { props: { footerClass: 'my-ft' } })
      expect(wrapper.find('.weui-cell__ft').classes()).toContain('my-ft')
    })
  })

  describe('ariaRole', () => {
    it('输出到 role 属性', () => {
      const wrapper = mount(WeuiCell, { props: { ariaRole: 'button' } })
      expect(wrapper.attributes('role')).toBe('button')
    })

    it('不输出到非法的 aria-role 属性', () => {
      const wrapper = mount(WeuiCell, { props: { ariaRole: 'button' } })
      expect(wrapper.attributes('aria-role')).toBeUndefined()
    })
  })

  describe('事件', () => {
    it('点击时触发 click 事件', async () => {
      const wrapper = mount(WeuiCell)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('点击 swipe 按钮触发 swipe-click', async () => {
      const wrapper = mount(WeuiCell, { props: { isSwipe: true, swipeText: '删除' } })
      await wrapper.find('.weui-swiped-btn').trigger('click')
      expect(wrapper.emitted('swipe-click')).toHaveLength(1)
    })

    it('link=true 且 url 不为空时调用 uni.navigateTo', async () => {
      mockNavigateTo.mockImplementation(({ success }: any) => success?.({ ok: true }))
      const wrapper = mount(WeuiCell, {
        props: { link: true, url: '/pages/detail' },
      })
      await wrapper.trigger('click')
      expect(mockNavigateTo).toHaveBeenCalledWith(
        expect.objectContaining({ url: '/pages/detail' }),
      )
    })

    it('navigateTo 成功时触发 navigate 事件', async () => {
      mockNavigateTo.mockImplementation(({ success }: any) => success?.({ ok: true }))
      const wrapper = mount(WeuiCell, {
        props: { link: true, url: '/pages/detail' },
      })
      await wrapper.trigger('click')
      // 测试环境未处理条件编译注释，H5 与非 H5 分支均会执行：
      // H5 分支直接 emit('navigate', { url })；
      // 非 H5 分支通过 navigateTo success 回调再次 emit('navigate', res)
      expect(wrapper.emitted('navigate')).toHaveLength(2)
    })

    it('navigateTo 失败时触发 navigate-error 事件', async () => {
      mockNavigateTo.mockImplementation(({ fail }: any) => fail?.(new Error('fail')))
      const wrapper = mount(WeuiCell, {
        props: { link: true, url: '/pages/detail' },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('navigate-error')).toHaveLength(1)
    })

    it('link=true 但 url 为空时不调用 navigateTo', async () => {
      const wrapper = mount(WeuiCell, { props: { link: true } })
      await wrapper.trigger('click')
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })
  })

  describe('vcode slot（已移除，验证码按钮放 default slot）', () => {
    it('vcode slot 不可用（vcode 仅为 boolean prop）', () => {
      const wrapper = mount(WeuiCell, {
        props: { vcode: true },
        slots: { default: '<button class="vcode-btn">获取验证码</button>' },
      })
      expect(wrapper.find('.vcode-btn').exists()).toBe(true)
    })
  })
})
