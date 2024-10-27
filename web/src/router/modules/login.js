import defaultLayer from '@/layout/default.vue';
import loginComponent from '@/views/login';

const loginRotuter = {
  path: '/login',
  component: defaultLayer,
  children: [
    {
      path: '',
      component: loginComponent,
      meta: { requiresAuth: false } // 不需要登录
    }
  ]
};

export default loginRotuter;
