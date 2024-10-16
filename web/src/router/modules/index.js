import navLayer from '@/layout/nav.vue';
import indexComponent from '@/views/index/index';

const indexRotuter = {
  path: '/index',
  component: navLayer,
  children: [
    {
      path: '/',
      component: indexComponent,
      meta: { title: '首页' } // 添加meta字段，定义标题
    }
  ]
};

export default indexRotuter;
