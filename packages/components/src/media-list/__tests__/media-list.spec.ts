import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiMediaList from '../media-list.vue'
import type { MediaListItem } from '../media-list.vue'

describe('WeuiMediaList', () => {
  describe('渲染数量', () => {
    it('传入 items 时渲染对应数量 media-box', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '标题一' },
        { id: 2, title: '标题二' },
        { id: 3, title: '标题三' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      expect(wrapper.findAll('.weui-media-box')).toHaveLength(3)
    })

    it('空数组时不渲染任何 media-box', () => {
      const wrapper = mount(WeuiMediaList, { props: { items: [] } })
      expect(wrapper.findAll('.weui-media-box')).toHaveLength(0)
    })
  })

  describe('类型判断', () => {
    it('有 thumb 的项渲染为 appmsg', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '标题', thumb: 'https://example.com/x.png' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(false)
    })

    it('无 thumb 的项渲染为 text', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '标题' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      expect(wrapper.find('.weui-media-box_text').exists()).toBe(true)
      expect(wrapper.find('.weui-media-box_appmsg').exists()).toBe(false)
    })

    it('appmsg 和 text 可混用', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '图文', thumb: 'https://example.com/a.png' },
        { id: 2, title: '纯文本' },
        { id: 3, title: '另一图文', thumb: 'https://example.com/b.png' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      const appmsgList = wrapper.findAll('.weui-media-box_appmsg')
      const textList = wrapper.findAll('.weui-media-box_text')
      expect(appmsgList).toHaveLength(2)
      expect(textList).toHaveLength(1)
    })
  })

  describe('info 字段', () => {
    it('含 info 字段的项渲染 weui-media-box__info', () => {
      const items: MediaListItem[] = [
        {
          id: 1,
          title: '标题',
          info: ['来源一', '来源二'],
        },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      const info = wrapper.find('.weui-media-box__info')
      expect(info.exists()).toBe(true)
      expect(info.element.tagName.toLowerCase()).toBe('ul')
      const metas = wrapper.findAll('.weui-media-box__info__meta')
      expect(metas).toHaveLength(2)
      expect(metas[0].text()).toBe('来源一')
      expect(metas[1].text()).toBe('来源二')
    })

    it('info 最后一项有 meta_extra 类', () => {
      const items: MediaListItem[] = [
        {
          id: 1,
          title: '标题',
          info: ['来源一', '来源二', '来源三'],
        },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      const metas = wrapper.findAll('.weui-media-box__info__meta')
      expect(metas[0].classes()).not.toContain('weui-media-box__info__meta_extra')
      expect(metas[1].classes()).not.toContain('weui-media-box__info__meta_extra')
      expect(metas[2].classes()).toContain('weui-media-box__info__meta_extra')
    })

    it('不含 info 字段的项不渲染 weui-media-box__info', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '标题' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      expect(wrapper.find('.weui-media-box__info').exists()).toBe(false)
    })

    it('info 为空数组时不渲染 weui-media-box__info', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '标题', info: [] },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      expect(wrapper.find('.weui-media-box__info').exists()).toBe(false)
    })
  })

  describe('item-click 事件', () => {
    it('点击无 href 的项触发 item-click 事件', async () => {
      const item: MediaListItem = { id: 1, title: '标题' }
      const wrapper = mount(WeuiMediaList, { props: { items: [item] } })
      await wrapper.find('.weui-media-box').trigger('click')
      const emitted = wrapper.emitted('item-click')
      expect(emitted).toBeTruthy()
      expect(emitted).toHaveLength(1)
      const [emittedItem, event] = emitted![0]
      expect(emittedItem).toStrictEqual(item)
      expect(event).toBeInstanceOf(Event)
    })

    it('点击多个不同项时各自触发 item-click', async () => {
      const items: MediaListItem[] = [
        { id: 1, title: '一' },
        { id: 2, title: '二' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      const boxes = wrapper.findAll('.weui-media-box')
      await boxes[0].trigger('click')
      await boxes[1].trigger('click')
      const emitted = wrapper.emitted('item-click')
      expect(emitted).toHaveLength(2)
      expect(emitted![0][0]).toStrictEqual(items[0])
      expect(emitted![1][0]).toStrictEqual(items[1])
    })
  })

  describe('字段透传', () => {
    it('title 与 desc 透传给 media-box', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '标题一', desc: '描述一' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      expect(wrapper.find('.weui-media-box__title').text()).toBe('标题一')
      expect(wrapper.find('.weui-media-box__desc').text()).toBe('描述一')
    })

    it('thumb 透传给 media-box 并渲染 __thumb', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '标题', thumb: 'https://example.com/x.png' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      const thumb = wrapper.find('.weui-media-box__thumb')
      expect(thumb.exists()).toBe(true)
      expect(thumb.attributes('src')).toBe('https://example.com/x.png')
    })

    it('extClass 透传到对应 media-box 根元素', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '一', extClass: 'ext-a' },
        { id: 2, title: '二', extClass: 'ext-b' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      const boxes = wrapper.findAll('.weui-media-box')
      expect(boxes[0].classes()).toContain('ext-a')
      expect(boxes[1].classes()).toContain('ext-b')
    })

    it('href 透传给 media-box（appmsg 模式渲染为 a 标签）', () => {
      const items: MediaListItem[] = [
        { id: 1, title: '标题', thumb: 'https://example.com/x.png', href: '/detail/1' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      const root = wrapper.find('.weui-media-box_appmsg')
      expect(root.element.tagName.toLowerCase()).toBe('a')
      expect(root.attributes('href')).toBe('/detail/1')
    })
  })

  describe('key 处理', () => {
    it('无 id 时用 index 作为 key（不报错）', () => {
      const items: MediaListItem[] = [
        { title: '一' },
        { title: '二' },
      ]
      const wrapper = mount(WeuiMediaList, { props: { items } })
      expect(wrapper.findAll('.weui-media-box')).toHaveLength(2)
    })
  })
})
