import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'; // Vuex store
import requestUtils from '@/utils/request';
import storageUtils from '@/utils/storage';
// import indexRotuter from './modules/index';
// import loginRotuter from './modules/login';

Vue.use(VueRouter);

// 创建路由模块的自动导入函数
const modulesFiles = require.context('./modules', true, /\.js$/);

// 动态导入所有模块中的路由
const modules = modulesFiles.keys().map((modulePath) => {
  return modulesFiles(modulePath).default;
});

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  ...modules
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth !== false; // 默认需要登录，除非明确标识不需要
  // 判断是否需要登录访问
  if (requiresAuth) {
    const isAuthenticated = store.getters['user/isAuthenticated']; // Vuex 里是否已登录

    let refreshToken = storageUtils.get('refreshToken');
    let token = storageUtils.get('accessToken');
    if (isAuthenticated && refreshToken && token) {
      // 已经登录，继续跳转
      next();
    } else if (refreshToken) {
      // 有 refreshToken 尝试获取用户信息
      try {
        const { data } = await requestUtils.get('/api/users');
        store.dispatch('user/updateUserInfo', data.user || {});
        next();
      } catch (error) {
        console.log('error :>> ', error);
        next({ path: '/login', query: { redirect: to.fullPath } });
      }
    } else {
      // 没有登录且没有 token，直接跳转到登录页面
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    // 不需要登录权限的页面，直接跳转
    next();
  }
});

export default router;
