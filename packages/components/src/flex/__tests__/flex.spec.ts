import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiFlex from '../flex.vue'
import WeuiFlexItem from '../flex-item.vue'

describe('WeuiFlex', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-flex 类', () => {
      const wrapper = mount(WeuiFlex)
      expect(wrapper.classes()).toContain('weui-flex')
    })

    it('不传 props 时仅带 weui-flex 类（无 direction/wrap/justify/align 类）', () => {
      const wrapper = mount(WeuiFlex)
      expect(wrapper.classes()).toEqual(['weui-flex'])
    })

    it('始终输出内联 style 包含 flex 布局属性', () => {
      const wrapper = mount(WeuiFlex)
      const style = (wrapper.element as HTMLElement).style
      expect(style.flexDirection).toBe('row')
      expect(style.flexWrap).toBe('nowrap')
      expect(style.justifyContent).toBe('flex-start')
      expect(style.alignItems).toBe('center')
    })

    it('默认 align=center 输出 align-items: center', () => {
      const wrapper = mount(WeuiFlex)
      expect((wrapper.element as HTMLElement).style.alignItems).toBe('center')
    })
  })

  describe('direction', () => {
    it('column 输出 flex-direction: column', () => {
      const wrapper = mount(WeuiFlex, { props: { direction: 'column' } })
      expect((wrapper.element as HTMLElement).style.flexDirection).toBe(
        'column',
      )
    })

    it('row-reverse 输出 flex-direction: row-reverse', () => {
      const wrapper = mount(WeuiFlex, { props: { direction: 'row-reverse' } })
      expect((wrapper.element as HTMLElement).style.flexDirection).toBe(
        'row-reverse',
      )
    })

    it('column-reverse 输出 flex-direction: column-reverse', () => {
      const wrapper = mount(WeuiFlex, {
        props: { direction: 'column-reverse' },
      })
      expect((wrapper.element as HTMLElement).style.flexDirection).toBe(
        'column-reverse',
      )
    })

    it('row 输出 flex-direction: row', () => {
      const wrapper = mount(WeuiFlex, { props: { direction: 'row' } })
      expect((wrapper.element as HTMLElement).style.flexDirection).toBe('row')
    })

    it('direction 不追加任何类名', () => {
      const wrapper = mount(WeuiFlex, { props: { direction: 'column' } })
      expect(wrapper.classes()).toEqual(['weui-flex'])
    })
  })

  describe('wrap', () => {
    it('wrap 输出 flex-wrap: wrap', () => {
      const wrapper = mount(WeuiFlex, { props: { wrap: 'wrap' } })
      expect((wrapper.element as HTMLElement).style.flexWrap).toBe('wrap')
    })

    it('wrap-reverse 输出 flex-wrap: wrap-reverse', () => {
      const wrapper = mount(WeuiFlex, { props: { wrap: 'wrap-reverse' } })
      expect((wrapper.element as HTMLElement).style.flexWrap).toBe(
        'wrap-reverse',
      )
    })

    it('nowrap 输出 flex-wrap: nowrap', () => {
      const wrapper = mount(WeuiFlex, { props: { wrap: 'nowrap' } })
      expect((wrapper.element as HTMLElement).style.flexWrap).toBe('nowrap')
    })

    it('wrap 不追加任何类名', () => {
      const wrapper = mount(WeuiFlex, { props: { wrap: 'wrap' } })
      expect(wrapper.classes()).toEqual(['weui-flex'])
    })
  })

  describe('justify', () => {
    it('between 映射为 justify-content: space-between', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'between' } })
      expect((wrapper.element as HTMLElement).style.justifyContent).toBe(
        'space-between',
      )
    })

    it('around 映射为 justify-content: space-around', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'around' } })
      expect((wrapper.element as HTMLElement).style.justifyContent).toBe(
        'space-around',
      )
    })

    it('evenly 映射为 justify-content: space-evenly', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'evenly' } })
      expect((wrapper.element as HTMLElement).style.justifyContent).toBe(
        'space-evenly',
      )
    })

    it('center 输出 justify-content: center', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'center' } })
      expect((wrapper.element as HTMLElement).style.justifyContent).toBe(
        'center',
      )
    })

    it('end 映射为 justify-content: flex-end', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'end' } })
      expect((wrapper.element as HTMLElement).style.justifyContent).toBe(
        'flex-end',
      )
    })

    it('start 映射为 justify-content: flex-start', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'start' } })
      expect((wrapper.element as HTMLElement).style.justifyContent).toBe(
        'flex-start',
      )
    })

    it('justify 不追加任何类名', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'between' } })
      expect(wrapper.classes()).toEqual(['weui-flex'])
    })
  })

  describe('align', () => {
    it('start 映射为 align-items: flex-start', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'start' } })
      expect((wrapper.element as HTMLElement).style.alignItems).toBe(
        'flex-start',
      )
    })

    it('end 映射为 align-items: flex-end', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'end' } })
      expect((wrapper.element as HTMLElement).style.alignItems).toBe('flex-end')
    })

    it('baseline 输出 align-items: baseline', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'baseline' } })
      expect((wrapper.element as HTMLElement).style.alignItems).toBe('baseline')
    })

    it('stretch 输出 align-items: stretch', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'stretch' } })
      expect((wrapper.element as HTMLElement).style.alignItems).toBe('stretch')
    })

    it('center 输出 align-items: center', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'center' } })
      expect((wrapper.element as HTMLElement).style.alignItems).toBe('center')
    })

    it('align 不追加任何类名', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'stretch' } })
      expect(wrapper.classes()).toEqual(['weui-flex'])
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiFlex, { props: { extClass: 'my-flex' } })
      expect(wrapper.classes()).toContain('my-flex')
    })

    it('不传时不追加额外类名', () => {
      const wrapper = mount(WeuiFlex)
      expect(wrapper.classes()).toEqual(['weui-flex'])
    })
  })

  describe('默认插槽', () => {
    it('渲染默认插槽内容', () => {
      const wrapper = mount(WeuiFlex, {
        slots: { default: '<view class="slot-item">item</view>' },
      })
      expect(wrapper.html()).toContain('slot-item')
    })

    it('渲染多个 flex-item 子项', () => {
      const wrapper = mount(WeuiFlex, {
        slots: {
          default: [
            '<view class="item-a">A</view>',
            '<view class="item-b">B</view>',
          ],
        },
      })
      expect(wrapper.find('.item-a').exists()).toBe(true)
      expect(wrapper.find('.item-b').exists()).toBe(true)
    })
  })
})

