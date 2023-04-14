<template>
  <div class="login-page">
    <div class="input__wrapper">
      <div class="input__wrapper__item">
        <input name="phone" v-model="phone" type="text" />
      </div>
      <div class="input__wrapper__item">
        <input name="password" v-model="password" type="password" />
      </div>
      <div class="input__wrapper__item">
        <coo-button type="primary">登录</coo-button>
        <van-button type="primary">主要按钮</van-button>
        <!-- <van-button type="primary">登录</van-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      phone: "",
      password: "",
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
  methods: {},
};
</script>
<style lang="scss" scoped>
.login-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  .input__wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    &__item {
      width: 100%;
      margin-bottom: 2rem;
      input {
        height: 4rem;
        border-width: 0.1rem;
        border-radius: 2rem;
        width: 100%;
        text-align: center;
      }
    }
  }
}
//@import url(); 引入公共css类
</style>
