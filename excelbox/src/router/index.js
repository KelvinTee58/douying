import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue";
import deliveryNotice from "../views/deliveryNotice.vue";
import deliveryNotice_electron from "../views/deliveryNotice_electron.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/deliveryNotice",
    name: "deliveryNotice",
    component: deliveryNotice,
  },
  {
    path: "/deliveryNotice2",
    name: "deliveryNotice2",
    component: deliveryNotice_electron,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
