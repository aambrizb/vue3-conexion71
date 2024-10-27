(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".div-items[data-v-23b8752c]{max-height:150px;overflow:auto;position:absolute;top:35px;left:0;background-color:#fff;border:solid 1px #c4c4c4;border-radius:10px;z-index:999999;width:100%}.items[data-v-23b8752c]{list-style:none;margin:0;padding:10px}.item[data-v-23b8752c]{cursor:pointer}.selected[data-v-23b8752c]{background-color:#f2f2f2;font-weight:700}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { ref as d, onMounted as B, watch as z, openBlock as m, createElementBlock as f, Fragment as M, createElementVNode as o, withDirectives as N, vModelText as T, toDisplayString as C, normalizeClass as V, renderList as D, createCommentVNode as y } from "vue";
const K = (i, b) => {
  const p = i.__vccOpts || i;
  for (const [l, x] of b)
    p[l] = x;
  return p;
}, L = { class: "row" }, U = ["id", "name"], q = { class: "col-lg-1 col-md-1 col-sm-1 col-xs-12 fw-bold" }, G = { style: { position: "relative" } }, H = {
  key: 0,
  class: "div-items"
}, P = { class: "items" }, R = ["onClick", "onMouseover"], j = { class: "col-lg-1 col-md-1 col-sm-1 col-xs-12" }, A = ["data-app", "data-model", "data-form_class"], Q = ["data-form_class"], W = {
  key: 0,
  class: "row"
}, X = { class: "col-lg-11 col-md-11 col-sm-11 col-xs-12" }, Y = { style: { "font-size": "12px", color: "gray" } }, Z = {
  __name: "SelectFrame",
  props: [
    "name",
    "label",
    "app",
    "method",
    "label_field",
    "id_field",
    "help_text",
    "show_create",
    "show_edit",
    "form_class",
    "pk"
  ],
  emits: ["changed"],
  setup(i, { expose: b, emit: p }) {
    const l = i, x = p;
    b({
      setPK: O
    });
    const h = d(null), k = d(null), c = d(null), _ = d([]), n = d([]), s = d(null), r = d(null), v = d(!1), u = d(null);
    B(() => {
      l.name === void 0 || l.app === void 0 || l.method === void 0 || l.label_field === void 0 || (l.pk !== void 0 && (u.value = l.pk), document.addEventListener("created_edited", function(e) {
        e.detail.base_app === h.value && e.detail.base_model === k.value && (removeModal("base", "CreateEdit"), u.value = e.detail.pk, g());
      }), g());
    }), z(c, (e, t) => {
      n.value = _.value.filter((a) => a[l.label_field].includes(c.value)), v.value = !0;
    });
    function O(e) {
      u.value = e, g();
    }
    const g = () => {
      HttpRequest(
        "GET",
        l.app,
        l.method
      ).then(function(e) {
        h.value = e.app, k.value = e.model, _.value = e.data, n.value = _.value, u.value !== void 0 && u.value !== null && setTimeout(function() {
          let t = _.value.findIndex((a) => String(a.id) === String(u.value));
          t !== -1 && (r.value = _.value[t], c.value = _.value[t][l.label_field], setTimeout(function() {
            v.value = !1;
          }, 50));
        }, 50);
      });
    }, F = (e) => {
      if (e.keyCode === 38 || e.keyCode === 40) {
        if (s.value === void 0 || s.value === null) {
          s.value = 0, w(s.value);
          return;
        }
        e.keyCode === 40 && s.value < n.value.length - 1 && (s.value += 1), e.keyCode === 38 && s.value > 0 && (s.value -= 1), w(s.value);
      } else e.keyCode === 13 ? S(s.value) : e.keyCode === 27 && (v.value = !1);
    }, S = (e) => {
      c.value = n.value[e][l.label_field], r.value = n.value[e], u.value = r.value.id, x("changed", r.value), setTimeout(function() {
        v.value = !1;
      }, 50);
    }, w = (e) => {
      s.value = e, !(n.value.length === 0 || n.value[e] === void 0) && (n.value.forEach((t) => t.class_item = null), n.value[e].class_item = "selected");
    }, I = () => {
      showModal("base", "CreateEdit", {
        base_app: h.value,
        base_model: k.value,
        pk: r.value.id
      });
    }, J = (e) => {
      setTimeout(function() {
        v.value = !1, (r.value === null || r.value === void 0) && (c.value = null);
      }, 100);
    };
    return (e, t) => (m(), f(M, null, [
      o("div", L, [
        N(o("input", {
          id: "id_" + l.name,
          type: "hidden",
          name: l.name,
          "onUpdate:modelValue": t[0] || (t[0] = (a) => u.value = a)
        }, null, 8, U), [
          [T, u.value]
        ]),
        o("div", q, C(l.label), 1),
        o("div", {
          class: V(JSON.parse(i.show_create) || JSON.parse(i.show_edit) ? "col-lg-9 col-md-9 col-sm-9 col-xs-12" : "col-lg-10 col-md-10 col-sm-10 col-xs-12")
        }, [
          o("div", G, [
            N(o("input", {
              type: "text",
              class: "form-control",
              onFocus: t[1] || (t[1] = (a) => v.value = !0),
              onBlur: J,
              onKeyup: F,
              "onUpdate:modelValue": t[2] || (t[2] = (a) => c.value = a)
            }, null, 544), [
              [T, c.value]
            ]),
            v.value ? (m(), f("div", H, [
              o("ul", P, [
                (m(!0), f(M, null, D(n.value, (a, E) => (m(), f("li", {
                  class: V(["item", a.class_item]),
                  onClick: ($) => {
                    S(E);
                  },
                  onMouseover: ($) => {
                    w(E);
                  }
                }, C(a[l.label_field]), 43, R))), 256))
              ])
            ])) : y("", !0)
          ])
        ], 2),
        o("div", j, [
          JSON.parse(l.show_create) ? (m(), f("span", {
            key: 0,
            class: "fa fa-plus-circle text-primary m-1 core_create_edit",
            "data-app": h.value,
            "data-model": k.value,
            "data-form_class": l.form_class,
            style: { cursor: "pointer" }
          }, null, 8, A)) : y("", !0),
          JSON.parse(l.show_edit) ? (m(), f("span", {
            key: 1,
            class: "fa fa-edit text-success m-1 core_create_edit",
            "data-form_class": l.form_class,
            onClick: t[3] || (t[3] = (a) => I()),
            style: { cursor: "pointer" }
          }, null, 8, Q)) : y("", !0)
        ])
      ]),
      l.help_text ? (m(), f("div", W, [
        t[4] || (t[4] = o("div", { class: "col-lg-1 col-md-1 col-sm-1 col-xs-12" }, null, -1)),
        o("div", X, [
          o("i", Y, C(i.help_text), 1)
        ])
      ])) : y("", !0)
    ], 64));
  }
}, le = /* @__PURE__ */ K(Z, [["__scopeId", "data-v-23b8752c"]]);
export {
  le as SelectFrame
};
