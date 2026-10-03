import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeuiAgree from '../agree.vue'

describe('WeuiAgree', () => {
  describe('基础渲染', () => {
    it('根元素为 label 且带 weui-agree 和 weui-wa-hotarea 类', () => {
      const wrapper = mount(WeuiAgree)
      expect(wrapper.element.tagName).toBe('LABEL')
      expect(wrapper.classes()).toContain('weui-agree')
      expect(wrapper.classes()).toContain('weui-wa-hotarea')
    })

    it('包含 checkbox 和文本区域', () => {
      const wrapper = mount(WeuiAgree)
      expect(wrapper.find('.weui-agree__checkbox').exists()).toBe(true)
      expect(wrapper.find('.weui-agree__text').exists()).toBe(true)
    })

    it('默认不选中', () => {
      const wrapper = mount(WeuiAgree)
      const cb = wrapper.find('.weui-agree__checkbox')
      expect((cb.element as HTMLInputElement).checked).toBe(false)
    })
  })

  describe('modelValue', () => {
    it('modelValue=true 时 checkbox 选中', () => {
      const wrapper = mount(WeuiAgree, { props: { modelValue: true } })
      const cb = wrapper.find('.weui-agree__checkbox')
      expect((cb.element as HTMLInputElement).checked).toBe(true)
    })
  })

  describe('disabled', () => {
    it('disabled=true 时 checkbox 禁用', () => {
      const wrapper = mount(WeuiAgree, { props: { disabled: true } })
      const cb = wrapper.find('.weui-agree__checkbox')
      expect((cb.element as HTMLInputElement).disabled).toBe(true)
    })
  })

  describe('extClass', () => {
    it('extClass 追加到根元素', () => {
      const wrapper = mount(WeuiAgree, { props: { extClass: 'my-agree' } })
      expect(wrapper.classes()).toContain('my-agree')
    })
  })

  describe('状态样式', () => {
    it('warn=true 时添加官方警告类', () => {
      const wrapper = mount(WeuiAgree, { props: { warn: true } })
      expect(wrapper.classes()).toContain('weui-agree_warn')
    })

    it('animate=true 时添加官方动画类', () => {
      const wrapper = mount(WeuiAgree, { props: { animate: true } })
      expect(wrapper.classes()).toContain('weui-agree_animate')
    })
  })

  describe('default slot', () => {
    it('默认插槽内容渲染到 .weui-agree__text', () => {
      const wrapper = mount(WeuiAgree, {
        slots: { default: '同意<a href="#">相关条款</a>' },
      })
      const text = wrapper.find('.weui-agree__text')
      expect(text.html()).toContain('同意')
      expect(text.html()).toContain('相关条款')
    })
  })

  describe('事件', () => {
    it('点击 checkbox 触发 update:modelValue', async () => {
      const wrapper = mount(WeuiAgree, { props: { modelValue: false } })
      const cb = wrapper.find('.weui-agree__checkbox')
      await cb.setValue(true)
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    })

    it('点击 checkbox 触发 change', async () => {
      const wrapper = mount(WeuiAgree, { props: { modelValue: false } })
      const cb = wrapper.find('.weui-agree__checkbox')
      await cb.setValue(true)
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.emitted('change')![0]).toEqual([true])
    })
  })

  //小程序端样式与 H5 不一致的问题：
  // 小程序 <checkbox> 无法通过 appearance/background 变成官方圆形勾选框，
  // 官方 weui.css 为此提供了「零尺寸代理 + aria-checked 相邻兄弟选择器」写法：
  //   .weui-agree__checkbox-check[aria-checked="true"] + .weui-agree__checkbox {...}
  // 若不给原生 checkbox 挂 weui-agree__checkbox-check，小程序端将完全无样式。
  //
  // 注意：测试环境只渲染 H5 分支（非 H5 分支被 strip 掉），
  // 因此这里针对「构建期转换后的产物」断言，而非运行时 DOM。
  describe('小程序端结构', () => {
    // 复用构建脚本真实的条件编译 + 标签转换逻辑，避免测试与产物脱节
    const buildTemplate = async (platform: 'vue3' | 'uni-app') => {
      const { readFile } = await import('node:fs/promises')
      const { fileURLToPath } = await import('node:url')
      const { dirname, resolve } = await import('node:path')
      const src = await readFile(
        resolve(dirname(fileURLToPath(import.meta.url)), '../agree.vue'),
        'utf-8',
      )
      const { stripConditionalCompile, transformTemplateTags } = await import(
        '../../../scripts/transform-utils.mjs'
      )
      const stripped = stripConditionalCompile(src, platform)
      const out = platform === 'uni-app' ? transformTemplateTags(stripped) : stripped
      return out.slice(0, out.indexOf('</template>') + 11)
    }

    it('小程序产物给原生 checkbox 挂 weui-agree__checkbox-check 代理类', async () => {
      const tpl = await buildTemplate('uni-app')
      expect(tpl).toContain('class="weui-agree__checkbox-check"')
      // 视觉圆圈仍需保留，否则勾选态背景图无处施加
      expect(tpl).toContain('class="weui-agree__checkbox"')
    })

    it('代理 checkbox 排在视觉元素之前，保证 + 相邻兄弟选择器生效', async () => {
      const tpl = await buildTemplate('uni-app')
      const proxyIdx = tpl.indexOf('weui-agree__checkbox-check')
      const visualIdx = tpl.indexOf('class="weui-agree__checkbox"')
      expect(proxyIdx).toBeGreaterThan(-1)
      expect(visualIdx).toBeGreaterThan(proxyIdx)
    })

    it('小程序产物用 aria-checked 承载选中态', async () => {
      const tpl = await buildTemplate('uni-app')
      expect(tpl).toContain('aria-checked=')
    })

    it('小程序产物保留 value 与 disabled，维持交互与无障碍语义', async () => {
      const tpl = await buildTemplate('uni-app')
      expect(tpl).toContain('value="__weui_agree__"')
      expect(tpl).toContain(':disabled="disabled"')
    })

    it('H5 产物不含小程序代理类，仍是原生 input', async () => {
      const tpl = await buildTemplate('vue3')
      expect(tpl).toContain('type="checkbox"')
      expect(tpl).toContain('class="weui-agree__checkbox"')
      expect(tpl).not.toContain('weui-agree__checkbox-check')
    })
  })
})
