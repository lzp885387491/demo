<template>
  <div class="taskList">
    <!-- 数据 -->
    <div>
      <h2>任务列表</h2>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="taskListData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column
          prop="userId"
          align="center"
          label="发布人ID"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="userName"
          align="center"
          label="发布人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="id"
          align="center"
          label="任务id"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="taskName"
          align="center"
          label="任务名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="duration"
          align="center"
          label="任务时长/小时"
          width="120"
        ></el-table-column>
        <el-table-column align="center" label="紧急程度" width="100">
          <template slot-scope="scope">
            <div class="frame bgcRed" v-if="scope.row.level == 1">紧急</div>
            <div class="frame bgcBlue" v-else>普通</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          align="center"
          label="简介"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="日期"
          align="center"
          prop="createdAt"
          width="200"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="390">
          <template slot-scope="scope">
            <div class="flex">
              <div>
                <div
                  class="frame smallHand bgcRed"
                  v-if="scope.row.isReceived == 1"
                >
                  已领取
                </div>
                <div class="frame smallHand bgcBlue" v-else>未领取</div>
              </div>
              <div
                class="frame smallHand colorBlue"
                @click="gitData(scope.row)"
              >
                <!-- scope.row.id -->
                编辑任务
              </div>
              <div
                class="frame smallHand colorBlue"
                @click="viewDetails(scope.row.id)"
              >
                <!-- scope.row.id -->
                查看详情
              </div>
              <div class="frame smallHand colorBlue">发布任务</div>
              <div
                v-if="scope.row.isReceived == 0"
                class="frame smallHand colorBlue"
                @click="receiveTask(scope.row.id)"
              >
                领取任务
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹层 -->
    <div class="elasticLayer">
      <!-- 弹层内容 -->
      <el-dialog
        title="编辑任务"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <!-- 组件 -->
        <form-template v-on:onSubmit="editTask">
          <el-form-item label="执行人">
            <el-select
              v-model="executor"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择执行人"
            >
              <el-option
                v-for="item in userList.rows"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </form-template>
      </el-dialog>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
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
import formTemplate from "@/components/formTemplateView.vue";
import { getTaskListApi, releaseTaskApi, getUserInfoApi } from "@/api/api";
import base from "@/mixins/base";
export default {
  mixins: [base],
  components: {
    "form-template": formTemplate,
  },
  data() {
    return {
      multipleSelection: [],
      //  listData 获取的所有任务的数据
      taskListData: [],
      isok: false,
      pageSize: 10, //
      executor: [], // 执行人选中的
      count: 0, //共多少页
      currentPage: 1, // 当前第几页
      countPage: 5,
      userList: "",
      taskId: "",
      userInfo: [], // 当前登录的账号的数据
      dialogVisible: false,
      from: {}, // 获取组件的数据
    };
  },
  async created() {
    this.getTaskList();
    let res = await getUserInfoApi();
    if (res.data.status == 1) {
      console.log(res.data);
      this.userInfo = res.data.data;
    }
  },
  methods: {
    // 发送任务给执行人的接口
    async setReleaseTask(taskId) {
      let res = await releaseTaskApi({
        userId: this.executor,
        taskId,
      });
      if (res.data.status == 1) {
        this.open(); //发布任务成功然后调用弹层方法
        console.log("setReleaseTask ~ res", res);
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    gitData(data) {
      this.dialogVisible = true;
      console.log(data);
    },
    // 编辑任务
    editTask(val) {
      this.from = val;
      console.log("editTask ~ this.from", this.from);
    },
    // View details 任务详情的点击事件 需要传一个参数
    viewDetails(data) {
      console.log("任务id" + data);
      let query = {
        taskId: data,
      };
      this.navigator("taskDetailsView", query);
    },
    // 领取任务的方法
    async receiveTask(taskId) {
      console.log("receiveTask ~ taskId", taskId);
      let res = await releaseTaskApi({
        taskId, // 这个是任务id
        userId: [this.userInfo.id], // this.userInfo.id 是 当前自己登录的账号的id
      });
      if (res.data.status == 1) {
        // res.data.status==1 的时候  代表任务领取成功了 然后 把前面的 未领取 改为已领取
        console.log("setReleaseTask ~ res.data", res.data);
        this.getTaskList();
      }
    },
    // 每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.countPage = val;
      this.getTaskList();
    },
    // 当前第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTaskList();
    },
    // 查询所有任务  并赋值给 listData
    async getTaskList() {
      let res = await getTaskListApi({
        pageSize: this.countPage, // 每页给几条
        pageNum: this.currentPage, // 获取第几页
      });
      if (res.data.status == 1) {
        console.log("getTaskList ~ res.data.data", res.data.data);
        this.count = res.data.data.count;
        this.taskListData = res.data.data.rows;
      }
    },
    // handleSelectionChange 这个方法是获取勾选了的信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("勾选了", this.multipleSelection);
    },
  },
};
</script>

<style lang="scss" scoped>
//
.taskList {
  & .frame {
    display: inline-block;
    padding: 5px 10px;
    color: #fff;
    border-radius: 5px;
  }
  & .colorBlue {
    color: blue;
  }
}
</style>