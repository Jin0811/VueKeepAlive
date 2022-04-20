<template>
  <div>
    <el-descriptions title="用户信息" border>
      <el-descriptions-item label="用户名">{{
        record.name
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        record.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="居住地">{{
        record.address
      }}</el-descriptions-item>
    </el-descriptions>

    <el-button
      style="margin: 20px 0px"
      size="medium"
      type="primary"
      @click="goBack"
      >返回</el-button
    >
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      record: this.$route.query,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
