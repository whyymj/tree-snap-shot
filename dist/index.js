/*! For license information please see index.js.LICENSE.txt */
(() => {
    "use strict";
    var e = {
        amdO: {},
        n: t => {
            var n = t && t.__esModule ? () => t.default : () => t;
            return e.d(n, {
                a: n
            }), n
        },
        d: (t, n) => {
            for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
                enumerable: !0,
                get: n[r]
            })
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: e => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
    };

    function t(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    e.r({});
    const n = new(function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), t(this, "unImmutableData", {
                equal: function(e, t) {
                    return e === t
                },
                copy: function(e) {
                    return e
                }
            }), t(this, "list", {
                key: "_id",
                mapSimilarityForDiff: .6
            })
        }
        var n;
        return (n = [{
            key: "set",
            value: function(e) {}
        }]) && function(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }(e.prototype, n), e
    }());
    var r = require("immutable"),
        o = e.n(r),
        i = require("kind-of"),
        a = e.n(i);
    r = require("isobject"), i = e.n(r);
    const u = new(function() {
        function e() {
            var t, n;
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), n = {}, (t = "cache") in this ? Object.defineProperty(this, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : this[t] = n
        }
        var t;
        return (t = [{
            key: "set",
            value: function(e, t, n) {
                o().isImmutable(e) && o().isImmutable(t) ? this.cache[o().hash(e) + "_" + o().hash(t)] = n : o().isImmutable(e) && void 0 !== t && (this.cache[o().hash(e)] = t)
            }
        }, {
            key: "get",
            value: function(e, t) {
                return o().isImmutable(e) && o().isImmutable(t) ? this.cache[o().hash(e) + "_" + o().hash(t)] : o().isImmutable(e) && void 0 === t ? this.cache[o().hash(e)] : null
            }
        }, {
            key: "clear",
            value: function() {
                this.cache = {}
            }
        }]) && function(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }(e.prototype, t), e
    }());

    function l(e) {
        return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var f = Object.prototype.toString,
        c = function(e) {
            return "object" === l(e) && (o().isImmutable(e) || Array.isArray(e) || function(e) {
                if (!e || "object" !== l(e) || "[object Object]" !== f.call(e)) return !1;
                if (null === (e = Object.getPrototypeOf(e))) return !0;
                for (var t = e, n = Object.getPrototypeOf(e); null !== n;) t = n, n = Object.getPrototypeOf(t);
                return t === e
            }(e))
        };

    function s(e) {
        return "string" == typeof e || "number" == typeof e || "symbol" === l(e) || "boolean" == typeof e || null == e
    }

    function p(e, t) {
        var n = 1 < arguments.length && void 0 !== t && t;
        if (o().isImmutable(e)) {
            if (t = e.toString(), !n) return "Immutable " + t.split(" ")[0];
            if (0 == t.indexOf("Map")) return "object";
            if (0 == t.indexOf("List")) return "array";
            e = e.toJS()
        }
        return a()(e)
    }
    i();
    var d = function(e) {
        return null == e
    };

    function m(e) {
        var t = 0;
        return c(e) ? (e = o().fromJS(e), u.get(e) ? u.get(e) : (e.map((function(e) {
            t += m(e)
        })), t && u.set(e, t), t)) : 1
    }
    var b = function(e) {
        if (function(e) {
                return "object" === ("undefined" == typeof HTMLElement ? "undefined" : l(HTMLElement)) ? e instanceof HTMLElement : e && "object" === l(e) && (1 === e.nodeType || 9 === e.nodeType) && "string" == typeof e.nodeName
            }(e) || s(e)) return e;
        if (o().isImmutable(e)) return e;
        var t = o().fromJS(e);
        return o().isImmutable(t) ? t : n.unImmutableData.copy(e)
    };

    function y(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function h(e, t) {
        var n, r = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), r.push.apply(r, n)), r
    }

    function g(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? h(Object(n), !0).forEach((function(t) {
                v(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : h(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
        }
        return e
    }

    function v(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    var O = new function e() {
        y(this, e), v(this, "logs", [])
    };
    const j = new(function() {
        function e() {
            y(this, e), O.logs = []
        }
        var t;
        return (t = [{
            key: "add",
            value: function(e) {
                O.logs.push(e)
            }
        }, {
            key: "init",
            value: function(e) {
                O.logs = [], O.logs.push({
                    operation: "init",
                    value: e
                })
            }
        }, {
            key: "getLogs",
            value: function() {
                return function(e) {
                    return e.map((function(e) {
                        return g(g({}, e), {}, {
                            value: (e = e.value, o().isImmutable(e.to) || o().isImmutable(e.from) ? o().fromJS(e).toJS() : e)
                        })
                    }))
                }(O.logs)
            }
        }, {
            key: "setLogs",
            value: function(e) {
                O.logs = e
            }
        }]) && function(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }(e.prototype, t), e
    }());

    function S(e, t) {
        var n, r = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), r.push.apply(r, n)), r
    }

    function w(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? S(Object(n), !0).forEach((function(t) {
                var r, o;
                r = e, t = n[o = t], o in r ? Object.defineProperty(r, o, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : r[o] = t
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : S(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
        }
        return e
    }

    function I(e, t) {
        for (var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : function(e, t) {
                return e === t
            }, r = e.size, o = t.size, i = {
                1: 0
            }, a = {
                0: {
                    1: 0
                }
            }, u = 0; u <= r + o; u++) {
            for (var l = {}, f = -u; f <= u; f += 2) {
                for (var c = f == -u || f != u && i[f + 1] > i[f - 1], s = c ? f + 1 : f - 1, p = i[s], d = p = c ? p : p + 1, m = p - f; d < r && m < o && n(e.get(d), t.get(m));) d++, m++;
                if (i[f] = d, (l[f] = d) == r && m == o) return a[u] = l,
                    function(e, t, n) {
                        var r = [],
                            o = 0;
                        return e.forEach((function(e, i) {
                            var a = e[0],
                                u = e[1],
                                l = e[2],
                                f = a;
                            if (0 === i && 0 !== a)
                                for (var c = 0; c < a; c++) r.push({
                                    operation: "",
                                    value: t.get(c),
                                    index: [c, o]
                                }), o++;
                            u - a == 1 ? (r.push({
                                operation: "del",
                                value: t.get(a),
                                index: [a, o]
                            }), f = u) : (r.push({
                                operation: "add",
                                value: n.get(o),
                                index: [a, o]
                            }), o++);
                            for (var s = 0; s < l - f; s++) r.push({
                                operation: "",
                                value: t.get(f + s),
                                index: [f + s, o]
                            }), o++
                        })), r
                    }(function(e, t, n, r) {
                        for (var o = [], i = {
                                x: t,
                                y: n
                            }; 0 < r; r--) {
                            var a = e[r],
                                u = e[r - 1],
                                l = i.x - i.y,
                                f = a[l],
                                c = (a = (u = u[a = (c = l == -r || l != r && u[1 + l] > u[l - 1]) ? 1 + l : l - 1]) - a, c ? u : u + 1);
                            o.unshift([u, c, f]), i.x = u, i.y = a
                        }
                        return o
                    }(a, r, o, u), e, t)
            }
            a[u] = l
        }
    }
    var P = function(e, t, r, o, i) {
            var a = I(e, t, (function(e, t) {
                return s(e) || s(t) ? e === t : "Immutable Map" == p(e) && "Immutable Map" == p(t) && e.get(n.list.key) && t.get(n.list.key) ? e.get(n.list.key) === t.get(n.list.key) : M(e, t).similarity >= n.list.mapSimilarityForDiff
            }));
            return a.length ? (a.forEach((function(n) {
                n.operation || "Immutable Map" != p(n.value) && "Immutable List" != p(n.value) || D(e.get(n.index[0]), t.get(n.index[1])) || i(e.get(n.index[0]), t.get(n.index[1]), r.push(n.index[0]), o.push(p(e.get(n.index[0]), !0)), i)
            })), j.add({
                path: r,
                type: o,
                operation: "myers-diff",
                steps: function(e) {
                    for (var t = [], n = 0; n < e.length; n++) {
                        var r = e[n],
                            o = e[n + 1];
                        "del" == (null == r ? void 0 : r.operation) && "add" == (null == o ? void 0 : o.operation) && r.index[1] == o.index[1] && o.index[0] == o.index[1] ? (t.push(w(w({}, r), {}, {
                            value: [r.value, o.value],
                            operation: "updated"
                        })), n++) : null != r && r.operation && t.push(r)
                    }
                    return t
                }(a)
            })) : (e.length || e.size) && e.map((function(e, n) {
                D(e, t.get(n)) || i(e, t.get(n), r.push(n), o.push(p(e, !0)), i)
            })), a
        },
        k = function(e, t) {
            return s(e) || s(t) ? e === t : o().isImmutable(e) && o().isImmutable(t) ? o().is(e, t) : (o().isImmutable(e) && (e = e.toJS()), o().isImmutable(t) && (t = t.toJS()), n.unImmutableData.equal(e, t))
        };

    function x(e, t) {
        var r, o, i, a, u = 0,
            l = 0,
            f = 0;
        return t = I(e, t, (function(e, t) {
            return s(e) || s(t) ? e === t : "Immutable Map" == p(e) && "Immutable Map" == p(t) && e.get(n.list.key) && t.get(n.list.key) ? e.get(n.list.key) === t.get(n.list.key) : M(e, t).similarity >= n.list.mapSimilarityForDiff
        })), {
            unchanged: f += (e = e, a = i = o = r = 0, (t = t).length ? t.forEach((function(e) {
                e.operation ? "add" == e.operation ? o++ : "del" == e.operation ? i += m(e.value) : "updated" == e.operation && (a += m(e.value)) : r += m(e.value)
            })) : r = m(e), e = Math.round(r / (o + i + a + r) * 100) / 100, e = {
                unchanged: r,
                add: o,
                del: i,
                updated: a,
                changed: 0,
                similarity: e
            }).unchanged,
            add: u += e.add,
            del: l += e.del,
            updated: 0,
            changed: u + l + 0,
            similarity: Math.round(f / (u + l + 0 + f) * 100) / 100
        }
    }

    function M(e, t) {
        return r = t, O = v = g = h = 0, c(n = e) ? (n = o().fromJS(n), r = o().fromJS(r), p(n) == p(r) ? ((i = u.get(n, r)) || ("Immutable Map" == p(n) ? (a = n, b = s = f = l = 0, y = {}, r.map((function(e, t) {
            d(e) || (y[t] = e, d(a.get(t)) && f++)
        })), a.map((function(e, t) {
            d(e) || (d(y[t]) ? c(e) ? s += m(e) : s++ : o().is(e, y[t]) ? b += m(e) : (t = M(e, y[t]), l += t.updated, s += t.del, f += t.add, b += t.unchanged))
        })), i = {
            unchanged: b,
            add: f,
            del: s,
            updated: l,
            changed: f + s + l,
            similarity: Math.round(b / (f + s + l + b) * 100) / 100
        }) : "Immutable List" == p(n) && (i = x(n, r)), u.set(n, r, i)), h += i.updated, g += i.add, v += i.del, O += i.unchanged) : h += m(n)) : n === r ? O += 1 : h += 1, {
            unchanged: O,
            add: g,
            del: v,
            updated: h,
            changed: g + v + h,
            similarity: Math.round(O / (g + v + h + O) * 100) / 100
        };
        var n, r, i, a, l, f, s, b, y, h, g, v, O
    }

    function D(e, t) {
        return o().is(e, t)
    }

    function E(e, t, n, r, i) {
        if (c(e) && c(t)) {
            if (e = o().fromJS(e), t = o().fromJS(t), o().is(e, t)) return;
            var a = p(e);
            if (a == p(t)) return void("Immutable List" == a ? P(e, t, n, r, i) : "Immutable Map" == a && (u = e, f = n, s = r, m = i, (l = t).map((function(e, t) {
                d(e) || d(u.get(t)) && j.add({
                    path: f.push(t),
                    operation: "add",
                    type: s.push(p(u, !0)),
                    value: {
                        from: void 0,
                        to: b(l.get(t))
                    }
                })
            })), u.map((function(e, t) {
                var n = l.get(t += "");
                d(e) || k(e, n) || (d(n) ? j.add({
                    path: f.push(t),
                    operation: "delete",
                    type: s.push(p(u, !0)),
                    value: {
                        from: b(e),
                        to: void 0
                    }
                }) : m(e, n, f.push(t), s.push(p(u, !0)), m))
            }))))
        }
        var u, l, f, s, m;
        k(e, t) || j.add({
            path: n,
            type: r.push(p(e, !0)),
            operation: "update",
            value: {
                from: b(e),
                to: b(t)
            }
        })
    }

    function J(e, t) {
        var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        return e = o().fromJS(e), j.init(e), n.set(r), E(e, o().fromJS(t), o().List([]), o().List([]), E), j
    }

    function T(e) {
        return (T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    r = void 0, i = function(e) {
        e.default = {
            diff: J,
            similarity: M
        }, e.diff = J, e.similarity = M
    }, "object" === ("undefined" == typeof exports ? "undefined" : T(exports)) ? i(exports) : "function" == typeof define && e.amdO ? define(["exports"], i) : i((r = "undefined" != typeof globalThis ? globalThis : r || self).TreeDiff = {})
})();