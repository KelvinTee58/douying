// import searchLayout from '@/layout/search.vue';
import defaultLayer from '@/layout/default.vue';
import navLayer from '@/layout/nav.vue';
import warehouseComponent from '@/views/warehouse/index';
import warehouseEditComponent from '@/views/warehouse/edit.vue';

const warehouseRotuter = {
  path: '/warehouse',
  component: defaultLayer,
  children: [
    {
      path: '',
      component: warehouseComponent,
      meta: { title: '仓库' } // 添加meta字段，定义标题
    },
    {
      path: 'edit',
      component: navLayer,
      children: [
        {
          path: '',
          component: warehouseEditComponent,
          meta: { title: '编辑' } // 添加meta字段，定义标题
        }
      ]
    }
  ]
};

export default warehouseRotuter;
