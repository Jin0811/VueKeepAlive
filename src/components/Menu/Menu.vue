<template>
  <div class="menu-container">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :default-active="defaultActive"
    >
      <template v-for="(item, index) in menuData">
        <template
          v-if="item.children && item.children.length > 0 && !item.meta.hidden"
        >
          <SubMenu :menuItem="item" :key="index"></SubMenu>
        </template>
        <template v-if="!item.children && !item.meta.hidden">
          <el-menu-item :index="item.path" :key="index">
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { menuData } from "@/router/routes";
import SubMenu from "./SubMenu";
export default {
  name: "Menu",
  components: {
    SubMenu,
  },
  computed: {
    // 当前激活的菜单项，如果meta当中activeMenu，则使用activeMenu
    defaultActive() {
      if (this.$route.meta.activeMenu) {
        return this.$route.meta.activeMenu;
      }
      return this.$route.path;
    },
  },
  data() {
    return {
      menuData,
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
</style>
