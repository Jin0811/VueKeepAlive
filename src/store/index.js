import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cacheViews: [], // 被缓存的路由，存放的是每一个路由的name，所以name不能重复
  },
  mutations: {
    ADD_CACHEVIEW(state, view) {
      if (!state.cacheViews.includes(view.name)) {
        state.cacheViews.push(view.name);
      }
    },
    // 删除缓存的路由
    DELETE_CACHEVIEW(state, view) {
      state.cacheViews = state.cacheViews.filter((item) => item !== view.name);
    },
  },
  actions: {},
  modules: {},
});
