!(function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var u = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(u.exports, u, u.exports, r), (u.l = !0), u.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var u in e)
          r.d(
            n,
            u,
            function (t) {
              return e[t];
            }.bind(null, u)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = "/"),
    r((r.s = 2));
})([
  function (e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "checkValue", function () {
        return s;
      }),
      r.d(t, "checkRadio", function () {
        return a;
      }),
      r.d(t, "checkSelect", function () {
        return o;
      });
    var n = function (e) {
        var t = { result: !1, message: "" };
        return (
          e &&
          (e.match(/^(\d{2}|0[5789]0)[\s.-]?[1-9]\d{3}[\s.-]?\d{4}$/) ||
            e.match(/^(\d{3}|0[5789]0)[\s.-]?[1-9]\d{3}[\s.-]?\d{4}$/) ||
            e.match(/^(\d{3}|0[5789]0)[\s.-]?[1-9]\d{2}[\s.-]?\d{4}$/))
            ? (t.result = !0)
            : ((t.result = !1),
              (t.message = "正しい電話番号を入力してください")),
          t
        );
      },
      u = function (e) {
        var t = { result: !1, message: "" };
        return (
          e &&
          e.match(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|biz|info|jp)\b/
          )
            ? (t.result = !0)
            : ((t.result = !1),
              (t.message = "メールアドレスを正しく入力してください")),
          t
        );
      },
      s = function (e) {
        for (var t = { result: !1, message: "" }, r = 0; r < e.length; r++)
          e[r].value
            ? "phone" == e[r].name
              ? (t = n(e[r].value))
              : "email" == e[r].name
              ? (t = u(e[r].value))
              : (t.result = !0)
            : ((t.result = !1), (t.message = "こちらは必須入力です"));
        return t;
      },
      a = function (e) {
        for (
          var t = { result: !1, message: "" }, r = !1, n = 0;
          n < e.length;
          n++
        )
          if (e[n].checked) {
            r = !0;
            break;
          }
        return (
          (t.result = r), r || (t.message = "建物の種類を選択してください"), t
        );
      },
      o = function (e) {
        var t = { result: !1, message: "" };
        return (
          e.options[e.selectedIndex].value
            ? (t.result = !0)
            : ((t.result = !1),
              "study_status" == e.id
                ? (t.message = "ご状況を選択してください")
                : "work" == e.id
                ? (t.message = "希望工事箇所を選択してください")
                : "pref" == e.id
                ? (t.message = "都道府県を選択してください")
                : "construct_paint_rough_square" == e.id
                ? (t.message = "延べ床面積を選択してください")
                : "construct_paint_building_age" == e.id
                ? (t.message = "築年数を選択してください")
                : (t.message = "こちらは必須入力です")),
          t
        );
      };
  },
  ,
  function (e, t, r) {
    r(0), (e.exports = r(6));
  },
  ,
  ,
  ,
  function (e, t) {},
]);
