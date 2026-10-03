import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import WeuiHalfScreenDialog from '../half-screen-dialog.vue'
import type { HalfScreenDialogButton } from '../half-screen-dialog.vue'
import { HalfScreenDialog } from '../half-screen-dialog'
import { setOverlayHost } from '../../utils/overlay-host-ref'
import { overlayManager } from '../../utils/overlay'

describe('WeuiHalfScreenDialog', () => {
  beforeEach(() => {
    overlayManager.reset()
  })

  describe('visible', () => {
    it('visible=false 时不渲染', () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: false } })
      expect(wrapper.find('.weui-mask').exists()).toBe(false)
    })

    it('visible=true 时渲染遮罩与半屏弹窗', () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: true } })
      expect(wrapper.find('.weui-mask').exists()).toBe(true)
      expect(wrapper.find('.weui-half-screen-dialog').exists()).toBe(true)
    })
  })

  describe('title / subtitle', () => {
    it('设置 title 时渲染标题区域', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, title: '提示' },
      })
      expect(wrapper.find('.weui-half-screen-dialog__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-half-screen-dialog__title').text()).toBe('提示')
    })

    it('设置 subtitle 时渲染副标题', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, title: '提示', subtitle: '副标题文字' },
      })
      expect(wrapper.find('.weui-half-screen-dialog__subtitle').text()).toBe('副标题文字')
    })

    it('不设置 title/subtitle 且 showClose=false 时不渲染头部', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, showClose: false },
      })
      expect(wrapper.find('.weui-half-screen-dialog__hd').exists()).toBe(false)
    })

    it('showClose 默认 true 时渲染头部关闭按钮', () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: true } })
      expect(wrapper.find('.weui-half-screen-dialog__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-half-screen-dialog__hd__side').exists()).toBe(true)
      expect(wrapper.find('.weui-icon-close-thin').exists()).toBe(true)
    })

    it('使用 title slot 替代默认头部主区域内容', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, showClose: false },
        slots: { title: '自定义标题' },
      })
      expect(wrapper.find('.weui-half-screen-dialog__hd__main').text()).toBe('自定义标题')
    })
  })

  describe('官方头部结构', () => {
    it('渲染 side + main + side 三列头部', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, title: '标题', subtitle: '副标题' },
      })
      const hd = wrapper.find('.weui-half-screen-dialog__hd')
      expect(hd.find('.weui-half-screen-dialog__hd__side').exists()).toBe(true)
      expect(hd.find('.weui-half-screen-dialog__hd__main').exists()).toBe(true)
      expect(hd.find('.weui-half-screen-dialog__title').text()).toBe('标题')
      expect(hd.find('.weui-half-screen-dialog__subtitle').text()).toBe('副标题')
    })

    it('headerActions 渲染为 __hd__action-group', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: {
          visible: true,
          title: '标题',
          headerActions: [
            { text: '搜索', icon: 'weui-icon-search', type: 'icon' },
            { text: '更多', icon: 'weui-icon-more', type: 'icon' },
            { text: '完成', type: 'link' },
          ],
        },
      })
      const group = wrapper.find('.weui-half-screen-dialog__hd__action-group')
      expect(group.exists()).toBe(true)
      const actions = group.findAll('.weui-half-screen-dialog__hd__action')
      expect(actions).toHaveLength(3)
      expect(actions[0].classes()).toContain('weui-btn_icon')
      expect(actions[0].find('.weui-icon-search').exists()).toBe(true)
      expect(actions[2].classes()).toContain('weui-link')
    })

    it('type=button 的操作渲染 xmini 主色按钮', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: {
          visible: true,
          headerActions: [{ text: '完成', type: 'button' }],
        },
      })
      const action = wrapper.find('.weui-half-screen-dialog__hd__action')
      expect(action.classes()).toContain('weui-btn_xmini')
      expect(action.classes()).toContain('weui-btn_primary')
    })

    it('点击头部操作触发 actiontap', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, headerActions: [{ text: '搜索', icon: 'weui-icon-search' }] },
      })
      await wrapper.find('.weui-half-screen-dialog__hd__action').trigger('click')
      expect(wrapper.emitted('actiontap')).toBeTruthy()
      expect(wrapper.emitted('actiontap')![0][1]).toBe(0)
    })

    it('设置 avatar 时渲染头像与昵称', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, showClose: false, avatar: 'https://x/y.png', nickname: '昵称' },
      })
      const main = wrapper.find('.weui-half-screen-dialog__hd__main')
      expect(main.find('img').attributes('src')).toBe('https://x/y.png')
      expect(main.text()).toContain('昵称')
    })

    it('grab 变体渲染 __hd__grab 与 __hd__nav 两层结构', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, variant: 'grab', title: '标题' },
      })
      expect(wrapper.find('.weui-half-screen-dialog__hd__grab').exists()).toBe(true)
      expect(wrapper.find('.weui-half-screen-dialog__hd__nav').exists()).toBe(true)
      const nav = wrapper.find('.weui-half-screen-dialog__hd__nav')
      expect(nav.find('.weui-half-screen-dialog__hd__main').exists()).toBe(true)
      expect(wrapper.find('.weui-half-screen-dialog__slide-icon').exists()).toBe(true)
    })

    it('grab 变体使用向下箭头关闭图标', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, variant: 'grab' },
      })
      expect(wrapper.find('.weui-icon-slide-down').exists()).toBe(true)
    })
  })

  describe('variant', () => {
    it('default 不附加变体类名', () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: true } })
      const cls = wrapper.find('.weui-half-screen-dialog').classes()
      expect(cls).not.toContain('weui-bottom-fixed-opr-page')
      expect(cls).not.toContain('weui-half-screen-dialog_large')
      expect(cls).not.toContain('weui-half-screen-dialog_grab')
    })

    it('bottomFixed 附加官方类名到容器/body/footer', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, variant: 'bottomFixed', title: '标题', buttons: [{ label: '确定' }] },
      })
      expect(wrapper.find('.weui-half-screen-dialog').classes()).toContain('weui-bottom-fixed-opr-page')
      expect(wrapper.find('.weui-half-screen-dialog__bd').classes()).toContain(
        'weui-bottom-fixed-opr-page__content',
      )
      expect(wrapper.find('.weui-half-screen-dialog__ft').classes()).toContain(
        'weui-bottom-fixed-opr-page__tool',
      )
    })

    it('large 附加 weui-half-screen-dialog_large', () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: true, variant: 'large' } })
      expect(wrapper.find('.weui-half-screen-dialog').classes()).toContain(
        'weui-half-screen-dialog_large',
      )
    })

    it('grab 附加 weui-half-screen-dialog_grab', () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: true, variant: 'grab' } })
      expect(wrapper.find('.weui-half-screen-dialog').classes()).toContain(
        'weui-half-screen-dialog_grab',
      )
    })
  })

  describe('desc / tips', () => {
    it('渲染 __desc 与 __tips', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, desc: '辅助描述内容', tips: '辅助提示内容' },
      })
      expect(wrapper.find('.weui-half-screen-dialog__desc').text()).toBe('辅助描述内容')
      expect(wrapper.find('.weui-half-screen-dialog__tips').text()).toBe('辅助提示内容')
    })

    it('未设置时不渲染', () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: true } })
      expect(wrapper.find('.weui-half-screen-dialog__desc').exists()).toBe(false)
      expect(wrapper.find('.weui-half-screen-dialog__tips').exists()).toBe(false)
    })
  })

  describe('attachmentText', () => {
    it('渲染 __attachment-area 与文字链接', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons: [{ label: '主要操作' }], attachmentText: '附加操作' },
      })
      const area = wrapper.find('.weui-half-screen-dialog__attachment-area')
      expect(area.exists()).toBe(true)
      expect(area.find('.weui-link').text()).toBe('附加操作')
    })

    it('点击附加操作触发 attachmenttap', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons: [{ label: '主要操作' }], attachmentText: '附加操作' },
      })
      await wrapper.find('.weui-half-screen-dialog__attachment-area .weui-link').trigger('click')
      expect(wrapper.emitted('attachmenttap')).toBeTruthy()
    })

    it('未设置时不渲染 __attachment-area', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons: [{ label: '主要操作' }] },
      })
      expect(wrapper.find('.weui-half-screen-dialog__attachment-area').exists()).toBe(false)
    })
  })

  describe('content / body', () => {
    it('渲染 content 文字', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, content: '内容文字' },
      })
      expect(wrapper.find('.weui-half-screen-dialog__bd').text()).toBe('内容文字')
    })

    it('使用 default slot 替代 content', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true },
        slots: { default: '自定义内容' },
      })
      expect(wrapper.find('.weui-half-screen-dialog__bd').text()).toBe('自定义内容')
    })
  })

  describe('buttons', () => {
    const buttons: HalfScreenDialogButton[] = [
      { label: '取消' },
      { label: '确定' },
    ]

    it('使用 button 标签而非 a，避免宿主页面链接色覆盖按钮文字', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons },
      })
      const btns = wrapper.findAll('.weui-btn')
      expect(btns).toHaveLength(2)
      // 宿主（如文档站 .vp-doc a）常给 a 设置链接色，其优先级高于 .weui-btn 的 color
      btns.forEach((btn) => {
        expect(btn.element.tagName).toBe('BUTTON')
        expect(btn.attributes('href')).toBeUndefined()
        expect(btn.attributes('type')).toBe('button')
      })
    })

    it('渲染所有按钮', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons },
      })
      const btns = wrapper.findAll('.weui-btn')
      expect(btns).toHaveLength(2)
      expect(btns[0].text()).toBe('取消')
      expect(btns[1].text()).toBe('确定')
    })

    it('无按钮无附加操作且无 footer slot 时不渲染底部', () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: true, showClose: false } })
      expect(wrapper.find('.weui-half-screen-dialog__ft').exists()).toBe(false)
    })

    it('单按钮自动分配 primary 类名', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons: [{ label: '知道了' }] },
      })
      const btn = wrapper.find('.weui-btn')
      expect(btn.classes()).toContain('weui-btn_primary')
    })

    it('多按钮首个 default 其余 primary', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons },
      })
      const btns = wrapper.findAll('.weui-btn')
      expect(btns[0].classes()).toContain('weui-btn_default')
      expect(btns[1].classes()).toContain('weui-btn_primary')
    })

    it('显式指定 type 时按 type 分配类名', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: {
          visible: true,
          buttons: [
            { label: '默认', type: 'default' },
            { label: '主操作', type: 'primary' },
            { label: '警告', type: 'warn' },
          ],
        },
      })
      const btns = wrapper.findAll('.weui-btn')
      expect(btns[0].classes()).toContain('weui-btn_default')
      expect(btns[1].classes()).toContain('weui-btn_primary')
      expect(btns[2].classes()).toContain('weui-btn_warn')
    })
  })

  describe('mask', () => {
    it('mask=false 时遮罩背景透明', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, mask: false },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).toContain('background: transparent')
    })

    it('mask=true 时遮罩正常显示', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, mask: true },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).not.toContain('transparent')
    })
  })

  describe('extClass', () => {
    it('附加自定义类名到 half-screen-dialog 元素', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, extClass: 'my-dialog' },
      })
      expect(wrapper.find('.weui-half-screen-dialog').classes()).toContain('my-dialog')
    })
  })

  describe('zIndex', () => {
    it('设置 z-index 样式', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, zIndex: 1234 },
      })
      const style = wrapper.find('.weui-mask').attributes('style') || ''
      expect(style).toContain('z-index: 1234')
    })
  })

  describe('事件', () => {
    it('点击按钮触发 buttontap、close 和 update:visible', async () => {
      const buttons: HalfScreenDialogButton[] = [{ label: '取消' }, { label: '确定' }]
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons },
      })
      await wrapper.findAll('.weui-btn')[1].trigger('click')
      expect(wrapper.emitted('buttontap')).toBeTruthy()
      expect(wrapper.emitted('buttontap')![0][0]).toEqual({ label: '确定' })
      expect(wrapper.emitted('buttontap')![0][1]).toBe(1)
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('点击按钮触发 weui-close（供 overlay-host 监听）', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons: [{ label: '确定' }] },
      })
      await wrapper.find('.weui-btn').trigger('click')
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('maskClosable=true 时点击遮罩关闭', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, maskClosable: true },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('weui-close')).toBeTruthy()
      expect(wrapper.emitted('update:visible')![0]).toEqual([false])
    })

    it('maskClosable=false 时点击遮罩不关闭', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, maskClosable: false },
      })
      await wrapper.find('.weui-mask').trigger('click')
      expect(wrapper.emitted('close')).toBeFalsy()
      expect(wrapper.emitted('weui-close')).toBeFalsy()
      expect(wrapper.emitted('update:visible')).toBeFalsy()
    })
  })

  describe('slots', () => {
    it('使用 footer slot 替代默认按钮区', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true },
        slots: { footer: '<view class="custom-footer">自定义底部</view>' },
      })
      expect(wrapper.find('.weui-half-screen-dialog__ft').exists()).toBe(true)
      expect(wrapper.find('.custom-footer').exists()).toBe(true)
      // footer slot 存在时不渲染默认按钮
      expect(wrapper.findAll('.weui-btn')).toHaveLength(0)
    })

    it('使用 header slot 替代整个头部', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, title: '标题' },
        slots: { header: '<view class="custom-header">自定义头部</view>' },
      })
      expect(wrapper.find('.custom-header').exists()).toBe(true)
      expect(wrapper.find('.weui-half-screen-dialog__title').exists()).toBe(false)
    })
  })

  describe('下拉关闭手势（grab 变体）', () => {
    const touchEvent = (type: string, clientY: number) => ({
      changedTouches: [{ clientY }],
      preventDefault: () => {},
    })

    it('下拉超过阈值时关闭', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, variant: 'grab', title: '标题' },
      })
      const dialog = wrapper.find('.weui-half-screen-dialog')
      await dialog.trigger('touchstart', touchEvent('touchstart', 100))
      await dialog.trigger('touchmove', touchEvent('touchmove', 180))
      await dialog.trigger('touchend', touchEvent('touchend', 180))
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('weui-close')).toBeTruthy()
    })

    it('下拉未超过阈值时回弹不关闭', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, variant: 'grab', title: '标题' },
      })
      const dialog = wrapper.find('.weui-half-screen-dialog')
      await dialog.trigger('touchstart', touchEvent('touchstart', 100))
      await dialog.trigger('touchmove', touchEvent('touchmove', 120))
      await dialog.trigger('touchend', touchEvent('touchend', 120))
      expect(wrapper.emitted('close')).toBeFalsy()
      expect(wrapper.find('.weui-half-screen-dialog').attributes('style') || '').not.toContain(
        'translate3d',
      )
    })

    it('向上滑动不产生位移', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, variant: 'grab' },
      })
      const dialog = wrapper.find('.weui-half-screen-dialog')
      await dialog.trigger('touchstart', touchEvent('touchstart', 200))
      await dialog.trigger('touchmove', touchEvent('touchmove', 100))
      const style = wrapper.find('.weui-half-screen-dialog').attributes('style') || ''
      expect(style).not.toContain('translate3d')
    })

    it('draggable=false 时不响应下拉', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, variant: 'grab', draggable: false },
      })
      const dialog = wrapper.find('.weui-half-screen-dialog')
      await dialog.trigger('touchstart', touchEvent('touchstart', 100))
      await dialog.trigger('touchmove', touchEvent('touchmove', 300))
      await dialog.trigger('touchend', touchEvent('touchend', 300))
      expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('非 grab 变体不响应下拉', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: true } })
      const dialog = wrapper.find('.weui-half-screen-dialog')
      await dialog.trigger('touchstart', touchEvent('touchstart', 100))
      await dialog.trigger('touchmove', touchEvent('touchmove', 300))
      await dialog.trigger('touchend', touchEvent('touchend', 300))
      expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('拖动过程中把手上划并显示箭头', async () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, variant: 'grab' },
      })
      const dialog = wrapper.find('.weui-half-screen-dialog')
      await dialog.trigger('touchstart', touchEvent('touchstart', 100))
      // 超过半数阈值（56/2 = 28）
      await dialog.trigger('touchmove', touchEvent('touchmove', 160))
      const icon = wrapper.find('.weui-half-screen-dialog__slide-icon')
      expect(icon.attributes('style')).toContain('height')
      const arrow = wrapper.find('.weui-icon-arrow')
      expect(Number(arrow.attributes('style')?.match(/opacity:\s*([\d.]+)/)?.[1])).toBeGreaterThan(0)
    })
  })

  describe('无障碍', () => {
    it('遮罩层承载 dialog 角色与 aria 属性', async () => {
      vi.useFakeTimers()
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, title: '标题' },
        attachTo: document.body,
      })
      // 入场动画开始后才标记 aria-modal/aria-hidden（与官方 200ms 后置处理一致）
      expect(wrapper.find('.weui-mask').attributes('aria-modal')).toBe('false')
      vi.advanceTimersByTime(20)
      await nextTick()
      const mask = wrapper.find('.weui-mask')
      expect(mask.attributes('role')).toBe('dialog')
      expect(mask.attributes('aria-modal')).toBe('true')
      expect(mask.attributes('aria-hidden')).toBe('false')
      expect(mask.attributes('tabindex')).toBe('0')
      vi.useRealTimers()
    })

    it('aria-labelledby 指向标题元素 id', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, title: '标题' },
      })
      const labelledBy = wrapper.find('.weui-mask').attributes('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      expect(wrapper.find('.weui-half-screen-dialog__title').attributes('id')).toBe(labelledBy)
    })

    it('无标题时不设置 aria-labelledby', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, showClose: false },
      })
      expect(wrapper.find('.weui-mask').attributes('aria-labelledby')).toBeUndefined()
    })

    it('关闭按钮带aria-label', () => {
      const wrapper = mount(WeuiHalfScreenDialog, { props: { visible: true } })
      expect(wrapper.find('.weui-half-screen-dialog__hd__side button').attributes('aria-label')).toBe(
        '关闭',
      )
    })
  })

  describe('btnWrap', () => {
    it('显式设置 btnWrap 时附加 btn-wrap 类名', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons: [{ label: '确定' }], btnWrap: true },
      })
      expect(wrapper.find('.weui-half-screen-dialog').classes()).toContain(
        'weui-half-screen-dialog_btn-wrap',
      )
    })

    it('btnWrap=false 时不附加 btn-wrap 类名', () => {
      const wrapper = mount(WeuiHalfScreenDialog, {
        props: { visible: true, buttons: [{ label: '确定' }], btnWrap: false },
      })
      expect(wrapper.find('.weui-half-screen-dialog').classes()).not.toContain(
        'weui-half-screen-dialog_btn-wrap',
      )
    })
  })
})

