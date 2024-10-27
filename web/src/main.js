import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import requestUtils from '@/utils/request';
import storageUtils from '@/utils/storage';

import 'vant/lib/index.css';
import { Toast } from 'vant';

// 导入 RemixIcon
import 'remixicon/fonts/remixicon.css';

// 注册事件
import directives from '@/utils/directives/index';

Vue.prototype.$request = requestUtils;
Vue.prototype.$storage = storageUtils;
// Vue.prototype.$store = store;

Vue.config.productionTip = false;

// 引入模块后自动生效
import '@vant/touch-emulator';

Vue.use(directives);
Vue.use(Toast);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
