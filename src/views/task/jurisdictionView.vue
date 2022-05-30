<template>
  <div class="box">
    <!--  -->
    <div class="header flex-items">
      <div class="txt">设置角色对应的功能操作、应用管理、后台管理权限</div>
      <div class="checkbox">
        <el-checkbox v-model="headerSelectAll">全选</el-checkbox>
      </div>
    </div>
    <div class="subject">
      <div class="item">
        <div class="item-header">
          <el-checkbox v-model="news">消息</el-checkbox>
        </div>
        <div class="value">
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="news"
              >消息应用设置</el-checkbox
            >
            <el-checkbox class="row-checkbox" v-model="news"
              >管理公开群组</el-checkbox
            >
            <el-checkbox class="row-checkbox" v-model="news"
              >群组中删除消息</el-checkbox
            >
          </div>
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="news"
              >创建公开群组</el-checkbox
            >
            <el-checkbox class="row-checkbox" v-model="news"
              >群组企业公告中发送消息</el-checkbox
            >
          </div>
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="news"
              >创建私有群组</el-checkbox
            >
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-header">
          <el-checkbox v-model="project">项目</el-checkbox>
        </div>
        <div class="value">
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="project"
              >新建公开项目</el-checkbox
            >
            <el-checkbox class="row-checkbox" v-model="project"
              >管理公开项目</el-checkbox
            >
          </div>
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="project"
              >新建私有项目</el-checkbox
            >
            <el-checkbox class="row-checkbox" v-model="project"
              >新疆项目集</el-checkbox
            >
          </div>
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="project"
              >创建非项目任务</el-checkbox
            >
            <el-checkbox class="row-checkbox" v-model="project"
              >配置中心</el-checkbox
            >
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-header">
          <el-checkbox v-model="calendar">日历</el-checkbox>
        </div>
        <div class="value">
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="calendar"
              >日历应用设置</el-checkbox
            >
            <el-checkbox class="row-checkbox" v-model="calendar"
              >管理公开日历</el-checkbox
            >
          </div>
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="calendar"
              >新建公开日历</el-checkbox
            >
          </div>
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="calendar"
              >新建私有日历</el-checkbox
            >
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-header">
          <el-checkbox v-model="netDisk">网盘</el-checkbox>
        </div>
        <div class="value">
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="netDisk"
              >网盘应用设置</el-checkbox
            >
            <el-checkbox class="row-checkbox" v-model="netDisk"
              >管理公开文件夹</el-checkbox
            >
          </div>
          <div class="row">
            <el-checkbox class="row-checkbox" v-model="netDisk"
              >网盘根目录添加文件和文件夹</el-checkbox
            >
            <el-checkbox class="row-checkbox" v-model="netDisk"
              >网盘标签管理</el-checkbox
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerSelectAll: false, // header里 全选的多选框
      news: false, // 消息的多选框
      project: false, // 项目的多选框
      calendar: false, // 日历的多选框
      netDisk: false, //网盘的多选框
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  padding: 8px 0;
  & .txt {
    padding-left: 20px;
    font-size: 16px;
    color: #e1e1e1;
  }
  & .checkbox {
    padding-right: 20px;
  }
}
.subject {
  box-sizing: border-box;
  height: 665px;
  // background-color: yellowgreen;
  overflow-y: scroll;
  & .item {
    & .item-header {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      background-color: #f6fafd;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
    & .value {
      box-sizing: border-box;
      padding: 10px;
      background-color: #fff;
      & .row {
        box-sizing: border-box;
        padding: 5px;
        & .row-checkbox {
          width: 220px;
        }
      }
    }
  }
}
</style>