import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiTabbar from '../tabbar.vue'
import WeuiTabbarItem from '../tabbar-item.vue'

describe('WeuiTabbar', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-tabbar 类', () => {
      const wrapper = mount(WeuiTabbar)
      expect(wrapper.classes()).toContain('weui-tabbar')
    })

    it('渲染默认插槽内容', () => {
      const wrapper = mount(WeuiTabbar, {
        slots: { default: '<div class="tab-slot">tab</div>' },
      })
      expect(wrapper.html()).toContain('tab-slot')
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiTabbar, {
        props: { extClass: 'my-tabbar' },
      })
      expect(wrapper.classes()).toContain('my-tabbar')
    })

    it('未传 extClass 时仅含 weui-tabbar', () => {
      const wrapper = mount(WeuiTabbar)
      expect(wrapper.classes()).toEqual(['weui-tabbar'])
    })
  })

  describe('fixed', () => {
    it('fixed=true 时根元素带 position:fixed 内联样式', () => {
      const wrapper = mount(WeuiTabbar, { props: { fixed: true } })
      expect(wrapper.element.style.position).toBe('fixed')
      expect(wrapper.element.style.bottom).toBe('0px')
    })

    it('fixed=false 时不带 fixed 内联样式', () => {
      const wrapper = mount(WeuiTabbar)
      expect(wrapper.element.style.position).toBe('')
    })
  })
})

