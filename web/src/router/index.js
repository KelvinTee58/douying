import Vue from 'vue'
import VueRouter from 'vue-router'
import indexRotuter from './modules/index'
import loginRotuter from './modules/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  indexRotuter,
  loginRotuter
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
