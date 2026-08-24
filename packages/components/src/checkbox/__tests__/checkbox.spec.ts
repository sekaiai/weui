import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
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

  describe('多选模式', () => {
    it('H5 端 checkbox 渲染为 input[type=checkbox] 在 header 区域', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
      })
      const hd = wrapper.find('.weui-cell__hd')
      expect(hd.exists()).toBe(true)
      const checkboxEl = hd.find('input[type="checkbox"]')
      expect(checkboxEl.exists()).toBe(true)
      expect(checkboxEl.classes()).toContain('weui-check')
      expect(hd.find('.weui-icon-checked').exists()).toBe(true)
    })

    it('footer 区域不渲染', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
      })
      expect(wrapper.find('.weui-cell__ft').exists()).toBe(false)
    })
  })

  describe('选中状态', () => {
    it('独立使用时 checked=true', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: true },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeDefined()
    })

    it('独立使用时 checked=false（默认）', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
      })
      // input[type=checkbox] 的 checked 属性绑定 false 时不存在该属性
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeUndefined()
    })

    it('在 group 中根据 modelValue 判断选中', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '2', label: '选项B' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              modelValue: { value: ['1', '2'] },
              disabled: { value: false },
            },
          },
        },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeDefined()
    })

    it('在 group 中 value 不在 modelValue 中时未选中', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '3', label: '选项C' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              modelValue: { value: ['1', '2'] },
              disabled: { value: false },
            },
          },
        },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeUndefined()
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
      expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined()
    })

    it('group disabled=true 时子项也禁用', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              modelValue: { value: [] },
              disabled: { value: true },
            },
          },
        },
      })
      expect(wrapper.classes()).toContain('weui-cell_disabled')
      expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined()
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
    it('独立使用时勾选触发 update:checked 事件', async () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: false },
      })
      await wrapper.find('input[type="checkbox"]').setValue(true)
      expect(wrapper.emitted('update:checked')).toHaveLength(1)
      expect(wrapper.emitted('update:checked')![0]).toEqual([true])
    })

    it('独立使用时勾选触发 change 事件并携带新状态', async () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: false },
      })
      await wrapper.find('input[type="checkbox"]').setValue(true)
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.emitted('change')![0]).toEqual([true])
    })

    it('独立使用时从 checked=true 取消勾选切换为 false', async () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: true },
      })
      await wrapper.find('input[type="checkbox"]').setValue(false)
      expect(wrapper.emitted('update:checked')![0]).toEqual([false])
      expect(wrapper.emitted('change')![0]).toEqual([false])
    })

    it('在 group 中勾选不触发独立 update:checked', async () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              modelValue: { value: [] },
              disabled: { value: false },
              toggle: () => {},
            },
          },
        },
      })
      await wrapper.find('input[type="checkbox"]').setValue(true)
      expect(wrapper.emitted('update:checked')).toBeUndefined()
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  })

  describe('选中状态（input:checked 数据驱动）', () => {
    it('独立使用时 checked=true 时 input 选中', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: true },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeDefined()
    })

    it('独立使用时 checked=false 时 input 未选中', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '1', label: '选项', checked: false },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeUndefined()
    })

    it('独立使用时勾选后 input 状态与 v-model 联动', async () => {
      const checked = ref(false)
      const wrapper = mount(
        defineComponent({
          components: { WeuiCheckbox },
          template: '<weui-checkbox v-model:checked="c" value="1" label="选项" />',
          setup() {
            return { c: checked }
          },
        }),
      )
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeUndefined()
      await wrapper.find('input[type="checkbox"]').setValue(true)
      expect(checked.value).toBe(true)
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeDefined()
    })

    it('独立使用时取消勾选后 input 状态移除', async () => {
      const checked = ref(true)
      const wrapper = mount(
        defineComponent({
          components: { WeuiCheckbox },
          template: '<weui-checkbox v-model:checked="c" value="1" label="选项" />',
          setup() {
            return { c: checked }
          },
        }),
      )
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeDefined()
      await wrapper.find('input[type="checkbox"]').setValue(false)
      expect(checked.value).toBe(false)
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeUndefined()
    })

    it('在 group 中按 modelValue 判断 input 选中', () => {
      const wrapper = mount(WeuiCheckbox, {
        props: { value: '2', label: '选项B' },
        global: {
          provide: {
            weuiCheckboxGroup: {
              modelValue: { value: ['1', '2'] },
              disabled: { value: false },
            },
          },
        },
      })
      expect(wrapper.find('input[type="checkbox"]').attributes('checked')).toBeDefined()
    })
  })
})
