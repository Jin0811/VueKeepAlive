const routes = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("@/layout/Layout.vue"),
    redirect: "/layout/home",
    children: [
      {
        path: "/layout/home",
        name: "Home",
        meta: {
          title: "主页",
        },
        component: () => import("@/views/Home.vue"),
      },
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
    ],
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/layout/NotFound.vue"),
  },
];

export const menuData = routes[1].children;

export default routes;
