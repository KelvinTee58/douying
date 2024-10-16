import Vue from 'vue';
import VueRouter from 'vue-router';
import indexRotuter from './modules/index';
import loginRotuter from './modules/login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  indexRotuter,
  loginRotuter
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - 都赢';
  } else {
    document.title = '都赢';
  }
  next();
});

export default router;
