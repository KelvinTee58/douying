// import searchLayout from '@/layout/search.vue';
import defaultLayer from '@/layout/default.vue';
import navLayer from '@/layout/nav.vue';
import rawMaterialComponent from '@/views/rawMaterial/index';
import rawMaterialEditComponent from '@/views/rawMaterial/edit.vue';

const rawMaterialRotuter = {
  path: '/rawMaterial',
  component: defaultLayer,
  children: [
    {
      path: '',
      component: rawMaterialComponent,
      meta: { title: '原料' } // 添加meta字段，定义标题
    },
    {
      path: 'edit',
      component: navLayer,
      children: [
        {
          path: '',
          component: rawMaterialEditComponent,
          meta: { title: '编辑' } // 添加meta字段，定义标题
        }
      ]
    }
  ]
};

export default rawMaterialRotuter;
