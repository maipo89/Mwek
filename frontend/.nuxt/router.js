import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _157d6813 = () => interopDefault(import('../pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _6418b45c = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _7f6e7d2e = () => interopDefault(import('../pages/blog/_cat/index.vue' /* webpackChunkName: "pages/blog/_cat/index" */))
const _7e3eacaf = () => interopDefault(import('../pages/blog/_page.vue' /* webpackChunkName: "pages/blog/_page" */))
const _290a0605 = () => interopDefault(import('../pages/blog/_cat/_page.vue' /* webpackChunkName: "pages/blog/_cat/_page" */))
const _11d1a0d4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _7a92e570 = () => interopDefault(import('../pages/_page.vue' /* webpackChunkName: "pages/_page" */))

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
    component: _157d6813,
    name: "blog"
  }, {
    path: "/inspire",
    component: _6418b45c,
    name: "inspire"
  }, {
    path: "/blog/:cat",
    component: _7f6e7d2e,
    name: "blog-cat"
  }, {
    path: "/blog/:page",
    component: _7e3eacaf,
    name: "blog-page"
  }, {
    path: "/blog/:cat/:page",
    component: _290a0605,
    name: "blog-cat-page"
  }, {
    path: "/",
    component: _11d1a0d4,
    name: "index"
  }, {
    path: "/:page",
    component: _7a92e570,
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
