import storageUtils from '@/utils/storage';

const store = {
  state: {
    userinfo: {}
  },
  getters: {
    getUserInfo: function (state) {
      return state.userinfo;
    },
    isAuthenticated: (state) => !!state.userinfo // 是否已登录
  },
  mutations: {
    editUserInfo: function (state, payload) {
      state.userinfo = payload;
    }
  },
  actions: {
    updateUserInfo: function ({ commit }, payload) {
      commit('editUserInfo', payload || {});
    },
    loginout: function ({ commit }) {
      commit('editUserInfo', {});

      storageUtils.remove('accessToken');
      storageUtils.remove('refreshToken');
    },
    // 初始化用户信息
    loginIn: function ({ commit }, payload) {
      let user = payload.user || {};
      commit('editUserInfo', user);

      storageUtils.set(
        'accessToken',
        payload.accessToken.token || null,
        payload.accessToken.expiresIn || null
      );
      storageUtils.set(
        'refreshToken',
        payload.refreshToken.token || null,
        payload.refreshToken.expiresIn || null
      );
    }
  }
};

export default {
  namespaced: true, //命名空间
  ...store
};
