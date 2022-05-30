<template>
  <div class="createTask">
    <div class="box">
      <!-- title -->
      <h2>创建页面</h2>
      <!-- body -->
      <div class="from">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="任务名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="任务时长">
            <div class="task">
              <div>
                <el-input
                  class="hour"
                  maxlength="2"
                  v-model="form.duration"
                ></el-input>
              </div>
              <div class="txt ml-5">小时</div>
            </div>
          </el-form-item>
          <el-form-item label="任务描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
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
          <el-form-item label="是否紧急" class="isUrgent">
            <el-switch v-model="delivery"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 弹层 -->
      <div class="open">
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>任务发布成功！</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="navigator('taskListView')"
              >查看任务列表</el-button
            >
            <el-button type="primary" @click="continueCreating"
              >继续创建</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import base from "@/mixins/base";
import { getCreateTaskApi, setReleaseTaskApi, getUserList } from "@/api/api";
export default {
  mixins: [base],
  data() {
    return {
      form: {
        name: "", // 任务名称
        duration: "", // 任务时长绑定的
        desc: "", // 任务描述绑定的
      },
      level: 0, // 任务等级  1代表紧急 0代表普通 默认给的是普通
      executor: [], // 执行人选中的
      publishedTasks: [], // 已经发布的任务
      delivery: false, // 是否紧急绑定的开关  true 开； false 关
      userList: "", // 所有用户的信息列表
      id: "", // 这个是新创建的任务的id
      dialogVisible: false, // 弹层是否打开
    };
  },
  async created() {
    let res = await getUserList({
      pagination: false,
    });
    if (res.data.status == 1) {
      // console.log("created ~ res", res);
      this.userList = res.data.data.data;
      // console.log("created ~ this.userList", this.userList);
    }
  },
  methods: {
    // 继续创建的方法
    continueCreating() {
      this.formatForm();
      this.dialogVisible = false;
    },
    // 是否打开弹层
    open() {
      this.dialogVisible = true;
    },
    // 弹层的方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // onSubmit 是 立即创建按钮的带点击时间
    onSubmit() {
      if (this.delivery) {
        this.level = 1; // true 的话  给1
      } else {
        this.level = 0; //false的话  给0  默认给的是0
      }
      console.log("onSubmit ~ this.form", this.form);
      console.log("执行人选中的executor：", this.executor); // 执行人选中的：
      let res = this.nmonNullCheck(this.form);
      if (!res) return;
      this.getCreateTask(); // 调用创建任务接口
    },
    // form 的非空校验方法
    nmonNullCheck(obj) {
      let isok = true;
      let rule = {
        name: "任务名称",
        duration: "任务时长",
      };
      for (const key in obj) {
        if (!obj[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空",
          });
          isok = false;
          break;
        }
      }
      return isok;
    },
    // 发送任务给执行人的接口
    async setReleaseTask(taskId) {
      let res = await setReleaseTaskApi({
        userId: this.executor,
        taskId,
      });
      if (res.data.status == 1) {
        // 发送任务成功之后   调用一个弹层  弹层里提示 发布任务成功 并且下边有两个按钮
        // 一个是 查看任务列表 按钮 一个是 继续创建按钮
        // 点击查看任务按钮的话  跳到任务列表界面  点击继续创建的话   清空之前的数据 并且关闭弹层
        this.open(); //发布任务成功然后调用弹层方法
        console.log("setReleaseTask ~ res", res);
      }
    },
    // getCreateTask 是创建任务的接口方法
    async getCreateTask() {
      if (!this.nmonNullCheck()) return;
      const { name, desc, duration } = this.form;
      let res = await getCreateTaskApi({
        name,
        desc,
        duration: Number(duration),
        level: this.level,
      });
      if (res.data.status == 1) {
        this.$message({
          message: "任务创建成功",
          type: "success",
        });
        // tasks 是为了保存已经创建好的信息  而重新拼接的数据
        let tasks = {
          name: this.form.name,
          duration: this.form.duration,
          desc: this.form.desc,
          level: this.level,
          executor: this.executor,
        };
        this.publishedTasks.push(tasks); // 这个是已经创建好的数据列表
        this.id = res.data.data[0].id; // 这个新创建的任务的id
        // 任务创建成功 现在给执行人发送任务
        this.setReleaseTask(this.id);
      }
    },
    // 格式化创建页面form表单中数据的方法
    formatForm() {
      this.form = {
        name: "", // 任务名称
        desc: "", // 任务描述绑定的
        duration: "", // 任务时长绑定的
        level: 0, // 任务等级  1代表紧急 0代表普通 默认给的是普通
      };
      this.delivery = false; //改回默认的
      this.executor = []; // 执行人清空
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-textarea__inner {
  height: 150px !important;
}

::v-deep .task {
  display: flex !important;
}

::v-deep .hour {
  width: 50px !important;
}

.createTask {
  display: flex;
  height: calc(100vh - 90px);
  & .box {
    box-sizing: border-box !important;
    & h2 {
      font-size: 20px;
    }
    & .from {
      width: 400px;
      & .txt {
        color: #606266e1;
      }
    }
  }
}
</style>