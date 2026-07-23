import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"介绍","description":"","frontmatter":{},"headers":[],"relativePath":"guide/introduce.md","filePath":"guide/introduce.md","lastUpdated":1784197154000}');
const _sfc_main = { name: "guide/introduce.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h1><p>WeUI Design Vue 是一套基于 uni-app 的 WeUI 组件库，主目标微信小程序，兼 H5。</p><h2 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-label="Permalink to &quot;特性&quot;">​</a></h2><ul><li>视觉与 <a href="https://weui.io/" target="_blank" rel="noreferrer">weui.io</a> 完全一致</li><li>基于 uni-app，一套代码同时运行在微信小程序与 H5</li><li>组件 API 对齐 <a href="https://wechat-miniprogram.github.io/weui/docs/" target="_blank" rel="noreferrer">weui-miniprogram</a> 官方</li><li>Vue 3 + TypeScript，类型完整</li><li>支持 CSS 变量主题定制与暗色模式</li><li>easycom 自动引入，开箱即用</li></ul><h2 id="版本" tabindex="-1">版本 <a class="header-anchor" href="#版本" aria-label="Permalink to &quot;版本&quot;">​</a></h2><p>当前 v0.1.0 alpha，组件正在逐步实现中。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/introduce.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const introduce = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  introduce as default
};
