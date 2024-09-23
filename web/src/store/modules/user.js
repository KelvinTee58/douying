const store = {
  state: {
    userinfo: {},
    accessToken: null,
    refreshToken: null,
  },
  getters: {
    getUserInfo: function (state) {
      return state.userinfo;
    },
    getAccessToken: function (state) {
      return state.accessToken;
    },
    getRefreshToken: function (state) {
      return state.refreshToken;
    },
  },
  mutations: {
    editUserInfo: function (state, payload) {
      state.userinfo = payload;
    },
    editAccessToken: function (state, payload) {
      state.accessToken = payload;
    },
    editRefreshToken: function (state, payload) {
      state.refreshToken = payload;
    },
  },
  actions: {
    updateAccessToken: function ({ commit }, payload) {
      commit("editAccessToken", payload || null);
    },
    loginout: function ({ commit }) {
      commit("editUserInfo", {});
      commit("editAccessToken", null);
      commit("editRefreshToken", null);
    },
    initUserInfo: function ({ commit }, payload) {
      let user = payload.user || {};
      commit("editUserInfo", user);
      commit("editAccessToken", payload.accessToken || null);
      // 过期 AccessToken
      // commit(
      //   "editAccessToken",
      //   "690c28aa48f260b5e83656696f5d453e9c0e656400e4cca39e2dcb452397e9dbdafdbfba8da287af37a6dd921ff608b269a901643fb223f14571d0fb8483fd6885fc927df1ac4ee10d8b021747da5c31198e294c2a2022b0f5205db7289a93c10bd82d9fbad5278604ad4918d2fee8f91940824de4d84d8fb87773d34d58bedc025933e3a15290d834ea72109bd7bc16e803da6cee4aea58dbda8da7959f887602dcafc1eb716ebb1e51c9603b5e6de7d74cfcb95c4e9d230abf6bce72cadc68f504587ef8bc615a18e54e47ea319d6eb9b0a63e34271501aa5eb42ed859b5ea29e79e2d52ec3562fa0e22d7214935dc"
      // );
      commit("editRefreshToken", payload.refreshToken || null);
      // 过期 RefreshToken
      // commit(
      //   "editRefreshToken",
      //   "690c28aa48f260b5e83656696f5d453e9c0e656400e4cca39e2dcb452397e9db75f50cde5dfbd0afef0acfbda104c7ce98d2780b19352f652909e1eec52e36ef1e7aeca43765aea500e58fdcdacefb40db34a4d36712bacd0989b037b3efcebfc853723372bbb265dc4fc8a1ead852d5523cabeb5e6ea5cdbf58b543bddc3d45172d3f209d6ee93b299fcc59da8486102f0885cddc224189e1afc409c611e00ebce15ef4d38924d692e92a7e6e603a61ba85e418ddcf3adae357294d3bd0a8bcded6cd475717ec70fca802edb3a57f5f29c7dbc37ac01017599b5928f1af7afc"
      // );
    },
  },
};

export default {
  namespaced: true, //命名空间
  ...store,
};
