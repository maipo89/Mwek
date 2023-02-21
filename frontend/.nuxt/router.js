import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _60b4c31a = () => interopDefault(import('../pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _346432c2 = () => interopDefault(import('../pages/blog/_cat/index.vue' /* webpackChunkName: "pages/blog/_cat/index" */))
const _6d13f094 = () => interopDefault(import('../pages/blog/_page.vue' /* webpackChunkName: "pages/blog/_page" */))
const _73a9121c = () => interopDefault(import('../pages/services/_page.vue' /* webpackChunkName: "pages/services/_page" */))
const _c5b51144 = () => interopDefault(import('../pages/blog/_cat/_page.vue' /* webpackChunkName: "pages/blog/_cat/_page" */))
const _6f113d6d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _505afbee = () => interopDefault(import('../pages/_page.vue' /* webpackChunkName: "pages/_page" */))

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
    component: _60b4c31a,
    name: "blog"
  }, {
    path: "/blog/:cat",
    component: _346432c2,
    name: "blog-cat"
  }, {
    path: "/blog/:page",
    component: _6d13f094,
    name: "blog-page"
  }, {
    path: "/services/:page?",
    component: _73a9121c,
    name: "services-page"
  }, {
    path: "/blog/:cat/:page",
    component: _c5b51144,
    name: "blog-cat-page"
  }, {
    path: "/",
    component: _6f113d6d,
    name: "index"
  }, {
    path: "/:page",
    component: _505afbee,
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
