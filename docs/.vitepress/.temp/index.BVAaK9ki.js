import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, createElementVNode, createCommentVNode, renderSlot, toDisplayString, normalizeStyle, useSlots, createTextVNode, Fragment, renderList, ref, withModifiers, createVNode, unref, withCtx, watch, mergeProps, withKeys, inject, provide, shallowRef, onMounted, onBeforeUnmount, createBlock, resolveDynamicComponent } from "vue";
var st = Object.defineProperty;
var lt = (e, s, t) => s in e ? st(e, s, { enumerable: true, configurable: true, writable: true, value: t }) : e[s] = t;
var Z = (e, s, t) => lt(e, typeof s != "symbol" ? s + "" : s, t);
const nt = ["disabled", "open-type"], ut = {
  key: 0,
  class: "weui-primary-loading weui-primary-loading_transparent"
}, ct = ["src"], rt = {
  name: "WeuiButton",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, se = /* @__PURE__ */ defineComponent({
  ...rt,
  props: {
    type: { default: "default" },
    size: { default: "default" },
    display: { default: void 0 },
    cell: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    icon: { default: void 0 },
    vcode: { type: Boolean, default: false },
    overlay: { type: Boolean, default: false },
    openType: { default: void 0 }
  },
  emits: ["click"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      if (t.vcode)
        return ["weui-vcode-btn"];
      if (t.cell) {
        const u = ["weui-btn_cell", `weui-btn_cell-${t.type}`];
        return t.disabled && u.push("weui-btn_disabled"), t.loading && u.push("weui-btn_loading"), u;
      }
      const i = ["weui-btn", `weui-btn_${t.type}`];
      return t.overlay && i.push("weui-btn_overlay"), t.size === "medium" ? i.push("weui-btn_medium") : t.size === "mini" ? i.push("weui-btn_mini") : t.size === "xmini" && i.push("weui-btn_xmini"), t.display === "block" ? i.push("weui-btn_block") : t.display === "inline" && i.push("weui-btn_inline"), t.loading && i.push("weui-btn_loading"), t.disabled && i.push("weui-btn_disabled"), i;
    }), c = (i) => {
      t.disabled || n("click", i);
    };
    return (i, u) => (openBlock(), createElementBlock("button", {
      class: normalizeClass(l.value),
      disabled: e.disabled,
      "open-type": !e.vcode && !e.cell ? e.openType : void 0,
      onClick: c
    }, [
      e.loading && !e.vcode ? (openBlock(), createElementBlock("div", ut, [...u[0] || (u[0] = [
        createElementVNode("div", { class: "weui-primary-loading__dot" }, null, -1)
      ])])) : createCommentVNode("", true),
      e.icon ? (openBlock(), createElementBlock("img", {
        key: 1,
        src: e.icon,
        class: "weui-btn_cell__icon"
      }, null, 8, ct)) : createCommentVNode("", true),
      renderSlot(i.$slots, "default")
    ], 10, nt));
  }
});
se.install = (e) => {
  e.component(se.name || "WeuiButton", se);
};
const dt = ["aria-label"], ft = {
  name: "WeuiBadge",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, le = /* @__PURE__ */ defineComponent({
  ...ft,
  props: {
    content: { default: "" },
    extClass: { default: void 0 },
    ariaLabel: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const n = ["weui-badge"];
      return s.content || n.push("weui-badge_dot"), s.extClass && n.push(s.extClass), n;
    });
    return (n, l) => (openBlock(), createElementBlock("span", {
      class: normalizeClass(t.value),
      "aria-label": e.ariaLabel
    }, toDisplayString(e.content), 11, dt));
  }
});
le.install = (e) => {
  e.component(le.name || "WeuiBadge", le);
};
const ht = {
  name: "WeuiIcon",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, E = /* @__PURE__ */ defineComponent({
  ...ht,
  props: {
    type: { default: void 0 },
    size: { default: void 0 },
    color: { default: void 0 },
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const l = [`weui-icon-${s.type}`];
      return s.extClass && l.push(s.extClass), l;
    }), n = computed(() => {
      const l = {};
      return s.size != null && (l["font-size"] = `${s.size}px`), s.color && (l.color = s.color), l;
    });
    return (l, c) => (openBlock(), createElementBlock("span", {
      class: normalizeClass(t.value),
      style: normalizeStyle(n.value)
    }, null, 6));
  }
});
E.install = (e) => {
  e.component(E.name || "WeuiIcon", E);
};
const vt = {
  name: "WeuiLoading",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ae = /* @__PURE__ */ defineComponent({
  ...vt,
  props: {
    type: { default: "default" },
    size: { default: 20 },
    color: { default: "#999" },
    text: { default: void 0 },
    transparent: { type: Boolean, default: false }
  },
  setup(e) {
    const s = e, t = useSlots(), n = computed(() => s.text !== void 0 || !!t.default), l = computed(() => s.type === "page" ? ["weui-loadmore"] : []), c = computed(() => s.type === "page" ? {} : {
      display: "inline-flex",
      alignItems: "center"
    }), i = computed(() => ({
      width: `${s.size}px`,
      height: `${s.size}px`,
      color: s.color
    })), u = computed(() => s.type === "page" ? "weui-loadmore__tips" : "weui-loading__text"), f = computed(() => s.type === "default" ? { "font-size": "14px", "margin-left": "8px", color: s.color } : { color: s.color });
    return (m, y) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(l.value),
      style: normalizeStyle(c.value)
    }, [
      createElementVNode("div", {
        class: normalizeClass(["weui-loading", { "weui-loading_transparent": e.transparent }]),
        style: normalizeStyle(i.value)
      }, null, 6),
      n.value ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(u.value),
        style: normalizeStyle(f.value)
      }, [
        renderSlot(m.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(e.text), 1)
        ])
      ], 6)) : createCommentVNode("", true)
    ], 6));
  }
});
ae.install = (e) => {
  e.component(ae.name || "WeuiLoading", ae);
};
const mt = {
  name: "WeuiArticle",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, oe = /* @__PURE__ */ defineComponent({
  ...mt,
  props: {
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const n = ["weui-article"];
      return s.extClass && n.push(s.extClass), n;
    });
    return (n, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value)
    }, [
      renderSlot(n.$slots, "default")
    ], 2));
  }
});
oe.install = (e) => {
  e.component(oe.name || "WeuiArticle", oe);
};
const pt = {
  name: "WeuiFlex",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ie = /* @__PURE__ */ defineComponent({
  ...pt,
  props: {
    direction: { default: "row" },
    wrap: { default: "nowrap" },
    justify: { default: "start" },
    align: { default: "center" },
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const i = ["weui-flex"];
      return s.extClass && i.push(s.extClass), i;
    }), n = (i) => {
      switch (i) {
        case "start":
          return "flex-start";
        case "end":
          return "flex-end";
        case "between":
          return "space-between";
        case "around":
          return "space-around";
        case "evenly":
          return "space-evenly";
        default:
          return i;
      }
    }, l = (i) => {
      switch (i) {
        case "start":
          return "flex-start";
        case "end":
          return "flex-end";
        default:
          return i;
      }
    }, c = computed(() => ({
      "flex-direction": s.direction,
      "flex-wrap": s.wrap,
      "justify-content": n(s.justify),
      "align-items": l(s.align)
    }));
    return (i, u) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value),
      style: normalizeStyle(c.value)
    }, [
      renderSlot(i.$slots, "default")
    ], 6));
  }
}), _t = {
  name: "WeuiFlexItem",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ne = /* @__PURE__ */ defineComponent({
  ..._t,
  props: {
    extClass: { default: void 0 },
    flex: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const l = ["weui-flex__item"];
      return s.extClass && l.push(s.extClass), l;
    }), n = computed(() => {
      if (s.flex !== void 0)
        return { flex: s.flex };
    });
    return (l, c) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value),
      style: normalizeStyle(n.value)
    }, [
      renderSlot(l.$slots, "default")
    ], 6));
  }
});
ie.install = (e) => {
  e.component(ie.name || "WeuiFlex", ie);
};
ne.install = (e) => {
  e.component(ne.name || "WeuiFlexItem", ne);
};
const wt = {
  key: 0,
  class: "weui-footer__links"
}, yt = ["href"], bt = {
  key: 1,
  class: "weui-footer__text"
}, Ct = {
  name: "WeuiFooter",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ue = /* @__PURE__ */ defineComponent({
  ...Ct,
  props: {
    text: { default: void 0 },
    links: { default: void 0 },
    fixed: { type: Boolean, default: false }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const l = ["weui-footer"];
      return s.fixed && l.push("weui-footer_fixed-bottom"), l;
    }), n = computed(
      () => Array.isArray(s.links) && s.links.length > 0
    );
    return (l, c) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value)
    }, [
      renderSlot(l.$slots, "default", {}, () => [
        n.value ? (openBlock(), createElementBlock("p", wt, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.links, (i, u) => (openBlock(), createElementBlock("a", {
            key: u,
            href: i.url,
            class: "weui-footer__link"
          }, toDisplayString(i.text), 9, yt))), 128))
        ])) : createCommentVNode("", true),
        e.text ? (openBlock(), createElementBlock("p", bt, toDisplayString(e.text), 1)) : createCommentVNode("", true)
      ])
    ], 2));
  }
});
ue.install = (e) => {
  e.component(ue.name || "WeuiFooter", ue);
};
const kt = {
  key: 0,
  class: "weui-progress__info"
}, xt = {
  name: "WeuiProgress",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ce = /* @__PURE__ */ defineComponent({
  ...xt,
  props: {
    percent: {},
    showInfo: { type: Boolean, default: true },
    strokeWidth: { default: void 0 },
    activeColor: { default: void 0 },
    backgroundColor: { default: void 0 },
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const i = ["weui-progress"];
      return s.extClass && i.push(s.extClass), i;
    }), n = computed(() => {
      const i = {};
      return s.strokeWidth != null && (i.height = `${s.strokeWidth}px`), s.backgroundColor && (i["background-color"] = s.backgroundColor), i;
    }), l = computed(() => {
      const i = {}, u = Math.max(0, Math.min(100, s.percent));
      return i.width = `${u}%`, s.activeColor && (i["background-color"] = s.activeColor), i;
    }), c = computed(() => Math.round(s.percent));
    return (i, u) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value)
    }, [
      createElementVNode("div", {
        class: "weui-progress__bar",
        style: normalizeStyle(n.value)
      }, [
        createElementVNode("div", {
          class: "weui-progress__inner-bar",
          style: normalizeStyle(l.value)
        }, null, 4)
      ], 4),
      e.showInfo ? (openBlock(), createElementBlock("span", kt, toDisplayString(c.value) + "%", 1)) : createCommentVNode("", true)
    ], 2));
  }
});
ce.install = (e) => {
  e.component(ce.name || "WeuiProgress", ce);
};
const $t = {
  key: 0,
  class: "weui-loading"
}, gt = {
  key: 1,
  class: "weui-loadmore__tips"
}, Wt = {
  name: "WeuiLoadmore",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, re = /* @__PURE__ */ defineComponent({
  ...Wt,
  props: {
    type: { default: "default" },
    text: { default: "正在加载" },
    showText: { type: Boolean, default: true },
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const n = ["weui-loadmore"];
      return s.type === "line" && n.push("weui-loadmore_line"), s.type === "dot" && n.push("weui-loadmore_dot"), s.extClass && n.push(s.extClass), n;
    });
    return (n, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value)
    }, [
      e.type === "default" ? (openBlock(), createElementBlock("div", $t)) : createCommentVNode("", true),
      e.showText ? (openBlock(), createElementBlock("span", gt, toDisplayString(e.text), 1)) : createCommentVNode("", true)
    ], 2));
  }
});
re.install = (e) => {
  e.component(re.name || "WeuiLoadmore", re);
};
const Tt = ["hover-class", "role"], Bt = ["src"], It = {
  key: 2,
  class: "weui-label"
}, St = {
  key: 3,
  class: "weui-label"
}, Gt = {
  key: 0,
  class: "weui-cell__desc"
}, zt = { class: "weui-cell__ft" }, Vt = ["hover-class", "role"], Ft = ["src"], Pt = {
  key: 2,
  class: "weui-label"
}, Dt = {
  key: 3,
  class: "weui-label"
}, Mt = {
  key: 0,
  class: "weui-cell__desc"
}, At = { name: "WeuiCell", options: { styleIsolation: "apply-shared", addGlobalClass: true } }, de = /* @__PURE__ */ defineComponent({
  ...At,
  props: {
    title: { default: "" },
    label: { default: void 0 },
    subtitle: { default: void 0 },
    value: { default: "" },
    desc: { default: void 0 },
    icon: { default: void 0 },
    footer: { default: "" },
    access: { type: Boolean, default: false },
    link: { type: Boolean, default: false },
    url: { default: "" },
    vcode: { type: Boolean, default: false },
    warn: { type: Boolean, default: false },
    uploader: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    primary: { type: Boolean, default: false },
    wrap: { type: Boolean, default: false },
    select: { type: Boolean, default: false },
    selectBefore: { type: Boolean, default: false },
    selectAfter: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    hover: { type: Boolean, default: true },
    inline: { type: Boolean, default: true },
    hasHeader: { type: Boolean, default: true },
    hasBody: { type: Boolean, default: true },
    hasFooter: { type: Boolean, default: true },
    extClass: { default: void 0 },
    iconClass: { default: void 0 },
    bodyClass: { default: void 0 },
    footerClass: { default: void 0 },
    ariaRole: { default: void 0 },
    isSwipe: { type: Boolean, default: false },
    swipeText: { default: "删除" },
    swipeType: { default: "warn" }
  },
  emits: ["click", "navigate", "navigate-error", "swipe-click"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = ref(false), c = ref(0), i = computed(() => t.access || t.link), u = computed(() => {
      const d = ["weui-cell"];
      return i.value && d.push("weui-cell_access"), t.vcode && d.push("weui-cell_vcode"), t.warn && d.push("weui-cell_warn"), t.uploader && d.push("weui-cell_uploader"), t.readonly && d.push("weui-cell_readonly"), t.disabled && d.push("weui-cell_disabled"), t.primary && d.push("weui-cell_primary"), t.wrap && d.push("weui-cell_wrap"), t.select && d.push("weui-cell_select"), t.selectBefore && d.push("weui-cell_select-before"), t.selectAfter && d.push("weui-cell_select-after"), t.active && d.push("weui-cell_active"), t.inline || d.push("weui-cell_vertical"), t.extClass && d.push(t.extClass), d;
    }), f = computed(() => ["weui-cell", "weui-cell_swiped"]), m = computed(() => ({ transform: l.value ? "translateX(-68px)" : void 0, transition: "transform .3s ease" })), y = computed(() => ["weui-swiped-btn", t.swipeType === "warn" ? "weui-swiped-btn_warn" : void 0]), k = computed(() => ["weui-cell__ft", t.footerClass].filter(Boolean)), W = computed(() => ["weui-cell__bd", t.vcode ? "weui-flex" : void 0, t.bodyClass].filter(Boolean)), T = (d) => {
      var _;
      c.value = ((_ = d.touches[0]) == null ? void 0 : _.clientX) ?? 0;
    }, C = (d) => {
      var I;
      const _ = ((I = d.touches[0]) == null ? void 0 : I.clientX) ?? c.value, B = c.value - _;
      B > 30 && (l.value = true), B < -30 && (l.value = false);
    }, g = () => {
      n("swipe-click"), l.value = false;
    }, x = (d) => {
      if (l.value) {
        l.value = false;
        return;
      }
      n("click", d), !(!i.value || !t.url) && n("navigate", { url: t.url });
    };
    return (d, _) => e.isSwipe ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(f.value)
    }, [
      createElementVNode("div", {
        class: "weui-cell__bd",
        style: normalizeStyle(m.value),
        onTouchstartPassive: T,
        onTouchmovePassive: C
      }, [
        createElementVNode("div", {
          class: normalizeClass(u.value),
          "hover-class": e.hover ? "weui-cell_active" : void 0,
          role: e.ariaRole,
          onClick: x
        }, [
          e.hasHeader ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["weui-cell__hd", e.iconClass])
          }, [
            e.icon ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: e.icon,
              class: "weui-cell__icon"
            }, null, 8, Bt)) : renderSlot(d.$slots, "icon", {}, void 0, void 0, 1),
            e.label ? (openBlock(), createElementBlock("label", It, toDisplayString(e.label), 1)) : e.title ? (openBlock(), createElementBlock("span", St, toDisplayString(e.title), 1)) : renderSlot(d.$slots, "title", {}, void 0, void 0, 4)
          ], 2)) : createCommentVNode("", true),
          e.hasBody ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(W.value)
          }, [
            renderSlot(d.$slots, "default"),
            e.subtitle ? (openBlock(), createElementBlock("div", Gt, toDisplayString(e.subtitle), 1)) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true),
          e.hasFooter ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass(k.value)
          }, [
            e.value || e.desc ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(e.value || e.desc), 1)
            ], 64)) : e.footer ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(e.footer), 1)
            ], 64)) : renderSlot(d.$slots, "footer", {}, void 0, void 0, 2)
          ], 2)) : createCommentVNode("", true)
        ], 10, Tt)
      ], 36),
      createElementVNode("div", zt, [
        createElementVNode("a", {
          role: "button",
          href: "javascript:",
          class: normalizeClass(y.value),
          onClick: withModifiers(g, ["prevent"])
        }, toDisplayString(e.swipeText), 3)
      ])
    ], 2)) : (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(u.value),
      "hover-class": e.hover ? "weui-cell_active" : void 0,
      role: e.ariaRole,
      onClick: x
    }, [
      e.hasHeader ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["weui-cell__hd", e.iconClass])
      }, [
        e.icon ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: e.icon,
          class: "weui-cell__icon"
        }, null, 8, Ft)) : renderSlot(d.$slots, "icon", {}, void 0, void 0, 1),
        e.label ? (openBlock(), createElementBlock("label", Pt, toDisplayString(e.label), 1)) : e.title ? (openBlock(), createElementBlock("span", Dt, toDisplayString(e.title), 1)) : renderSlot(d.$slots, "title", {}, void 0, void 0, 4)
      ], 2)) : createCommentVNode("", true),
      e.hasBody ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(W.value)
      }, [
        renderSlot(d.$slots, "default"),
        e.subtitle ? (openBlock(), createElementBlock("div", Mt, toDisplayString(e.subtitle), 1)) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true),
      e.hasFooter ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: normalizeClass(k.value)
      }, [
        e.value || e.desc ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createTextVNode(toDisplayString(e.value || e.desc), 1)
        ], 64)) : e.footer ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createTextVNode(toDisplayString(e.footer), 1)
        ], 64)) : renderSlot(d.$slots, "footer", {}, void 0, void 0, 2)
      ], 2)) : createCommentVNode("", true)
    ], 10, Vt));
  }
}), Ht = {
  name: "WeuiCells",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Ze = /* @__PURE__ */ defineComponent({
  ...Ht,
  props: {
    extClass: {}
  },
  setup(e) {
    return (s, t) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["weui-cells", e.extClass].filter(Boolean).join(" "))
    }, [
      renderSlot(s.$slots, "default")
    ], 2));
  }
}), Rt = { class: "weui-cells__title" }, Lt = {
  name: "WeuiCellsTitle",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, et = /* @__PURE__ */ defineComponent({
  ...Lt,
  props: {
    title: {}
  },
  setup(e) {
    return (s, t) => (openBlock(), createElementBlock("div", Rt, [
      renderSlot(s.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(e.title), 1)
      ])
    ]));
  }
}), jt = { class: "weui-cells__tips" }, Ot = {
  name: "WeuiCellsTips",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, tt = /* @__PURE__ */ defineComponent({
  ...Ot,
  props: {
    tips: {}
  },
  setup(e) {
    return (s, t) => (openBlock(), createElementBlock("div", jt, [
      renderSlot(s.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(e.tips), 1)
      ])
    ]));
  }
}), Nt = ["role"], Et = {
  name: "WeuiCellGroup",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, fe = /* @__PURE__ */ defineComponent({
  ...Et,
  props: {
    title: { default: void 0 },
    footer: { default: void 0 },
    form: { type: Boolean, default: false },
    radio: { type: Boolean, default: false },
    checkbox: { type: Boolean, default: false },
    extClass: { default: void 0 },
    ariaRole: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const l = ["weui-cells__group"];
      return s.form && l.push("weui-cells__group_form"), s.extClass && l.push(s.extClass), l;
    }), n = computed(() => {
      const l = [];
      return s.radio && l.push("weui-cells_radio"), s.checkbox && l.push("weui-cells_checkbox"), s.form && l.push("weui-cells_form"), l.join(" ") || void 0;
    });
    return (l, c) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value),
      role: e.ariaRole
    }, [
      createVNode(unref(et), null, {
        default: withCtx(() => [
          renderSlot(l.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(e.title), 1)
          ])
        ]),
        _: 3
      }),
      createVNode(unref(Ze), { "ext-class": n.value }, {
        default: withCtx(() => [
          renderSlot(l.$slots, "default")
        ]),
        _: 3
      }, 8, ["ext-class"]),
      createVNode(unref(tt), null, {
        default: withCtx(() => [
          renderSlot(l.$slots, "footer", {}, () => [
            createTextVNode(toDisplayString(e.footer), 1)
          ])
        ]),
        _: 3
      })
    ], 10, Nt));
  }
});
de.install = (e) => {
  e.component(de.name || "WeuiCell", de);
};
fe.install = (e) => {
  e.component(fe.name || "WeuiCellGroup", fe);
};
const Xt = {
  name: "WeuiGrid",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, he = /* @__PURE__ */ defineComponent({
  ...Xt,
  props: {
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const n = ["weui-grids"];
      return s.extClass && n.push(s.extClass), n;
    });
    return (n, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value)
    }, [
      renderSlot(n.$slots, "default")
    ], 2));
  }
}), Ut = {
  key: 0,
  class: "weui-grid__icon"
}, qt = ["src"], Kt = {
  key: 1,
  class: "weui-grid__label"
}, Yt = {
  name: "WeuiGridItem",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ve = /* @__PURE__ */ defineComponent({
  ...Yt,
  props: {
    icon: { default: void 0 },
    label: { default: void 0 },
    url: { default: void 0 },
    extClass: { default: void 0 }
  },
  emits: ["click", "navigate"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = useSlots(), c = computed(() => !!l.default), i = computed(() => !!l.icon), u = computed(() => !!l.label), f = computed(() => {
      const y = ["weui-grid"];
      return t.extClass && y.push(t.extClass), y;
    }), m = (y) => {
      n("click", y), t.url && n("navigate", { url: t.url });
    };
    return (y, k) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(f.value),
      role: "button",
      "hover-class": "weui-grid_active",
      onClick: m
    }, [
      c.value ? renderSlot(y.$slots, "default", {}, void 0, void 0, 0) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        e.icon || i.value ? (openBlock(), createElementBlock("div", Ut, [
          e.icon ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: e.icon
          }, null, 8, qt)) : renderSlot(y.$slots, "icon", {}, void 0, void 0, 1)
        ])) : createCommentVNode("", true),
        e.label || u.value ? (openBlock(), createElementBlock("p", Kt, [
          e.label ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(toDisplayString(e.label), 1)
          ], 64)) : renderSlot(y.$slots, "label", {}, void 0, void 0, 1)
        ])) : createCommentVNode("", true)
      ], 64))
    ], 2));
  }
});
he.install = (e) => {
  e.component(he.name || "WeuiGrid", he);
};
ve.install = (e) => {
  e.component(ve.name || "WeuiGridItem", ve);
};
const Jt = {
  key: 0,
  class: "weui-panel__hd"
}, Qt = { class: "weui-panel__bd" }, Zt = {
  key: 1,
  class: "weui-panel__ft"
}, es = ["href"], ts = { class: "weui-cell__bd" }, ss = {
  name: "WeuiPanel",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, me = /* @__PURE__ */ defineComponent({
  ...ss,
  props: {
    title: { default: void 0 },
    type: { default: "default" },
    footerText: { default: void 0 },
    footerHref: { default: "javascript:void(0);" },
    extClass: { default: void 0 }
  },
  emits: ["footer-click"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      const c = ["weui-panel"];
      return t.type === "access" && c.push("weui-panel_access"), t.extClass && c.push(t.extClass), c;
    });
    return (c, i) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(l.value)
    }, [
      c.$slots.header || e.title ? (openBlock(), createElementBlock("div", Jt, [
        renderSlot(c.$slots, "header", {}, () => [
          createTextVNode(toDisplayString(e.title), 1)
        ])
      ])) : createCommentVNode("", true),
      createElementVNode("div", Qt, [
        renderSlot(c.$slots, "default")
      ]),
      e.footerText || c.$slots.footer ? (openBlock(), createElementBlock("div", Zt, [
        renderSlot(c.$slots, "footer", {}, () => [
          e.footerText ? (openBlock(), createElementBlock("a", {
            key: 0,
            href: e.footerHref,
            class: "weui-cell weui-cell_active weui-cell_access weui-cell_link",
            onClick: i[0] || (i[0] = (u) => n("footer-click", u))
          }, [
            createElementVNode("span", ts, toDisplayString(e.footerText), 1),
            i[1] || (i[1] = createElementVNode("span", { class: "weui-cell__ft" }, null, -1))
          ], 8, es)) : createCommentVNode("", true)
        ])
      ])) : createCommentVNode("", true)
    ], 2));
  }
});
me.install = (e) => {
  e.component(me.name || "WeuiPanel", me);
};
const ls = { class: "weui-cells" }, as = ["href"], os = { class: "weui-media-box__hd" }, is = ["src"], ns = { class: "weui-media-box__bd" }, us = {
  key: 0,
  class: "weui-media-box__title"
}, cs = {
  key: 1,
  class: "weui-media-box__desc"
}, rs = { class: "weui-media-box__hd" }, ds = ["src"], fs = { class: "weui-media-box__bd" }, hs = {
  key: 0,
  class: "weui-media-box__title"
}, vs = {
  key: 1,
  class: "weui-media-box__desc"
}, ms = {
  key: 0,
  class: "weui-media-box__title"
}, ps = {
  key: 1,
  class: "weui-media-box__desc"
}, _s = {
  name: "WeuiMediaBox",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, pe = /* @__PURE__ */ defineComponent({
  ..._s,
  props: {
    type: { default: "text" },
    thumb: { default: void 0 },
    title: { default: void 0 },
    desc: { default: void 0 },
    href: { default: void 0 },
    extClass: { default: void 0 }
  },
  emits: ["click"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = useSlots(), c = computed(() => !!(t.thumb || l.hd)), i = computed(() => {
      const f = ["weui-media-box"];
      return t.type === "cells" ? f.push("weui-media-box_small-appmsg") : c.value ? f.push("weui-media-box_appmsg") : f.push("weui-media-box_text"), t.extClass && f.push(t.extClass), f;
    }), u = (f) => {
      t.href || n("click", f);
    };
    return (f, m) => e.type === "cells" ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(i.value)
    }, [
      createElementVNode("div", ls, [
        renderSlot(f.$slots, "default")
      ])
    ], 2)) : c.value && e.href ? (openBlock(), createElementBlock("a", {
      key: 1,
      href: e.href,
      class: normalizeClass(i.value),
      onClick: u
    }, [
      createElementVNode("div", os, [
        renderSlot(f.$slots, "hd", {}, () => [
          e.thumb ? (openBlock(), createElementBlock("img", {
            key: 0,
            class: "weui-media-box__thumb",
            src: e.thumb
          }, null, 8, is)) : createCommentVNode("", true)
        ])
      ]),
      createElementVNode("div", ns, [
        e.title ? (openBlock(), createElementBlock("strong", us, toDisplayString(e.title), 1)) : createCommentVNode("", true),
        e.desc ? (openBlock(), createElementBlock("p", cs, toDisplayString(e.desc), 1)) : createCommentVNode("", true),
        renderSlot(f.$slots, "default")
      ])
    ], 10, as)) : c.value ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: normalizeClass(i.value),
      onClick: u
    }, [
      createElementVNode("div", rs, [
        renderSlot(f.$slots, "hd", {}, () => [
          e.thumb ? (openBlock(), createElementBlock("img", {
            key: 0,
            class: "weui-media-box__thumb",
            src: e.thumb
          }, null, 8, ds)) : createCommentVNode("", true)
        ])
      ]),
      createElementVNode("div", fs, [
        e.title ? (openBlock(), createElementBlock("strong", hs, toDisplayString(e.title), 1)) : createCommentVNode("", true),
        e.desc ? (openBlock(), createElementBlock("p", vs, toDisplayString(e.desc), 1)) : createCommentVNode("", true),
        renderSlot(f.$slots, "default")
      ])
    ], 2)) : (openBlock(), createElementBlock("div", {
      key: 3,
      class: normalizeClass(i.value),
      onClick: u
    }, [
      e.title ? (openBlock(), createElementBlock("strong", ms, toDisplayString(e.title), 1)) : createCommentVNode("", true),
      e.desc ? (openBlock(), createElementBlock("p", ps, toDisplayString(e.desc), 1)) : createCommentVNode("", true),
      renderSlot(f.$slots, "default")
    ], 2));
  }
});
pe.install = (e) => {
  e.component(pe.name || "WeuiMediaBox", pe);
};
const ws = {
  key: 0,
  class: "weui-form__text-area"
}, ys = {
  key: 0,
  class: "weui-form__title"
}, bs = {
  key: 1,
  class: "weui-form__desc"
}, Cs = { class: "weui-form__control-area" }, ks = {
  key: 0,
  class: "weui-form__ft"
}, xs = {
  name: "WeuiForm",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, _e = /* @__PURE__ */ defineComponent({
  ...xs,
  props: {
    title: { default: void 0 },
    desc: { default: void 0 },
    bottomFixed: { type: Boolean, default: false },
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = useSlots(), n = computed(() => {
      const u = ["weui-form"];
      return s.bottomFixed && u.push("weui-bottom-fixed-opr-page"), s.extClass && u.push(s.extClass), u;
    }), l = computed(() => {
      const u = ["weui-form__bd"];
      return s.bottomFixed && u.push("weui-bottom-fixed-opr-page__content"), u;
    }), c = computed(() => !!(s.title || s.desc || t.title)), i = computed(() => !!t.footer);
    return (u, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(n.value)
    }, [
      createElementVNode("div", {
        class: normalizeClass(l.value)
      }, [
        c.value ? (openBlock(), createElementBlock("div", ws, [
          renderSlot(u.$slots, "title", {}, () => [
            e.title ? (openBlock(), createElementBlock("h2", ys, toDisplayString(e.title), 1)) : createCommentVNode("", true),
            e.desc ? (openBlock(), createElementBlock("div", bs, toDisplayString(e.desc), 1)) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true),
        createElementVNode("div", Cs, [
          renderSlot(u.$slots, "default")
        ])
      ], 2),
      i.value ? (openBlock(), createElementBlock("div", ks, [
        renderSlot(u.$slots, "footer")
      ])) : createCommentVNode("", true)
    ], 2));
  }
});
_e.install = (e) => {
  e.component(_e.name || "WeuiForm", _e);
};
const $s = {
  key: 0,
  class: "weui-form-preview__hd"
}, gs = { class: "weui-form-preview__value" }, Ws = {
  key: 1,
  class: "weui-form-preview__bd"
}, Ts = { class: "weui-form-preview__label" }, Bs = { class: "weui-form-preview__value" }, Is = {
  key: 2,
  class: "weui-form-preview__ft"
}, Ss = ["onClick"], Gs = {
  name: "WeuiPreview",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, we = /* @__PURE__ */ defineComponent({
  ...Gs,
  props: {
    title: { default: void 0 },
    items: { default: () => [] },
    buttons: { default: () => [] },
    extClass: { default: void 0 }
  },
  emits: ["buttontap"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = useSlots(), c = computed(() => {
      const k = ["weui-form-preview"];
      return t.extClass && k.push(t.extClass), k;
    }), i = computed(() => !!(t.title || l.header)), u = computed(() => !!(t.items && t.items.length > 0 || l.default)), f = computed(() => !!(t.buttons && t.buttons.length > 0 || l.footer)), m = (k) => k.type === "primary" ? "weui-form-preview__btn_primary" : k.type === "default" ? "weui-form-preview__btn_default" : "", y = (k, W) => {
      n("buttontap", k, W);
    };
    return (k, W) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(c.value)
    }, [
      i.value ? (openBlock(), createElementBlock("div", $s, [
        renderSlot(k.$slots, "header", {}, () => [
          createElementVNode("div", gs, toDisplayString(e.title), 1)
        ])
      ])) : createCommentVNode("", true),
      u.value ? (openBlock(), createElementBlock("div", Ws, [
        renderSlot(k.$slots, "default", {}, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.items, (T, C) => (openBlock(), createElementBlock("div", {
            key: C,
            class: "weui-form-preview__item"
          }, [
            createElementVNode("label", Ts, toDisplayString(T.label), 1),
            createElementVNode("span", Bs, toDisplayString(T.value), 1)
          ]))), 128))
        ])
      ])) : createCommentVNode("", true),
      f.value ? (openBlock(), createElementBlock("div", Is, [
        renderSlot(k.$slots, "footer", {}, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.buttons, (T, C) => (openBlock(), createElementBlock("a", {
            key: C,
            role: "button",
            href: "javascript:",
            class: normalizeClass(["weui-form-preview__btn", m(T)]),
            onClick: (g) => y(T, C)
          }, toDisplayString(T.text), 11, Ss))), 128))
        ])
      ])) : createCommentVNode("", true)
    ], 2));
  }
});
we.install = (e) => {
  e.component(we.name || "WeuiPreview", we);
};
const zs = ["checked", "disabled"], Vs = { class: "weui-agree__text" }, Fs = {
  name: "WeuiAgree",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ye = /* @__PURE__ */ defineComponent({
  ...Fs,
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    extClass: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      const i = ["weui-agree", "weui-wa-hotarea"];
      return t.extClass && i.push(t.extClass), i;
    }), c = (i) => {
      const u = i.target.checked;
      n("update:modelValue", u), n("change", u);
    };
    return (i, u) => (openBlock(), createElementBlock("label", {
      class: normalizeClass(l.value)
    }, [
      createElementVNode("input", {
        type: "checkbox",
        class: "weui-agree__checkbox",
        checked: e.modelValue,
        disabled: e.disabled,
        onChange: c
      }, null, 40, zs),
      createElementVNode("span", Vs, [
        renderSlot(i.$slots, "default")
      ])
    ], 2));
  }
});
ye.install = (e) => {
  e.component(ye.name, ye);
};
const Ps = {
  key: 0,
  class: "weui-input__wrapper"
}, Ds = ["value", "type", "placeholder", "disabled", "maxlength"], Ms = ["value", "type", "placeholder", "disabled", "maxlength"], As = {
  name: "WeuiInput",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, be = /* @__PURE__ */ defineComponent({
  ...As,
  props: {
    modelValue: { default: "" },
    placeholder: {},
    type: { default: "text" },
    disabled: { type: Boolean, default: false },
    maxlength: { default: 140 },
    clearable: { type: Boolean, default: false },
    focus: { type: Boolean, default: false },
    extClass: {}
  },
  emits: ["update:modelValue", "focus", "blur", "confirm", "clear"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = ref(null), c = computed(() => {
      const C = ["weui-input"];
      return t.extClass && C.push(t.extClass), C;
    }), i = computed(() => t.type === "password" ? "password" : t.type === "idcard" || t.type === "digit" ? "text" : t.type), u = computed(() => ({})), f = computed(
      () => t.clearable && !!t.modelValue && !t.disabled
    );
    watch(() => t.focus, (C) => {
      var g, x;
      C ? (g = l.value) == null || g.focus() : (x = l.value) == null || x.blur();
    });
    const m = (C) => {
      var d, _;
      const x = ((d = C.detail) == null ? void 0 : d.value) ?? ((_ = C.target) == null ? void 0 : _.value) ?? "";
      n("update:modelValue", x);
    }, y = (C) => n("focus", C), k = (C) => n("blur", C), W = (C) => n("confirm", C), T = () => {
      n("update:modelValue", ""), n("clear");
    };
    return (C, g) => e.clearable ? (openBlock(), createElementBlock("div", Ps, [
      createElementVNode("input", mergeProps({
        ref_key: "inputRef",
        ref: l,
        class: c.value,
        value: e.modelValue,
        type: i.value,
        placeholder: e.placeholder,
        disabled: e.disabled,
        maxlength: e.maxlength
      }, u.value, {
        onInput: m,
        onFocus: y,
        onBlur: k,
        onKeydown: withKeys(W, ["enter"]),
        onConfirm: W
      }), null, 16, Ds),
      f.value ? (openBlock(), createElementBlock("button", {
        key: 0,
        type: "button",
        class: "weui-icon-clear",
        onClick: T
      })) : createCommentVNode("", true)
    ])) : (openBlock(), createElementBlock("input", mergeProps({
      key: 1,
      ref_key: "inputRef",
      ref: l,
      class: c.value,
      value: e.modelValue,
      type: i.value,
      placeholder: e.placeholder,
      disabled: e.disabled,
      maxlength: e.maxlength
    }, u.value, {
      onInput: m,
      onFocus: y,
      onBlur: k,
      onKeydown: withKeys(W, ["enter"]),
      onConfirm: W
    }), null, 16, Ms));
  }
});
be.install = (e) => {
  e.component(be.name || "WeuiInput", be);
};
const Hs = {
  key: 0,
  class: "weui-cell__hd"
}, Rs = { class: "weui-label" }, Ls = { class: "weui-cell__bd" }, js = ["value", "placeholder", "maxlength", "rows", "disabled"], Os = {
  key: 0,
  class: "weui-textarea-counter"
}, Ns = {
  key: 1,
  class: "weui-cell__ft"
}, Es = {
  name: "WeuiTextarea",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Ce = /* @__PURE__ */ defineComponent({
  ...Es,
  props: {
    modelValue: { default: "" },
    placeholder: {},
    rows: { default: 3 },
    maxlength: { default: 200 },
    showCount: { type: Boolean, default: true },
    label: {},
    disabled: { type: Boolean, default: false },
    warn: { type: Boolean, default: false },
    primary: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    extClass: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      const u = ["weui-cell", "weui-cell_active"];
      return t.warn && u.push("weui-cell_warn"), t.primary && u.push("weui-cell_primary"), t.vertical && u.push("weui-cell_vertical"), t.extClass && u.push(t.extClass), u;
    }), c = computed(() => {
      var u;
      return ((u = t.modelValue) == null ? void 0 : u.length) ?? 0;
    }), i = (u) => {
      const f = u.target.value;
      n("update:modelValue", f), n("change", f);
    };
    return (u, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(l.value)
    }, [
      e.label ? (openBlock(), createElementBlock("div", Hs, [
        createElementVNode("label", Rs, toDisplayString(e.label), 1)
      ])) : createCommentVNode("", true),
      createElementVNode("div", Ls, [
        createElementVNode("textarea", {
          class: "weui-textarea",
          value: e.modelValue,
          placeholder: e.placeholder,
          maxlength: e.maxlength,
          rows: e.rows,
          disabled: e.disabled,
          onInput: i
        }, null, 40, js),
        e.showCount ? (openBlock(), createElementBlock("div", Os, [
          createElementVNode("span", null, toDisplayString(c.value), 1),
          createTextVNode("/" + toDisplayString(e.maxlength), 1)
        ])) : createCommentVNode("", true)
      ]),
      e.warn ? (openBlock(), createElementBlock("div", Ns, [...f[0] || (f[0] = [
        createElementVNode("i", { class: "weui-icon-warn" }, null, -1)
      ])])) : createCommentVNode("", true)
    ], 2));
  }
});
Ce.install = (e) => {
  e.component(Ce.name || "WeuiTextarea", Ce);
};
const Xs = { class: "weui-cell__hd" }, Us = ["value", "checked", "disabled"], qs = { class: "weui-cell__bd" }, Ks = {
  name: "WeuiCheckbox",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ke = /* @__PURE__ */ defineComponent({
  ...Ks,
  props: {
    value: {},
    label: { default: "" },
    disabled: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    extClass: {}
  },
  emits: ["update:checked", "change"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = inject("weuiCheckboxGroup", null), c = computed(() => l ? l.modelValue.value.includes(t.value) : t.checked), i = computed(() => t.disabled || ((l == null ? void 0 : l.disabled.value) ?? false)), u = computed(() => {
      const y = ["weui-cell", "weui-cell_active", "weui-check__label"];
      return i.value && y.push("weui-cell_disabled"), t.extClass && y.push(t.extClass), y;
    }), f = () => {
      if (l) return;
      const y = !c.value;
      n("update:checked", y), n("change", y);
    }, m = () => {
      l != null && l.toggle && l.toggle(t.value);
    };
    return (y, k) => (openBlock(), createElementBlock("label", {
      class: normalizeClass(u.value),
      onClick: f
    }, [
      createElementVNode("div", Xs, [
        (openBlock(), createElementBlock("input", {
          key: 0,
          type: "checkbox",
          class: "weui-check",
          value: e.value,
          checked: c.value,
          disabled: i.value,
          onClick: k[0] || (k[0] = withModifiers(() => {
          }, ["stop"])),
          onChange: withModifiers(m, ["stop"])
        }, null, 40, Us)),
        k[1] || (k[1] = createElementVNode("div", { class: "weui-icon-checked" }, null, -1))
      ]),
      createElementVNode("div", qs, [
        renderSlot(y.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(e.label), 1)
        ])
      ])
    ], 2));
  }
}), Ys = ["role"], Js = {
  key: 0,
  class: "weui-cells__title"
}, Qs = {
  key: 1,
  class: "weui-cells__tips"
}, Zs = {
  name: "WeuiCheckboxGroup",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, xe = /* @__PURE__ */ defineComponent({
  ...Zs,
  props: {
    modelValue: { default: () => [] },
    multi: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    title: {},
    footer: {},
    form: { type: Boolean, default: false },
    extClass: {},
    ariaRole: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      const u = ["weui-cells__group"];
      return t.form && u.push("weui-cells__group_form"), t.extClass && u.push(t.extClass), u;
    }), c = computed(() => {
      const u = ["weui-cells", "weui-cells_after-title"];
      return t.multi ? u.push("weui-cells_checkbox") : u.push("weui-cells_radio"), t.form && u.push("weui-cells_form"), u;
    }), i = (u) => {
      const f = new Set(t.modelValue);
      f.has(u) ? f.delete(u) : f.add(u);
      const m = Array.from(f);
      n("update:modelValue", m), n("change", m);
    };
    return provide("weuiCheckboxGroup", {
      modelValue: computed(() => t.modelValue),
      disabled: computed(() => t.disabled),
      // H5 端独有：toggle 方法（非 H5 端通过原生 checkbox-group change 事件联动）
      toggle: i
    }), (u, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(l.value),
      role: e.ariaRole
    }, [
      e.title ? (openBlock(), createElementBlock("div", Js, toDisplayString(e.title), 1)) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(c.value)
      }, [
        renderSlot(u.$slots, "default", {}, void 0, void 0, 0)
      ], 2),
      e.footer ? (openBlock(), createElementBlock("div", Qs, toDisplayString(e.footer), 1)) : createCommentVNode("", true)
    ], 10, Ys));
  }
});
ke.install = (e) => {
  e.component(ke.name || "WeuiCheckbox", ke);
};
xe.install = (e) => {
  e.component(xe.name || "WeuiCheckboxGroup", xe);
};
const el = { class: "weui-search-bar__form" }, tl = { class: "weui-search-bar__box" }, sl = ["value", "placeholder"], ll = {
  name: "WeuiSearchbar",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, $e = /* @__PURE__ */ defineComponent({
  ...ll,
  props: {
    modelValue: { default: "" },
    placeholder: { default: "搜索" },
    cancelText: { default: "取消" },
    focus: { type: Boolean, default: false },
    searchButtonText: {},
    extClass: {}
  },
  emits: ["update:modelValue", "focus", "blur", "confirm", "cancel", "clear", "search"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = ref(null), c = ref(t.focus), i = computed(() => {
      const _ = ["weui-search-bar"];
      return c.value && _.push("weui-search-bar_focusing"), t.extClass && _.push(t.extClass), _;
    }), u = computed(() => !!t.modelValue), f = computed(() => c.value && !t.searchButtonText), m = computed(() => ({}));
    watch(() => t.focus, (_) => {
      var B, I;
      c.value = _, _ ? (B = l.value) == null || B.focus() : (I = l.value) == null || I.blur();
    });
    const y = (_) => {
      var D, j;
      const I = ((D = _.detail) == null ? void 0 : D.value) ?? ((j = _.target) == null ? void 0 : j.value) ?? "";
      n("update:modelValue", I);
    }, k = (_) => {
      c.value = true, n("focus", _);
    }, W = (_) => {
      t.modelValue || (c.value = false), n("blur", _);
    }, T = (_) => {
      n("confirm", _), n("search", t.modelValue);
    }, C = () => {
      n("update:modelValue", ""), n("clear");
    }, g = () => {
      c.value = false, n("cancel");
    }, x = () => {
      var _;
      n("search", t.modelValue), c.value = true, (_ = l.value) == null || _.focus();
    }, d = () => {
      var _;
      c.value = true, (_ = l.value) == null || _.focus();
    };
    return (_, B) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(i.value)
    }, [
      createElementVNode("div", el, [
        createElementVNode("div", tl, [
          B[0] || (B[0] = createElementVNode("div", { class: "weui-icon-search" }, null, -1)),
          createElementVNode("input", mergeProps({
            ref_key: "inputRef",
            ref: l,
            class: "weui-search-bar__input",
            value: e.modelValue,
            placeholder: e.placeholder
          }, m.value, {
            onInput: y,
            onFocus: k,
            onBlur: W,
            onKeydown: withKeys(T, ["enter"]),
            onConfirm: T
          }), null, 16, sl),
          u.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "weui-icon-clear",
            onClick: C
          })) : createCommentVNode("", true)
        ]),
        createElementVNode("div", {
          class: "weui-search-bar__label",
          onClick: d
        }, [
          B[1] || (B[1] = createElementVNode("div", { class: "weui-icon-search" }, null, -1)),
          createElementVNode("span", null, toDisplayString(e.placeholder), 1)
        ])
      ]),
      f.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "weui-search-bar__cancel-btn",
        onClick: g
      }, toDisplayString(e.cancelText), 1)) : createCommentVNode("", true),
      e.searchButtonText ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: "weui-search-bar__btn",
        onClick: x
      }, toDisplayString(e.searchButtonText), 1)) : createCommentVNode("", true)
    ], 2));
  }
});
$e.install = (e) => {
  e.component($e.name || "WeuiSearchbar", $e);
};
const al = {
  key: 0,
  class: "weui-uploader__hd"
}, ol = {
  key: 0,
  class: "weui-uploader__title"
}, il = { class: "weui-uploader__info" }, nl = { class: "weui-uploader__bd" }, ul = { class: "weui-uploader__files" }, cl = ["onClick", "onLongpress"], rl = {
  key: 0,
  class: "weui-uploader__file-content"
}, dl = ["onClick"], fl = ["accept", "multiple"], hl = {
  key: 1,
  class: "weui-uploader__tips"
}, vl = {
  name: "WeuiUploader",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ge = /* @__PURE__ */ defineComponent({
  ...vl,
  props: {
    files: { default: () => [] },
    title: {},
    tips: {},
    count: { default: 9 },
    showHeader: { type: Boolean, default: true },
    extClass: {},
    accept: { default: "image" }
  },
  emits: ["select", "select-fail", "preview", "delete", "exceed"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = ref(null), c = computed(() => {
      const d = ["weui-uploader"];
      return t.extClass && d.push(t.extClass), d;
    }), i = computed(() => `${t.files.length}/${t.count}`), u = computed(() => t.accept === "image" ? "image/*" : void 0), f = computed(() => t.files.length < t.count), m = (d) => {
      const _ = ["weui-uploader__file"];
      return d.status && d.status !== "success" && _.push("weui-uploader__file_status"), _;
    }, y = (d) => ({
      backgroundImage: `url("${d.url}")`
    }), k = (d) => d.status === "loading" || d.status === "error", W = (d) => d.statusText ? d.statusText : d.status === "loading" ? "上传中" : d.status === "error" ? "上传失败" : "", T = () => {
      var _;
      if (t.count - t.files.length <= 0) {
        n("exceed", t.count);
        return;
      }
      (_ = l.value) == null || _.click();
    }, C = (d) => {
      {
        const _ = d.target, B = _.files;
        if (!B || B.length === 0) return;
        const I = t.count - t.files.length;
        if (B.length > I) {
          n("exceed", t.count), _.value = "";
          return;
        }
        const D = [], j = [];
        for (let O = 0; O < B.length; O++)
          D.push(URL.createObjectURL(B[O])), j.push({ path: D[O], size: B[O].size });
        n("select", { tempFilePaths: D, tempFiles: j }), _.value = "";
      }
    }, g = (d, _) => {
      n("preview", d, _);
    }, x = (d, _) => {
      n("delete", d, _);
    };
    return (d, _) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(c.value)
    }, [
      e.showHeader ? (openBlock(), createElementBlock("div", al, [
        e.title ? (openBlock(), createElementBlock("div", ol, toDisplayString(e.title), 1)) : createCommentVNode("", true),
        createElementVNode("div", il, toDisplayString(i.value), 1)
      ])) : createCommentVNode("", true),
      createElementVNode("div", nl, [
        createElementVNode("div", ul, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.files, (B, I) => (openBlock(), createElementBlock("div", {
            key: B.url,
            class: normalizeClass(m(B)),
            style: normalizeStyle(y(B)),
            onClick: (D) => g(B, I),
            onLongpress: (D) => x(B, I)
          }, [
            k(B) ? (openBlock(), createElementBlock("div", rl, toDisplayString(W(B)), 1)) : createCommentVNode("", true),
            (openBlock(), createElementBlock("div", {
              key: 1,
              class: "weui-uploader__file-delete",
              onClick: withModifiers((D) => x(B, I), ["stop"])
            }, "×", 8, dl))
          ], 46, cl))), 128))
        ]),
        f.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "weui-uploader__input-box",
          onClick: T
        }, [
          (openBlock(), createElementBlock("input", {
            key: 0,
            ref_key: "fileInput",
            ref: l,
            type: "file",
            class: "weui-uploader__input",
            accept: u.value,
            multiple: e.count > 1,
            onClick: _[0] || (_[0] = withModifiers(() => {
            }, ["stop"])),
            onChange: C
          }, null, 40, fl))
        ])) : createCommentVNode("", true)
      ]),
      e.tips ? (openBlock(), createElementBlock("div", hl, toDisplayString(e.tips), 1)) : createCommentVNode("", true),
      renderSlot(d.$slots, "default")
    ], 2));
  }
});
ge.install = (e) => {
  e.component(ge.name || "WeuiUploader", ge);
};
const ml = { class: "weui-cell__bd" }, pl = { class: "weui-cell__ft" }, _l = {
  key: 0,
  class: "weui-switch-cp"
}, wl = ["checked", "disabled"], yl = ["checked", "disabled"], bl = {
  name: "WeuiSwitch",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, We = /* @__PURE__ */ defineComponent({
  ...bl,
  props: {
    modelValue: { type: Boolean, default: false },
    label: { default: "" },
    disabled: { type: Boolean, default: false },
    cp: { type: Boolean, default: false },
    extClass: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      const i = ["weui-cell", "weui-cell_active", "weui-cell_switch"];
      return t.extClass && i.push(t.extClass), i;
    }), c = (i) => {
      const u = i.target.checked;
      n("update:modelValue", u), n("change", u);
    };
    return (i, u) => (openBlock(), createElementBlock("label", {
      class: normalizeClass(l.value)
    }, [
      createElementVNode("div", ml, toDisplayString(e.label), 1),
      createElementVNode("div", pl, [
        e.cp ? (openBlock(), createElementBlock("span", _l, [
          createElementVNode("input", {
            class: "weui-switch-cp__input",
            type: "checkbox",
            checked: e.modelValue,
            disabled: e.disabled,
            onChange: c
          }, null, 40, wl),
          u[0] || (u[0] = createElementVNode("div", { class: "weui-switch-cp__box" }, null, -1))
        ])) : (openBlock(), createElementBlock("input", {
          key: 1,
          class: "weui-switch",
          type: "checkbox",
          checked: e.modelValue,
          disabled: e.disabled,
          onChange: c
        }, null, 40, yl))
      ])
    ], 2));
  }
});
We.install = (e) => {
  e.component(We.name || "WeuiSwitch", We);
};
const Cl = {
  key: 0,
  class: "weui-cell__hd"
}, kl = { class: "weui-label" }, xl = { class: "weui-cell__bd" }, $l = ["value", "disabled"], gl = {
  key: 0,
  value: "",
  disabled: ""
}, Wl = {
  name: "WeuiSelect",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Te = /* @__PURE__ */ defineComponent({
  ...Wl,
  props: {
    modelValue: { default: "" },
    placeholder: {},
    disabled: { type: Boolean, default: false },
    before: { type: Boolean, default: false },
    after: { type: Boolean, default: false },
    label: {},
    extClass: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      const i = ["weui-cell", "weui-cell_active", "weui-cell_select"];
      return t.before && i.push("weui-cell_select-before"), t.after && i.push("weui-cell_select-after"), t.extClass && i.push(t.extClass), i;
    }), c = (i) => {
      const u = i.target.value;
      n("update:modelValue", u), n("change", u);
    };
    return (i, u) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(l.value)
    }, [
      e.label ? (openBlock(), createElementBlock("div", Cl, [
        createElementVNode("span", kl, toDisplayString(e.label), 1)
      ])) : createCommentVNode("", true),
      createElementVNode("div", xl, [
        createElementVNode("select", {
          class: "weui-select",
          value: e.modelValue,
          disabled: e.disabled,
          onChange: c
        }, [
          e.placeholder ? (openBlock(), createElementBlock("option", gl, toDisplayString(e.placeholder), 1)) : createCommentVNode("", true),
          renderSlot(i.$slots, "default")
        ], 40, $l)
      ])
    ], 2));
  }
});
Te.install = (e) => {
  e.component(Te.name || "WeuiSelect", Te);
};
const Tl = { class: "weui-cell__bd" }, Bl = { class: "weui-cell__ft" }, Il = ["value", "checked", "disabled", "name"], Sl = {
  name: "WeuiRadio",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Be = /* @__PURE__ */ defineComponent({
  ...Sl,
  props: {
    value: {},
    label: {},
    disabled: { type: Boolean, default: false },
    extClass: {}
  },
  emits: ["change"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = inject("weuiRadioGroup", null), c = computed(() => (l == null ? void 0 : l.modelValue.value) === t.value), i = computed(() => t.disabled || ((l == null ? void 0 : l.disabled.value) ?? false)), u = computed(() => {
      const m = ["weui-cell", "weui-cell_active", "weui-check__label"];
      return i.value && m.push("weui-cell_disabled"), t.extClass && m.push(t.extClass), m;
    }), f = () => {
      l != null && l.onChange ? l.onChange(t.value) : n("change", t.value);
    };
    return (m, y) => {
      var k, W;
      return openBlock(), createElementBlock("label", {
        class: normalizeClass(u.value)
      }, [
        createElementVNode("div", Tl, [
          createElementVNode("p", null, [
            renderSlot(m.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(e.label), 1)
            ])
          ])
        ]),
        createElementVNode("div", Bl, [
          createElementVNode("input", {
            type: "radio",
            class: "weui-check",
            value: e.value,
            checked: c.value,
            disabled: i.value,
            name: (W = (k = unref(l)) == null ? void 0 : k.name) == null ? void 0 : W.value,
            onChange: f
          }, null, 40, Il),
          y[0] || (y[0] = createElementVNode("span", { class: "weui-icon-checked" }, null, -1))
        ])
      ], 2);
    };
  }
}), Gl = {
  key: 0,
  class: "weui-cells__title"
}, zl = {
  key: 1,
  class: "weui-cells__tips"
};
let Vl = 0;
const Fl = {
  name: "WeuiRadioGroup",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Ie = /* @__PURE__ */ defineComponent({
  ...Fl,
  props: {
    modelValue: { default: "" },
    name: { default: "" },
    disabled: { type: Boolean, default: false },
    title: {},
    footer: {},
    form: { type: Boolean, default: false },
    extClass: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = `weui-radio-group-${Vl++}`, c = computed(() => t.name || l), i = computed(() => {
      const m = ["weui-cells__group"];
      return t.form && m.push("weui-cells__group_form"), t.extClass && m.push(t.extClass), m;
    }), u = computed(() => {
      const m = ["weui-cells", "weui-cells_radio"];
      return t.form && m.push("weui-cells_form"), m;
    }), f = (m) => {
      n("update:modelValue", m), n("change", m);
    };
    return provide("weuiRadioGroup", {
      modelValue: computed(() => t.modelValue),
      name: c,
      disabled: computed(() => t.disabled),
      onChange: f
    }), (m, y) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(i.value)
    }, [
      e.title ? (openBlock(), createElementBlock("div", Gl, toDisplayString(e.title), 1)) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(u.value)
      }, [
        renderSlot(m.$slots, "default")
      ], 2),
      e.footer ? (openBlock(), createElementBlock("div", zl, toDisplayString(e.footer), 1)) : createCommentVNode("", true)
    ], 2));
  }
});
Be.install = (e) => {
  e.component(Be.name || "WeuiRadio", Be);
};
Ie.install = (e) => {
  e.component(Ie.name || "WeuiRadioGroup", Ie);
};
const Pl = {
  name: "WeuiFormControl",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Se = /* @__PURE__ */ defineComponent({
  ...Pl,
  props: {
    extClass: {}
  },
  setup(e) {
    return (s, t) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["weui-form__control-area", e.extClass].filter(Boolean).join(" "))
    }, [
      renderSlot(s.$slots, "default")
    ], 2));
  }
});
Se.install = (e) => {
  e.component(Se.name, Se);
};
const Dl = { class: "weui-form__tips" }, Ml = {
  name: "WeuiFormTips",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Ge = /* @__PURE__ */ defineComponent({
  ...Ml,
  props: {
    extClass: {}
  },
  setup(e) {
    return (s, t) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["weui-form__tips-area", e.extClass].filter(Boolean).join(" "))
    }, [
      createElementVNode("p", Dl, [
        renderSlot(s.$slots, "default")
      ])
    ], 2));
  }
});
Ge.install = (e) => {
  e.component(Ge.name, Ge);
};
const Al = {
  name: "WeuiFormOpr",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ze = /* @__PURE__ */ defineComponent({
  ...Al,
  props: {
    extClass: {}
  },
  setup(e) {
    return (s, t) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["weui-form__opr-area", e.extClass].filter(Boolean).join(" "))
    }, [
      renderSlot(s.$slots, "default")
    ], 2));
  }
});
ze.install = (e) => {
  e.component(ze.name, ze);
};
const Hl = {
  name: "WeuiFormExtra",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Ve = /* @__PURE__ */ defineComponent({
  ...Hl,
  props: {
    extClass: {}
  },
  setup(e) {
    return (s, t) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["weui-form__extra-area", e.extClass].filter(Boolean).join(" "))
    }, [
      renderSlot(s.$slots, "default")
    ], 2));
  }
});
Ve.install = (e) => {
  e.component(Ve.name, Ve);
};
const Rl = 1e3;
class Ll {
  constructor() {
    Z(this, "stack", []);
  }
  /** 压入栈，返回分配的 z-index */
  push() {
    const s = this.stack.length === 0 ? Rl : this.stack[this.stack.length - 1] + 1;
    return this.stack.push(s), s;
  }
  /** 弹出栈顶，返回新的栈顶 z-index（若栈空返回 undefined） */
  pop() {
    return this.stack.pop(), this.stack.length === 0 ? void 0 : this.stack[this.stack.length - 1];
  }
  /** 当前栈大小 */
  size() {
    return this.stack.length;
  }
  /** 重置栈（测试用） */
  reset() {
    this.stack = [];
  }
}
const qe = new Ll(), Ue = "__weuiOverlayHost__";
function Ke(e) {
  const s = globalThis;
  e ? s[Ue] = e : delete s[Ue];
}
function R() {
  return globalThis[Ue] ?? null;
}
const jl = { class: "weui-overlay-host" }, Ol = {
  name: "WeuiOverlayHost",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Fe = /* @__PURE__ */ defineComponent({
  ...Ol,
  setup(e, { expose: s }) {
    const t = shallowRef([]), n = ref(1), l = (u, f = {}) => {
      const m = n.value++, y = qe.push(), k = { id: m, component: u, props: { ...f, zIndex: y } };
      return t.value = [...t.value, k], { id: m, zIndex: y };
    }, c = (u) => {
      const f = t.value.findIndex((m) => m.id === u);
      f !== -1 && (f === t.value.length - 1 && qe.pop(), t.value = t.value.filter((m) => m.id !== u));
    }, i = (u) => {
      c(u);
    };
    return onMounted(() => {
      Ke({ add: l, remove: c });
    }), onBeforeUnmount(() => {
      Ke(null);
    }), s({ add: l, remove: c }), (u, f) => (openBlock(), createElementBlock("div", jl, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(t.value, (m) => (openBlock(), createBlock(resolveDynamicComponent(m.component), mergeProps({
        key: m.id
      }, { ref_for: true }, m.props, {
        onWeuiClose: (y) => i(m.id)
      }), null, 16, ["onWeuiClose"]))), 128))
    ]));
  }
});
Fe.install = (e) => {
  e.component(Fe.name || "WeuiOverlayHost", Fe);
};
const Nl = {
  key: 0,
  class: "weui-actionsheet__title"
}, El = { class: "weui-actionsheet__title-text" }, Xl = { class: "weui-actionsheet__menu" }, Ul = ["onClick"], ql = {
  key: 0,
  class: "weui-actionsheet__cell__tips"
}, Kl = {
  key: 1,
  class: "weui-actionsheet__action"
}, Yl = {
  name: "WeuiActionsheet",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, X = /* @__PURE__ */ defineComponent({
  ...Yl,
  props: {
    visible: { type: Boolean, default: false },
    title: { default: void 0 },
    items: { default: () => [] },
    cancelText: { default: "取消" },
    maskClosable: { type: Boolean, default: true },
    extClass: { default: void 0 },
    zIndex: { default: void 0 }
  },
  emits: ["update:visible", "select", "cancel", "close", "weui-close"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = ref(false), c = ref(false);
    let i = null, u = null;
    const f = computed(() => {
      const C = {};
      return t.zIndex !== void 0 && (C["z-index"] = String(t.zIndex)), C;
    });
    watch(
      () => t.visible,
      (C) => {
        C ? (l.value = true, u && (clearTimeout(u), u = null), i = setTimeout(() => {
          c.value = true;
        }, 16)) : l.value && (c.value = false, i && (clearTimeout(i), i = null), u = setTimeout(() => {
          l.value = false;
        }, 300));
      },
      { immediate: true }
    ), onBeforeUnmount(() => {
      i && (clearTimeout(i), i = null), u && (clearTimeout(u), u = null);
    });
    const m = () => {
      n("update:visible", false), n("close"), n("weui-close");
    }, y = () => {
      t.maskClosable && m();
    }, k = (C, g) => {
      n("select", C, g), m();
    }, W = () => {
      n("cancel"), m();
    }, T = (C) => {
      const g = ["weui-actionsheet__cell"];
      return C.tips && g.push("weui-actionsheet__cell_tips"), C.warn && g.push("weui-actionsheet__cell_warn"), g;
    };
    return (C, g) => l.value ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "weui-mask",
      style: normalizeStyle(f.value),
      onClick: y,
      onTouchmove: g[1] || (g[1] = withModifiers(() => {
      }, ["stop", "prevent"]))
    }, [
      createElementVNode("div", {
        class: normalizeClass(["weui-actionsheet", e.extClass, { "weui-actionsheet_toggle": c.value }]),
        role: "dialog",
        "aria-modal": "true",
        onClick: g[0] || (g[0] = withModifiers(() => {
        }, ["stop"]))
      }, [
        e.title ? (openBlock(), createElementBlock("div", Nl, [
          createElementVNode("p", El, toDisplayString(e.title), 1)
        ])) : createCommentVNode("", true),
        createElementVNode("div", Xl, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.items, (x, d) => (openBlock(), createElementBlock("div", {
            key: d,
            role: "button",
            tabindex: "0",
            class: normalizeClass(T(x)),
            onClick: (_) => k(x, d)
          }, [
            createTextVNode(toDisplayString(x.label), 1),
            x.tips ? (openBlock(), createElementBlock("div", ql, toDisplayString(x.tips), 1)) : createCommentVNode("", true)
          ], 10, Ul))), 128))
        ]),
        e.cancelText ? (openBlock(), createElementBlock("div", Kl, [
          createElementVNode("div", {
            role: "button",
            tabindex: "0",
            class: "weui-actionsheet__cell",
            onClick: W
          }, toDisplayString(e.cancelText), 1)
        ])) : createCommentVNode("", true)
      ], 2)
    ], 36)) : createCommentVNode("", true);
  }
}), io = {
  /**
   * 显示操作菜单
   * 点击菜单项 → resolve({ item, index })
   * 点击取消按钮 / 遮罩 → resolve({ item: null, index: -1 })
   */
  show(e) {
    return new Promise((s) => {
      const t = R();
      if (!t) {
        s({ item: null, index: -1 });
        return;
      }
      const n = {
        visible: true,
        title: e.title,
        items: e.items ?? [],
        cancelText: e.cancelText ?? "取消",
        maskClosable: e.maskClosable ?? true,
        extClass: e.extClass,
        // Vue 3: onXxx 形式的 prop 会被当作事件监听器
        onSelect: (l, c) => {
          s({ item: l, index: c });
        },
        onCancel: () => {
          s({ item: null, index: -1 });
        },
        onClose: () => {
          s({ item: null, index: -1 });
        }
      };
      t.add(X, n);
    });
  }
};
X.install = (e) => {
  e.component(X.name || "WeuiActionsheet", X);
};
const Jl = {
  key: 0,
  class: "weui-dialog__hd"
}, Ql = { class: "weui-dialog__title" }, Zl = { class: "weui-dialog__bd" }, ea = {
  key: 1,
  class: "weui-dialog__ft"
}, ta = ["onClick"], sa = {
  name: "WeuiDialog",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, U = /* @__PURE__ */ defineComponent({
  ...sa,
  props: {
    visible: { type: Boolean, default: false },
    title: { default: void 0 },
    content: { default: void 0 },
    buttons: { default: () => [] },
    maskClosable: { type: Boolean, default: true },
    mask: { type: Boolean, default: true },
    extClass: { default: void 0 },
    btnWrap: { type: Boolean, default: false },
    zIndex: { default: void 0 }
  },
  emits: ["update:visible", "buttontap", "close", "weui-close"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = useSlots(), c = ref(false), i = ref(false);
    let u = null, f = null;
    const m = computed(() => !!(t.title || l.title)), y = computed(() => !!(t.buttons.length > 0 || l.footer)), k = computed(() => {
      const x = {};
      return t.zIndex !== void 0 && (x["z-index"] = String(t.zIndex)), t.mask || (x.background = "transparent"), x;
    });
    watch(
      () => t.visible,
      (x) => {
        x ? (c.value = true, u && clearTimeout(u), u = setTimeout(() => {
          i.value = true;
        }, 16)) : c.value && (i.value = false, f && clearTimeout(f), f = setTimeout(() => {
          c.value = false;
        }, 300));
      },
      { immediate: true }
    ), onBeforeUnmount(() => {
      u && clearTimeout(u), f && clearTimeout(f);
    });
    const W = (x, d) => x.type ? x.type === "primary" ? "weui-dialog__btn_primary" : x.type === "warn" ? "weui-dialog__btn_warn" : "weui-dialog__btn_default" : t.buttons.length === 1 ? "weui-dialog__btn_primary" : d === 0 ? "weui-dialog__btn_default" : "weui-dialog__btn_primary", T = () => {
      n("update:visible", false), n("close");
    }, C = () => {
      t.maskClosable && (T(), n("weui-close"));
    }, g = (x, d) => {
      n("buttontap", x, d), T(), n("weui-close");
    };
    return (x, d) => c.value ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["weui-mask", { "weui-animate-fade-in": i.value, "weui-animate-fade-out": !i.value }]),
      style: normalizeStyle(k.value),
      onClick: C,
      onTouchmove: d[1] || (d[1] = withModifiers(() => {
      }, ["stop", "prevent"]))
    }, [
      createElementVNode("div", {
        class: normalizeClass(["weui-dialog", { "weui-animate-fade-in": i.value, "weui-animate-fade-out": !i.value }, e.extClass, { "weui-dialog_btn-wrap": e.btnWrap }]),
        role: "dialog",
        "aria-modal": "true",
        onClick: d[0] || (d[0] = withModifiers(() => {
        }, ["stop"]))
      }, [
        m.value ? (openBlock(), createElementBlock("div", Jl, [
          renderSlot(x.$slots, "title", {}, () => [
            createElementVNode("strong", Ql, toDisplayString(e.title), 1)
          ])
        ])) : createCommentVNode("", true),
        createElementVNode("div", Zl, [
          renderSlot(x.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(e.content), 1)
          ])
        ]),
        y.value ? (openBlock(), createElementBlock("div", ea, [
          renderSlot(x.$slots, "footer", {}, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(e.buttons, (_, B) => (openBlock(), createElementBlock("a", {
              key: B,
              role: "button",
              href: "javascript:",
              class: normalizeClass(["weui-dialog__btn", W(_, B)]),
              onClick: (I) => g(_, B)
            }, toDisplayString(_.label), 11, ta))), 128))
          ])
        ])) : createCommentVNode("", true)
      ], 2)
    ], 38)) : createCommentVNode("", true);
  }
});
function Ee(e, s) {
  const t = R();
  if (!t)
    return;
  const n = e.buttons ?? [];
  let l = false;
  const c = (u) => {
    l || (l = true, s(u));
  }, i = {
    visible: true,
    title: e.title,
    content: e.content,
    buttons: n,
    maskClosable: e.maskClosable ?? true,
    mask: e.mask ?? true,
    extClass: e.extClass,
    btnWrap: e.btnWrap ?? false,
    // Vue 3: onXxx 形式的 prop 会被当作事件监听器
    onButtontap: (u, f) => {
      c({ button: u, index: f });
    },
    onClose: () => {
      c({ button: void 0, index: -1 });
    }
  };
  t.add(U, i);
}
const no = {
  /**
   * 显示自定义按钮的对话框
   * 点击任意按钮后 resolve { button, index }
   * 点击遮罩关闭时 resolve { button: undefined, index: -1 }
   */
  show(e) {
    return new Promise((s) => {
      Ee(e, s);
    });
  },
  /**
   * 显示只有一个确认按钮的提示框
   * 无论按钮点击还是遮罩关闭，都 resolve(undefined)
   */
  alert(e) {
    return new Promise((s) => {
      Ee(
        {
          title: e.title,
          content: e.content,
          maskClosable: e.maskClosable ?? true,
          buttons: [{ label: e.confirmText ?? "确定" }]
        },
        () => s()
      );
    });
  },
  /**
   * 显示确认/取消对话框
   * 点击确认 → resolve(true)，点击取消 → resolve(false)
   * 遮罩关闭视为取消 → resolve(false)
   */
  confirm(e) {
    return new Promise((s) => {
      Ee(
        {
          title: e.title,
          content: e.content,
          maskClosable: e.maskClosable ?? false,
          buttons: [
            { label: e.cancelText ?? "取消" },
            { label: e.confirmText ?? "确定" }
          ]
        },
        (t) => s(t.index === 1)
      );
    });
  }
};
U.install = (e) => {
  e.component(U.name || "WeuiDialog", U);
};
const la = {
  key: 0,
  class: "weui-half-screen-dialog__hd"
}, aa = {
  key: 0,
  class: "weui-half-screen-dialog__title"
}, oa = {
  key: 1,
  class: "weui-half-screen-dialog__subtitle"
}, ia = { class: "weui-half-screen-dialog__bd" }, na = {
  key: 1,
  class: "weui-half-screen-dialog__ft"
}, ua = ["onClick"], ca = {
  name: "WeuiHalfScreenDialog",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, q = /* @__PURE__ */ defineComponent({
  ...ca,
  props: {
    visible: { type: Boolean, default: false },
    title: { default: void 0 },
    subtitle: { default: void 0 },
    content: { default: void 0 },
    buttons: { default: () => [] },
    maskClosable: { type: Boolean, default: true },
    mask: { type: Boolean, default: true },
    extClass: { default: void 0 },
    zIndex: { default: void 0 }
  },
  emits: ["update:visible", "buttontap", "close", "weui-close"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = useSlots(), c = ref(false), i = ref(false);
    let u = null, f = null;
    const m = computed(() => !!(t.title || t.subtitle || l.title)), y = computed(() => !!(t.buttons.length > 0 || l.footer)), k = computed(() => {
      const x = {};
      return t.zIndex !== void 0 && (x["z-index"] = String(t.zIndex)), t.mask || (x.background = "transparent"), x;
    });
    watch(
      () => t.visible,
      (x) => {
        x ? (c.value = true, u && clearTimeout(u), u = setTimeout(() => {
          i.value = true;
        }, 16)) : c.value && (i.value = false, f && clearTimeout(f), f = setTimeout(() => {
          c.value = false;
        }, 300));
      },
      { immediate: true }
    ), onBeforeUnmount(() => {
      u && clearTimeout(u), f && clearTimeout(f);
    });
    const W = (x, d) => x.type ? x.type === "primary" ? "weui-half-screen-dialog__btn_primary" : x.type === "warn" ? "weui-half-screen-dialog__btn_warn" : "weui-half-screen-dialog__btn_default" : t.buttons.length === 1 ? "weui-half-screen-dialog__btn_primary" : d === 0 ? "weui-half-screen-dialog__btn_default" : "weui-half-screen-dialog__btn_primary", T = () => {
      n("update:visible", false), n("close");
    }, C = () => {
      t.maskClosable && (T(), n("weui-close"));
    }, g = (x, d) => {
      n("buttontap", x, d), T(), n("weui-close");
    };
    return (x, d) => c.value ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["weui-mask", { "weui-animate-fade-in": i.value, "weui-animate-fade-out": !i.value }]),
      style: normalizeStyle(k.value),
      onClick: C,
      onTouchmove: d[1] || (d[1] = withModifiers(() => {
      }, ["stop", "prevent"]))
    }, [
      createElementVNode("div", {
        class: normalizeClass(["weui-half-screen-dialog", { "weui-animate-slide-up": i.value, "weui-animate-slide-down": !i.value }, e.extClass]),
        role: "dialog",
        "aria-modal": "true",
        onClick: d[0] || (d[0] = withModifiers(() => {
        }, ["stop"]))
      }, [
        m.value ? (openBlock(), createElementBlock("div", la, [
          renderSlot(x.$slots, "title", {}, () => [
            e.title ? (openBlock(), createElementBlock("strong", aa, toDisplayString(e.title), 1)) : createCommentVNode("", true),
            e.subtitle ? (openBlock(), createElementBlock("span", oa, toDisplayString(e.subtitle), 1)) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true),
        createElementVNode("div", ia, [
          renderSlot(x.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(e.content), 1)
          ])
        ]),
        y.value ? (openBlock(), createElementBlock("div", na, [
          renderSlot(x.$slots, "footer", {}, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(e.buttons, (_, B) => (openBlock(), createElementBlock("a", {
              key: B,
              role: "button",
              href: "javascript:",
              class: normalizeClass(["weui-half-screen-dialog__btn", W(_, B)]),
              onClick: (I) => g(_, B)
            }, toDisplayString(_.label), 11, ua))), 128))
          ])
        ])) : createCommentVNode("", true)
      ], 2)
    ], 38)) : createCommentVNode("", true);
  }
});
function ra(e, s) {
  const t = R();
  if (!t)
    return;
  const n = e.buttons ?? [];
  let l = false;
  const c = (u) => {
    l || (l = true, s(u));
  }, i = {
    visible: true,
    title: e.title,
    subtitle: e.subtitle,
    content: e.content,
    buttons: n,
    maskClosable: e.maskClosable ?? true,
    mask: e.mask ?? true,
    extClass: e.extClass,
    // Vue 3: onXxx 形式的 prop 会被当作事件监听器
    onButtontap: (u, f) => {
      c({ button: u, index: f });
    },
    onClose: () => {
      c({ button: void 0, index: -1 });
    }
  };
  t.add(q, i);
}
const uo = {
  /**
   * 显示半屏弹窗
   * 点击任意按钮后 resolve { button, index }
   * 点击遮罩关闭时 resolve { button: undefined, index: -1 }
   */
  show(e) {
    return new Promise((s) => {
      ra(e, s);
    });
  }
};
q.install = (e) => {
  e.component(q.name || "WeuiHalfScreenDialog", q);
};
const da = {
  name: "WeuiToptips",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, K = /* @__PURE__ */ defineComponent({
  ...da,
  props: {
    visible: { type: Boolean, default: false },
    content: { default: "" },
    type: { default: "info" },
    duration: { default: 2e3 },
    extClass: { default: void 0 },
    zIndex: { default: void 0 }
  },
  emits: ["update:visible", "close", "weui-close"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      switch (t.type) {
        case "success":
          return "weui-toptips_success";
        case "warn":
          return "weui-toptips_warn";
        case "error":
          return "weui-toptips_error";
        default:
          return "weui-toptips_info";
      }
    }), c = computed(() => {
      const m = {
        // WeUI CSS 默认 .weui-toptips { display: none }，挂载时需覆盖为 block
        display: "block"
      };
      return t.zIndex !== void 0 && (m["z-index"] = String(t.zIndex)), m;
    });
    let i = null;
    const u = () => {
      i !== null && (clearTimeout(i), i = null);
    }, f = () => {
      u(), n("update:visible", false), n("close"), n("weui-close");
    };
    return watch(
      () => t.visible,
      (m) => {
        m && t.duration > 0 ? (u(), i = setTimeout(() => {
          f();
        }, t.duration)) : m || u();
      },
      { immediate: true }
    ), onBeforeUnmount(() => {
      u();
    }), (m, y) => e.visible ? (openBlock(), createElementBlock("div", {
      key: 0,
      role: "alert",
      class: normalizeClass(["weui-toptips", [l.value, e.extClass]]),
      style: normalizeStyle(c.value)
    }, toDisplayString(e.content), 7)) : createCommentVNode("", true);
  }
}), fa = 2e3;
function N(e) {
  const s = R();
  if (!s)
    return;
  const t = {
    visible: true,
    content: e.content ?? "",
    type: e.type ?? "info",
    duration: e.duration ?? fa,
    extClass: e.extClass
  };
  s.add(K, t);
}
const co = {
  /**
   * 显示提示
   * duration 后自动关闭（默认 2000ms），通过 weui-close 触发 overlay-host 卸载
   */
  show(e) {
    N(e);
  },
  /**
   * 信息提示
   */
  info(e, s) {
    N({ content: e, type: "info", duration: s });
  },
  /**
   * 成功提示
   */
  success(e, s) {
    N({ content: e, type: "success", duration: s });
  },
  /**
   * 警告提示
   */
  warn(e, s) {
    N({ content: e, type: "warn", duration: s });
  },
  /**
   * 错误提示
   */
  error(e, s) {
    N({ content: e, type: "error", duration: s });
  }
};
K.install = (e) => {
  e.component(K.name || "WeuiToptips", K);
};
const ha = {
  key: 0,
  role: "alert"
}, va = { class: "weui-toast__wrp" }, ma = {
  key: 0,
  class: "weui-icon_toast weui-icon-success-no-circle"
}, pa = {
  key: 1,
  class: "weui-icon_toast weui-icon-warn"
}, _a = {
  key: 2,
  class: "weui-icon_toast weui-primary-loading"
}, wa = { class: "weui-toast__content" }, ya = {
  name: "WeuiToast",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Y = /* @__PURE__ */ defineComponent({
  ...ya,
  props: {
    visible: { type: Boolean, default: false },
    content: { default: "" },
    type: { default: "success" },
    duration: { default: void 0 },
    mask: { type: Boolean, default: true },
    extClass: { default: void 0 },
    zIndex: { default: void 0 }
  },
  emits: ["update:visible", "close", "weui-close"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      const y = ["weui-toast"];
      return t.type === "text" && y.push("weui-toast_text"), t.extClass && y.push(t.extClass), y;
    }), c = computed(() => {
      const y = {};
      return t.zIndex !== void 0 && (y["z-index"] = String(t.zIndex)), y;
    }), i = computed(() => t.duration !== void 0 ? t.duration : t.type === "loading" ? 0 : 2e3);
    let u = null;
    const f = () => {
      u !== null && (clearTimeout(u), u = null);
    }, m = () => {
      f(), n("update:visible", false), n("close"), n("weui-close");
    };
    return watch(
      () => t.visible,
      (y) => {
        y && i.value > 0 ? (f(), u = setTimeout(() => {
          m();
        }, i.value)) : y || f();
      },
      { immediate: true }
    ), onBeforeUnmount(() => {
      f();
    }), (y, k) => e.visible ? (openBlock(), createElementBlock("div", ha, [
      e.mask ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "weui-mask_transparent",
        style: normalizeStyle(c.value),
        onTouchmove: k[0] || (k[0] = withModifiers(() => {
        }, ["stop", "prevent"]))
      }, null, 36)) : createCommentVNode("", true),
      createElementVNode("div", va, [
        createElementVNode("div", {
          class: normalizeClass(l.value)
        }, [
          e.type === "success" ? (openBlock(), createElementBlock("i", ma)) : e.type === "warning" ? (openBlock(), createElementBlock("i", pa)) : e.type === "loading" ? (openBlock(), createElementBlock("span", _a, [...k[1] || (k[1] = [
            createElementVNode("span", { class: "weui-primary-loading__dot" }, null, -1)
          ])])) : createCommentVNode("", true),
          createElementVNode("p", wa, toDisplayString(e.content), 1)
        ], 2)
      ])
    ])) : createCommentVNode("", true);
  }
});
class ba {
  constructor(s) {
    Z(this, "tasks", []);
    Z(this, "executor");
    this.executor = s;
  }
  /** 入队。若队列为空，立即执行；否则排队等待 */
  enqueue(s) {
    this.tasks.push(s), this.tasks.length === 1 && this.executor(s);
  }
  /** 标记当前任务完成，执行下一个 */
  done() {
    this.tasks.shift(), this.tasks.length > 0 && this.executor(this.tasks[0]);
  }
  /** 当前队列长度 */
  size() {
    return this.tasks.length;
  }
}
let L = null;
const Oe = new ba((e) => {
  const s = R();
  if (!s) {
    e.resolve(), Oe.done();
    return;
  }
  L = e;
  const { id: t } = s.add(Y, {
    visible: true,
    content: e.options.content ?? "",
    type: e.options.type ?? "success",
    duration: e.options.duration,
    mask: e.options.mask ?? true,
    extClass: e.options.extClass,
    // Vue 3: onClose prop 会被当作 close 事件监听器
    onClose: () => {
      L = null, e.resolve(), Oe.done();
    }
  });
  e.id = t;
}), ro = {
  /**
   * 显示 toast，关闭时（自动或 hide()）resolve
   * 多次调用会排队，前一个关闭后才显示下一个
   */
  show(e) {
    return new Promise((s) => {
      Oe.enqueue({ options: e, resolve: s });
    });
  },
  /**
   * 成功提示。默认 duration=2000
   */
  success(e, s) {
    return this.show({ content: e, type: "success", duration: s });
  },
  /**
   * 加载提示。默认 duration=0（不自动关闭），需手动 hide()
   */
  loading(e, s) {
    return this.show({ content: e, type: "loading", duration: s });
  },
  /**
   * 警告提示。默认 duration=2000
   */
  warning(e, s) {
    return this.show({ content: e, type: "warning", duration: s });
  },
  /**
   * 纯文本提示（无图标）。默认 duration=2000
   */
  text(e, s) {
    return this.show({ content: e, type: "text", duration: s });
  },
  /**
   * 立即关闭当前正在显示的 toast，并触发队列中下一个
   */
  hide() {
    if (!L) return;
    const e = R();
    e && L.id !== void 0 && e.remove(L.id), L.resolve(), L = null, Oe.done();
  }
};
Y.install = (e) => {
  e.component(Y.name || "WeuiToast", Y);
};
const Ca = {
  name: "WeuiPickerGroup",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, ka = /* @__PURE__ */ defineComponent({
  ...Ca,
  props: {
    options: { default: () => [] },
    index: { default: 0 }
  },
  emits: ["change"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = 56, c = 112, i = ref(c - t.index * l);
    watch(
      () => t.index,
      (C) => {
        i.value = c - C * l;
      }
    );
    const u = computed(() => ({
      transform: `translate3d(0, ${i.value}px, 0)`
    }));
    let f = 0, m = 0, y = false;
    const k = (C) => {
      y = true, f = C.touches[0].clientY, m = i.value;
    }, W = (C) => {
      if (!y) return;
      const g = C.touches[0].clientY - f;
      i.value = m + g;
    }, T = () => {
      if (!y) return;
      y = false;
      const C = Math.max(0, t.options.length - 1);
      let g = Math.round((c - i.value) / l);
      g = Math.max(0, Math.min(C, g)), i.value = c - g * l, g !== t.index && n("change", g);
    };
    return (C, g) => (openBlock(), createElementBlock("div", {
      class: "weui-picker__group",
      onTouchstart: k,
      onTouchmove: W,
      onTouchend: T,
      onTouchcancel: T
    }, [
      g[0] || (g[0] = createElementVNode("div", { class: "weui-picker__mask" }, null, -1)),
      g[1] || (g[1] = createElementVNode("div", { class: "weui-picker__indicator" }, null, -1)),
      createElementVNode("div", {
        class: "weui-picker__content",
        style: normalizeStyle(u.value)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.options, (x, d) => (openBlock(), createElementBlock("div", {
          key: d,
          class: normalizeClass(["weui-picker__item", { "weui-picker__item_disabled": x.disabled }])
        }, toDisplayString(x.label), 3))), 128))
      ], 4)
    ], 32));
  }
}), xa = { class: "weui-picker__hd" }, $a = {
  key: 0,
  class: "weui-picker__title"
}, ga = { class: "weui-picker__bd" }, Wa = {
  name: "WeuiPicker",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, J = /* @__PURE__ */ defineComponent({
  ...Wa,
  props: {
    visible: { type: Boolean, default: false },
    columns: { default: () => [] },
    title: {},
    cancelText: { default: "取消" },
    confirmText: { default: "确定" },
    maskClosable: { type: Boolean, default: true },
    extClass: {},
    zIndex: {}
  },
  emits: ["update:visible", "change", "confirm", "cancel", "close", "weui-close"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = ref(false), c = ref(false), i = ref(
      t.columns.map((d) => d.index ?? 0)
    );
    watch(
      () => t.columns,
      (d) => {
        i.value = d.map((_) => _.index ?? 0);
      }
    );
    let u = null, f = null;
    const m = computed(() => {
      const d = {};
      return t.zIndex !== void 0 && (d["z-index"] = String(t.zIndex)), d;
    }), y = computed(() => ({
      transform: c.value ? "translate(0, 0)" : "translate(0, 100%)"
    }));
    watch(
      () => t.visible,
      (d) => {
        d ? (l.value = true, f && (clearTimeout(f), f = null), u = setTimeout(() => {
          c.value = true;
        }, 16)) : l.value && (c.value = false, u && (clearTimeout(u), u = null), f = setTimeout(() => {
          l.value = false;
        }, 300));
      },
      { immediate: true }
    ), onBeforeUnmount(() => {
      u && (clearTimeout(u), u = null), f && (clearTimeout(f), f = null);
    });
    const k = () => {
      n("update:visible", false), n("close"), n("weui-close");
    }, W = () => t.columns.map((d, _) => {
      var I;
      const B = i.value[_] ?? 0;
      return ((I = d.options[B]) == null ? void 0 : I.value) ?? "";
    }), T = (d, _) => {
      i.value[d] = _, n("change", [...i.value], W());
    }, C = () => {
      n("cancel"), k();
    }, g = () => {
      n("confirm", [...i.value], W()), k();
    }, x = () => {
      t.maskClosable && k();
    };
    return (d, _) => l.value ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "weui-mask",
      style: normalizeStyle(m.value),
      onClick: x,
      onTouchmove: _[1] || (_[1] = withModifiers(() => {
      }, ["stop", "prevent"]))
    }, [
      createElementVNode("div", {
        class: normalizeClass(["weui-picker", e.extClass]),
        style: normalizeStyle(y.value),
        onClick: _[0] || (_[0] = withModifiers(() => {
        }, ["stop"]))
      }, [
        createElementVNode("div", xa, [
          createElementVNode("div", {
            class: "weui-picker__action weui-picker__action_cancel",
            onClick: C
          }, toDisplayString(e.cancelText), 1),
          e.title ? (openBlock(), createElementBlock("div", $a, toDisplayString(e.title), 1)) : createCommentVNode("", true),
          createElementVNode("div", {
            class: "weui-picker__action weui-picker__action_confirm",
            onClick: g
          }, toDisplayString(e.confirmText), 1)
        ]),
        createElementVNode("div", ga, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.columns, (B, I) => (openBlock(), createBlock(ka, {
            key: I,
            options: B.options,
            index: i.value[I] ?? 0,
            onChange: (D) => T(I, D)
          }, null, 8, ["options", "index", "onChange"]))), 128))
        ])
      ], 6)
    ], 36)) : createCommentVNode("", true);
  }
}), fo = {
  /**
   * 显示选择器
   * 点击确定 → resolve({ action: 'confirm', indexes, values })
   * 点击取消 / 遮罩 → resolve({ action: 'cancel', indexes: [], values: [] })
   */
  show(e) {
    return new Promise((s) => {
      const t = R();
      if (!t) {
        s({ action: "cancel", indexes: [], values: [] });
        return;
      }
      const n = {
        visible: true,
        title: e.title,
        columns: e.columns,
        cancelText: e.cancelText ?? "取消",
        confirmText: e.confirmText ?? "确定",
        maskClosable: e.maskClosable ?? true,
        extClass: e.extClass,
        // Vue 3: onXxx 形式的 prop 会被当作事件监听器
        onConfirm: (l, c) => {
          s({ action: "confirm", indexes: l, values: c });
        },
        onCancel: () => {
          s({ action: "cancel", indexes: [], values: [] });
        },
        onClose: () => {
          s({ action: "cancel", indexes: [], values: [] });
        }
      };
      t.add(J, n);
    });
  }
};
J.install = (e) => {
  e.component(J.name || "WeuiPicker", J);
};
function Ta() {
  if (typeof uni > "u")
    return false;
  const e = uni;
  if (typeof e.getSystemInfoSync != "function")
    return false;
  try {
    const s = e.getSystemInfoSync().uniPlatform;
    return !!(s && s.startsWith("mp"));
  } catch {
    return false;
  }
}
const Ba = ["src"], Ia = {
  name: "WeuiGallery",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Q = /* @__PURE__ */ defineComponent({
  ...Ia,
  props: {
    visible: { type: Boolean, default: false },
    src: { default: void 0 },
    showDelete: { type: Boolean, default: false },
    deleteText: { default: "删除" },
    maskClosable: { type: Boolean, default: true },
    extClass: { default: void 0 },
    zIndex: { default: void 0 }
  },
  emits: ["update:visible", "delete", "hide", "weui-close"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = useSlots(), c = ref(false), i = ref(false);
    let u = null, f = null;
    const m = computed(() => !!(t.showDelete || l.default)), y = computed(() => {
      const C = {
        // WeUI CSS 默认 .weui-gallery { display: none }，挂载时需覆盖为 block
        display: "block"
      };
      return t.zIndex !== void 0 && (C["z-index"] = String(t.zIndex)), C;
    });
    watch(
      () => t.visible,
      (C) => {
        Ta() ? C && uni.previewImage({
          urls: t.src ? [t.src] : [],
          complete: () => {
            n("update:visible", false), n("hide"), n("weui-close");
          }
        }) : C ? (c.value = true, u = setTimeout(() => {
          i.value = true;
        }, 16)) : c.value && (i.value = false, f = setTimeout(() => {
          c.value = false;
        }, 300));
      },
      { immediate: true }
    ), onBeforeUnmount(() => {
      u && (clearTimeout(u), u = null), f && (clearTimeout(f), f = null);
    });
    const k = () => {
      n("update:visible", false), n("hide"), n("weui-close");
    }, W = () => {
      t.maskClosable && k();
    }, T = () => {
      n("delete");
    };
    return (C, g) => c.value ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["weui-gallery", e.extClass, { "weui-animate-fade-in": i.value, "weui-animate-fade-out": !i.value }]),
      style: normalizeStyle(y.value),
      role: "dialog",
      "aria-modal": "true",
      onClick: W,
      onTouchmove: g[1] || (g[1] = withModifiers(() => {
      }, ["stop", "prevent"]))
    }, [
      createElementVNode("img", {
        class: "weui-gallery__img",
        src: e.src
      }, null, 8, Ba),
      m.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "weui-gallery__opr",
        onClick: g[0] || (g[0] = withModifiers(() => {
        }, ["stop"]))
      }, [
        renderSlot(C.$slots, "default", {}, () => [
          createElementVNode("a", {
            role: "button",
            "aria-label": "删除",
            href: "javascript:",
            class: "weui-gallery__del",
            onClick: T
          }, toDisplayString(e.deleteText), 1)
        ])
      ])) : createCommentVNode("", true)
    ], 38)) : createCommentVNode("", true);
  }
}), ho = {
  /**
   * 显示画廊
   * 点击删除按钮 → promise resolve('delete')，需手动调用 close() 关闭
   * 点击遮罩（maskClosable=true 时）→ promise resolve('hide') 并自动关闭
   */
  show(e) {
    const s = R();
    if (!s)
      return { close: () => {
      }, promise: Promise.resolve("hide") };
    let t;
    const n = new Promise((u) => {
      t = u;
    }), l = {
      visible: true,
      src: e.src,
      showDelete: e.showDelete ?? false,
      deleteText: e.deleteText ?? "删除",
      maskClosable: e.maskClosable ?? true,
      extClass: e.extClass,
      // Vue 3: onXxx 形式的 prop 会被当作事件监听器
      onDelete: () => t("delete"),
      onHide: () => t("hide")
    }, { id: c } = s.add(Q, l);
    return { close: () => s.remove(c), promise: n };
  }
};
Q.install = (e) => {
  e.component(Q.name || "WeuiGallery", Q);
};
const Sa = { class: "weui-slideview__right" }, Ga = ["onClick"], za = {
  name: "WeuiSlideview",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Pe = /* @__PURE__ */ defineComponent({
  ...za,
  props: {
    buttons: { default: () => [] },
    show: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    extClass: { default: void 0 }
  },
  emits: ["update:show", "buttonclick", "close"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = ref(t.show);
    watch(
      () => t.show,
      (d) => {
        l.value = d;
      }
    );
    const c = computed(() => {
      const d = ["weui-slideview"];
      return l.value && d.push("weui-slideview_show"), t.extClass && d.push(t.extClass), d;
    }), i = (d) => {
      const _ = ["weui-slideview__btn"];
      return d.type === "warn" && _.push("weui-slideview__btn_warn"), _;
    }, u = () => {
      l.value = false, n("update:show", false), n("close");
    }, f = () => {
      l.value = true, n("update:show", true);
    }, m = () => {
      t.disabled || l.value && u();
    }, y = (d, _) => {
      n("buttonclick", d, _), u();
    }, k = ref(0), W = ref(0), T = ref(false), C = (d) => {
      t.disabled || (k.value = d.touches[0].clientX, T.value = true);
    }, g = (d) => {
      if (!T.value || t.disabled) return;
      W.value = d.touches[0].clientX;
      const _ = k.value - W.value;
      _ > 30 && !l.value ? f() : _ < -30 && l.value && u();
    }, x = () => {
      T.value = false;
    };
    return (d, _) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(c.value)
    }, [
      createElementVNode("div", {
        class: "weui-slideview__left",
        onClick: m,
        onTouchstart: C,
        onTouchmove: g,
        onTouchend: x
      }, [
        renderSlot(d.$slots, "default")
      ], 32),
      createElementVNode("div", Sa, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.buttons, (B, I) => (openBlock(), createElementBlock("div", {
          key: I,
          class: normalizeClass(i(B)),
          onClick: (D) => y(B, I)
        }, toDisplayString(B.text), 11, Ga))), 128))
      ])
    ], 2));
  }
});
Pe.install = (e) => {
  e.component(Pe.name || "WeuiSlideview", Pe);
};
const Va = {
  name: "WeuiNavbar",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, De = /* @__PURE__ */ defineComponent({
  ...Va,
  props: {
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const n = ["weui-navbar"];
      return s.extClass && n.push(s.extClass), n;
    });
    return (n, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value)
    }, [
      renderSlot(n.$slots, "default")
    ], 2));
  }
}), Fa = ["aria-selected"], Pa = {
  name: "WeuiNavbarItem",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Me = /* @__PURE__ */ defineComponent({
  ...Pa,
  props: {
    active: { type: Boolean, default: false },
    extClass: { default: void 0 }
  },
  emits: ["click"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = computed(() => {
      const i = ["weui-navbar__item"];
      return t.active && i.push("weui-bar__item_on"), t.extClass && i.push(t.extClass), i;
    }), c = (i) => {
      n("click", i);
    };
    return (i, u) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(l.value),
      role: "tab",
      "aria-selected": e.active,
      onClick: c
    }, [
      renderSlot(i.$slots, "default")
    ], 10, Fa));
  }
});
De.install = (e) => {
  e.component(De.name || "WeuiNavbar", De);
};
Me.install = (e) => {
  e.component(Me.name || "WeuiNavbarItem", Me);
};
const Da = {
  name: "WeuiTabbar",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Ae = /* @__PURE__ */ defineComponent({
  ...Da,
  props: {
    fixed: { type: Boolean, default: false },
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const l = ["weui-tabbar"];
      return s.extClass && l.push(s.extClass), l;
    }), n = computed(() => {
      if (s.fixed)
        return {
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0"
        };
    });
    return (l, c) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value),
      style: normalizeStyle(n.value)
    }, [
      renderSlot(l.$slots, "default")
    ], 6));
  }
}), Ma = ["aria-selected"], Aa = ["src"], Ha = {
  key: 1,
  class: "weui-tabbar__label"
}, Ra = {
  name: "WeuiTabbarItem",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, He = /* @__PURE__ */ defineComponent({
  ...Ra,
  props: {
    icon: { default: void 0 },
    activeIcon: { default: void 0 },
    text: { default: void 0 },
    active: { type: Boolean, default: false },
    badge: { default: void 0 },
    showDot: { type: Boolean, default: false },
    extClass: { default: void 0 }
  },
  emits: ["click"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = useSlots(), c = computed(() => {
      const T = ["weui-tabbar__item"];
      return t.active && T.push("weui-bar__item_on"), t.extClass && T.push(t.extClass), T;
    }), i = computed(() => t.active && t.activeIcon ? t.activeIcon : t.icon), u = computed(() => !!t.icon || !!t.activeIcon || !!l.icon), f = computed(() => !!t.text || !!l.default), m = computed(() => !(t.showDot || t.badge === void 0 || t.badge === null || t.badge === "")), y = computed(() => {
      if (!(!m.value && !t.showDot))
        return {
          display: "inline-block",
          position: "relative"
        };
    }), k = computed(() => t.showDot ? {
      position: "absolute",
      top: "0",
      right: "-6px"
    } : {
      position: "absolute",
      top: "-2px",
      right: "-13px"
    }), W = (T) => {
      n("click", T);
    };
    return (T, C) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(c.value),
      role: "tab",
      "aria-selected": e.active,
      onClick: W
    }, [
      u.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "weui-tabbar__icon-wrap",
        style: normalizeStyle(y.value)
      }, [
        renderSlot(T.$slots, "icon", {}, () => [
          i.value ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: i.value,
            class: "weui-tabbar__icon",
            mode: "aspectFit"
          }, null, 8, Aa)) : createCommentVNode("", true)
        ]),
        e.showDot ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "weui-badge weui-badge_dot",
          style: normalizeStyle(k.value)
        }, null, 4)) : m.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "weui-badge",
          style: normalizeStyle(k.value)
        }, toDisplayString(e.badge), 5)) : createCommentVNode("", true)
      ], 4)) : createCommentVNode("", true),
      f.value ? (openBlock(), createElementBlock("div", Ha, [
        e.text ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createTextVNode(toDisplayString(e.text), 1)
        ], 64)) : renderSlot(T.$slots, "default", {}, void 0, void 0, 1)
      ])) : createCommentVNode("", true)
    ], 10, Ma));
  }
});
Ae.install = (e) => {
  e.component(Ae.name || "WeuiTabbar", Ae);
};
He.install = (e) => {
  e.component(He.name || "WeuiTabbarItem", He);
};
const La = { class: "weui-steps__item__inner" }, ja = { class: "weui-steps__item__title" }, Oa = {
  key: 0,
  class: "weui-steps__item__desc"
}, Na = {
  name: "WeuiSteps",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Re = /* @__PURE__ */ defineComponent({
  ...Na,
  props: {
    steps: {},
    current: { default: 0 },
    direction: { default: "horizontal" },
    extClass: { default: void 0 }
  },
  setup(e) {
    const s = e, t = computed(() => {
      const l = ["weui-steps"];
      return s.direction === "vertical" ? l.push("weui-steps_vertical") : l.push("weui-steps_horizonal"), s.extClass && l.push(s.extClass), l;
    }), n = (l) => {
      const c = ["weui-steps__item"];
      return l < s.current && c.push("weui-steps__item_success"), c;
    };
    return (l, c) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(t.value)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.steps, (i, u) => (openBlock(), createElementBlock("div", {
        key: u,
        class: normalizeClass(n(u))
      }, [
        createElementVNode("div", La, [
          createElementVNode("div", ja, toDisplayString(i.title), 1),
          i.desc ? (openBlock(), createElementBlock("div", Oa, toDisplayString(i.desc), 1)) : createCommentVNode("", true)
        ])
      ], 2))), 128))
    ], 2));
  }
});
Re.install = (e) => {
  e.component(Re.name || "WeuiSteps", Re);
};
const Ea = {
  key: 0,
  class: "weui-msg__icon-area"
}, Xa = {
  key: 1,
  class: "weui-msg__text-area"
}, Ua = {
  key: 0,
  class: "weui-msg__title"
}, qa = {
  key: 1,
  class: "weui-msg__desc"
}, Ka = {
  key: 0,
  class: "weui-msg__opr-area"
}, Ya = { class: "weui-btn-area" }, Ja = ["onClick"], Qa = {
  key: 1,
  class: "weui-msg__tips-area"
}, Za = { class: "weui-msg__tips" }, eo = {
  key: 2,
  class: "weui-msg__extra-area"
}, to = {
  name: "WeuiMsg",
  options: {
    styleIsolation: "apply-shared",
    addGlobalClass: true
  }
}, Le = /* @__PURE__ */ defineComponent({
  ...to,
  props: {
    type: { default: void 0 },
    iconSize: { default: void 0 },
    title: { default: void 0 },
    desc: { default: void 0 },
    buttons: { default: () => [] },
    tips: { default: void 0 },
    extClass: { default: void 0 }
  },
  emits: ["buttontap"],
  setup(e, { emit: s }) {
    const t = e, n = s, l = useSlots(), c = computed(() => {
      const W = ["weui-msg"];
      return t.extClass && W.push(t.extClass), W;
    }), i = computed(() => !!(t.type || l.icon)), u = computed(() => !!(t.title || t.desc)), f = computed(() => !!(t.buttons && t.buttons.length > 0)), m = computed(() => !!(t.tips || l.tips)), y = (W) => ["weui-btn", `weui-btn_${W.type || "default"}`], k = (W, T) => {
      n("buttontap", W, T);
    };
    return (W, T) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(c.value)
    }, [
      renderSlot(W.$slots, "default", {}, () => [
        i.value ? (openBlock(), createElementBlock("div", Ea, [
          renderSlot(W.$slots, "icon", {}, () => [
            createVNode(E, {
              type: e.type,
              size: e.iconSize,
              "ext-class": "weui-icon_msg"
            }, null, 8, ["type", "size"])
          ])
        ])) : createCommentVNode("", true),
        u.value ? (openBlock(), createElementBlock("div", Xa, [
          e.title ? (openBlock(), createElementBlock("h2", Ua, toDisplayString(e.title), 1)) : createCommentVNode("", true),
          e.desc ? (openBlock(), createElementBlock("p", qa, toDisplayString(e.desc), 1)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]),
      f.value ? (openBlock(), createElementBlock("div", Ka, [
        createElementVNode("p", Ya, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.buttons, (C, g) => (openBlock(), createElementBlock("a", {
            key: g,
            role: "button",
            href: "javascript:",
            class: normalizeClass(y(C)),
            onClick: (x) => k(C, g)
          }, toDisplayString(C.text), 11, Ja))), 128))
        ])
      ])) : createCommentVNode("", true),
      m.value ? (openBlock(), createElementBlock("div", Qa, [
        createElementVNode("p", Za, [
          renderSlot(W.$slots, "tips", {}, () => [
            createTextVNode(toDisplayString(e.tips), 1)
          ])
        ])
      ])) : createCommentVNode("", true),
      W.$slots.footer ? (openBlock(), createElementBlock("div", eo, [
        renderSlot(W.$slots, "footer")
      ])) : createCommentVNode("", true)
    ], 2));
  }
});
Le.install = (e) => {
  e.component(Le.name || "WeuiMsg", Le);
};
const so = [
  // 基础组件
  se,
  le,
  E,
  ae,
  oe,
  ie,
  ne,
  ue,
  ce,
  re,
  // 布局容器
  de,
  fe,
  Ze,
  et,
  tt,
  he,
  ve,
  me,
  pe,
  _e,
  we,
  // 表单输入
  be,
  Ce,
  ke,
  xe,
  $e,
  ge,
  ye,
  We,
  Te,
  Be,
  Ie,
  // 表单容器
  Se,
  Ge,
  ze,
  Ve,
  // 操作反馈
  Fe,
  X,
  U,
  q,
  K,
  Y,
  J,
  Q,
  Pe,
  // 导航
  De,
  Me,
  Ae,
  He,
  Re,
  // 展示
  Le
], lo = (e) => {
  so.forEach((s) => {
    var t;
    (t = s.install) == null || t.call(s, e);
  });
}, vo = { install: lo };
export {
  co as c,
  fo as f,
  ho as h,
  io as i,
  no as n,
  ro as r,
  uo as u,
  vo as v
};
