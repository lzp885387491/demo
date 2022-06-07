<template>
  <div>
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
        <slot></slot>
        <el-form-item label="是否紧急" class="isUrgent">
          <el-switch v-model="form.level"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$emit('onSubmit', form)"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "", // 任务名称
        duration: "", // 任务时长绑定的
        desc: "", // 任务描述绑定的
        level: 1, // 任务等级  1代表紧急 0代表普通 默认给的是普通
      },
    };
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
  & .from {
    width: 400px;
    & .txt {
      color: #606266e1;
    }
  }
}
</style>