// import searchLayout from '@/layout/search.vue';
import defaultLayer from '@/layout/default.vue';
import companyComponent from '@/views/company/index';

const companyRotuter = {
  path: '/company',
  component: defaultLayer,
  // component: searchLayout,
  children: [
    {
      path: '/',
      component: companyComponent,
      meta: { title: '公司' } // 添加meta字段，定义标题
    }
  ]
};

export default companyRotuter;
