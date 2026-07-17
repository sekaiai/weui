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

    it('每个步骤项内包含 weui-steps__item__inner 包裹层', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.findAll('.weui-steps__item__inner')).toHaveLength(3)
    })

    it('不渲染数字图标 weui-steps__icon（使用伪元素圆点）', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.findAll('.weui-steps__icon')).toHaveLength(0)
    })
  })

  describe('current 状态', () => {
    it('WeUI v2 无 current 类，当前步骤靠前序 success 数量隐式表达', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, current: 1 },
      })
      const items = wrapper.findAll('.weui-steps__item')
      expect(items[1].classes()).not.toContain('weui-steps__item_current')
      expect(items[1].classes()).not.toContain('weui-steps__item_success')
    })

    it('index 小于 current 的步骤带 weui-steps__item_success 类', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, current: 2 },
      })
      const items = wrapper.findAll('.weui-steps__item')
      expect(items[0].classes()).toContain('weui-steps__item_success')
      expect(items[1].classes()).toContain('weui-steps__item_success')
    })

    it('index 大于等于 current 的步骤不带状态类', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, current: 0 },
      })
      const items = wrapper.findAll('.weui-steps__item')
      expect(items[1].classes()).not.toContain('weui-steps__item_success')
      expect(items[2].classes()).not.toContain('weui-steps__item_success')
    })

    it('current 默认为 0，无前序 success 步骤', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      const items = wrapper.findAll('.weui-steps__item')
      expect(items[0].classes()).not.toContain('weui-steps__item_success')
    })
  })

  describe('direction', () => {
    it('direction 为 vertical 时带 weui-steps_vertical 类', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, direction: 'vertical' },
      })
      expect(wrapper.classes()).toContain('weui-steps_vertical')
    })

    it('direction 默认 horizontal 带 weui-steps_horizonal 类（官方拼写单 r）', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.classes()).toContain('weui-steps_horizonal')
    })

    it('direction 为 horizontal 时不带 weui-steps_vertical 类', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.classes()).not.toContain('weui-steps_vertical')
    })

    it('direction 为 vertical 时不带 weui-steps_horizonal 类', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, direction: 'vertical' },
      })
      expect(wrapper.classes()).not.toContain('weui-steps_horizonal')
    })
  })

  describe('title 与 desc 渲染', () => {
    it('渲染每个步骤的 title（类名 weui-steps__item__title 双下划线）', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      const titles = wrapper.findAll('.weui-steps__item__title')
      expect(titles[0].text()).toBe('步骤一')
      expect(titles[1].text()).toBe('步骤二')
      expect(titles[2].text()).toBe('步骤三')
    })

    it('渲染每个步骤的 desc（类名 weui-steps__item__desc 双下划线）', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      const descs = wrapper.findAll('.weui-steps__item__desc')
      expect(descs[0].text()).toBe('描述一')
      expect(descs[1].text()).toBe('描述二')
      expect(descs[2].text()).toBe('描述三')
    })

    it('desc 不传时不渲染 .weui-steps__item__desc', () => {
      const wrapper = mount(WeuiSteps, {
        props: {
          steps: [
            { title: '步骤一' },
            { title: '步骤二', desc: '描述二' },
          ],
        },
      })
      const descs = wrapper.findAll('.weui-steps__item__desc')
      expect(descs).toHaveLength(1)
      expect(descs[0].text()).toBe('描述二')
    })

    it('title 与 desc 渲染在 weui-steps__item__inner 内部', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      const inner = wrapper.findAll('.weui-steps__item__inner')
      expect(inner[0].find('.weui-steps__item__title').exists()).toBe(true)
      expect(inner[0].find('.weui-steps__item__desc').exists()).toBe(true)
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiSteps, {
        props: { steps: sampleSteps, extClass: 'my-steps' },
      })
      expect(wrapper.classes()).toContain('my-steps')
    })

    it('不传 extClass 时仅含 weui-steps 与方向类', () => {
      const wrapper = mount(WeuiSteps, { props: { steps: sampleSteps } })
      expect(wrapper.classes()).toEqual([
        'weui-steps',
        'weui-steps_horizonal',
      ])
    })
  })
})
