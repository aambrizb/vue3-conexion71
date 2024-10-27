(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".div-items[data-v-4bb54f3e]{max-height:150px;overflow:auto;position:absolute;top:35px;left:0;background-color:#fff;border:solid 1px #c4c4c4;border-radius:10px;z-index:999999;width:100%}.items[data-v-4bb54f3e]{list-style:none;margin:0;padding:10px}.item[data-v-4bb54f3e]{cursor:pointer}.selected[data-v-4bb54f3e]{background-color:#f2f2f2;font-weight:700}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { ref as i, onMounted as z, watch as D, openBlock as f, createElementBlock as p, Fragment as M, createElementVNode as a, withDirectives as T, vModelText as V, toDisplayString as C, normalizeClass as F, renderList as J, createCommentVNode as w } from "vue";
const K = (r, y) => {
  const _ = r.__vccOpts || r;
  for (const [l, b] of y)
    _[l] = b;
  return _;
}, L = { class: "row" }, U = ["id", "name"], q = { class: "col-lg-1 col-md-1 col-sm-1 col-xs-12 fw-bold" }, G = { style: { position: "relative" } }, H = {
  key: 0,
  class: "div-items"
}, P = { class: "items" }, R = ["onClick", "onMouseover"], j = {
  key: 0,
  class: "col-lg-1 col-md-1 col-sm-1 col-xs-12"
}, A = ["data-app", "data-model"], Q = {
  key: 0,
  class: "row"
}, W = { class: "col-lg-11 col-md-11 col-sm-11 col-xs-12" }, X = { style: { "font-size": "12px", color: "gray" } }, Y = {
  __name: "SelectFrame",
  props: [
    "name",
    "label",
    "app",
    "method",
    "label_field",
    "id_field",
    "help_text",
    "show_actions",
    "pk"
  ],
  emits: ["changed"],
  setup(r, { expose: y, emit: _ }) {
    const l = r, b = _;
    y({
      setPK: I
    });
    const h = i(null), k = i(null), d = i(null), m = i([]), n = i([]), s = i(null), c = i(null), v = i(!1), u = i(null);
    z(() => {
      l.name === void 0 || l.app === void 0 || l.method === void 0 || l.label_field === void 0 || (l.pk !== void 0 && (u.value = l.pk), document.addEventListener("created_edited", function(e) {
        e.detail.base_app === h.value && e.detail.base_model === k.value && (removeModal("base", "CreateEdit"), u.value = e.detail.pk, x());
      }), x());
    }), D(d, (e, t) => {
      n.value = m.value.filter((o) => o[l.label_field].includes(d.value)), v.value = !0;
    });
    function I(e) {
      u.value = e, x();
    }
    const x = () => {
      HttpRequest(
        "GET",
        l.app,
        l.method
      ).then(function(e) {
        h.value = e.app, k.value = e.model, m.value = e.data, n.value = m.value, u.value !== void 0 && u.value !== null && setTimeout(function() {
          let t = m.value.findIndex((o) => String(o.id) === String(u.value));
          t !== -1 && (c.value = m.value[t], d.value = m.value[t][l.label_field], setTimeout(function() {
            v.value = !1;
          }, 50));
        }, 50);
      });
    }, N = (e) => {
      if (e.keyCode === 38 || e.keyCode === 40) {
        if (s.value === void 0 || s.value === null) {
          s.value = 0, g(s.value);
          return;
        }
        e.keyCode === 40 && s.value < n.value.length - 1 && (s.value += 1), e.keyCode === 38 && s.value > 0 && (s.value -= 1), g(s.value);
      } else e.keyCode === 13 ? E(s.value) : e.keyCode === 27 && (v.value = !1);
    }, E = (e) => {
      d.value = n.value[e][l.label_field], c.value = n.value[e], u.value = c.value.id, b("changed", c.value), setTimeout(function() {
        v.value = !1;
      }, 50);
    }, g = (e) => {
      s.value = e, !(n.value.length === 0 || n.value[e] === void 0) && (n.value.forEach((t) => t.class_item = null), n.value[e].class_item = "selected");
    }, $ = () => {
      showModal("base", "CreateEdit", {
        base_app: h.value,
        base_model: k.value,
        pk: c.value.id
      });
    }, B = (e) => {
      setTimeout(function() {
        v.value = !1, (c.value === null || c.value === void 0) && (d.value = null);
      }, 100);
    };
    return (e, t) => (f(), p(M, null, [
      a("div", L, [
        T(a("input", {
          id: "id_" + l.name,
          type: "hidden",
          name: l.name,
          "onUpdate:modelValue": t[0] || (t[0] = (o) => u.value = o)
        }, null, 8, U), [
          [V, u.value]
        ]),
        a("div", q, C(l.label), 1),
        a("div", {
          class: F(JSON.parse(r.show_actions) ? "col-lg-9 col-md-9 col-sm-9 col-xs-12" : "col-lg-10 col-md-10 col-sm-10 col-xs-12")
        }, [
          a("div", G, [
            T(a("input", {
              type: "text",
              class: "form-control",
              onFocus: t[1] || (t[1] = (o) => v.value = !0),
              onBlur: B,
              onKeyup: N,
              "onUpdate:modelValue": t[2] || (t[2] = (o) => d.value = o)
            }, null, 544), [
              [V, d.value]
            ]),
            v.value ? (f(), p("div", H, [
              a("ul", P, [
                (f(!0), p(M, null, J(n.value, (o, S) => (f(), p("li", {
                  class: F(["item", o.class_item]),
                  onClick: (O) => {
                    E(S);
                  },
                  onMouseover: (O) => {
                    g(S);
                  }
                }, C(o[l.label_field]), 43, R))), 256))
              ])
            ])) : w("", !0)
          ])
        ], 2),
        JSON.parse(l.show_actions) ? (f(), p("div", j, [
          a("span", {
            class: "fa fa-plus-circle text-primary m-1 core_create_edit",
            "data-app": h.value,
            "data-model": k.value,
            style: { cursor: "pointer" }
          }, null, 8, A),
          a("span", {
            class: "fa fa-edit text-success m-1 core_create_edit",
            onClick: t[3] || (t[3] = (o) => $()),
            style: { cursor: "pointer" }
          })
        ])) : w("", !0)
      ]),
      l.help_text ? (f(), p("div", Q, [
        t[4] || (t[4] = a("div", { class: "col-lg-1 col-md-1 col-sm-1 col-xs-12" }, null, -1)),
        a("div", W, [
          a("i", X, C(r.help_text), 1)
        ])
      ])) : w("", !0)
    ], 64));
  }
}, ee = /* @__PURE__ */ K(Y, [["__scopeId", "data-v-4bb54f3e"]]);
export {
  ee as SelectFrame
};
