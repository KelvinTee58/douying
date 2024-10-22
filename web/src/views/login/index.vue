<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Douying 都赢</h2>
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
    ...mapActions('user', ['loginIn']),
    async login() {
      let password = encryptBase64(this.password);
      let params = {
        username: this.loginAccount,
        phone: this.loginAccount,
        password
      };
      try {
        console.log('logininfo :>> ');
        let logininfo = await this.$request.post('/api/users/login', params);
        console.log('logininfo :>> ', params, logininfo);
        this.loginIn(logininfo.data);
        Toast.success({
          message: '欢迎您，' + logininfo.data.user.name,
          duration: 2000
        });
        this.$router.replace({ path: '/index' });
      } catch (error) {
        // this.loginIn({});
      }
    }
  }
};
</script>

<style scoped lang="scss">
// /* Container styles */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.login-box {
  width: 20rem;
  padding: 1.5rem 3rem;
  text-align: left;
}

h2 {
  font-size: 2.2rem; // 30px / 37.5
  font-weight: 600;
  margin-bottom: 0.5rem; // 12px / 37.5
  // letter-spacing: 0.1rem; // 1px / 37.5
  text-align: left;
}

.welcome-text {
  color: #888;
  font-size: 1rem; // 16px / 37.5
  line-height: 1.7;
  letter-spacing: 0.1rem; // 0.5px / 37.5
  margin-bottom: 3rem;
}

/* Input Group Styles */
.input-group {
  position: relative;
  margin-bottom: 0.2rem; // 25px / 37.5
}

input {
  width: 100%;
  padding: 0.8rem 0; // 10px / 37.5
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  font-size: 1.5rem; // 18px / 37.5
  text-align: left;
  transition: border-bottom-color 0.3s;
}

input::placeholder {
  color: #bbb;
  font-size: 1rem; // 16px / 37.5
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
  height: 0.1rem; // 2px / 37.5
  background-color: #007bff;
  transition: width 0.5s ease;
}

.underline.active {
  width: 100%;
}

/* Login Button Styles */
.login-btn {
  width: 100%;
  padding: 1rem; // 14px / 37.5
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.4rem; // 6px / 37.5
  cursor: pointer;
  font-size: 1rem; // 16px / 37.5
  font-weight: 500;
  letter-spacing: 0.13rem; // 0.5px / 37.5
  margin-top: 3rem;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #0056b3;
}

/* Sign-up link */
.sign-up {
  margin-top: 0.5rem; // 20px / 37.5
  font-size: 0.8rem; // 14px / 37.5
  color: #888;
  letter-spacing: 0.013rem; // 0.5px / 37.5
}

.sign-up a {
  color: #007bff;
  text-decoration: none;
}

.sign-up a:hover {
  text-decoration: underline;
}
</style>
