<template>
  <el-container>
    <el-header>
      <p>Vue页面缓存</p>
    </el-header>
    <el-container>
      <el-aside width="220px">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <!-- 这里针对的是一级菜单需要进行缓存的情况 -->
        <keep-alive :include="cacheViews">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "@/components/Menu/Menu";
export default {
  name: "Layout",
  components: {
    Menu,
  },
  computed: {
    cacheViews() {
      return this.$store.state.cacheViews;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  color: #fff;
  background: #575757;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-main {
  padding: 15px;
}
</style>
