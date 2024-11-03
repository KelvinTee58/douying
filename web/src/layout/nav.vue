<template>
  <div>
    <van-nav-bar
      :title="currentTitle"
      :left-arrow="isBack"
      @click-left="onClickLeft"
      safe-area-inset-top
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
    },
    isBack() {
      return this.$route.meta.isBack || true;
    }
  },
  methods: {
    onClickLeft() {
      if (this.isBack) this.$router.go(-1); // 返回上一页
    }
  }
};
</script>
