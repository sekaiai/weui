import { describe, it, expect } from 'vitest'
import { platformTransform, stripConditionalCompile, transformTemplateTags } from '../../packages/components/build-plugin'

describe('stripConditionalCompile', () => {
  const sample = `
const x = () => {
  // #ifdef H5
  doH5Thing()
  // #endif
  // #ifndef H5
  doUniAppThing()
  // #endif
}
`

  it('Vue 3 平台：保留 #ifdef H5 块，移除 #ifndef H5 块', () => {
    const result = stripConditionalCompile(sample, 'vue3')
    expect(result).toContain('doH5Thing()')
    expect(result).not.toContain('doUniAppThing()')
    expect(result).not.toContain('#ifdef')
    expect(result).not.toContain('#ifndef')
    expect(result).not.toContain('#endif')
  })

  it('uni-app 平台：移除 #ifdef H5 块，保留 #ifndef H5 块', () => {
    const result = stripConditionalCompile(sample, 'uni-app')
    expect(result).not.toContain('doH5Thing()')
    expect(result).toContain('doUniAppThing()')
    expect(result).not.toContain('#ifdef')
    expect(result).not.toContain('#ifndef')
    expect(result).not.toContain('#endif')
  })

  it('无条件编译注释时原样返回', () => {
    const plain = 'const x = 1\nconst y = 2\n'
    expect(stripConditionalCompile(plain, 'vue3')).toBe(plain)
    expect(stripConditionalCompile(plain, 'uni-app')).toBe(plain)
  })

  it('处理多个条件编译块', () => {
    const multi = `
// #ifdef H5
a()
// #endif
const mid = 1
// #ifndef H5
b()
// #endif
`
    const vue3Result = stripConditionalCompile(multi, 'vue3')
    expect(vue3Result).toContain('a()')
    expect(vue3Result).not.toContain('b()')
    expect(vue3Result).toContain('const mid = 1')

    const uniResult = stripConditionalCompile(multi, 'uni-app')
    expect(uniResult).not.toContain('a()')
    expect(uniResult).toContain('b()')
    expect(uniResult).toContain('const mid = 1')
  })

  it('处理整块被注释的条件编译代码（移除 // 前缀）', () => {
    // 有时条件编译块内的代码本身带 // 注释（说明性注释）
    const commented = `
// #ifdef H5
// 这是 H5 专用代码
h5Call()
// #endif
`
    const result = stripConditionalCompile(commented, 'vue3')
    expect(result).toContain('h5Call()')
    // 说明性注释可以保留或移除，但代码必须保留
  })
})

describe('transformTemplateTags', () => {
  it('将 div 转为 view', () => {
    const src = '<template><div class="x">内容</div></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<view class="x">')
    expect(result).toContain('</view>')
    expect(result).not.toContain('<div')
  })

  it('将 span 转为 text', () => {
    const src = '<template><span>文本</span></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<text>')
    expect(result).toContain('</text>')
    expect(result).not.toContain('<span')
  })

  it('将 img 转为 image', () => {
    const src = '<template><img src="a.png" /></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<image src="a.png"')
    expect(result).not.toContain('<img')
  })

  it('不替换 script 块内的内容', () => {
    const src = '<template><div></div></template><script>const x = "div"</script>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<view></view>')
    expect(result).toContain('const x = "div"')  // script 内字符串不变
  })

  it('不误替换含 view 子串的标签（如 scroll-view）', () => {
    const src = '<template><scroll-view><div></div></scroll-view></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<scroll-view>')
    expect(result).toContain('<view></view>')
  })

  it('处理自闭合标签', () => {
    const src = '<template><img src="a.png" /></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<image src="a.png" />')
  })

  it('不替换类名等字符串', () => {
    const src = '<template><div class="weui-cell__bd">x</div></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<view class="weui-cell__bd">')
    expect(result).toContain('weui-cell__bd')  // 类名不变
  })

  it('处理嵌套 template 标签（v-if/v-else）', () => {
    const src = '<template><div v-if="x"><span>是</span></div><div v-else><span>否</span></div></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<view v-if="x">')
    expect(result).toContain('<view v-else>')
    expect(result).toContain('<text>是</text>')
    expect(result).toContain('<text>否</text>')
  })
  it('maps semantic tags to uni-app tags', () => {
    const src = '<template><article><h2><em><i>text</i></em></h2></article></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<view><text><text><text>text</text></text></text></view>')
    expect(result).not.toMatch(/<\/?(?:article|h2|em|i)\b/)
  })

  it('maps real links to navigator/url', () => {
    const src = '<template><a :href="url" class="link">link</a></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<navigator :url="url" class="link">')
    expect(result).toContain('</navigator>')
    expect(result).not.toContain(':href=')
  })

  it('maps action pseudo-links to view without href', () => {
    const src = '<template><a href="javascript:" class="action">delete</a><a href="#">back</a></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain('<view class="action">')
    expect(result).toContain('<view>back</view>')
    expect(result).not.toContain('javascript:')
    expect(result).not.toContain('href=')
    expect(result).not.toContain('<navigator')
  })

  it('maps dynamic component tags and href bindings', () => {
    const src = '<template><component :is="url ? \'a\' : \'div\'" :href="url">content</component></template>'
    const result = transformTemplateTags(src)
    expect(result).toContain(":is=\"url ? 'navigator' : 'view'\"")
    expect(result).toContain(':url="url"')
    expect(result).not.toContain("'a'")
    expect(result).not.toContain("'div'")
  })
})

