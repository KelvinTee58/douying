<template>
  <div>
    <van-nav-bar
      :title="currentTitle"
      left-arrow
      left-text="返回"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import { NavBar } from 'vant';
export default {
  name: 'layout-nav',
  components: {
    'van-nav-bar': NavBar
  },
  data() {
    return {
      active: 0
    };
  },
  computed: {
    currentTitle() {
      // 从路由信息中获取标题
      return this.$route.meta.title || ''; // 如果没有设置meta.title，则使用默认标题
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    }
  }
};
</script>
