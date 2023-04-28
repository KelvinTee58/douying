<template>
  <div class="login-page">
    <!-- <img src="@/assets/images/login/login-background.png" /> -->
    <div class="input__wrapper">
      <h1>您好，请登录</h1>
      <div class="input__wrapper__item">
        <p class="input__wrapper__item--label">手机号：</p>
        <input name="phone" v-model="phone" type="text" placeholder="" />
      </div>
      <div class="input__wrapper__item">
        <p class="input__wrapper__item--label">密码：</p>
        <input name="password" v-model="password" type="password" placeholder="" />
      </div>
      <div class="input__wrapper__item button__wrapper">
        <coo-button type="primary" round @click="login">登录</coo-button>
        <!-- <van-button type="primary">主要按钮</van-button> -->
        <!-- <van-button type="info">信息按钮</van-button> -->
        <!-- <van-button type="primary">登录</van-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { encryptBase64 } from "@/utils/AESPasswordEncryption.js";
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
    async login() {
      let password = encryptBase64(this.password);
      let params = {
        phone: this.phone,
        password: password,
      };
      console.log("password", params);
      let a = await this.$post("/users/login", params);
      console.log("a", a);
    },
  },
};
</script>
<style lang="scss" scoped>
.login-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;

  background: url("~@/assets/images/login/login-background.png");
  background-repeat: no-repeat;
  background-size: cover;
  h1 {
    margin-top: -2rem;
    margin-bottom: 4rem;
  }
  .input__wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    font-size: 1.2rem;
    &__item {
      width: 100%;
      margin-bottom: 2rem;
      &--label {
        margin-bottom: 0.4rem;
        font-size: 1rem;
        color: #333;
      }
      input {
        height: 4rem;
        border-width: 0.1rem;
        border-radius: 2rem;
        border-color: #333;
        width: 100%;
        text-align: center;
        font-size: 1.2rem;

        background-color: rgba(0, 0, 0, 0);
      }
      /deep/.coo-button {
        width: 20rem;
        height: 4rem;
        font-size: 1.2rem;
      }
    }
  }
  .button__wrapper {
    margin-top: 6rem;
  }
}
//@import url(); 引入公共css类
</style>
