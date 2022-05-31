<template>
  <div class="taskDetail">
    <div class="taskdetails">
      <el-container>
        <el-aside width="900px">
          <div class="iheader">
            <h3>任务详情</h3>
            <div>
              <el-button size="small" class="el-icon-edit">编辑按钮</el-button>
              <el-button size="small" class="el-icon-upload2"
                >编辑按钮</el-button
              >
              <el-button size="small" class="el-icon-box">编辑按钮</el-button>
              <el-button size="small" class="el-icon-folder-delete"
                >编辑按钮</el-button
              >
              <el-button size="small" class="el-icon-share">编辑按钮</el-button>
            </div>
          </div>
          <div class="mat-15">简介：{{ data.desc }}</div>
          <div>
            <h3>活动日志</h3>
            <div class="radio">
              全部
              <el-radio-group v-model="reverse">
                <el-radio>只看日志</el-radio>
                <el-radio :label="false">只看评论</el-radio>
              </el-radio-group>
            </div>

            <el-timeline :reverse="reverse">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="再此输入评论"
              v-model="textarea"
            >
            </el-input>
            <el-button type="primary" class="but">主要按钮</el-button>
          </div>
        </el-aside>
        <el-main>
          <div>
            <h3>项目</h3>
            <p>{{ data.taskName }}</p>
          </div>
          <div>
            <h3>状态</h3>
            <p>{{ data1.status == 0 ? "失败" : "成功" }}</p>
          </div>
          <div>
            <h3>处理人</h3>
            <p>{{ data.userName }}</p>
          </div>
          <div>
            <h3>所属需求</h3>
            <p>{{ data.desc }}</p>
          </div>
          <div>
            <h3>迭代</h3>
            <p>未规划进迭代</p>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getTaskdetailApi } from "@/api/api";
export default {
  data() {
    return {
      reverse: true,
      textarea: "",
      activities: [
        {
          content: "盒子组创建了任务",
          timestamp: "2021-12-23 16.14",
        },
        {
          content: "盒子组重新指派任务给盒子组",
          timestamp: "2021-12-23 16.14",
        },
        {
          content: "盒子组更新了处理状态为 已完成",
          timestamp: "2021-12-23 16.14",
        },
        {
          content: "盒子组更新了处理状态为 未开始",
          timestamp: "2021-12-23 16.14",
        },
      ],
      data: "",
      data1: "",
      taskId: 0,
    };
  },
  created() {
    console.log("this.$route.params.taskId", this.$route.params.taskId);
    this.taskId = this.$route.params.taskId;
    this.gettaskdetail();
  },
  methods: {
    async gettaskdetail() {
      let { taskId } = this;
      let res = await getTaskdetailApi({ taskId });
      this.data = res.data.data;
      this.data1 = res.data;
    },
    ///任务列表
  },
};
</script>

<style lang="scss" scoped>
// .taskDetail{}
</style>