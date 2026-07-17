import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiCheckbox from '../checkbox.vue'
import WeuiCheckboxGroup from '../checkbox-group.vue'

describe('WeuiCheckbox', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-cell 和 weui-check__label 类', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
      })
      expect(wrapper.classes()).toContain('weui-cell')
      expect(wrapper.classes()).toContain('weui-check__label')
    })

    it('渲染 label 文字', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项文字' },
      })
      expect(wrapper.find('.weui-cell__bd').text()).toBe('选项文字')
    })

    it('使用默认 slot 替代 label', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1' },
        slots: { default: '自定义内容' },
      })
      expect(wrapper.find('.weui-cell__bd').text()).toBe('自定义内容')
    })
  })

  describe('多选模式（multi=true，默认）', () => {
    it('checkbox 图标在 header 区域', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
      })
      const hd = wrapper.find('.weui-cell__hd')
      expect(hd.exists()).toBe(true)
      expect(hd.find('checkbox').exists()).toBe(true)
      expect(hd.find('.weui-icon-checked').exists()).toBe(true)
    })

    it('footer 区域不渲染', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
      })
      expect(wrapper.find('.weui-cell__ft').exists()).toBe(false)
    })
  })

  describe('单选模式（multi=false，通过 group 注入）', () => {
    const groupProvide = {
      weuiCheckboxGroup: {
        multi: { value: false },
        modelValue: { value: [] },
        disabled: { value: false },
      },
    }

    it('radio 图标在 footer 区域', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
        global: { provide: groupProvide },
      })
      const ft = wrapper.find('.weui-cell__ft')
      expect(ft.exists()).toBe(true)
      expect(ft.find('radio').exists()).toBe(true)
      expect(ft.find('.weui-icon-checked').exists()).toBe(true)
    })

    it('header 区域不渲染 radio 图标', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
        global: { provide: groupProvide },
      })
      expect(wrapper.find('.weui-cell__hd').exists()).toBe(false)
    })
  })

  describe('选中状态', () => {
    it('独立使用时 checked=true', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: true },
      })
      expect(wrapper.find('checkbox').attributes('checked')).toBe('true')
    })

    it('独立使用时 checked=false（默认）', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
      })
      expect(wrapper.find('checkbox').attributes('checked')).toBe('false')
    })

    it('在 group 中根据 modelValue 判断选中', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '2', label: '选项B' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              multi: { value: true },
              modelValue: { value: ['1', '2'] },
              disabled: { value: false },
            },
          },
        },
      })
      expect(wrapper.find('checkbox').attributes('checked')).toBe('true')
    })

    it('在 group 中 value 不在 modelValue 中时未选中', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '3', label: '选项C' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              multi: { value: true },
              modelValue: { value: ['1', '2'] },
              disabled: { value: false },
            },
          },
        },
      })
      expect(wrapper.find('checkbox').attributes('checked')).toBe('false')
    })
  })

  describe('禁用状态', () => {
    it('disabled=true 追加 weui-cell_disabled 类', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', disabled: true },
      })
      expect(wrapper.classes()).toContain('weui-cell_disabled')
    })

    it('disabled=true 时 checkbox 传递 disabled 属性', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', disabled: true },
      })
      expect(wrapper.find('checkbox').attributes('disabled')).toBe('true')
    })

    it('group disabled=true 时子项也禁用', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              multi: { value: true },
              modelValue: { value: [] },
              disabled: { value: true },
            },
          },
        },
      })
      expect(wrapper.classes()).toContain('weui-cell_disabled')
      expect(wrapper.find('checkbox').attributes('disabled')).toBe('true')
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', extClass: 'my-item' },
      })
      expect(wrapper.classes()).toContain('my-item')
    })
  })

  describe('与 group 联动', () => {
    it('在 WeuiCheckboxGroup 中正确渲染', () => {
      const wrapper = mount(WeuiCheckboxGroup, {
        props: { modelValue: ['1'] },
        slots: {
          default: '<weui-checkbox value="1" label="选项A" /><weui-checkbox value="2" label="选项B" />',
        },
        global: {
          components: { 'weui-checkbox': WeuiCheckbox },
        },
      })
      expect(wrapper.find('.weui-cells_checkbox').exists()).toBe(true)
      expect(wrapper.findAllComponents(WeuiCheckbox)).toHaveLength(2)
    })
  })

  describe('独立使用交互', () => {
    it('独立使用时点击切换 update:checked 事件', async () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: false },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('update:checked')).toHaveLength(1)
      expect(wrapper.emitted('update:checked')![0]).toEqual([true])
    })

    it('独立使用时点击触发 change 事件并携带新状态', async () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: false },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.emitted('change')![0]).toEqual([true])
    })

    it('独立使用时从 checked=true 点击切换为 false', async () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: true },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('update:checked')![0]).toEqual([false])
      expect(wrapper.emitted('change')![0]).toEqual([false])
    })

    it('在 group 中点击不触发独立 update:checked', async () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              multi: { value: true },
              modelValue: { value: [] },
              disabled: { value: false },
            },
          },
        },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('update:checked')).toBeUndefined()
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  })
})
