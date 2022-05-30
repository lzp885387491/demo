<template>
  <div class="box">
    <!-- 用户列表 -->
    <el-table :data="data.rows" style="width: 100%">
      <el-table-column
        prop="updatedAt"
        align="center"
        label="创建日期"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="avatarName"
        label="昵称"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="姓名"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="sex"
        align="center"
        label="性别"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <p class="sex-0" v-if="scope.row.sex == 0">女</p>
          <p class="sex-1" v-else>男</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="手机号"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="email"
        align="center"
        label="邮箱"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="desc"
        label="简介"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getUserList } from "@/api/api";
export default {
  data() {
    return {
      data: [], // 用户列表的总数据
      pageSize: 5, //每页获取几条
      pageNum: 1, // 获取第几页数据
      count: 0, //共多少条
    };
  },
  created() {
    this.userList();
  },
  methods: {
    // 获取用户列表的接口 方法
    async userList() {
      let { pageSize, pageNum } = this;
      let res = await getUserList({ pageSize, pageNum });
      if (res.data.status == 1) {
        // console.log("created ~ res.data.data", res.data.data.data);
        this.data = res.data.data.data;
        this.count = this.data.count;
      }
    },
    // 每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.userList();
    },
    // 当前第几页
    handleCurrentChange(val) {
      console.log(`当前第${val} 页`);
      this.pageNum = val;
      this.userList();
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  .sex-0 {
    color: #ff0000;
  }
  .sex-1 {
    color: #0d00ff;
  }
  .pagination {
    margin: 20px 0;
    text-align: center;
  }
}
</style>