describe('platformTransform', () => {
  it('插件 name 为 weui-platform-transform', () => {
    const plugin = platformTransform({ platform: 'vue3' })
    expect(plugin.name).toBe('weui-platform-transform')
    expect(plugin.transform).toBeDefined()
  })

  it('Vue 3 平台：不做标签转换，移除 #ifndef H5 块', () => {
    const plugin = platformTransform({ platform: 'vue3' })
    const code = '<template><div class="x"></div></template>\n<script setup>const f = () => {\n// #ifdef H5\nh5()\n// #endif\n// #ifndef H5\nuni()\n// #endif\n}</script>'
    const result = plugin.transform!(code, 'test.vue')
    expect(result).not.toBeNull()
    const transformed = typeof result === 'string' ? result : result?.code
    expect(transformed).toContain('<div class="x">')  // 标签不变
    expect(transformed).toContain('h5()')
    expect(transformed).not.toContain('uni()')
  })

  it('uni-app 平台：做标签转换，移除 #ifdef H5 块', () => {
    const plugin = platformTransform({ platform: 'uni-app' })
    const code = '<template><div class="x"></div></template>\n<script setup>const f = () => {\n// #ifdef H5\nh5()\n// #endif\n// #ifndef H5\nuni()\n// #endif\n}</script>'
    const result = plugin.transform!(code, 'test.vue')
    expect(result).not.toBeNull()
    const transformed = typeof result === 'string' ? result : result?.code
    expect(transformed).toContain('<view class="x">')  // 标签已转换
    expect(transformed).not.toContain('h5()')
    expect(transformed).toContain('uni()')
  })

  it('替换 __IS_H5__ 常量（Vue 3 为 true，uni-app 为 false）', () => {
    const vue3Plugin = platformTransform({ platform: 'vue3' })
    const uniPlugin = platformTransform({ platform: 'uni-app' })
    const code = '<template><div v-if="__IS_H5__">h5</div><div v-else>uni</div></template>'

    const vue3Result = vue3Plugin.transform!(code, 'test.vue')
    const vue3Transformed = typeof vue3Result === 'string' ? vue3Result : vue3Result?.code
    expect(vue3Transformed).toContain('v-if="true"')

    const uniResult = uniPlugin.transform!(code, 'test.vue')
    const uniTransformed = typeof uniResult === 'string' ? uniResult : uniResult?.code
    expect(uniTransformed).toContain('v-if="false"')
  })

  it('非 .vue/.ts 文件不处理', () => {
    const plugin = platformTransform({ platform: 'vue3' })
    const result = plugin.transform!('some content', 'test.css')
    expect(result).toBeNull()
  })

  it('处理真实的 uploader.vue 片段（含 input[type=file] 和 __IS_H5__）', () => {
    const plugin = platformTransform({ platform: 'uni-app' })
    const code = `<template>
  <div :class="rootClass">
    <div v-if="canUpload" class="weui-uploader__input-box" @click="handleChoose">
      <input
        v-if="__IS_H5__"
        ref="fileInput"
        type="file"
        class="weui-uploader__input"
        @change="handleFileChange"
      />
      <div v-else class="weui-uploader__input" />
    </div>
  </div>
</template>
<script setup>
const handleChoose = () => {
  // #ifdef H5
  fileInput.value?.click()
  // #endif
  // #ifndef H5
  uni.chooseImage({ count: 1 })
  // #endif
}
// #ifdef H5
const handleFileChange = (e) => {}
// #endif
</script>`
    const result = plugin.transform!(code, 'uploader.vue')
    expect(result).not.toBeNull()
    const transformed = typeof result === 'string' ? result : result?.code
    // 标签转换
    expect(transformed).toContain('<view :class="rootClass">')
    expect(transformed).toContain('<view v-if="canUpload"')
    expect(transformed).toContain('<view v-else class="weui-uploader__input" />')
    // __IS_H5__ 替换为 false
    expect(transformed).toContain('v-if="false"')
    // #ifdef H5 块移除：函数定义 fileInput.value?.click() 和 const handleFileChange 应被移除
    // 注：模板中的 @change="handleFileChange" 引用会保留，因为我们的插件只移除条件编译注释块，
    // 不分析 v-if 条件。Vue 编译器会在编译期对 v-if="false" 分支做 tree-shaking。
    expect(transformed).not.toContain('fileInput.value?.click()')
    expect(transformed).not.toContain('const handleFileChange')
    // #ifndef H5 块保留
    expect(transformed).toContain('uni.chooseImage')
    // 条件编译注释标记清除
    expect(transformed).not.toContain('#ifdef')
    expect(transformed).not.toContain('#endif')
  })
})