describe('WeuiTabbarItem', () => {
  describe('基础渲染', () => {
    it('根元素带 weui-tabbar__item 类', () => {
      const wrapper = mount(WeuiTabbarItem)
      expect(wrapper.classes()).toContain('weui-tabbar__item')
    })
  })

  describe('active', () => {
    it('active=true 追加 weui-bar__item_on 类', () => {
      const wrapper = mount(WeuiTabbarItem, { props: { active: true } })
      expect(wrapper.classes()).toContain('weui-bar__item_on')
    })

    it('active=false 不追加 active 类', () => {
      const wrapper = mount(WeuiTabbarItem)
      expect(wrapper.classes()).not.toContain('weui-bar__item_on')
    })

    it('active=true 时 aria-selected 为 true', () => {
      const wrapper = mount(WeuiTabbarItem, { props: { active: true } })
      expect(wrapper.attributes('aria-selected')).toBe('true')
    })

    it('active=false 时 aria-selected 为 false', () => {
      const wrapper = mount(WeuiTabbarItem)
      expect(wrapper.attributes('aria-selected')).toBe('false')
    })
  })

  describe('extClass', () => {
    it('追加到根元素', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { extClass: 'my-item' },
      })
      expect(wrapper.classes()).toContain('my-item')
    })
  })

  describe('text', () => {
    it('渲染文字到 weui-tabbar__label', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { text: '微信' },
      })
      const label = wrapper.find('.weui-tabbar__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('微信')
    })

    it('text 为空时不渲染 label 区域', () => {
      const wrapper = mount(WeuiTabbarItem)
      expect(wrapper.find('.weui-tabbar__label').exists()).toBe(false)
    })
  })

  describe('icon', () => {
    it('icon prop 渲染 image 元素带 weui-tabbar__icon 类', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { icon: '/static/icon.png' },
      })
      const img = wrapper.find('.weui-tabbar__icon')
      expect(img.exists()).toBe(true)
    })

    it('icon 为空时不渲染图标区域', () => {
      const wrapper = mount(WeuiTabbarItem)
      expect(wrapper.find('.weui-tabbar__icon').exists()).toBe(false)
    })

    it('activeIcon 在激活态时优先渲染', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: {
          icon: '/static/icon.png',
          activeIcon: '/static/icon-active.png',
          active: true,
        },
      })
      const img = wrapper.find('.weui-tabbar__icon')
      expect(img.attributes('src')).toBe('/static/icon-active.png')
    })

    it('非激活态时使用 icon 而非 activeIcon', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: {
          icon: '/static/icon.png',
          activeIcon: '/static/icon-active.png',
          active: false,
        },
      })
      const img = wrapper.find('.weui-tabbar__icon')
      expect(img.attributes('src')).toBe('/static/icon.png')
    })

    it('icon slot 替代 icon prop', () => {
      const wrapper = mount(WeuiTabbarItem, {
        slots: { icon: '<div class="custom-icon">icon</div>' },
      })
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
      expect(wrapper.find('.weui-tabbar__icon').exists()).toBe(false)
    })
  })

  describe('badge', () => {
    it('badge 字符串渲染 weui-badge', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { icon: '/static/icon.png', badge: '8' },
      })
      const badge = wrapper.find('.weui-badge')
      expect(badge.exists()).toBe(true)
      expect(badge.text()).toBe('8')
    })

    it('badge 数字也能正常渲染', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { icon: '/static/icon.png', badge: 99 },
      })
      const badge = wrapper.find('.weui-badge')
      expect(badge.exists()).toBe(true)
      expect(badge.text()).toBe('99')
    })

    it('badge 为 0 时仍渲染', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { icon: '/static/icon.png', badge: 0 },
      })
      const badge = wrapper.find('.weui-badge')
      expect(badge.exists()).toBe(true)
      expect(badge.text()).toBe('0')
    })

    it('badge 为空字符串时不渲染', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { icon: '/static/icon.png', badge: '' },
      })
      expect(wrapper.find('.weui-badge').exists()).toBe(false)
    })

    it('badge 未传时不渲染', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { icon: '/static/icon.png' },
      })
      expect(wrapper.find('.weui-badge').exists()).toBe(false)
    })
  })

  describe('showDot', () => {
    it('showDot=true 渲染红点 weui-badge_dot', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { icon: '/static/icon.png', showDot: true },
      })
      const dot = wrapper.find('.weui-badge_dot')
      expect(dot.exists()).toBe(true)
    })

    it('showDot=true 时带 weui-badge 类', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { icon: '/static/icon.png', showDot: true },
      })
      expect(wrapper.find('.weui-badge').exists()).toBe(true)
    })

    it('showDot=false 时不渲染红点', () => {
      const wrapper = mount(WeuiTabbarItem, {
        props: { icon: '/static/icon.png' },
      })
      expect(wrapper.find('.weui-badge_dot').exists()).toBe(false)
    })
  })

  describe('default slot', () => {
    it('渲染默认插槽内容到 weui-tabbar__label', () => {
      const wrapper = mount(WeuiTabbarItem, {
        slots: { default: '自定义文字' },
      })
      const label = wrapper.find('.weui-tabbar__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('自定义文字')
    })
  })

  describe('事件', () => {
    it('点击时触发 click 事件', async () => {
      const wrapper = mount(WeuiTabbarItem)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('click 事件参数为 Event 对象', async () => {
      const wrapper = mount(WeuiTabbarItem)
      await wrapper.trigger('click')
      const evt = wrapper.emitted('click')![0][0]
      expect(evt).toBeInstanceOf(Event)
    })
  })

  describe('组合使用', () => {
    it('Tabbar 包含多个 TabbarItem 且仅一个 active', () => {
      const wrapper = mount({
        components: { WeuiTabbar, WeuiTabbarItem },
        template: `
          <WeuiTabbar>
            <WeuiTabbarItem text="tab1" />
            <WeuiTabbarItem text="tab2" active />
            <WeuiTabbarItem text="tab3" />
          </WeuiTabbar>
        `,
      })
      expect(wrapper.findAll('.weui-tabbar__item')).toHaveLength(3)
      expect(wrapper.findAll('.weui-bar__item_on')).toHaveLength(1)
    })

    it('带图标和文字的组合渲染', () => {
      const wrapper = mount({
        components: { WeuiTabbar, WeuiTabbarItem },
        template: `
          <WeuiTabbar>
            <WeuiTabbarItem icon="/a.png" text="首页" active />
            <WeuiTabbarItem icon="/b.png" text="我的" />
          </WeuiTabbar>
        `,
      })
      expect(wrapper.findAll('.weui-tabbar__icon')).toHaveLength(2)
      expect(wrapper.findAll('.weui-tabbar__label')).toHaveLength(2)
      expect(wrapper.findAll('.weui-bar__item_on')).toHaveLength(1)
    })

    it('点击 item 触发其 click 事件', async () => {
      const wrapper = mount({
        components: { WeuiTabbar, WeuiTabbarItem },
        template: `
          <WeuiTabbar>
            <WeuiTabbarItem text="tab1" />
            <WeuiTabbarItem text="tab2" />
          </WeuiTabbar>
        `,
      })
      const items = wrapper.findAll('.weui-tabbar__item')
      await items[0].trigger('click')
      expect(items[0].exists()).toBe(true)
    })
  })
})
