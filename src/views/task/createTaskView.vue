<template>
  <div class="createTask">
    <div class="box">
      <!-- title -->
      <h2>创建页面</h2>
      <form-template v-on:onSubmit="getCreateTask">
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
    </div>
  </div>
</template>

<script>
import formTemplate from "@/components/formTemplateView.vue";
import base from "@/mixins/base";
import { getCreateTaskApi, releaseTaskApi, getUserList } from "@/api/api";
export default {
  mixins: [base],
  components: {
    "form-template": formTemplate,
  },
  data() {
    return {
      form: {
        name: "", // 任务名称
        duration: "", // 任务时长绑定的
        desc: "", // 任务描述绑定的
        level: 0, // 任务等级  1代表紧急 0代表普通 默认给的是普通
      },
      executor: [], // 执行人选中的
      publishedTasks: [], // 已经发布的任务
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
      this.userList = res.data.data.data;
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
    // form 的非空校验方法
    nmonNullCheck(obj) {
      let object = {
        name: obj.name, // 任务名称
        duration: obj.duration, // 任务时长绑定的
        desc: obj.desc, // 任务描述绑定的
      };
      let isok = true;
      let rule = {
        name: "任务名称",
        desc: "任务描述",
        duration: "任务时长",
        level: "任务等级",
      };
      for (const key in object) {
        if (!object[key]) {
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
      let res = await releaseTaskApi({
        userIds: this.executor,
        taskId,
      });
      if (res.data.status == 1) {
        this.open(); //发布任务成功然后调用弹层方法
        console.log("setReleaseTask ~ res", res);
      }
    },
    // getCreateTask 是创建任务的接口方法
    async getCreateTask(val) {
      this.form = val;
      if (!this.nmonNullCheck(this.form)) return;
      const { name, desc, duration, level } = this.form;
      let res = await getCreateTaskApi({
        name,
        desc,
        duration: Number(duration),
        level,
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
          level: this.form.level,
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