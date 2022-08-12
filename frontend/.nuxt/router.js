import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d7e4678e = () => interopDefault(import('../pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _5cbd9c14 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _7da1f5fa = () => interopDefault(import('../pages/blog/_cat/index.vue' /* webpackChunkName: "pages/blog/_cat/index" */))
const _0661de56 = () => interopDefault(import('../pages/blog/_page.vue' /* webpackChunkName: "pages/blog/_page" */))
const _29f0499f = () => interopDefault(import('../pages/blog/_cat/_page.vue' /* webpackChunkName: "pages/blog/_cat/_page" */))
const _3ab0bcee = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _b91bfcec = () => interopDefault(import('../pages/_page.vue' /* webpackChunkName: "pages/_page" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blog",
    component: _d7e4678e,
    name: "blog"
  }, {
    path: "/inspire",
    component: _5cbd9c14,
    name: "inspire"
  }, {
    path: "/blog/:cat",
    component: _7da1f5fa,
    name: "blog-cat"
  }, {
    path: "/blog/:page",
    component: _0661de56,
    name: "blog-page"
  }, {
    path: "/blog/:cat/:page",
    component: _29f0499f,
    name: "blog-cat-page"
  }, {
    path: "/",
    component: _3ab0bcee,
    name: "index"
  }, {
    path: "/:page",
    component: _b91bfcec,
    name: "page"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
