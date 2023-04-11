import Vue from "vue";
import App from "./App.vue";

// 配置rem
import "./rem.js";
// 引入公共vue2 ui组件
import "coconut-mobile/vue2/index";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
