import { describe, it, expect } from 'vitest'
import { createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Vue3Adapter } from '../../packages/components/src/vue3-adapter'

describe('Vue3Adapter', () => {
  it('将 view 标签渲染为 div', async () => {
    const app = createApp({
      render: () => h('view', { class: 'test-view' }, '内容'),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('<div class="test-view"')
    expect(html).toContain('内容')
    expect(html).not.toContain('<view')
  })

  it('将 text 标签渲染为 span', async () => {
    const app = createApp({
      render: () => h('text', { class: 'test-text' }, '文本'),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('<span class="test-text"')
    expect(html).toContain('文本')
    expect(html).not.toContain('<text')
  })

  it('将 image 标签渲染为 img', async () => {
    const app = createApp({
      render: () => h('image', { src: 'https://example.com/a.png', alt: '图' }),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('<img')
    expect(html).toContain('src="https://example.com/a.png"')
    expect(html).toContain('alt="图"')
    expect(html).not.toContain('<image')
  })

  it('透传未声明的 attrs（如 style、data-*）', async () => {
    const app = createApp({
      render: () => h('view', { style: 'color: red', 'data-id': '123' }, 'x'),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('style="color: red"')
    expect(html).toContain('data-id="123"')
  })

  it('支持插槽内容', async () => {
    const app = createApp({
      render: () => h('view', null, () => [h('text', null, '子文本')]),
    })
    app.use(Vue3Adapter)
    const html = await renderToString(app)
    expect(html).toContain('<div')
    expect(html).toContain('<span')
    expect(html).toContain('子文本')
  })
})
