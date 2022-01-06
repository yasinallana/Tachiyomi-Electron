import {
  S as y,
  i as _,
  s as b,
  e as c,
  a as g,
  b as u,
  c as v,
  d as k,
  f as i,
  l as w,
  n as m,
  g as x,
} from './vendor.ac5e1e25.js';
const L = function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === 'childList')
        for (const o of r.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(e) {
    const r = {};
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerpolicy && (r.referrerPolicy = e.referrerpolicy),
      e.crossorigin === 'use-credentials'
        ? (r.credentials = 'include')
        : e.crossorigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = n(e);
    fetch(e.href, r);
  }
};
L();
var C = './assets/sample.e582d8e7.jpg';
function O(l) {
  let t, n, s, e, r, o, a, d, p;
  return {
    c() {
      (t = c('main')),
        (n = c('h1')),
        (n.textContent = 'Here Begins tachiyomi'),
        (s = g()),
        (e = c('img')),
        (o = g()),
        (a = c('button')),
        (a.textContent = 'Click'),
        u(n, 'class', 'text-white'),
        v(e.src, (r = C)) || u(e, 'src', r),
        u(e, 'alt', 'Sample'),
        u(t, 'class', 'w-screen h-screen wd dark:bg-gray-900');
    },
    m(f, h) {
      k(f, t, h), i(t, n), i(t, s), i(t, e), i(t, o), i(t, a), d || ((p = w(a, 'click', l[1])), (d = !0));
    },
    p: m,
    i: m,
    o: m,
    d(f) {
      f && x(t), (d = !1), p();
    },
  };
}
function S(l, t, n) {
  let s = 0;
  return [s, () => n(0, (s += 1))];
}
class $ extends y {
  constructor(t) {
    super();
    _(this, t, S, O, b, {});
  }
}
new $({ target: document.getElementById('app') });
