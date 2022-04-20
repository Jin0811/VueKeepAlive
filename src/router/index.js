import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 如果to需要进行缓存，则直接进行缓存，无论是从哪里进入，都先进行缓存
  if (to.meta && to.meta.keepAlive) {
    Store.commit("ADD_CACHEVIEW", to);
  }

  // 如果to的cacheFrom存在，并且cacheFrom不包含from的name，说明是从不需要缓存to的页面进入to的，这个时候就删除to的缓存
  // 即从其他的菜单项，进入keepAlive的页面，需要删除进入页面的缓存
  if (to.meta.cacheFrom && !to.meta.cacheFrom.includes(from.name)) {
    Store.commit("DELETE_CACHEVIEW", to);
  }

  // 如果从需要缓存的页面，跳转到其他页面，则先缓存from
  // 例如：从list跳转detail，缓存list
  if (from.meta && from.meta.keepAlive) {
    Store.commit("ADD_CACHEVIEW", from);
  }

  // 这里不进行延时的话，会有一定几率，数据还没存到vuex当中，页面已经跳转完成了，就会造成页面缓存功能出现Bug
  setTimeout(() => {
    next();
  }, 100);
});

export default router;
