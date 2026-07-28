import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiSlideview from '../slideview.vue'
import type { SlideButton } from '../slideview.vue'

const buttons: SlideButton[] = [
  { text: '收藏' },
  { text: '删除', type: 'warn', width: 80 },
]

describe('WeuiSlideview', () => {
  it('使用官方 Cell 滑动结构', () => {
    const wrapper = mount(WeuiSlideview, { props: { buttons } })
    expect(wrapper.classes()).toContain('weui-cell_swiped')
    expect(wrapper.find('.weui-cell__bd').exists()).toBe(true)
    expect(wrapper.find('.weui-cell__ft').exists()).toBe(true)
  })

  it('使用官方滑动按钮类名和宽度', () => {
    const wrapper = mount(WeuiSlideview, { props: { buttons } })
    const actionButtons = wrapper.findAll('.weui-swiped-btn')
    expect(actionButtons).toHaveLength(2)
    expect(actionButtons[1].classes()).toContain('weui-swiped-btn_warn')
    expect(actionButtons[1].attributes('style')).toContain('width: 80px')
  })

  it('展开距离等于全部操作按钮宽度', () => {
    const wrapper = mount(WeuiSlideview, { props: { show: true, buttons } })
    expect(wrapper.find('.weui-cell__bd').attributes('style')).toContain('translateX(-148px)')
  })

  it('点击操作按钮后触发事件并收起', async () => {
    const wrapper = mount(WeuiSlideview, { props: { show: true, buttons } })
    await wrapper.findAll('.weui-swiped-btn')[1].trigger('click')
    expect(wrapper.emitted('buttonclick')![0]).toEqual([buttons[1], 1])
    expect(wrapper.emitted('update:show')![0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('展开时点击内容区收起', async () => {
    const wrapper = mount(WeuiSlideview, { props: { show: true } })
    await wrapper.find('.weui-cell__bd').trigger('click')
    expect(wrapper.emitted('update:show')![0]).toEqual([false])
  })

  it('禁用时不响应手势或内容区关闭', async () => {
    const wrapper = mount(WeuiSlideview, { props: { show: true, disabled: true } })
    const content = wrapper.find('.weui-cell__bd')
    await content.trigger('click')
    await content.trigger('touchstart', { touches: [{ clientX: 100 }] })
    await content.trigger('touchmove', { touches: [{ clientX: 40 }] })
    expect(wrapper.emitted('update:show')).toBeFalsy()
  })

  it('左滑展开，右滑收起', async () => {
    const wrapper = mount(WeuiSlideview, { props: { buttons } })
    const content = wrapper.find('.weui-cell__bd')
    await content.trigger('touchstart', { touches: [{ clientX: 100 }] })
    await content.trigger('touchmove', { touches: [{ clientX: 40 }] })
    expect(wrapper.emitted('update:show')![0]).toEqual([true])
    await content.trigger('touchstart', { touches: [{ clientX: 40 }] })
    await content.trigger('touchmove', { touches: [{ clientX: 100 }] })
    expect(wrapper.emitted('update:show')![1]).toEqual([false])
  })
})
