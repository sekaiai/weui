import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiCellGroup from '../cell-group.vue'

describe('WeuiCellGroup', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-cells__group 类', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.classes()).toContain('weui-cells__group')
    })

    it('内部包含 weui-cells 容器', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.find('.weui-cells').exists()).toBe(true)
    })

    it('内部包含 weui-cells__title 容器', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.find('.weui-cells__title').exists()).toBe(true)
    })

    it('内部包含 weui-cells__tips 容器', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.find('.weui-cells__tips').exists()).toBe(true)
    })

    it('weui-cells 容器不追加废弃的 weui-cells_after-title 类', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.find('.weui-cells').classes()).not.toContain('weui-cells_after-title')
    })
  })

  describe('title', () => {
    it('渲染组标题', () => {
      const wrapper = mount(WeuiCellGroup, { props: { title: '分组标题' } })
      const title = wrapper.find('.weui-cells__title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('分组标题')
    })

    it('title 为空时使用 title slot', () => {
      const wrapper = mount(WeuiCellGroup, {
        slots: { title: '自定义标题' },
      })
      expect(wrapper.find('.weui-cells__title').text()).toBe('自定义标题')
    })

    it('不传 title 时标题区域为空', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.find('.weui-cells__title').exists()).toBe(true)
      expect(wrapper.find('.weui-cells__title').text()).toBe('')
    })
  })

  describe('footer', () => {
    it('渲染底部说明', () => {
      const wrapper = mount(WeuiCellGroup, { props: { footer: '底部说明' } })
      const tips = wrapper.find('.weui-cells__tips')
      expect(tips.exists()).toBe(true)
      expect(tips.text()).toBe('底部说明')
    })

    it('footer 为空时使用 footer slot', () => {
      const wrapper = mount(WeuiCellGroup, {
        slots: { footer: '自定义底部' },
      })
      expect(wrapper.find('.weui-cells__tips').text()).toBe('自定义底部')
    })

    it('不传 footer 时底部说明区域为空', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.find('.weui-cells__tips').exists()).toBe(true)
      expect(wrapper.find('.weui-cells__tips').text()).toBe('')
    })
  })

  describe('form', () => {
    it('form=true 追加 weui-cells__group_form 到组', () => {
      const wrapper = mount(WeuiCellGroup, { props: { form: true } })
      expect(wrapper.classes()).toContain('weui-cells__group_form')
    })

    it('form=true 时 weui-cells 容器追加 weui-cells_form', () => {
      const wrapper = mount(WeuiCellGroup, { props: { form: true } })
      expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_form')
    })

    it('form=false 时不追加 form 类', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.classes()).not.toContain('weui-cells__group_form')
    })
  })

  describe('radio', () => {
    it('radio=true 时 weui-cells 追加 weui-cells_radio', () => {
      const wrapper = mount(WeuiCellGroup, { props: { radio: true } })
      expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_radio')
    })

    it('radio=false 不追加 radio 类', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.find('.weui-cells').classes()).not.toContain('weui-cells_radio')
    })
  })

  describe('checkbox', () => {
    it('checkbox=true 时 weui-cells 追加 weui-cells_checkbox', () => {
      const wrapper = mount(WeuiCellGroup, { props: { checkbox: true } })
      expect(wrapper.find('.weui-cells').classes()).toContain('weui-cells_checkbox')
    })

    it('checkbox=false 不追加 checkbox 类', () => {
      const wrapper = mount(WeuiCellGroup)
      expect(wrapper.find('.weui-cells').classes()).not.toContain('weui-cells_checkbox')
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiCellGroup, {
        props: { extClass: 'my-group' },
      })
      expect(wrapper.classes()).toContain('my-group')
    })
  })

  describe('默认插槽', () => {
    it('渲染默认插槽内容到 weui-cells 容器内', () => {
      const wrapper = mount(WeuiCellGroup, {
        slots: { default: '<div class="cell-item">cell</div>' },
      })
      const cells = wrapper.find('.weui-cells')
      expect(cells.html()).toContain('cell-item')
    })
  })
})
