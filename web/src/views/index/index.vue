<template>
  <div class="index-page">
    <coo-navbar leftIcon="menu-2-line" rightIcon="none" title="主页" customClass="navbarCustomClass"> </coo-navbar>
    <!-- <h1>indexpage</h1> -->
    <div class="top-statistics-card-wrapper">
      <statistics-card title="总量" trend="3.4" trendStatus="up" statistics="123456789" :unit="'KG'"> </statistics-card>
      <statistics-card title="芒果" trend="3.4" trendStatus="up" statistics="44" :unit="'KG'"> </statistics-card>
      <statistics-card title="木瓜" trend="3.4" trendStatus="none" statistics="5999" :unit="'KG'"> </statistics-card>
      <statistics-card title="菠萝" trend="3.4" trendStatus="down" statistics="22" :unit="'KG'"> </statistics-card>

      <div class="find-more" @click="findMore">查看更多</div>
    </div>
  </div>
</template>

<script>
import statisticsCard from "./components/statisticsCard.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    statisticsCard,
  },
  data() {
    //这里存放数据
    return {};
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
    findMore() {
      this.$router.push("/prodList");
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.index-page {
  font-size: 2rem;
  .top-statistics-card-wrapper {
    margin: 1rem;
    // overflow-x: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    // -webkit-overflow-scrolling: touch;
    padding-bottom: 25px;
    row-gap: 1rem;
    column-gap: 1rem;
  }
  .top-statistics-card-wrapper::-webkit-scrollbar {
    display: none;
  }
  // .navbarCustomClass {
  //   background-color: rgba(0, 0, 0, 0);
  // }
  // .navbarCustomClass::after {
  //   display: none;
  // }
  .find-more {
    text-align: center;
    border: 1px solid #000;
    font-size: 1.4rem;
    line-height: 2.5rem;
    border-radius: 1.4rem;
    width: 20rem;
    margin: 1rem auto 0;
  }
}
//@import url(); 引入公共css类
</style>
