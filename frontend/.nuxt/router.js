import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _839e00d0 = () => interopDefault(import('../pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _1e301504 = () => interopDefault(import('../pages/blog/_cat/index.vue' /* webpackChunkName: "pages/blog/_cat/index" */))
const _26f24434 = () => interopDefault(import('../pages/blog/_page.vue' /* webpackChunkName: "pages/blog/_page" */))
const _5a194470 = () => interopDefault(import('../pages/services/_page.vue' /* webpackChunkName: "pages/services/_page" */))
const _f21d4cc0 = () => interopDefault(import('../pages/blog/_cat/_page.vue' /* webpackChunkName: "pages/blog/_cat/_page" */))
const _9836aba2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _1ca5eecb = () => interopDefault(import('../pages/_page.vue' /* webpackChunkName: "pages/_page" */))

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
    component: _839e00d0,
    name: "blog"
  }, {
    path: "/blog/:cat",
    component: _1e301504,
    name: "blog-cat"
  }, {
    path: "/blog/:page",
    component: _26f24434,
    name: "blog-page"
  }, {
    path: "/services/:page?",
    component: _5a194470,
    name: "services-page"
  }, {
    path: "/blog/:cat/:page",
    component: _f21d4cc0,
    name: "blog-cat-page"
  }, {
    path: "/",
    component: _9836aba2,
    name: "index"
  }, {
    path: "/:page",
    component: _1ca5eecb,
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
