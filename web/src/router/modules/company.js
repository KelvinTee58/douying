// import searchLayout from '@/layout/search.vue';
import defaultLayer from '@/layout/default.vue';
import navLayer from '@/layout/nav.vue';
import companyComponent from '@/views/company/index';
import companyCreateComponent from '@/views/company/create.vue';

const companyRotuter = {
  path: '/company',
  component: defaultLayer,
  children: [
    {
      path: '',
      component: companyComponent,
      meta: { title: '公司' } // 添加meta字段，定义标题
    },
    {
      path: 'create',
      component: navLayer,
      children: [
        {
          path: '',
          component: companyCreateComponent,
          meta: { title: '编辑' } // 添加meta字段，定义标题
        }
      ]
    }
  ]
};

export default companyRotuter;
