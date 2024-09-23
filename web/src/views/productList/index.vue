<template>
  <div class="productList-page">
    <coo-navbar leftIcon="none" rightIcon="add-circle-line" title="产品列表" customClass="navbarCustomClass" @click-right="addProduct"> </coo-navbar>
    
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      phone: "15816081222",
      password: "root",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    addProduct() {
      this.$router.push("/prodList/product");
    },
  },
};
</script>
<style lang="scss" scoped>
.productList-page {
  // .navbarCustomClass {
  //   background-color: rgba(0, 0, 0, 0);
  // }
  // .navbarCustomClass::after {
  //   display: none;
  // }
}
//@import url(); 引入公共css类
</style>
