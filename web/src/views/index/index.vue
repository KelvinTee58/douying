<template>
  <div class="index-page">
    <div class="homepages" v-if="activeTabbar == 0">
      <homepages></homepages>
    </div>
    <div class="formInner" v-if="activeTabbar == 1">
      <formInner></formInner>
    </div>
    <div class="formInner" v-if="activeTabbar == 2">
      <formManage></formManage>
    </div>
    <van-tabbar v-model="activeTabbar">
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="orders-o">表单</van-tabbar-item>
      <van-tabbar-item icon="list-switch">管理</van-tabbar-item>
      <van-tabbar-item icon="contact-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import homepages from './components/homepages.vue';
import formInner from './components/form.vue';
import formManage from './components/manage.vue';
import { Tabbar, TabbarItem } from 'vant';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    homepages,
    formInner,
    formManage,
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  },
  data() {
    //这里存放数据
    return {
      activeTabbar: 2
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
    findMore() {
      this.$router.push('/prodList');
    }
  }
};
</script>
<style lang="scss" scoped>
.index-page {
  font-size: 2rem;
}
</style>
