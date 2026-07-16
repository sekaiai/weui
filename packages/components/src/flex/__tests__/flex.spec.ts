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

    it('默认值不追加 direction/wrap/justify 类', () => {
      const wrapper = mount(WeuiFlex)
      // direction=row / wrap=nowrap / justify=start 均无额外类
      expect(wrapper.classes()).toEqual(['weui-flex'])
    })

    it('默认 align=center 不追加 align 类', () => {
      const wrapper = mount(WeuiFlex)
      expect(wrapper.classes()).not.toContain('weui-flex__align-center')
    })
  })

  describe('direction', () => {
    it('column 追加 weui-flex__direction-column', () => {
      const wrapper = mount(WeuiFlex, { props: { direction: 'column' } })
      expect(wrapper.classes()).toContain('weui-flex__direction-column')
    })

    it('row-reverse 追加 weui-flex__direction-row-reverse', () => {
      const wrapper = mount(WeuiFlex, { props: { direction: 'row-reverse' } })
      expect(wrapper.classes()).toContain('weui-flex__direction-row-reverse')
    })

    it('column-reverse 追加 weui-flex__direction-column-reverse', () => {
      const wrapper = mount(WeuiFlex, { props: { direction: 'column-reverse' } })
      expect(wrapper.classes()).toContain('weui-flex__direction-column-reverse')
    })

    it('row 不追加 direction 类', () => {
      const wrapper = mount(WeuiFlex, { props: { direction: 'row' } })
      expect(wrapper.classes()).not.toContain('weui-flex__direction-column')
      expect(wrapper.classes()).not.toContain('weui-flex__direction-row-reverse')
    })
  })

  describe('wrap', () => {
    it('wrap 追加 weui-flex__wrap-wrap', () => {
      const wrapper = mount(WeuiFlex, { props: { wrap: 'wrap' } })
      expect(wrapper.classes()).toContain('weui-flex__wrap-wrap')
    })

    it('wrap-reverse 追加 weui-flex__wrap-wrap-reverse', () => {
      const wrapper = mount(WeuiFlex, { props: { wrap: 'wrap-reverse' } })
      expect(wrapper.classes()).toContain('weui-flex__wrap-wrap-reverse')
    })

    it('nowrap 不追加 wrap 类', () => {
      const wrapper = mount(WeuiFlex, { props: { wrap: 'nowrap' } })
      expect(wrapper.classes()).not.toContain('weui-flex__wrap-wrap')
      expect(wrapper.classes()).not.toContain('weui-flex__wrap-wrap-reverse')
    })
  })

  describe('justify', () => {
    it('between 追加 weui-flex__justify-between', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'between' } })
      expect(wrapper.classes()).toContain('weui-flex__justify-between')
    })

    it('around 追加 weui-flex__justify-around', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'around' } })
      expect(wrapper.classes()).toContain('weui-flex__justify-around')
    })

    it('center 追加 weui-flex__justify-center', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'center' } })
      expect(wrapper.classes()).toContain('weui-flex__justify-center')
    })

    it('end 追加 weui-flex__justify-end', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'end' } })
      expect(wrapper.classes()).toContain('weui-flex__justify-end')
    })

    it('start 不追加 justify 类', () => {
      const wrapper = mount(WeuiFlex, { props: { justify: 'start' } })
      expect(wrapper.classes()).not.toContain('weui-flex__justify-between')
      expect(wrapper.classes()).not.toContain('weui-flex__justify-center')
    })
  })

  describe('align', () => {
    it('start 追加 weui-flex__align-start', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'start' } })
      expect(wrapper.classes()).toContain('weui-flex__align-start')
    })

    it('end 追加 weui-flex__align-end', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'end' } })
      expect(wrapper.classes()).toContain('weui-flex__align-end')
    })

    it('baseline 追加 weui-flex__align-baseline', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'baseline' } })
      expect(wrapper.classes()).toContain('weui-flex__align-baseline')
    })

    it('stretch 追加 weui-flex__align-stretch', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'stretch' } })
      expect(wrapper.classes()).toContain('weui-flex__align-stretch')
    })

    it('center（默认）不追加 align 类', () => {
      const wrapper = mount(WeuiFlex, { props: { align: 'center' } })
      expect(wrapper.classes()).not.toContain('weui-flex__align-start')
      expect(wrapper.classes()).not.toContain('weui-flex__align-end')
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
