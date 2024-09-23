import defaultLayer from "@/layout/default.vue";
import indexComponent from "@/views/index/index";

const indexRotuter = {
  path: "/index",
  component: defaultLayer,
  children: [{ path: "/", component: indexComponent }],
};

export default indexRotuter;
