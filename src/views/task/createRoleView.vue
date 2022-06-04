<template>
  <div class="box">
    <!--  -->
    <div class="box-header">
      <b class="mr-10">新增角色权限</b>
      <span class="colorBlue fs">
        <i class="el-icon-house"></i>
        · 系统管理 · 角色与权限 ·
      </span>
      <span class="text">新增角色权限</span>
    </div>
    <div class="body">
      <div class="top">
        <div class="search flex">
          <div class="flex-center2 abc mr-30">
            <div class="title">
              <span class="c-ff4400 mr-5">*</span>
              <span>角色名称</span>
            </div>
            <el-input
              class="ipt-search"
              placeholder="请输入新增角色名称"
              v-model="roleName"
              clearable
            >
            </el-input>
          </div>
          <div class="flex-center2 abc">
            <div class="title">
              <span class="c-ff4400 mr-5">*</span>
              <span>所属部门</span>
            </div>
            <el-input
              class="ipt-search"
              placeholder="请输入新增所属部门"
              v-model="Department"
              clearable
            >
            </el-input>
          </div>
        </div>
        <!--  -->
        <div class="All">
          <el-checkbox v-model="All">选择所有权限</el-checkbox>
        </div>
        <div class="item">
          <div class="signatureManagement">
            <el-checkbox v-model="signatureManagement">签名管理</el-checkbox>
          </div>
          <div class="flex-a">
            <div class="row1">
              <el-checkbox v-model="signatureManagement">签名管理</el-checkbox>
              <el-checkbox v-model="signatureManagement">签名管理</el-checkbox>
              <el-checkbox v-model="signatureManagement">签名管理</el-checkbox>
            </div>
            <div class="row2">
              <el-checkbox v-model="signatureManagement">签名管理</el-checkbox>
              <el-checkbox v-model="signatureManagement">签名管理</el-checkbox>
              <el-checkbox v-model="signatureManagement">签名管理</el-checkbox>
            </div>
          </div>
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
        <el-button @click="confirmNew" type="primary">确认新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createRoleApi, getUserInfoApi } from "@/api/api";
export default {
  data() {
    return {
      Department: "", //所属部门
      roleName: "", // 创建角色的角色名字
      signatureManagement: false, //签名管理
      All: false, // 选择所有权限
      headerSelectAll: false, // header里 全选的多选框
      news: false, // 消息的多选框
      project: false, // 项目的多选框
      calendar: false, // 日历的多选框
      netDisk: false, //网盘的多选框
      data: [], // 用户信息
    };
  },
  async created() {
    let res = await getUserInfoApi();
    if (res.data.status == 1) {
      // console.log(res.data.data[0]);
      this.data = res.data.data;
    }
  },
  methods: {
    async confirmNew() {
      // console.log(this.roleName);
      let { roleName } = this;
      let res = await createRoleApi({
        roleName,
        userId: this.data.id,
      });
      if (res.data.status == 1) {
        // console.log(res.data);
        this.roleName = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  & .box-header {
    & .fs {
      font-size: 12px;
    }
    & .text {
      font-size: 12px;
      color: #ccc;
    }
    box-sizing: border-box;
    padding-bottom: 10px;
  }
  .body {
    min-width: 790px;
    background-color: #fff;
    & .top {
      width: 100%;
      & .search {
        width: 100%;
        border-bottom: 1px solid #ccc;
        & .abc {
          box-sizing: border-box;
          padding: 6px 0;
          & .ipt-search {
            width: 300px;
            min-width: 210px;
          }
          & .title {
            min-width: 80px;
          }
        }
      }
      & .All {
        box-sizing: border-box;
        padding: 10px;
      }
      & .item {
        border: 1px solid #ccccccb4;
        background-color: #fff;
        & .signatureManagement {
          padding: 15px 0 15px 10px;
          border-bottom: 1px solid #ccccccb4;
          background-color: #e1edf6;
        }
        & .flex-a {
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px 30px;
          & .row1 {
            border-bottom: 1px solid #ccccccb4;
            padding: 10px 0 10px 10px;
          }
          & .row2 {
            padding: 10px 0 10px 10px;
          }
        }
      }
    }
    & .subject {
      box-sizing: border-box;
      height: 565px;
      overflow-y: scroll;
      & .item {
        border: 1px solid #ccc;
        margin: 10px 0;
        & .item-header {
          box-sizing: border-box;
          width: 100%;
          height: 50px;
          background-color: #e1edf6;
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
  }
}
</style>