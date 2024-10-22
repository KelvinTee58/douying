<template>
  <div class="view-company-index-pages container">
    <van-nav-bar
      :title="currentTitle"
      left-arrow
      left-text="返回"
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon
          name="search"
          size="18"
          @click="isShowSearch = true"
          v-show="!isShowSearch"
        />
        <van-icon
          name="cross"
          size="18"
          @click="onCancel"
          v-show="isShowSearch"
        />
      </template>
    </van-nav-bar>
    <form action="/" v-show="isShowSearch">
      <van-search
        v-model="searchKeyWord"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @input="onSearch"
        @cancel="onCancel"
      />
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
import { NavBar, Icon, Search } from 'vant';
export default {
  name: 'view-company-index',
  //import引入的组件需要注入到对象中才能使用
  components: { 'van-nav-bar': NavBar, 'van-icon': Icon, 'van-search': Search },
  data() {
    //这里存放数据
    return {
      isShowSearch: false,
      searchKeyWord: ''
    };
  },
  //监听属性 类似于data概念
  computed: {
    currentTitle() {
      // 从路由信息中获取标题
      return this.$route.meta.title || ''; // 如果没有设置meta.title，则使用默认标题
    }
  },
  mounted() {
    //生命周期 - 创建完成（可以访问当前this实例）
    this.onCancel();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },

    onSearch(val) {
      this.$store.dispatch('layout/setQuery', val);
    },
    onCancel() {
      // Toast('取消');
      this.isShowSearch = false;
      this.searchKeyWord = '';
      this.$store.dispatch('layout/clearQuery');
    }
  },
  //监控data中的数据变化
  watch: {}
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
