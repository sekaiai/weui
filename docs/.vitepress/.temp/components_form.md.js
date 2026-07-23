import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"Form 表单容器","description":"","frontmatter":{},"headers":[],"relativePath":"components/form.md","filePath":"components/form.md","lastUpdated":1784681160000}');
const __default__ = { name: "components/form.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const checkboxValues = ref(["1"]);
    const radioValue = ref("1");
    const switchValue = ref(false);
    const switchValue2 = ref(true);
    const switchValue3 = ref(true);
    const textareaValue = ref("");
    const selectValue = ref("1");
    const selectAfterValue = ref("1");
    const mockDate = ref("2026-07-22");
    const mockPrefix = ref("+86");
    const mockTicket = ref("的士票");
    const cycle = (value, options) => {
      value.value = options[(options.indexOf(value.value) + 1) % options.length];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_weui_form = resolveComponent("weui-form");
      const _component_weui_cell_group = resolveComponent("weui-cell-group");
      const _component_weui_cell = resolveComponent("weui-cell");
      const _component_weui_input = resolveComponent("weui-input");
      const _component_weui_textarea = resolveComponent("weui-textarea");
      const _component_weui_form_tips = resolveComponent("weui-form-tips");
      const _component_weui_form_opr = resolveComponent("weui-form-opr");
      const _component_weui_button = resolveComponent("weui-button");
      const _component_weui_form_extra = resolveComponent("weui-form-extra");
      const _component_weui_footer = resolveComponent("weui-footer");
      const _component_weui_agree = resolveComponent("weui-agree");
      const _component_weui_checkbox_group = resolveComponent("weui-checkbox-group");
      const _component_weui_checkbox = resolveComponent("weui-checkbox");
      const _component_weui_radio_group = resolveComponent("weui-radio-group");
      const _component_weui_radio = resolveComponent("weui-radio");
      const _component_weui_switch = resolveComponent("weui-switch");
      const _component_weui_select = resolveComponent("weui-select");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="form-表单容器" tabindex="-1">Form 表单容器 <a class="header-anchor" href="#form-表单容器" aria-label="Permalink to &quot;Form 表单容器&quot;">​</a></h1><p><code>weui-form</code> 组织表单标题、控件和底部操作区。以下案例与官方 WeUI form 示例一一对应，状态通过组件 attrs 表达，不通过 <code>ext-class</code> 传递；每个案例均提供可复制的完整用法。</p><h2 id="表单结构" tabindex="-1">表单结构 <a class="header-anchor" href="#表单结构" aria-label="Permalink to &quot;表单结构&quot;">​</a></h2><p>标题、说明、控件区域和底部操作区域由 <code>weui-form</code> 与相关子组件组合。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, {
        title: "表单结构",
        desc: "展示表单页面的信息结构。"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_form_tips, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`表单页提示，居中对齐`);
                } else {
                  return [
                    createTextVNode("表单页提示，居中对齐")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_weui_form_opr, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_button, {
                    type: "primary",
                    disabled: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`确定`);
                      } else {
                        return [
                          createTextVNode("确定")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_button, {
                      type: "primary",
                      disabled: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("确定")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_weui_form_extra, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_footer, {
                    links: [{ text: "底部链接文本" }],
                    text: "Copyright © weui.io"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_footer, {
                      links: [{ text: "底部链接文本" }],
                      text: "Copyright © weui.io"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_form_tips, null, {
                default: withCtx(() => [
                  createTextVNode("表单页提示，居中对齐")
                ]),
                _: 1
              }),
              createVNode(_component_weui_form_opr, null, {
                default: withCtx(() => [
                  createVNode(_component_weui_button, {
                    type: "primary",
                    disabled: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode("确定")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_weui_form_extra, null, {
                default: withCtx(() => [
                  createVNode(_component_weui_footer, {
                    links: [{ text: "底部链接文本" }],
                    text: "Copyright © weui.io"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, {
              form: "",
              title: "表单组标题"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_cell, { label: "微信号" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, { placeholder: "填写本人微信号" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, { placeholder: "填写本人微信号" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_cell, { label: "昵称" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, { placeholder: "填写本人微信号的昵称" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, { placeholder: "填写本人微信号的昵称" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_cell, { label: "联系电话" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, {
                          type: "number",
                          placeholder: "填写绑定的电话号码"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, {
                            type: "number",
                            placeholder: "填写绑定的电话号码"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_textarea, {
                    label: "verification address",
                    primary: "",
                    placeholder: "input your address",
                    rows: "3"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_cell, { label: "微信号" }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, { placeholder: "填写本人微信号" })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_weui_cell, { label: "昵称" }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, { placeholder: "填写本人微信号的昵称" })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_weui_cell, { label: "联系电话" }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, {
                          type: "number",
                          placeholder: "填写绑定的电话号码"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_weui_textarea, {
                      label: "verification address",
                      primary: "",
                      placeholder: "input your address",
                      rows: "3"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, {
                form: "",
                title: "表单组标题"
              }, {
                default: withCtx(() => [
                  createVNode(_component_weui_cell, { label: "微信号" }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, { placeholder: "填写本人微信号" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_weui_cell, { label: "昵称" }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, { placeholder: "填写本人微信号的昵称" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_weui_cell, { label: "联系电话" }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, {
                        type: "number",
                        placeholder: "填写绑定的电话号码"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_weui_textarea, {
                    label: "verification address",
                    primary: "",
                    placeholder: "input your address",
                    rows: "3"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-form</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;表单结构&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> desc</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;展示表单页面的信息结构。&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;weui-cell-group form title=&quot;表单组标题&quot;&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    &lt;weui-cell label=&quot;微信号&quot;&gt;&lt;weui-input placeholder=&quot;填写本人微信号&quot; /&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    &lt;weui-cell label=&quot;昵称&quot;&gt;&lt;weui-input placeholder=&quot;填写本人微信号的昵称&quot; /&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    &lt;weui-cell label=&quot;联系电话&quot;&gt;&lt;weui-input type=&quot;number&quot; placeholder=&quot;填写绑定的电话号码&quot; /&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;/weui-cell-group&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;template #footer&gt;&lt;weui-form-tips&gt;表单页提示，居中对齐&lt;/weui-form-tips&gt;&lt;weui-form-opr&gt;&lt;weui-button type=&quot;primary&quot;&gt;确定&lt;/weui-button&gt;&lt;/weui-form-opr&gt;&lt;/template&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre></div></details><h2 id="反色表单" tabindex="-1">反色表单 <a class="header-anchor" href="#反色表单" aria-label="Permalink to &quot;反色表单&quot;">​</a></h2><p>反色表单使用表单组的官方 primary 外观，适合深色背景区域。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, {
        title: "反色表单",
        desc: "深色背景上的表单展示。"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, {
              form: "",
              "ext-class": "weui-cells__group_form-primary",
              title: "表单组标题"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_cell, { label: "微信号" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, { placeholder: "填写本人微信号" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, { placeholder: "填写本人微信号" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_cell, { label: "昵称" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, { placeholder: "填写本人微信号的昵称" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, { placeholder: "填写本人微信号的昵称" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_cell, { label: "微信号" }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, { placeholder: "填写本人微信号" })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_weui_cell, { label: "昵称" }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, { placeholder: "填写本人微信号的昵称" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, {
                form: "",
                "ext-class": "weui-cells__group_form-primary",
                title: "表单组标题"
              }, {
                default: withCtx(() => [
                  createVNode(_component_weui_cell, { label: "微信号" }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, { placeholder: "填写本人微信号" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_weui_cell, { label: "昵称" }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, { placeholder: "填写本人微信号的昵称" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-form</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;反色表单&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> desc</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;深色背景上的表单展示。&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;weui-cell-group form ext-class=&quot;weui-cells__group_form-primary&quot; title=&quot;表单组标题&quot;&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    &lt;weui-cell label=&quot;微信号&quot;&gt;&lt;weui-input placeholder=&quot;填写本人微信号&quot; /&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    &lt;weui-cell label=&quot;昵称&quot;&gt;&lt;weui-input placeholder=&quot;填写本人微信号的昵称&quot; /&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;/weui-cell-group&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre></div></details><h2 id="输入框状态" tabindex="-1">输入框状态 <a class="header-anchor" href="#输入框状态" aria-label="Permalink to &quot;输入框状态&quot;">​</a></h2><p>使用 <code>warn</code>、<code>readonly</code> 与 <code>disabled</code> 明确表达输入反馈状态。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, { title: "输入框状态" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, { form: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_cell, {
                    label: "卡号",
                    warn: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, { placeholder: "请输入16位数卡号" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, { placeholder: "请输入16位数卡号" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_cell, {
                    label: "EMail",
                    readonly: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, {
                          "model-value": "1234567",
                          readonly: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, {
                            "model-value": "1234567",
                            readonly: ""
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_cell, {
                    label: "微信号",
                    disabled: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, {
                          "model-value": "WeUI",
                          disabled: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, {
                            "model-value": "WeUI",
                            disabled: ""
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_cell, {
                      label: "卡号",
                      warn: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, { placeholder: "请输入16位数卡号" })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_weui_cell, {
                      label: "EMail",
                      readonly: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, {
                          "model-value": "1234567",
                          readonly: ""
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_weui_cell, {
                      label: "微信号",
                      disabled: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, {
                          "model-value": "WeUI",
                          disabled: ""
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, { form: "" }, {
                default: withCtx(() => [
                  createVNode(_component_weui_cell, {
                    label: "卡号",
                    warn: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, { placeholder: "请输入16位数卡号" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_weui_cell, {
                    label: "EMail",
                    readonly: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, {
                        "model-value": "1234567",
                        readonly: ""
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_weui_cell, {
                    label: "微信号",
                    disabled: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, {
                        "model-value": "WeUI",
                        disabled: ""
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;weui-cell label=&quot;卡号&quot; warn&gt;&lt;weui-input placeholder=&quot;请输入16位数卡号&quot; /&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;weui-cell label=&quot;EMail&quot; readonly&gt;&lt;weui-input model-value=&quot;1234567&quot; readonly /&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;weui-cell label=&quot;微信号&quot; disabled&gt;&lt;weui-input model-value=&quot;WeUI&quot; disabled /&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre></div></details><h2 id="验证码" tabindex="-1">验证码 <a class="header-anchor" href="#验证码" aria-label="Permalink to &quot;验证码&quot;">​</a></h2><p>验证码 cell 把 input 和发送操作放在同一正文区，避免额外 slot 或嵌套 cell。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, {
        title: "验证码",
        desc: "验证手机号样式。"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_form_tips, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_agree, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`阅读并同意<a href="javascript:"${_scopeId3}>《相关条款》</a>`);
                      } else {
                        return [
                          createTextVNode("阅读并同意"),
                          createVNode("a", { href: "javascript:" }, "《相关条款》")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_agree, null, {
                      default: withCtx(() => [
                        createTextVNode("阅读并同意"),
                        createVNode("a", { href: "javascript:" }, "《相关条款》")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_weui_form_opr, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`确定`);
                      } else {
                        return [
                          createTextVNode("确定")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("确定")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_form_tips, null, {
                default: withCtx(() => [
                  createVNode(_component_weui_agree, null, {
                    default: withCtx(() => [
                      createTextVNode("阅读并同意"),
                      createVNode("a", { href: "javascript:" }, "《相关条款》")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_weui_form_opr, null, {
                default: withCtx(() => [
                  createVNode(_component_weui_button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("确定")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, { form: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_cell, { label: "手机号" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, {
                          type: "number",
                          "model-value": "12345678907",
                          placeholder: "请输入手机号"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, {
                            type: "number",
                            "model-value": "12345678907",
                            placeholder: "请输入手机号"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_cell, {
                    label: "验证码",
                    vcode: "",
                    wrap: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, { placeholder: "输入验证码" }, null, _parent4, _scopeId3));
                        _push4(`<button class="weui-vcode-btn"${_scopeId3}>获取验证码</button>`);
                      } else {
                        return [
                          createVNode(_component_weui_input, { placeholder: "输入验证码" }),
                          createVNode("button", { class: "weui-vcode-btn" }, "获取验证码")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_cell, { label: "手机号" }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, {
                          type: "number",
                          "model-value": "12345678907",
                          placeholder: "请输入手机号"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_weui_cell, {
                      label: "验证码",
                      vcode: "",
                      wrap: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, { placeholder: "输入验证码" }),
                        createVNode("button", { class: "weui-vcode-btn" }, "获取验证码")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, { form: "" }, {
                default: withCtx(() => [
                  createVNode(_component_weui_cell, { label: "手机号" }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, {
                        type: "number",
                        "model-value": "12345678907",
                        placeholder: "请输入手机号"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_weui_cell, {
                    label: "验证码",
                    vcode: "",
                    wrap: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, { placeholder: "输入验证码" }),
                      createVNode("button", { class: "weui-vcode-btn" }, "获取验证码")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;weui-cell label=&quot;手机号&quot;&gt;&lt;weui-input type=&quot;number&quot; placeholder=&quot;请输入手机号&quot; /&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;weui-cell label=&quot;验证码&quot; vcode wrap&gt;&lt;weui-input placeholder=&quot;输入验证码&quot; /&gt;&lt;button class=&quot;weui-vcode-btn&quot;&gt;获取验证码&lt;/button&gt;&lt;/weui-cell&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre></div></details><h2 id="底部悬浮" tabindex="-1">底部悬浮 <a class="header-anchor" href="#底部悬浮" aria-label="Permalink to &quot;底部悬浮&quot;">​</a></h2><p><code>bottom-fixed</code> 同时为内容区和操作区应用官方底部悬浮布局，并保留最小展示高度。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, {
        "bottom-fixed": "",
        title: "底部悬浮表单",
        desc: "操作区固定于底部。"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_form_tips, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_agree, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`阅读并同意<a href="javascript:"${_scopeId3}>《相关条款》</a>`);
                      } else {
                        return [
                          createTextVNode("阅读并同意"),
                          createVNode("a", { href: "javascript:" }, "《相关条款》")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_agree, null, {
                      default: withCtx(() => [
                        createTextVNode("阅读并同意"),
                        createVNode("a", { href: "javascript:" }, "《相关条款》")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_weui_form_opr, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`确定`);
                      } else {
                        return [
                          createTextVNode("确定")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("确定")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_form_tips, null, {
                default: withCtx(() => [
                  createVNode(_component_weui_agree, null, {
                    default: withCtx(() => [
                      createTextVNode("阅读并同意"),
                      createVNode("a", { href: "javascript:" }, "《相关条款》")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_weui_form_opr, null, {
                default: withCtx(() => [
                  createVNode(_component_weui_button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("确定")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, { form: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_cell, { label: "手机号" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, {
                          type: "number",
                          placeholder: "请输入手机号"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, {
                            type: "number",
                            placeholder: "请输入手机号"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_cell, { label: "手机号" }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, {
                          type: "number",
                          placeholder: "请输入手机号"
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, { form: "" }, {
                default: withCtx(() => [
                  createVNode(_component_weui_cell, { label: "手机号" }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, {
                        type: "number",
                        placeholder: "请输入手机号"
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-form</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> bottom-fixed</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;底部悬浮表单&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> desc</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;操作区固定于底部。&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;weui-cell-group form&gt;&lt;weui-cell label=&quot;手机号&quot;&gt;&lt;weui-input type=&quot;number&quot; placeholder=&quot;请输入手机号&quot; /&gt;&lt;/weui-cell&gt;&lt;/weui-cell-group&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  &lt;template #footer&gt;&lt;weui-form-opr&gt;&lt;weui-button type=&quot;primary&quot;&gt;确定&lt;/weui-button&gt;&lt;/weui-form-opr&gt;&lt;/template&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre></div></details><h2 id="复选框" tabindex="-1">复选框 <a class="header-anchor" href="#复选框" aria-label="Permalink to &quot;复选框&quot;">​</a></h2><p>复选框组本身负责官方 <code>cells_checkbox</code> 和 form group 结构，不需要额外布局元素。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, { title: "复选框样式展示" }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_form_opr, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`下一步`);
                      } else {
                        return [
                          createTextVNode("下一步")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("下一步")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_form_opr, null, {
                default: withCtx(() => [
                  createVNode(_component_weui_button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("下一步")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_checkbox_group, {
              modelValue: checkboxValues.value,
              "onUpdate:modelValue": ($event) => checkboxValues.value = $event,
              form: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_checkbox, {
                    value: "1",
                    label: "standard is dealt for u."
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_checkbox, {
                    value: "2",
                    label: "standard is dealicient for u."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_checkbox, {
                      value: "1",
                      label: "standard is dealt for u."
                    }),
                    createVNode(_component_weui_checkbox, {
                      value: "2",
                      label: "standard is dealicient for u."
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_checkbox_group, {
                modelValue: checkboxValues.value,
                "onUpdate:modelValue": ($event) => checkboxValues.value = $event,
                form: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_weui_checkbox, {
                    value: "1",
                    label: "standard is dealt for u."
                  }),
                  createVNode(_component_weui_checkbox, {
                    value: "2",
                    label: "standard is dealicient for u."
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;vue&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">; </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> values</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">([</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;1&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">])</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">script</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">weui</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">checkbox</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> v</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;values&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">weui</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">checkbox</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;1&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> label</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;standard is dealt for u.&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">weui</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">checkbox</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;2&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> label</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;standard is dealicient for u.&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /&gt;&lt;/weui-checkbox-group&gt;&lt;/template&gt;</span></span></code></pre></div></details><h2 id="跳转列表项" tabindex="-1">跳转列表项 <a class="header-anchor" href="#跳转列表项" aria-label="Permalink to &quot;跳转列表项&quot;">​</a></h2><p><code>access</code> 提供官方箭头和导航语义；不使用 <code>variant=&quot;access&quot;</code>。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, { title: "跳转列表项" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, { form: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_cell, {
                    access: "",
                    url: "javascript:"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`cell standard`);
                      } else {
                        return [
                          createTextVNode("cell standard")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_cell, {
                    access: "",
                    url: "javascript:"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`cell standard`);
                      } else {
                        return [
                          createTextVNode("cell standard")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_cell, {
                      access: "",
                      url: "javascript:"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("cell standard")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_weui_cell, {
                      access: "",
                      url: "javascript:"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("cell standard")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, { form: "" }, {
                default: withCtx(() => [
                  createVNode(_component_weui_cell, {
                    access: "",
                    url: "javascript:"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("cell standard")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_weui_cell, {
                    access: "",
                    url: "javascript:"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("cell standard")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;weui-cell access url=&quot;/pages/detail&quot;&gt;cell standard&lt;/weui-cell&gt;&lt;weui-cell access url=&quot;/pages/detail&quot;&gt;cell standard&lt;/weui-cell&gt;&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre></div></details><h2 id="单选框" tabindex="-1">单选框 <a class="header-anchor" href="#单选框" aria-label="Permalink to &quot;单选框&quot;">​</a></h2><p>单选组管理唯一选中值，并生成同名原生 radio 输入。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, { title: "单选样式展示" }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_form_opr, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_button, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`确定`);
                      } else {
                        return [
                          createTextVNode("确定")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("确定")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_form_opr, null, {
                default: withCtx(() => [
                  createVNode(_component_weui_button, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("确定")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_radio_group, {
              modelValue: radioValue.value,
              "onUpdate:modelValue": ($event) => radioValue.value = $event,
              form: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_radio, {
                    value: "1",
                    label: "选项一"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_radio, {
                    value: "2",
                    label: "选项二"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_radio, {
                    value: "3",
                    label: "选项三"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_radio, {
                      value: "1",
                      label: "选项一"
                    }),
                    createVNode(_component_weui_radio, {
                      value: "2",
                      label: "选项二"
                    }),
                    createVNode(_component_weui_radio, {
                      value: "3",
                      label: "选项三"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_radio_group, {
                modelValue: radioValue.value,
                "onUpdate:modelValue": ($event) => radioValue.value = $event,
                form: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_weui_radio, {
                    value: "1",
                    label: "选项一"
                  }),
                  createVNode(_component_weui_radio, {
                    value: "2",
                    label: "选项二"
                  }),
                  createVNode(_component_weui_radio, {
                    value: "3",
                    label: "选项三"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;vue&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">; </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;1&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">script</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">weui</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> v</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;value&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">weui</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;1&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> label</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;选项一&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">weui</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;2&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> label</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;选项二&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">weui</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">radio</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;3&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> label</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;选项三&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /&gt;&lt;/weui-radio-group&gt;&lt;/template&gt;</span></span></code></pre></div></details><h2 id="开关" tabindex="-1">开关 <a class="header-anchor" href="#开关" aria-label="Permalink to &quot;开关&quot;">​</a></h2><p>开关自身就是完整 cell，放入 <code>cell-group</code> 即可，不再使用原生 <code>div</code> 模拟列表结构。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, { title: "开关样式展示" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, { form: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_switch, {
                    modelValue: switchValue.value,
                    "onUpdate:modelValue": ($event) => switchValue.value = $event,
                    label: "标题文字"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_switch, {
                    modelValue: switchValue2.value,
                    "onUpdate:modelValue": ($event) => switchValue2.value = $event,
                    label: "标题文字",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_switch, {
                    modelValue: switchValue3.value,
                    "onUpdate:modelValue": ($event) => switchValue3.value = $event,
                    label: "兼容 IE Edge 的版本",
                    cp: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_switch, {
                      modelValue: switchValue.value,
                      "onUpdate:modelValue": ($event) => switchValue.value = $event,
                      label: "标题文字"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_weui_switch, {
                      modelValue: switchValue2.value,
                      "onUpdate:modelValue": ($event) => switchValue2.value = $event,
                      label: "标题文字",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_weui_switch, {
                      modelValue: switchValue3.value,
                      "onUpdate:modelValue": ($event) => switchValue3.value = $event,
                      label: "兼容 IE Edge 的版本",
                      cp: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, { form: "" }, {
                default: withCtx(() => [
                  createVNode(_component_weui_switch, {
                    modelValue: switchValue.value,
                    "onUpdate:modelValue": ($event) => switchValue.value = $event,
                    label: "标题文字"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_weui_switch, {
                    modelValue: switchValue2.value,
                    "onUpdate:modelValue": ($event) => switchValue2.value = $event,
                    label: "标题文字",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_weui_switch, {
                    modelValue: switchValue3.value,
                    "onUpdate:modelValue": ($event) => switchValue3.value = $event,
                    label: "兼容 IE Edge 的版本",
                    cp: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;weui-switch v-model=&quot;switchValue&quot; label=&quot;标题文字&quot; /&gt;&lt;weui-switch v-model=&quot;switchValue2&quot; label=&quot;标题文字&quot; disabled /&gt;&lt;weui-switch v-model=&quot;switchValue3&quot; label=&quot;兼容 IE Edge 的版本&quot; cp /&gt;&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre></div></details><h2 id="原生选择框" tabindex="-1">原生选择框 <a class="header-anchor" href="#原生选择框" aria-label="Permalink to &quot;原生选择框&quot;">​</a></h2><p><code>weui-select</code> 已经输出选择框所需的完整 cell，不应被 <code>weui-cell</code> 再包一层。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, { title: "原生选择框" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, { form: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_select, {
                    modelValue: selectValue.value,
                    "onUpdate:modelValue": ($event) => selectValue.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<option value="1"${_scopeId3}>微信号</option><option value="2"${_scopeId3}>QQ号</option><option value="3"${_scopeId3}>Email</option>`);
                      } else {
                        return [
                          createVNode("option", { value: "1" }, "微信号"),
                          createVNode("option", { value: "2" }, "QQ号"),
                          createVNode("option", { value: "3" }, "Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_select, {
                    modelValue: selectAfterValue.value,
                    "onUpdate:modelValue": ($event) => selectAfterValue.value = $event,
                    after: "",
                    label: "国家"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<option value="1"${_scopeId3}>中国</option><option value="2"${_scopeId3}>美国</option><option value="3"${_scopeId3}>英国</option>`);
                      } else {
                        return [
                          createVNode("option", { value: "1" }, "中国"),
                          createVNode("option", { value: "2" }, "美国"),
                          createVNode("option", { value: "3" }, "英国")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_select, {
                      modelValue: selectValue.value,
                      "onUpdate:modelValue": ($event) => selectValue.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode("option", { value: "1" }, "微信号"),
                        createVNode("option", { value: "2" }, "QQ号"),
                        createVNode("option", { value: "3" }, "Email")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_weui_select, {
                      modelValue: selectAfterValue.value,
                      "onUpdate:modelValue": ($event) => selectAfterValue.value = $event,
                      after: "",
                      label: "国家"
                    }, {
                      default: withCtx(() => [
                        createVNode("option", { value: "1" }, "中国"),
                        createVNode("option", { value: "2" }, "美国"),
                        createVNode("option", { value: "3" }, "英国")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, { form: "" }, {
                default: withCtx(() => [
                  createVNode(_component_weui_select, {
                    modelValue: selectValue.value,
                    "onUpdate:modelValue": ($event) => selectValue.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode("option", { value: "1" }, "微信号"),
                      createVNode("option", { value: "2" }, "QQ号"),
                      createVNode("option", { value: "3" }, "Email")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_weui_select, {
                    modelValue: selectAfterValue.value,
                    "onUpdate:modelValue": ($event) => selectAfterValue.value = $event,
                    after: "",
                    label: "国家"
                  }, {
                    default: withCtx(() => [
                      createVNode("option", { value: "1" }, "中国"),
                      createVNode("option", { value: "2" }, "美国"),
                      createVNode("option", { value: "3" }, "英国")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;weui-select v-model=&quot;selectValue&quot;&gt;&lt;option value=&quot;1&quot;&gt;微信号&lt;/option&gt;&lt;option value=&quot;2&quot;&gt;QQ号&lt;/option&gt;&lt;/weui-select&gt;&lt;weui-select v-model=&quot;selectAfterValue&quot; after label=&quot;国家&quot;&gt;&lt;option value=&quot;1&quot;&gt;中国&lt;/option&gt;&lt;option value=&quot;2&quot;&gt;美国&lt;/option&gt;&lt;/weui-select&gt;&lt;/weui-cell-group&gt;</span></span></code></pre></div></details><h2 id="模拟选择框" tabindex="-1">模拟选择框 <a class="header-anchor" href="#模拟选择框" aria-label="Permalink to &quot;模拟选择框&quot;">​</a></h2><p>模拟选择框保留官方 <code>weui-cell_select</code> 外观，但使用 cell click 切换示例值，便于直接观察无原生 select 时的交互状态。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, {
        title: "模拟选择框",
        desc: "点击各项切换模拟值。"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, { form: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_cell, {
                    select: "",
                    active: "",
                    onClick: ($event) => cycle(mockDate.value, ["2026-07-22", "2026-07-23", "2026-07-24"])
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(mockDate.value)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(mockDate.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_cell, {
                    select: "",
                    "select-before": "",
                    active: "",
                    title: "+86",
                    onClick: ($event) => cycle(mockPrefix.value, ["+86", "+80", "+84"])
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_weui_input, { placeholder: "请输入号码" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_weui_input, { placeholder: "请输入号码" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_weui_cell, {
                    select: "",
                    "select-after": "",
                    active: "",
                    label: "票种",
                    onClick: ($event) => cycle(mockTicket.value, ["的士票", "飞机票", "火车票"])
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(mockTicket.value)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(mockTicket.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_cell, {
                      select: "",
                      active: "",
                      onClick: ($event) => cycle(mockDate.value, ["2026-07-22", "2026-07-23", "2026-07-24"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(mockDate.value), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_weui_cell, {
                      select: "",
                      "select-before": "",
                      active: "",
                      title: "+86",
                      onClick: ($event) => cycle(mockPrefix.value, ["+86", "+80", "+84"])
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_weui_input, { placeholder: "请输入号码" })
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_weui_cell, {
                      select: "",
                      "select-after": "",
                      active: "",
                      label: "票种",
                      onClick: ($event) => cycle(mockTicket.value, ["的士票", "飞机票", "火车票"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(mockTicket.value), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, { form: "" }, {
                default: withCtx(() => [
                  createVNode(_component_weui_cell, {
                    select: "",
                    active: "",
                    onClick: ($event) => cycle(mockDate.value, ["2026-07-22", "2026-07-23", "2026-07-24"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(mockDate.value), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_weui_cell, {
                    select: "",
                    "select-before": "",
                    active: "",
                    title: "+86",
                    onClick: ($event) => cycle(mockPrefix.value, ["+86", "+80", "+84"])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_weui_input, { placeholder: "请输入号码" })
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_weui_cell, {
                    select: "",
                    "select-after": "",
                    active: "",
                    label: "票种",
                    onClick: ($event) => cycle(mockTicket.value, ["的士票", "飞机票", "火车票"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(mockTicket.value), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;vue&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> date</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;2026-07-22&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> cycleDate</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> () </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { date.value </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> date.value </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">===</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;2026-07-22&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> ?</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;2026-07-23&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> :</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;2026-07-22&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">script</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> select</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> active</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> @</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">click</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">cycleDate</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;{{ date }}&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> select</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> select-before</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> active</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;+86&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-input</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> placeholder</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;请输入号码&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /&gt;&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> select</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> select-after</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> active</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> label</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;票种&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;的士票&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre></div></details><h2 id="文本域" tabindex="-1">文本域 <a class="header-anchor" href="#文本域" aria-label="Permalink to &quot;文本域&quot;">​</a></h2><p><code>weui-textarea</code> 已是带计数器的完整 cell，直接作为 form group 的子项，避免生成双层 <code>.weui-cell</code>。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, {
        title: "文本域",
        desc: "输入更多内容的输入区域样式展示。"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, {
              form: "",
              title: "问题描述"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_textarea, {
                    modelValue: textareaValue.value,
                    "onUpdate:modelValue": ($event) => textareaValue.value = $event,
                    placeholder: "请描述你所发生的问题"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_textarea, {
                      modelValue: textareaValue.value,
                      "onUpdate:modelValue": ($event) => textareaValue.value = $event,
                      placeholder: "请描述你所发生的问题"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, {
                form: "",
                title: "问题描述"
              }, {
                default: withCtx(() => [
                  createVNode(_component_weui_textarea, {
                    modelValue: textareaValue.value,
                    "onUpdate:modelValue": ($event) => textareaValue.value = $event,
                    placeholder: "请描述你所发生的问题"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">script</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> setup</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> lang</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;ts&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { ref } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;vue&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">; </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> value</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> ref</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">script</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">template</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">weui</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">cell</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;问题描述&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">weui</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">textarea</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> v</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">model</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;value&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> placeholder</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;请描述你所发生的问题&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> /&gt;&lt;/weui-cell-group&gt;&lt;/template&gt;</span></span></code></pre></div></details><h2 id="上下结构" tabindex="-1">上下结构 <a class="header-anchor" href="#上下结构" aria-label="Permalink to &quot;上下结构&quot;">​</a></h2><p>上下结构由 textarea 的 <code>label</code> 和 <code>vertical</code> props 生成，标签、输入区域与计数器属于同一个官方 cell。</p><div class="demo-block vp-raw"><div class="demo-mobile">`);
      _push(ssrRenderComponent(_component_weui_form, {
        title: "上下结构",
        desc: "上下结构样式。"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_weui_cell_group, { form: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_weui_textarea, {
                    label: "问题描述",
                    vertical: "",
                    placeholder: "请描述你所发生的问题"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_weui_textarea, {
                      label: "问题描述",
                      vertical: "",
                      placeholder: "请描述你所发生的问题"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_weui_cell_group, { form: "" }, {
                default: withCtx(() => [
                  createVNode(_component_weui_textarea, {
                    label: "问题描述",
                    vertical: "",
                    placeholder: "请描述你所发生的问题"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><details class="details custom-block"><summary>查看代码</summary><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> form</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;&lt;weui-textarea label=&quot;问题描述&quot; vertical placeholder=&quot;请描述你所发生的问题&quot; /&gt;&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">weui-cell-group</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre></div></details><h2 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>title</td><td>表单标题</td><td><code>string</code></td><td>—</td></tr><tr><td>desc</td><td>表单描述</td><td><code>string</code></td><td>—</td></tr><tr><td>bottom-fixed</td><td>底部悬浮模式，内置最小高度</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td>ext-class</td><td>纯自定义样式扩展类</td><td><code>string</code></td><td>—</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>default</td><td>控件区域内容</td></tr><tr><td>title</td><td>自定义标题区域</td></tr><tr><td>footer</td><td>提示、操作与底部信息区域</td></tr></tbody></table></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
