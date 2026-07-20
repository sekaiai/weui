import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiPanel, { type PanelItem } from '../panel.vue'

describe('WeuiPanel', () => {
  describe('基础类名', () => {
    it('始终带 weui-panel 类', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.classes()).toContain('weui-panel')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
    })
  })

  describe('type', () => {
    it('默认 type=default 不带 weui-panel_access 类', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.classes()).not.toContain('weui-panel_access')
    })

    it('type=access 时带 weui-panel_access 类', () => {
      const wrapper = mount(WeuiPanel, { props: { type: 'access' } })
      expect(wrapper.classes()).toContain('weui-panel_access')
    })

    it('显式传 type=default 不带 weui-panel_access 类', () => {
      const wrapper = mount(WeuiPanel, { props: { type: 'default' } })
      expect(wrapper.classes()).not.toContain('weui-panel_access')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiPanel, {
        props: { extClass: 'my-panel' },
      })
      expect(wrapper.classes()).toContain('my-panel')
    })

    it('不传 extClass 时不追加额外类名', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.classes()).toEqual(['weui-panel'])
    })

    it('access 模式下也支持 extClass', () => {
      const wrapper = mount(WeuiPanel, {
        props: { type: 'access', extClass: 'my-panel' },
      })
      expect(wrapper.classes()).toContain('weui-panel')
      expect(wrapper.classes()).toContain('weui-panel_access')
      expect(wrapper.classes()).toContain('my-panel')
    })
  })

  describe('header', () => {
    it('传入 title 时渲染 .weui-panel__hd 并显示标题', () => {
      const wrapper = mount(WeuiPanel, { props: { title: '面板标题' } })
      const hd = wrapper.find('.weui-panel__hd')
      expect(hd.exists()).toBe(true)
      expect(hd.text()).toBe('面板标题')
    })

    it('不传 title 时不渲染 .weui-panel__hd', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.find('.weui-panel__hd').exists()).toBe(false)
    })

    it('header slot 替代 title 渲染自定义头部', () => {
      const wrapper = mount(WeuiPanel, {
        props: { title: '默认标题' },
        slots: { header: '<view class="custom-hd">自定义头部</view>' },
      })
      const hd = wrapper.find('.weui-panel__hd')
      expect(hd.exists()).toBe(true)
      expect(hd.find('.custom-hd').exists()).toBe(true)
      expect(hd.text()).toBe('自定义头部')
    })

    it('仅提供 header slot（无 title）时也渲染 .weui-panel__hd', () => {
      const wrapper = mount(WeuiPanel, {
        slots: { header: '只有 slot' },
      })
      expect(wrapper.find('.weui-panel__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-panel__hd').text()).toBe('只有 slot')
    })
  })

  describe('body', () => {
    it('始终渲染 .weui-panel__bd', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.find('.weui-panel__bd').exists()).toBe(true)
    })

    it('default slot 内容渲染到主体', () => {
      const wrapper = mount(WeuiPanel, {
        slots: { default: '<view class="body-content">主体内容</view>' },
      })
      const bd = wrapper.find('.weui-panel__bd')
      expect(bd.find('.body-content').exists()).toBe(true)
      expect(bd.text()).toBe('主体内容')
    })
  })

  describe('footer', () => {
    it('提供 footer slot 时渲染 .weui-panel__ft', () => {
      const wrapper = mount(WeuiPanel, {
        slots: { footer: '<view class="ft-content">底部内容</view>' },
      })
      const ft = wrapper.find('.weui-panel__ft')
      expect(ft.exists()).toBe(true)
      expect(ft.find('.ft-content').exists()).toBe(true)
      expect(ft.text()).toBe('底部内容')
    })

    it('不提供 footer slot 时不渲染 .weui-panel__ft', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.find('.weui-panel__ft').exists()).toBe(false)
    })
  })

  describe('组合结构', () => {
    it('同时渲染 header、body、footer', () => {
      const wrapper = mount(WeuiPanel, {
        props: { title: '标题', type: 'access', extClass: 'ext' },
        slots: {
          default: '<view>主体</view>',
          footer: '<view>底部</view>',
        },
      })
      expect(wrapper.find('.weui-panel__hd').exists()).toBe(true)
      expect(wrapper.find('.weui-panel__bd').exists()).toBe(true)
      expect(wrapper.find('.weui-panel__ft').exists()).toBe(true)
      expect(wrapper.classes()).toContain('weui-panel_access')
      expect(wrapper.classes()).toContain('ext')
    })
  })

  describe('items (media 模式)', () => {
    it('传入 items 时渲染对应数量 media-box', () => {
      const items = [
        { id: 1, title: '标题一', desc: '描述一' },
        { id: 2, title: '标题二', desc: '描述二' },
      ]
      const wrapper = mount(WeuiPanel, { props: { items } })
      expect(wrapper.findAll('.weui-media-box')).toHaveLength(2)
    })

    it('有 thumb 的项渲染为 appmsg', () => {
      const items = [{ id: 1, title: '标题', thumb: 'x.png' }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(false)
    })

    it('无 thumb 的项渲染为 text', () => {
      const items = [{ id: 1, title: '标题' }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(false)
    })

    it('含 info 字段的项渲染 weui-media-box__info', () => {
      const items = [{
        id: 1,
        title: '标题',
        info: ['来源', '时间', '其它'],
      }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      expect(wrapper.find('.weui-media-box__info').exists()).toBe(true)
      expect(wrapper.findAll('.weui-media-box__info__meta')).toHaveLength(3)
      // 最后一项有 meta_extra 类
      const metas = wrapper.findAll('.weui-media-box__info__meta')
      expect(metas[2].classes()).toContain('weui-media-box__info__meta_extra')
    })

    it('有 thumb + info 时也渲染 info（info 不受 thumb 影响）', () => {
      const items = [{
        id: 1,
        title: '标题',
        thumb: 'x.png',
        info: ['来源', '时间'],
      }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      // appmsg 模式下也渲染 info
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box__info').exists()).toBe(true)
      expect(wrapper.findAll('.weui-media-box__info__meta')).toHaveLength(2)
    })
  })

  describe('items (cell 模式)', () => {
    it('itemType=cell 时渲染 small-appmsg + weui-cells', () => {
      const items = [{ id: 1, title: '标题一' }]
      const wrapper = mount(WeuiPanel, {
        props: { items, itemType: 'cell' },
      })
      expect(wrapper.find('.weui-media-box_small-appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-cells').exists()).toBe(true)
    })

    it('每项渲染为 weui-cell_example', () => {
      const items = [
        { id: 1, title: '标题一' },
        { id: 2, title: '标题二' },
      ]
      const wrapper = mount(WeuiPanel, {
        props: { items, itemType: 'cell' },
      })
      expect(wrapper.findAll('.weui-cell_example')).toHaveLength(2)
    })

    it('有 thumb 时渲染为 cell__hd 内的小图', () => {
      const items = [{ id: 1, title: '标题', thumb: 'x.png' }]
      const wrapper = mount(WeuiPanel, {
        props: { items, itemType: 'cell' },
      })
      const hd = wrapper.find('.weui-cell .weui-cell__hd')
      expect(hd.exists()).toBe(true)
      expect(hd.find('img').exists()).toBe(true)
    })
  })

  describe('footerText', () => {
    it('传入 footerText 渲染 link cell', () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '查看更多' },
      })
      const link = wrapper.find('.weui-cell_link')
      expect(link.exists()).toBe(true)
      expect(link.text()).toContain('查看更多')
    })

    it('footerText 渲染的 link cell 含 weui-cell_active weui-cell_access 类', () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '查看更多' },
      })
      const link = wrapper.find('.weui-cell_link')
      expect(link.classes()).toContain('weui-cell_active')
      expect(link.classes()).toContain('weui-cell_access')
    })

    it('footerHref 默认为 javascript:void(0);', () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '查看更多' },
      })
      expect(wrapper.find('.weui-cell_link').attributes('href')).toBe('javascript:void(0);')
    })

    it('footer slot 优先于 footerText', () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '默认文字' },
        slots: { footer: '<div class="custom-footer">自定义</div>' },
      })
      expect(wrapper.find('.custom-footer').exists()).toBe(true)
      expect(wrapper.find('.weui-cell_link').exists()).toBe(false)
    })
  })

  describe('events', () => {
    it('点击 footerText 渲染的链接触发 footer-click 事件', async () => {
      const wrapper = mount(WeuiPanel, {
        props: { footerText: '查看更多' },
      })
      await wrapper.find('.weui-cell_link').trigger('click')
      expect(wrapper.emitted('footer-click')).toBeTruthy()
      expect(wrapper.emitted('footer-click')).toHaveLength(1)
    })

    it('点击无 href 的 media 项触发 item-click 事件', async () => {
      const items = [{ id: 1, title: '标题' }]
      const wrapper = mount(WeuiPanel, { props: { items } })
      await wrapper.find('.weui-media-box').trigger('click')
      expect(wrapper.emitted('item-click')).toBeTruthy()
      const [itemArg] = wrapper.emitted('item-click')![0] as [PanelItem]
      expect(itemArg.id).toBe(1)
    })
  })

  describe('向后兼容', () => {
    it('无 items 时 default slot 正常渲染', () => {
      const wrapper = mount(WeuiPanel, {
        slots: { default: '<div class="custom-body">主体</div>' },
      })
      expect(wrapper.find('.custom-body').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box').exists()).toBe(false)
    })

    it('无 footerText 且无 footer slot 时不渲染 __ft', () => {
      const wrapper = mount(WeuiPanel)
      expect(wrapper.find('.weui-panel__ft').exists()).toBe(false)
    })
  })
})
