import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import requestUtils from '@/utils/request';
import storageUtils from '@/utils/storage';

import 'remixicon/fonts/remixicon.css';

Vue.prototype.$request = requestUtils;
Vue.prototype.$storage = storageUtils;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
