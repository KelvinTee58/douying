// import searchLayout from '@/layout/search.vue';
import defaultLayer from '@/layout/default.vue';
import navLayer from '@/layout/nav.vue';
import productComponent from '@/views/product/index';
import productEditComponent from '@/views/product/edit.vue';

const productRotuter = {
  path: '/product',
  component: defaultLayer,
  children: [
    {
      path: '',
      component: productComponent,
      meta: { title: '产品' } // 添加meta字段，定义标题
    },
    {
      path: 'edit',
      component: navLayer,
      children: [
        {
          path: '',
          component: productEditComponent,
          meta: { title: '编辑' } // 添加meta字段，定义标题
        }
      ]
    }
  ]
};

export default productRotuter;
