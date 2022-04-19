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

    <div class="pagination">
      <el-pagination
        @current-change="fetch"
        :current-page.sync="page.current"
        :page-size="page.pageSize"
        layout="total, prev, pager, next"
        :total="page.total"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      tableData: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // 查询表格数据（Mock数据）
    fetch() {
      let result = this.generateTableData(
        this.page.current,
        this.page.pageSize
      );
      this.tableData = result.map((item) => {
        return {
          id: item,
          name: `姓名${item}`,
          phone: `${item}`.repeat(5),
          address: `地址${item}`,
        };
      });
      this.page.total = 50;
    },
    // 生成表格数据
    generateTableData(current, pageSize) {
      let arr = [];
      let begin = pageSize * (current - 1) + 1;
      let end = pageSize * current + 1;
      for (let i = begin; i < end; i++) {
        arr.push(i);
      }
      return arr;
    },
    // 跳转详情页面
    toDetail(record) {
      this.$router.push({
        path: "/layout/personManage/detail",
        query: record,
      });
    },
  },
};
</script>

<style lang="scss">
  .pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>