<template>
  <div>
    <h1 class="title">任务列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹层 -->
    <div>
      <el-dialog
        title="编辑任务"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div class="dialog">
          <form-template></form-template>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import formTemplate from "@/components/formTemplateView.vue";
export default {
  components: {
    "form-template": formTemplate,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogVisible: false, // 弹层是否打开
    };
  },
  created() {},
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 编辑的点击事件
    handleEdit(index, row) {
      this.dialogVisible = true; // 打开弹层
      console.log(index, row); // 打印当前行的数据
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0;
  padding: 20px;
}
::v-deep .el-textarea__inner {
  height: 150px;
}
::v-deep .el-dialog{
 min-width: 480px !important;
}
</style>