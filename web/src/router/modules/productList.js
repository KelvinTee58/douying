import defaultLayer from "@/layout/default.vue";
import productListComponent from "@/views/productList/index.vue";
import productListProductComponent from "@/views/productList/product.vue";

const productListRotuter = {
  path: "/prodList",
  component: defaultLayer,
  children: [
    { path: "", component: productListComponent },
    { path: "product", component: productListProductComponent },
  ],
};

export default productListRotuter;
