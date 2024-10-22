import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import layout from './modules/layout';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    layout,
    user
  }
});

export default store;
