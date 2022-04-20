# Vue项目页面缓存（keep-alive）

## 1 介绍
在项目当中，经常会遇到页面缓存的需求，最为常见的如：从列表页面进入到详情页面，从详情页面返回到列表页面时，需要保留列表页面的分页，这样用户的体验比较好。

这里使用了vue的keep-alive组件，配合路由配置、路由钩子、vuex、无限层级菜单等，进行了一定的封装，可以通过简单的配置来实现页面的缓存效果。

## 2 实现思路
- 1、使用keep-alive来包裹router-view，使用keep-alive的include属性来控制哪些路由被缓存
- 2、路由钩子当中，通过路由的meta当中的配置项，来决定是删除路由的缓存，还是添加路由的缓存
- 3、所有缓存的路由数据都存储在vuex当中，Layout和RouterContainer组件读取vuex当中的数据，供keep-alive的include使用
- 4、路由配置完成之后，Menu组件会根据此路由配置，来自动生成一个菜单（支持无限层级），这里使用了elementUI框架。

## 3 route配置介绍
下面是一个route配置实例，完整的例子可以参考 `src\router\routes.js`
```js
{
  path: "/layout/personManage",
  name: "PersonManage",
  redirect: "/layout/personManage/list",
  component: () => import("@/layout/RouterContainer.vue"),
  meta: {
    title: "人员管理",
  },
  children: [
    {
      path: "/layout/personManage/list",
      name: "List",
      meta: {
        title: "人员列表",
        keepAlive: true, // 进行缓存
        // 从哪个路由跳转到此页面时，需要保持缓存的状态
        // 如果不写或者为空数组，则无论从哪里进入，都会进行缓存
        cacheFrom: ["Detail"],
      },
      component: () => import("@/views/personManage/list.vue"),
    },
    {
      path: "/layout/personManage/detail",
      name: "Detail",
      meta: {
        title: "人员详情",
        hidden: true, // 在菜单当中隐藏，不作为菜单出现
        activeMenu: "/layout/personManage/list", // 进入详情时，高亮显示list菜单项
      },
      component: () => import("@/views/personManage/detail.vue"),
    },
  ],
},
```
- `title`：会作为菜单渲染时的名称
- `hidden`：如果hidden为true，则此路由不会被渲染为一个菜单项，譬如可以设置详情页面的hidden为true，这样详情页面就不会出现在菜单当中
- `keepAlive`：是否对此路由进行缓存，如果为true，则会进行缓存，此属性需要搭配cacheFrom属性使用
- `cacheFrom`：配置从哪里进入此路由，需要缓存页面，譬如：cacheFrom: ["Detail"] 代表只有从详情页面（即name="Detail"）进入到此路由时，才需要保持此路由的缓存，从其他页面则不需要保持
- `activeMenu`：当从列表页进入到详情页面时，菜单会丢失高亮效果，此时可以使用activeMenu属性，activeMenu可以设置为列表页的path，代表进入详情页面时，高亮显示列表页面菜单项

注意点：
- 1、配置路由时，必须要有name属性，并且不能重复
- 2、编写组件页面时，组件必须要有name，与此页面的路由的name相同，并且不能与其他页面重复

## 4 路由钩子介绍
```js
router.beforeEach(async (to, from, next) => {
  // 如果to需要进行缓存，则直接进行缓存，无论是从哪里进入，都先进行缓存
  if (to.meta && to.meta.keepAlive) {
    await Store.dispatch("ADD_CACHEVIEW_ACTION", to);
  }

  // 如果to的cacheFrom存在，并且cacheFrom不包含from的name，说明是从不需要缓存to的页面进入to的，这个时候就删除to的缓存
  // 即从其他的菜单项，进入keepAlive的页面，需要删除进入页面的缓存
  if (to.meta.cacheFrom && !to.meta.cacheFrom.includes(from.name)) {
    await Store.dispatch("DELETE_CACHEVIEW_ACTION", to);
  }

  // 如果从需要缓存的页面，跳转到其他页面，则先缓存from
  // 例如：从list跳转detail，缓存list
  if (from.meta && from.meta.keepAlive) {
    await Store.dispatch("ADD_CACHEVIEW_ACTION", from);
  }

  // 处理完成缓存的数据之后，放行路由
  next();
});
```
