import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiArticle from '../article.vue'

describe('WeuiArticle', () => {
  describe('基础类名', () => {
    it('始终带 weui-article 类', () => {
      const wrapper = mount(WeuiArticle)
      expect(wrapper.classes()).toContain('weui-article')
    })

    it('根元素为 view', () => {
      const wrapper = mount(WeuiArticle)
      expect(wrapper.element.tagName.toLowerCase()).toBe('view')
    })
  })

  describe('extClass', () => {
    it('附加扩展类名到根元素', () => {
      const wrapper = mount(WeuiArticle, {
        props: { extClass: 'my-article' },
      })
      expect(wrapper.classes()).toContain('my-article')
    })

    it('不传 extClass 时仅含 weui-article 类', () => {
      const wrapper = mount(WeuiArticle)
      expect(wrapper.classes()).toEqual(['weui-article'])
    })
  })

  describe('default slot', () => {
    it('渲染默认插槽内容', () => {
      const wrapper = mount(WeuiArticle, {
        slots: {
          default: '<h1>文章标题</h1><p>段落内容</p>',
        },
      })
      expect(wrapper.text()).toContain('文章标题')
      expect(wrapper.text()).toContain('段落内容')
      expect(wrapper.find('h1').exists()).toBe(true)
      expect(wrapper.find('p').exists()).toBe(true)
    })

    it('无插槽内容时根元素仍正确渲染', () => {
      const wrapper = mount(WeuiArticle)
      expect(wrapper.classes()).toContain('weui-article')
      expect(wrapper.text()).toBe('')
    })

    it('支持渲染富文本结构（section/h2/p）', () => {
      const wrapper = mount(WeuiArticle, {
        slots: {
          default: `
            <section>
              <h2>章节标题</h2>
              <p>章节段落</p>
            </section>
          `,
        },
      })
      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.find('h2').text()).toBe('章节标题')
      expect(wrapper.find('p').text()).toBe('章节段落')
    })
  })

  describe('无 props 默认渲染', () => {
    it('无任何 props 时正常渲染且仅含 weui-article 类', () => {
      const wrapper = mount(WeuiArticle)
      expect(wrapper.classes()).toEqual(['weui-article'])
      expect(wrapper.element.tagName.toLowerCase()).toBe('view')
    })
  })
})
