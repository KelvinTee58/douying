import Vue from "vue";
import VueRouter from "vue-router";
import indexRotuter from "./modules/index";
import loginRotuter from "./modules/login";
import productListRotuter from "./modules/productList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  indexRotuter,
  loginRotuter,
  productListRotuter,
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
