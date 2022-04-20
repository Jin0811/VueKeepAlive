import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cacheViews: [], // 被缓存的路由，存放的是每一个路由的name，所以name不能重复
  },
  mutations: {
    // 添加缓存的路由
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
  actions: {
    // 之所以使用actions，是为了可以在路由钩子当中使用 async...await 来确保数据存储完毕
    // 添加缓存的路由
    ADD_CACHEVIEW_ACTION(context, view) {
      context.commit("ADD_CACHEVIEW", view);
    },
    // 删除缓存的路由
    DELETE_CACHEVIEW_ACTION(context, view) {
      context.commit("DELETE_CACHEVIEW", view);
    },
  },
});
