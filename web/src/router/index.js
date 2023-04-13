import Vue from "vue";
import VueRouter from "vue-router";
import indexRotuter from "./modules/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  indexRotuter,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
