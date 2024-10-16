<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Douying 湛江都赢</h2>
      <p class="welcome-text">欢迎!重新登录.</p>

      <!-- Email Input -->
      <div class="input-group">
        <input
          v-model="loginAccount"
          type="text"
          placeholder="用户名称/手机号"
          @focus="focusedAccount = true"
          @blur="focusedAccount = false"
        />
        <span
          class="underline"
          :class="{ active: focusedAccount || loginAccount }"
        ></span>
      </div>

      <!-- Password Input -->
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="密码"
          @focus="focusedPassword = true"
          @blur="focusedPassword = false"
        />
        <span
          class="underline"
          :class="{ active: focusedPassword || password }"
        ></span>
      </div>

      <!-- Login Button -->
      <button class="login-btn" @click="login">登录</button>
      <p class="sign-up"><a href="#">忘记密码</a></p>
    </div>
  </div>
</template>

<script>
import { encryptBase64 } from '@/utils/AESPasswordEncryption.js';
import { mapActions } from 'vuex';
import { Toast } from 'vant';

export default {
  name: 'indexPages',
  data() {
    return {
      loginAccount: '',
      password: '',
      focusedAccount: false,
      focusedPassword: false
    };
  },
  methods: {
    ...mapActions('user', ['initUserInfo']),
    async login() {
      let password = encryptBase64(this.password);
      let params = {
        username: this.loginAccount,
        phone: this.loginAccount,
        password
      };
      try {
        let logininfo = await this.$request.post('/api/users/login', params);
        console.log('logininfo :>> ', logininfo);
        this.initUserInfo(logininfo.data);

        Toast.success({
          message: '欢迎您，' + logininfo.data.user.name,
          duration: 2000
        });
        setInterval(() => {
          // this.$router.replace({ path: '/index' })
        }, 2000);
      } catch (error) {
        this.initUserInfo({});
      }
    }
  }
};
</script>

<style scoped>
/* Container styles */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.login-box {
  width: 360px;
  padding: 50px 40px;

  border-radius: 12px;
  text-align: left;
}

h2 {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 12px;
  letter-spacing: 1px;
  text-align: left;
}

.welcome-text {
  color: #888;
  font-size: 16px;
  line-height: 1.7;
  /* margin-bottom: 35px; */
  letter-spacing: 0.5px;
  margin-bottom: 3rem;
}

/* Input Group Styles */
.input-group {
  position: relative;
  margin-bottom: 25px;
}

input {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  font-size: 18px;
  letter-spacing: 0.5px;
  text-align: left;
  transition: border-bottom-color 0.3s;
}

input::placeholder {
  color: #bbb;
  font-size: 16px;
}

input:focus {
  border-bottom-color: #007bff;
}

/* Underline Animation */
.underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #007bff;
  transition: width 0.5s ease;
}

.underline.active {
  width: 100%;
}

/* Login Button Styles */
.login-btn {
  width: 100%;
  padding: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  /* margin-top: 25px; */
  margin-top: 3rem;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #0056b3;
}

/* Sign-up link */
.sign-up {
  margin-top: 20px;
  font-size: 14px;
  color: #888;
  letter-spacing: 0.5px;
}

.sign-up a {
  color: #007bff;
  text-decoration: none;
}

.sign-up a:hover {
  text-decoration: underline;
}
</style>
