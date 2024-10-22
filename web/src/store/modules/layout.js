const store = {
  state: {
    searchQueryKey: ''
  },
  mutations: {
    SET_QUERY(state, query) {
      state.searchQueryKey = query;
    },
    CLEAR_QUERY(state) {
      state.searchQueryKey = '';
    }
  },
  actions: {
    setQuery({ commit }, query) {
      console.log('setQuery :>> ');
      commit('SET_QUERY', query);
    },
    clearQuery({ commit }) {
      commit('CLEAR_QUERY');
    }
  }
};

export default {
  namespaced: true, //命名空间
  ...store
};
