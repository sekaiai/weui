import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiSteps from '../steps.vue'

const sampleSteps = [
  { title: '步骤一', desc: '描述一' },
  { title: '步骤二', desc: '描述二' },
  { title: '步骤三', desc: '描述三' },
]

describe('WeuiSteps', () => {
  describe('基础类名与结构', () => {
    it('根元素始终带 weui-steps 类', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.classes()).toContain('weui-steps')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.element.tagName.toLowerCase()).toBe('view')
    })

    it('根据 steps 数组长度渲染对应数量的步骤项', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.findAll('.weui-steps__item')).toHaveLength(3)
    })

    it('每个步骤项都带 weui-steps__item 类', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      const items = wrapper.findAll('.weui-steps__item')
      items.forEach((item) => {
        expect(item.classes()).toContain('weui-steps__item')
      })
    })

    it('每个步骤项渲染 weui-steps__icon', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.findAll('.weui-steps__icon')).toHaveLength(3)
    })
  })

  describe('current 状态', () => {
    it('current 步骤带 weui-steps__item_current 类', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, current: 1 },
      })
      const items = wrapper.findAll('.weui-steps__item')
      expect(items[1].classes()).toContain('weui-steps__item_current')
    })

    it('index 小于 current 的步骤带 weui-steps__item_done 类', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, current: 2 },
      })
      const items = wrapper.findAll('.weui-steps__item')
      expect(items[0].classes()).toContain('weui-steps__item_done')
      expect(items[1].classes()).toContain('weui-steps__item_done')
    })

    it('index 大于 current 的步骤不带状态类', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, current: 0 },
      })
      const items = wrapper.findAll('.weui-steps__item')
      expect(items[1].classes()).not.toContain('weui-steps__item_done')
      expect(items[1].classes()).not.toContain('weui-steps__item_current')
      expect(items[2].classes()).not.toContain('weui-steps__item_done')
      expect(items[2].classes()).not.toContain('weui-steps__item_current')
    })

    it('current 默认为 0，第一项为进行中', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      const items = wrapper.findAll('.weui-steps__item')
      expect(items[0].classes()).toContain('weui-steps__item_current')
    })
  })

  describe('direction', () => {
    it('direction 为 vertical 时带 weui-steps_vertical 类', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, direction: 'vertical' },
      })
      expect(wrapper.classes()).toContain('weui-steps_vertical')
    })

    it('direction 默认 horizontal 不带 weui-steps_vertical 类', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.classes()).not.toContain('weui-steps_vertical')
    })
  })

  describe('title 与 desc 渲染', () => {
    it('渲染每个步骤的 title', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      const titles = wrapper.findAll('.weui-steps__title')
      expect(titles[0].text()).toBe('步骤一')
      expect(titles[1].text()).toBe('步骤二')
      expect(titles[2].text()).toBe('步骤三')
    })

    it('渲染每个步骤的 desc', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      const descs = wrapper.findAll('.weui-steps__desc')
      expect(descs[0].text()).toBe('描述一')
      expect(descs[1].text()).toBe('描述二')
      expect(descs[2].text()).toBe('描述三')
    })

    it('desc 不传时不渲染 .weui-steps__desc', () => {
      const wrapper = mount(WeuiSteps, {
        props: {
          steps: [
            { title: '步骤一' },
            { title: '步骤二', desc: '描述二' },
          ],
        },
      })
      const descs = wrapper.findAll('.weui-steps__desc')
      expect(descs).toHaveLength(1)
      expect(descs[0].text()).toBe('描述二')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, extClass: 'my-steps' },
      })
      expect(wrapper.classes()).toContain('my-steps')
    })

    it('不传 extClass 时仅含 weui-steps 类', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.classes()).toEqual(['weui-steps'])
    })
  })
})
