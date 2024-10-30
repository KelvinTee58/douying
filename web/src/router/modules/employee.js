// import searchLayout from '@/layout/search.vue';
import defaultLayer from '@/layout/default.vue';
import navLayer from '@/layout/nav.vue';
import employeeComponent from '@/views/employee/index';
import employeeEditComponent from '@/views/employee/edit.vue';

const employeeRotuter = {
  path: '/employee',
  component: defaultLayer,
  children: [
    {
      path: '',
      component: employeeComponent,
      meta: { title: '员工' } // 添加meta字段，定义标题
    },
    {
      path: 'edit',
      component: navLayer,
      children: [
        {
          path: '',
          component: employeeEditComponent,
          meta: { title: '编辑' } // 添加meta字段，定义标题
        }
      ]
    }
  ]
};

export default employeeRotuter;
