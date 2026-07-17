import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiSearchbar from '../searchbar.vue'

describe('WeuiSearchbar', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-search-bar 类', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.classes()).toContain('weui-search-bar')
    })

    it('内含原生 input 标签且带 weui-search-bar__input 类', () => {
      const wrapper = mount(WeuiSearchbar)
      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(input.classes()).toContain('weui-search-bar__input')
    })

    it('包含 weui-search-bar__box 容器', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.find('.weui-search-bar__box').exists()).toBe(true)
    })

    it('包含 weui-search-bar__label 占位区域', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.find('.weui-search-bar__label').exists()).toBe(true)
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiSearchbar, { props: { extClass: 'my-searchbar' } })
      expect(wrapper.classes()).toContain('my-searchbar')
    })

    it('不传时不追加额外类名', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.classes()).toEqual(['weui-search-bar'])
    })
  })

  describe('modelValue', () => {
    it('将 modelValue 绑定到 input 的 value 属性', () => {
      const wrapper = mount(WeuiSearchbar, { props: { modelValue: 'hello' } })
      expect(wrapper.find('input').attributes('value')).toBe('hello')
    })

    it('默认 modelValue 为空字符串', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.find('input').attributes('value')).toBe('')
    })

    it('input 事件触发 update:modelValue', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').setValue('world')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['world'])
    })
  })

  describe('placeholder', () => {
    it('默认 placeholder 为"搜索"且渲染到 label', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.find('.weui-search-bar__label').text()).toBe('搜索')
    })

    it('自定义 placeholder 传递到 input 和 label', () => {
      const wrapper = mount(WeuiSearchbar, { props: { placeholder: '请输入关键词' } })
      expect(wrapper.find('input').attributes('placeholder')).toBe('请输入关键词')
      expect(wrapper.find('.weui-search-bar__label').text()).toBe('请输入关键词')
    })
  })

  describe('聚焦状态', () => {
    it('默认未聚焦时不带 weui-search-bar_focusing 类', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.classes()).not.toContain('weui-search-bar_focusing')
    })

    it('focus 事件添加 weui-search-bar_focusing 类', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
    })

    it('blur 事件移除 weui-search-bar_focusing 类', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
      await wrapper.find('input').trigger('blur')
      expect(wrapper.classes()).not.toContain('weui-search-bar_focusing')
    })

    it('focus prop 为 true 时初始状态为聚焦', () => {
      const wrapper = mount(WeuiSearchbar, { props: { focus: true } })
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
    })

    it('点击 label 区域进入聚焦状态', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('.weui-search-bar__label').trigger('click')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
    })

    it('blur 后再次点击 label 仍能进入聚焦状态（二次点击 label 聚焦）', async () => {
      const wrapper = mount(WeuiSearchbar)
      // 第一次点击 label 聚焦
      await wrapper.find('.weui-search-bar__label').trigger('click')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
      // blur 后聚焦被重置
      await wrapper.find('input').trigger('blur')
      expect(wrapper.classes()).not.toContain('weui-search-bar_focusing')
      // 二次点击 label 仍能进入聚焦状态
      await wrapper.find('.weui-search-bar__label').trigger('click')
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
    })

    it('focus prop 变化时响应并切换聚焦状态', async () => {
      const wrapper = mount(WeuiSearchbar, { props: { focus: false } })
      expect(wrapper.classes()).not.toContain('weui-search-bar_focusing')
      await wrapper.setProps({ focus: true })
      expect(wrapper.classes()).toContain('weui-search-bar_focusing')
      await wrapper.setProps({ focus: false })
      expect(wrapper.classes()).not.toContain('weui-search-bar_focusing')
    })

    it('focus 事件透传', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('blur 事件透传', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })
  })

  describe('取消按钮', () => {
    it('未聚焦时不显示取消按钮', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.find('.weui-search-bar__cancel-btn').exists()).toBe(false)
    })

    it('聚焦时显示取消按钮', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('.weui-search-bar__cancel-btn').exists()).toBe(true)
    })

    it('默认取消按钮文字为"取消"', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('.weui-search-bar__cancel-btn').text()).toBe('取消')
    })

    it('自定义 cancelText', async () => {
      const wrapper = mount(WeuiSearchbar, { props: { cancelText: '返回' } })
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('.weui-search-bar__cancel-btn').text()).toBe('返回')
    })

    it('点击取消按钮触发 cancel 事件并退出聚焦', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('focus')
      await wrapper.find('.weui-search-bar__cancel-btn').trigger('click')
      expect(wrapper.emitted('cancel')).toHaveLength(1)
      expect(wrapper.classes()).not.toContain('weui-search-bar_focusing')
    })
  })

  describe('清除按钮', () => {
    it('无值时不显示清除图标', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.find('.weui-icon-clear').exists()).toBe(false)
    })

    it('有值时显示清除图标', () => {
      const wrapper = mount(WeuiSearchbar, { props: { modelValue: 'hello' } })
      expect(wrapper.find('.weui-icon-clear').exists()).toBe(true)
    })

    it('点击清除按钮触发 clear 事件并清空值', async () => {
      const wrapper = mount(WeuiSearchbar, { props: { modelValue: 'hello' } })
      await wrapper.find('.weui-icon-clear').trigger('click')
      expect(wrapper.emitted('clear')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
    })
  })

  describe('搜索按钮', () => {
    it('不设置 searchButtonText 时不显示搜索按钮', () => {
      const wrapper = mount(WeuiSearchbar)
      expect(wrapper.find('.weui-search-bar__btn').exists()).toBe(false)
    })

    it('设置 searchButtonText 时显示搜索按钮', () => {
      const wrapper = mount(WeuiSearchbar, { props: { searchButtonText: '搜索' } })
      expect(wrapper.find('.weui-search-bar__btn').exists()).toBe(true)
      expect(wrapper.find('.weui-search-bar__btn').text()).toBe('搜索')
    })

    it('设置 searchButtonText 时不显示取消按钮', async () => {
      const wrapper = mount(WeuiSearchbar, { props: { searchButtonText: '搜索' } })
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('.weui-search-bar__cancel-btn').exists()).toBe(false)
    })

    it('点击搜索按钮触发 search 事件', async () => {
      const wrapper = mount(WeuiSearchbar, {
        props: { modelValue: 'keyword', searchButtonText: '搜索' },
      })
      await wrapper.find('.weui-search-bar__btn').trigger('click')
      expect(wrapper.emitted('search')).toHaveLength(1)
      expect(wrapper.emitted('search')![0]).toEqual(['keyword'])
    })
  })

  describe('confirm 与 search 事件', () => {
    it('confirm 事件透传', async () => {
      const wrapper = mount(WeuiSearchbar)
      await wrapper.find('input').trigger('confirm')
      expect(wrapper.emitted('confirm')).toHaveLength(1)
    })

    it('confirm 时同时触发 search 事件并携带当前值', async () => {
      const wrapper = mount(WeuiSearchbar, { props: { modelValue: 'hello' } })
      await wrapper.find('input').trigger('confirm')
      expect(wrapper.emitted('search')).toHaveLength(1)
      expect(wrapper.emitted('search')![0]).toEqual(['hello'])
    })
  })
})
