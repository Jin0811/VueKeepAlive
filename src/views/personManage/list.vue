<template>
  <div>
    <h2 style="margin: 0px 0px 20px">列表</h2>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
      ></el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="toDetail(scope.row)"
            >查看详情</el-link
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      tableData: [],
    };
  },
  created() {},
  methods: {
    toDetail(record) {
      this.$router.push({
        path: "/layout/personManage/detail",
        params: record,
      });
    },
  },
};
</script>
