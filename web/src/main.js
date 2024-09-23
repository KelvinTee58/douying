import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./rem.js";
import "coconut-mobile/vue2/index";
import "./style/index.scss";

// vant
import "vant/lib/index.css";
import { Form, Field, Button, Picker,Popup } from "vant";
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);

// request
import { post, get } from "./utils/request";
window.$post = Vue.prototype.$post = post;
window.$get = Vue.prototype.$get = get;

// import { Button } from "vant";
// Vue.use(Button);
// import "vant/lib/index.css";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