describe('HalfScreenDialog 命令式 API', () => {
  // mock overlay-host
  const addedItems: { component: unknown; props: Record<string, unknown> }[] = []
  const mockHost = {
    add: (component: unknown, props: Record<string, unknown> = {}) => {
      addedItems.push({ component, props })
      return { id: addedItems.length, zIndex: 1000 + addedItems.length - 1 }
    },
    remove: () => {},
  }

  beforeEach(() => {
    addedItems.length = 0
    overlayManager.reset()
    setOverlayHost(mockHost)
  })

  afterEach(() => {
    setOverlayHost(null)
  })

  describe('HalfScreenDialog.show', () => {
    it('调用 overlay-host.add 添加半屏弹窗组件', () => {
      HalfScreenDialog.show({ title: '标题', content: '内容', buttons: [{ label: '确定' }] })
      expect(addedItems).toHaveLength(1)
      expect(addedItems[0].props.visible).toBe(true)
      expect(addedItems[0].props.title).toBe('标题')
      expect(addedItems[0].props.content).toBe('内容')
    })

    it('传递 subtitle 到组件 props', () => {
      HalfScreenDialog.show({ title: '标题', subtitle: '副标题' })
      expect(addedItems[0].props.subtitle).toBe('副标题')
    })

    it('默认 maskClosable 为 true', () => {
      HalfScreenDialog.show({ content: '内容' })
      expect(addedItems[0].props.maskClosable).toBe(true)
    })

    it('传递官方扩展字段到组件 props', () => {
      HalfScreenDialog.show({
        variant: 'grab',
        desc: '辅助描述',
        tips: '辅助提示',
        attachmentText: '附加操作',
        avatar: 'https://x/y.png',
        nickname: '昵称',
        headerActions: [{ text: '搜索', icon: 'weui-icon-search' }],
      })
      const p = addedItems[0].props
      expect(p.variant).toBe('grab')
      expect(p.desc).toBe('辅助描述')
      expect(p.tips).toBe('辅助提示')
      expect(p.attachmentText).toBe('附加操作')
      expect(p.avatar).toBe('https://x/y.png')
      expect(p.nickname).toBe('昵称')
      expect(p.headerActions).toHaveLength(1)
    })

    it('默认 variant 为 default 且 showClose 为 true', () => {
      HalfScreenDialog.show({ content: '内容' })
      expect(addedItems[0].props.variant).toBe('default')
      expect(addedItems[0].props.showClose).toBe(true)
    })

    it('点击按钮后 resolve 返回 button 和 index', async () => {
      const promise = HalfScreenDialog.show({
        buttons: [{ label: '取消' }, { label: '确定' }],
      })
      const onButtontap = addedItems[0].props.onButtontap as (btn: HalfScreenDialogButton, index: number) => void
      onButtontap({ label: '确定' }, 1)
      const result = await promise
      expect(result.index).toBe(1)
      expect(result.button).toEqual({ label: '确定' })
    })

    it('遮罩点击关闭时 resolve { button: undefined, index: -1 }', async () => {
      const promise = HalfScreenDialog.show({
        buttons: [{ label: '确定' }],
      })
      const onClose = addedItems[0].props.onClose as () => void
      onClose()
      const result = await promise
      expect(result.index).toBe(-1)
      expect(result.button).toBeUndefined()
    })

    it('按钮点击后 close 接着触发时只 resolve 一次（settled 标志）', async () => {
      const promise = HalfScreenDialog.show({
        buttons: [{ label: '取消' }, { label: '确定' }],
      })
      const onButtontap = addedItems[0].props.onButtontap as (btn: HalfScreenDialogButton, index: number) => void
      const onClose = addedItems[0].props.onClose as () => void
      // 模拟真实按钮点击：buttontap 先触发，紧接着 close 触发
      onButtontap({ label: '确定' }, 1)
      onClose()
      const result = await promise
      // 应保留 buttontap 的值，不被 close 覆盖为 { button: undefined, index: -1 }
      expect(result.index).toBe(1)
      expect(result.button).toEqual({ label: '确定' })
    })
  })

  describe('未挂载 overlay-host', () => {
    it('getOverlayHost 为 null 时 Promise 明确拒绝', async () => {
      setOverlayHost(null)
      await expect(HalfScreenDialog.show({ content: 'x' })).rejects.toThrow(
        'WeuiOverlayHost is not mounted',
      )
    })
  })
})
