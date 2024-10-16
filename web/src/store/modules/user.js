import storageUtils from '@/utils/storage'


const store = {
  state: {
    userinfo: {},
    accessToken: null,
    refreshToken: null
  },
  getters: {
    getUserInfo: function (state) {
      return state.userinfo
    },
    getAccessToken: function (state) {
      return state.accessToken
    },
    getRefreshToken: function (state) {
      return state.refreshToken
    }
  },
  mutations: {
    editUserInfo: function (state, payload) {
      state.userinfo = payload
    },
    editAccessToken: function (state, payload) {
      state.accessToken = payload
    },
    editRefreshToken: function (state, payload) {
      state.refreshToken = payload
    }
  },
  actions: {
    updateAccessToken: function ({ commit }, payload) {
      commit('editAccessToken', payload || null)
    },
    loginout: function ({ commit }) {
      commit('editUserInfo', {})
      commit('editAccessToken', null)
      commit('editRefreshToken', null)

      storageUtils.remove('accessToken')
      storageUtils.remove('refreshToken')
    },
    initUserInfo: function ({ commit }, payload) {
      let user = payload.user || {}
      commit('editUserInfo', user)
      commit('editAccessToken', payload.accessToken || null)
      // 过期 AccessToken
      commit('editRefreshToken', payload.refreshToken || null)

      storageUtils.set('accessToken',
        payload.accessToken.token || null, payload.accessToken.expiresIn || null)
      storageUtils.set('refreshToken',
        payload.refreshToken.token || null, payload.refreshToken.expiresIn || null)
    }
  }
}

export default {
  namespaced: true, //命名空间
  ...store
}
