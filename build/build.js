import { defineComponent as te, inject as g, reactive as R, ref as s, h as b, provide as M, onMounted as Ie, nextTick as De, onUnmounted as Be, computed as T, watch as se, cloneVNode as Ne, Fragment as fe, useSlots as Pe, resolveComponent as ue, openBlock as w, createElementBlock as D, unref as j, toDisplayString as ce, createCommentVNode as N, renderSlot as q, createBlock as J, normalizeClass as $e, createVNode as de, withCtx as K, renderList as Le, createElementVNode as ve, createTextVNode as Ue } from "vue";
/**
 * Vue 3 Carousel 0.3.3
 * (c) 2024
 * @license MIT
 */
const p = {
  itemsToShow: 1,
  itemsToScroll: 1,
  modelValue: 0,
  transition: 300,
  autoplay: 0,
  snapAlign: "center",
  wrapAround: !1,
  throttle: 16,
  pauseAutoplayOnHover: !1,
  mouseDrag: !0,
  touchDrag: !0,
  dir: "ltr",
  breakpoints: void 0,
  i18n: {
    ariaNextSlide: "Navigate to next slide",
    ariaPreviousSlide: "Navigate to previous slide",
    ariaNavigateToSlide: "Navigate to slide {slideNumber}",
    ariaGallery: "Gallery",
    itemXofY: "Item {currentSlide} of {slidesCount}",
    iconArrowUp: "Arrow pointing upwards",
    iconArrowDown: "Arrow pointing downwards",
    iconArrowRight: "Arrow pointing to the right",
    iconArrowLeft: "Arrow pointing to the left"
  }
}, Oe = {
  // count of items to showed per view
  itemsToShow: {
    default: p.itemsToShow,
    type: Number
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: p.itemsToScroll,
    type: Number
  },
  // control infinite scrolling mode
  wrapAround: {
    default: p.wrapAround,
    type: Boolean
  },
  // control max drag
  throttle: {
    default: p.throttle,
    type: Number
  },
  // control snap position alignment
  snapAlign: {
    default: p.snapAlign,
    validator(e) {
      return ["start", "end", "center", "center-even", "center-odd"].includes(e);
    }
  },
  // sliding transition time in ms
  transition: {
    default: p.transition,
    type: Number
  },
  // an object to store breakpoints
  breakpoints: {
    default: p.breakpoints,
    type: Object
  },
  // time to auto advance slides in ms
  autoplay: {
    default: p.autoplay,
    type: Number
  },
  // pause autoplay when mouse hover over the carousel
  pauseAutoplayOnHover: {
    default: p.pauseAutoplayOnHover,
    type: Boolean
  },
  // slide number number of initial slide
  modelValue: {
    default: void 0,
    type: Number
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: p.mouseDrag,
    type: Boolean
  },
  // toggle mouse dragging.
  touchDrag: {
    default: p.touchDrag,
    type: Boolean
  },
  // control snap position alignment
  dir: {
    default: p.dir,
    validator(e) {
      return ["rtl", "ltr"].includes(e);
    }
  },
  // aria-labels and additional text labels
  i18n: {
    default: p.i18n,
    type: Object
  },
  // an object to pass all settings
  settings: {
    default() {
      return {};
    },
    type: Object
  }
};
function Xe({ config: e, slidesCount: n }) {
  const { snapAlign: t, wrapAround: u, itemsToShow: i = 1 } = e;
  if (u)
    return Math.max(n - 1, 0);
  let r;
  switch (t) {
    case "start":
      r = n - i;
      break;
    case "end":
      r = n - 1;
      break;
    case "center":
    case "center-odd":
      r = n - Math.ceil((i - 0.5) / 2);
      break;
    case "center-even":
      r = n - Math.ceil(i / 2);
      break;
    default:
      r = 0;
      break;
  }
  return Math.max(r, 0);
}
function ze({ config: e, slidesCount: n }) {
  const { wrapAround: t, snapAlign: u, itemsToShow: i = 1 } = e;
  let r = 0;
  if (t || i > n)
    return r;
  switch (u) {
    case "start":
      r = 0;
      break;
    case "end":
      r = i - 1;
      break;
    case "center":
    case "center-odd":
      r = Math.floor((i - 1) / 2);
      break;
    case "center-even":
      r = Math.floor((i - 2) / 2);
      break;
    default:
      r = 0;
      break;
  }
  return r;
}
function pe({ val: e, max: n, min: t }) {
  return n < t ? e : Math.min(Math.max(e, t), n);
}
function He({ config: e, currentSlide: n, slidesCount: t }) {
  const { snapAlign: u, wrapAround: i, itemsToShow: r = 1 } = e;
  let f = n;
  switch (u) {
    case "center":
    case "center-odd":
      f -= (r - 1) / 2;
      break;
    case "center-even":
      f -= (r - 2) / 2;
      break;
    case "end":
      f -= r - 1;
      break;
  }
  return i ? f : pe({
    val: f,
    max: t - r,
    min: 0
  });
}
function je(e) {
  return e ? e.reduce((n, t) => {
    var u;
    return t.type === fe ? [...n, ...je(t.children)] : ((u = t.type) === null || u === void 0 ? void 0 : u.name) === "CarouselSlide" ? [...n, t] : n;
  }, []) : [];
}
function ee({ val: e, max: n, min: t = 0 }) {
  return e > n ? ee({ val: e - (n + 1), max: n, min: t }) : e < t ? ee({ val: e + (n + 1), max: n, min: t }) : e;
}
function Ye(e, n) {
  let t;
  return n ? function(...u) {
    const i = this;
    t || (e.apply(i, u), t = !0, setTimeout(() => t = !1, n));
  } : e;
}
function We(e, n) {
  let t;
  return function(...u) {
    t && clearTimeout(t), t = setTimeout(() => {
      e(...u), t = null;
    }, n);
  };
}
function Ee(e = "", n = {}) {
  return Object.entries(n).reduce((t, [u, i]) => t.replace(`{${u}}`, String(i)), e);
}
var Ge = te({
  name: "ARIA",
  setup() {
    const e = g("config", R(Object.assign({}, p))), n = g("currentSlide", s(0)), t = g("slidesCount", s(0));
    return () => b("div", {
      class: ["carousel__liveregion", "carousel__sr-only"],
      "aria-live": "polite",
      "aria-atomic": "true"
    }, Ee(e.i18n.itemXofY, {
      currentSlide: n.value + 1,
      slidesCount: t.value
    }));
  }
}), Fe = te({
  name: "Carousel",
  props: Oe,
  setup(e, { slots: n, emit: t, expose: u }) {
    var i;
    const r = s(null), f = s([]), v = s(0), c = s(0), o = R(Object.assign({}, p));
    let S = Object.assign({}, p), k;
    const d = s((i = e.modelValue) !== null && i !== void 0 ? i : 0), y = s(0), C = s(0), A = s(0), V = s(0);
    let E, H;
    M("config", o), M("slidesCount", c), M("currentSlide", d), M("maxSlide", A), M("minSlide", V), M("slideWidth", v);
    function Y() {
      k = Object.assign({}, e.breakpoints), S = Object.assign(Object.assign(Object.assign({}, S), e), { i18n: Object.assign(Object.assign({}, S.i18n), e.i18n), breakpoints: void 0 }), W(S);
    }
    function $() {
      if (!k || !Object.keys(k).length)
        return;
      const l = Object.keys(k).map((m) => Number(m)).sort((m, O) => +O - +m);
      let h = Object.assign({}, S);
      l.some((m) => {
        const O = window.matchMedia(`(min-width: ${m}px)`).matches;
        return O && (h = Object.assign(Object.assign({}, h), k[m])), O;
      }), W(h);
    }
    function W(l) {
      Object.entries(l).forEach(([h, m]) => o[h] = m);
    }
    const Q = We(() => {
      $(), U(), I();
    }, 16);
    function I() {
      if (!r.value)
        return;
      const l = r.value.getBoundingClientRect();
      v.value = l.width / o.itemsToShow;
    }
    function U() {
      c.value <= 0 || (C.value = Math.ceil((c.value - 1) / 2), A.value = Xe({ config: o, slidesCount: c.value }), V.value = ze({ config: o, slidesCount: c.value }), o.wrapAround || (d.value = pe({
        val: d.value,
        max: A.value,
        min: V.value
      })));
    }
    Ie(() => {
      De(() => I()), setTimeout(() => I(), 1e3), $(), ye(), window.addEventListener("resize", Q, { passive: !0 }), t("init");
    }), Be(() => {
      H && clearTimeout(H), E && clearInterval(E), window.removeEventListener("resize", Q, {
        passive: !0
      });
    });
    let a = !1;
    const _ = { x: 0, y: 0 }, X = { x: 0, y: 0 }, L = R({ x: 0, y: 0 }), z = s(!1), x = s(!1), G = () => {
      z.value = !0;
    }, Re = () => {
      z.value = !1;
    };
    function he(l) {
      ["INPUT", "TEXTAREA", "SELECT"].includes(l.target.tagName) || (a = l.type === "touchstart", a || l.preventDefault(), !(!a && l.button !== 0 || B.value) && (_.x = a ? l.touches[0].clientX : l.clientX, _.y = a ? l.touches[0].clientY : l.clientY, document.addEventListener(a ? "touchmove" : "mousemove", Se, !0), document.addEventListener(a ? "touchend" : "mouseup", be, !0)));
    }
    const Se = Ye((l) => {
      x.value = !0, X.x = a ? l.touches[0].clientX : l.clientX, X.y = a ? l.touches[0].clientY : l.clientY;
      const h = X.x - _.x, m = X.y - _.y;
      L.y = m, L.x = h;
    }, o.throttle);
    function be() {
      const l = o.dir === "rtl" ? -1 : 1, h = Math.sign(L.x) * 0.4, m = Math.round(L.x / v.value + h) * l;
      if (m && !a) {
        const O = (Ce) => {
          window.removeEventListener("click", O, !0);
        };
        window.addEventListener("click", O, !0);
      }
      P(d.value - m), L.x = 0, L.y = 0, x.value = !1, document.removeEventListener(a ? "touchmove" : "mousemove", Se, !0), document.removeEventListener(a ? "touchend" : "mouseup", be, !0);
    }
    function ye() {
      !o.autoplay || o.autoplay <= 0 || (E = setInterval(() => {
        o.pauseAutoplayOnHover && z.value || Z();
      }, o.autoplay));
    }
    function we() {
      E && (clearInterval(E), E = null), ye();
    }
    const B = s(!1);
    function P(l) {
      const h = o.wrapAround ? l : pe({
        val: l,
        max: A.value,
        min: V.value
      });
      d.value === h || B.value || (t("slide-start", {
        slidingToIndex: l,
        currentSlideIndex: d.value,
        prevSlideIndex: y.value,
        slidesCount: c.value
      }), B.value = !0, y.value = d.value, d.value = h, H = setTimeout(() => {
        if (o.wrapAround) {
          const m = ee({
            val: h,
            max: A.value,
            min: 0
          });
          m !== d.value && (d.value = m, t("loop", {
            currentSlideIndex: d.value,
            slidingToIndex: l
          }));
        }
        t("update:modelValue", d.value), t("slide-end", {
          currentSlideIndex: d.value,
          prevSlideIndex: y.value,
          slidesCount: c.value
        }), B.value = !1, we();
      }, o.transition));
    }
    function Z() {
      P(d.value + o.itemsToScroll);
    }
    function ne() {
      P(d.value - o.itemsToScroll);
    }
    const ke = { slideTo: P, next: Z, prev: ne };
    M("nav", ke), M("isSliding", B);
    const _e = T(() => He({
      config: o,
      currentSlide: d.value,
      slidesCount: c.value
    }));
    M("slidesToScroll", _e);
    const Ve = T(() => {
      const l = o.dir === "rtl" ? -1 : 1, h = _e.value * v.value * l;
      return {
        transform: `translateX(${L.x - h}px)`,
        transition: `${B.value ? o.transition : 0}ms`,
        margin: o.wrapAround ? `0 -${c.value * v.value}px` : "",
        width: "100%"
      };
    });
    function xe() {
      Y(), $(), U(), I(), we();
    }
    Object.keys(Oe).forEach((l) => {
      ["modelValue"].includes(l) || se(() => e[l], xe);
    }), se(() => e.modelValue, (l) => {
      l !== d.value && P(Number(l));
    }), se(c, U), t("before-init"), Y();
    const Ae = {
      config: o,
      slidesCount: c,
      slideWidth: v,
      next: Z,
      prev: ne,
      slideTo: P,
      currentSlide: d,
      maxSlide: A,
      minSlide: V,
      middleSlide: C
    };
    u({
      updateBreakpointsConfigs: $,
      updateSlidesData: U,
      updateSlideWidth: I,
      initDefaultConfigs: Y,
      restartCarousel: xe,
      slideTo: P,
      next: Z,
      prev: ne,
      nav: ke,
      data: Ae
    });
    const ae = n.default || n.slides, le = n.addons, Te = R(Ae);
    return () => {
      const l = je(ae == null ? void 0 : ae(Te)), h = (le == null ? void 0 : le(Te)) || [];
      l.forEach((oe, re) => oe.props.index = re);
      let m = l;
      if (o.wrapAround) {
        const oe = l.map((ie, F) => Ne(ie, {
          index: -l.length + F,
          isClone: !0,
          key: `clone-before-${F}`
        })), re = l.map((ie, F) => Ne(ie, {
          index: l.length + F,
          isClone: !0,
          key: `clone-after-${F}`
        }));
        m = [...oe, ...l, ...re];
      }
      f.value = l, c.value = Math.max(l.length, 1);
      const O = b("ol", {
        class: "carousel__track",
        style: Ve.value,
        onMousedownCapture: o.mouseDrag ? he : null,
        onTouchstartPassiveCapture: o.touchDrag ? he : null
      }, m), Ce = b("div", { class: "carousel__viewport" }, O);
      return b("section", {
        ref: r,
        class: {
          carousel: !0,
          "is-sliding": B.value,
          "is-dragging": x.value,
          "is-hover": z.value,
          "carousel--rtl": o.dir === "rtl"
        },
        dir: o.dir,
        "aria-label": o.i18n.ariaGallery,
        tabindex: "0",
        onMouseenter: G,
        onMouseleave: Re
      }, [Ce, h, b(Ge)]);
    };
  }
}), me;
(function(e) {
  e.arrowUp = "arrowUp", e.arrowDown = "arrowDown", e.arrowRight = "arrowRight", e.arrowLeft = "arrowLeft";
})(me || (me = {}));
const qe = {
  arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",
  arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
};
function Je(e) {
  return e in me;
}
const ge = (e) => {
  const n = g("config", R(Object.assign({}, p))), t = String(e.name), u = `icon${t.charAt(0).toUpperCase() + t.slice(1)}`;
  if (!t || typeof t != "string" || !Je(t))
    return;
  const i = qe[t], r = b("path", { d: i }), f = n.i18n[u] || e.title || t, v = b("title", f);
  return b("svg", {
    class: "carousel__icon",
    viewBox: "0 0 24 24",
    role: "img",
    "aria-label": f
  }, [v, r]);
};
ge.props = { name: String, title: String };
const Ke = (e, { slots: n, attrs: t }) => {
  const { next: u, prev: i } = n || {}, r = g("config", R(Object.assign({}, p))), f = g("maxSlide", s(1)), v = g("minSlide", s(1)), c = g("currentSlide", s(1)), o = g("nav", {}), { dir: S, wrapAround: k, i18n: d } = r, y = S === "rtl", C = b("button", {
    type: "button",
    class: [
      "carousel__prev",
      !k && c.value <= v.value && "carousel__prev--disabled",
      t == null ? void 0 : t.class
    ],
    "aria-label": d.ariaPreviousSlide,
    onClick: o.prev
  }, (i == null ? void 0 : i()) || b(ge, { name: y ? "arrowRight" : "arrowLeft" })), A = b("button", {
    type: "button",
    class: [
      "carousel__next",
      !k && c.value >= f.value && "carousel__next--disabled",
      t == null ? void 0 : t.class
    ],
    "aria-label": d.ariaNextSlide,
    onClick: o.next
  }, (u == null ? void 0 : u()) || b(ge, { name: y ? "arrowLeft" : "arrowRight" }));
  return [C, A];
}, Qe = () => {
  const e = g("config", R(Object.assign({}, p))), n = g("maxSlide", s(1)), t = g("minSlide", s(1)), u = g("currentSlide", s(1)), i = g("nav", {}), r = (v) => ee({
    val: u.value,
    max: n.value,
    min: 0
  }) === v, f = [];
  for (let v = t.value; v < n.value + 1; v++) {
    const c = b("button", {
      type: "button",
      class: {
        "carousel__pagination-button": !0,
        "carousel__pagination-button--active": r(v)
      },
      "aria-label": Ee(e.i18n.ariaNavigateToSlide, {
        slideNumber: v + 1
      }),
      onClick: () => i.slideTo(v)
    }), o = b("li", { class: "carousel__pagination-item", key: v }, c);
    f.push(o);
  }
  return b("ol", { class: "carousel__pagination" }, f);
};
var Me = te({
  name: "CarouselSlide",
  props: {
    index: {
      type: Number,
      default: 1
    },
    isClone: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, { slots: n }) {
    const t = g("config", R(Object.assign({}, p))), u = g("currentSlide", s(0)), i = g("slidesToScroll", s(0)), r = g("isSliding", s(!1)), f = T(() => e.index === u.value), v = T(() => e.index === u.value - 1), c = T(() => e.index === u.value + 1), o = T(() => {
      const S = Math.floor(i.value), k = Math.ceil(i.value + t.itemsToShow - 1);
      return e.index >= S && e.index <= k;
    });
    return () => {
      var S;
      return b("li", {
        style: { width: `${100 / t.itemsToShow}%` },
        class: {
          carousel__slide: !0,
          "carousel__slide--clone": e.isClone,
          "carousel__slide--visible": o.value,
          "carousel__slide--active": f.value,
          "carousel__slide--prev": v.value,
          "carousel__slide--next": c.value,
          "carousel__slide--sliding": r.value
        },
        "aria-hidden": !o.value
      }, (S = n.default) === null || S === void 0 ? void 0 : S.call(n, {
        isActive: f.value,
        isClone: e.isClone,
        isPrev: v.value,
        isNext: c.value,
        isSliding: r.value,
        isVisible: o.value
      }));
    };
  }
});
const Ze = { class: "lkt-carousel-page" }, et = { key: 0 }, tt = { key: 0 }, nt = {
  key: 1,
  class: "lkt-carousel-page-buttons"
}, at = {
  key: 2,
  class: "lkt-carousel-page-filters"
}, lt = { class: "lkt-carousel-slide" }, ot = { class: "lkt-carousel-slide" }, rt = {
  key: 5,
  class: "lkt-carousel-page-empty"
}, it = { class: "lkt-carousel-page-buttons on-bottom" }, st = /* @__PURE__ */ te({
  __name: "LktCarousel",
  props: {
    modelValue: { default: 0 },
    page: { default: 1 },
    itemsToShow: { default: 1 },
    itemsToScroll: { default: 1 },
    autoplay: { default: 0 },
    wrapAround: { type: Boolean, default: !1 },
    mouseDrag: { type: Boolean, default: !0 },
    touchDrag: { type: Boolean, default: !0 },
    pauseAutoplayOnHover: { type: Boolean, default: !0 },
    dir: { default: "ltr" },
    snapAlign: { default: "center" },
    resource: { default: "" },
    resourceData: { default: () => ({}) },
    title: { default: "" },
    noResultsText: { default: "No results" },
    createText: { default: "Create" },
    carouselClass: { default: "" },
    filters: { default: () => ({}) }
  },
  emits: ["create"],
  setup(e, { expose: n, emit: t }) {
    const u = t, i = e;
    let r = [];
    const f = s(i.modelValue), v = s(i.page), c = s([]), o = s(r);
    s(!1);
    const S = s(!1), k = s(null), d = s(i.resource !== ""), y = s(d.value === !0), C = Pe(), A = T(() => {
      let a = [];
      for (let _ in C) _.indexOf("slide-") !== -1 && a.push(_);
      return a;
    }), V = (a) => {
      f.value = 0, Array.isArray(a) && (c.value = a), y.value = !1, S.value = !0, console.log("onResults", c.value, y.value);
    }, E = (a) => {
      o.value = a;
    }, H = () => De(() => y.value = !0), Y = () => u("create"), $ = () => {
      k.value.doRefresh();
    }, W = T(() => o.value.includes("create")), Q = T(() => o.value.includes("read")), I = T(() => o.value.includes("update")), U = T(() => o.value.includes("drop"));
    return n({
      doRefresh: $
    }), (a, _) => {
      const X = ue("lkt-loader"), L = ue("lkt-button"), z = ue("lkt-paginator");
      return w(), D("div", Ze, [
        a.title || j(C).title ? (w(), D("header", et, [
          a.title ? (w(), D("h2", tt, ce(a.title), 1)) : N("", !0),
          j(C).title ? q(a.$slots, "title", { key: 1 }) : N("", !0)
        ])) : N("", !0),
        j(C).buttons ? (w(), D("div", nt, [
          q(a.$slots, "buttons")
        ])) : N("", !0),
        S.value && j(C).filters ? (w(), D("div", at, [
          q(a.$slots, "filters", {
            items: c.value,
            isLoading: y.value
          })
        ])) : N("", !0),
        y.value ? (w(), J(X, { key: 3 })) : N("", !0),
        !d.value && A.value.length > 0 || !y.value && c.value.length > 0 ? (w(), D("div", {
          key: 4,
          class: $e(["lkt-carousel", a.carouselClass])
        }, [
          de(j(Fe), {
            modelValue: f.value,
            "onUpdate:modelValue": _[0] || (_[0] = (x) => f.value = x),
            "items-to-show": a.itemsToShow,
            "items-to-scroll": a.itemsToScroll,
            autoplay: a.autoplay,
            "wrap-around": a.wrapAround,
            "mouse-drag": a.mouseDrag,
            "touch-drag": a.touchDrag,
            "pause-autoplay-on-hover": a.pauseAutoplayOnHover,
            dir: a.dir,
            "snap-align": a.snapAlign
          }, {
            addons: K(() => [
              de(j(Ke)),
              de(j(Qe))
            ]),
            default: K(() => [
              (w(!0), D(fe, null, Le(A.value, (x, G) => (w(), J(j(Me), {
                key: x,
                index: G
              }, {
                default: K(() => [
                  ve("div", lt, [
                    q(a.$slots, x)
                  ])
                ]),
                _: 2
              }, 1032, ["index"]))), 128)),
              (w(!0), D(fe, null, Le(c.value, (x, G) => (w(), J(j(Me), {
                key: a.slide,
                index: G
              }, {
                default: K(() => [
                  ve("div", ot, [
                    q(a.$slots, "item", {
                      item: x,
                      canCreate: W.value,
                      canRead: Q.value,
                      canUpdate: I.value,
                      canDrop: U.value,
                      isLoading: y.value
                    })
                  ])
                ]),
                _: 2
              }, 1032, ["index"]))), 128))
            ]),
            _: 3
          }, 8, ["modelValue", "items-to-show", "items-to-scroll", "autoplay", "wrap-around", "mouse-drag", "touch-drag", "pause-autoplay-on-hover", "dir", "snap-align"])
        ], 2)) : N("", !0),
        !y.value && c.value.length === 0 && d.value ? (w(), D("div", rt, ce(a.noResultsText), 1)) : N("", !0),
        ve("div", it, [
          W.value ? (w(), J(L, {
            key: 0,
            onClick: Y,
            palette: "success"
          }, {
            default: K(() => [
              Ue(ce(a.createText), 1)
            ]),
            _: 1
          })) : N("", !0)
        ]),
        d.value ? (w(), J(z, {
          key: 6,
          ref_key: "paginator",
          ref: k,
          modelValue: v.value,
          "onUpdate:modelValue": _[1] || (_[1] = (x) => v.value = x),
          resource: a.resource,
          filters: a.filters,
          onResults: V,
          onPerms: E,
          onLoading: H
        }, null, 8, ["modelValue", "resource", "filters"])) : N("", !0)
      ]);
    };
  }
}), ct = (e = !0) => {
}, dt = {
  install: (e) => {
    e.component("lkt-carousel") === void 0 && e.component("lkt-carousel", st);
  }
};
export {
  ct as debugLktCarousel,
  dt as default
};
