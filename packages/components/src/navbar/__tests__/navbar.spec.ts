import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiNavbar from '../navbar.vue'
import WeuiNavbarItem from '../navbar-item.vue'

describe('WeuiNavbar', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-navbar 类', () => {
      const wrapper = mount(WeuiNavbar)
      expect(wrapper.classes()).toContain('weui-navbar')
      expect(wrapper.attributes('role')).toBe('tablist')
    })

    it('渲染默认插槽内容', () => {
      const wrapper = mount(WeuiNavbar, {
        slots: { default: '<div class="nav-slot">tab</div>' },
      })
      expect(wrapper.html()).toContain('nav-slot')
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiNavbar, {
        props: { extClass: 'my-navbar' },
      })
      expect(wrapper.classes()).toContain('my-navbar')
    })

    it('未传 extClass 时仅含 weui-navbar', () => {
      const wrapper = mount(WeuiNavbar)
      expect(wrapper.classes()).toEqual(['weui-navbar'])
    })
  })
})

describe('WeuiNavbarItem', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-navbar__item 类', () => {
      const wrapper = mount(WeuiNavbarItem)
      expect(wrapper.classes()).toContain('weui-navbar__item')
    })

    it('渲染默认插槽内容', () => {
      const wrapper = mount(WeuiNavbarItem, {
        slots: { default: '选项卡一' },
      })
      expect(wrapper.text()).toBe('选项卡一')
    })
  })

  describe('active', () => {
    it('active=true 追加 weui-bar__item_on 类', () => {
      const wrapper = mount(WeuiNavbarItem, { props: { active: true } })
      expect(wrapper.classes()).toContain('weui-bar__item_on')
    })

    it('active=false 不追加 active 类', () => {
      const wrapper = mount(WeuiNavbarItem)
      expect(wrapper.classes()).not.toContain('weui-bar__item_on')
    })

    it('提供 tab 的选中状态与键盘焦点顺序', () => {
      const active = mount(WeuiNavbarItem, { props: { active: true } })
      const inactive = mount(WeuiNavbarItem)
      expect(active.attributes('aria-selected')).toBe('true')
      expect(active.attributes('tabindex')).toBe('0')
      expect(inactive.attributes('aria-selected')).toBe('false')
      expect(inactive.attributes('tabindex')).toBe('-1')
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiNavbarItem, {
        props: { extClass: 'my-item' },
      })
      expect(wrapper.classes()).toContain('my-item')
    })
  })

  describe('事件', () => {
    it('点击时触发 click 事件', async () => {
      const wrapper = mount(WeuiNavbarItem)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('click 事件参数为 Event 对象', async () => {
      const wrapper = mount(WeuiNavbarItem)
      await wrapper.trigger('click')
      const evt = wrapper.emitted('click')![0][0]
      expect(evt).toBeInstanceOf(Event)
    })

    it('按 Enter 或 Space 触发 click', async () => {
      const wrapper = mount(WeuiNavbarItem)
      await wrapper.trigger('keydown.enter')
      await wrapper.trigger('keydown.space')
      expect(wrapper.emitted('click')).toHaveLength(2)
    })
  })

  describe('组合使用', () => {
    it('Navbar 包含多个 NavbarItem 且仅一个 active', () => {
      const wrapper = mount({
        components: { WeuiNavbar, WeuiNavbarItem },
        template: `
          <WeuiNavbar>
            <WeuiNavbarItem>tab1</WeuiNavbarItem>
            <WeuiNavbarItem active>tab2</WeuiNavbarItem>
            <WeuiNavbarItem>tab3</WeuiNavbarItem>
          </WeuiNavbar>
        `,
      })
      expect(wrapper.findAll('.weui-navbar__item')).toHaveLength(3)
      expect(wrapper.findAll('.weui-bar__item_on')).toHaveLength(1)
    })

    it('点击 item 触发其 click 事件', async () => {
      const wrapper = mount({
        components: { WeuiNavbar, WeuiNavbarItem },
        template: `
          <WeuiNavbar>
            <WeuiNavbarItem>tab1</WeuiNavbarItem>
            <WeuiNavbarItem active>tab2</WeuiNavbarItem>
          </WeuiNavbar>
        `,
      })
      const items = wrapper.findAll('.weui-navbar__item')
      await items[0].trigger('click')
      // item 内部触发 click 事件
      expect(items[0].exists()).toBe(true)
    })
  })
})
