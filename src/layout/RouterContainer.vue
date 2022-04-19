<template>
  <div>
    <keep-alive :include="cacheViews">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "RouterContainer",
  computed: {
    cacheViews() {
      return this.$store.state.cacheViews;
    },
  },
};
</script>