describe('WeuiFlexItem', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-flex__item 类', () => {
      const wrapper = mount(WeuiFlexItem)
      expect(wrapper.classes()).toContain('weui-flex__item')
    })

    it('不传 flex 时不输出内联 style', () => {
      const wrapper = mount(WeuiFlexItem)
      expect(wrapper.attributes('style')).toBeUndefined()
    })
  })

  describe('flex', () => {
    it('设置 flex 时输出内联 flex 样式', () => {
      const wrapper = mount(WeuiFlexItem, { props: { flex: 2 } })
      expect(wrapper.attributes('style')).toContain('flex-grow: 2')
    })

    it('flex 为 0 时也输出内联样式', () => {
      const wrapper = mount(WeuiFlexItem, { props: { flex: 0 } })
      // flex:0 经浏览器规范化为 flex-basis:0px（0 被解析为长度）
      expect(wrapper.attributes('style')).toBeDefined()
      expect(wrapper.attributes('style')).toContain('flex-basis: 0')
    })

    it('flex 为 3 时输出 flex-grow: 3', () => {
      const wrapper = mount(WeuiFlexItem, { props: { flex: 3 } })
      expect(wrapper.attributes('style')).toContain('flex-grow: 3')
    })

    it('flex 为 2 时 flexGrow 属性为 2', () => {
      const wrapper = mount(WeuiFlexItem, { props: { flex: 2 } })
      expect((wrapper.element as HTMLElement).style.flexGrow).toBe('2')
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiFlexItem, {
        props: { extClass: 'my-item' },
      })
      expect(wrapper.classes()).toContain('my-item')
      expect(wrapper.classes()).toContain('weui-flex__item')
    })
  })

  describe('默认插槽', () => {
    it('渲染默认插槽内容', () => {
      const wrapper = mount(WeuiFlexItem, {
        slots: { default: '<view class="item-content">内容</view>' },
      })
      expect(wrapper.html()).toContain('item-content')
    })
  })

  describe('组合使用', () => {
    it('WeuiFlex 包裹多个 WeuiFlexItem', () => {
      const wrapper = mount(WeuiFlex, {
        slots: {
          default:
            '<weui-flex-item class="item-1">1</weui-flex-item><weui-flex-item class="item-2">2</weui-flex-item>',
        },
        global: { components: { WeuiFlexItem } },
      })
      expect(wrapper.findAll('.weui-flex__item')).toHaveLength(2)
    })
  })
})
