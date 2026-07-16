import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiSlideview from '../slideview.vue'
import type { SlideButton } from '../slideview.vue'

describe('WeuiSlideview', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-slideview 类', () => {
      const wrapper = mount(WeuiSlideview)
      expect(wrapper.classes()).toContain('weui-slideview')
    })

    it('默认 show=false 不带 weui-slideview_show 类', () => {
      const wrapper = mount(WeuiSlideview)
      expect(wrapper.classes()).not.toContain('weui-slideview_show')
    })

    it('show=true 时追加 weui-slideview_show 类', () => {
      const wrapper = mount(WeuiSlideview, { props: { show: true } })
      expect(wrapper.classes()).toContain('weui-slideview_show')
    })

    it('渲染内容区域 weui-slideview__left', () => {
      const wrapper = mount(WeuiSlideview)
      expect(wrapper.find('.weui-slideview__left').exists()).toBe(true)
    })

    it('渲染按钮区域 weui-slideview__right', () => {
      const wrapper = mount(WeuiSlideview)
      expect(wrapper.find('.weui-slideview__right').exists()).toBe(true)
    })
  })

  describe('buttons', () => {
    const buttons: SlideButton[] = [
      { text: '收藏' },
      { text: '删除', type: 'warn' },
    ]

    it('渲染所有按钮', () => {
      const wrapper = mount(WeuiSlideview, { props: { buttons } })
      const btns = wrapper.findAll('.weui-slideview__btn')
      expect(btns).toHaveLength(2)
      expect(btns[0].text()).toBe('收藏')
      expect(btns[1].text()).toBe('删除')
    })

    it('默认 buttons 为空数组时不渲染按钮', () => {
      const wrapper = mount(WeuiSlideview)
      expect(wrapper.findAll('.weui-slideview__btn')).toHaveLength(0)
    })

    it('type=warn 追加 weui-slideview__btn_warn 类', () => {
      const wrapper = mount(WeuiSlideview, {
        props: { buttons: [{ text: '删除', type: 'warn' }] },
      })
      expect(wrapper.find('.weui-slideview__btn').classes()).toContain('weui-slideview__btn_warn')
    })

    it('未指定 type 时不追加 weui-slideview__btn_warn 类', () => {
      const wrapper = mount(WeuiSlideview, {
        props: { buttons: [{ text: '收藏' }] },
      })
      expect(wrapper.find('.weui-slideview__btn').classes()).not.toContain('weui-slideview__btn_warn')
    })

    it('type=default 时不追加 weui-slideview__btn_warn 类', () => {
      const wrapper = mount(WeuiSlideview, {
        props: { buttons: [{ text: '编辑', type: 'default' }] },
      })
      expect(wrapper.find('.weui-slideview__btn').classes()).not.toContain('weui-slideview__btn_warn')
    })
  })

  describe('extClass', () => {
    it('附加自定义类名到根元素', () => {
      const wrapper = mount(WeuiSlideview, {
        props: { extClass: 'my-slideview' },
      })
      expect(wrapper.classes()).toContain('my-slideview')
    })

    it('不传 extClass 时不追加额外类名', () => {
      const wrapper = mount(WeuiSlideview)
      expect(wrapper.classes()).toEqual(['weui-slideview'])
    })
  })

  describe('slot', () => {
    it('default slot 内容渲染在内容区域', () => {
      const wrapper = mount(WeuiSlideview, {
        slots: { default: '列表内容' },
      })
      expect(wrapper.find('.weui-slideview__left').text()).toBe('列表内容')
    })
  })

  describe('事件', () => {
    const buttons: SlideButton[] = [
      { text: '收藏' },
      { text: '删除', type: 'warn' },
    ]

    it('点击按钮触发 buttonclick 事件并携带 button 和 index', async () => {
      const wrapper = mount(WeuiSlideview, {
        props: { show: true, buttons },
      })
      await wrapper.findAll('.weui-slideview__btn')[1].trigger('click')
      expect(wrapper.emitted('buttonclick')).toBeTruthy()
      expect(wrapper.emitted('buttonclick')![0][0]).toEqual({ text: '删除', type: 'warn' })
      expect(wrapper.emitted('buttonclick')![0][1]).toBe(1)
    })

    it('点击按钮触发 close 和 update:show(false)', async () => {
      const wrapper = mount(WeuiSlideview, {
        props: { show: true, buttons },
      })
      await wrapper.findAll('.weui-slideview__btn')[0].trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:show')![0]).toEqual([false])
    })

    it('show=true 时点击内容区域收起并触发 close', async () => {
      const wrapper = mount(WeuiSlideview, {
        props: { show: true },
      })
      await wrapper.find('.weui-slideview__left').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:show')![0]).toEqual([false])
    })

    it('show=false 时点击内容区域不触发 close', async () => {
      const wrapper = mount(WeuiSlideview, {
        props: { show: false },
      })
      await wrapper.find('.weui-slideview__left').trigger('click')
      expect(wrapper.emitted('close')).toBeFalsy()
      expect(wrapper.emitted('update:show')).toBeFalsy()
    })

    it('disabled=true 时点击内容区域不触发 close', async () => {
      const wrapper = mount(WeuiSlideview, {
        props: { show: true, disabled: true },
      })
      await wrapper.find('.weui-slideview__left').trigger('click')
      expect(wrapper.emitted('close')).toBeFalsy()
      expect(wrapper.emitted('update:show')).toBeFalsy()
    })

    it('disabled=true 时点击按钮仍可触发 buttonclick 和 close', async () => {
      const wrapper = mount(WeuiSlideview, {
        props: { show: true, disabled: true, buttons },
      })
      await wrapper.findAll('.weui-slideview__btn')[0].trigger('click')
      expect(wrapper.emitted('buttonclick')).toBeTruthy()
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('update:show')![0]).toEqual([false])
    })
  })
})
