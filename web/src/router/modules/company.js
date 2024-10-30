// import searchLayout from '@/layout/search.vue';
import defaultLayer from '@/layout/default.vue';
import navLayer from '@/layout/nav.vue';
import companyComponent from '@/views/company/index';
import companyEditComponent from '@/views/company/edit.vue';

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
      path: 'edit',
      component: navLayer,
      children: [
        {
          path: '',
          component: companyEditComponent,
          meta: { title: '编辑' } // 添加meta字段，定义标题
        }
      ]
    }
  ]
};

export default companyRotuter;
