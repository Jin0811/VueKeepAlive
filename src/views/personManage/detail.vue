<template>
  <div>
    <el-descriptions title="用户信息" border>
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市</el-descriptions-item>
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
  created() {
    console.log(this.$route);
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
